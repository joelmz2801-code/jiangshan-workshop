import { useEffect, useRef } from 'react';
import { scrollToAnchor } from '@/lib/utils';

/**
 * 平滑滚动 hook — 桌面端接管 wheel/键盘滚动
 * 用 easeInOutCubic 缓动曲线实现减速缓冲，一滚跳一页
 * 移动端不接管 wheel（由 CSS scroll-snap 处理），但仍拦截锚点点击
 */

// easeInOutCubic 缓动：两端慢、中间快，过渡自然流畅
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// 动画时长（ms）— 控制减速缓冲的持续时间
// 调到 600ms：既有减速缓冲感，又不会因过慢产生阻力感
const DURATION = 600;
// wheel 冷却期（ms）— 动画结束后短暂忽略惯性滚动
const COOLDOWN = 140;
// wheel 最小触发阈值 — 忽略微小滚动
const WHEEL_THRESHOLD = 5;

export function useSmoothScroll() {
  const isAnimating = useRef(false);
  const cooldownTimer = useRef<number | null>(null);

  // 锚点点击拦截 — 所有设备生效（桌面+移动），不依赖 React onClick
  // 用原生 document 监听器，避免抽屉菜单退出动画期间 React 事件失效
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // 只处理左键点击
      if (e.button !== 0) return;
      // 找到最近的 a[href^="#"] 祖先
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || !href.startsWith('#')) return;
      // 跳过新窗口/新标签打开的链接
      if (anchor.target === '_blank') return;
      // 确认目标元素存在
      if (!document.querySelector(href)) return;
      e.preventDefault();
      scrollToAnchor(href);
    };
    // 用 capture 阶段，确保最早拦截
    document.addEventListener('click', handleAnchorClick, true);
    return () => document.removeEventListener('click', handleAnchorClick, true);
  }, []);

  useEffect(() => {
    // 仅桌面端（精细指针）且未偏好减少动画时接管 wheel/键盘
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (!isFinePointer || prefersReducedMotion) return;

    /** 获取所有滚动目标页（按 DOM 顺序） */
    const getPages = (): HTMLElement[] =>
      Array.from(
        document.querySelectorAll<HTMLElement>('main > section, footer'),
      );

    /** 根据当前 scrollY 找到最接近的页面索引 */
    const getCurrentIndex = (): number => {
      const pages = getPages();
      const scrollY = window.scrollY;
      let closest = 0;
      let minDist = Infinity;
      pages.forEach((page, i) => {
        const dist = Math.abs(scrollY - page.offsetTop);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      return closest;
    };

    /** 用缓动曲线平滑滚动到目标页面 */
    const scrollToIndex = (targetIndex: number) => {
      const pages = getPages();
      if (targetIndex < 0 || targetIndex >= pages.length) return;

      const target = pages[targetIndex];
      const targetY = target.offsetTop;
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 2) return;

      const startTime = performance.now();
      isAnimating.current = true;

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isAnimating.current = false;
          // 动画结束后设置冷却期，忽略 trackpad 惯性滚动
          if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
          cooldownTimer.current = window.setTimeout(() => {
            isAnimating.current = false;
          }, COOLDOWN);
        }
      };

      requestAnimationFrame(animate);
    };

    const onWheel = (e: WheelEvent) => {
      // 在表单元素内滚动时不拦截（textarea/input 需要原生滚动）
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'INPUT' ||
        target.closest('textarea, input')
      ) {
        return;
      }

      // 始终阻止原生滚动（桌面端完全由 JS 接管）
      e.preventDefault();

      // 动画进行中或冷却期内忽略
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      const currentIndex = getCurrentIndex();
      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToIndex(currentIndex + direction);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      // 在表单元素内不拦截键盘
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'INPUT' ||
        target.closest('textarea, input')
      ) {
        return;
      }

      const currentIndex = getCurrentIndex();
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          scrollToIndex(currentIndex + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          scrollToIndex(currentIndex - 1);
          break;
        case ' ':
          e.preventDefault();
          scrollToIndex(currentIndex + (e.shiftKey ? -1 : 1));
          break;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, []);
}

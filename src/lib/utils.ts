import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 平滑滚动到本页锚点（#xxx）
 *
 * 不依赖浏览器 behavior:'smooth'（移动端可能被 scroll-snap 或其他因素吞掉），
 * 用 requestAnimationFrame 自己实现 easeInOutCubic 缓动，每帧强制 scrollTo，
 * 任何 snap 干扰都会被下一帧覆盖。
 */
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function scrollToAnchor(href: string): void {
  if (typeof window === 'undefined') return;
  if (!href.startsWith('#')) return;
  const target = document.querySelector(href) as HTMLElement | null;
  if (!target) return;

  // 1. 恢复 body 滚动（防止被抽屉菜单的 overflow:hidden 锁住）
  document.body.style.overflow = '';

  const html = document.documentElement;
  // 2. 临时关闭 snap（防止 mandatory 把页面拉回当前页）
  const prevSnap = html.style.scrollSnapType;
  html.style.scrollSnapType = 'none';

  // 3. 用 rAF 自实现平滑滚动，每帧强制 scrollTo
  const targetY = target.getBoundingClientRect().top + window.scrollY;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 600;
  const startTime = performance.now();

  const animate = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // 滚动结束后恢复 snap
      html.style.scrollSnapType = prevSnap;
    }
  };

  requestAnimationFrame(animate);
}

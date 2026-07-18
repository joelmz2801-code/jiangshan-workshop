import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 平滑滚动到本页锚点（#xxx）
 *
 * 关键点：
 * 1. 先同步恢复 body.overflow — 移动端抽屉菜单打开时锁定过 body 滚动，
 *    必须先解锁，否则 scrollTo 会被浏览器拒绝
 * 2. 临时关闭 scroll-snap — 否则 mandatory snap 会把页面拉回当前页
 * 3. 用 window.scrollTo 替代 scrollIntoView — 行为更可控、跨浏览器更一致
 * 4. 滚动结束后恢复 snap（等待 1200ms，覆盖大部分移动端 smooth 滚动时长）
 */
export function scrollToAnchor(href: string): void {
  if (typeof window === 'undefined') return;
  if (!href.startsWith('#')) return;
  const target = document.querySelector(href) as HTMLElement | null;
  if (!target) return;

  // 1. 同步恢复 body 滚动（关键：防止被抽屉菜单的 overflow:hidden 锁住）
  document.body.style.overflow = '';

  const html = document.documentElement;
  // 2. 临时关闭 snap
  const prevSnap = html.style.scrollSnapType;
  html.style.scrollSnapType = 'none';

  // 3. 用 window.scrollTo 平滑滚动到目标位置
  const top = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: 'smooth' });

  // 4. 滚动结束后恢复 snap
  // 优先用 scrollend 事件（现代浏览器），fallback 用 setTimeout
  let restored = false;
  const restore = () => {
    if (restored) return;
    restored = true;
    html.style.scrollSnapType = prevSnap;
    window.removeEventListener('scrollend', restore);
  };
  window.addEventListener('scrollend', restore, { once: true });
  // Fallback：最长 1500ms 后强制恢复
  window.setTimeout(restore, 1500);
}

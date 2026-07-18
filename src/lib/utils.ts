import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 平滑滚动到本页锚点（#xxx）
 * 移动端 CSS scroll-snap: y mandatory 会卡住原生锚点跳转，
 * 所以临时关闭 snap → smooth 滚动 → 滚动结束后恢复 snap
 */
export function scrollToAnchor(href: string): void {
  if (typeof window === 'undefined') return;
  if (!href.startsWith('#')) return;
  const target = document.querySelector(href);
  if (!target) return;

  const html = document.documentElement;
  const prevSnap = html.style.scrollSnapType;
  html.style.scrollSnapType = 'none';

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // 滚动结束后恢复 snap（保守等待 800ms）
  window.setTimeout(() => {
    html.style.scrollSnapType = prevSnap;
  }, 800);
}

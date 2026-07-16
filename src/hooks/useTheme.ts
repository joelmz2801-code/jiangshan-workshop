import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

/**
 * 判断是否为移动端（≤ 768px）
 * 用于决定未保存主题时的默认值：移动端默认 light，桌面端跟随系统偏好
 */
function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
}

/**
 * 主题状态管理
 * - 初始值与 index.html 中的 inline 脚本保持一致，避免 SSR/CSR 不匹配
 * - 切换时持久化到 localStorage 并同步 <html> class
 * - 移动端未保存偏好时默认 light（避免暗色预设）
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    // 与 index.html 中的初始化脚本保持一致
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    // 移动端默认亮色；桌面端跟随系统偏好
    if (isMobileViewport()) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // 忽略 localStorage 不可用的情况
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}

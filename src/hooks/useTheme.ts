import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

/**
 * 主题状态管理
 * - 初始值与 index.html 中的 inline 脚本保持一致，避免 SSR/CSR 不匹配
 * - 切换时持久化到 localStorage 并同步 <html> class
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    // 与 index.html 中的初始化脚本保持一致
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
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

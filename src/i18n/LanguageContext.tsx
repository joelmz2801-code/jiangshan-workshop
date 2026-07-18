import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/**
 * 多语言系统
 * - zh: 纯中文
 * - en: 纯英文
 * - bi: 双语（中文为主，英文小字）— 预设
 */

export type LanguageMode = 'zh' | 'en' | 'bi';

export interface LocalizedText {
  zh: string;
  en: string;
}

interface LanguageContextValue {
  mode: LanguageMode;
  setMode: (mode: LanguageMode) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'klb-lang-mode';

function readStoredMode(): LanguageMode {
  if (typeof window === 'undefined') return 'bi';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'zh' || stored === 'en' || stored === 'bi') return stored;
  } catch {
    // localStorage 不可用时回退默认值
  }
  return 'bi';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<LanguageMode>(readStoredMode);

  const setMode = (next: LanguageMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 忽略写入失败
    }
  };

  // 同步到 html lang 属性
  useEffect(() => {
    const langAttr = mode === 'en' ? 'en' : 'zh-CN';
    document.documentElement.lang = langAttr;
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * useT — 返回根据当前语言模式取文案的函数
 * - zh: 返回中文字符串
 * - en: 返回英文字符串
 * - bi: 返回中文（主显示）；英文通过 useT().en() 单独获取用于小字显示
 */
export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useT 必须在 LanguageProvider 内使用');
  }
  const { mode } = ctx;

  /** 取主显示文案（双语模式返回中文） */
  const t = (text: LocalizedText): string =>
    mode === 'en' ? text.en : text.zh;

  /** 是否显示英文小字（仅双语模式） */
  const showEnSub = mode === 'bi';

  /** 取英文文案 */
  const en = (text: LocalizedText): string => text.en;

  /** 取中文文案 */
  const zh = (text: LocalizedText): string => text.zh;

  return { mode, t, en, zh, showEnSub, setMode: ctx.setMode };
}

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
 *
 * 持久化策略：使用 sessionStorage 而非 localStorage
 * - 刷新页面：保持当前会话内选择的语言模式（如用户已切换为纯中文）
 *   注意：用户需求是"刷新时回到中英文混合显示"，所以刷新时强制重置为 bi
 * - 关闭标签页/窗口：会话结束，下次打开回到 bi 默认
 * - 实际实现：不读取任何存储，每次加载默认 bi；切换仅在内存中生效
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 每次页面加载默认双语模式（bi），不持久化读取
  // 用户点击"中文"或"英文"按钮仅在当前会话内生效，刷新后回到 bi
  const [mode, setModeState] = useState<LanguageMode>('bi');

  const setMode = (next: LanguageMode) => {
    setModeState(next);
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

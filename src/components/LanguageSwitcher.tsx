import { useEffect, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { useT, type LanguageMode } from '@/i18n/LanguageContext';

const OPTIONS: { mode: LanguageMode; label: string; full: string }[] = [
  { mode: 'bi', label: '中/EN', full: '双语' },
  { mode: 'zh', label: '中', full: '中文' },
  { mode: 'en', label: 'EN', full: 'English' },
];

/**
 * 语言切换器
 * - 桌面端：三按钮分段选择器（中/EN/中/EN）
 * - 移动端：抽屉内显示为纵向列表
 * - 当前选中项高亮，使用 primary 色背景
 */
export default function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { mode, setMode } = useT();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉
  useEffect(() => {
    if (mobile) return; // 移动端不使用下拉
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [mobile]);

  if (mobile) {
    // 移动端：纵向列表
    return (
      <div className="flex flex-col" style={{ gap: '0.25rem', marginTop: '0.5rem' }}>
        <div
          style={{
            fontSize: '12px',
            color: 'hsl(var(--muted-foreground))',
            padding: '0.5rem 0.75rem 0.25rem',
            letterSpacing: '0.02em',
          }}
        >
          语言 / Language
        </div>
        {OPTIONS.map((opt) => {
          const active = mode === opt.mode;
          return (
            <button
              key={opt.mode}
              type="button"
              onClick={() => setMode(opt.mode)}
              className="flex items-center justify-between rounded-md px-3 py-3 transition-colors duration-200"
              style={{
                background: active ? 'hsl(var(--muted))' : 'transparent',
                color: 'hsl(var(--foreground))',
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600, minWidth: '42px' }}>{opt.label}</span>
                <span style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}>
                  {opt.full}
                </span>
              </span>
              {active && <Check size={16} style={{ color: 'hsl(var(--secondary))' }} />}
            </button>
          );
        })}
      </div>
    );
  }

  // 桌面端：分段按钮（最紧凑形式，单字符显示）
  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center"
      style={{
        background: 'hsl(var(--muted) / 0.5)',
        border: '1px solid hsl(var(--border))',
        borderRadius: '999px',
        padding: '2px',
      }}
    >
      {OPTIONS.map((opt) => {
        const active = mode === opt.mode;
        return (
          <button
            key={opt.mode}
            type="button"
            onClick={() => setMode(opt.mode)}
            aria-label={opt.full}
            aria-pressed={active}
            className="transition-all duration-200"
            style={{
              background: active ? 'hsl(var(--foreground))' : 'transparent',
              color: active ? 'hsl(var(--background))' : 'hsl(var(--muted-foreground))',
              border: 'none',
              borderRadius: '999px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              lineHeight: 1.2,
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.color = 'hsl(var(--foreground))';
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
              }
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

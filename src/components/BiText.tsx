import type { ReactNode } from 'react';
import type { LocalizedText } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/LanguageContext';

interface BiTextProps {
  text: LocalizedText;
  /** 英文小字的样式（仅在双语模式下生效） */
  enClassName?: string;
  enStyle?: React.CSSProperties;
  /** 主文本的标签，默认 span */
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * BiText — 自适应多语言文本组件
 * - zh 模式：仅渲染中文
 * - en 模式：仅渲染英文
 * - bi 模式：渲染中文主文本 + 英文小字（次行）
 */
export default function BiText({
  text,
  enClassName,
  enStyle,
  as: Tag = 'span',
  className,
  style,
}: BiTextProps) {
  const { mode, t, showEnSub } = useT();

  if (mode === 'bi') {
    return (
      <span className={className} style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1.3 }}>
        <Tag style={style}>{text.zh}</Tag>
        <span
          className={enClassName}
          style={{
            color: 'hsl(var(--secondary))',
            fontSize: '0.7em',
            opacity: 0.85,
            marginTop: '0.15em',
            letterSpacing: '0.02em',
            fontWeight: 400,
            ...enStyle,
          }}
        >
          {text.en}
        </span>
      </span>
    );
  }

  // 纯中文或纯英文模式
  return <Tag className={className} style={style}>{t(text)}</Tag>;
}

/** 段落型双语文本（用于较长的描述），双语模式下英文小字换行显示 */
export function BiParagraph({
  text,
  enStyle,
  className,
  style,
}: {
  text: LocalizedText;
  enStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { mode, t, showEnSub } = useT();

  if (mode === 'bi') {
    return (
      <div className={className} style={style}>
        <p style={{ margin: 0 }}>{text.zh}</p>
        <p
          style={{
            margin: 0,
            marginTop: '0.5em',
            color: 'hsl(var(--secondary))',
            fontSize: '0.85em',
            opacity: 0.8,
            lineHeight: 1.6,
            ...enStyle,
          }}
        >
          {text.en}
        </p>
      </div>
    );
  }

  return <p className={className} style={{ margin: 0, ...style }}>{t(text)}</p>;
}

/** 提供给外部消费的 ReactNode 类型 */
export type { ReactNode };

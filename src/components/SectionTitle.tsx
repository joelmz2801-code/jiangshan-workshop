import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { useT } from '@/i18n/LanguageContext';
import type { LocalizedText } from '@/i18n/LanguageContext';

interface SectionTitleProps {
  title: LocalizedText;
  subtitle?: LocalizedText;
  className?: string;
}

/**
 * 区块标题组件 — 居中的主标题 + 副标题，带滚动渐显动画
 * 支持多语言：双语模式下显示中文主+英文小字
 */
export default function SectionTitle({
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  const { mode, t, showEnSub } = useT();

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn('text-center', className)}
    >
      {mode === 'bi' ? (
        <>
          <h2
            className="font-sans font-semibold leading-tight"
            style={{
              color: 'hsl(var(--foreground))',
              fontSize: 'clamp(26px, 3vw, 38px)',
              lineHeight: 1.2,
              textWrap: 'balance',
              wordBreak: 'keep-all',
              margin: 0,
            }}
          >
            {title.zh}
          </h2>
          <p
            className="font-sans"
            style={{
              color: 'hsl(var(--secondary))',
              fontSize: 'clamp(13px, 1.2vw, 16px)',
              opacity: 0.85,
              marginTop: '0.4rem',
              letterSpacing: '0.02em',
              fontWeight: 400,
            }}
          >
            {title.en}
          </p>
        </>
      ) : (
        <h2
          className="font-sans font-semibold leading-tight"
          style={{
            color: 'hsl(var(--foreground))',
            fontSize: 'clamp(26px, 3vw, 38px)',
            lineHeight: 1.2,
            textWrap: 'balance',
            wordBreak: 'keep-all',
            margin: 0,
          }}
        >
          {t(title)}
        </h2>
      )}

      {subtitle && (
        mode === 'bi' ? (
          <>
            <p
              className="mx-auto mt-4"
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '16px',
                lineHeight: 1.7,
                maxWidth: '560px',
              }}
            >
              {subtitle.zh}
            </p>
            <p
              className="mx-auto"
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '13px',
                lineHeight: 1.6,
                maxWidth: '560px',
                opacity: 0.85,
                marginTop: '0.3rem',
              }}
            >
              {subtitle.en}
            </p>
          </>
        ) : (
          <p
            className="mx-auto mt-4"
            style={{
              color: 'hsl(var(--muted-foreground))',
              fontSize: '16px',
              lineHeight: 1.7,
              maxWidth: '560px',
            }}
          >
            {t(subtitle)}
          </p>
        )
      )}
    </motion.div>
  );
}

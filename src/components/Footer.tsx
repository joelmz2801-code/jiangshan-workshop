import { site, footer } from '@/data/content';
import { useT } from '@/i18n/LanguageContext';

/**
 * 页脚 — 深色背景，品牌信息 + 社交链接 + 版权
 * 支持多语言：双语模式下中文主+英文小字
 */
export default function Footer() {
  const { mode, t } = useT();

  return (
    <footer
      style={{
        background: 'hsl(var(--foreground))',
        color: 'hsl(var(--primary-foreground))',
        padding: '3rem 1.5rem',
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        className="mx-auto flex flex-col items-center justify-between md:flex-row"
        style={{ maxWidth: '1280px', gap: '1rem' }}
      >
        <div className="flex items-center" style={{ gap: '0.5rem' }}>
          <img
            src="/assets/logo.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-4"
            style={{
              color: 'hsl(var(--primary-foreground))',
              opacity: 0.7,
            }}
          />
          <span
            className="font-sans font-semibold"
            style={{ fontSize: '15px', letterSpacing: '0.02em' }}
          >
            {site.name}
          </span>
        </div>

        <div
          className="flex items-center"
          style={{ gap: '1.5rem', marginRight: 'auto', marginLeft: '2rem' }}
        >
          <a
            href={footer.rednoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200"
            style={{
              color: 'hsl(var(--primary-foreground))',
              fontSize: '13px',
              opacity: 0.85,
              textDecoration: 'none',
              padding: '6px 14px',
              border: '1px solid hsl(var(--primary-foreground) / 0.4)',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.borderColor =
                'hsl(var(--primary-foreground))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.85';
              e.currentTarget.style.borderColor =
                'hsl(var(--primary-foreground) / 0.4)';
            }}
          >
            {mode === 'bi' ? (
              <>
                <span>{footer.rednoteLabel.zh}</span>
                <span style={{ fontSize: '11px', opacity: 0.85 }}>
                  {footer.rednoteLabel.en}
                </span>
              </>
            ) : (
              <span>{t(footer.rednoteLabel)}</span>
            )}
          </a>
        </div>

        <p style={{ fontSize: '13px', opacity: 0.6 }}>{t(footer.copyright)}</p>
      </div>
    </footer>
  );
}

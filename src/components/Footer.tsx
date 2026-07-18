import { site, footer } from '@/data/content';
import { useT } from '@/i18n/LanguageContext';

/**
 * 页脚 — 深色背景，品牌信息 + 版权
 * 小红书入口已移至 Contact 区（邮箱下方），便于客户看到
 * 支持多语言：双语模式下中文主+英文小字
 */
export default function Footer() {
  const { t } = useT();

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
        className="mx-auto flex flex-col items-center justify-center md:flex-row"
        style={{ maxWidth: '1280px', gap: '1.5rem' }}
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

        <p style={{ fontSize: '13px', opacity: 0.6 }}>{t(footer.copyright)}</p>
      </div>
    </footer>
  );
}

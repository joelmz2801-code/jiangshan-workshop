import { site, footer } from '@/data/content';

/**
 * 页脚 — 深色背景，品牌信息 + 版权
 */
export default function Footer() {
  return (
    <footer
      style={{
        background: 'hsl(var(--foreground))',
        color: 'hsl(var(--primary-foreground))',
        padding: '3rem 1.5rem',
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
        <p style={{ fontSize: '13px', opacity: 0.6 }}>{footer.copyright}</p>
      </div>
    </footer>
  );
}

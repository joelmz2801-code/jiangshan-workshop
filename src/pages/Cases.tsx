import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { site, casesPageText } from '@/data/content';
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useT } from '@/i18n/LanguageContext';

/**
 * 真实案例页 — 展示修复前后的对比效果
 * 4 组对比：A / B / C / D（每组 1=修复前、2=修复后）
 * 支持多语言：双语模式下中文主+英文小字
 */
interface CaseGroup {
  id: string;
  before: string;
  after: string;
}

const caseGroups: CaseGroup[] = [
  { id: 'A', before: './assets/cases/A1.jpeg', after: './assets/cases/A2.jpeg' },
  { id: 'B', before: './assets/cases/B1.jpeg', after: './assets/cases/B2.jpeg' },
  { id: 'C', before: './assets/cases/C1.jpeg', after: './assets/cases/C2.jpeg' },
  { id: 'D', before: './assets/cases/D1.jpeg', after: './assets/cases/D2.jpeg' },
];

export default function Cases() {
  const { mode, t } = useT();

  /** 渲染双语文本（中文主+英文小字） */
  const renderBi = (text: { zh: string; en: string }) => {
    if (mode === 'bi') {
      return (
        <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span>{text.zh}</span>
          <span style={{ fontSize: '0.7em', opacity: 0.8, marginTop: '0.15em' }}>
            {text.en}
          </span>
        </span>
      );
    }
    return <span>{t(text)}</span>;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'hsl(var(--background))' }}>
      {/* 顶部导航条 */}
      <header
        className="fixed left-0 right-0 top-0 z-50"
        style={{
          background: 'hsl(var(--background) / 0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid hsl(var(--border))',
        }}
      >
        <div
          className="mx-auto flex items-center justify-between px-6 lg:px-8"
          style={{ maxWidth: '1280px', height: '72px' }}
        >
          <a
            href="./index.html"
            className="inline-flex items-center no-underline transition-colors duration-200"
            style={{ gap: '0.5rem', color: 'hsl(var(--muted-foreground))' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'hsl(var(--foreground))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
            }}
          >
            <ArrowLeft size={18} />
            <span style={{ fontSize: '14px' }}>
              {mode === 'bi' ? (
                <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1.2, alignItems: 'flex-start' }}>
                  <span>{casesPageText.backHome.zh}</span>
                  <span style={{ fontSize: '11px', opacity: 0.65, marginTop: '2px' }}>{casesPageText.backHome.en}</span>
                </span>
              ) : (
                t(casesPageText.backHome)
              )}
            </span>
          </a>

          <div className="flex items-center" style={{ gap: '1.25rem' }}>
            <LanguageSwitcher />
            <div className="flex items-center" style={{ gap: '0.5rem' }}>
              <img
                src="/assets/logo.svg"
                alt=""
                aria-hidden="true"
                className="h-5 w-5"
                style={{ color: 'hsl(var(--foreground))' }}
              />
              <span
                className="font-sans font-semibold"
                style={{
                  color: 'hsl(var(--foreground))',
                  fontSize: '20px',
                  letterSpacing: '0.02em',
                }}
              >
                {site.name}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="px-6 lg:px-8" style={{ paddingTop: '140px', paddingBottom: '120px' }}>
        <div className="mx-auto" style={{ maxWidth: '1280px' }}>
          {/* 标题 */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            viewport={viewportOnce}
            className="text-center"
          >
            {mode === 'bi' ? (
              <>
                <h1
                  className="font-sans"
                  style={{
                    color: 'hsl(var(--foreground))',
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {casesPageText.title.zh}
                </h1>
                <p
                  className="font-sans"
                  style={{
                    color: 'hsl(var(--secondary))',
                    fontSize: 'clamp(14px, 1.3vw, 17px)',
                    opacity: 0.85,
                    marginTop: '0.4rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {casesPageText.title.en}
                </p>
              </>
            ) : (
              <h1
                className="font-sans"
                style={{
                  color: 'hsl(var(--foreground))',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {t(casesPageText.title)}
              </h1>
            )}
            <p
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '16px',
                marginTop: '1rem',
                lineHeight: 1.7,
              }}
            >
              {t(casesPageText.subtitle)}
            </p>
          </motion.div>

          {/* 案例对比网格 */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: '2rem', marginTop: '3.5rem' }}
          >
            {caseGroups.map((group) => (
              <motion.div
                key={group.id}
                variants={staggerItem}
                className="overflow-hidden"
                style={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              >
                {/* 对比图区域 */}
                <div
                  className="grid grid-cols-2"
                  style={{ minHeight: '280px' }}
                >
                  {/* 之前 */}
                  <div
                    className="relative"
                    style={{
                      borderRight: '1px solid hsl(var(--border))',
                      background: 'hsl(var(--muted))',
                    }}
                  >
                    <img
                      src={group.before}
                      alt={`${t(casesPageText.caseLabel)} ${group.id} ${t(casesPageText.before)}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      style={{ minHeight: '280px' }}
                    />
                    <span
                      className="absolute"
                      style={{
                        top: '12px',
                        left: '12px',
                        padding: '4px 10px',
                        background: 'hsl(var(--foreground) / 0.85)',
                        color: 'hsl(var(--primary-foreground))',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: '4px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {t(casesPageText.before)}
                    </span>
                  </div>
                  {/* 之后 */}
                  <div
                    className="relative"
                    style={{ background: 'hsl(var(--accent))' }}
                  >
                    <img
                      src={group.after}
                      alt={`${t(casesPageText.caseLabel)} ${group.id} ${t(casesPageText.after)}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      style={{ minHeight: '280px' }}
                    />
                    <span
                      className="absolute"
                      style={{
                        top: '12px',
                        left: '12px',
                        padding: '4px 10px',
                        background: 'hsl(var(--secondary))',
                        color: 'hsl(var(--secondary-foreground))',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: '4px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {t(casesPageText.after)}
                    </span>
                  </div>
                </div>
                {/* 案例说明 */}
                <div
                  className="flex items-center justify-between"
                  style={{ padding: '1.25rem 1.5rem' }}
                >
                  <span
                    style={{
                      color: 'hsl(var(--foreground))',
                      fontSize: '15px',
                      fontWeight: 600,
                    }}
                  >
                    {mode === 'bi' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.35rem' }}>
                        <span>{casesPageText.caseLabel.zh} {group.id}</span>
                        <span style={{ fontSize: '11px', opacity: 0.65 }}>{casesPageText.caseLabel.en} {group.id}</span>
                      </span>
                    ) : (
                      <span>{t(casesPageText.caseLabel)} {group.id}</span>
                    )}
                  </span>
                  <span
                    style={{
                      color: 'hsl(var(--muted-foreground))',
                      fontSize: '13px',
                    }}
                  >
                    {t(casesPageText.desc)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <ThemeToggle />
    </div>
  );
}

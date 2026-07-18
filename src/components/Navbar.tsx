import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, site, casesNavLabel, menuLabels } from '@/data/content';
import { useT } from '@/i18n/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

/**
 * 导航栏
 * - 桌面：Logo + 横向链接 + 语言切换器
 * - 移动端：汉堡按钮 → 全屏抽屉菜单
 * - 固定顶部、毛玻璃背景
 * 支持多语言：双语模式下中文主+英文小字
 */
export default function Navbar() {
  const { mode, t } = useT();
  const [mobileOpen, setMobileOpen] = useState(false);

  // 移动菜单打开时锁定 body 滚动
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // ESC 关闭菜单
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  /** 渲染导航链接文本（双语模式中文主+英文小字） */
  const renderNavLabel = (text: { zh: string; en: string }) => {
    if (mode === 'bi') {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.35rem' }}>
          <span>{text.zh}</span>
          <span style={{ fontSize: '11px', opacity: 0.65, letterSpacing: '0.02em' }}>
            {text.en}
          </span>
        </span>
      );
    }
    return <span>{t(text)}</span>;
  };

  return (
    <nav
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
        {/* Logo */}
        <a
          href="#hero"
          className="inline-flex items-center no-underline"
          style={{ gap: '0.5rem' }}
          aria-label={site.name}
        >
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
        </a>

        {/* 桌面导航 */}
        <div className="hidden md:flex items-center" style={{ gap: '2rem' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link transition-colors duration-200"
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '14px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'hsl(var(--foreground))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
              }}
            >
              {renderNavLabel(link.label)}
            </a>
          ))}
          {/* 真实案例 — 新窗口打开 */}
          <a
            href="./cases.html"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link transition-colors duration-200"
            style={{
              color: 'hsl(var(--muted-foreground))',
              fontSize: '14px',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'hsl(var(--foreground))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
            }}
          >
            {renderNavLabel(casesNavLabel)}
          </a>

          {/* 语言切换器 */}
          <LanguageSwitcher />
        </div>

        {/* 移动端汉堡按钮 */}
        <button
          type="button"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-md"
          aria-label={mobileOpen ? t(menuLabels.close) : t(menuLabels.open)}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          style={{ color: 'hsl(var(--foreground))' }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* 移动端抽屉菜单 */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'hsl(var(--background))',
              borderBottom: '1px solid hsl(var(--border))',
            }}
          >
            <div
              className="flex flex-col px-6 py-4"
              style={{ gap: '0.25rem' }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="block rounded-md px-3 py-3 transition-colors duration-200"
                  style={{
                    color: 'hsl(var(--foreground))',
                    fontSize: '16px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'hsl(var(--muted))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {renderNavLabel(link.label)}
                </a>
              ))}
              {/* 真实案例 — 新窗口打开 */}
              <a
                href="./cases.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="block rounded-md px-3 py-3 transition-colors duration-200"
                style={{
                  color: 'hsl(var(--foreground))',
                  fontSize: '16px',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'hsl(var(--muted))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {renderNavLabel(casesNavLabel)}
              </a>

              {/* 移动端语言切换器（纵向列表） */}
              <div style={{ borderTop: '1px solid hsl(var(--border))', marginTop: '0.5rem', paddingTop: '0.25rem' }}>
                <LanguageSwitcher mobile />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

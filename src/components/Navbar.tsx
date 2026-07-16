import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, site } from '@/data/content';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50" style={{ background: 'hsl(var(--background) / 0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid hsl(var(--border))' }}>
      <div className="mx-auto flex items-center justify-between px-6 lg:px-8" style={{ maxWidth: '1280px', height: '72px' }}>
        <a href="#hero" className="inline-flex items-center no-underline" style={{ gap: '0.5rem' }} aria-label={site.name}>
          <img src="/assets/logo.svg" alt="" aria-hidden="true" className="h-5 w-5" style={{ color: 'hsl(var(--foreground))' }} />
          <span className="font-sans font-semibold" style={{ color: 'hsl(var(--foreground))', fontSize: '20px', letterSpacing: '0.02em' }}>{site.name}</span>
        </a>
        <div className="hidden md:flex items-center" style={{ gap: '2.5rem' }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link transition-colors duration-200" style={{ color: 'hsl(var(--muted-foreground))', fontSize: '14px', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'hsl(var(--foreground))'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'hsl(var(--muted-foreground))'; }}
            >{link.label}</a>
          ))}
        </div>
        <button type="button" className="md:hidden flex h-10 w-10 items-center justify-center rounded-md" aria-label={mobileOpen ? '关闭菜单' : '打开菜单'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)} style={{ color: 'hsl(var(--foreground))' }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} className="md:hidden overflow-hidden" style={{ background: 'hsl(var(--background))', borderBottom: '1px solid hsl(var(--border))' }}>
            <div className="flex flex-col px-6 py-4" style={{ gap: '0.25rem' }}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-3 transition-colors duration-200" style={{ color: 'hsl(var(--foreground))', fontSize: '16px', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'hsl(var(--muted))'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >{link.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

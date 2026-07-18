import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Materials from '@/sections/Materials';
import Contact from '@/sections/Contact';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

/**
 * 首页 — 单页滚动结构
 * 桌面端使用 JS 接管的丝滑整页滚动（easeInOutCubic 缓动）
 */
export default function Home() {
  useSmoothScroll();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Materials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

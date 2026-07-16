import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import BackToTop from '@/components/BackToTop';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Materials from '@/sections/Materials';
import Contact from '@/sections/Contact';

/**
 * 首页 — 单页滚动结构
 */
export default function Home() {
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
      <ThemeToggle />
      <BackToTop />
    </div>
  );
}

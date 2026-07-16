import { motion } from 'framer-motion';
import { hero } from '@/data/content';
import { fadeInUp, viewportOnce } from '@/lib/motion';

/**
 * Hero 首屏区
 * - 全屏背景图 + 深色渐变遮罩
 * - 居中标题/副标题/CTA
 * - 底部弹跳的向下滚动指示器
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* 背景图 */}
      <img
        src={hero.image}
        alt={hero.imageAlt}
        // @ts-expect-error — React 18 使用小写 fetchpriority，类型定义可能未更新
        fetchpriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 40%' }}
      />
      {/* 渐变遮罩 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(var(--foreground) / 0.2) 0%, hsl(var(--foreground) / 0.55) 100%)',
        }}
      />

      {/* 内容 */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        viewport={viewportOnce}
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
        style={{ minHeight: '100vh' }}
      >
        <motion.h1
          variants={fadeInUp}
          style={{
            color: 'hsl(var(--primary-foreground))',
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 600,
            lineHeight: 1.18,
            letterSpacing: '-0.02em',
            textWrap: 'balance',
            wordBreak: 'keep-all',
            maxWidth: '680px',
          }}
        >
          {hero.title}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          style={{
            color: 'hsl(var(--primary-foreground) / 0.85)',
            fontSize: 'clamp(16px, 1.6vw, 20px)',
            lineHeight: 1.7,
            maxWidth: '520px',
            marginTop: '1.5rem',
          }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.a
          variants={fadeInUp}
          href={hero.ctaHref}
          className="hero-cta inline-flex items-center justify-center no-underline"
          whileHover={{ y: -1, filter: 'brightness(1.08)' }}
          whileTap={{ scale: 0.98, filter: 'brightness(0.96)' }}
          style={{
            marginTop: '2.5rem',
            padding: '14px 36px',
            background: 'hsl(var(--primary-foreground))',
            color: 'hsl(var(--primary))',
            borderRadius: 'var(--radius)',
            fontSize: '15px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          {hero.ctaText}
        </motion.a>

        {/* 向下滚动指示器 */}
        <a
          href="#services"
          aria-label="向下滚动"
          className="absolute bottom-8 left-1/2"
          style={{
            transform: 'translateX(-50%)',
            color: 'hsl(var(--primary-foreground) / 0.6)',
            animation: 'bounce-down 2s ease-in-out infinite',
          }}
        >
          <img
            src="/assets/arrow-down.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-6"
          />
        </a>
      </motion.div>
    </section>
  );
}

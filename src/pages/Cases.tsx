import { motion } from 'framer-motion';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { site } from '@/data/content';
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import ThemeToggle from '@/components/ThemeToggle';

/**
 * 真实案例页 — 展示修复前后的对比效果
 * 图片待后续提供，当前为占位状态
 */
export default function Cases() {
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
            <span style={{ fontSize: '14px' }}>返回首页</span>
          </a>

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
            <h1
              className="font-sans"
              style={{
                color: 'hsl(var(--foreground))',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              真实案例
            </h1>
            <p
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '16px',
                marginTop: '1rem',
                lineHeight: 1.7,
              }}
            >
              修复前后的真实对比，匠心效果一目了然
            </p>
          </motion.div>

          {/* 案例占位区 — 图片待提供 */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: '2rem', marginTop: '3.5rem' }}
          >
            {[1, 2, 3, 4].map((idx) => (
              <motion.div
                key={idx}
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
                  className="flex items-stretch"
                  style={{ minHeight: '280px' }}
                >
                  {/* 之前 */}
                  <div
                    className="flex flex-1 flex-col items-center justify-center"
                    style={{
                      background: 'hsl(var(--muted))',
                      borderRight: '1px solid hsl(var(--border))',
                      padding: '2rem 1rem',
                      gap: '0.75rem',
                    }}
                  >
                    <ImageIcon
                      size={32}
                      style={{ color: 'hsl(var(--muted-foreground))', opacity: 0.5 }}
                    />
                    <span
                      style={{
                        color: 'hsl(var(--muted-foreground))',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      之前
                    </span>
                  </div>
                  {/* 之后 */}
                  <div
                    className="flex flex-1 flex-col items-center justify-center"
                    style={{
                      background: 'hsl(var(--accent))',
                      padding: '2rem 1rem',
                      gap: '0.75rem',
                    }}
                  >
                    <ImageIcon
                      size={32}
                      style={{ color: 'hsl(var(--muted-foreground))', opacity: 0.5 }}
                    />
                    <span
                      style={{
                        color: 'hsl(var(--accent-foreground))',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      之后
                    </span>
                  </div>
                </div>
                {/* 案例说明 */}
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <span
                    style={{
                      color: 'hsl(var(--muted-foreground))',
                      fontSize: '14px',
                    }}
                  >
                    案例 {idx}：图片待上传
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 提示 */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center"
            style={{
              color: 'hsl(var(--muted-foreground))',
              fontSize: '14px',
              marginTop: '3rem',
              opacity: 0.7,
            }}
          >
            更多案例图片整理中，敬请期待
          </motion.p>
        </div>
      </main>

      <ThemeToggle />
    </div>
  );
}

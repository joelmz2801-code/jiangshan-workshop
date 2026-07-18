import { motion } from 'framer-motion';
import type { ServiceItem } from '@/data/content';
import { staggerItem, viewportOnce } from '@/lib/motion';
import { useT } from '@/i18n/LanguageContext';

interface ServiceCardProps {
  service: ServiceItem;
}

/**
 * 服务卡片 — 图片 + 标题 + 描述
 * hover 时上浮 + 图片放大
 * 支持多语言：双语模式下中文主+英文小字
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  const { mode, t } = useT();

  return (
    <motion.article
      variants={staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="service-card overflow-hidden h-full w-full"
      style={{
        background: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: 'var(--radius)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: 'clamp(220px, 32vh, 340px)' }}
      >
        <img
          src={service.image}
          alt={t(service.imageAlt)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: 'scale(1)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
          }}
        />
      </div>
      <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
        {mode === 'bi' ? (
          <>
            <h3
              className="font-sans font-semibold"
              style={{
                color: 'hsl(var(--foreground))',
                fontSize: '22px',
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              {service.title.zh}
            </h3>
            <p
              className="font-sans"
              style={{
                color: 'hsl(var(--foreground))',
                opacity: 0.55,
                fontSize: '13px',
                lineHeight: 1.4,
                marginTop: '0.4rem',
                letterSpacing: '0.02em',
                margin: 0,
              }}
            >
              {service.title.en}
            </p>
          </>
        ) : (
          <h3
            className="font-sans font-semibold"
            style={{
              color: 'hsl(var(--foreground))',
              fontSize: '22px',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {t(service.title)}
          </h3>
        )}
        {mode === 'bi' ? (
          <>
            <p
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '15px',
                lineHeight: 1.75,
                marginTop: '0.75rem',
                margin: 0,
              }}
            >
              {service.description.zh}
            </p>
            <p
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '13px',
                lineHeight: 1.65,
                marginTop: '0.5rem',
                opacity: 0.85,
                margin: 0,
              }}
            >
              {service.description.en}
            </p>
          </>
        ) : (
          <p
            style={{
              color: 'hsl(var(--muted-foreground))',
              fontSize: '15px',
              lineHeight: 1.75,
              marginTop: '0.75rem',
              margin: 0,
            }}
          >
            {t(service.description)}
          </p>
        )}
      </div>
    </motion.article>
  );
}

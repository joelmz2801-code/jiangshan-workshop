import { motion } from 'framer-motion';
import type { ServiceItem } from '@/data/content';
import { staggerItem, viewportOnce } from '@/lib/motion';

interface ServiceCardProps {
  service: ServiceItem;
}

/**
 * 服务卡片 — 图片 + 标题 + 描述
 * hover 时上浮 + 图片放大
 */
export default function ServiceCard({ service }: ServiceCardProps) {
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
        style={{ aspectRatio: '16 / 10' }}
      >
        <img
          src={service.image}
          alt={service.imageAlt}
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
      <div style={{ padding: '2rem 2rem 2.5rem' }}>
        <h3
          className="font-sans font-semibold"
          style={{
            color: 'hsl(var(--foreground))',
            fontSize: '22px',
            lineHeight: 1.3,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            color: 'hsl(var(--muted-foreground))',
            fontSize: '15px',
            lineHeight: 1.75,
            marginTop: '0.75rem',
          }}
        >
          {service.description}
        </p>
      </div>
    </motion.article>
  );
}

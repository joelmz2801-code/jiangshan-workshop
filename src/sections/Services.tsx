import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { services, sectionTitles, serviceAreas } from '@/data/content';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';

/**
 * 服务介绍区
 * - 前两个卡片宽度统一（各占一半），第三个卡片占满一行
 * - 底部展示服务覆盖区域（中英双语）
 * - 移动端单列
 */
export default function Services() {
  return (
    <section
      id="services"
      className="px-6 lg:px-8"
      style={{ paddingTop: '40px', paddingBottom: '120px' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <SectionTitle
          title={sectionTitles.services.title}
          subtitle={sectionTitles.services.subtitle}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '2rem', marginTop: '2rem' }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="min-w-0"
              style={{
                gridColumn: service.colSpan >= 12 ? '1 / -1' : undefined,
              }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </motion.div>

        {/* 服务覆盖区域（中英双语） */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center"
          style={{ marginTop: '3rem' }}
        >
          <div className="flex items-center" style={{ gap: '0.5rem' }}>
            <MapPin size={18} style={{ color: 'hsl(var(--secondary))' }} />
            <span
              className="font-sans font-semibold"
              style={{
                color: 'hsl(var(--foreground))',
                fontSize: '16px',
                letterSpacing: '0.02em',
              }}
            >
              服务区域
            </span>
          </div>
          <div
            className="flex flex-wrap items-center justify-center"
            style={{ gap: '1.5rem', marginTop: '1rem' }}
          >
            {serviceAreas.map((area) => (
              <div
                key={area.en}
                className="text-center"
                style={{ minWidth: '80px' }}
              >
                <div
                  style={{
                    color: 'hsl(var(--foreground))',
                    fontSize: '17px',
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {area.zh}
                </div>
                <div
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                    fontSize: '13px',
                    marginTop: '0.25rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {area.en}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

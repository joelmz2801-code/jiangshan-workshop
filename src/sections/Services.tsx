import { motion } from 'framer-motion';
import { services, sectionTitles } from '@/data/content';
import { staggerContainer, viewportOnce } from '@/lib/motion';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';

/**
 * 服务介绍区
 * - 12 栏网格：两卡片宽度统一（各占 6 栏），高度可不同
 * - 移动端单列
 */
export default function Services() {
  return (
    <section
      id="services"
      className="px-6 lg:px-8"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
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
          style={{ gap: '2rem', marginTop: '4rem' }}
        >
          {services.map((service) => (
            <div key={service.id} className="md:col-span-1">
              <ServiceCard service={service} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

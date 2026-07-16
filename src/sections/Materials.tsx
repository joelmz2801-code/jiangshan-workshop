import { motion } from 'framer-motion';
import { materials, sectionTitles } from '@/data/content';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import SectionTitle from '@/components/SectionTitle';

export default function Materials() {
  return (
    <section id="materials" className="px-6 lg:px-8" style={{ paddingTop: '120px', paddingBottom: '120px', background: 'hsl(var(--muted))' }}>
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <SectionTitle title={sectionTitles.materials.title} subtitle={sectionTitles.materials.subtitle} />
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '1.5rem', marginTop: '4rem' }}>
          {materials.map((material) => (
            <motion.article key={material.id} variants={staggerItem} whileHover={{ y: -3 }} transition={{ duration: 0.24, ease: 'easeOut' }} className="material-card overflow-hidden" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
                <img src={material.image} alt={material.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 ease-out"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
              </div>
              <div style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                <span className="font-sans font-semibold" style={{ color: 'hsl(var(--foreground))', fontSize: '16px' }}>{material.name}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { materials, sectionTitles } from '@/data/content';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import SectionTitle from '@/components/SectionTitle';
import { useT } from '@/i18n/LanguageContext';

/**
 * 材质展示区
 * - 浅米灰背景
 * - 3 列网格（移动端 2 列）
 * - 图片高度响应式 clamp，确保 snap 整页模式下内容完整展示
 * 支持多语言：双语模式下中文主+英文小字
 */
export default function Materials() {
  const { mode, t } = useT();

  return (
    <section
      id="materials"
      className="snap-section px-6 lg:px-8"
      style={{
        paddingTop: '96px',
        paddingBottom: '48px',
        background: 'hsl(var(--muted))',
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: '1280px' }}>
        <SectionTitle
          title={sectionTitles.materials.title}
          subtitle={sectionTitles.materials.subtitle}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 lg:grid-cols-3"
          style={{ gap: '1.25rem', marginTop: '2rem' }}
        >
          {materials.map((material) => (
            <motion.article
              key={material.id}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="material-card overflow-hidden"
              style={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ height: 'clamp(200px, 32vh, 340px)' }}
              >
                <img
                  src={material.image}
                  alt={t(material.imageAlt)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform =
                      'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform =
                      'scale(1)';
                  }}
                />
              </div>
              <div
                style={{
                  padding: '0.875rem 1rem',
                  textAlign: 'center',
                }}
              >
                {mode === 'bi' ? (
                  <>
                    <span
                      className="font-sans font-semibold"
                      style={{
                        color: 'hsl(var(--foreground))',
                        fontSize: '15px',
                        display: 'block',
                      }}
                    >
                      {material.name.zh}
                    </span>
                    <span
                      className="font-sans"
                      style={{
                        color: 'hsl(var(--secondary))',
                        fontSize: '12px',
                        display: 'block',
                        marginTop: '0.15rem',
                        opacity: 0.85,
                      }}
                    >
                      {material.name.en}
                    </span>
                  </>
                ) : (
                  <span
                    className="font-sans font-semibold"
                    style={{
                      color: 'hsl(var(--foreground))',
                      fontSize: '15px',
                    }}
                  >
                    {t(material.name)}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps { title: string; subtitle?: string; className?: string; }

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className={cn('text-center', className)}>
      <h2 className="font-sans font-semibold leading-tight" style={{ color: 'hsl(var(--foreground))', fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.2, textWrap: 'balance', wordBreak: 'keep-all' }}>{title}</h2>
      {subtitle && <p className="mx-auto mt-4" style={{ color: 'hsl(var(--muted-foreground))', fontSize: '16px', lineHeight: 1.7, maxWidth: '560px' }}>{subtitle}</p>}
    </motion.div>
  );
}

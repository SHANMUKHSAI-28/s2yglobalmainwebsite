import { motion } from 'framer-motion';

export default function SectionHeader({ label, title, subtitle, center = false }) {
  return (
    <motion.div
      className={center ? 'text-center' : ''}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      style={center ? { display: 'flex', flexDirection: 'column', alignItems: 'center' } : {}}
    >
      {label && <p className="section-label">{label}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  );
}

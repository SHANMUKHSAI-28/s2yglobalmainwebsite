import { motion } from 'framer-motion';
import './GlowDivider.css';

export default function GlowDivider() {
  return (
    <motion.div
      className="glow-divider"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="glow-divider__line" />
      <div className="glow-divider__dot" />
      <div className="glow-divider__line" />
    </motion.div>
  );
}

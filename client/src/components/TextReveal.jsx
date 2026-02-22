import { motion } from 'framer-motion';

export default function TextReveal({ children, className = '', delay = 0 }) {
  const words = children.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

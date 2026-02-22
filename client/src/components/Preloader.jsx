import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: loading, 1: reveal, 2: done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => {
      setPhase(2);
      onComplete?.();
    }, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="preloader__content">
            {/* Animated logo */}
            <motion.div
              className="preloader__logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.span
                className="preloader__s2y"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                S2Y
              </motion.span>
              <motion.span
                className="preloader__global"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Global
              </motion.span>
            </motion.div>

            {/* Loading bar */}
            <motion.div className="preloader__bar-track">
              <motion.div
                className="preloader__bar-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
              />
            </motion.div>

            <motion.p
              className="preloader__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Engineering Scalable Infrastructure
            </motion.p>
          </div>

          {/* Ambient glow */}
          <div className="preloader__glow preloader__glow--1" />
          <div className="preloader__glow preloader__glow--2" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

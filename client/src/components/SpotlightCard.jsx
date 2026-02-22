import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import './SpotlightCard.css';

export default function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const spotY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        '--spot-x': spotX,
        '--spot-y': spotY,
      }}
    >
      <motion.div
        className="spotlight-card__glow"
        style={{
          left: spotX,
          top: spotY,
        }}
      />
      <div className="spotlight-card__content">
        {children}
      </div>
    </motion.div>
  );
}

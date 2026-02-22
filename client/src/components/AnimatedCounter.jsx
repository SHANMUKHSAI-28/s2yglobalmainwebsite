import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function AnimatedCounter({ value, duration = 2000, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const isNumber = !isNaN(parseInt(value));

  useEffect(() => {
    if (!inView || !isNumber) return;
    const end = parseInt(value);
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{isNumber ? count : value}{suffix}
    </span>
  );
}

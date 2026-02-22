import { motion } from 'framer-motion';
import './GradientBorder.css';

export default function GradientBorder({ children, className = '', animate = true }) {
  return (
    <div className={`gradient-border ${animate ? 'gradient-border--animated' : ''} ${className}`}>
      <div className="gradient-border__inner">
        {children}
      </div>
    </div>
  );
}

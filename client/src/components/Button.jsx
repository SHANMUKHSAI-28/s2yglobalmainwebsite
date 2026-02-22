import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({ 
  children, 
  to, 
  href, 
  variant = 'primary', 
  icon = false,
  onClick,
  ...props 
}) {
  const className = `btn btn--${variant}`;
  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight size={16} className="btn__icon" />}
    </>
  );

  const motionProps = {
    className,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
    ...props,
  };

  if (to) {
    return (
      <motion.div {...motionProps} style={{ display: 'inline-block' }}>
        <Link to={to} className="btn__inner">{content}</Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>{content}</motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...motionProps}>{content}</motion.button>
  );
}

import React from 'react';
import { motion } from 'motion/react';

interface AnimatedMouseArrowProps {
  className?: string;
  color?: string;
  pulseColor?: string;
}

export const AnimatedMouseArrow: React.FC<AnimatedMouseArrowProps> = ({
  className = 'w-3.5 h-3.5',
  color = 'text-white',
  pulseColor = 'bg-white',
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6, x: -3, y: 3 }}
      animate={{
        opacity: 1,
        scale: [1, 0.88, 1.05, 1],
        x: [0, 2, 0],
        y: [0, -2, 0],
      }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{
        duration: 1.1,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className={`inline-flex items-center justify-center relative ${color} flex-shrink-0`}
    >
      {/* Click ripple wave */}
      <span className={`absolute -top-0.5 -left-0.5 w-2 h-2 rounded-full ${pulseColor} opacity-75 animate-ping pointer-events-none`} />
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" />
      </svg>
    </motion.span>
  );
};

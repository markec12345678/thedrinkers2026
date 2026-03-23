'use client';

import { motion } from 'framer-motion';
import { ReactNode, MouseEventHandler } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'crimson' | 'dark';
  hover?: boolean;
  floating?: boolean;
  delay?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function GlassCard({
  children,
  className = '',
  variant = 'default',
  hover = true,
  floating = false,
  delay = 0,
  onClick,
}: GlassCardProps) {
  const variantClasses = {
    default: 'glass',
    crimson: 'glass-crimson',
    dark: 'glass-dark',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? {
        y: -8,
        boxShadow: '0 20px 40px rgba(220, 20, 60, 0.3)'
      } : undefined}
      onClick={onClick}
      className={`
        ${variantClasses[variant]}
        rounded-lg
        backdrop-blur-md
        transition-all
        duration-300
        ${floating ? 'animate-float' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

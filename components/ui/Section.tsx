'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  background?: 'dark' | 'darker' | 'gradient';
  padding?: 'default' | 'none' | 'large';
}

export function Section({
  id,
  className = '',
  children,
  background = 'dark',
  padding = 'default',
}: SectionProps) {
  const bgClasses = {
    dark: 'bg-rock-dark',
    darker: 'bg-rock-black',
    gradient: 'bg-gradient-to-br from-rock-dark via-rock-gray to-rock-dark',
  };

  const paddingClasses = {
    default: 'py-20 px-4 md:px-8',
    none: '',
    large: 'py-32 px-4 md:px-8',
  };

  return (
    <motion.section
      id={id}
      className={`${bgClasses[background]} ${paddingClasses[padding]} ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}

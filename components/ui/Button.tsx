import { ButtonHTMLAttributes, forwardRef, ReactElement, cloneElement, isValidElement } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, asChild, ...props }, ref) => {
    const buttonClasses = cn(
      'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-300',
      variant === 'primary' && 'bg-gradient-to-r from-crimson to-crimson-light text-white border-2 border-crimson hover:bg-transparent hover:text-crimson hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(220,20,60,0.3)]',
      variant === 'secondary' && 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-rock-black hover:-translate-y-0.5',
      variant === 'outline' && 'bg-transparent text-crimson border-2 border-crimson hover:bg-crimson hover:text-white hover:-translate-y-0.5',
      variant === 'ghost' && 'bg-transparent text-white hover:text-crimson hover:bg-white/10',
      size === 'sm' && 'px-4 py-2 text-sm',
      size === 'md' && 'px-6 py-3 text-base',
      size === 'lg' && 'px-8 py-4 text-lg',
      className
    );

    if (asChild && isValidElement(children)) {
      const childProps = children.props as any;
      return cloneElement(children, {
        ...childProps,
        ...props,
        className: cn(childProps.className, buttonClasses),
        ref,
      } as any);
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

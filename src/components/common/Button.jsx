import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg' | 'icon'
  loading = false,
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-dark-900 select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-500 active:bg-brand-700 shadow-md hover:shadow-glow-red',
    secondary: 'bg-dark-800 text-slate-200 border border-slate-700/80 hover:bg-dark-700 hover:border-slate-600 hover:text-white shadow-sm',
    accent: 'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 shadow-md hover:shadow-glow-green',
    ghost: 'text-slate-300 hover:text-white hover:bg-dark-800',
    outline: 'border-2 border-brand-500 text-brand-400 hover:bg-brand-950/50 active:bg-brand-900/50',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 shadow-sm',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 font-bold',
    icon: 'p-2 rounded-xl',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};

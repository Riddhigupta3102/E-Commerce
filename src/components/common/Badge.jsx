import React from 'react';

export const Badge = ({
  children,
  variant = 'primary', // 'primary' | 'sale' | 'success' | 'warning' | 'neutral' | 'dark'
  size = 'md', // 'sm' | 'md'
  className = '',
  icon: Icon,
}) => {
  const variants = {
    primary: 'bg-brand-50 text-brand-700 border-brand-200/80',
    sale: 'bg-rose-50 text-rose-600 border-rose-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    dark: 'bg-slate-900 text-white border-slate-800',
  };

  const sizes = {
    sm: 'text-[10px] font-bold px-2 py-0.5 rounded-full',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 border ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

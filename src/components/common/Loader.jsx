import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ text = 'Loading...', size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-16 gap-3 ${className}`}>
      <Loader2 className={`${sizes[size] || sizes.md} animate-spin text-brand-600`} />
      {text && <p className="text-sm font-medium text-slate-500">{text}</p>}
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 flex flex-col gap-3">
      <div className="w-full aspect-[4/3] rounded-xl skeleton-shimmer" />
      <div className="space-y-2 py-1">
        <div className="h-3 w-1/3 rounded-md skeleton-shimmer" />
        <div className="h-4 w-4/5 rounded-md skeleton-shimmer" />
        <div className="h-3 w-2/5 rounded-md skeleton-shimmer" />
      </div>
      <div className="mt-auto pt-2 flex items-center justify-between">
        <div className="h-5 w-1/4 rounded-md skeleton-shimmer" />
        <div className="h-9 w-9 rounded-xl skeleton-shimmer" />
      </div>
    </div>
  );
};

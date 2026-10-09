import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured & Popular' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'discount', label: 'Biggest Discount' },
];

export const SortDropdown = ({ value = 'featured', onChange }) => {
  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-dark-800 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 shadow-sm hover:border-slate-600 transition-colors">
        <ArrowUpDown className="w-3.5 h-3.5 text-brand-400 shrink-0" />
        <span className="hidden sm:inline text-slate-400 font-normal">Sort:</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-white font-bold focus:outline-none cursor-pointer pr-1"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-dark-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

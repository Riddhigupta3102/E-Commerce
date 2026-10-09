import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/products';
import { formatCurrency } from '../../utils/formatters';
import { RatingStars } from '../common/RatingStars';
import { RotateCcw, Filter, Check, Sparkles } from 'lucide-react';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  onResetFilters,
  className = '',
}) => {
  const handleCategorySelect = (slug) => {
    onFilterChange('category', filters.category === slug ? 'all' : slug);
  };

  const handleBrandToggle = (brand) => {
    onFilterChange('brand', filters.brand === brand ? 'all' : brand);
  };

  const handleRatingSelect = (rating) => {
    onFilterChange('rating', filters.rating === rating ? 0 : rating);
  };

  return (
    <aside className={`space-y-6 text-slate-200 ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-500" />
          <h3 className="text-sm font-black uppercase tracking-wider text-white">Filters</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Categories
          </h4>
          <span className="text-[10px] uppercase font-bold text-brand-400 bg-brand-950 px-2 py-0.5 rounded border border-brand-800/80">
            Select
          </span>
        </div>

        <div className="space-y-1.5">
          <button
            onClick={() => onFilterChange('category', 'all')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              filters.category === 'all'
                ? 'bg-gradient-to-r from-brand-600 to-rose-600 text-white shadow-glow-red'
                : 'text-slate-300 hover:text-white hover:bg-dark-700/80'
            }`}
          >
            <span>All Categories</span>
            {filters.category === 'all' && <Check className="w-4 h-4 text-white stroke-[3]" />}
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-600 to-rose-600 text-white shadow-glow-red'
                    : 'text-slate-300 hover:text-white hover:bg-dark-700/80'
                }`}
              >
                <span>{cat.name}</span>
                {isSelected ? (
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 bg-dark-900 px-2 py-0.5 rounded border border-slate-700">
                    {cat.itemCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Max Price
          </h4>
          <span className="text-sm font-black text-emerald-400">
            {formatCurrency(filters.maxPrice)}
          </span>
        </div>

        <input
          type="range"
          min="20"
          max="2000"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
        />

        <div className="flex justify-between text-[11px] font-semibold text-slate-400">
          <span>₹20</span>
          <span>₹1,000</span>
          <span>₹2,000+</span>
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map((stars) => {
            const isSelected = filters.rating === stars;
            return (
              <button
                key={stars}
                onClick={() => handleRatingSelect(stars)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-700/80 shadow-xs'
                    : 'text-slate-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <RatingStars rating={stars} size="xs" />
                  <span className="text-slate-200 text-xs">& up</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Brands
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map((b) => {
            const isSelected = filters.brand.toLowerCase() === b.toLowerCase();
            return (
              <label
                key={b}
                onClick={() => handleBrandToggle(b)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-brand-950 text-brand-400 border border-brand-800 font-bold'
                    : 'text-slate-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <span>{b}</span>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  className="rounded text-brand-600 focus:ring-brand-500 w-3.5 h-3.5 accent-brand-600"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* In-Stock Only */}
      <div className="pt-4 border-t border-slate-800">
        <label className="flex items-center justify-between cursor-pointer p-2.5 rounded-xl bg-dark-900 border border-slate-800 hover:border-slate-700 transition-colors">
          <span className="text-xs font-bold text-slate-200">In Stock Items Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
            className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4 cursor-pointer accent-brand-600"
          />
        </label>
      </div>

    </aside>
  );
};

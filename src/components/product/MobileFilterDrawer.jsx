import React from 'react';
import { X } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';
import { Button } from '../common/Button';

export const MobileFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
  totalResults = 0,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-dark-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-slide-up text-white">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Filter Products</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filters */}
        <div className="p-5 overflow-y-auto flex-1">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
          />
        </div>

        {/* Apply CTA */}
        <div className="p-4 border-t border-slate-800 bg-dark-950">
          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="w-full shadow-glow-red"
          >
            Show {totalResults} Products
          </Button>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { MobileFilterDrawer } from '../components/product/MobileFilterDrawer';
import { ProductGrid } from '../components/product/ProductGrid';
import { SortDropdown } from '../components/product/SortDropdown';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Pagination } from '../components/common/Pagination';
import { Filter, LayoutGrid, List, X, Search, RotateCcw, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filters State
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'all',
    brand: searchParams.get('brand') || 'all',
    minPrice: 0,
    maxPrice: 2000,
    rating: 0,
    inStockOnly: false,
    sortBy: searchParams.get('sort') || 'featured',
    page: Number(searchParams.get('page')) || 1,
  });

  // Sync URL params to filter state when URL changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || 'all',
      brand: searchParams.get('brand') || 'all',
      sortBy: searchParams.get('sort') || 'featured',
      page: Number(searchParams.get('page')) || 1,
    }));
  }, [searchParams]);

  // Fetch products whenever filters state change
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      const res = await productService.getProducts({
        ...filters,
        limit: 9,
      });

      setProducts(res.products);
      setTotalProducts(res.total);
      setTotalPages(res.totalPages);
      setLoading(false);
    };

    fetchCatalog();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value, page: 1 };
      
      // Update URL query params
      const newParams = new URLSearchParams();
      if (updated.search) newParams.set('search', updated.search);
      if (updated.category !== 'all') newParams.set('category', updated.category);
      if (updated.brand !== 'all') newParams.set('brand', updated.brand);
      if (updated.sortBy !== 'featured') newParams.set('sort', updated.sortBy);
      setSearchParams(newParams);

      return updated;
    });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      brand: 'all',
      minPrice: 0,
      maxPrice: 2000,
      rating: 0,
      inStockOnly: false,
      sortBy: 'featured',
      page: 1,
    });
    setSearchParams({});
  };

  const hasActiveFilters =
    filters.search ||
    filters.category !== 'all' ||
    filters.brand !== 'all' ||
    filters.rating > 0 ||
    filters.inStockOnly ||
    filters.maxPrice < 2000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Products', to: '/products' },
          filters.category !== 'all'
            ? { label: filters.category.replace('-', ' ') }
            : null,
        ].filter(Boolean)}
      />

      {/* Page Title & Search bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-rose-300 to-emerald-400 capitalize">
            {filters.category !== 'all'
              ? filters.category.replace('-', ' ')
              : 'All Products'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Showing <strong className="text-white">{totalProducts}</strong> premium items
          </p>
        </div>

        {/* In-page Keyword Filter Bar */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full pl-9 pr-8 py-2 bg-dark-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 shadow-xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {filters.search && (
              <button
                onClick={() => handleFilterChange('search', '')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Chips (Replaced Blue with High-Contrast Fiery Red & Emerald) */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-xs font-bold text-slate-400 mr-1">Active Filters:</span>

          {filters.search && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-dark-800 text-white border border-slate-700">
              "{filters.search}"
              <button onClick={() => handleFilterChange('search', '')}>
                <X className="w-3.5 h-3.5 hover:text-brand-400" />
              </button>
            </span>
          )}

          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-xl bg-gradient-to-r from-brand-600 to-rose-600 text-white border border-brand-500 shadow-glow-red">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              Category: {filters.category.replace('-', ' ')}
              <button onClick={() => handleFilterChange('category', 'all')}>
                <X className="w-3.5 h-3.5 hover:text-slate-200" />
              </button>
            </span>
          )}

          {filters.brand !== 'all' && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-dark-800 text-emerald-400 border border-emerald-700/80 shadow-glow-green">
              Brand: {filters.brand}
              <button onClick={() => handleFilterChange('brand', 'all')}>
                <X className="w-3.5 h-3.5 hover:text-white" />
              </button>
            </span>
          )}

          {filters.rating > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-amber-950 text-amber-300 border border-amber-700">
              {filters.rating}★ & above
              <button onClick={() => handleFilterChange('rating', 0)}>
                <X className="w-3.5 h-3.5 hover:text-white" />
              </button>
            </span>
          )}

          {filters.maxPrice < 2000 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-dark-800 text-slate-200 border border-slate-700">
              Under {formatCurrency(filters.maxPrice)}
              <button onClick={() => handleFilterChange('maxPrice', 2000)}>
                <X className="w-3.5 h-3.5 hover:text-white" />
              </button>
            </span>
          )}

          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-700">
              In Stock Only
              <button onClick={() => handleFilterChange('inStockOnly', false)}>
                <X className="w-3.5 h-3.5 hover:text-white" />
              </button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-xs font-bold text-brand-400 hover:text-brand-300 ml-2 underline cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Showing Page Toolbar (Replaced White with Dark Theme Bar) */}
      <div className="flex items-center justify-between gap-4 bg-dark-800 p-3.5 rounded-2xl border border-slate-800 shadow-card">
        
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-900 border border-slate-700 text-xs font-bold text-white hover:border-brand-500 transition-colors"
        >
          <Filter className="w-4 h-4 text-brand-500" />
          <span>Filters {hasActiveFilters ? '• Active' : ''}</span>
        </button>

        <div className="hidden lg:block text-xs font-semibold text-slate-300">
          Showing page <span className="text-white font-bold">{filters.page}</span> of <span className="text-white font-bold">{totalPages}</span>
        </div>

        {/* Right Controls: Sort & Layout Toggle */}
        <div className="flex items-center gap-3 ml-auto">
          <SortDropdown
            value={filters.sortBy}
            onChange={(val) => handleFilterChange('sortBy', val)}
          />

          {/* View Mode Buttons */}
          <div className="hidden sm:flex items-center bg-dark-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-brand-600 text-white shadow-glow-red'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-brand-600 text-white shadow-glow-red'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Catalog Body: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Filter Sidebar (Replaced White with Dark Theme Container) */}
        <div className="hidden lg:block lg:col-span-1 bg-dark-800 p-6 rounded-2xl border border-slate-800 shadow-card sticky top-24">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Products Grid & Pagination */}
        <div className="lg:col-span-3 space-y-8">
          <ProductGrid
            products={products}
            loading={loading}
            viewMode={viewMode}
            onQuickView={setQuickViewProduct}
            onResetFilters={handleResetFilters}
          />

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={totalProducts}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

    </div>
  );
};

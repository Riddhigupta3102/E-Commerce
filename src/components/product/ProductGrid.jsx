import React from 'react';
import { ProductCard } from './ProductCard';
import { ProductListItem } from './ProductList';
import { ProductCardSkeleton } from '../common/Loader';
import { EmptyState } from '../common/EmptyState';
import { Search } from 'lucide-react';

export const ProductGrid = ({
  products = [],
  loading = false,
  viewMode = 'grid', // 'grid' | 'list'
  onQuickView,
  onResetFilters,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No matching products"
        description="Try adjusting your keywords, broadening your price range or clearing some filters to see available items."
        actionLabel="Reset All Filters"
        onAction={onResetFilters}
      />
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

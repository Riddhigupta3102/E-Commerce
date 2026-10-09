import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlistItems, wishlistCount, moveAllToCart, clearWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span>My Saved Wishlist</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistCount > 0 && (
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              icon={Trash2}
              onClick={clearWishlist}
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={ShoppingBag}
              onClick={moveAllToCart}
            >
              Move All to Cart
            </Button>
          </div>
        )}
      </div>

      {/* Wishlist Grid or Empty State */}
      {wishlistCount > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-12">
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Explore our curated catalog and click the heart icon on any product to save it here for later."
            actionLabel="Discover Products"
            actionTo="/products"
          />
        </div>
      )}

    </div>
  );
};

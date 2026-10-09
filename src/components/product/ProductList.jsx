import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, Check, Zap } from 'lucide-react';
import { formatCurrency, calculateDiscount } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Button } from '../common/Button';

export const ProductListItem = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const discountPercent = product.discount || calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <div className="group bg-dark-800 rounded-2xl border border-slate-800 hover:border-brand-600/60 shadow-card hover:shadow-card-hover transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-5">
      
      {/* Image */}
      <div className="relative w-full sm:w-52 sm:h-52 aspect-square sm:aspect-auto rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
        </Link>

        {discountPercent > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-brand-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md shadow-brand-600/40">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              {product.brand} • {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-slate-300 font-semibold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="text-base sm:text-lg font-bold text-white hover:text-brand-400 transition-colors line-clamp-1 mb-2"
          >
            {product.name}
          </Link>

          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {product.shortDescription || product.description}
          </p>

          {/* Color preview tags */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[11px] text-slate-400 font-medium mr-1">Colors:</span>
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  className="w-4 h-4 rounded-full border border-slate-700"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800 mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-400">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-slate-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2.5 rounded-xl border transition-colors ${
                inWishlist
                  ? 'bg-brand-600 border-brand-600 text-white shadow-glow-red'
                  : 'bg-dark-900 border-slate-700 text-slate-300 hover:text-brand-400 hover:bg-slate-800'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
            </button>

            {onQuickView && (
              <Button
                variant="secondary"
                size="sm"
                icon={Eye}
                onClick={() => onQuickView(product)}
              >
                Quick View
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              icon={isAdded ? Check : ShoppingBag}
              onClick={handleAddToCart}
            >
              {isAdded ? 'Added' : 'Cart'}
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={Zap}
              onClick={handleBuyNow}
              className="shadow-glow-red"
            >
              Buy Now
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
};

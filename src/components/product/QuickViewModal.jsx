import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';
import { formatCurrency, calculateDiscount } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, ShoppingBag, ArrowRight, Check, ShieldCheck, Truck } from 'lucide-react';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const currentColor = selectedColor || (product.colors && product.colors[0]?.name);
  const currentSize = selectedSize || (product.sizes && product.sizes[0]);
  const discountPercent = product.discount || calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = () => {
    addToCart(product, quantity, currentColor, currentSize);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentColor, currentSize);
    onClose();
    navigate('/checkout');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl" showClose={true}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
        
        {/* Left: Product Images */}
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
            <img
              src={product.images[activeImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 ${
                    activeImage === idx ? 'border-brand-600' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Options */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {product.brand} • {product.category.replace('-', ' ')}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mt-2">
              <RatingStars rating={product.rating} showCount={true} reviewsCount={product.reviewsCount} />
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-emerald-600">
                {product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-slate-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-sm text-slate-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  Save {discountPercent}%
                </span>
              </>
            )}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
            {product.shortDescription || product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Color: <strong className="text-brand-600 font-semibold">{currentColor}</strong></span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      currentColor === c.name ? 'border-brand-600 ring-2 ring-brand-500/20 scale-110' : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">
                <span>Size / Option:</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                      currentSize === s
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-l-xl font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-r-xl font-bold"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                size="md"
                className="flex-1"
                icon={ShoppingBag}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  inWishlist
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <Button
              variant="accent"
              size="md"
              className="w-full"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="font-bold text-brand-600 hover:underline inline-flex items-center gap-1"
            >
              View Full Product Specifications <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </Modal>
  );
};

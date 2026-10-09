import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { toggleWishlist } = useWishlist();

  const handleMoveToWishlist = () => {
    toggleWishlist({
      id: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      originalPrice: item.originalPrice,
      images: [item.image],
    });
    removeFromCart(item.cartId);
  };

  return (
    <div className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 last:border-0 text-slate-200">
      
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 min-w-0">
        <Link
          to={`/product/${item.slug}`}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 overflow-hidden shrink-0 border border-slate-800"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform opacity-90 hover:opacity-100"
          />
        </Link>

        <div className="min-w-0 space-y-1">
          <Link
            to={`/product/${item.slug}`}
            className="text-sm sm:text-base font-bold text-white hover:text-brand-400 transition-colors line-clamp-1"
          >
            {item.name}
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            {item.color && <span>Color: <strong className="text-slate-300">{item.color}</strong></span>}
            {item.size && (
              <>
                <span>•</span>
                <span>Size: <strong className="text-slate-300">{item.size}</strong></span>
              </>
            )}
          </div>

          <div className="text-xs font-semibold text-emerald-400">
            {formatCurrency(item.price)} each
          </div>
        </div>
      </div>

      {/* Quantity, Subtotal and Actions */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-6 shrink-0 self-end sm:self-center">
        
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-700 rounded-xl bg-dark-900 shadow-xs">
          <button
            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
            className="p-2 text-slate-400 hover:text-white hover:bg-dark-800 rounded-l-xl transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 text-xs font-bold text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
            className="p-2 text-slate-400 hover:text-white hover:bg-dark-800 rounded-r-xl transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total Price */}
        <div className="text-right min-w-[80px]">
          <span className="text-base font-black text-emerald-400">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>

        {/* Shortcuts */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleMoveToWishlist}
            className="p-2 text-slate-400 hover:text-brand-400 hover:bg-dark-800 rounded-xl transition-colors"
            title="Move to Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            onClick={() => removeFromCart(item.cartId)}
            className="p-2 text-slate-400 hover:text-brand-400 hover:bg-dark-800 rounded-xl transition-colors"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

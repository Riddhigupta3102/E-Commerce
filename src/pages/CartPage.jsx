import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { FreeShippingProgress } from '../components/cart/FreeShippingProgress';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';

export const CartPage = () => {
  const { cartItems, itemCount, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />

      {/* Page Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            You have <strong className="text-emerald-400">{itemCount}</strong> items in your cart
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-slate-400 hover:text-brand-400 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping bar */}
            <FreeShippingProgress />

            {/* Items Container */}
            <div className="bg-dark-800 rounded-2xl border border-slate-800 p-6 shadow-card divide-y divide-slate-800">
              {cartItems.map((item) => (
                <CartItem key={item.cartId} item={item} />
              ))}
            </div>

            {/* Bottom Back to Shop link */}
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-400 hover:text-brand-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Exploring Products</span>
              </Link>
            </div>

          </div>

          {/* Right: Summary Box */}
          <div className="lg:col-span-4 sticky top-24">
            <CartSummary showCheckoutBtn={true} />
          </div>

        </div>
      ) : (
        <div className="py-12">
          <EmptyState
            icon={ShoppingBag}
            title="Your shopping cart is empty"
            description="Explore our top-rated collections and add items to your cart."
            actionLabel="Discover Products"
            actionTo="/products"
          />
        </div>
      )}

    </div>
  );
};

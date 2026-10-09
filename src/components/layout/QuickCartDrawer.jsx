import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../common/Button';

export const QuickCartDrawer = () => {
  const navigate = useNavigate();
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    itemCount,
    subtotal,
    freeShippingRemaining,
    freeShippingProgress,
    updateQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-dark-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-slide-up text-white">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-500" />
              <h2 className="text-base font-bold text-white">
                Shopping Cart ({itemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-dark-800 rounded-xl transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-dark-800/80 px-6 py-3 border-b border-slate-800 text-xs">
            <div className="flex justify-between items-center mb-1.5 font-semibold text-slate-200">
              {freeShippingRemaining > 0 ? (
                <span>
                  Add <strong className="text-brand-400">{formatCurrency(freeShippingRemaining)}</strong> more for <strong className="text-emerald-400">FREE shipping</strong>
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  🎉 Congratulations! You unlocked FREE shipping!
                </span>
              )}
              <span className="text-slate-400 font-normal">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300 shadow-glow-green"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-slate-800">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.cartId} className="py-4 flex gap-4">
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-20 rounded-xl bg-dark-800 overflow-hidden shrink-0 border border-slate-700"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-bold text-white hover:text-brand-400 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-slate-500 hover:text-brand-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                        {item.color && <span>{item.color}</span>}
                        {item.size && (
                          <>
                            <span>•</span>
                            <span>{item.size}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-dark-800">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="p-1.5 hover:bg-dark-700 text-slate-300 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="p-1.5 hover:bg-dark-700 text-slate-300 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-400">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-dark-800 text-brand-500 flex items-center justify-center mx-auto mb-4 border border-slate-800">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400 mb-6">Looks like you haven't added anything yet.</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/products');
                  }}
                >
                  Start Shopping
                </Button>
              </div>
            )}
          </div>

          {/* Footer with subtotal & actions */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-dark-800/60 space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-300">
                <span>Subtotal</span>
                <span className="text-base font-black text-emerald-400">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Taxes, coupons, and shipping calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full"
                >
                  View Cart
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full shadow-glow-red"
                >
                  Checkout
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted 256-bit Secure Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

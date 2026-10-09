import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { CouponInput } from '../cart/CouponInput';
import { ShieldCheck, Truck } from 'lucide-react';

export const CheckoutSummary = ({ shippingFee = 0 }) => {
  const { cartItems, subtotal, discount, tax, total, appliedCoupon } = useCart();
  const grandTotal = Math.max(0, subtotal - discount + shippingFee + tax);

  return (
    <div className="bg-dark-800 rounded-2xl border border-slate-800 p-6 shadow-card space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="text-base font-bold text-white">
          Order Summary ({cartItems.length} items)
        </h3>
      </div>

      {/* Mini Items List */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-800">
        {cartItems.map((item) => (
          <div key={item.cartId} className="pt-3 first:pt-0 flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-700">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-100 truncate">{item.name}</p>
              <p className="text-[11px] text-slate-400">
                {item.color} {item.size && `• ${item.size}`}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-emerald-400">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code Input */}
      <CouponInput />

      {/* Calculations */}
      <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold text-white">{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-brand-400 font-semibold">
            <span>Discount ({appliedCoupon?.code})</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping & Handling</span>
          <span>
            {shippingFee === 0 ? (
              <strong className="text-emerald-400 font-bold uppercase text-xs">FREE</strong>
            ) : (
              <span className="font-bold text-white">{formatCurrency(shippingFee)}</span>
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Taxes (6%)</span>
          <span className="font-bold text-white">{formatCurrency(tax)}</span>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
          <span className="text-base font-bold text-white">Total</span>
          <span className="text-2xl font-black text-emerald-400">{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      <div className="p-3 bg-dark-900 rounded-xl border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Verified Authentic & Encrypted Payment</span>
      </div>
    </div>
  );
};

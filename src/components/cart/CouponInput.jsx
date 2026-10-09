import React, { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { COUPONS } from '../../data/coupons';

export const CouponInput = () => {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (applyCoupon(couponCode)) {
      setCouponCode('');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
        <Tag className="w-3.5 h-3.5 text-brand-500" />
        <span>Promo Code / Coupon</span>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider">{appliedCoupon.code}</span>
              <p className="text-[11px] text-emerald-400">{appliedCoupon.description}</p>
            </div>
          </div>
          <button
            onClick={removeCoupon}
            className="p-1 text-emerald-400 hover:text-emerald-200 hover:bg-emerald-900 rounded-lg transition-colors"
            title="Remove Coupon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Try SHOPX20 or WELCOME10"
            className="flex-1 px-3.5 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-xs uppercase font-medium text-white placeholder:normal-case placeholder:text-slate-500 focus:bg-dark-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Apply
          </button>
        </form>
      )}

      {/* Available Coupon Chips */}
      {!appliedCoupon && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {COUPONS.slice(0, 3).map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => applyCoupon(c.code)}
              className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-dark-900 hover:bg-brand-950 hover:text-brand-400 text-slate-400 border border-slate-800 transition-colors"
            >
              🏷️ {c.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

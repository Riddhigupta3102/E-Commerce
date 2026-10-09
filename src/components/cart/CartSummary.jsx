import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../common/Button';
import { CouponInput } from './CouponInput';

export const CartSummary = ({ showCheckoutBtn = true }) => {
  const { subtotal, discount, delivery, tax, total, appliedCoupon } = useCart();

  return (
    <div className="bg-dark-800 rounded-2xl border border-slate-800 p-6 shadow-card space-y-6">
      <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
        Order Summary
      </h3>

      {/* Coupon Application */}
      <CouponInput />

      {/* Breakdown Details */}
      <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
        <div className="flex justify-between">
          <span>Items Subtotal</span>
          <span className="font-bold text-white">{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-brand-400 font-semibold">
            <span>Discount ({appliedCoupon?.code})</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          <span>
            {delivery === 0 ? (
              <strong className="text-emerald-400 uppercase text-xs font-black">FREE</strong>
            ) : (
              <span className="font-bold text-white">{formatCurrency(delivery)}</span>
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax (6%)</span>
          <span className="font-bold text-white">{formatCurrency(tax)}</span>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
          <span className="text-base font-bold text-white">Total Amount</span>
          <span className="text-2xl font-black text-emerald-400">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Checkout CTA */}
      {showCheckoutBtn && (
        <div className="space-y-3 pt-2">
          <Link to="/checkout" className="block w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-glow-red"
              icon={ArrowRight}
              iconPosition="right"
            >
              Proceed to Checkout
            </Button>
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Secure 256-Bit SSL Checkout</span>
          </div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="p-3.5 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-center gap-4 text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Genuine & Verified Products</span>
        </div>
      </div>

    </div>
  );
};

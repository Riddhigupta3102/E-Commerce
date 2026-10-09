import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

export const FreeShippingProgress = ({ className = '' }) => {
  const { freeShippingRemaining, freeShippingProgress } = useCart();
  const isUnlocked = freeShippingRemaining === 0;

  return (
    <div className={`p-4 rounded-2xl bg-dark-800 border border-slate-800 ${className}`}>
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-200">
        {isUnlocked ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>You've unlocked <strong className="text-emerald-400">Free Standard Shipping</strong>!</span>
          </>
        ) : (
          <>
            <Truck className="w-4 h-4 text-brand-400 shrink-0" />
            <span>
              Add <strong className="text-brand-400">{formatCurrency(freeShippingRemaining)}</strong> more to unlock <strong className="text-emerald-400">FREE Delivery</strong>
            </span>
          </>
        )}
      </div>

      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isUnlocked ? 'bg-emerald-500 shadow-glow-green' : 'bg-gradient-to-r from-brand-600 to-rose-500'
          }`}
          style={{ width: `${freeShippingProgress}%` }}
        />
      </div>
    </div>
  );
};

import React from 'react';
import { Truck, Zap, Shield, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { getEstimatedDelivery, formatCurrency } from '../../utils/formatters';

const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    name: 'Standard Ground Delivery',
    time: `${getEstimatedDelivery(4)} (3-5 Business Days)`,
    price: 0,
    icon: Truck,
    description: 'Eco-friendly carbon-neutral ground shipping'
  },
  {
    id: 'express',
    name: 'Priority Express Air',
    time: `${getEstimatedDelivery(2)} (1-2 Business Days)`,
    price: 149,
    icon: Zap,
    description: 'Fast track handling with prioritized flight transit'
  },
  {
    id: 'overnight',
    name: 'Next-Day Guaranteed by 12 PM',
    time: `${getEstimatedDelivery(1)} (Tomorrow)`,
    price: 299,
    icon: Shield,
    description: 'White-glove priority handling with signature confirmation'
  }
];

export const ShippingStep = ({
  selectedShipping = 'standard',
  onSelectShipping,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-6 text-slate-200">
      <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
        <Truck className="w-5 h-5 text-brand-500" />
        <span>Delivery Method</span>
      </h3>

      <div className="space-y-3">
        {SHIPPING_OPTIONS.map((opt) => {
          const isSelected = selectedShipping === opt.id;
          const Icon = opt.icon;

          return (
            <div
              key={opt.id}
              onClick={() => onSelectShipping(opt.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isSelected
                  ? 'border-brand-500 bg-brand-950/40 shadow-glow-red'
                  : 'border-slate-800 hover:border-slate-700 bg-dark-900'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-brand-600 text-white shadow-glow-red' : 'bg-dark-800 text-slate-400 border border-slate-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white">{opt.name}</span>
                    <span className="text-[10px] bg-dark-800 text-emerald-400 border border-slate-700 px-2 py-0.5 rounded font-medium">
                      {opt.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{opt.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs sm:text-sm font-black text-emerald-400">
                  {opt.price === 0 ? 'FREE' : formatCurrency(opt.price)}
                </span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-brand-500 bg-brand-600 text-white' : 'border-slate-700 bg-dark-800'
                }`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-800">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onBack}
        >
          Back to Address
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onNext}
          className="shadow-glow-red"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

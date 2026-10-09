import React, { useState } from 'react';
import { CreditCard, QrCode, Banknote, Landmark, ShieldCheck, Lock, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { validateCardNumber, validateCardExpiry, validateCardCVV, validateName } from '../../utils/validators';

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, subtitle: 'Visa, Mastercard, RuPay' },
  { id: 'upi', name: 'Instant UPI / QR Code', icon: QrCode, subtitle: 'Google Pay, PhonePe, Paytm' },
  { id: 'cod', name: 'Cash on Delivery', icon: Banknote, subtitle: 'Pay when your package arrives' },
  { id: 'netbanking', name: 'Net Banking', icon: Landmark, subtitle: 'SBI, HDFC, ICICI, Axis' },
];

export const PaymentStep = ({
  paymentMethod = 'card',
  onSelectPaymentMethod,
  onSubmitOrder,
  isProcessing = false,
  onBack,
}) => {
  const [cardData, setCardData] = useState({
    number: '4242 •••• •••• 4242',
    name: 'Riddhi Gupta',
    expiry: '12/28',
    cvv: '888',
  });

  const [errors, setErrors] = useState({});

  const handleCardChange = (field, value) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      const newErrors = {};
      const numErr = validateCardNumber(cardData.number);
      if (numErr && !cardData.number.includes('•')) newErrors.number = numErr;

      const nameErr = validateName(cardData.name);
      if (nameErr) newErrors.name = nameErr;

      const expErr = validateCardExpiry(cardData.expiry);
      if (expErr) newErrors.expiry = expErr;

      const cvvErr = validateCardCVV(cardData.cvv);
      if (cvvErr) newErrors.cvv = cvvErr;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    onSubmitOrder({
      method: paymentMethod,
      cardLast4: paymentMethod === 'card' ? (cardData.number.slice(-4) || '4242') : null,
    });
  };

  return (
    <form onSubmit={handleOrderSubmit} className="space-y-6 text-slate-200">
      <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
        <CreditCard className="w-5 h-5 text-brand-500" />
        <span>Payment Method</span>
      </h3>

      {/* Payment Method Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PAYMENT_METHODS.map((pm) => {
          const isSelected = paymentMethod === pm.id;
          const Icon = pm.icon;

          return (
            <div
              key={pm.id}
              onClick={() => onSelectPaymentMethod(pm.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'border-brand-500 bg-brand-950/40 shadow-glow-red'
                  : 'border-slate-800 hover:border-slate-700 bg-dark-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl shrink-0 ${
                  isSelected ? 'bg-brand-600 text-white shadow-glow-red' : 'bg-dark-800 text-slate-400 border border-slate-700'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{pm.name}</p>
                  <p className="text-[10px] text-slate-400">{pm.subtitle}</p>
                </div>
              </div>

              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                isSelected ? 'border-brand-500 bg-brand-600 text-white' : 'border-slate-700 bg-dark-800'
              }`}>
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Card UI Form */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 bg-dark-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Encrypted Card Payment
            </span>
            <div className="flex gap-1.5 text-[10px] font-bold text-slate-300">
              <span className="bg-dark-800 px-2 py-0.5 rounded border border-slate-700">VISA</span>
              <span className="bg-dark-800 px-2 py-0.5 rounded border border-slate-700">MC</span>
              <span className="bg-dark-800 px-2 py-0.5 rounded border border-slate-700">RUPAY</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={cardData.number}
              onChange={(e) => handleCardChange('number', e.target.value)}
              placeholder="4242 4242 4242 4242"
              className="w-full px-3.5 py-2.5 bg-dark-950 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
            {errors.number && <p className="text-[10px] text-rose-400 mt-1">{errors.number}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => handleCardChange('name', e.target.value)}
                placeholder="Riddhi Gupta"
                className="w-full px-3.5 py-2.5 bg-dark-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
              />
              {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Expiry
                </label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => handleCardChange('expiry', e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-2.5 py-2.5 bg-dark-950 border border-slate-700 rounded-xl text-xs font-mono text-center text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
                {errors.expiry && <p className="text-[10px] text-rose-400 mt-1">{errors.expiry}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  value={cardData.cvv}
                  onChange={(e) => handleCardChange('cvv', e.target.value)}
                  placeholder="•••"
                  maxLength={4}
                  className="w-full px-2.5 py-2.5 bg-dark-950 border border-slate-700 rounded-xl text-xs font-mono text-center text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
                {errors.cvv && <p className="text-[10px] text-rose-400 mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPI / QR Code Simulation */}
      {paymentMethod === 'upi' && (
        <div className="bg-dark-900 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
          <div className="w-36 h-36 bg-white rounded-2xl mx-auto flex items-center justify-center p-2 shadow-glow-green">
            <QrCode className="w-28 h-28 text-slate-900" />
          </div>
          <p className="text-xs font-bold text-white">Scan QR with any UPI App</p>
          <p className="text-[11px] text-emerald-400 font-semibold">GPay, PhonePe, Paytm, or BHIM</p>
        </div>
      )}

      {/* COD Notice */}
      {paymentMethod === 'cod' && (
        <div className="bg-amber-950/80 border border-amber-800/80 p-4 rounded-2xl text-amber-300 text-xs leading-relaxed">
          <strong className="block font-bold mb-0.5 text-amber-200">Cash on Delivery selected:</strong>
          Please keep exact cash ready upon parcel arrival. Our courier executive will provide a digital confirmation receipt.
        </div>
      )}

      {/* Net Banking Options */}
      {paymentMethod === 'netbanking' && (
        <div className="bg-dark-900 p-4 rounded-2xl border border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-slate-300">Select Your Bank</label>
          <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs bg-dark-950 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20">
            <option className="bg-dark-900">State Bank of India (SBI)</option>
            <option className="bg-dark-900">HDFC Bank</option>
            <option className="bg-dark-900">ICICI Bank</option>
            <option className="bg-dark-900">Axis Bank</option>
            <option className="bg-dark-900">Kotak Mahindra Bank</option>
          </select>
        </div>
      )}

      <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-800">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onBack}
          disabled={isProcessing}
        >
          Back to Delivery
        </Button>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          loading={isProcessing}
          icon={Lock}
          className="shadow-glow-green"
        >
          {isProcessing ? 'Authorizing & Placing Order...' : 'Place Order Now'}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>By placing this order, you agree to ShopX terms & policies.</span>
      </div>
    </form>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { AddressStep } from '../components/checkout/AddressStep';
import { ShippingStep } from '../components/checkout/ShippingStep';
import { PaymentStep } from '../components/checkout/PaymentStep';
import { CheckoutSummary } from '../components/checkout/CheckoutSummary';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MapPin, Truck, CreditCard, Check, ArrowLeft } from 'lucide-react';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, discount, tax, clearCart, appliedCoupon } = useCart();
  const { user, addOrder } = useAuth();
  const { error, success } = useToast();

  const [currentStep, setCurrentStep] = useState(1); // 1: Address, 2: Shipping, 3: Payment
  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses?.find((a) => a.isDefault) || (user?.addresses && user.addresses[0]) || null
  );
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const shippingFee = selectedShipping === 'express' ? 149 : selectedShipping === 'overnight' ? 299 : 0;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee + tax);

  const handlePlaceOrder = async (paymentDetails) => {
    setIsProcessing(true);

    const orderPayload = {
      total: grandTotal,
      subtotal,
      discount,
      delivery: shippingFee,
      tax,
      paymentMethod: paymentDetails.method === 'card' ? `Credit Card (**** ${paymentDetails.cardLast4 || '4242'})` : paymentDetails.method.toUpperCase(),
      shippingOption: selectedShipping,
      shippingAddress: selectedAddress || {
        fullName: user?.name || 'Riddhi Gupta',
        street: '742 Evergreen Terrace, Penthouse 4B',
        city: 'San Francisco, CA 94107'
      },
      items: cartItems.map((item) => ({
        id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        image: item.image
      }))
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      const placedOrder = data.order || orderPayload;
      const newOrder = addOrder(placedOrder);
      clearCart();
      setIsProcessing(false);
      navigate(`/order-success/${newOrder.id}`, { state: { order: newOrder } });
    } catch {
      const newOrder = addOrder(orderPayload);
      clearCart();
      setIsProcessing(false);
      navigate(`/order-success/${newOrder.id}`, { state: { order: newOrder } });
    }
  };

  const steps = [
    { number: 1, label: 'Address', icon: MapPin },
    { number: 2, label: 'Delivery', icon: Truck },
    { number: 3, label: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

      {/* Stepper Progress Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 w-full z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-600 transition-all duration-300 z-0 shadow-glow-red"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((s) => {
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;

            return (
              <div key={s.number} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-200 ${
                    isCompleted
                      ? 'bg-brand-600 text-white shadow-glow-red'
                      : isCurrent
                      ? 'bg-brand-600 text-white ring-4 ring-brand-500/20 shadow-glow-red'
                      : 'bg-dark-800 border-2 border-slate-700 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.number}
                </div>
                <span className={`text-xs mt-1.5 font-bold ${
                  isCurrent || isCompleted ? 'text-white' : 'text-slate-500'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Step View */}
        <div className="lg:col-span-8 bg-dark-800 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-card text-white">
          
          {currentStep === 1 && (
            <AddressStep
              selectedAddress={selectedAddress}
              onSelectAddress={setSelectedAddress}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <ShippingStep
              selectedShipping={selectedShipping}
              onSelectShipping={setSelectedShipping}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <PaymentStep
              paymentMethod={paymentMethod}
              onSelectPaymentMethod={setPaymentMethod}
              onSubmitOrder={handlePlaceOrder}
              isProcessing={isProcessing}
              onBack={() => setCurrentStep(2)}
            />
          )}

        </div>

        {/* Right Sticky Order Summary */}
        <div className="lg:col-span-4 sticky top-24">
          <CheckoutSummary shippingFee={shippingFee} />
        </div>

      </div>

    </div>
  );
};

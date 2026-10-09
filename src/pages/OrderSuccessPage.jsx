import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, Package, Truck, Calendar, ArrowRight, Home, Printer } from 'lucide-react';
import { Button } from '../components/common/Button';
import { formatCurrency, formatDate, getEstimatedDelivery } from '../utils/formatters';

export const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    // Confetti celebration burst
    const end = Date.now() + 1500;
    const colors = ['#dc2626', '#ef4444', '#10b981', '#34d399', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8 animate-slide-up text-slate-100">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-3xl bg-emerald-950/80 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto shadow-glow-green">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          Order Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Thank You for Your Order!
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          We've received your order and sent a confirmation receipt to your email. We'll notify you as soon as your package is dispatched!
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-dark-800 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-card space-y-6">
        
        {/* Top order summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Order Reference
            </span>
            <p className="text-lg font-black text-white mt-0.5">#{orderId}</p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Estimated Delivery
            </span>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-4 h-4" />
              {getEstimatedDelivery(3)}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Payment Method
            </span>
            <p className="text-sm font-bold text-slate-200 mt-0.5">
              {order?.paymentMethod || 'Credit Card'}
            </p>
          </div>
        </div>

        {/* Delivery Progress Steps */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Order Lifecycle
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
            <div className="p-3 bg-brand-950 text-brand-400 rounded-xl border border-brand-800">
              1. Placed & Verified
            </div>
            <div className="p-3 bg-dark-900 text-slate-400 rounded-xl border border-slate-800">
              2. Packaging in Warehouse
            </div>
            <div className="p-3 bg-dark-900 text-slate-400 rounded-xl border border-slate-800">
              3. Out for Delivery
            </div>
          </div>
        </div>

        {/* Ordered items preview */}
        {order?.items && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Purchased Items ({order.items.length})
            </h4>
            <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-4 bg-dark-900">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-slate-800" />
                    <div>
                      <p className="text-xs font-bold text-white">{item.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        {order && (
          <div className="space-y-2 pt-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-white">{formatCurrency(order.subtotal || order.total)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-brand-400 font-semibold">
                <span>Discount</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{order.delivery === 0 ? 'FREE' : formatCurrency(order.delivery)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>{formatCurrency(order.tax || 0)}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline font-bold text-white">
              <span className="text-sm">Total Paid</span>
              <span className="text-xl font-black text-emerald-400">{formatCurrency(order.total)}</span>
            </div>
          </div>
        )}

      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/products" className="w-full sm:w-auto">
          <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto shadow-glow-red">
            Continue Shopping
          </Button>
        </Link>
        <Link to="/profile?tab=orders" className="w-full sm:w-auto">
          <Button variant="secondary" size="lg" icon={Package} className="w-full sm:w-auto">
            Track in My Orders
          </Button>
        </Link>
      </div>

    </div>
  );
};

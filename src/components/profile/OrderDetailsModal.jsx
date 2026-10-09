import React from 'react';
import { Modal } from '../common/Modal';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Package, Truck, CheckCircle2, MapPin, CreditCard, Printer } from 'lucide-react';
import { Button } from '../common/Button';

export const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order Receipt #${order.id}`} maxWidth="max-w-2xl">
      <div className="space-y-6">
        
        {/* Top Status & Date */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Status</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {order.status || 'Processing'}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Placed On</span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{formatDate(order.date)}</p>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Payment</span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{order.paymentMethod || 'Credit Card'}</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            <span>Delivery Destination</span>
          </h4>
          <p className="text-xs font-bold text-slate-900">{order.shippingAddress?.fullName || 'Riddhi Gupta'}</p>
          <p className="text-xs text-slate-600">{order.shippingAddress?.street}</p>
          <p className="text-xs text-slate-600">{order.shippingAddress?.city}</p>
        </div>

        {/* Items Table */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Purchased Items ({order.items?.length || 0})
          </h4>
          <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden">
            {order.items?.map((item, idx) => (
              <div key={idx} className="p-3.5 flex items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-slate-500">
                      Qty: {item.quantity} {item.color && `• Color: ${item.color}`} {item.size && `• Size: ${item.size}`}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-900 shrink-0">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Breakdown */}
        <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span className="font-bold text-slate-900">{formatCurrency(order.subtotal || order.total)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-rose-600 font-semibold">
              <span>Discount</span>
              <span>-{formatCurrency(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-600">
            <span>Delivery Fee</span>
            <span>{order.delivery === 0 ? 'FREE' : formatCurrency(order.delivery || 0)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Estimated Tax</span>
            <span>{formatCurrency(order.tax || 0)}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold text-slate-900">
            <span className="text-sm">Total Paid</span>
            <span className="text-base font-extrabold text-brand-600">{formatCurrency(order.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={Printer}
            onClick={handlePrintInvoice}
          >
            Print Receipt
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>

      </div>
    </Modal>
  );
};

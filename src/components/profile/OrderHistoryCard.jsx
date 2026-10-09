import React from 'react';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { Package, Eye, CheckCircle2, Clock, Truck } from 'lucide-react';
import { Button } from '../common/Button';

export const OrderHistoryCard = ({ order, onViewDetails }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3 h-3" />
            In Transit
          </span>
        );
      case 'Processing':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            Processing
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-slate-900">Order #{order.id}</span>
            {getStatusBadge(order.status)}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Placed on {formatDate(order.date)}</p>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total</span>
          <p className="text-base font-extrabold text-slate-900">{formatCurrency(order.total)}</p>
        </div>
      </div>

      {/* Items Preview */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {order.items?.slice(0, 4).map((item, i) => (
            <img
              key={i}
              src={item.image}
              alt={item.name}
              title={item.name}
              className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
            />
          ))}
          {order.items?.length > 4 && (
            <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
              +{order.items.length - 4}
            </div>
          )}
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Eye}
          onClick={() => onViewDetails(order)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

import React from 'react';
import { Home, Briefcase, Trash2, CheckCircle, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AddressCard = ({ address, onEdit }) => {
  const { deleteAddress, setDefaultAddress } = useAuth();

  return (
    <div className={`p-5 rounded-2xl border-2 transition-all bg-white relative ${
      address.isDefault ? 'border-brand-600 shadow-sm' : 'border-slate-200'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          {address.label === 'Work' ? (
            <Briefcase className="w-4 h-4 text-slate-500" />
          ) : (
            <Home className="w-4 h-4 text-slate-500" />
          )}
          <span className="text-xs font-bold text-slate-900">{address.fullName}</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
            {address.label}
          </span>
        </div>

        {address.isDefault && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
            <CheckCircle className="w-3 h-3" /> Default
          </span>
        )}
      </div>

      {/* Body */}
      <div className="py-3 text-xs text-slate-600 space-y-1">
        <p className="font-medium text-slate-800">{address.street}</p>
        <p>{address.city}, {address.state} {address.zipCode}</p>
        <p className="text-slate-400">{address.country}</p>
        <p className="pt-1 font-semibold text-slate-700">{address.phone}</p>
      </div>

      {/* Actions */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        {!address.isDefault && (
          <button
            onClick={() => setDefaultAddress(address.id)}
            className="text-brand-600 hover:text-brand-700 font-bold"
          >
            Set as Default
          </button>
        )}
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => deleteAddress(address.id)}
            className="text-rose-500 hover:text-rose-700 font-semibold p-1"
            title="Delete Address"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

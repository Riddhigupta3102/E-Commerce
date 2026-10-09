import React from 'react';
import { Truck, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar = () => {
  return (
    <div className="bg-black text-slate-200 text-xs py-2 px-4 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Truck className="w-3.5 h-3.5" />
            Free express delivery on orders over ₹750
          </span>
        </div>

        <div className="flex-1 md:flex-none text-center md:text-right">
          <span className="inline-flex items-center gap-1.5 font-medium text-white">
            <Flame className="w-3.5 h-3.5 fill-brand-500 text-brand-500 animate-pulse" />
            Use code <span className="bg-brand-950 text-brand-400 font-bold px-1.5 py-0.5 rounded border border-brand-800">SHOPX20</span> for 20% off!
            <Link to="/products" className="underline hover:text-brand-400 ml-2 text-slate-300 font-semibold">
              Shop Now &rarr;
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

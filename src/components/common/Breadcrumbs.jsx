import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [], className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-xs text-slate-400 flex-wrap ${className}`}>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-slate-400 hover:text-brand-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="hover:text-brand-400 transition-colors line-clamp-1 max-w-[160px]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-bold text-slate-100 line-clamp-1 max-w-[200px]" aria-current="page">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

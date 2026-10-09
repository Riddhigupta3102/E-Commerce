import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Home, Compass } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-24 h-24 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center font-black text-4xl shadow-inner mb-6 ring-8 ring-brand-50/50">
        404
      </div>
      <h1 className="text-3xl font-black text-slate-900 mb-2">Page Not Found</h1>
      <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
        The page you are looking for might have been moved, deleted, or does not exist.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md" icon={Home}>
            Return Home
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="secondary" size="md" icon={Compass}>
            Explore Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

export const ImageGallery = ({ images = [], productName = 'Product' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeImage = images[selectedIndex] || images[0] || '';

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      
      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[480px] shrink-0 pb-2 md:pb-0 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-slate-50 ${
                selectedIndex === idx
                  ? 'border-brand-600 ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-slate-200/80 hover:border-slate-300 opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Preview Image */}
      <div className="relative flex-1 aspect-square rounded-2xl bg-slate-50 overflow-hidden border border-slate-200/80 shadow-sm">
        <img
          src={activeImage}
          alt={productName}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        <div className="absolute bottom-3 right-3 bg-slate-900/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-md pointer-events-none">
          Click image to zoom
        </div>
      </div>

    </div>
  );
};

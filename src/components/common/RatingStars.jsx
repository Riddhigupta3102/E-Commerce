import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export const RatingStars = ({
  rating = 0,
  maxStars = 5,
  size = 'sm', // 'xs' | 'sm' | 'md' | 'lg'
  showCount = false,
  reviewsCount = 0,
  className = '',
  interactive = false,
  onChange = null,
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const starSize = sizes[size] || sizes.sm;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[...Array(maxStars)].map((_, i) => {
          const starValue = i + 1;
          const isFilled = rating >= starValue;
          const isHalf = !isFilled && rating >= starValue - 0.5;

          return (
            <button
              type={interactive ? 'button' : undefined}
              key={i}
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starValue)}
              className={`${
                interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
              } p-0.5 focus:outline-none`}
            >
              {isFilled ? (
                <Star className={`${starSize} text-amber-400 fill-amber-400`} />
              ) : isHalf ? (
                <StarHalf className={`${starSize} text-amber-400 fill-amber-400`} />
              ) : (
                <Star className={`${starSize} text-slate-200 fill-slate-100`} />
              )}
            </button>
          );
        })}
      </div>

      {showCount && (
        <span className="text-xs font-semibold text-slate-600 ml-1">
          {rating.toFixed(1)}{' '}
          {reviewsCount > 0 && <span className="text-slate-400 font-normal">({reviewsCount})</span>}
        </span>
      )}
    </div>
  );
};

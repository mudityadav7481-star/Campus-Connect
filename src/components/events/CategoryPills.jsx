import React from 'react';
import { EVENT_CATEGORIES } from '../../utils/constants';

export default function CategoryPills({
  selectedCategory,
  onSelectCategory,
  className = '',
}) {
  return (
    <div className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none ${className}`}>
      {EVENT_CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none ${
              isSelected
                ? 'bg-gradient-to-r from-rose-600 via-rose-700 to-red-800 text-white shadow-lg shadow-rose-950/80 scale-102 border border-rose-500/40'
                : 'bg-[#12141f] text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

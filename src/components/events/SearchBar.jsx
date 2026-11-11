import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search by event title, topic, venue, or club...',
  className = '',
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
        <Search className="w-5 h-5" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-2xl border border-slate-800 bg-[#12141f] py-3 pl-11 pr-10 text-sm sm:text-base text-white placeholder:text-slate-500 shadow-inner transition-all duration-200 hover:border-slate-700 focus:border-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500/15"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
          aria-label="Clear search input"
        >
          <X className="w-4 h-4 bg-slate-800 hover:bg-slate-700 rounded-full p-0.5" />
        </button>
      )}
    </div>
  );
}

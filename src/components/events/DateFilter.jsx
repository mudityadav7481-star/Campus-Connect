import React from 'react';
import { Clock } from 'lucide-react';

const DATE_OPTIONS = [
  { id: 'All', label: 'All Dates' },
  { id: 'Today', label: 'Happening Today' },
  { id: 'This Week', label: 'This Week' },
  { id: 'Upcoming', label: 'Future Only' },
];

export default function DateFilter({ selectedDate, onSelectDate, className = '' }) {
  return (
    <div className={`flex items-center gap-1.5 bg-[#10121d] p-1 rounded-xl border border-slate-800 text-xs ${className}`}>
      <div className="flex items-center pl-2 pr-1 text-slate-500">
        <Clock className="w-3.5 h-3.5 mr-1 text-rose-400" />
        <span className="font-semibold hidden sm:inline text-slate-400">When:</span>
      </div>
      {DATE_OPTIONS.map((opt) => {
        const isSelected = selectedDate === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelectDate(opt.id)}
            className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all duration-150 cursor-pointer ${
              isSelected
                ? 'bg-slate-800 text-rose-400 shadow-xs border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

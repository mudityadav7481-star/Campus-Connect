import React from 'react';
import EventCard from './EventCard';
import Button from '../common/Button';
import { CalendarSearch, RotateCcw } from 'lucide-react';

export default function EventGrid({ events = [], onResetFilters }) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-[#12141f] rounded-3xl border border-dashed border-slate-800 my-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-950/60 text-rose-400 border border-rose-800/40 flex items-center justify-center mb-4 shadow-lg shadow-rose-950/40">
          <CalendarSearch className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">No Events Found</h3>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          We couldn't find any events matching your current search or category filters. Try broadening your terms or reset the filters below.
        </p>
        {onResetFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            icon={RotateCcw}
          >
            Reset All Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import { formatDate, formatTime, isPastEvent } from '../../utils/dateUtils';
import {
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  MapPin,
} from 'lucide-react';

export default function AdminTable({
  events = [],
  onEdit,
  onDelete,
}) {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredEvents = useMemo(() => {
    if (!filterQuery.trim()) return events;
    const q = filterQuery.toLowerCase().trim();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q)
    );
  }, [events, filterQuery]);

  return (
    <div className="bg-[#12141f] rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
      
      {/* Table Top Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0e1017]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search events in table..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#131522] border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          />
        </div>

        <p className="text-xs text-slate-400 font-medium self-end sm:self-center">
          Showing <strong className="text-white">{filteredEvents.length}</strong> of {events.length} events
        </p>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#0e1017]/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Event Details</th>
              <th className="py-3.5 px-4">Date & Time</th>
              <th className="py-3.5 px-4">Venue</th>
              <th className="py-3.5 px-4">Registrations</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/70">
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-500 text-sm">
                  No matching events found.
                </td>
              </tr>
            ) : (
              filteredEvents.map((event) => {
                const isFull = event.registeredCount >= event.maxCapacity;
                const isPast = isPastEvent(event.startDate);
                const percentage = Math.round(
                  (event.registeredCount / event.maxCapacity) * 100
                );

                return (
                  <tr
                    key={event.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    {/* Event Details */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={event.bannerUrl}
                          alt={event.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-800 bg-slate-900"
                        />
                        <div className="min-w-0 max-w-xs sm:max-w-md">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Badge category={event.category} size="xs" />
                            {isPast && (
                              <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-semibold border border-slate-700">
                                Past
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-white group-hover:text-rose-400 transition-colors truncate">
                            {event.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {event.organizer}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-bold text-white">
                        {formatDate(event.startDate)}
                      </div>
                      <div className="text-xs text-rose-400 font-semibold mt-0.5">
                        {formatTime(event.startDate)}
                      </div>
                    </td>

                    {/* Venue */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-slate-300 max-w-[160px] truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </td>

                    {/* Registrations */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className={isFull ? 'text-rose-400' : 'text-slate-200'}>
                            {event.registeredCount} / {event.maxCapacity}
                          </span>
                          <span className="text-slate-500 text-[11px] ml-2">
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isFull
                                ? 'bg-rose-500'
                                : percentage > 80
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        
                        {/* View in catalog */}
                        <Link
                          to={`/events/${event.id}`}
                          title="View Public Page"
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => onEdit(event)}
                          title="Edit Event"
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => onDelete(event)}
                          title="Delete Event"
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

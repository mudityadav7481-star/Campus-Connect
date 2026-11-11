import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import CapacityBar from './CapacityBar';
import BookmarkButton from './BookmarkButton';
import { formatDate, formatTime, isPastEvent, isTodayEvent } from '../../utils/dateUtils';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80';

export default function EventCard({ event }) {
  const [imgSrc, setImgSrc] = useState(event.bannerUrl || FALLBACK_IMAGE);

  const isFull = event.registeredCount >= event.maxCapacity;
  const isPast = isPastEvent(event.startDate);
  const isToday = isTodayEvent(event.startDate);

  return (
    <div className="group flex flex-col bg-[#12141f]/90 rounded-3xl border border-slate-800/80 shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-rose-950/30 hover:border-rose-500/40 transition-all duration-300 overflow-hidden">
      
      {/* Media Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <img
          src={imgSrc}
          alt={event.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141f] via-slate-950/40 to-transparent opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <Badge category={event.category} />
            {isToday && (
              <Badge variant="warning" className="bg-amber-500 text-slate-950 font-bold border-amber-400">
                Today
              </Badge>
            )}
            {isPast && (
              <Badge variant="secondary" className="bg-slate-900/90 text-slate-400 border-slate-700">
                Past
              </Badge>
            )}
          </div>
          
          <div className="pointer-events-auto">
            <BookmarkButton eventId={event.id} eventTitle={event.title} size="sm" />
          </div>
        </div>

        {/* Venue Chip bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center text-xs text-slate-200 drop-shadow-sm font-medium truncate pointer-events-none">
          <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0 text-rose-400" />
          <span className="truncate">{event.venue}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Date & Time */}
        <div className="flex items-center text-xs font-bold text-rose-400 gap-1.5 mb-2">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>{formatDate(event.startDate)}</span>
          <span>•</span>
          <span>{formatTime(event.startDate)}</span>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-2 mb-2 leading-snug">
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </h4>

        {/* Description snippet */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-1">
          {event.description}
        </p>

        {/* Capacity Bar */}
        <div className="pt-2 border-t border-slate-800/80 mb-4">
          <CapacityBar registered={event.registeredCount} max={event.maxCapacity} />
        </div>

        {/* Action Button */}
        <Link
          to={`/events/${event.id}`}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            isFull
              ? 'bg-slate-800 text-slate-400 hover:bg-slate-750'
              : 'bg-rose-950/40 text-rose-300 border border-rose-800/50 hover:bg-gradient-to-r hover:from-rose-600 hover:to-red-700 hover:text-white group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-red-700 group-hover:text-white shadow-xs'
          }`}
        >
          <span>{isFull ? 'View Details (Sold Out)' : 'View & Register'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  );
}

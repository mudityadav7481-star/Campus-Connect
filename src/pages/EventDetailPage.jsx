import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useRegistrations } from '../context/RegistrationContext';
import { useUser } from '../context/UserContext';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import CapacityBar from '../components/events/CapacityBar';
import BookmarkButton from '../components/events/BookmarkButton';
import RegistrationModal from '../components/events/RegistrationModal';
import TicketModal from '../components/events/TicketModal';
import { formatDate, formatTime, isPastEvent } from '../utils/dateUtils';
import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  UserCheck,
  ArrowLeft,
  Share2,
  Ticket,
  AlertCircle,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80';

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEvent } = useEvents();
  const { isRegisteredForEvent, getEventRegistration } = useRegistrations();
  const { studentProfile } = useUser();
  const { showSuccess } = useToast();

  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [currentRegistration, setCurrentRegistration] = useState(null);

  const event = getEvent(id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center bg-[#12141f] rounded-3xl border border-slate-800 my-12">
        <AlertCircle className="w-14 h-14 text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Event Not Found</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          The event you are looking for may have been removed, cancelled, or does not exist.
        </p>
        <Link to="/events">
          <Button icon={ArrowLeft} iconPosition="left">
            Back to Event Catalog
          </Button>
        </Link>
      </div>
    );
  }

  const isFull = event.registeredCount >= event.maxCapacity;
  const isPast = isPastEvent(event.startDate);
  const userRegistered = isRegisteredForEvent(event.id, studentProfile.email);
  const existingRegistration = getEventRegistration(event.id, studentProfile.email);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showSuccess('Event link copied to clipboard!', 'Link Shared');
    }
  };

  const handleOpenTicket = () => {
    setCurrentRegistration(existingRegistration);
    setIsTicketModalOpen(true);
  };

  const handleRegistrationSuccess = (newReg) => {
    setCurrentRegistration(newReg);
    setIsTicketModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-rose-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </Link>

        <div className="flex items-center gap-2">
          <BookmarkButton eventId={event.id} eventTitle={event.title} />
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            icon={Share2}
            className="rounded-full"
            title="Share Event"
          >
            Share
          </Button>
        </div>
      </div>

      {/* Hero Banner Media */}
      <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800">
        <img
          src={event.bannerUrl || FALLBACK_IMAGE}
          alt={event.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c13] via-slate-950/40 to-transparent" />
        
        {/* Banner Overlay Info */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge category={event.category} size="md" />
              {isPast && (
                <Badge variant="secondary" size="md">
                  Event Passed
                </Badge>
              )}
              {isFull && !isPast && (
                <Badge variant="danger" size="md">
                  Sold Out
                </Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details & Agenda */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Key Schedule & Location Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Date & Time */}
            <div className="p-5 rounded-3xl bg-[#12141f] border border-slate-800 shadow-lg flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</p>
                <p className="text-sm font-bold text-white mt-1">{formatDate(event.startDate)}</p>
                <p className="text-xs text-rose-400 font-semibold mt-0.5">
                  {formatTime(event.startDate)} {event.endDate ? `to ${formatTime(event.endDate)}` : ''}
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="p-5 rounded-3xl bg-[#12141f] border border-slate-800 shadow-lg flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-800/60 text-purple-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Location</p>
                <p className="text-sm font-bold text-white mt-1">{event.venue}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Physical Campus Venue</p>
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="bg-[#12141f] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4 shadow-lg">
            <h2 className="text-xl font-black text-white">About this Event</h2>
            <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4">
              <p>{event.description}</p>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Tags:</span>
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Organizer Card */}
          <div className="bg-[#12141f] rounded-3xl border border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-slate-300 font-bold">
                <Building2 className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Organized by</p>
                <h3 className="text-base font-bold text-white">{event.organizer || 'Campus Organization'}</h3>
                {event.organizerEmail && (
                  <a
                    href={`mailto:${event.organizerEmail}`}
                    className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:underline mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{event.organizerEmail}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Registration Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[#131522] rounded-3xl border border-slate-800 shadow-2xl p-6 space-y-6">
            
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Seat Availability
              </p>
              <h3 className="text-2xl font-black text-white">
                {event.maxCapacity - event.registeredCount > 0
                  ? `${event.maxCapacity - event.registeredCount} Seats Remaining`
                  : 'Sold Out'}
              </h3>
            </div>

            <CapacityBar registered={event.registeredCount} max={event.maxCapacity} />

            {/* Registration State Actions */}
            {userRegistered ? (
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 flex items-start gap-2.5 text-xs font-bold shadow-md shadow-emerald-950/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>You are confirmed for this event!</span>
                </div>
                <Button
                  variant="primary"
                  className="w-full shadow-lg shadow-rose-950/60"
                  icon={Ticket}
                  iconPosition="left"
                  onClick={handleOpenTicket}
                >
                  View Admission Pass
                </Button>
              </div>
            ) : isPast ? (
              <div className="pt-2">
                <Button disabled className="w-full bg-slate-850 text-slate-500 cursor-not-allowed">
                  Event Has Ended
                </Button>
              </div>
            ) : isFull ? (
              <div className="pt-2">
                <Button disabled className="w-full bg-slate-850 text-slate-500 cursor-not-allowed">
                  Capacity Reached (Sold Out)
                </Button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <Button
                  size="lg"
                  className="w-full shadow-xl shadow-rose-950/70"
                  icon={UserCheck}
                  iconPosition="left"
                  onClick={() => setIsRegModalOpen(true)}
                >
                  Register for Event
                </Button>
                <p className="text-[11px] text-center text-slate-400">
                  Instant registration with university student credentials.
                </p>
              </div>
            )}

            {/* Event Highlights list */}
            <div className="border-t border-slate-800/80 pt-4 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>Free registration for enrolled students</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>Digital ticket QR generated instantly</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>Verified student attendance credit</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Registration Form Modal */}
      <RegistrationModal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
        event={event}
        onSuccess={handleRegistrationSuccess}
      />

      {/* Admission Ticket Modal */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        registration={currentRegistration || existingRegistration}
        event={event}
      />

    </div>
  );
}

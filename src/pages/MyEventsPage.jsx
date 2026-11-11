import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegistrations } from '../context/RegistrationContext';
import { useBookmarks } from '../context/BookmarkContext';
import { useEvents } from '../context/EventContext';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';
import EventGrid from '../components/events/EventGrid';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import TicketModal from '../components/events/TicketModal';
import Modal from '../components/common/Modal';
import { formatDate, formatTime } from '../utils/dateUtils';
import {
  Calendar,
  Bookmark,
  Ticket,
  Trash2,
  MapPin,
  ArrowRight,
  Compass,
  AlertTriangle,
} from 'lucide-react';

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState('registrations');
  const { registrations, cancel } = useRegistrations();
  const { bookmarks } = useBookmarks();
  const { events } = useEvents();
  const { studentProfile } = useUser();
  const { showSuccess, showError } = useToast();

  const [selectedTicketReg, setSelectedTicketReg] = useState(null);
  const [cancelTargetReg, setCancelTargetReg] = useState(null);

  const studentRegistrations = registrations.filter(
    (reg) =>
      reg.studentEmail === studentProfile.email || reg.studentId === studentProfile.studentId
  );

  const bookmarkedEvents = events.filter((evt) => bookmarks.includes(evt.id));

  const handleConfirmCancel = () => {
    if (!cancelTargetReg) return;
    const result = cancel(cancelTargetReg.id);
    if (result.success) {
      showSuccess('Your event registration has been cancelled.', 'Registration Cancelled');
      setCancelTargetReg(null);
    } else {
      showError(result.message || 'Failed to cancel registration.', 'Error');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
          My Events Portal
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
          Manage your confirmed event registrations, access digital entry passes, and review saved bookmarks.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('registrations')}
          className={`flex items-center gap-2.5 pb-3 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'registrations'
              ? 'border-rose-500 text-rose-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>My Registrations</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            activeTab === 'registrations' ? 'bg-rose-950 text-rose-300 border border-rose-700/60' : 'bg-slate-800 text-slate-400'
          }`}>
            {studentRegistrations.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-2.5 pb-3 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'bookmarks'
              ? 'border-rose-500 text-rose-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Bookmarks</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            activeTab === 'bookmarks' ? 'bg-rose-950 text-rose-300 border border-rose-700/60' : 'bg-slate-800 text-slate-400'
          }`}>
            {bookmarkedEvents.length}
          </span>
        </button>
      </div>

      {/* TAB CONTENT: REGISTRATIONS */}
      {activeTab === 'registrations' && (
        <div className="space-y-4">
          {studentRegistrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-[#12141f] rounded-3xl border border-dashed border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-rose-950/60 text-rose-400 border border-rose-800/60 flex items-center justify-center mb-4 shadow-lg shadow-rose-950/40">
                <Ticket className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">No Active Registrations</h3>
              <p className="text-sm text-slate-400 max-w-md mb-6">
                You haven't reserved tickets for any events yet. Check out the event catalog to explore upcoming workshops, hackathons, and activities.
              </p>
              <Link to="/events">
                <Button icon={Compass} iconPosition="left">
                  Explore Upcoming Events
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  className="bg-[#12141f] rounded-3xl border border-slate-800/80 shadow-lg hover:border-slate-700 transition-all p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge category={reg.eventCategory} />
                      <span className="font-mono text-xs font-bold text-rose-400 bg-rose-950/80 border border-rose-800/60 px-2.5 py-0.5 rounded-lg">
                        {reg.ticketId}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      <Link to={`/events/${reg.eventId}`} className="hover:text-rose-400 transition-colors">
                        {reg.eventTitle}
                      </Link>
                    </h3>

                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 font-bold text-rose-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {formatDate(reg.eventStartDate)} at {formatTime(reg.eventStartDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{reg.eventVenue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Ticket}
                      onClick={() => setSelectedTicketReg(reg)}
                    >
                      View Ticket
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-400 hover:bg-rose-950/40 hover:text-rose-300"
                      icon={Trash2}
                      onClick={() => setCancelTargetReg(reg)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div>
          {bookmarkedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-[#12141f] rounded-3xl border border-dashed border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-amber-950/60 text-amber-400 border border-amber-800/60 flex items-center justify-center mb-4 shadow-lg shadow-amber-950/40">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">No Saved Events</h3>
              <p className="text-sm text-slate-400 max-w-md mb-6">
                Click the bookmark icon on any event card to save it for quick reference later.
              </p>
              <Link to="/events">
                <Button icon={Compass} iconPosition="left">
                  Browse Events
                </Button>
              </Link>
            </div>
          ) : (
            <EventGrid events={bookmarkedEvents} />
          )}
        </div>
      )}

      {/* Digital Ticket Modal */}
      {selectedTicketReg && (
        <TicketModal
          isOpen={Boolean(selectedTicketReg)}
          onClose={() => setSelectedTicketReg(null)}
          registration={selectedTicketReg}
        />
      )}

      {/* Cancellation Confirmation Dialog */}
      <Modal
        isOpen={Boolean(cancelTargetReg)}
        onClose={() => setCancelTargetReg(null)}
        title="Cancel Registration"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 flex items-start gap-3 text-rose-200 text-xs">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">Are you sure you want to cancel your seat?</p>
              <p className="mt-1">
                Your admission ticket for <strong className="font-semibold text-rose-300">{cancelTargetReg?.eventTitle}</strong> will be voided and made available to other students.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setCancelTargetReg(null)}>
              Keep Registration
            </Button>
            <Button variant="danger" onClick={handleConfirmCancel}>
              Yes, Cancel Seat
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

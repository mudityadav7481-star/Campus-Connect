import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { formatDate, formatTime } from '../../utils/dateUtils';
import { Calendar, MapPin, Ticket } from 'lucide-react';

export default function TicketModal({ isOpen, onClose, registration, event }) {
  if (!isOpen || !registration) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Digital Admission Pass"
      subtitle="Present this QR code or Ticket ID at the venue entrance."
      maxWidth="max-w-md"
    >
      <div className="space-y-6">
        
        {/* Ticket Card */}
        <div className="rounded-3xl border-2 border-dashed border-rose-800/60 bg-gradient-to-b from-[#1c0f22] to-[#10121b] p-6 space-y-4 shadow-xl">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-rose-950">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-rose-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Official Student Pass
              </span>
            </div>
            <Badge variant="success">Confirmed</Badge>
          </div>

          {/* Event Details */}
          <div>
            <h4 className="text-base font-bold text-white leading-snug">
              {registration.eventTitle || event?.title}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold mt-1">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>
                {formatDate(registration.eventStartDate || event?.startDate)} at{' '}
                {formatTime(registration.eventStartDate || event?.startDate)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{registration.eventVenue || event?.venue}</span>
            </div>
          </div>

          {/* Attendee Info */}
          <div className="bg-[#12141f] rounded-2xl p-3.5 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <p className="text-slate-500">Attendee</p>
              <p className="font-bold text-white">{registration.studentName}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">Student ID</p>
              <p className="font-mono font-bold text-rose-400">{registration.studentId}</p>
            </div>
          </div>

          {/* Mock QR Code Graphic */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-inner">
            <svg
              className="w-36 h-36 text-slate-900"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <rect x="5" y="5" width="30" height="30" rx="3" fill="#1e1b4b" />
              <rect x="10" y="10" width="20" height="20" rx="2" fill="white" />
              <rect x="15" y="15" width="10" height="10" rx="1" fill="#be123c" />
              
              <rect x="65" y="5" width="30" height="30" rx="3" fill="#1e1b4b" />
              <rect x="70" y="10" width="20" height="20" rx="2" fill="white" />
              <rect x="75" y="15" width="10" height="10" rx="1" fill="#be123c" />

              <rect x="5" y="65" width="30" height="30" rx="3" fill="#1e1b4b" />
              <rect x="10" y="70" width="20" height="20" rx="2" fill="white" />
              <rect x="15" y="75" width="10" height="10" rx="1" fill="#be123c" />

              <rect x="42" y="10" width="8" height="8" fill="#1e1b4b" />
              <rect x="42" y="24" width="8" height="8" fill="#be123c" />
              <rect x="10" y="42" width="8" height="8" fill="#1e1b4b" />
              <rect x="24" y="42" width="8" height="8" fill="#be123c" />
              <rect x="42" y="42" width="16" height="16" rx="2" fill="#e11d48" />
              <rect x="65" y="42" width="8" height="8" fill="#1e1b4b" />
              <rect x="80" y="42" width="8" height="8" fill="#be123c" />
              <rect x="42" y="65" width="8" height="8" fill="#1e1b4b" />
              <rect x="55" y="75" width="8" height="8" fill="#be123c" />
              <rect x="70" y="70" width="10" height="10" fill="#1e1b4b" />
              <rect x="85" y="85" width="8" height="8" fill="#be123c" />
            </svg>

            <span className="font-mono text-xs font-black text-slate-800 mt-2 tracking-wider">
              {registration.ticketId}
            </span>
          </div>

        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end">
          <Button variant="primary" onClick={onClose} className="w-full">
            Done
          </Button>
        </div>

      </div>
    </Modal>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/events/EventCard';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import uiInspirationImg from '../assets/ui-inspiration.jpg';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Calendar,
  Code,
  Music,
  Trophy,
  Cpu,
  Users,
  CheckCircle2,
  Ticket,
  ShieldCheck,
  Share2,
  Maximize2,
  Star,
} from 'lucide-react';

export default function HomePage() {
  const { spotlightEvents, events, setSelectedCategory } = useEvents();
  const navigate = useNavigate();
  const [inspirationModalOpen, setInspirationModalOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate('/events');
  };

  const categories = [
    { name: 'Technical', icon: Cpu, count: events.filter(e => e.category === 'Technical').length, color: 'from-blue-600 via-indigo-600 to-sky-500' },
    { name: 'Hackathon', icon: Code, count: events.filter(e => e.category === 'Hackathon').length, color: 'from-rose-600 via-pink-600 to-red-500' },
    { name: 'Cultural', icon: Music, count: events.filter(e => e.category === 'Cultural').length, color: 'from-purple-600 via-fuchsia-600 to-violet-500' },
    { name: 'Sports', icon: Trophy, count: events.filter(e => e.category === 'Sports').length, color: 'from-emerald-600 via-teal-600 to-green-500' },
  ];

  // Gallery strip images at the bottom inspired by the reference design
  const galleryMoments = [
    { url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80', label: 'Campus Mixers' },
    { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80', label: 'Hackathons' },
    { url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', label: 'Cultural Nights' },
    { url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80', label: 'Sports Leagues' },
    { url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80', label: 'Tech Workshops' },
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80', label: 'Celebrations' },
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION - Inspired by the Pinterest Event Celebration Design */}
      <section className="relative overflow-hidden rounded-3xl bg-[#0e1019] text-white shadow-2xl border border-rose-950/40 min-h-[520px] flex flex-col justify-center">
        
        {/* Festive Celebration Background Image with Dark Radiant Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80"
            alt="Campus Celebration"
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          {/* Multi-layered dark gradient to give deep black/maroon atmosphere while keeping high contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c13] via-[#0b0c13]/85 to-rose-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c13] via-transparent to-black/60" />
        </div>

        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl p-8 sm:p-14 space-y-6">
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-600/50 text-rose-300 text-xs font-bold backdrop-blur-md shadow-lg shadow-rose-950/50">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>The Central Campus Hub</span>
            </div>

            {/* Inspiration Reference Pill */}
            <button
              type="button"
              onClick={() => setInspirationModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3 h-3 text-rose-400" />
              <span>View Design Reference</span>
            </button>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
            The Best Time To <br />
            <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-red-400 bg-clip-text text-transparent">
              Celebrate & Connect
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
            College events are special. Every hackathon, cultural gala, athletic showdown, and workshop ends with new friends and memorable milestones. Discover and reserve your seats in one central place.
          </p>

          {/* Action Buttons matching the inspiration's dual pill buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/events">
              <Button size="lg" className="rounded-full px-8 shadow-xl shadow-rose-950/70">
                Explore All Events
              </Button>
            </Link>
            <Link to="/admin">
              <Button size="lg" variant="secondary" className="rounded-full px-8 bg-white/10 hover:bg-white/15 text-white border-white/20 backdrop-blur-md">
                Host an Event
              </Button>
            </Link>
          </div>

          {/* Carousel dots homage from reference */}
          <div className="flex items-center gap-2 pt-4">
            <span className="w-8 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500" />
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="w-2 h-2 rounded-full bg-slate-600" />
          </div>

          {/* Metrics bar */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">{events.length}+</p>
              <p className="text-xs text-slate-400 mt-0.5">Active Events</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-rose-400">
                {events.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0)}+
              </p>
              <p className="text-xs text-slate-400 mt-0.5">Seats Reserved</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-amber-400">100%</p>
              <p className="text-xs text-slate-400 mt-0.5">Verified Clubs</p>
            </div>
          </div>

        </div>
      </section>

      {/* "HOW IT WORKS" 3-STEP SECTION - Modeled after reference design */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-slate-400">
            A frictionless three-step gateway to campus activities and registrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-[#12141f] rounded-3xl p-8 border border-slate-800/90 shadow-lg text-center flex flex-col items-center group hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-rose-950/50">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Discover Events</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Browse upcoming hackathons, fests, sports championships, and workshops with instant search and category filters.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#12141f] rounded-3xl p-8 border border-slate-800/90 shadow-lg text-center flex flex-col items-center group hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-rose-950/50">
              <Ticket className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Reserve Your Seat</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Register with a single click using pre-filled student credentials and lock in your verified admission spot.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#12141f] rounded-3xl p-8 border border-slate-800/90 shadow-lg text-center flex flex-col items-center group hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-rose-950/50">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Scannable Digital Pass</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Get an instant official ticket code and digital QR pass to present at the venue for fast, seamless check-in.
            </p>
          </div>

        </div>
      </section>

      {/* "WHY CAMPUSCONNECT" - Split Feature Panel Modeled directly after the reference */}
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-[#140b18] shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Real concert / event crowd photography with confetti */}
        <div className="relative min-h-[360px] lg:min-h-[460px] overflow-hidden bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"
            alt="Campus Crowd Celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#140b18] hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140b18] via-transparent to-transparent lg:hidden" />
        </div>

        {/* Right Side: Deep dark purple/plum panel with star bullet points */}
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 text-rose-400 border border-rose-700/50 text-xs font-bold w-fit">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Why Join CampusConnect</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Why Post & Join Events Here?
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Eliminate chaotic chat threads and fragmented notice boards. Give your college society the professional reach it deserves.
          </p>

          <ul className="space-y-4 text-sm text-slate-200">
            <li className="flex items-start gap-3">
              <span className="text-rose-400 text-lg leading-none mt-0.5">❖</span>
              <div>
                <strong className="text-white">Centralized Campus Directory</strong> — Students discover events across all faculties without platform noise.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-rose-400 text-lg leading-none mt-0.5">❖</span>
              <div>
                <strong className="text-white">Zero Duplicate Registrations</strong> — Automated validation prevents double sign-ups and guarantees clean rosters.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-rose-400 text-lg leading-none mt-0.5">❖</span>
              <div>
                <strong className="text-white">Real-Time Capacity Gauges</strong> — Watch remaining seats count down dynamically with automatic sold-out guards.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-rose-400 text-lg leading-none mt-0.5">❖</span>
              <div>
                <strong className="text-white">Dedicated Admin Controls</strong> — Publish, edit, and manage event schedules with immediate multi-tab sync.
              </div>
            </li>
          </ul>

          <div className="pt-2">
            <Link to="/events">
              <Button className="rounded-full px-6 shadow-md shadow-rose-950/50">
                Explore Upcoming Events
              </Button>
            </Link>
          </div>
        </div>

      </section>

      {/* QUICK CATEGORY JUMP CARDS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Explore by Category</h2>
            <p className="text-sm text-slate-400 mt-0.5">Find what matches your academic, creative, or athletic interests.</p>
          </div>
          <Link to="/events" className="text-sm font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 group">
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-[#12141f] p-6 border border-slate-800 shadow-lg hover:shadow-2xl hover:border-rose-500/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white group-hover:text-rose-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  {cat.count} upcoming {cat.count === 1 ? 'event' : 'events'}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SPOTLIGHT EVENTS (HAPPENING SOON) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-950/80 text-rose-400 border border-rose-800/60 rounded-xl shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Happening Soon</h2>
              <p className="text-sm text-slate-400 mt-0.5">Earliest upcoming campus highlights open for registration.</p>
            </div>
          </div>
          <Link to="/events">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              All Events
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotlightEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* CAMPUS MOMENTS GALLERY STRIP - Modeled after the bottom celebration gallery in the inspiration image */}
      <section className="space-y-4">
        <div className="text-center max-w-lg mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">Campus Life & Energy</p>
          <h3 className="text-xl font-bold text-white">Memories Made on Campus</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 rounded-3xl overflow-hidden p-2 bg-[#0d0f17] border border-slate-800/80">
          {galleryMoments.map((moment, idx) => (
            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
              <img
                src={moment.url}
                alt={moment.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                <span className="text-[11px] font-bold text-white">{moment.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESIGN REFERENCE MODAL */}
      <Modal
        isOpen={inspirationModalOpen}
        onClose={() => setInspirationModalOpen(false)}
        title="UI Inspiration & Reference Design"
        subtitle="The Pinterest / Behance event platform layout inspiring this dark theme architecture."
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black">
            <img
              src={uiInspirationImg}
              alt="Pinterest Design Inspiration"
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <span>Adapted with dark palette, crimson/rose accents, and campus-tailored workflows.</span>
            <Button size="sm" onClick={() => setInspirationModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

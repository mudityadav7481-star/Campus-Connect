import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useBookmarks } from '../../context/BookmarkContext';
import { useRegistrations } from '../../context/RegistrationContext';
import { useUser } from '../../context/UserContext';
import RoleSwitcher from './RoleSwitcher';
import {
  Calendar,
  Sparkles,
  Bookmark,
  Shield,
  Menu,
  X,
  Compass,
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { bookmarkCount } = useBookmarks();
  const { registrations } = useRegistrations();
  const { isAdmin } = useUser();

  const totalStudentEvents = bookmarkCount + registrations.length;

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
      isActive
        ? 'bg-rose-600/15 text-rose-400 border border-rose-500/30 shadow-xs shadow-rose-950/40'
        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
      isActive
        ? 'bg-rose-600/20 text-rose-300 font-bold border border-rose-500/30'
        : 'text-slate-300 hover:bg-slate-800/80'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[#0b0c13]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-rose-500 rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-700 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-rose-950/60 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-rose-200 bg-clip-text text-transparent">
                  CampusConnect
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-950/80 text-rose-400 border border-rose-700/50 uppercase tracking-wider">
                  Hub
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:block -mt-1">
                Centralized College Events
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <NavLink to="/" end className={navLinkClass}>
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span>Home</span>
            </NavLink>

            <NavLink to="/events" className={navLinkClass}>
              <Compass className="w-4 h-4 text-slate-400" />
              <span>Explore Events</span>
            </NavLink>

            <NavLink to="/my-events" className={navLinkClass}>
              <Bookmark className="w-4 h-4 text-slate-400" />
              <span>My Events</span>
              {totalStudentEvents > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-rose-950 text-rose-300 border border-rose-700/60">
                  {totalStudentEvents}
                </span>
              )}
            </NavLink>

            <NavLink to="/admin" className={navLinkClass}>
              <Shield className="w-4 h-4 text-slate-400" />
              <span>Admin Portal</span>
              {isAdmin && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </NavLink>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center gap-3">
            <RoleSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <RoleSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0d0f17] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span>Home</span>
            </div>
          </NavLink>

          <NavLink
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-rose-500" />
              <span>Explore Events</span>
            </div>
          </NavLink>

          <NavLink
            to="/my-events"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-5 h-5 text-rose-500" />
              <span>My Events (Registered & Saved)</span>
            </div>
            {totalStudentEvents > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-950 text-rose-300 border border-rose-700/60">
                {totalStudentEvents}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkClass}
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-rose-500" />
              <span>Admin Portal</span>
            </div>
            {isAdmin && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700">
                Active
              </span>
            )}
          </NavLink>
        </div>
      )}
    </header>
  );
}

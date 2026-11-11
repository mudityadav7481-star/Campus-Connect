import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/90 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-rose-950/60">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">CampusConnect</p>
              <p className="text-xs text-slate-400">The centralized gateway to all campus events and workshops.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link to="/events" className="hover:text-rose-400 transition-colors">
              Explore Events
            </Link>
            <Link to="/my-events" className="hover:text-rose-400 transition-colors">
              My Registrations
            </Link>
            <Link to="/admin" className="hover:text-rose-400 transition-colors">
              Admin Console
            </Link>
          </div>

          {/* Tech Badges */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>React + Vite + Tailwind CSS Dark Theme</span>
          </div>

        </div>

        <div className="border-t border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Empowering students to connect, celebrate, and achieve.
          </p>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Compass, HelpCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-3xl bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center mb-6 shadow-xl shadow-rose-950/40">
        <HelpCircle className="w-10 h-10" />
      </div>

      <span className="text-sm font-bold uppercase tracking-wider text-rose-400 mb-2">
        404 Error
      </span>
      <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-base text-slate-400 max-w-md mb-8">
        The page you are looking for doesn't exist, has been moved, or the link you followed might be broken.
      </p>

      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="primary" icon={Compass} iconPosition="left">
            Back to Home
          </Button>
        </Link>
        <Link to="/events">
          <Button variant="outline">
            Browse All Events
          </Button>
        </Link>
      </div>
    </div>
  );
}

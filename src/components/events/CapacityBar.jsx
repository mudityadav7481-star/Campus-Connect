import React from 'react';
import { Users } from 'lucide-react';

export default function CapacityBar({ registered = 0, max = 100, showLabel = true }) {
  const percentage = Math.min(100, Math.round((registered / max) * 100)) || 0;
  const isFull = registered >= max;
  const isNearlyFull = percentage >= 85 && !isFull;

  let barColor = 'bg-emerald-500';
  let textColor = 'text-slate-400';

  if (isFull) {
    barColor = 'bg-rose-500';
    textColor = 'text-rose-400 font-bold';
  } else if (isNearlyFull) {
    barColor = 'bg-amber-500';
    textColor = 'text-amber-400 font-bold';
  }

  return (
    <div className="w-full space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Users className="w-3.5 h-3.5" />
            <span>Capacity</span>
          </span>
          <span className={textColor}>
            {isFull ? (
              'Sold Out'
            ) : (
              <>
                <strong className="text-white">{registered}</strong> / {max} registered
              </>
            )}
          </span>
        </div>
      )}

      {/* Track */}
      <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

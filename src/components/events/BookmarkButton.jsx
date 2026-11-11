import React from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '../../context/BookmarkContext';
import { useToast } from '../../context/ToastContext';

export default function BookmarkButton({
  eventId,
  eventTitle = 'Event',
  size = 'md',
  className = '',
}) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { showSuccess, showInfo } = useToast();

  const active = isBookmarked(eventId);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nowAdded = toggleBookmark(eventId);
    if (nowAdded) {
      showSuccess(`"${eventTitle}" has been saved to your bookmarks.`, 'Bookmarked');
    } else {
      showInfo(`"${eventTitle}" removed from bookmarks.`, 'Bookmark Removed');
    }
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={active ? 'Remove from bookmarks' : 'Save to bookmarks'}
      aria-label={active ? 'Remove from bookmarks' : 'Save to bookmarks'}
      className={`rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer ${sizeClasses[size] || sizeClasses.md} ${
        active
          ? 'bg-rose-950/90 text-rose-400 border border-rose-600/70 shadow-lg shadow-rose-950/80 scale-105'
          : 'bg-[#10121d]/85 backdrop-blur-md text-slate-400 hover:text-white hover:bg-slate-800 border border-white/10 shadow-sm'
      } ${className}`}
    >
      <Bookmark
        className={`${iconSizes[size] || iconSizes.md} transition-transform active:scale-125 ${
          active ? 'fill-current' : ''
        }`}
      />
    </button>
  );
}

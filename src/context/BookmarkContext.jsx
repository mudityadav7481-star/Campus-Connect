import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { STORAGE_KEYS } from '../utils/constants';

const BookmarkContext = createContext(null);

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => storageService.getBookmarks());

  const toggleBookmark = useCallback((eventId) => {
    const isAdded = storageService.toggleBookmark(eventId);
    setBookmarks(storageService.getBookmarks());
    return isAdded;
  }, []);

  const isBookmarked = useCallback(
    (eventId) => bookmarks.includes(eventId),
    [bookmarks]
  );

  // Sync with storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.BOOKMARKS && e.newValue) {
        try {
          setBookmarks(JSON.parse(e.newValue));
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        bookmarkCount: bookmarks.length,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}

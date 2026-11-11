import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { STORAGE_KEYS } from '../utils/constants';
import { isTodayEvent, isThisWeekEvent, isPastEvent } from '../utils/dateUtils';

const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => storageService.getEvents());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-asc');

  const refreshEvents = useCallback(() => {
    setEvents(storageService.getEvents());
  }, []);

  const addEvent = useCallback((eventData) => {
    const created = storageService.createEvent(eventData);
    refreshEvents();
    return created;
  }, [refreshEvents]);

  const updateEvent = useCallback((id, updates) => {
    const updated = storageService.updateEvent(id, updates);
    refreshEvents();
    return updated;
  }, [refreshEvents]);

  const deleteEvent = useCallback((id) => {
    const result = storageService.deleteEvent(id);
    refreshEvents();
    return result;
  }, [refreshEvents]);

  const getEvent = useCallback((id) => {
    return storageService.getEventById(id);
  }, []);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.EVENTS && e.newValue) {
        try {
          setEvents(JSON.parse(e.newValue));
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filtered and Sorted Events
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Category Filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        (evt) => evt.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Date Filter
    if (selectedDateFilter === 'Today') {
      result = result.filter((evt) => isTodayEvent(evt.startDate));
    } else if (selectedDateFilter === 'This Week') {
      result = result.filter((evt) => isThisWeekEvent(evt.startDate));
    } else if (selectedDateFilter === 'Upcoming') {
      result = result.filter((evt) => !isPastEvent(evt.startDate));
    }

    // Search Query (matches title, description, venue, tags)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((evt) => {
        const titleMatch = evt.title?.toLowerCase().includes(q);
        const descMatch = evt.description?.toLowerCase().includes(q);
        const venueMatch = evt.venue?.toLowerCase().includes(q);
        const tagMatch = evt.tags?.some((t) => t.toLowerCase().includes(q));
        const organizerMatch = evt.organizer?.toLowerCase().includes(q);
        return titleMatch || descMatch || venueMatch || tagMatch || organizerMatch;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.startDate) - new Date(b.startDate);
      }
      if (sortBy === 'date-desc') {
        return new Date(b.startDate) - new Date(a.startDate);
      }
      if (sortBy === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'capacity-desc') {
        return (b.maxCapacity || 0) - (a.maxCapacity || 0);
      }
      return 0;
    });

    return result;
  }, [events, searchQuery, selectedCategory, selectedDateFilter, sortBy]);

  // Featured upcoming spotlight events for Home page
  const spotlightEvents = useMemo(() => {
    return [...events]
      .filter((evt) => !isPastEvent(evt.startDate))
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .slice(0, 3);
  }, [events]);

  return (
    <EventContext.Provider
      value={{
        events,
        filteredEvents,
        spotlightEvents,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedDateFilter,
        setSelectedDateFilter,
        sortBy,
        setSortBy,
        addEvent,
        updateEvent,
        deleteEvent,
        getEvent,
        refreshEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}

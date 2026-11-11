import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';
import { INITIAL_SEED_EVENTS } from './seedData';

/**
 * Storage Service - Abstracted Repository Pattern
 * Provides clean CRUD access over localStorage and easily maps to Supabase later.
 */
class StorageService {
  constructor() {
    this._initializeSeedData();
  }

  // Safe localStorage helper
  _getItem(key, fallback = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (err) {
      console.error(`[StorageService] Failed to read key "${key}":`, err);
      return fallback;
    }
  }

  _setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch a synthetic storage event for intra-tab updates if needed
      return true;
    } catch (err) {
      console.error(`[StorageService] Failed to write key "${key}":`, err);
      return false;
    }
  }

  _initializeSeedData() {
    const existingEvents = this._getItem(STORAGE_KEYS.EVENTS, null);
    if (!existingEvents || !Array.isArray(existingEvents) || existingEvents.length === 0) {
      this._setItem(STORAGE_KEYS.EVENTS, INITIAL_SEED_EVENTS);
    }

    if (!this._getItem(STORAGE_KEYS.REGISTRATIONS, null)) {
      this._setItem(STORAGE_KEYS.REGISTRATIONS, []);
    }

    if (!this._getItem(STORAGE_KEYS.BOOKMARKS, null)) {
      this._setItem(STORAGE_KEYS.BOOKMARKS, []);
    }

    if (!this._getItem(STORAGE_KEYS.ROLE, null)) {
      this._setItem(STORAGE_KEYS.ROLE, USER_ROLES.STUDENT);
    }
  }

  /* ------------------- EVENTS API ------------------- */

  getEvents() {
    const events = this._getItem(STORAGE_KEYS.EVENTS, []);
    if (!events || events.length === 0) {
      this._setItem(STORAGE_KEYS.EVENTS, INITIAL_SEED_EVENTS);
      return INITIAL_SEED_EVENTS;
    }
    return events;
  }

  getEventById(id) {
    const events = this.getEvents();
    return events.find((evt) => evt.id === id) || null;
  }

  createEvent(eventData) {
    const events = this.getEvents();
    const newEvent = {
      ...eventData,
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      registeredCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'published',
    };

    const updatedEvents = [newEvent, ...events];
    this._setItem(STORAGE_KEYS.EVENTS, updatedEvents);
    return newEvent;
  }

  updateEvent(id, updates) {
    const events = this.getEvents();
    const index = events.findIndex((evt) => evt.id === id);
    if (index === -1) {
      throw new Error(`Event with ID ${id} not found.`);
    }

    const updatedEvent = {
      ...events[index],
      ...updates,
      id, // Preserve ID
      updatedAt: new Date().toISOString(),
    };

    events[index] = updatedEvent;
    this._setItem(STORAGE_KEYS.EVENTS, [...events]);
    return updatedEvent;
  }

  deleteEvent(id) {
    const events = this.getEvents();
    const filteredEvents = events.filter((evt) => evt.id !== id);
    this._setItem(STORAGE_KEYS.EVENTS, filteredEvents);

    // Cascading deletion: remove associated registrations
    const registrations = this.getRegistrations();
    const remainingRegs = registrations.filter((reg) => reg.eventId !== id);
    this._setItem(STORAGE_KEYS.REGISTRATIONS, remainingRegs);

    // Cascading deletion: remove associated bookmarks
    const bookmarks = this.getBookmarks();
    const remainingBookmarks = bookmarks.filter((bookmarkedId) => bookmarkedId !== id);
    this._setItem(STORAGE_KEYS.BOOKMARKS, remainingBookmarks);

    return true;
  }

  /* ------------------- REGISTRATIONS API ------------------- */

  getRegistrations() {
    return this._getItem(STORAGE_KEYS.REGISTRATIONS, []);
  }

  getRegistrationForEvent(eventId, studentIdOrEmail) {
    const registrations = this.getRegistrations();
    return registrations.find(
      (reg) =>
        reg.eventId === eventId &&
        (reg.studentEmail === studentIdOrEmail || reg.studentId === studentIdOrEmail)
    ) || null;
  }

  registerForEvent(eventId, studentData) {
    const event = this.getEventById(eventId);
    if (!event) {
      return { success: false, message: 'Event does not exist.' };
    }

    // Capacity check
    if (event.registeredCount >= event.maxCapacity) {
      return { success: false, message: 'This event has reached full capacity.' };
    }

    // Duplicate registration check
    const existing = this.getRegistrationForEvent(eventId, studentData.email);
    if (existing) {
      return {
        success: false,
        message: 'You have already registered for this event.',
        registration: existing,
      };
    }

    // Generate unique Ticket ID
    const ticketId = `TKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    const newRegistration = {
      id: `reg-${Date.now()}`,
      eventId,
      eventTitle: event.title,
      eventCategory: event.category,
      eventVenue: event.venue,
      eventStartDate: event.startDate,
      ticketId,
      studentName: studentData.fullName,
      studentEmail: studentData.email,
      studentId: studentData.studentId,
      department: studentData.department || 'General',
      registeredAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // Increment event registeredCount
    this.updateEvent(eventId, {
      registeredCount: Number(event.registeredCount || 0) + 1,
    });

    // Save registration
    const registrations = this.getRegistrations();
    this._setItem(STORAGE_KEYS.REGISTRATIONS, [newRegistration, ...registrations]);

    return { success: true, registration: newRegistration };
  }

  cancelRegistration(registrationId) {
    const registrations = this.getRegistrations();
    const target = registrations.find((reg) => reg.id === registrationId);
    if (!target) {
      return { success: false, message: 'Registration record not found.' };
    }

    // Decrement event registeredCount
    const event = this.getEventById(target.eventId);
    if (event && event.registeredCount > 0) {
      this.updateEvent(target.eventId, {
        registeredCount: event.registeredCount - 1,
      });
    }

    const filtered = registrations.filter((reg) => reg.id !== registrationId);
    this._setItem(STORAGE_KEYS.REGISTRATIONS, filtered);

    return { success: true };
  }

  /* ------------------- BOOKMARKS API ------------------- */

  getBookmarks() {
    return this._getItem(STORAGE_KEYS.BOOKMARKS, []);
  }

  isBookmarked(eventId) {
    const bookmarks = this.getBookmarks();
    return bookmarks.includes(eventId);
  }

  toggleBookmark(eventId) {
    const bookmarks = this.getBookmarks();
    const exists = bookmarks.includes(eventId);
    let updated;
    if (exists) {
      updated = bookmarks.filter((id) => id !== eventId);
    } else {
      updated = [...bookmarks, eventId];
    }
    this._setItem(STORAGE_KEYS.BOOKMARKS, updated);
    return !exists; // Returns true if added, false if removed
  }

  /* ------------------- USER ROLE API ------------------- */

  getUserRole() {
    return this._getItem(STORAGE_KEYS.ROLE, USER_ROLES.STUDENT);
  }

  setUserRole(role) {
    this._setItem(STORAGE_KEYS.ROLE, role);
    return role;
  }
}

export const storageService = new StorageService();

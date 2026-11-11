import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { STORAGE_KEYS } from '../utils/constants';

const RegistrationContext = createContext(null);

export function RegistrationProvider({ children }) {
  const [registrations, setRegistrations] = useState(() => storageService.getRegistrations());

  const refreshRegistrations = useCallback(() => {
    setRegistrations(storageService.getRegistrations());
  }, []);

  const register = useCallback((eventId, studentData) => {
    const result = storageService.registerForEvent(eventId, studentData);
    if (result.success) {
      refreshRegistrations();
    }
    return result;
  }, [refreshRegistrations]);

  const cancel = useCallback((registrationId) => {
    const result = storageService.cancelRegistration(registrationId);
    if (result.success) {
      refreshRegistrations();
    }
    return result;
  }, [refreshRegistrations]);

  const isRegisteredForEvent = useCallback(
    (eventId, studentEmailOrId) => {
      return Boolean(storageService.getRegistrationForEvent(eventId, studentEmailOrId));
    },
    []
  );

  const getEventRegistration = useCallback(
    (eventId, studentEmailOrId) => {
      return storageService.getRegistrationForEvent(eventId, studentEmailOrId);
    },
    []
  );

  // Sync with storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.REGISTRATIONS && e.newValue) {
        try {
          setRegistrations(JSON.parse(e.newValue));
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        register,
        cancel,
        isRegisteredForEvent,
        getEventRegistration,
        refreshRegistrations,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrations() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistrations must be used within a RegistrationProvider');
  }
  return context;
}

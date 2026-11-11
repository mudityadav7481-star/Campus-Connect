import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { USER_ROLES, DEFAULT_STUDENT_PROFILE } from '../utils/constants';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [role, setRoleState] = useState(() => storageService.getUserRole());
  const [studentProfile, setStudentProfile] = useState(DEFAULT_STUDENT_PROFILE);

  const switchRole = useCallback((newRole) => {
    storageService.setUserRole(newRole);
    setRoleState(newRole);
  }, []);

  const toggleRole = useCallback(() => {
    const nextRole = role === USER_ROLES.ADMIN ? USER_ROLES.STUDENT : USER_ROLES.ADMIN;
    switchRole(nextRole);
  }, [role, switchRole]);

  // Keep synced across browser tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'campusconnect_user_role_v1' && e.newValue) {
        try {
          setRoleState(JSON.parse(e.newValue));
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isAdmin = role === USER_ROLES.ADMIN;
  const isStudent = role === USER_ROLES.STUDENT;

  return (
    <UserContext.Provider
      value={{
        role,
        isAdmin,
        isStudent,
        studentProfile,
        setStudentProfile,
        switchRole,
        toggleRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

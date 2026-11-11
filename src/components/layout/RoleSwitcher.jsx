import React from 'react';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import { Shield, GraduationCap } from 'lucide-react';
import { USER_ROLES } from '../../utils/constants';

export default function RoleSwitcher({ className = '' }) {
  const { role, switchRole, isAdmin } = useUser();
  const { showInfo } = useToast();

  const handleRoleToggle = (targetRole) => {
    if (role === targetRole) return;
    switchRole(targetRole);
    showInfo(
      `Switched view to ${targetRole === USER_ROLES.ADMIN ? 'Administrator' : 'Student'} mode.`,
      'Role Updated'
    );
  };

  return (
    <div
      className={`inline-flex items-center bg-[#10121a] p-1 rounded-xl border border-slate-800 shadow-inner ${className}`}
    >
      <button
        type="button"
        onClick={() => handleRoleToggle(USER_ROLES.STUDENT)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
          !isAdmin
            ? 'bg-slate-800 text-rose-400 shadow-sm border border-slate-700'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <GraduationCap className="w-3.5 h-3.5" />
        <span>Student</span>
      </button>

      <button
        type="button"
        onClick={() => handleRoleToggle(USER_ROLES.ADMIN)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
          isAdmin
            ? 'bg-gradient-to-r from-rose-600 to-red-700 text-white shadow-md shadow-rose-950/50'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Shield className="w-3.5 h-3.5" />
        <span>Admin</span>
      </button>
    </div>
  );
}

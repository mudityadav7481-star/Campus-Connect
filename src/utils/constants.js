export const EVENT_CATEGORIES = [
  'All',
  'Technical',
  'Cultural',
  'Sports',
  'Workshop',
  'Seminar',
  'Hackathon',
  'Social'
];

export const CATEGORY_COLORS = {
  Technical: 'bg-sky-950/70 text-sky-400 border-sky-700/60 shadow-xs shadow-sky-950',
  Cultural: 'bg-fuchsia-950/70 text-fuchsia-400 border-fuchsia-700/60 shadow-xs shadow-fuchsia-950',
  Sports: 'bg-emerald-950/70 text-emerald-400 border-emerald-700/60 shadow-xs shadow-emerald-950',
  Workshop: 'bg-amber-950/70 text-amber-400 border-amber-700/60 shadow-xs shadow-amber-950',
  Seminar: 'bg-teal-950/70 text-teal-400 border-teal-700/60 shadow-xs shadow-teal-950',
  Hackathon: 'bg-rose-950/70 text-rose-400 border-rose-700/60 shadow-xs shadow-rose-950',
  Social: 'bg-violet-950/70 text-violet-400 border-violet-700/60 shadow-xs shadow-violet-950',
  Default: 'bg-slate-850 text-slate-300 border-slate-700',
};

export const STORAGE_KEYS = {
  EVENTS: 'campusconnect_events_v1',
  REGISTRATIONS: 'campusconnect_registrations_v1',
  BOOKMARKS: 'campusconnect_bookmarks_v1',
  ROLE: 'campusconnect_user_role_v1',
};

export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
};

export const DEFAULT_STUDENT_PROFILE = {
  id: 'usr_student_01',
  fullName: 'Alex Morgan',
  email: 'alex.morgan@university.edu',
  studentId: 'STU-2026-8841',
  department: 'Computer Science & Engineering',
  year: 'Junior (3rd Year)',
};

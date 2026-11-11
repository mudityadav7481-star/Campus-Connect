/**
 * Formats an ISO date string to readable date: e.g. "Sat, Nov 15, 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return 'TBA';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats time from ISO: e.g. "10:00 AM"
 */
export function formatTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Formats full range: e.g. "Sat, Nov 15, 2026 • 10:00 AM - 4:00 PM"
 */
export function formatDateTimeRange(startStr, endStr) {
  if (!startStr) return 'TBA';
  const startDate = new Date(startStr);
  const formattedDate = formatDate(startStr);
  const startTime = formatTime(startStr);
  
  if (!endStr) {
    return `${formattedDate} at ${startTime}`;
  }
  
  const endTime = formatTime(endStr);
  return `${formattedDate} • ${startTime} - ${endTime}`;
}

export function isPastEvent(dateString) {
  if (!dateString) return false;
  const eventDate = new Date(dateString);
  const now = new Date();
  return eventDate < now;
}

export function isTodayEvent(dateString) {
  if (!dateString) return false;
  const eventDate = new Date(dateString);
  const now = new Date();
  return (
    eventDate.getDate() === now.getDate() &&
    eventDate.getMonth() === now.getMonth() &&
    eventDate.getFullYear() === now.getFullYear()
  );
}

export function isThisWeekEvent(dateString) {
  if (!dateString) return false;
  const eventDate = new Date(dateString);
  const now = new Date();
  
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  endOfWeek.setHours(23, 59, 59, 999);

  return eventDate >= startOfWeek && eventDate <= endOfWeek;
}

/**
 * Converts ISO string to datetime-local input format: YYYY-MM-DDTHH:MM
 */
export function toDatetimeLocalInput(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

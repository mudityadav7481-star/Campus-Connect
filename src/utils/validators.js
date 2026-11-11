export function validateEventForm(formData) {
  const errors = {};

  if (!formData.title || formData.title.trim().length < 3) {
    errors.title = 'Event title must be at least 3 characters long.';
  }

  if (!formData.category || formData.category === 'All') {
    errors.category = 'Please select a valid event category.';
  }

  if (!formData.venue || formData.venue.trim().length < 2) {
    errors.venue = 'Venue or location is required.';
  }

  if (!formData.startDate) {
    errors.startDate = 'Event start date and time are required.';
  }

  if (!formData.endDate) {
    errors.endDate = 'Event end date and time are required.';
  } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
    errors.endDate = 'End time must be after the start time.';
  }

  const capacity = Number(formData.maxCapacity);
  if (!formData.maxCapacity || isNaN(capacity) || capacity <= 0) {
    errors.maxCapacity = 'Capacity must be a positive number greater than 0.';
  }

  if (!formData.description || formData.description.trim().length < 10) {
    errors.description = 'Please provide a detailed description (minimum 10 characters).';
  }

  if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
    errors.imageUrl = 'Please provide a valid web URL or image link.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateRegistrationForm(formData) {
  const errors = {};

  if (!formData.fullName || formData.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    errors.email = 'Please provide a valid college email address.';
  }

  if (!formData.studentId || formData.studentId.trim().length < 3) {
    errors.studentId = 'Student ID number is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

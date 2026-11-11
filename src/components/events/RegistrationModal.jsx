import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useUser } from '../../context/UserContext';
import { useRegistrations } from '../../context/RegistrationContext';
import { useToast } from '../../context/ToastContext';
import { validateRegistrationForm } from '../../utils/validators';
import { User, Mail, Hash, Building2, CheckCircle2 } from 'lucide-react';

export default function RegistrationModal({
  isOpen,
  onClose,
  event,
  onSuccess,
}) {
  const { studentProfile } = useUser();
  const { register } = useRegistrations();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    department: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && studentProfile) {
      setFormData({
        fullName: studentProfile.fullName || '',
        email: studentProfile.email || '',
        studentId: studentProfile.studentId || '',
        department: studentProfile.department || '',
      });
      setErrors({});
    }
  }, [isOpen, studentProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);

    try {
      const result = register(event.id, formData);
      if (result.success) {
        showSuccess(`You are registered for "${event.title}"!`, 'Registration Confirmed');
        onClose();
        if (onSuccess) {
          onSuccess(result.registration);
        }
      } else {
        showError(result.message || 'Registration failed.', 'Unable to Register');
      }
    } catch (err) {
      showError('An unexpected error occurred.', 'Error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!event) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Event Registration"
      subtitle={`Reserve your seat for ${event.title}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Notice */}
        <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800/50 flex items-start gap-3 text-xs text-rose-200">
          <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <p>
            Please confirm your student details. A digital pass and QR code will be generated upon confirmation.
          </p>
        </div>

        <Input
          label="Full Legal Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="e.g. Alex Morgan"
          icon={User}
          required
        />

        <Input
          label="University Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="e.g. alex.morgan@university.edu"
          icon={Mail}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Student ID Number"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            error={errors.studentId}
            placeholder="STU-2026-XXXX"
            icon={Hash}
            required
          />

          <Input
            label="Department / Major"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
            icon={Building2}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
          <Button variant="ghost" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            Confirm Registration
          </Button>
        </div>

      </form>
    </Modal>
  );
}

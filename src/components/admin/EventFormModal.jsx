import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { EVENT_CATEGORIES } from '../../utils/constants';
import { validateEventForm } from '../../utils/validators';
import { toDatetimeLocalInput } from '../../utils/dateUtils';
import {
  Type,
  MapPin,
  Calendar,
  Users,
  Image,
  Building,
  Mail,
  Tag,
} from 'lucide-react';

const CATEGORY_OPTIONS = EVENT_CATEGORIES.filter((c) => c !== 'All').map((c) => ({
  value: c,
  label: c,
}));

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';

export default function EventFormModal({
  isOpen,
  onClose,
  initialData = null,
  onSubmit,
}) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technical',
    venue: '',
    startDate: '',
    endDate: '',
    maxCapacity: '100',
    bannerUrl: '',
    organizer: '',
    organizerEmail: '',
    description: '',
    tags: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || '',
          category: initialData.category || 'Technical',
          venue: initialData.venue || '',
          startDate: toDatetimeLocalInput(initialData.startDate),
          endDate: toDatetimeLocalInput(initialData.endDate),
          maxCapacity: String(initialData.maxCapacity || '100'),
          bannerUrl: initialData.bannerUrl || '',
          organizer: initialData.organizer || '',
          organizerEmail: initialData.organizerEmail || '',
          description: initialData.description || '',
          tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '',
        });
      } else {
        // Defaults for new event
        const now = new Date();
        now.setDate(now.getDate() + 3);
        now.setHours(10, 0, 0, 0);
        const later = new Date(now);
        later.setHours(16, 0, 0, 0);

        setFormData({
          title: '',
          category: 'Technical',
          venue: '',
          startDate: toDatetimeLocalInput(now.toISOString()),
          endDate: toDatetimeLocalInput(later.toISOString()),
          maxCapacity: '100',
          bannerUrl: DEFAULT_BANNER,
          organizer: 'Campus Student Council',
          organizerEmail: 'events@university.edu',
          description: '',
          tags: 'Campus, StudentLife',
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload
    const payload = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : '',
      maxCapacity: Number(formData.maxCapacity),
      bannerUrl: formData.bannerUrl.trim() || DEFAULT_BANNER,
      tags: formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };

    const validation = validateEventForm(payload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(payload);
      onClose();
    } catch (err) {
      console.error('Failed to save event:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Campus Event' : 'Create New Event'}
      subtitle={
        isEditing
          ? 'Update the event details, capacity, and logistical information.'
          : 'Publish an upcoming event to the centralized student catalog.'
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title */}
        <Input
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="e.g. Annual Autonomous Robotics Hackathon"
          icon={Type}
          required
        />

        {/* Category & Venue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={CATEGORY_OPTIONS}
            error={errors.category}
            required
          />

          <Input
            label="Venue / Campus Location"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            error={errors.venue}
            placeholder="e.g. Science Block C, Auditorium 1"
            icon={MapPin}
            required
          />
        </div>

        {/* Start Date & End Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Start Date & Time"
            name="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={handleChange}
            error={errors.startDate}
            icon={Calendar}
            required
          />

          <Input
            label="End Date & Time"
            name="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={handleChange}
            error={errors.endDate}
            icon={Calendar}
            required
          />
        </div>

        {/* Max Capacity & Banner URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Max Student Capacity"
            name="maxCapacity"
            type="number"
            min="1"
            value={formData.maxCapacity}
            onChange={handleChange}
            error={errors.maxCapacity}
            icon={Users}
            required
          />

          <Input
            label="Banner Image URL"
            name="bannerUrl"
            type="url"
            value={formData.bannerUrl}
            onChange={handleChange}
            error={errors.imageUrl}
            placeholder="https://images.unsplash.com/..."
            icon={Image}
            helperText="Leave default or provide an image link."
          />
        </div>

        {/* Organizer & Organizer Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Organizer Club / Department"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            placeholder="e.g. ACM Student Chapter"
            icon={Building}
          />

          <Input
            label="Organizer Contact Email"
            name="organizerEmail"
            type="email"
            value={formData.organizerEmail}
            onChange={handleChange}
            placeholder="organizer@university.edu"
            icon={Mail}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1.5">
            Event Description & Agenda <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what students will learn, participate in, prizes, prerequisites, etc."
            className={`block w-full rounded-xl border p-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
              errors.description
                ? 'border-rose-600/80 bg-rose-950/20 focus:border-rose-500 focus:ring-rose-500/30'
                : 'border-slate-800 bg-[#0d0f17] hover:border-slate-700 focus:border-rose-500 focus:ring-rose-500/20'
            }`}
          />
          {errors.description && (
            <p className="mt-1.5 text-xs text-rose-400 font-medium">
              • {errors.description}
            </p>
          )}
        </div>

        {/* Tags */}
        <Input
          label="Tags (Comma separated)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="AI, Coding, Hackathon, Tech"
          icon={Tag}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
          <Button variant="ghost" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            {isEditing ? 'Save Changes' : 'Publish Event'}
          </Button>
        </div>

      </form>
    </Modal>
  );
}

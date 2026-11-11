import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { useRegistrations } from '../context/RegistrationContext';
import { useToast } from '../context/ToastContext';
import AdminTable from '../components/admin/AdminTable';
import EventFormModal from '../components/admin/EventFormModal';
import DeleteDialog from '../components/admin/DeleteDialog';
import Button from '../components/common/Button';
import {
  Shield,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

export default function AdminDashboard() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { registrations } = useRegistrations();
  const { showSuccess, showError } = useToast();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // High level metrics
  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  const totalCapacity = events.reduce((acc, e) => acc + (Number(e.maxCapacity) || 0), 0);
  const totalFilled = events.reduce((acc, e) => acc + (Number(e.registeredCount) || 0), 0);
  const utilizationRate = totalCapacity > 0 ? Math.round((totalFilled / totalCapacity) * 100) : 0;
  const fullEventsCount = events.filter((e) => e.registeredCount >= e.maxCapacity).length;

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (event) => {
    setEditingEvent(event);
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (event) => {
    setDeletingEvent(event);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingEvent) {
        updateEvent(editingEvent.id, formData);
        showSuccess(`"${formData.title}" updated successfully!`, 'Event Updated');
      } else {
        addEvent(formData);
        showSuccess(`"${formData.title}" created and published!`, 'Event Created');
      }
      setIsFormModalOpen(false);
      setEditingEvent(null);
    } catch (err) {
      showError(err.message || 'Operation failed.', 'Error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingEvent) return;
    setDeleteLoading(true);
    try {
      deleteEvent(deletingEvent.id);
      showSuccess(`"${deletingEvent.title}" was permanently deleted.`, 'Event Deleted');
      setDeletingEvent(null);
    } catch (err) {
      showError('Failed to delete event.', 'Error');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-700/60 text-rose-400 text-xs font-bold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Administrator Console</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
            Campus Event Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Publish, edit, monitor capacity, and manage all student activities.
          </p>
        </div>

        <Button
          size="lg"
          icon={Plus}
          iconPosition="left"
          onClick={handleOpenCreate}
          className="shadow-xl shadow-rose-950/60"
        >
          Create New Event
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-[#12141f] p-5 rounded-3xl border border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Events</p>
            <p className="text-2xl font-black text-white mt-0.5">{totalEvents}</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#12141f] p-5 rounded-3xl border border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-800/60 text-purple-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Attendees</p>
            <p className="text-2xl font-black text-white mt-0.5">{totalFilled}</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#12141f] p-5 rounded-3xl border border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fill Rate</p>
            <p className="text-2xl font-black text-emerald-400 mt-0.5">{utilizationRate}%</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#12141f] p-5 rounded-3xl border border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-800/60 text-amber-400 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sold Out Events</p>
            <p className="text-2xl font-black text-amber-400 mt-0.5">{fullEventsCount}</p>
          </div>
        </div>

      </div>

      {/* Admin Events Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Live Campus Event Inventory</h2>
        </div>

        <AdminTable
          events={events}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </div>

      {/* Add / Edit Event Modal */}
      <EventFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingEvent(null);
        }}
        initialData={editingEvent}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={Boolean(deletingEvent)}
        onClose={() => setDeletingEvent(null)}
        onConfirm={handleConfirmDelete}
        eventTitle={deletingEvent?.title}
        loading={deleteLoading}
      />

    </div>
  );
}

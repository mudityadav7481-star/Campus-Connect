import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AlertTriangle } from 'lucide-react';

export default function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  eventTitle = '',
  loading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Campus Event"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 flex items-start gap-3 text-rose-200 text-xs">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-white">This action cannot be undone.</p>
            <p className="leading-relaxed">
              Are you sure you want to permanently delete <strong className="font-semibold text-rose-300">"{eventTitle}"</strong>?
            </p>
            <p className="text-rose-400 font-semibold">
              All student registrations and bookmarks associated with this event will also be removed.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            Delete Event
          </Button>
        </div>

      </div>
    </Modal>
  );
}

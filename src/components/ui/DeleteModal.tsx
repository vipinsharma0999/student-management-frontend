'use client';
import { AlertTriangle, Loader2, X } from 'lucide-react';

interface DeleteModalProps {
  name: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function DeleteModal({ name, onConfirm, onCancel, loading }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-surface-card border border-surface-border rounded-2xl shadow-card-hover w-full max-w-md animate-slide-up">
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
          </div>
          <h2 className="font-display font-bold text-xl text-white mb-2">Delete Student</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Are you sure you want to delete <span className="text-white font-semibold">{name}</span>?
            This action performs a soft delete and can be reviewed in audit logs.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <button onClick={onCancel} className="btn-secondary flex-1">Cancel</button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="btn-danger flex-1 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Deleting...' : 'Yes, Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

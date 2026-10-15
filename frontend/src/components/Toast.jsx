import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-400 shrink-0" />,
  };

  const bgStyles = {
    success: 'border-emerald-500/30 bg-slate-900/95 text-slate-100 shadow-emerald-500/10',
    error: 'border-rose-500/30 bg-slate-900/95 text-slate-100 shadow-rose-500/10',
    warning: 'border-amber-500/30 bg-slate-900/95 text-slate-100 shadow-amber-500/10',
    info: 'border-indigo-500/30 bg-slate-900/95 text-slate-100 shadow-indigo-500/10',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md min-w-[300px] max-w-md ${bgStyles[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <div className="flex-1 text-sm font-medium">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useAuth();
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-[#E60023] flex-shrink-0" />
  };

  const borderStyles = {
    success: 'border-emerald-200 bg-white/95 text-emerald-950',
    error: 'border-rose-200 bg-white/95 text-rose-950',
    info: 'border-red-200 bg-white/95 text-zinc-900'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-floating border backdrop-blur-md ${borderStyles[toast.type] || borderStyles.info}`}>
        {icons[toast.type] || icons.info}
        <span className="text-sm font-medium pr-2">{toast.message}</span>
      </div>
    </div>
  );
}

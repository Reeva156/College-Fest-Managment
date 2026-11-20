import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setupAdmin, clearError } from '../store/authSlice';
import { ShieldCheck, Lock, Mail, User, Building2, Sparkles, X, ArrowRight } from 'lucide-react';

export default function AdminSetupModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setDepartment('');
      dispatch(clearError());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    const result = await dispatch(setupAdmin({ name, email, password, department }));
    if (!result.error) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-floating border border-zinc-100 p-6 sm:p-8 relative">
        
        
        <button
          onClick={() => { dispatch(clearError()); onClose(); }}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#E60023] flex items-center justify-center mx-auto mb-3 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E60023] text-[11px] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Set Up Your Admin Account
          </div>
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
            Administrator Setup
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
            Configure your own custom Admin credentials to take full control of the College Fest platform.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
              Your Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="e.g. Dr. Aryan Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
              Admin Official Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="admin@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
              Set Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="Choose your secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
              Department / Convener Title
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. Faculty Convener, BCA Dept"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
            🛡️ <strong>Admin Authority:</strong> This account will have supreme access to publish events, create teacher/student logins, verify passes, and declare winners.
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-full bg-[#E60023] hover:bg-[#B6001B] disabled:bg-zinc-300 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Initializing Admin...' : 'Create & Take Control as Admin'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}

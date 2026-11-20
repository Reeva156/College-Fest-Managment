import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../store/authSlice';
import { X, Lock, Mail, User, GraduationCap, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onOpenAdminSetup }) {
  const dispatch = useDispatch();
  const { loading, error, hasAdmin } = useSelector((state) => state.auth);

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode('login');
      setEmail('');
      setPassword('');
      setName('');
      setDepartment('');
      dispatch(clearError());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      const result = await dispatch(loginUser({ email, password }));
      if (!result.error) onClose();
    } else {
      const result = await dispatch(registerUser({ name, email, password, department }));
      if (!result.error) onClose();
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
          <div className="w-12 h-12 rounded-full bg-[#E60023] text-white font-black text-2xl flex items-center justify-center mx-auto mb-2 shadow-sm">
            P
          </div>
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
            {mode === 'login' ? 'Sign in to PULSE \'26' : 'Join College Fest'}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Discover pins, register for events, and manage fest passes.
          </p>
        </div>

        
        {!hasAdmin && (
          <div className="mb-4 p-3.5 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl flex items-center justify-between gap-3">
            <div className="text-[11px] text-[#E60023] font-semibold leading-tight">
              👑 No Admin set yet! Set up your Admin account.
            </div>
            <button
              type="button"
              onClick={() => { onClose(); onOpenAdminSetup(); }}
              className="px-3 py-1 bg-[#E60023] hover:bg-[#B6001B] text-white text-[11px] font-bold rounded-full shadow-xs whitespace-nowrap"
            >
              Setup Admin
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        
        <div className="flex bg-[#F5F2EB] p-1 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => { setMode('login'); dispatch(clearError()); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); dispatch(clearError()); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Student Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reeva Solani"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Department / Class
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. BCA 2nd Year, CS Dept"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-[11px] text-zinc-600">
              🎓 <strong>Student Account:</strong> Creates participant access. Teacher & Organizer accounts are provisioned exclusively by the Admin Convener.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-full bg-[#E60023] hover:bg-[#B6001B] disabled:bg-zinc-300 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Student Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFest } from '../context/FestContext';
import { X, Lock, Mail, User, GraduationCap, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen } = useFest();
  const { login, register, switchPersona } = useAuth();

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('participant');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ name, email, password, department, role });
      }
      setAuthModalOpen(false);
    } catch (err) {

    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (personaRole) => {
    await switchPersona(personaRole);
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-floating border border-zinc-100 p-6 sm:p-8 relative">
        
        
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#E60023] text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-2 shadow-md">
            P
          </div>
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
            {mode === 'login' ? 'Welcome to PULSE \'26' : 'Join College Fest'}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Discover pins, register for events, and manage passes.
          </p>
        </div>

        
        <div className="mb-5 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
          <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2 text-center">
            ⚡ Quick 1-Click Demo Login
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('participant')}
              className="py-1.5 px-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-xl text-[11px] font-bold shadow-xs truncate"
              title="Student Login"
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('organizer')}
              className="py-1.5 px-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-xl text-[11px] font-bold shadow-xs truncate"
              title="Organizer Login"
            >
              📋 Organizer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-1.5 px-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-xl text-[11px] font-bold shadow-xs truncate"
              title="Admin Login"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        
        <div className="flex bg-zinc-100 p-1 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
            }`}
          >
            Create Account
          </button>
        </div>

        
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reeva Solani"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Department / Class
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. BCA 2nd Year, Dept of CS"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-[11px] text-zinc-600">
              <span className="font-bold text-zinc-900 block mb-0.5">🎓 Student Registration Account</span>
              <span>Self-signup generates student credentials. Teacher and Organizer access is provisioned by the <strong>Admin Convener</strong>.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-full bg-[#E60023] hover:bg-[#B6001B] disabled:bg-zinc-300 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <span>{loading ? 'Processing...' : mode === 'login' ? 'Log In to Fest' : 'Create My Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}

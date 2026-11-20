import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFest } from '../context/FestContext';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  KeyRound,
  ShieldAlert,
  Compass
} from 'lucide-react';

export default function LoginPortalPage({ setActiveTab }) {
  const { user, login, switchPersona, showToast } = useAuth();
  const [selectedRole, setSelectedRole] = useState('participant');
  const [email, setEmail] = useState('reeva@fest.edu');
  const [password, setPassword] = useState('student123');
  const [loading, setLoading] = useState(false);

  const roleCards = [
    {
      id: 'participant',
      title: 'Student Portal',
      badge: 'Student / Participant',
      icon: <GraduationCap className="w-7 h-7 text-[#E60023]" />,
      accentColor: 'border-red-200 hover:border-[#E60023] bg-gradient-to-b from-rose-50/70 via-white to-white',
      badgeStyle: 'bg-red-50 text-[#E60023] border border-red-200',
      description: 'Explore pins, register for individual/squad events, get digital QR entry passes, and download merit certificates.',
      demoEmail: 'reeva@fest.edu',
      demoPass: 'student123',
      demoName: 'Reeva Solani (BCA 2nd Year)'
    },
    {
      id: 'organizer',
      title: 'Teacher & Organizer Portal',
      badge: 'Faculty / Event Lead',
      icon: <Users className="w-7 h-7 text-emerald-600" />,
      accentColor: 'border-emerald-200 hover:border-emerald-500 bg-gradient-to-b from-emerald-50/70 via-white to-white',
      badgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      description: 'Scan & verify participant QR entry passes at venues, monitor live attendance rates, and record podium results.',
      demoEmail: 'organizer@fest.edu',
      demoPass: 'organizer123',
      demoName: 'Aryan Verma (Tech Lead / Faculty)'
    },
    {
      id: 'admin',
      title: 'Admin Convener Portal',
      badge: 'Admin Only Authority',
      icon: <ShieldCheck className="w-7 h-7 text-indigo-600" />,
      accentColor: 'border-indigo-200 hover:border-indigo-500 bg-gradient-to-b from-indigo-50/70 via-white to-white',
      badgeStyle: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      description: 'Supreme authority: create student or teacher logins, publish new fest pins, control ledger, and release certificates.',
      demoEmail: 'admin@fest.edu',
      demoPass: 'admin123',
      demoName: 'Prof. Ramesh Sharma (Faculty Convener)'
    }
  ];

  const handleRoleSelect = (card) => {
    setSelectedRole(card.id);
    setEmail(card.demoEmail);
    setPassword(card.demoPass);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedUser = await login({ email, password });

      if (loggedUser.role === 'admin') {
        setActiveTab('admin');
      } else if (loggedUser.role === 'organizer') {
        setActiveTab('checkin');
      } else {
        setActiveTab('explore');
      }
    } catch (err) {

    } finally {
      setLoading(false);
    }
  };

  const handleQuickSwitch = async (roleId) => {
    await switchPersona(roleId);
    if (roleId === 'admin') {
      setActiveTab('admin');
    } else if (roleId === 'organizer') {
      setActiveTab('checkin');
    } else {
      setActiveTab('explore');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#E60023] text-xs font-bold mb-3 border border-red-100 shadow-xs">
          <Sparkles className="w-4 h-4" />
          <span>PULSE 2026 Unified Role-Based Login Gateway</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
          Select Your Portal to Sign In
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
          Log in with your designated credentials to access role-specific dashboard privileges.
          Admins have exclusive authority to issue new student and teacher accounts.
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {roleCards.map((card) => {
          const isSelected = selectedRole === card.id;
          return (
            <div
              key={card.id}
              onClick={() => handleRoleSelect(card)}
              className={`rounded-3xl p-6 border-2 transition-all cursor-pointer relative shadow-sm hover:shadow-md flex flex-col justify-between ${
                card.accentColor
              } ${isSelected ? 'ring-2 ring-zinc-900 shadow-md scale-[1.02]' : 'opacity-90 hover:opacity-100'}`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}

              <div>
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center mb-4">
                  {card.icon}
                </div>

                <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${card.badgeStyle}`}>
                  {card.badge}
                </span>

                <h3 className="text-xl font-black text-zinc-900 mt-3 mb-2">
                  {card.title}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100/80">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickSwitch(card.id);
                  }}
                  className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-zinc-50 border border-zinc-200 text-xs font-bold text-zinc-800 shadow-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#E60023]" />
                  <span>1-Click Sign In as {card.id === 'participant' ? 'Student' : card.id === 'organizer' ? 'Teacher' : 'Admin'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-pin relative">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Authentication Gate</span>
            <h3 className="text-lg font-black text-zinc-900">
              Sign In to {roleCards.find(c => c.id === selectedRole)?.title}
            </h3>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 capitalize">
            {selectedRole} Role
          </span>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
              <input
                type="email"
                required
                placeholder="name@fest.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Role Authorization:</strong> You can sign in using pre-seeded accounts, or with accounts created by the <strong>Admin Convener</strong> in the Admin Desk.
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#E60023] hover:bg-[#B6001B] disabled:bg-zinc-300 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : `Enter ${roleCards.find(c => c.id === selectedRole)?.title}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {user && (
          <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-500">
              Currently signed in as: <strong className="text-zinc-900">{user.name}</strong> ({user.role})
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('explore')}
              className="font-bold text-[#E60023] hover:underline flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5" />
              Go to Feed
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

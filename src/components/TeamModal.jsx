import React, { useState } from 'react';
import { useFest } from '../context/FestContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import { X, Users, KeyRound, PlusCircle, UserPlus, CheckCircle2 } from 'lucide-react';

export default function TeamModal() {
  const { teamModalEvent: event, setTeamModalEvent, setQrModalData, loadMyRegistrations, loadEvents } = useFest();
  const { user, showToast } = useAuth();

  const [activeTab, setActiveTab] = useState('create');
  const [teamName, setTeamName] = useState('');
  const [memberEmailInput, setMemberEmailInput] = useState('');
  const [memberEmails, setMemberEmails] = useState([]);
  const [teamCodeInput, setTeamCodeInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!event) return null;

  const handleAddEmail = (e) => {
    e.preventDefault();
    if (!memberEmailInput.trim()) return;
    if (memberEmails.includes(memberEmailInput.trim())) return;
    setMemberEmails([...memberEmails, memberEmailInput.trim()]);
    setMemberEmailInput('');
  };

  const handleRemoveEmail = (emailToRemove) => {
    setMemberEmails(memberEmails.filter(e => e !== emailToRemove));
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in to register your team!', 'info');
      return;
    }
    if (!teamName.trim()) {
      showToast('Please enter a team name.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.registerTeam({
        eventId: event.id,
        teamName: teamName.trim(),
        memberEmails
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      showToast(res.message, 'success');
      await loadMyRegistrations();
      await loadEvents();
      setTeamModalEvent(null);
      if (res.registration) {
        setQrModalData(res.registration);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in to join a team!', 'info');
      return;
    }
    if (!teamCodeInput.trim()) {
      showToast('Please enter the team code.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.joinTeam(teamCodeInput.trim());

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      showToast(res.message, 'success');
      await loadMyRegistrations();
      await loadEvents();
      setTeamModalEvent(null);
      if (res.registration) {
        setQrModalData(res.registration);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-floating border border-zinc-100 p-6 sm:p-8 relative">
        
        
        <button
          onClick={() => setTeamModalEvent(null)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-red-50 text-[#E60023] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-zinc-900">
            Team Registration
          </h3>
          <p className="text-xs text-zinc-500 mt-1 font-medium">
            {event.title} • ({event.teamSize?.min} to {event.teamSize?.max} members)
          </p>
        </div>

        
        <div className="flex bg-zinc-100 p-1 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'create'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Create New Team
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('join')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'join'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Join with Team Code
          </button>
        </div>

        
        {activeTab === 'create' ? (
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Team Name
              </label>
              <input
                type="text"
                placeholder="e.g. CodeWarriors, ByteKnights"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-sm focus:bg-white focus:border-zinc-400 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Add Teammate Emails (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="teammate@college.edu"
                  value={memberEmailInput}
                  onChange={(e) => setMemberEmailInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-2xl hover:bg-black transition-all flex items-center gap-1"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add
                </button>
              </div>

              {memberEmails.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {memberEmails.map((email) => (
                    <span
                      key={email}
                      className="inline-flex items-center gap-1 text-[11px] bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full font-medium"
                    >
                      {email}
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(email)}
                        className="text-zinc-400 hover:text-zinc-700 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              💡 <strong>Tip:</strong> Upon creation, you will receive a unique <strong>Team Code</strong>. Share it with your friends so they can join your squad directly!
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full bg-[#E60023] hover:bg-[#B6001B] disabled:bg-zinc-300 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>{submitting ? 'Creating Squad...' : 'Create Team & Generate QR Pass'}</span>
            </button>
          </form>
        ) : (
          
          <form onSubmit={handleJoinTeam} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Enter Team Code
              </label>
              <input
                type="text"
                placeholder="e.g. CYBER-749"
                value={teamCodeInput}
                onChange={(e) => setTeamCodeInput(e.target.value.toUpperCase())}
                required
                className="w-full px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-center font-mono text-base uppercase font-bold tracking-widest focus:bg-white focus:border-zinc-400 focus:outline-none transition-all placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-xs"
              />
            </div>

            <div className="bg-zinc-50 rounded-2xl p-3.5 border border-zinc-200 text-xs text-zinc-600">
              Ask your team leader for the 8-character code displayed on their registration ticket pass.
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full bg-zinc-900 hover:bg-black disabled:bg-zinc-300 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{submitting ? 'Verifying...' : 'Join Squad & Claim Pass'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

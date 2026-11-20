import React, { useState } from 'react';
import { useFest } from '../context/FestContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  ShieldAlert,
  Phone,
  Bookmark,
  Share2,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function EventModal() {
  const {
    activeEventModal: event,
    setActiveEventModal,
    savedPinIds,
    toggleSavePin,
    setTeamModalEvent,
    loadMyRegistrations,
    loadEvents,
    myRegistrations,
    setQrModalData
  } = useFest();
  const { user, showToast, setAuthModalOpen } = useAuth();
  const [registering, setRegistering] = useState(false);

  if (!event) return null;

  const isSaved = savedPinIds.includes(event.id);
  const userRegistration = myRegistrations.find(r => r.eventId === event.id);

  const handleIndividualRegister = async () => {
    if (!user) {
      showToast('Please log in to register for events!', 'info');
      return;
    }

    try {
      setRegistering(true);
      const res = await api.registerIndividual(event.id);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      showToast(res.message, 'success');
      await loadMyRegistrations();
      await loadEvents();
      if (res.registration) {
        setQrModalData(res.registration);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setRegistering(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard! 📋', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      
      <div
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-floating relative border border-zinc-100 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={() => setActiveEventModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-zinc-100 text-zinc-700 shadow-md backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div className="md:w-5/12 relative bg-zinc-900 min-h-[260px] md:min-h-full flex flex-col justify-between overflow-hidden">
          <img
            src={event.coverImage}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30"></div>

          
          <div className="relative z-10 p-5 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-zinc-900 shadow">
              {event.category}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all"
                title="Share Event"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleSavePin(event.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow ${
                  isSaved ? 'bg-zinc-900 text-white' : 'bg-[#E60023] text-white hover:bg-[#B6001B]'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          
          <div className="relative z-10 p-6 text-white space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400/20 border border-amber-300/30 backdrop-blur-md">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold text-amber-200">{event.prize || 'Exciting Prizes & Certificates'}</span>
            </div>
            <p className="text-xs text-zinc-300">
              Coordinator: <span className="font-semibold text-white">{event.coordinator?.name}</span> ({event.coordinator?.contact})
            </p>
          </div>
        </div>

        
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-1">
                <span>{event.tag || 'Official Fest Event'}</span>
                <span>•</span>
                <span className={event.registrationStatus === 'Open' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                  {event.registrationStatus}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                {event.title}
              </h2>
              <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                {event.description}
              </p>
            </div>

            
            <div className="grid grid-cols-2 gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <div className="flex items-center gap-2.5 text-xs text-zinc-700">
                <Calendar className="w-4 h-4 text-[#E60023]" />
                <div>
                  <span className="text-[10px] text-zinc-400 block font-semibold">DATE</span>
                  <span className="font-bold">{event.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-zinc-700">
                <Clock className="w-4 h-4 text-[#E60023]" />
                <div>
                  <span className="text-[10px] text-zinc-400 block font-semibold">TIME</span>
                  <span className="font-bold">{event.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-zinc-700">
                <MapPin className="w-4 h-4 text-[#E60023]" />
                <div>
                  <span className="text-[10px] text-zinc-400 block font-semibold">VENUE</span>
                  <span className="font-bold truncate max-w-[130px]">{event.venue}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-zinc-700">
                <Users className="w-4 h-4 text-[#E60023]" />
                <div>
                  <span className="text-[10px] text-zinc-400 block font-semibold">TEAM FORMAT</span>
                  <span className="font-bold">
                    {event.isTeamEvent ? `Team (${event.teamSize?.min}-${event.teamSize?.max})` : 'Individual Solo'}
                  </span>
                </div>
              </div>
            </div>

            
            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" />
                Guidelines & Rules
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-600">
                {event.rules?.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 flex-shrink-0"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          
          <div className="mt-6 pt-5 border-t border-zinc-100">
            {userRegistration ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-emerald-900">You are Registered!</h5>
                    <p className="text-[11px] text-emerald-700">
                      Pass: <span className="font-mono font-bold">{userRegistration.qrToken}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveEventModal(null);
                    setQrModalData(userRegistration);
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-full shadow-sm"
                >
                  View QR Ticket
                </button>
              </div>
            ) : event.isTeamEvent ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setActiveEventModal(null);
                    setTeamModalEvent(event);
                  }}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#E60023] hover:bg-[#B6001B] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Team Registration (Create or Join)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  disabled={registering || event.registrationStatus === 'Closed'}
                  onClick={handleIndividualRegister}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#E60023] hover:bg-[#B6001B] disabled:bg-zinc-300 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{registering ? 'Securing Seat...' : 'Register as Individual (Free Entry)'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

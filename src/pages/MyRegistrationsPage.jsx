import React from 'react';
import { useFest } from '../context/FestContext';
import { useAuth } from '../context/AuthContext';
import { Ticket, QrCode, Users, Calendar, MapPin, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function MyRegistrationsPage({ setActiveTab }) {
  const { myRegistrations, setQrModalData } = useFest();
  const { user } = useAuth();

  return (
    <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
      
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E60023] text-xs font-bold mb-2">
            <Ticket className="w-3.5 h-3.5" />
            FR-06 Participant Ticket Pass Desk
          </div>
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
            My Fest Registrations & Entry Passes
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Present your unique QR code at the event venue to mark attendance.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('explore')}
          className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-bold transition-all shadow"
        >
          Browse More Events
        </button>
      </div>

      
      {myRegistrations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#E60023] flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">No Registrations Yet</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            Explore the events feed and register as an individual or form a squad with your classmates!
          </p>
          <button
            onClick={() => setActiveTab('explore')}
            className="mt-4 px-6 py-2.5 bg-[#E60023] hover:bg-[#B6001B] text-white text-xs font-bold rounded-full transition-all shadow"
          >
            Explore Events Feed
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {myRegistrations.map((reg) => (
            <div
              key={reg.id}
              className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-pin hover:shadow-pin-hover transition-all flex flex-col justify-between"
            >
              <div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    reg.status === 'Attended'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {reg.status === 'Attended' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Checked In (Attended)</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        <span>Registered (Pass Active)</span>
                      </>
                    )}
                  </span>

                  <span className="text-[11px] font-mono text-zinc-400">
                    ID: {reg.id.slice(-6).toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-zinc-900 leading-snug">
                  {reg.eventTitle}
                </h3>

                
                {reg.isTeam && (
                  <div className="mt-2 inline-flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200 text-xs">
                    <Users className="w-3.5 h-3.5 text-[#E60023]" />
                    <span className="font-bold text-zinc-800">Squad: {reg.teamName}</span>
                    {reg.teamCode && (
                      <span className="font-mono text-[10px] bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded-full font-bold">
                        CODE: {reg.teamCode}
                      </span>
                    )}
                  </div>
                )}

                
                <div className="mt-4 space-y-1.5 text-xs text-zinc-600 bg-zinc-50/70 p-3.5 rounded-2xl border border-zinc-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{reg.eventDate || 'Schedule slot announced on portal'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{reg.eventVenue || 'Campus Grounds'}</span>
                  </div>
                </div>
              </div>

              
              <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                <div className="font-mono text-[11px] text-zinc-500 truncate max-w-[170px]">
                  {reg.qrToken}
                </div>
                <button
                  onClick={() => setQrModalData(reg)}
                  className="px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Open QR Pass</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

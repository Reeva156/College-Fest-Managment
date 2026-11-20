import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useFest } from '../context/FestContext';
import confetti from 'canvas-confetti';
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Scan,
  Users,
  Search,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function CheckInPage() {
  const { user, showToast } = useAuth();
  const { events } = useFest();

  const [qrTokenInput, setQrTokenInput] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [stats, setStats] = useState([]);

  const loadStats = async () => {
    try {
      const res = await api.getCheckinStats();
      setStats(res.stats || []);
    } catch (e) {
      console.error('Failed to load check-in stats:', e);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleVerify = async (tokenToVerify) => {
    const token = tokenToVerify || qrTokenInput;
    if (!token || !token.trim()) {
      showToast('Please enter or scan a QR token', 'error');
      return;
    }

    try {
      setVerifying(true);
      const res = await api.verifyQR({
        qrToken: token.trim(),
        eventId: selectedEventId || undefined
      });

      if (res.success) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
        showToast(res.message, 'success');
        setLastResult({
          type: 'success',
          message: res.message,
          reg: res.registration
        });
        setQrTokenInput('');
        loadStats();
      }
    } catch (err) {
      showToast(err.message, 'error');
      setLastResult({
        type: 'error',
        message: err.message
      });
    } finally {
      setVerifying(false);
    }
  };

  const sampleTokens = [
    { label: 'Reeva (Hackathon)', token: 'FEST-HACK-CK99-REEVA' },
    { label: 'Reeva (Photography)', token: 'FEST-PHOTO-REEVA-4482' },
  ];

  return (
    <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
      
      
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
          <QrCode className="w-3.5 h-3.5" />
          FR-08 Organizer Check-In Desk
        </div>
        <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
          Venue QR Attendance Scanner
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Scan participant digital tickets or enter registration token strings to record verified attendance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-pin">
          
          
          <div className="mb-5">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Select Your Venue Desk / Event
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:bg-white focus:outline-none"
            >
              <option value="">All Events (Universal Gate Scanner)</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} ({ev.venue})
                </option>
              ))}
            </select>
          </div>

          
          <div className="mb-6">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              QR Code Token Input
            </label>
            <div className="relative">
              <Scan className="w-5 h-5 text-zinc-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Scan with camera or type e.g. FEST-HACK-CK99-REEVA"
                value={qrTokenInput}
                onChange={(e) => setQrTokenInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleVerify(); }}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-300 font-mono text-xs font-bold uppercase focus:bg-white focus:border-zinc-900 focus:outline-none transition-all placeholder:font-sans placeholder:normal-case placeholder:font-normal"
              />
            </div>
          </div>

          
          <div className="mb-6 bg-zinc-50 p-3.5 rounded-2xl border border-zinc-100">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
              🧪 Click to Test Pre-Seeded Tokens:
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleTokens.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQrTokenInput(s.token);
                    handleVerify(s.token);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-xs font-mono font-bold text-zinc-800 shadow-xs"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleVerify()}
            disabled={verifying}
            className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-300 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{verifying ? 'Checking In...' : 'Verify Pass & Record Attendance'}</span>
          </button>

          
          {lastResult && (
            <div className={`mt-6 p-4 rounded-2xl border transition-all animate-in fade-in ${
              lastResult.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}>
              <div className="flex items-start gap-3">
                {lastResult.type === 'success' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-extrabold text-sm">
                    {lastResult.type === 'success' ? 'Attendee Verified & Admitted!' : 'Verification Failed'}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    {lastResult.message}
                  </p>

                  {lastResult.reg && (
                    <div className="mt-3 bg-white/80 p-2.5 rounded-xl border border-emerald-200 text-xs space-y-1">
                      <div>Attendee: <strong className="text-zinc-900">{lastResult.reg.participantName}</strong></div>
                      <div>Event: <strong>{lastResult.reg.eventTitle}</strong></div>
                      {lastResult.reg.teamName && (
                        <div>Squad: <strong className="text-emerald-700">{lastResult.reg.teamName}</strong></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-pin">
            <div className="flex items-center gap-2 text-zinc-900 font-extrabold text-base mb-4">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>Live Venue Check-In Rates</span>
            </div>

            <div className="space-y-4">
              {stats.map((item) => (
                <div key={item.eventId} className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-100">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-zinc-900 truncate max-w-[170px]">{item.eventTitle}</span>
                    <span className="font-mono font-bold text-emerald-700">{item.checkinRate}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-500 mb-1.5">
                    <span>{item.venue}</span>
                    <span>{item.totalAttended}/{item.totalRegistered} Checked In</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${item.checkinRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

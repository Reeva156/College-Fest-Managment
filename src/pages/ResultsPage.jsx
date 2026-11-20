import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useFest } from '../context/FestContext';
import { Trophy, Medal, Award, Plus, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ResultsPage() {
  const { user, showToast } = useAuth();
  const { events, setCertModalData } = useFest();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  const [formEventId, setFormEventId] = useState('');
  const [w1Name, setW1Name] = useState('');
  const [w1College, setW1College] = useState('');
  const [w1Prize, setW1Prize] = useState('');
  const [w2Name, setW2Name] = useState('');
  const [w2College, setW2College] = useState('');
  const [w2Prize, setW2Prize] = useState('');
  const [w3Name, setW3Name] = useState('');
  const [w3College, setW3College] = useState('');
  const [w3Prize, setW3Prize] = useState('');
  const [publishing, setPublishing] = useState(false);

  const loadResults = async () => {
    try {
      setLoading(true);
      const res = await api.getResults({ eventId: selectedEventId || undefined });
      setResults(res.results || []);
    } catch (e) {
      console.error('Failed to load results:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, [selectedEventId]);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!formEventId || !w1Name) {
      showToast('Please select event and enter 1st place winner name.', 'error');
      return;
    }

    const winners = [
      { position: '1st Place', recipientName: w1Name, college: w1College || 'Host University', prize: w1Prize || 'Gold Medal + Cash Award' }
    ];
    if (w2Name) {
      winners.push({ position: '2nd Place', recipientName: w2Name, college: w2College || 'Guest College', prize: w2Prize || 'Silver Medal' });
    }
    if (w3Name) {
      winners.push({ position: '3rd Place', recipientName: w3Name, college: w3College || 'Guest College', prize: w3Prize || 'Bronze Medal' });
    }

    try {
      setPublishing(true);
      const res = await api.publishResults({
        eventId: formEventId,
        winners
      });
      showToast(res.message, 'success');
      setPublishModalOpen(false);
      loadResults();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setPublishing(false);
    }
  };

  const getMedalIcon = (position) => {
    if (position.includes('1st')) return <Trophy className="w-6 h-6 text-amber-500" />;
    if (position.includes('2nd')) return <Medal className="w-6 h-6 text-slate-400" />;
    return <Award className="w-6 h-6 text-amber-700" />;
  };

  return (
    <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
      
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            FR-09 Hall of Champions
          </div>
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
            Official Event Results & Standings
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Celebrating the extraordinary talents and podium finishers of PULSE 2026.
          </p>
        </div>

        {(user?.role === 'organizer' || user?.role === 'admin') && (
          <button
            onClick={() => {
              if (events.length > 0) setFormEventId(events[0].id);
              setPublishModalOpen(true);
            }}
            className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-[#E60023] hover:bg-[#B6001B] text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Results</span>
          </button>
        )}
      </div>

      
      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-44 bg-zinc-200 rounded-3xl"></div>
          <div className="h-44 bg-zinc-200 rounded-3xl"></div>
        </div>
      ) : results.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200">
          <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-3 opacity-60" />
          <h3 className="font-bold text-base text-zinc-800">Results Being Evaluated</h3>
          <p className="text-xs text-zinc-500 mt-1">
            Jury scores are being compiled. Verified winners will be published here right after events conclude!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {results.map((res) => (
            <div key={res.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-pin">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-2 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    ✓ Verified Results
                  </span>
                  <h3 className="text-xl font-black text-zinc-900 mt-1.5">
                    {res.eventTitle}
                  </h3>
                </div>
                <div className="text-left sm:text-right text-xs text-zinc-400">
                  <span>Published on {new Date(res.publishedAt).toLocaleDateString()}</span>
                  <div className="text-[11px] font-medium text-zinc-500">By {res.publishedBy}</div>
                </div>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {res.winners?.map((w, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                      w.position.includes('1st')
                        ? 'bg-amber-50/70 border-amber-200 ring-1 ring-amber-300'
                        : w.position.includes('2nd')
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-orange-50/50 border-orange-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-zinc-800">
                          {w.position}
                        </span>
                        {getMedalIcon(w.position)}
                      </div>

                      <h4 className="text-lg font-black text-zinc-900 leading-snug">
                        {w.recipientName}
                      </h4>
                      <p className="text-xs text-zinc-500 font-medium mt-0.5">
                        {w.college}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-800">
                        {w.prize}
                      </span>
                      {w.participantId && (
                        <button
                          onClick={() => {
                            setCertModalData({
                              participantName: w.recipientName,
                              eventTitle: res.eventTitle,
                              position: w.position,
                              issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                              verificationCode: `PULSE-2026-WIN-${Math.floor(1000 + Math.random() * 9000)}`,
                              signatureAuthority: res.publishedBy
                            });
                          }}
                          className="text-[10px] font-bold text-[#E60023] hover:underline flex items-center"
                        >
                          View Certificate <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

      
      {publishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-floating max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black text-zinc-900 mb-1">
              Publish Event Winners
            </h3>
            <p className="text-xs text-zinc-500 mb-5">
              Enter official podium standings to release certificates and update fest leaderboard.
            </p>

            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Select Event *</label>
                <select
                  value={formEventId}
                  onChange={(e) => setFormEventId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:bg-white"
                >
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                  ))}
                </select>
              </div>

              
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-amber-900 block">🥇 1st Place (Winner) *</span>
                <input
                  type="text"
                  required
                  placeholder="Winner or Team Name"
                  value={w1Name}
                  onChange={(e) => setW1Name(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="College Name"
                    value={w1College}
                    onChange={(e) => setW1College(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Prize Cash / Trophy"
                    value={w1Prize}
                    onChange={(e) => setW1Prize(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                  />
                </div>
              </div>

              
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">🥈 2nd Place (Runner Up)</span>
                <input
                  type="text"
                  placeholder="Runner Up Name"
                  value={w2Name}
                  onChange={(e) => setW2Name(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="College Name"
                    value={w2College}
                    onChange={(e) => setW2College(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Prize Cash / Silver"
                    value={w2Prize}
                    onChange={(e) => setW2Prize(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                  />
                </div>
              </div>

              
              <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200 space-y-2">
                <span className="text-xs font-bold text-orange-900 block">🥉 3rd Place (Second Runner Up)</span>
                <input
                  type="text"
                  placeholder="3rd Place Name"
                  value={w3Name}
                  onChange={(e) => setW3Name(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="College Name"
                    value={w3College}
                    onChange={(e) => setW3College(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Prize / Bronze"
                    value={w3Prize}
                    onChange={(e) => setW3Prize(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPublishModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-zinc-100 text-xs font-bold text-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={publishing}
                  className="flex-1 py-2.5 rounded-full bg-[#E60023] hover:bg-[#B6001B] text-white text-xs font-bold shadow"
                >
                  {publishing ? 'Publishing...' : 'Publish Podium'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

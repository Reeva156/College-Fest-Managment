import React, { useState, useEffect } from 'react';
import { useFest } from '../context/FestContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { X, Calendar, MapPin, Users, Trophy, Image, Tag, Sparkles } from 'lucide-react';

export default function CreateEventModal() {
  const { createEventModalOpen, setCreateEventModalOpen, loadEvents } = useFest();
  const { showToast } = useAuth();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technical');
  const [tag, setTag] = useState('⚡ Spotlight');
  const [date, setDate] = useState('2026-10-25');
  const [time, setTime] = useState('11:00 AM - 03:00 PM');
  const [venue, setVenue] = useState('Central Amphitheatre');
  const [capacity, setCapacity] = useState(50);
  const [isTeamEvent, setIsTeamEvent] = useState(false);
  const [minTeam, setMinTeam] = useState(2);
  const [maxTeam, setMaxTeam] = useState(4);
  const [prize, setPrize] = useState('₹20,000 + Trophy & Merit Certificates');
  const [rules, setRules] = useState(
    '1. Valid College ID Card is required.\n2. Arrive at the venue 15 minutes prior to scheduled start.\n3. Judges decision will be final and binding.'
  );
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80'
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (createEventModalOpen) {
      setTitle('');
      setSubtitle('');
      setDescription('');
      setCategory('Technical');
      setTag('⚡ Spotlight');
      setDate('2026-10-25');
      setTime('11:00 AM - 03:00 PM');
      setVenue('Central Amphitheatre');
      setCapacity(50);
      setIsTeamEvent(false);
      setMinTeam(2);
      setMaxTeam(4);
      setPrize('₹20,000 + Trophy & Merit Certificates');
      setRules('1. Valid College ID Card is required.\n2. Arrive at the venue 15 minutes prior to scheduled start.\n3. Judges decision will be final and binding.');
      setCoverImage('https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80');
    }
  }, [createEventModalOpen]);

  if (!createEventModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.createEvent({
        title,
        subtitle,
        description,
        category,
        tag,
        date,
        time,
        venue,
        capacity: Number(capacity),
        isTeamEvent,
        teamSize: isTeamEvent ? { min: Number(minTeam), max: Number(maxTeam) } : { min: 1, max: 1 },
        rules: rules.split('\n').filter(Boolean),
        prize,
        coverImage
      });

      showToast(res.message || 'Event created successfully!', 'success');
      await loadEvents();
      setCreateEventModalOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const sampleImages = [
    { label: 'Tech Lab', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80' },
    { label: 'Dance Stage', url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&auto=format&fit=crop&q=80' },
    { label: 'Music Band', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80' },
    { label: 'E-Sports', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80' },
    { label: 'Art Studio', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-floating border border-zinc-100 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        
        
        <button
          onClick={() => setCreateEventModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E60023] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Admin Studio
          </div>
          <h3 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            Publish New Fest Event Pin
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Create an eye-catching Pinterest pin for upcoming college events.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. RoboWars 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:bg-white focus:outline-none"
              >
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Gaming">Gaming</option>
                <option value="Arts">Arts</option>
                <option value="Literary">Literary</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Short Punchline / Subtitle
            </label>
            <input
              type="text"
              placeholder="e.g. Feel the rhythm, ignite the stage"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Detailed description of the competition..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
            ></textarea>
          </div>

          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1">Time Slot</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1">Venue</label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-600 uppercase mb-1">Capacity</label>
              <input
                type="number"
                min="5"
                max="500"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs"
              />
            </div>
          </div>

          
          <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-900 block">Team Event Format</span>
                <span className="text-[11px] text-zinc-500">Allow students to form squads and register together</span>
              </div>
              <input
                type="checkbox"
                checked={isTeamEvent}
                onChange={(e) => setIsTeamEvent(e.target.checked)}
                className="w-5 h-5 accent-[#E60023] rounded cursor-pointer"
              />
            </div>

            {isTeamEvent && (
              <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-zinc-200">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Min Team Members</label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={minTeam}
                    onChange={(e) => setMinTeam(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Max Team Members</label>
                  <input
                    type="number"
                    min="2"
                    max="20"
                    value={maxTeam}
                    onChange={(e) => setMaxTeam(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Cover Image URL (Pinterest Pin Visual)
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none mb-2"
            />
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] text-zinc-400 font-medium self-center">Presets:</span>
              {sampleImages.map((s, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCoverImage(s.url)}
                  className="px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[10px] font-bold text-zinc-700"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Rules & Guidelines (One per line)
            </label>
            <textarea
              rows={3}
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-full bg-[#E60023] hover:bg-[#B6001B] disabled:bg-zinc-300 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
          >
            {submitting ? 'Publishing Pin...' : 'Create & Publish Pin'}
          </button>
        </form>

      </div>
    </div>
  );
}

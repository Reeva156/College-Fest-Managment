import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, setSelectedCategory } from '../store/eventsSlice';
import EventCard from '../components/EventCard';
import { Sparkles, Bookmark, Compass, Flame, Search } from 'lucide-react';

export default function ExplorePage({ onOpenAdminSetup }) {
  const dispatch = useDispatch();
  const { items: events, loading, selectedCategory, searchQuery } = useSelector((state) => state.events);
  const { savedPinIds } = useSelector((state) => state.pins);
  const { hasAdmin } = useSelector((state) => state.auth);

  const [activeMoodboardOnly, setActiveMoodboardOnly] = useState(false);

  const categories = ['All', 'Technical', 'Cultural', 'Gaming', 'Arts', 'Literary'];

  useEffect(() => {
    dispatch(fetchEvents({ category: selectedCategory !== 'All' ? selectedCategory : undefined, search: searchQuery || undefined }));
  }, [dispatch, selectedCategory, searchQuery]);

  const displayedEvents = events.filter((ev) => {
    if (activeMoodboardOnly) {
      return savedPinIds.includes(ev.id);
    }
    return true;
  });

  return (
    <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-6">
      
      
      {!hasAdmin && (
        <div className="mb-6 p-4 rounded-3xl bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 border border-red-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👑</span>
            <div>
              <h4 className="font-bold text-sm text-zinc-900">Admin Account Not Configured Yet</h4>
              <p className="text-xs text-zinc-600">
                You are in control. Set up your own custom Admin credentials to manage this college fest.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAdminSetup}
            className="self-start sm:self-auto px-5 py-2 rounded-full bg-[#E60023] hover:bg-[#AD081B] text-white text-xs font-bold shadow-xs transition-all whitespace-nowrap"
          >
            Configure Admin Now
          </button>
        </div>
      )}

      
      <div className="mb-8 rounded-4xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 p-6 sm:p-10 text-white relative overflow-hidden shadow-pin">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#E60023]/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-semibold backdrop-blur-md mb-4 border border-white/10">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>AURA 2026 • Oct 24th - 26th</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Discover, Pin & Compete in Campus Glory.
          </h1>

          <p className="mt-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
            Browse high-energy competitions, form your team, get digital QR entry passes, and claim certificates — with Pinterest-style ease.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActiveMoodboardOnly(false);
                dispatch(setSelectedCategory('All'));
              }}
              className="px-5 py-2.5 rounded-full bg-[#E60023] hover:bg-[#AD081B] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All Events</span>
            </button>

            <button
              onClick={() => setActiveMoodboardOnly(!activeMoodboardOnly)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 ${
                activeMoodboardOnly
                  ? 'bg-white text-zinc-900 border-white shadow-md'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${activeMoodboardOnly ? 'fill-zinc-900' : ''}`} />
              <span>Saved Pins ({savedPinIds.length})</span>
            </button>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                dispatch(setSelectedCategory(cat));
                setActiveMoodboardOnly(false);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat && !activeMoodboardOnly
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/70'
              }`}
            >
              {cat === 'All' ? '✨ All Disciplines' : cat}
            </button>
          ))}
        </div>

        
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
          <span>Showing {displayedEvents.length} Pins</span>
          {searchQuery && (
            <span className="text-[#E60023]">matching "{searchQuery}"</span>
          )}
        </div>
      </div>

      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-zinc-200 rounded-3xl h-72"></div>
          ))}
        </div>
      ) : displayedEvents.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200 shadow-sm p-8">
          <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-800">No event pins found</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            {activeMoodboardOnly
              ? "You haven't saved any event pins to your moodboard yet. Click 'Save' on any event card!"
              : "Try adjusting your search query or category filters."}
          </p>
          <button
            onClick={() => {
              setActiveMoodboardOnly(false);
              dispatch(setSelectedCategory('All'));
            }}
            className="mt-4 px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-full"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="masonry-grid">
          {displayedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

    </div>
  );
}

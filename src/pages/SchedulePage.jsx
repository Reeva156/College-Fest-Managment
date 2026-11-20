import React, { useState } from 'react';
import { useFest } from '../context/FestContext';
import { Calendar, Clock, MapPin, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function SchedulePage() {
  const { events, setActiveEventModal } = useFest();
  const [selectedDay, setSelectedDay] = useState('2026-10-24');

  const days = [
    { date: '2026-10-24', label: 'Day 1', subtitle: 'Inauguration & Tech Blitz' },
    { date: '2026-10-25', label: 'Day 2', subtitle: 'Robotics, Arts & Dance' },
    { date: '2026-10-26', label: 'Day 3', subtitle: 'Battle of Bands & Vogue' },
  ];

  const dayEvents = events.filter(e => e.date === selectedDay);

  return (
    <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
      
      
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E60023] text-xs font-bold mb-2">
          <Calendar className="w-3.5 h-3.5" />
          FR-07 Official Timeline
        </div>
        <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
          Fest Itinerary & Venue Schedule
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Plan your fest experience seamlessly. Arrive on time for participant check-in.
        </p>
      </div>

      
      <div className="grid grid-cols-3 gap-3 mb-8">
        {days.map((d) => (
          <button
            key={d.date}
            onClick={() => setSelectedDay(d.date)}
            className={`p-4 rounded-3xl text-center transition-all border ${
              selectedDay === d.date
                ? 'bg-zinc-900 text-white border-zinc-900 shadow-md'
                : 'bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <span className={`text-[11px] font-bold uppercase tracking-wider block ${
              selectedDay === d.date ? 'text-rose-400' : 'text-zinc-400'
            }`}>
              {d.label}
            </span>
            <span className="text-base sm:text-lg font-black block mt-0.5">
              {d.date.slice(5)}
            </span>
            <span className={`text-[11px] truncate block mt-0.5 ${
              selectedDay === d.date ? 'text-zinc-300' : 'text-zinc-500'
            }`}>
              {d.subtitle}
            </span>
          </button>
        ))}
      </div>

      
      {dayEvents.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 text-zinc-500 text-sm">
          No scheduled events listed for this date yet. Check back soon!
        </div>
      ) : (
        <div className="space-y-4">
          {dayEvents.map((ev, index) => (
            <div
              key={ev.id}
              onClick={() => setActiveEventModal(ev)}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/80 shadow-pin hover:shadow-pin-hover transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0">
                  <img
                    src={ev.coverImage}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-700">
                      {ev.category}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600">
                      • {ev.registrationStatus}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-zinc-900 group-hover:text-[#E60023] transition-colors">
                    {ev.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-500">
                    <span className="flex items-center gap-1 font-semibold text-zinc-700">
                      <Clock className="w-3.5 h-3.5 text-[#E60023]" />
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {ev.venue}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-zinc-400" />
                      {ev.isTeamEvent ? `Squad (${ev.teamSize?.min}-${ev.teamSize?.max})` : 'Solo'}
                    </span>
                  </div>
                </div>
              </div>

              
              <div className="sm:self-center flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-2">
                  {ev.prize?.split('+')[0] || 'Trophies & Certificates'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 group-hover:text-[#E60023] transition-colors">
                  View Pin <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

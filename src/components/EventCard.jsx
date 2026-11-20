import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSavePin } from '../store/pinsSlice';
import { useFest } from '../context/FestContext';
import { Bookmark, Calendar, MapPin, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function EventCard({ event }) {
  const dispatch = useDispatch();
  const { savedPinIds } = useSelector((state) => state.pins);
  const { setActiveEventModal } = useFest();
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = savedPinIds.includes(event.id);

  const categoryColors = {
    Technical: { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
    Cultural:  { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE' },
    Gaming:    { bg: '#ECFDF5', color: '#065F46', border: '#A7F3D0' },
    Arts:      { bg: '#FFFBEB', color: '#92400E', border: '#FDE68A' },
    Literary:  { bg: '#FFF1F2', color: '#9F1239', border: '#FECDD3' },
  };

  const catStyle = categoryColors[event.category] || { bg: '#F4F4F5', color: '#3F3F46', border: '#E4E4E7' };
  const capacityPct = Math.min(100, Math.round(((event.registeredCount || 0) / (event.capacity || 50)) * 100));

  const handleSave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleSavePin(event.id));
  };

  return (
    <div
      className="masonry-item group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setActiveEventModal(event)}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-pin hover:shadow-pin-hover transition-all duration-300 border border-zinc-100 flex flex-col">

        {/* Fixed 4:3 aspect ratio image — uniform across all cards */}
        <div className="relative w-full overflow-hidden bg-zinc-100" style={{ aspectRatio: '4/3' }}>
          <img
            src={event.coverImage}
            alt={event.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />

          {/* Category tag top-left */}
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
            <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.95)', color: '#111', boxShadow: '0 1px 6px rgba(0,0,0,0.12)' }}>
              {event.tag || event.category}
            </span>
          </div>

          {/* Save button top-right */}
          <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 3 }}>
            <button
              onClick={handleSave}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '7px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                background: isSaved ? '#111' : '#E60023',
                color: 'white',
                transition: 'background 0.2s, transform 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill={isSaved ? 'white' : 'none'} stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          {/* Hover overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
            opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
              <span style={{ fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Users style={{ width: 13, height: 13 }} />
                {event.isTeamEvent ? `Team (${event.teamSize?.min}-${event.teamSize?.max})` : 'Individual'}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 999, background: 'white', color: '#111', display: 'flex', alignItems: 'center', gap: 4 }}>
                View <ArrowUpRight style={{ width: 12, height: 12 }} />
              </span>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, border: `1px solid ${catStyle.border}`, background: catStyle.bg, color: catStyle.color }}>
                {event.category}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, color: event.registrationStatus === 'Open' ? '#059669' : '#D97706' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: event.registrationStatus === 'Open' ? '#10B981' : '#F59E0B', display: 'inline-block', animation: event.registrationStatus === 'Open' ? 'ping 1s infinite' : 'none' }} />
                {event.registrationStatus}
              </span>
            </div>

            <h3 style={{ fontWeight: 700, fontSize: 14, color: '#111', margin: '0 0 4px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
              {event.title}
            </h3>
            <p style={{ fontSize: 11, color: '#777', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {event.subtitle || event.description}
            </p>
          </div>

          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: '#888', marginBottom: 6 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontWeight: 500, color: '#555', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <MapPin style={{ width: 11, height: 11, flexShrink: 0 }} />
                {event.venue}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600, color: '#444', flexShrink: 0 }}>
                <Calendar style={{ width: 11, height: 11 }} />
                {event.date?.slice(5)}
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#aaa', marginBottom: 3, fontWeight: 500 }}>
                <span>Seats filled</span>
                <span style={{ fontWeight: 600, color: '#555' }}>{event.registeredCount || 0}/{event.capacity || 50}</span>
              </div>
              <div style={{ height: 5, background: '#eee', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 999, background: capacityPct >= 90 ? '#E60023' : '#111', width: `${capacityPct}%`, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

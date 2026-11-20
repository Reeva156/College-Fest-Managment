import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const FestContext = createContext();

export function FestProvider({ children }) {
  const { showToast, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [savedPinIds, setSavedPinIds] = useState(() => {
    try {
      const saved = localStorage.getItem('pulse_saved_pins');
      return saved ? JSON.parse(saved) : ['ev_hack_01', 'ev_dance_02'];
    } catch {
      return [];
    }
  });

  const [activeEventModal, setActiveEventModal] = useState(null);
  const [teamModalEvent, setTeamModalEvent] = useState(null);
  const [qrModalData, setQrModalData] = useState(null);
  const [certModalData, setCertModalData] = useState(null);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [myRegistrations, setMyRegistrations] = useState([]);

  const loadEvents = async () => {
    try {
      setLoadingEvents(true);
      const res = await api.getEvents({
        category: selectedCategory,
        search: searchQuery,
        status: selectedStatus
      });
      setEvents(res.events || []);
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoadingEvents(false);
    }
  };

  const loadMyRegistrations = async () => {
    if (!user) return;
    try {
      const res = await api.getMyRegistrations();
      setMyRegistrations(res.registrations || []);
    } catch (err) {
      console.error('Failed to load my registrations:', err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [selectedCategory, selectedStatus]);

  useEffect(() => {
    if (user) {
      loadMyRegistrations();
    }
  }, [user]);

  const toggleSavePin = (eventId) => {
    setSavedPinIds((prev) => {
      let updated;
      if (prev.includes(eventId)) {
        updated = prev.filter(id => id !== eventId);
        showToast('Removed from your Saved Board', 'info');
      } else {
        updated = [...prev, eventId];
        showToast('Saved to your Fest Moodboard! 📌', 'success');
      }
      localStorage.setItem('pulse_saved_pins', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FestContext.Provider value={{
      events,
      loadingEvents,
      loadEvents,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedStatus,
      setSelectedStatus,
      savedPinIds,
      toggleSavePin,
      myRegistrations,
      loadMyRegistrations,
      activeEventModal,
      setActiveEventModal,
      teamModalEvent,
      setTeamModalEvent,
      qrModalData,
      setQrModalData,
      certModalData,
      setCertModalData,
      createEventModalOpen,
      setCreateEventModalOpen,
      authModalOpen,
      setAuthModalOpen,
    }}>
      {children}
    </FestContext.Provider>
  );
}

export function useFest() {
  return useContext(FestContext);
}

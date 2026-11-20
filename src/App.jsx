import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkAdminSetup, fetchMe } from "./store/authSlice";
import { AuthProvider } from "./context/AuthContext";
import { FestProvider } from "./context/FestContext";

import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import EventModal from "./components/EventModal";
import TeamModal from "./components/TeamModal";
import QRPassModal from "./components/QRPassModal";
import CertificateModal from "./components/CertificateModal";
import CreateEventModal from "./components/CreateEventModal";
import LoginModal from "./components/LoginModal";
import AdminSetupModal from "./components/AdminSetupModal";
import ProfileSettingsModal from "./components/ProfileSettingsModal";
import Logo from "./components/Logo";

import ExplorePage from "./pages/ExplorePage";
import SchedulePage from "./pages/SchedulePage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import CheckInPage from "./pages/CheckInPage";
import ResultsPage from "./pages/ResultsPage";
import CertificatesPage from "./pages/CertificatesPage";
import AdminDashboard from "./pages/AdminDashboard";
import ContactPage from "./pages/ContactPage";

function MainLayout() {
  const dispatch = useDispatch();
  const { user, hasAdmin, checkingSetup } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("explore");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [adminSetupOpen, setAdminSetupOpen] = useState(false);
  const [profileSettingsOpen, setProfileSettingsOpen] = useState(false);

  useEffect(() => {
    dispatch(checkAdminSetup());
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (!checkingSetup && !hasAdmin) {
      setAdminSetupOpen(true);
    }
  }, [checkingSetup, hasAdmin]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111111] flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenAdminSetup={() => setAdminSetupOpen(true)}
        onOpenProfileSettings={() => setProfileSettingsOpen(true)}
      />

      <main className="flex-1 pb-16">
        {activeTab === "explore" && (
          <ExplorePage onOpenAdminSetup={() => setAdminSetupOpen(true)} />
        )}
        {activeTab === "schedule" && <SchedulePage />}
        {activeTab === "registrations" && (
          <MyRegistrationsPage setActiveTab={setActiveTab} />
        )}
        {activeTab === "checkin" && <CheckInPage />}
        {activeTab === "results" && <ResultsPage />}
        {activeTab === "certificates" && <CertificatesPage />}
        {activeTab === "admin" && <AdminDashboard />}
        {activeTab === "contact" && <ContactPage />}
      </main>

      <EventModal />
      <TeamModal />
      <QRPassModal />
      <CertificateModal />
      <CreateEventModal />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onOpenAdminSetup={() => setAdminSetupOpen(true)}
      />

      <AdminSetupModal
        isOpen={adminSetupOpen}
        onClose={() => setAdminSetupOpen(false)}
      />

      <ProfileSettingsModal
        isOpen={profileSettingsOpen}
        onClose={() => setProfileSettingsOpen(false)}
      />

      <Toast />

      <footer className="bg-white border-t border-[#EFECE6] py-8 text-zinc-500 text-xs">
        <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Logo size="sm" showTagline={false} />
          </div>

          <div className="flex items-center gap-2 text-zinc-600 font-medium">
            <span>Powered by</span>
            <span className="font-bold text-zinc-900">Reeva Solani</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("explore")}
              className="hover:text-zinc-900 hover:underline"
            >
              Explore
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab("schedule")}
              className="hover:text-zinc-900 hover:underline"
            >
              Schedule
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab("results")}
              className="hover:text-zinc-900 hover:underline"
            >
              Winners
            </button>
            {!hasAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={() => setAdminSetupOpen(true)}
                  className="text-[#E60023] font-bold hover:underline"
                >
                  Setup Admin
                </button>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FestProvider>
        <MainLayout />
      </FestProvider>
    </AuthProvider>
  );
}

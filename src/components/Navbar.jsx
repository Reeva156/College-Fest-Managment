import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { setSearchQuery } from '../store/eventsSlice';
import Logo from './Logo';
import {
  Search,
  Bookmark,
  Calendar,
  Trophy,
  QrCode,
  ShieldCheck,
  Ticket,
  Award,
  LogOut,
  Compass,
  Menu,
  X,
  Settings,
  User
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenLogin, onOpenAdminSetup, onOpenProfileSettings }) {
  const dispatch = useDispatch();
  const { user, hasAdmin } = useSelector((state) => state.auth);
  const { searchQuery } = useSelector((state) => state.events);
  const { savedPinIds } = useSelector((state) => state.pins);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EFECE6] transition-all">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-10">
        
        
        <div className="h-20 flex items-center justify-between gap-3 sm:gap-6">
          
          
          <div className="flex items-center flex-shrink-0" onClick={() => setActiveTab('explore')}>
            <Logo />
          </div>

          
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#F3EFEA] p-1.5 rounded-full border border-[#E9E4DC]">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'explore'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-900 hover:bg-white/70'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore</span>
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'schedule'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-900 hover:bg-white/70'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule</span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'results'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-900 hover:bg-white/70'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Winners</span>
            </button>

            
            {user?.role === 'participant' && (
              <>
                <button
                  onClick={() => setActiveTab('registrations')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'registrations'
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'text-zinc-700 hover:text-zinc-900 hover:bg-white/70'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5 text-rose-500" />
                  <span>My Passes</span>
                </button>
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'certificates'
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'text-zinc-700 hover:text-zinc-900 hover:bg-white/70'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Certificates</span>
                </button>
              </>
            )}

            
            {(user?.role === 'organizer' || user?.role === 'admin') && (
              <button
                onClick={() => setActiveTab('checkin')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'checkin'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-zinc-700 hover:text-zinc-900 hover:bg-white/70'
                }`}
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>QR Scanner</span>
              </button>
            )}

            
            {user?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-zinc-700 hover:text-zinc-900 hover:bg-white/70'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
                <span>Admin Suite</span>
              </button>
            )}
          </nav>

          
          <div className="flex-1 max-w-sm lg:max-w-md mx-2 relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search pins, dance, hackathons..."
                value={searchQuery}
                onChange={(e) => {
                  dispatch(setSearchQuery(e.target.value));
                  if (activeTab !== 'explore') setActiveTab('explore');
                }}
                className="w-full pl-10 pr-9 py-2.5 bg-white hover:bg-zinc-50 focus:bg-white text-zinc-900 text-xs font-medium rounded-full border border-zinc-200 focus:border-zinc-400 focus:shadow-xs focus:outline-none transition-all placeholder:text-zinc-400"
              />
              {searchQuery && (
                <button
                  onClick={() => dispatch(setSearchQuery(''))}
                  className="absolute right-3 p-1 rounded-full text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            
            <button
              onClick={() => setActiveTab('explore')}
              title="Saved Pins Moodboard"
              className="p-2.5 rounded-full bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-[#E60023] relative transition-colors shadow-xs"
            >
              <Bookmark className="w-4 h-4" />
              {savedPinIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E60023] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {savedPinIds.length}
                </span>
              )}
            </button>

            
            {!hasAdmin && (
              <button
                onClick={onOpenAdminSetup}
                className="px-4 py-2.5 rounded-full bg-[#E60023] hover:bg-[#AD081B] text-white text-xs font-bold shadow-sm hover:shadow transition-all flex items-center gap-1.5 animate-pulse"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>👑 Set Up Admin</span>
              </button>
            )}

            
            {user ? (
              <div className="flex items-center gap-2">
                
                <button
                  onClick={onOpenProfileSettings}
                  title="Profile Settings"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white hover:bg-zinc-50 border border-zinc-200 shadow-xs hover:border-zinc-300 transition-all text-left group"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-zinc-200"
                  />
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-zinc-900 leading-tight max-w-[110px] truncate group-hover:text-[#E60023] transition-colors">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-zinc-400 capitalize -mt-0.5">
                      {user.role}
                    </div>
                  </div>
                  <Settings className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 transition-colors hidden sm:block" />
                </button>

                <button
                  onClick={() => dispatch(logout())}
                  title="Sign Out"
                  className="p-2.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-rose-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-all"
              >
                Log In
              </button>
            )}

            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-zinc-100 text-zinc-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

      </div>

      
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-5 bg-white border-b border-zinc-200 space-y-1.5 shadow-md">
          <button
            onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              activeTab === 'explore' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Explore Events</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('schedule'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              activeTab === 'schedule' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Fest Schedule</span>
          </button>

          <button
            onClick={() => { setActiveTab('results'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              activeTab === 'results' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Winners & Standings</span>
          </button>

          {user && (
            <button
              onClick={() => { onOpenProfileSettings(); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 text-zinc-700 hover:bg-zinc-50"
            >
              <Settings className="w-4 h-4 text-[#E60023]" />
              <span>Profile Settings</span>
            </button>
          )}

          {user?.role === 'participant' && (
            <>
              <button
                onClick={() => { setActiveTab('registrations'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  activeTab === 'registrations' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <Ticket className="w-4 h-4 text-rose-500" />
                <span>My Tickets</span>
              </button>
              <button
                onClick={() => { setActiveTab('certificates'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  activeTab === 'certificates' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>My Certificates</span>
              </button>
            </>
          )}

          {(user?.role === 'organizer' || user?.role === 'admin') && (
            <button
              onClick={() => { setActiveTab('checkin'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                activeTab === 'checkin' ? 'bg-emerald-700 text-white' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>QR Scanner Desk</span>
            </button>
          )}

          {user?.role === 'admin' && (
            <button
              onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                activeTab === 'admin' ? 'bg-indigo-700 text-white' : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Admin Suite</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}

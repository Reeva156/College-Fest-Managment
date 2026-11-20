import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useFest } from '../context/FestContext';
import {
  ShieldCheck,
  Plus,
  Users,
  Calendar,
  Ticket,
  Activity,
  Trash2,
  Mail,
  GraduationCap,
  KeyRound,
  Lock,
  UserPlus,
  CheckCircle2,
  X,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, showToast } = useAuth();
  const { events, loadEvents, setCreateEventModalOpen } = useFest();

  const [activeTab, setActiveTab] = useState('users');
  const [stats, setStats] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [userList, setUserList] = useState([]);
  const [filterEventId, setFilterEventId] = useState('All');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('participant');
  const [newUserDepartment, setNewUserDepartment] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, regsRes, inqRes, usersRes] = await Promise.all([
        api.getStatsOverview(),
        api.getAllRegistrations({ eventId: filterEventId }),
        api.getContacts(),
        api.getUsers().catch(() => ({ users: [] }))
      ]);
      setStats(statsRes.metrics);
      setRegistrations(regsRes.registrations || []);
      setInquiries(inqRes.contacts || []);
      setUserList(usersRes.users || []);
    } catch (e) {
      console.error('Failed to load admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [filterEventId]);

  const handleDeleteEvent = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.deleteEvent(id);
      showToast(`Event "${title}" removed.`, 'info');
      await loadEvents();
      loadDashboardData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserPassword) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    try {
      setCreatingUser(true);
      const res = await api.createUser({
        name: newUserName.trim(),
        email: newUserEmail.trim(),
        password: newUserPassword,
        role: newUserRole,
        department: newUserDepartment.trim() || (newUserRole === 'organizer' ? 'Teacher / Coordinator' : 'BCA 2nd Year')
      });

      showToast(res.message, 'success');
      setCreateUserModalOpen(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserDepartment('');
      loadDashboardData();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Delete account credentials for "${name}"?`)) return;
    try {
      const res = await api.deleteUser(id);
      showToast(res.message, 'info');
      loadDashboardData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const displayedUsers = userList.filter((u) => {
    if (userRoleFilter === 'All') return true;
    return u.role === userRoleFilter;
  });

  return (
    <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
      
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Exclusive Authority Desk
          </div>
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
            Fest Administration & Credentials Control
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Logged in as <strong>{user?.name}</strong> • Authority: Faculty Convener
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setCreateUserModalOpen(true)}
            className="px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-bold shadow flex items-center gap-2 transition-all"
          >
            <UserPlus className="w-4 h-4 text-emerald-400" />
            <span>+ Create Student / Teacher Login</span>
          </button>

          <button
            onClick={() => setCreateEventModalOpen(true)}
            className="px-4 py-2.5 rounded-full bg-[#E60023] hover:bg-[#B6001B] text-white text-xs font-bold shadow flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Event Pin</span>
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-pin">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total User Accounts</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900">
            {userList.length}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            {userList.filter(u => u.role === 'participant').length} Students • {userList.filter(u => u.role === 'organizer').length} Teachers
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-pin">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Fest Events</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900">
            {events.length}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            Pins published on board
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-pin">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Registrations</span>
            <Ticket className="w-4 h-4 text-[#E60023]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900">
            {registrations.length}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            Solo & Squad Passes
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-pin">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Check-in Attendance</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            {stats?.checkinRate || 0}%
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            Verified with QR pass
          </div>
        </div>
      </div>

      
      <div className="flex flex-wrap bg-zinc-100 p-1.5 rounded-2xl mb-6 max-w-xl">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'users' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
          }`}
        >
          🔐 User Logins ({userList.length})
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'events' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
          }`}
        >
          Events ({events.length})
        </button>
        <button
          onClick={() => setActiveTab('registrations')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'registrations' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
          }`}
        >
          Registrations ({registrations.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'inquiries' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600'
          }`}
        >
          Help Desk ({inquiries.length})
        </button>
      </div>

      
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-zinc-900 text-white rounded-3xl p-6 sm:p-7 shadow-pin relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-[11px] font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Administrative Privilege
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Student & Teacher Login Management
              </h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                As the College Fest Admin, you hold exclusive authority to generate student credentials and teacher coordinator logins.
                Users created here can instantly log into the fest portal.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-pin">
            <div className="p-4 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-700 uppercase">Registered Accounts</span>
                <span className="text-[11px] bg-zinc-100 text-zinc-600 font-mono font-bold px-2 py-0.5 rounded-full">
                  {displayedUsers.length} Users
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-500 font-semibold">Filter:</span>
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold focus:bg-white"
                >
                  <option value="All">All Roles</option>
                  <option value="participant">Students Only</option>
                  <option value="organizer">Teachers & Coordinators Only</option>
                  <option value="admin">Admins Only</option>
                </select>

                <button
                  onClick={() => setCreateUserModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#E60023] hover:bg-[#B6001B] text-white text-xs font-bold shadow-xs flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ New Login</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Department / Class</th>
                    <th className="p-4">Created By</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {displayedUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="p-4 font-bold text-zinc-900 flex items-center gap-3">
                        <img
                          src={u.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${u.name}`}
                          alt=""
                          className="w-9 h-9 rounded-full ring-1 ring-zinc-200 object-cover"
                        />
                        <div>
                          <div>{u.name}</div>
                          <div className="text-[10px] text-zinc-400 font-mono">{u.id}</div>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-zinc-700">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          u.role === 'admin'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : u.role === 'organizer'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {u.role === 'admin' ? '🛡️ Admin' : u.role === 'organizer' ? '👩‍🏫 Teacher/Org' : '🎓 Student'}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-600">{u.department || 'General'}</td>
                      <td className="p-4 text-zinc-500 text-[11px]">{u.createdBy || 'System Seed'}</td>
                      <td className="p-4 text-right">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                            title="Remove User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      
      {activeTab === 'events' && (
        <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-pin">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Event</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Registered</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="p-4 font-bold text-zinc-900 flex items-center gap-3">
                      <img src={ev.coverImage} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div>{ev.title}</div>
                        <div className="text-[10px] text-zinc-400 font-normal">{ev.isTeamEvent ? 'Team Squad' : 'Solo'}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-700">
                        {ev.category}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-600">{ev.date} • {ev.time}</td>
                    <td className="p-4 text-zinc-600">{ev.venue}</td>
                    <td className="p-4 font-mono font-bold text-zinc-900">{ev.registeredCount || 0}/{ev.capacity}</td>
                    <td className="p-4">
                      <span className="text-emerald-700 font-bold text-[11px]">{ev.registrationStatus}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteEvent(ev.id, ev.title)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      
      {activeTab === 'registrations' && (
        <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-pin">
          <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-700 uppercase">Participant Entry Ledger</span>
            <select
              value={filterEventId}
              onChange={(e) => setFilterEventId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold"
            >
              <option value="All">All Events Filter</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Participant</th>
                  <th className="p-4">Event</th>
                  <th className="p-4">Type / Squad</th>
                  <th className="p-4">QR Token</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Registered Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-zinc-900">{reg.participantName}</div>
                      <div className="text-[10px] text-zinc-400">{reg.participantEmail}</div>
                    </td>
                    <td className="p-4 font-semibold text-zinc-800">{reg.eventTitle}</td>
                    <td className="p-4">
                      {reg.isTeam ? (
                        <span className="px-2 py-0.5 rounded-full bg-red-50 text-[#E60023] font-bold text-[10px]">
                          {reg.teamName} ({reg.teamCode})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-bold text-[10px]">
                          Individual Solo
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-mono text-[11px] font-bold text-zinc-800">{reg.qrToken}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        reg.status === 'Attended' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-500 text-[11px]">
                      {new Date(reg.registeredAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-pin">
          <h3 className="font-bold text-base text-zinc-900 mb-4">Student Queries & Support Desk</h3>
          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div key={inq.id} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-bold text-zinc-900">{inq.name} ({inq.email})</div>
                  <span className="text-[10px] text-zinc-400">{new Date(inq.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="font-semibold text-zinc-800 mb-1">Subject: {inq.subject}</div>
                <p className="text-zinc-600 leading-relaxed">{inq.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      
      {createUserModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-floating border border-zinc-100 p-6 sm:p-8 relative">
            <button
              onClick={() => setCreateUserModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Authority Only
              </div>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
                Issue Student or Teacher Login
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Create verified credentials. The user will be able to log into the respective portal.
              </p>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Account Type / Role *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewUserRole('participant')}
                    className={`py-2.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      newUserRole === 'participant'
                        ? 'bg-rose-50 border-[#E60023] text-[#E60023] shadow-xs'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Student Login</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewUserRole('organizer')}
                    className={`py-2.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      newUserRole === 'organizer'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-700 shadow-xs'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Teacher / Coordinator</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder={newUserRole === 'participant' ? 'e.g. Ananya Sharma' : 'e.g. Dr. K. Ramanathan'}
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  College Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@fest.edu"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Initial Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Department / Class / Designation
                </label>
                <input
                  type="text"
                  placeholder={newUserRole === 'participant' ? 'e.g. BCA 2nd Year, Section A' : 'e.g. Faculty Coordinator - Robotics'}
                  value={newUserDepartment}
                  onChange={(e) => setNewUserDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-[11px] text-indigo-900 leading-relaxed">
                🛡️ <strong>Admin Authority Stamp:</strong> This user will immediately receive access to their {newUserRole === 'organizer' ? 'Teacher Organizer Desk' : 'Student Portal'} with these credentials.
              </div>

              <button
                type="submit"
                disabled={creatingUser}
                className="w-full py-3.5 rounded-full bg-zinc-900 hover:bg-black disabled:bg-zinc-300 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-emerald-400" />
                <span>{creatingUser ? 'Creating Credentials...' : `Issue ${newUserRole === 'organizer' ? 'Teacher' : 'Student'} Login`}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

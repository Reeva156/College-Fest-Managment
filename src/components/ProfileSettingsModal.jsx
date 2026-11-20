import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, changeUserPassword } from '../store/authSlice';
import {
  User,
  Mail,
  Building2,
  Lock,
  Phone,
  FileText,
  Camera,
  CheckCircle2,
  AlertCircle,
  X,
  ShieldCheck,
  Save,
  KeyRound,
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Sparkles
} from 'lucide-react';

export default function ProfileSettingsModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('general');
  

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [imageError, setImageError] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setDepartment(user.department || '');
      setAvatar(user.avatar || '');
      setBio(user.bio || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const avatarPresets = [
    { label: 'Avatar 1', url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.name || 'Nova')}` },
    { label: 'Creative', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { label: 'Coder', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { label: 'Student', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    { label: 'Tech Lead', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setImageError('Image size exceeds 15MB. Please choose a smaller photo.');
      return;
    }

    setImageError('');
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {

        const canvas = document.createElement('canvas');
        const MAX_DIM = 480;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setAvatar(dataUrl);
      };
      img.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatar(`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name || user.name || 'Nova')}`);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);
    try {
      const res = await dispatch(updateUserProfile({ name, department, avatar, bio, phone }));
      if (res.error) {
        setProfileMsg({ type: 'error', text: res.payload || 'Failed to update profile' });
      } else {
        setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    setSavingPassword(true);
    setPasswordMsg(null);
    try {
      const res = await dispatch(changeUserPassword({ currentPassword, newPassword }));
      if (res.error) {
        setPasswordMsg({ type: 'error', text: res.payload || 'Failed to change password' });
      } else {
        setPasswordMsg({ type: 'success', text: 'Password changed successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-floating border border-zinc-100 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <img
              src={avatar || user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
              alt={user.name}
              className="w-14 h-14 rounded-full ring-2 ring-zinc-200 object-cover shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-zinc-900 tracking-tight">{user.name}</h3>
              <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-red-50 text-[#E60023] border border-red-200">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-zinc-500">{user.email}</p>
          </div>
        </div>

        
        <div className="flex bg-[#F5F2EB] p-1 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'general' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Details</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'security' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Password & Security</span>
          </button>
        </div>

        
        {activeTab === 'general' && (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {profileMsg && (
              <div className={`p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
                profileMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {profileMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{profileMsg.text}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                Email Address (Account ID)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                Department / Class / Faculty Title
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. BCA 2nd Year or Dept Coordinator"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:border-zinc-800 focus:outline-none"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-2">
                Profile Photo (From Gallery / Device)
              </label>

              
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="p-4 rounded-3xl bg-[#FAF8F5] border border-zinc-200 flex flex-col sm:flex-row items-center gap-4">
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer flex-shrink-0"
                  title="Click to choose photo from gallery"
                >
                  <img
                    src={avatar || user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
                    alt="Profile Avatar"
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md group-hover:opacity-85 transition-opacity"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 p-1.5 bg-[#E60023] text-white rounded-full shadow-sm">
                    <Camera className="w-3.5 h-3.5" />
                  </span>
                </div>

                
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 active:scale-95"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Choose from Gallery</span>
                    </button>

                    {avatar && avatar !== user.avatar && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="px-3 py-2 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-xs font-bold transition-all inline-flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-tight">
                    Upload any photo directly from your device gallery or files (JPG, PNG, WebP).
                  </p>
                  {imageError && (
                    <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {imageError}
                    </p>
                  )}
                </div>
              </div>

              
              <div className="mt-2.5 flex items-center gap-2 px-1">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Quick Styles:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {avatarPresets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      title={p.label}
                      onClick={() => setAvatar(p.url)}
                      className="p-0.5 rounded-full border-2 border-transparent hover:border-[#E60023] hover:scale-105 transition-all"
                    >
                      <img src={p.url} alt={p.label} className="w-6 h-6 rounded-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                Bio / Status
              </label>
              <textarea
                rows={2}
                placeholder="Share a short bio or squad motto..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="w-full py-3 rounded-full bg-[#E60023] hover:bg-[#AD081B] disabled:bg-zinc-300 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{savingProfile ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        )}

        
        {activeTab === 'security' && (
          <form onSubmit={handleChangePassword} className="space-y-4">
            {passwordMsg && (
              <div className={`p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
                passwordMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {passwordMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                Current Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                Confirm New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-xs font-medium focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="w-full py-3 rounded-full bg-zinc-900 hover:bg-black disabled:bg-zinc-300 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{savingPassword ? 'Updating...' : 'Update Password'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

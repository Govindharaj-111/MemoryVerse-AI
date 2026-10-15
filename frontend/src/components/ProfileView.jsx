import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Globe, ShieldCheck, Sparkles, Plus, X, Share2, Save } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
];

export default function ProfileView({ user, onUpdateProfile, onOpenPublicProfile, onShowToast }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    role: user?.role || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    portfolio: user?.portfolio || '',
    university: user?.university || '',
    degree: user?.degree || '',
    graduationYear: user?.graduationYear || '',
    gpa: user?.gpa || '',
    avatar: user?.avatar || AVATAR_PRESETS[0],
    skills: user?.skills || ['React.js', 'Node.js', 'Python', 'AI']
  });

  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (formData.skills.includes(newSkill.trim())) return;

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()]
    }));
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    if (onShowToast) onShowToast('Profile settings updated successfully!', 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>Digital Identity Profile</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Profile
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage personal bio, credentials, links and skill tags</p>
        </div>

        <button
          onClick={onOpenPublicProfile}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
        >
          <Share2 className="w-4 h-4 text-indigo-400" />
          <span>View Public Identity Card</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Avatar & Basic Info Header */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" /> Identity Avatar & Basic Details
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={formData.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-500/30 shadow-xl"
              />
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <label className="text-xs font-semibold text-slate-300">Choose Avatar Preset</label>
              <div className="flex flex-wrap gap-2">
                {AVATAR_PRESETS.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Preset ${idx}`}
                    onClick={() => setFormData({ ...formData, avatar: url })}
                    className={`w-10 h-10 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                      formData.avatar === url ? 'border-indigo-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Role / Title</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Academic & University Details */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-400" /> Academic & University Info
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">University / Institute Name</label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Specialization</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Graduation Year</label>
              <input
                type="text"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">CGPA / Score</label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Social Links & Web Presence */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-400" /> Digital Links & Portfolio
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Profile</label>
              <div className="relative">
                <GithubIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 pl-9 pr-3.5 text-sm text-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn URL</label>
              <div className="relative">
                <LinkedinIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 pl-9 pr-3.5 text-sm text-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Portfolio Site</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 pl-9 pr-3.5 text-sm text-white focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Tag Management */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Verified Core Skills & Tech Stack
          </h2>

          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-300"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 pt-2 max-w-md">
            <input
              type="text"
              placeholder="Add skill (e.g. PyTorch, Docker, Next.js)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile & Update Identity</span>
          </button>
        </div>

      </form>

    </div>
  );
}

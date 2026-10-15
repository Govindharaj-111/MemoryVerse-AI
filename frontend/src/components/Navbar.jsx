import React, { useState } from 'react';
import { ShieldCheck, Plus, User, LogOut, ExternalLink, Menu, X, Sparkles, FileText, ChevronDown } from 'lucide-react';

export default function Navbar({
  isLoggedIn,
  user,
  onOpenAuth,
  onLogout,
  onOpenUpload,
  activeTab,
  setActiveTab,
  onOpenPublicProfile
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black text-white tracking-tight">
                  MemoryVerse<span className="text-indigo-400 font-extrabold">.AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-300">
                  <ShieldCheck className="w-3 h-3 text-indigo-400" /> Identity Vault
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Digital Identity & Record Manager</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-2xl">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'documents', label: 'Documents' },
                { id: 'resumes', label: 'Resumes' },
                { id: 'credentials', label: 'Certificates & Internships' },
                { id: 'projects', label: 'Projects & GitHub' },
                { id: 'academic', label: 'Academic' },
                { id: 'profile', label: 'Profile' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === item.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <button onClick={() => setActiveTab('landing')} className="hover:text-white transition-colors">Home</button>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#identity" className="hover:text-white transition-colors">Digital Identity</a>
              <a href="#vault" className="hover:text-white transition-colors">Doc Vault</a>
            </div>
          )}

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  onClick={onOpenUpload}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload Record</span>
                </button>

                {/* Profile Avatar & Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
                  >
                    <img
                      src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                      alt={user?.name || "User"}
                      className="w-7 h-7 rounded-lg object-cover ring-2 ring-indigo-500/30"
                    />
                    <span className="hidden sm:inline-block text-xs font-semibold text-slate-200 max-w-[100px] truncate">
                      {user?.name || "Govindharaj"}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div
                      onMouseLeave={() => setProfileDropdownOpen(false)}
                      className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in space-y-1"
                    >
                      <div className="px-3 py-2 border-b border-slate-800">
                        <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <User className="w-4 h-4 text-indigo-400" />
                        <span>My Profile Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          onOpenPublicProfile();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-emerald-400" />
                        <span>Public Identity Link</span>
                      </button>

                      <div className="pt-1 border-t border-slate-800">
                        <button
                          onClick={() => {
                            onLogout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          {isLoggedIn ? (
            <div className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'documents', label: 'Documents Vault' },
                { id: 'resumes', label: 'Resumes' },
                { id: 'credentials', label: 'Certificates & Internships' },
                { id: 'projects', label: 'Projects & GitHub' },
                { id: 'academic', label: 'Academic Records' },
                { id: 'profile', label: 'My Profile' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <button
                  onClick={() => {
                    onOpenPublicProfile();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-emerald-400"
                >
                  <ExternalLink className="w-4 h-4" /> View Public Card
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-rose-400"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm font-medium text-slate-300">
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 hover:text-white"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  onOpenAuth('signup');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 font-bold text-indigo-400"
              >
                Create Free Account
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
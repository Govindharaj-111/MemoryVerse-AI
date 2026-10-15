import React, { useState } from 'react';
import { X, User, Mail, Lock, Briefcase, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, initialMode = 'login', onClose, onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'AI & Software Engineer'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (mode === 'signup' && !formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: formData.name || (mode === 'login' ? 'Govindharaj M' : 'New User'),
        email: formData.email,
        role: formData.role || 'AI & Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        verifiedIdentity: true,
      };
      onAuthSuccess(user, mode === 'login' ? 'Welcome back!' : 'Account created successfully!');
      onClose();
    }, 800);
  };

  const handleDemoLogin = (preset) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let demoUser = {
        name: 'Govindharaj M',
        email: 'govindharaj@memoryverse.ai',
        role: 'AI & Full Stack Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        verifiedIdentity: true,
      };

      if (preset === 'student') {
        demoUser = {
          name: 'Ananya Sharma',
          email: 'ananya.s@university.edu',
          role: 'Computer Science Student & Researcher',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          verifiedIdentity: true,
        };
      }

      onAuthSuccess(demoUser, `Logged in as ${demoUser.name}`);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'login' ? 'Welcome Back to MemoryVerse' : 'Create Your Digital Identity'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? 'Enter your credentials to access your identity vault'
              : 'Sign up to start organizing & verifying your career portfolio'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 p-1 bg-slate-950/70 border border-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrors({});
            }}
            className={`py-2 text-xs font-semibold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrors({});
            }}
            className={`py-2 text-xs font-semibold rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Govindharaj M"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-slate-950/60 border ${
                    errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                  } rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                />
              </div>
              {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="you@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full bg-slate-950/60 border ${
                  errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full bg-slate-950/60 border ${
                  errors.password ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
              />
            </div>
            {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password}</p>}
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Profession</label>
              <div className="relative">
                <Briefcase className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                >
                  <option value="AI & Software Engineer">AI & Software Engineer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Student & Researcher">Student & Researcher</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Cloud Architect">Cloud Architect</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {mode === 'login' ? 'Sign In to Identity Vault' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Quick Selector */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
            🚀 Quick Demo Login Presets
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('engineer')}
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs text-indigo-300 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Demo Engineer</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('student')}
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs text-purple-300 transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Demo Student</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

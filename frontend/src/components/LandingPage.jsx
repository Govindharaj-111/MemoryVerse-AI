import React from 'react';
import { ShieldCheck, Sparkles, FileText, Award, Briefcase, Code, GraduationCap, ArrowRight, CheckCircle2, Lock, Cpu, Share2, Eye, Download } from 'lucide-react';

export default function LandingPage({ onOpenAuth, onExploreDemo }) {
  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-indigo-300 border border-indigo-500/30 animate-float">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Next-Gen AI Digital Identity & Vault System</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
          One Intelligent Vault for Your <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-400 bg-clip-text text-transparent">
            Resumes, Credentials & Records
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          MemoryVerse-AI organizes your resumes, certificates, internships, projects, academic degrees, and GitHub links into a single, verifiable Digital Identity.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-2xl shadow-indigo-600/40 hover:shadow-indigo-600/60 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <span>Create Your Free Vault</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-base border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Eye className="w-5 h-5 text-indigo-400" />
            <span>Try Interactive Demo</span>
          </button>
        </div>

        {/* Features Bullet Bar */}
        <div className="pt-6 flex flex-wrap justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant PDF & Doc Upload</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>GitHub & Credly Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Shareable Public Identity</span>
          </div>
        </div>

        {/* Digital Identity Interactive Showcase Preview Card */}
        <div id="identity" className="pt-12 max-w-5xl mx-auto">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 text-left space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Govindharaj M"
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/50"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 text-slate-950">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">Govindharaj M</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                      VERIFIED AI IDENTITY
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">AI & Full Stack Software Engineer • 92% Complete</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
                  8 Documents Preserved
                </span>
              </div>
            </div>

            {/* Document Preview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Senior Resume 2026", cat: "Resume", icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500/10", size: "420 KB" },
                { title: "AWS Cloud Architect", cat: "Certificate", icon: Award, color: "text-indigo-400", bg: "bg-indigo-500/10", size: "1.2 MB" },
                { title: "AI Research Internship", cat: "Internship", icon: Briefcase, color: "text-amber-400", bg: "bg-amber-500/10", size: "650 KB" },
                { title: "MemoryVerse AI Repo", cat: "Project", icon: Code, color: "text-sky-400", bg: "bg-sky-500/10", size: "GitHub Link" },
              ].map((doc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
                  <div className="flex justify-between items-center">
                    <div className={`p-2.5 rounded-xl ${doc.bg} ${doc.color}`}>
                      <doc.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{doc.cat}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white truncate">{doc.title}</h4>
                    <p className="text-[10px] text-slate-400">{doc.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Feature Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed for Modern Professionals & Developers
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Stop losing track of your certificates, project links, and degree transcripts across multiple drives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: FileText,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              title: "6 Specialized Categories",
              desc: "Seamlessly separate Resumes, Certificates, Internship letters, Projects, Academic transcripts, and other credentials."
            },
            {
              icon: Code,
              color: "text-sky-400",
              bg: "bg-sky-500/10",
              title: "GitHub & Repo Integration",
              desc: "Link your open-source projects, repository documentation, and live app URLs directly alongside your academic records."
            },
            {
              icon: Share2,
              color: "text-purple-400",
              bg: "bg-purple-500/10",
              title: "Shareable Digital Identity",
              desc: "Generate a clean, recruiter-friendly public profile card showcasing all your verified achievements in one place."
            },
            {
              icon: Lock,
              color: "text-indigo-400",
              bg: "bg-indigo-500/10",
              title: "Encrypted Document Storage",
              desc: "Keep your official PDFs, marksheets, and identity documents secure with privacy controls and persistent local state."
            },
            {
              icon: Cpu,
              color: "text-amber-400",
              bg: "bg-amber-500/10",
              title: "Identity Completeness Engine",
              desc: "Get intelligent feedback on how complete your digital career portfolio is and what records are missing."
            },
            {
              icon: Download,
              color: "text-rose-400",
              bg: "bg-rose-500/10",
              title: "One-Click Preview & Download",
              desc: "Preview any PDF or image credential in-browser without having to re-download files repeatedly."
            }
          ].map((feat, i) => (
            <div key={i} className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 rounded-2xl ${feat.bg} ${feat.color} flex items-center justify-center`}>
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-white">6</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">Document Categories</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-indigo-400">100%</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">Verifiable Records</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-purple-400">0 KB</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">Data Loss Guarantee</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-emerald-400">Instant</h3>
            <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">PDF & Link Access</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-white">MemoryVerse-AI</span>
          <span>— Smart Digital Identity Management System</span>
        </div>
        <p>© 2026 Developed by Govindharaj M. All rights reserved.</p>
      </footer>

    </div>
  );
}

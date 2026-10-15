import React, { useState } from 'react';
import { X, ShieldCheck, Share2, Download, ExternalLink, CheckCircle2, Award, Briefcase, GraduationCap, FileText, Code, Check } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function PublicIdentityModal({ isOpen, user, documents, onClose, onShowToast }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const publicUrl = user?.publicProfileUrl || `https://memoryverse.ai/u/${(user?.name || 'user').toLowerCase().replace(/\s+/g, '-')}`;

  const mainResume = documents.find((d) => d.category === 'Resume' && d.isPrimary) || documents.find((d) => d.category === 'Resume');
  const certificates = documents.filter((d) => d.category === 'Certificate');
  const internships = documents.filter((d) => d.category === 'Internship');
  const projects = documents.filter((d) => d.category === 'Project');
  const academic = documents.filter((d) => d.category === 'Academic');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    if (onShowToast) onShowToast('Public Identity URL copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Live Public Identity View
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">Recruiter & Employer Preview</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/50 via-slate-900 to-purple-950/30 border border-indigo-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user?.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/40 shadow-xl"
            />
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-black text-white">{user?.name || "Govindharaj M"}</h2>
                <CheckCircle2 className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
              </div>
              <p className="text-sm font-semibold text-indigo-300">{user?.role || "AI & Software Engineer"}</p>
              <p className="text-xs text-slate-400 max-w-xl">{user?.bio}</p>
            </div>
          </div>

          {/* User Skills */}
          {user?.skills && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {user.skills.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 text-[11px] font-semibold text-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Main Resume Showcase */}
        {mainResume && (
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Active Verified Resume</h3>
              </div>
              <a
                href={mainResume.url}
                download={mainResume.name}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
              >
                <Download className="w-3 h-3" /> Download Resume
              </a>
            </div>
            <p className="text-xs text-slate-300 font-bold">{mainResume.name}</p>
            <p className="text-[11px] text-slate-400">{mainResume.description}</p>
          </div>
        )}

        {/* Key Credential Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Certificates */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Award className="w-4 h-4" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Certifications ({certificates.length})</h3>
            </div>
            <div className="space-y-2">
              {certificates.map((c) => (
                <div key={c.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                  <p className="text-xs font-bold text-slate-200 truncate">{c.name}</p>
                  <p className="text-[10px] text-slate-400">{c.organization} • {c.issueDate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Internships & Projects */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-400">
              <Code className="w-4 h-4" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Projects & Internships ({projects.length + internships.length})</h3>
            </div>
            <div className="space-y-2">
              {[...internships, ...projects].slice(0, 3).map((p) => (
                <div key={p.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                  <p className="text-xs font-bold text-slate-200 truncate">{p.name}</p>
                  <p className="text-[10px] text-slate-400">{p.organization} ({p.category})</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Share Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>MemoryVerse-AI Cryptographically Signed Identity</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Public Identity URL'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

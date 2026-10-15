import React from 'react';
import { ShieldCheck, Plus, FileText, Award, Briefcase, Code, GraduationCap, ArrowRight, Eye, Download, Sparkles, CheckCircle2, Share2, Upload, ExternalLink } from 'lucide-react';
import { DocumentCard } from './DocumentCard';

export default function DashboardView({
  user,
  documents,
  onOpenUpload,
  setActiveTab,
  onPreviewDoc,
  onEditDoc,
  onDeleteDoc,
  onOpenPublicProfile
}) {
  // Stat calculations
  const totalCount = documents.length;
  const resumeCount = documents.filter((d) => d.category === 'Resume').length;
  const certCount = documents.filter((d) => d.category === 'Certificate').length;
  const internshipCount = documents.filter((d) => d.category === 'Internship').length;
  const projectCount = documents.filter((d) => d.category === 'Project').length;
  const academicCount = documents.filter((d) => d.category === 'Academic').length;

  // Identity Completeness calculation
  let completenessScore = 30; // base score
  if (user?.bio) completenessScore += 10;
  if (user?.github) completenessScore += 10;
  if (user?.linkedin) completenessScore += 10;
  if (resumeCount > 0) completenessScore += 15;
  if (certCount > 0) completenessScore += 10;
  if (projectCount > 0) completenessScore += 10;
  if (academicCount > 0) completenessScore += 5;
  completenessScore = Math.min(100, completenessScore);

  const recentDocs = [...documents].reverse().slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Welcome Banner & Identity Completeness Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome Back, {user?.name || "Govindharaj M"} 👋
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Digital Identity Vault • {user?.role || "AI & Software Engineer"}
          </p>
        </div>

        {/* Identity Completeness Bar */}
        <div className="w-full lg:w-80 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Identity Completeness
            </span>
            <span className="text-indigo-400 font-extrabold">{completenessScore}%</span>
          </div>
          
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-1000"
              style={{ width: `${completenessScore}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>{completenessScore === 100 ? 'Vault fully verified!' : 'Add certificates to reach 100%'}</span>
            <button onClick={() => setActiveTab('profile')} className="text-indigo-400 hover:underline">
              Improve
            </button>
          </p>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Vault Docs", count: totalCount, icon: ShieldCheck, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", tab: "documents" },
          { label: "Resumes", count: resumeCount, icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", tab: "resumes" },
          { label: "Certificates", count: certCount, icon: Award, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", tab: "credentials" },
          { label: "Internships", count: internshipCount, icon: Briefcase, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", tab: "credentials" },
          { label: "Projects & Code", count: projectCount, icon: Code, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", tab: "projects" },
          { label: "Academic Records", count: academicCount, icon: GraduationCap, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", tab: "academic" }
        ].map((card, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(card.tab)}
            className="glass-card rounded-2xl p-4 space-y-3 cursor-pointer group hover:-translate-y-1 transition-all"
          >
            <div className="flex justify-between items-center">
              <div className={`p-2.5 rounded-xl ${card.bg} ${card.color} border ${card.border}`}>
                <card.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">View →</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">{card.count}</h3>
              <p className="text-[11px] font-semibold text-slate-400 truncate mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Digital Identity Overview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card & Shareable Link */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-5 lg:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user?.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40"
            />
            <div>
              <h3 className="text-base font-bold text-white">{user?.name || "Govindharaj M"}</h3>
              <p className="text-xs text-indigo-300 font-medium">{user?.role || "Software Engineer"}</p>
              <p className="text-[10px] text-slate-400">{user?.university || "IIT / Engineering University"}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Public Card:</span>
              <button
                onClick={onOpenPublicProfile}
                className="text-indigo-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Live View</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Main Resume:</span>
              <span className="font-semibold text-emerald-400 truncate max-w-[140px]">
                {documents.find((d) => d.category === 'Resume' && d.isPrimary)?.name || 'Resume 2026'}
              </span>
            </div>
          </div>

          <button
            onClick={onOpenPublicProfile}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all"
          >
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span>Share Digital Identity Link</span>
          </button>
        </div>

        {/* Quick Actions & Vault Summary */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-5 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Quick Vault Operations
              </h3>
              <span className="text-xs text-slate-400">Perform instant tasks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={onOpenUpload}
                className="p-4 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-left space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <Upload className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-indigo-400 font-bold">+ Record</span>
                </div>
                <h4 className="text-sm font-bold text-white">Upload New Document</h4>
                <p className="text-[11px] text-slate-400">Add PDF, certificate, internship letter or transcript</p>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className="p-4 rounded-2xl bg-sky-600/10 hover:bg-sky-600/20 border border-sky-500/30 text-left space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <Code className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-sky-400 font-bold">GitHub</span>
                </div>
                <h4 className="text-sm font-bold text-white">Link Project Repo</h4>
                <p className="text-[11px] text-slate-400">Connect GitHub repos and open-source project links</p>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Storage Used: <strong className="text-white">10.8 MB</strong> / Unlimited</span>
            <button onClick={() => setActiveTab('documents')} className="text-indigo-400 font-bold hover:underline">
              Browse All Documents →
            </button>
          </div>
        </div>

      </div>

      {/* Recent Activity Documents Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Recently Uploaded Documents</h2>
            <p className="text-xs text-slate-400">Latest records added to your digital identity vault</p>
          </div>
          <button
            onClick={() => setActiveTab('documents')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            <span>View All ({documents.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recentDocs.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center space-y-3">
            <FileText className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No Documents Found</h3>
            <p className="text-xs text-slate-500">Upload your first resume, certificate, or project link to get started.</p>
            <button
              onClick={onOpenUpload}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Upload First Record
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentDocs.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onPreview={onPreviewDoc}
                onEdit={onEditDoc}
                onDelete={onDeleteDoc}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

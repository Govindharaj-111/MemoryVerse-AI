import React from 'react';
import { FileText, Award, Briefcase, Code, GraduationCap, File, Download, Eye, Edit3, Trash2, ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from './Icons';
import { CATEGORY_COLORS } from '../data/initialData';

const categoryIcons = {
  Resume: FileText,
  Certificate: Award,
  Internship: Briefcase,
  Project: Code,
  Academic: GraduationCap,
  Other: File,
};

export function DocumentCard({ doc, onPreview, onEdit, onDelete, onTogglePrimary }) {
  const IconComponent = categoryIcons[doc.category] || File;
  const colorScheme = CATEGORY_COLORS[doc.category] || CATEGORY_COLORS.Other;

  return (
    <div className="glass-card rounded-2xl p-5 space-y-4 flex flex-col justify-between group transition-all duration-300 relative">
      
      {/* Top Bar: Icon + Category Badge + Actions Menu */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} border`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${colorScheme.badge}`}>
                {doc.category}
              </span>
              {doc.isPrimary && (
                <span className="ml-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> Main Resume
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(doc)}
              title="Edit document details"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(doc.id)}
              title="Delete document"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Organization */}
        <h3
          onClick={() => onPreview(doc)}
          className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
          title={doc.name}
        >
          {doc.name}
        </h3>

        {doc.organization && (
          <p className="text-xs text-slate-400 mt-1 truncate">
            {doc.organization}
          </p>
        )}

        {doc.description && (
          <p className="text-xs text-slate-400/90 mt-2 line-clamp-2 leading-relaxed">
            {doc.description}
          </p>
        )}
      </div>

      {/* Meta Specs & Tags */}
      <div className="space-y-3 pt-3 border-t border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-1">
          <span>Uploaded: <strong className="text-slate-300">{doc.uploadedAt}</strong></span>
          <span>Size: <strong className="text-slate-300">{doc.size}</strong></span>
        </div>

        {/* GitHub / External Links */}
        {(doc.githubUrl || doc.verificationUrl) && (
          <div className="flex items-center gap-2 pt-1">
            {doc.githubUrl && (
              <a
                href={doc.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Repo</span>
              </a>
            )}
            {doc.verificationUrl && (
              <a
                href={doc.verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-[11px] font-semibold text-indigo-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Verify Credential</span>
              </a>
            )}
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onPreview(doc)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>Preview</span>
          </button>
          
          <a
            href={doc.url}
            download={doc.name}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-colors text-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        </div>
      </div>

    </div>
  );
}

export function DocumentRow({ doc, onPreview, onEdit, onDelete }) {
  const IconComponent = categoryIcons[doc.category] || File;
  const colorScheme = CATEGORY_COLORS[doc.category] || CATEGORY_COLORS.Other;

  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-indigo-500/30 transition-all">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className={`p-3 rounded-xl ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} border shrink-0`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4
              onClick={() => onPreview(doc)}
              className="text-sm font-bold text-white hover:text-indigo-300 transition-colors cursor-pointer truncate"
            >
              {doc.name}
            </h4>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${colorScheme.badge}`}>
              {doc.category}
            </span>
          </div>
          <p className="text-xs text-slate-400 truncate mt-0.5">
            {doc.organization || doc.description || "Uploaded Document"} • {doc.size} • {doc.uploadedAt}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
        {doc.githubUrl && (
          <a
            href={doc.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        )}
        <button
          onClick={() => onPreview(doc)}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5 text-indigo-400" />
          <span>Preview</span>
        </button>
        <a
          href={doc.url}
          download={doc.name}
          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </a>
        <button
          onClick={() => onEdit(doc)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Edit"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(doc.id)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

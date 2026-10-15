import React, { useState } from 'react';
import { X, Download, ExternalLink, Share2, Calendar, Building2, Tag, FileText, Award, Briefcase, Code, GraduationCap, File, Check, Edit3, Trash2 } from 'lucide-react';
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

export default function DocumentDetailModal({ doc, isOpen, onClose, onEdit, onDelete, onShowToast }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !doc) return null;

  const IconComponent = categoryIcons[doc.category] || File;
  const colorScheme = CATEGORY_COLORS[doc.category] || CATEGORY_COLORS.Other;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    if (onShowToast) onShowToast('Document reference link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className={`p-3.5 rounded-2xl ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} border shrink-0 mt-1`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">{doc.name}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${colorScheme.badge}`}>
                  {doc.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {doc.organization || "MemoryVerse AI Vault Record"} • Uploaded on {doc.uploadedAt} • Size: {doc.size}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(doc);
              }}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Edit document"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(doc.id);
              }}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Delete document"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Document Reader Preview */}
        <div className="w-full h-80 sm:h-96 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative group">
          {doc.fileType === 'pdf' || doc.url ? (
            <iframe
              src={doc.url}
              title={doc.name}
              className="w-full h-full border-0"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
              <FileText className="w-12 h-12 text-indigo-400" />
              <p className="text-sm font-semibold text-white">{doc.name}</p>
              <p className="text-xs text-slate-400">Preview not available in iframe mode for this file type.</p>
            </div>
          )}
        </div>

        {/* Detailed Metadata Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Record Details</h3>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-slate-400">Issuer / Org:</span>
                <span className="font-semibold text-white">{doc.organization || "Independent"}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-slate-400">Issue Date:</span>
                <span className="font-semibold text-white">{doc.issueDate || "N/A"}</span>
              </div>

              {doc.expiryDate && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-400">Expiry Date:</span>
                  <span className="font-semibold text-white">{doc.expiryDate}</span>
                </div>
              )}
            </div>

            {doc.description && (
              <div className="pt-2">
                <h4 className="text-[11px] font-semibold text-slate-400 mb-1">Description</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {doc.description}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Integrations & Tags</h3>
            
            {/* Tags */}
            {doc.tags && doc.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {doc.tags.map((t, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-medium">
                    <Tag className="w-3 h-3 text-indigo-400" />
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* GitHub & Verification Links */}
            <div className="space-y-2 pt-2">
              {doc.githubUrl && (
                <a
                  href={doc.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-slate-400" />
                  <span className="flex-1 truncate">{doc.githubUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              )}

              {doc.verificationUrl && (
                <a
                  href={doc.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-xs font-semibold text-indigo-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="flex-1 truncate">Verify Credential: {doc.verificationUrl}</span>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Actions Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-indigo-400" />}
            <span>{copied ? 'Link Copied!' : 'Share Document Reference'}</span>
          </button>

          <a
            href={doc.url}
            download={doc.name}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Original File</span>
          </a>
        </div>

      </div>
    </div>
  );
}

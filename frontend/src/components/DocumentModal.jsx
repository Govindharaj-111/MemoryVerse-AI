import React, { useState, useEffect } from 'react';
import { X, Upload, Link as LinkIcon, FileText, Award, Briefcase, Code, GraduationCap, File, CheckCircle2, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { CATEGORIES } from '../data/initialData';

export default function DocumentModal({ isOpen, docToEdit, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'link'
  const [fileObj, setFileObj] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Resume',
    organization: '',
    description: '',
    tags: '',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    githubUrl: '',
    verificationUrl: '',
    isPrimary: false,
    url: '',
    fileType: 'pdf',
    size: '1.0 MB'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (docToEdit) {
      setFormData({
        name: docToEdit.name || '',
        category: docToEdit.category || 'Resume',
        organization: docToEdit.organization || '',
        description: docToEdit.description || '',
        tags: Array.isArray(docToEdit.tags) ? docToEdit.tags.join(', ') : (docToEdit.tags || ''),
        issueDate: docToEdit.issueDate || '',
        expiryDate: docToEdit.expiryDate || '',
        githubUrl: docToEdit.githubUrl || '',
        verificationUrl: docToEdit.verificationUrl || '',
        isPrimary: docToEdit.isPrimary || false,
        url: docToEdit.url || '',
        fileType: docToEdit.fileType || 'pdf',
        size: docToEdit.size || '1.0 MB'
      });
      setActiveTab(docToEdit.url && !docToEdit.url.startsWith('blob:') ? 'link' : 'upload');
    } else {
      setFormData({
        name: '',
        category: 'Resume',
        organization: '',
        description: '',
        tags: '',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        githubUrl: '',
        verificationUrl: '',
        isPrimary: false,
        url: '',
        fileType: 'pdf',
        size: ''
      });
      setFileObj(null);
      setActiveTab('upload');
    }
    setErrors({});
  }, [docToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeStr = (file.size / (1024 * 1024) >= 1)
      ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      : (file.size / 1024).toFixed(0) + ' KB';

    const ext = file.name.split('.').pop().toLowerCase();

    setFileObj(file);
    setFormData((prev) => ({
      ...prev,
      name: prev.name || file.name,
      size: sizeStr,
      fileType: ext,
      url: URL.createObjectURL(file)
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Document title is required';
    if (activeTab === 'upload' && !formData.url && !docToEdit) {
      errs.file = 'Please select a file to upload';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedTags = formData.tags
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [formData.category];

    const finalDoc = {
      id: docToEdit ? docToEdit.id : `doc-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      organization: formData.organization || 'Independent Record',
      description: formData.description,
      tags: formattedTags,
      issueDate: formData.issueDate,
      expiryDate: formData.expiryDate || 'N/A',
      uploadedAt: docToEdit ? docToEdit.uploadedAt : new Date().toISOString().split('T')[0],
      githubUrl: formData.githubUrl,
      verificationUrl: formData.verificationUrl,
      isPrimary: formData.isPrimary,
      fileType: formData.fileType || 'pdf',
      size: formData.size || '1.0 MB',
      url: formData.url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    };

    onSave(finalDoc, docToEdit ? 'Document updated successfully' : 'New document uploaded to vault');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {docToEdit ? 'Edit Document Details' : 'Add Document to Vault'}
              </h2>
              <p className="text-xs text-slate-400">Manage digital identity record & metadata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Mode Selector */}
        {!docToEdit && (
          <div className="grid grid-cols-2 p-1 bg-slate-950/70 border border-slate-800 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'upload'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload PDF / File</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('link')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'link'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>GitHub / URL Record</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* File Picker Zone */}
          {activeTab === 'upload' && !docToEdit && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Document File</label>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl cursor-pointer bg-slate-950/40 hover:bg-slate-950/80 transition-all text-center group">
                <Upload className="w-8 h-8 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-white">
                  {fileObj ? fileObj.name : 'Click to browse or drop PDF, DOC, or image file'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Supports PDF, DOCX, JPG, PNG up to 25MB</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {errors.file && <p className="text-xs text-rose-400 mt-1">{errors.file}</p>}
            </div>
          )}

          {/* Document Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Document Title *</label>
              <input
                type="text"
                placeholder="e.g. Senior Resume 2026 or AWS Credential"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
              />
              {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Organization & Issue Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Issuing Organization / Company</label>
              <input
                type="text"
                placeholder="e.g. AWS, Google, OpenAI, NIT University"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Issue / Award Date</label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* GitHub Link & Verification URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repo / Project Link</label>
              <div className="relative">
                <GithubIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 pl-9 pr-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Credential Verification URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  placeholder="https://credly.com/badges/..."
                  value={formData.verificationUrl}
                  onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 pl-9 pr-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description / Key Notes</label>
            <textarea
              rows={3}
              placeholder="Add key highlights, technologies used, grade, or notes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Comma Separated)</label>
            <input
              type="text"
              placeholder="e.g. AI, React, Certified, Honors"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
            />
          </div>

          {/* Primary Resume Toggle */}
          {formData.category === 'Resume' && (
            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={formData.isPrimary}
                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-medium text-slate-300">Set as Primary Active Resume</span>
            </label>
          )}

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              {docToEdit ? 'Save Changes' : 'Save Document to Vault'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

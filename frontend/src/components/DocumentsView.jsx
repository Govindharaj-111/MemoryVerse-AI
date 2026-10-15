import React, { useState, useMemo } from 'react';
import { Search, Filter, LayoutGrid, List, Plus, FileText, X, Sparkles, ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '../data/initialData';
import { DocumentCard, DocumentRow } from './DocumentCard';

export default function DocumentsView({
  documents,
  initialCategoryFilter = 'All',
  onOpenUpload,
  onPreviewDoc,
  onEditDoc,
  onDeleteDoc
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryFilter);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'name'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        doc.name.toLowerCase().includes(searchLower) ||
        (doc.organization && doc.organization.toLowerCase().includes(searchLower)) ||
        (doc.description && doc.description.toLowerCase().includes(searchLower)) ||
        (doc.category && doc.category.toLowerCase().includes(searchLower)) ||
        (doc.tags && doc.tags.some((t) => t.toLowerCase().includes(searchLower)));

      const matchesCategory =
        selectedCategory === 'All' || doc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.uploadedAt) - new Date(a.uploadedAt);
      if (sortBy === 'oldest') return new Date(a.uploadedAt) - new Date(b.uploadedAt);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [documents, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>Documents & Records Vault</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">
              {filteredDocuments.length} Records
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Organize, preview and verify your professional documents</p>
        </div>

        <button
          onClick={onOpenUpload}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Search & Control Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-4">
        
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, organization, description or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-9 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-44">
              <ArrowUpDown className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none transition-all"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            {/* Grid / Row Toggle */}
            <div className="flex items-center p-1 bg-slate-950/70 border border-slate-800 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Categories ({documents.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = documents.filter((d) => d.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Documents Render Area */}
      {filteredDocuments.length === 0 ? (
        <div className="glass-panel rounded-3xl p-16 text-center space-y-4 max-w-lg mx-auto my-8">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No Documents Found</h3>
            <p className="text-xs text-slate-400">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search query or category filters.'
                : 'Your vault is empty. Upload your first document to build your digital identity.'}
            </p>
          </div>
          <button
            onClick={onOpenUpload}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Upload First Record</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onPreview={onPreviewDoc}
              onEdit={onEditDoc}
              onDelete={onDeleteDoc}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <DocumentRow
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
  );
}

import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  BookOpen, 
  Code, 
  FileText, 
  ExternalLink, 
  Check, 
  Plus, 
  Sparkles
} from 'lucide-react';
import { publicApiResources } from '../data/publicApis';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export const PublicApiHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [savedItems, setSavedItems] = useState({});

  const filtered = publicApiResources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'All') return matchesSearch;
    return matchesSearch && res.source === activeFilter;
  });

  const handleSave = (item) => {
    setSavedItems(prev => ({ ...prev, [item.id]: true }));
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    toast.success(`Saved "${item.title.slice(0, 24)}..." to your reading list!`);
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-10 animate-fade-in space-y-8">
      
      {/* Friendly Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/30 text-[#00F59B] text-xs font-bold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Open Academic Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-[#F0F6FC]">
            Research & Book Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8B949E] mt-1 font-sans">
            Browse verified papers (arXiv), GitHub code examples, textbooks, and summaries.
          </p>
        </div>
      </div>

      {/* Clean Search & Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-[#30363D] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 dark:text-[#8B949E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search papers, textbooks, code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#161B22] border border-slate-200 dark:border-[#30363D] text-slate-800 dark:text-[#F0F6FC] placeholder:text-[#8B949E] focus:outline-none focus:border-[#00F59B] focus:ring-1 focus:ring-[#00F59B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'arXiv', 'GitHub', 'Wikipedia', 'Open Library'].map((src) => (
            <button
              key={src}
              onClick={() => setActiveFilter(src)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === src
                  ? 'bg-[#00F59B] text-[#07090D] font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-[#161B22] text-slate-600 dark:text-[#8B949E] hover:bg-slate-200 dark:hover:bg-[#21262D]'
              }`}
            >
              {src}
            </button>
          ))}
        </div>

      </div>

      {/* Clean Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((res) => {
          const isSaved = savedItems[res.id];

          return (
            <div
              key={res.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-[#30363D] shadow-sm flex flex-col justify-between hover:border-[#00F59B] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-slate-100 dark:bg-[#161B22] text-slate-700 dark:text-[#8B949E] border border-[#30363D]">
                    {res.source}
                  </span>
                  <span className="text-xs font-semibold text-[#00F59B] font-mono">
                    {res.relevance}
                  </span>
                </div>

                <h3 className="font-bold text-base font-display text-slate-900 dark:text-[#F0F6FC] mb-2 group-hover:text-[#00F59B] transition-colors">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-[#8B949E] leading-relaxed mb-4">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-[#21262D] flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-[#8B949E] font-mono">{res.author}</span>
                <div className="flex items-center gap-2">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-slate-400 dark:text-[#8B949E] hover:text-slate-700 dark:hover:text-[#F0F6FC] hover:bg-slate-100 dark:hover:bg-[#161B22] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleSave(res)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isSaved
                        ? 'bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30'
                        : 'bg-[#00F59B] hover:bg-[#5EFCC2] text-[#07090D] shadow-sm'
                    }`}
                  >
                    {isSaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isSaved ? 'Saved' : 'Save to Study Plan'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

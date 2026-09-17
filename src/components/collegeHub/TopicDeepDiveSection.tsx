import React, { useState, useEffect } from 'react';
import { 
  TopicDeepNote, 
  generateDynamicTopicNote, 
  CURATED_TOPIC_DEEP_NOTES 
} from '../../utils/topicNotesGenerator';
import { 
  Search, 
  Sparkles, 
  Video, 
  BookOpen, 
  Copy, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Play, 
  Award, 
  HelpCircle, 
  Brain, 
  Loader2,
  Share2,
  Flame,
  GraduationCap,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const POPULAR_TOPICS = [
  'Maths: Matrices & Determinants',
  'Eigenvalues & Eigenvectors',
  'Normalization in DBMS',
  "Banker's Algorithm",
  'AVL Tree Rotations',
  'Paging & Virtual Memory',
  'Calculus Definite Integrals',
  'Dijkstra Shortest Path'
];

interface TopicDeepDiveSectionProps {
  initialQuery?: string;
}

export const TopicDeepDiveSection: React.FC<TopicDeepDiveSectionProps> = ({ initialQuery = 'Matrices & Determinants (Maths)' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [note, setNote] = useState<TopicDeepNote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'theory' | 'example' | 'youtube' | 'viva'>('all');
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setSearchInput(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    loadTopic(query);
  }, [query]);

  const loadTopic = async (topicStr: string) => {
    if (!topicStr.trim()) return;
    setIsLoading(true);
    setActiveEmbedId(null);
    try {
      const result = await generateDynamicTopicNote(topicStr);
      setNote(result);
    } catch (e) {
      console.error('Failed to generate topic notes:', e);
      toast.error('Failed to generate notes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setQuery(searchInput.trim());
    }
  };

  const handleCopyAllNotes = () => {
    if (!note) return;
    const text = `
# ${note.topicName}
Subject: ${note.subject} (${note.semester})

## Overview
${note.overview}

## Intuitive Explanation
${note.intuition}

## Core Theory
${note.coreTheory.map(ct => `### ${ct.heading}\n${ct.points.map(p => `- ${p}`).join('\n')}`).join('\n\n')}

## Step-by-Step Solved Problem
${note.stepByStepSolvedExample.problemStatement}
${note.stepByStepSolvedExample.steps.join('\n')}
Final Answer: ${note.stepByStepSolvedExample.finalAnswer}

## Important Formulas
${note.formulasAndRules.map(f => `- ${f}`).join('\n')}

## University Exam Tips
${note.universityExamTips.map(t => `- ${t}`).join('\n')}

## Viva Questions
${note.vivaQuestions.map(v => `Q: ${v.q}\nA: ${v.a}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    toast.success('Full Topic Study Notes copied to clipboard in Markdown format!');
  };

  const handleDownloadPDF = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    toast.success('Printing Study Notes!', {
      description: 'Opening browser print view (Save as PDF).'
    });
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Topic Generator Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>AI Study Room • Topic-to-Notes Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mt-2 font-display">
              Type Any Topic to Get Complete Notes & Best YouTube Video Links
            </h2>
            <p className="text-xs sm:text-sm text-[#1D1D1F]/70 dark:text-[#AAAAAA] mt-1 max-w-2xl">
              Instant syllabus notes, intuition, formulas, 10-mark solved numericals, and direct links to the highest-rated YouTube video lectures (3Blue1Brown, Dr. Gajendra Purohit, Gate Smashers, Khan Academy).
            </p>
          </div>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-[#AAAAAA] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter ANY topic (e.g. Maths Matrix, Eigenvalues, Normalization, Banker's Algorithm, Calculus)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 text-sm rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-[#AAAAAA]/30 dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#007AFF] hover:bg-[#0062CC] text-white shadow-md shadow-[#007AFF]/25 text-sm font-bold shadow-sm transition-all disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating A-to-Z Kit...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Study This Topic</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-medium">Quick Topics:</span>
          {POPULAR_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => {
                setSearchInput(topic);
                setQuery(topic);
              }}
              className="px-3 py-1 rounded-xl text-xs bg-[#F5F5F7] dark:bg-white/[0.04] hover:bg-[#007AFF]/10 hover:text-[#007AFF] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#AAAAAA]/30 dark:border-white/[0.08] transition-all font-mono cursor-pointer"
            >
              {topic}
            </button>
          ))}
        </div>

      </div>

      {/* Generated Topic Deep Notes View */}
      {note && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-8">
          
          {/* Header Action Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#AAAAAA]/30 dark:border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30">
                  {note.subject}
                </span>
                <span className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-medium">
                  {note.semester}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] font-display">
                {note.topicName}
              </h3>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={handleCopyAllNotes}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all border border-[#AAAAAA]/30 dark:border-white/[0.08] cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Notes</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white shadow-md shadow-[#007AFF]/25 text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Print Notes</span>
              </button>
            </div>
          </div>

          {/* Section Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#AAAAAA]/30 dark:border-white/[0.08]">
            {[
              { id: 'all', label: '📑 All Comprehensive Notes' },
              { id: 'youtube', label: `📺 YouTube Lectures (${note.youtubeLectures.length})` },
              { id: 'theory', label: '📖 Deep Theory & Rules' },
              { id: 'example', label: '💡 Solved University Example' },
              { id: 'viva', label: `🎤 Lab Viva QA (${note.vivaQuestions.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#007AFF] text-white shadow-sm'
                    : 'text-slate-600 dark:text-[#AAAAAA] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Curated YouTube Lectures Section (Highlighted prominently) */}
          {(activeTab === 'all' || activeTab === 'youtube') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2 font-display">
                    <Video className="w-5 h-5 text-red-600" />
                    <span>Best YouTube Video Lectures & Tutorials</span>
                  </h4>
                  <p className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA]">
                    Curated top-rated educator lectures for maximum output and conceptual clarity.
                  </p>
                </div>
                <span className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-mono hidden sm:inline">Direct Redirects Ready</span>
              </div>

              {/* Embedded Player (if active) */}
              {activeEmbedId && (
                <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-white text-xs">
                    <span className="font-bold flex items-center gap-2">
                      <Play className="w-4 h-4 text-red-500 fill-current" />
                      Playing Embedded Lecture
                    </span>
                    <button 
                      onClick={() => setActiveEmbedId(null)}
                      className="text-[#AAAAAA] hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" /> Close Player
                    </button>
                  </div>
                  <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-950">
                    <iframe
                      src={`https://www.youtube.com/embed/${activeEmbedId}?autoplay=1`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {note.youtubeLectures.map((vid, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-blue-400 transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200/60 dark:border-red-900/40">
                          {vid.badge}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {vid.duration}
                        </span>
                      </div>

                      <h5 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#007AFF] dark:group-hover:text-blue-400 transition-colors mb-1.5 line-clamp-2">
                        {vid.title}
                      </h5>
                      <p className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-mono mb-4">
                        Channel: <strong>{vid.channel}</strong>
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#AAAAAA]/30 dark:border-white/[0.08]">
                      {vid.embedId && (
                        <button
                          onClick={() => setActiveEmbedId(vid.embedId || null)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-[#1D1D1F] dark:text-[#F5F5F7] text-xs font-bold transition-all cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Here</span>
                        </button>
                      )}

                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all w-full shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Watch on YouTube ↗</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 1. Intuition & Overview */}
          {(activeTab === 'all' || activeTab === 'theory') && (
            <div className="space-y-4">
              
              {/* Intuition Box */}
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                  💡 Intuitive Explanation (Understand First, Memorize Never):
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-amber-100/90 leading-relaxed font-sans">
                  {note.intuition}
                </p>
              </div>

              {/* Formal Academic Definition */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-2">
                <strong className="text-[#007AFF] text-xs block uppercase font-mono tracking-wider">
                  Formal Definition & Academic Overview:
                </strong>
                <p className="text-xs sm:text-sm text-[#1D1D1F]/80 dark:text-[#AAAAAA] leading-relaxed">
                  {note.overview}
                </p>
              </div>

            </div>
          )}

          {/* 2. Core Theory Modules */}
          {(activeTab === 'all' || activeTab === 'theory') && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2 font-display">
                <BookOpen className="w-5 h-5 text-[#007AFF]" />
                <span>Comprehensive Theory & Key Concepts</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {note.coreTheory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-3"
                  >
                    <h5 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] border-b border-[#AAAAAA]/30 dark:border-white/[0.08] pb-2">
                      {item.heading}
                    </h5>
                    <ul className="space-y-2 text-xs text-[#1D1D1F]/80 dark:text-[#AAAAAA]">
                      {item.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#007AFF] shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Step-by-Step Solved Problem */}
          {(activeTab === 'all' || activeTab === 'example') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2 font-display">
                  <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Step-by-Step Solved University Exam Problem</span>
                </h4>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-200/60 dark:border-emerald-800/60">
                  10-MARK MODEL ANSWER
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-4">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-[#AAAAAA]/30 dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-[#F5F5F7]">
                  <strong className="text-amber-700 dark:text-amber-300 block mb-1">Problem Statement:</strong>
                  {note.stepByStepSolvedExample.problemStatement}
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-500 font-mono">Step-by-Step Working:</span>
                  {note.stepByStepSolvedExample.steps.map((step, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-[#AAAAAA]/30 dark:border-white/[0.08] text-xs text-slate-800 dark:text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-200">
                  <strong>Final Conclusion / Answer: </strong>
                  {note.stepByStepSolvedExample.finalAnswer}
                </div>
              </div>
            </div>
          )}

          {/* 4. Formulas & Exam Scoring Tips */}
          {(activeTab === 'all' || activeTab === 'theory') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Key Formulas */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-3">
                <h5 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#007AFF]" />
                  <span>Important Formulas & Recurrences</span>
                </h5>
                <div className="space-y-2 font-mono text-xs">
                  {note.formulasAndRules.map((f, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-[#AAAAAA]/30 dark:border-white/[0.08] text-slate-800 dark:text-slate-300">
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Examiner's Tips */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-3">
                <h5 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Examiner's Scoring Strategy</span>
                </h5>
                <ul className="space-y-2 text-xs text-[#1D1D1F]/80 dark:text-[#AAAAAA]">
                  {note.universityExamTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* 5. Lab Viva Questions */}
          {(activeTab === 'all' || activeTab === 'viva') && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2 font-display">
                <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Lab Viva & Technical Interview Questions</span>
              </h4>

              <div className="space-y-3">
                {note.vivaQuestions.map((viva, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-2"
                  >
                    <div className="flex items-start gap-2 text-xs font-bold text-purple-700 dark:text-purple-300">
                      <span className="font-mono">Q{idx + 1}:</span>
                      <span>{viva.q}</span>
                    </div>
                    <p className="text-xs text-[#1D1D1F]/80 dark:text-[#AAAAAA] pl-6 leading-relaxed">
                      <strong>Answer: </strong>{viva.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Standard Books */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-[#AAAAAA]/30 dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <GraduationCap className="w-4 h-4 text-[#007AFF] shrink-0" />
              <span>Recommended Standard Reference Books: <strong>{note.standardBooks.join(' • ')}</strong></span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

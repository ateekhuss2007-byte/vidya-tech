import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Target
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const CHAPTER_MASTERY_DATA = [
  {
    stream: 'B.Tech CSE (MAKAUT)',
    subject: 'Data Structures & Algorithms',
    chapters: [
      { name: 'Arrays & Linked Lists', score: 92, status: 'Strong', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200' },
      { name: 'Binary Search Trees & Traversal', score: 85, status: 'Strong', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200' },
      { name: 'AVL Tree Double Rotations', score: 48, status: 'Critical Gap', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/40', border: 'border-rose-200', action: '15m Drill Needed' },
      { name: 'Graph Traversal (BFS & DFS)', score: 78, status: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-200' },
      { name: 'Dynamic Programming (0/1 Knapsack)', score: 54, status: 'Critical Gap', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/40', border: 'border-rose-200', action: '20m Practice Needed' }
    ]
  },
  {
    stream: 'GATE 2027 (IIT Madras)',
    subject: 'Linear Algebra & Engineering Math',
    chapters: [
      { name: 'Determinants & Matrix Rank', score: 94, status: 'Strong', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200' },
      { name: 'Eigenvalues & Diagonalization', score: 58, status: 'Critical Gap', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/40', border: 'border-rose-200', action: 'Prerequisite for PCA' },
      { name: 'Vector Spaces & Basis', score: 72, status: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-200' }
    ]
  }
];

export const WeaknessHeatmap = ({ setActiveTab }) => {
  const [selectedStreamIndex, setSelectedStreamIndex] = useState(0);

  const activeStream = CHAPTER_MASTERY_DATA[selectedStreamIndex];
  const criticalGapsCount = activeStream.chapters.filter(ch => ch.score < 60).length;

  const handleLaunchFixDrill = (chapter) => {
    confetti({ particleCount: 50, spread: 60 });
    toast.success(`Launching 10-Question Targeted Fix Drill for ${chapter.name}!`, {
      description: 'AI has assembled a custom remediation question set.'
    });
    if (setActiveTab) setActiveTab('mockTests', { subject: activeStream.subject });
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-10 animate-fade-in space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#007AFF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 text-xs font-semibold text-[#007AFF]">
            <Target className="w-3.5 h-3.5" />
            <span>AI Weakness Diagnostic Radar & Chapter Heatmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white">
            Pinpoint weak spots before your exams.
          </h1>
          <p className="text-sm text-[#8B949E] leading-relaxed">
            Visual breakdown of syllabus confidence. Launch 1-click targeted drills to turn red gaps into green mastery.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-center shrink-0 relative z-10">
          <div className="text-[10px] text-[#8B949E] font-mono">IDENTIFIED GAPS</div>
          <div className="text-2xl font-bold text-rose-400 font-display">
            {criticalGapsCount} Critical {criticalGapsCount === 1 ? 'Topic' : 'Topics'}
          </div>
        </div>
      </div>

      {/* Stream Tabs */}
      <div className="flex flex-wrap items-center gap-2.5">
        {CHAPTER_MASTERY_DATA.map((st, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedStreamIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedStreamIndex === idx
                ? 'bg-[#007AFF] text-white shadow-sm'
                : 'bg-white dark:bg-white dark:bg-[#1D1D1F] border border-slate-200/80 dark:border-[#AAAAAA]/30 dark:border-white/[0.08] text-slate-700 dark:text-[#8B949E] hover:dark:text-[#F0F6FC] hover:bg-slate-100 dark:hover:bg-[#F5F5F7] dark:bg-white/[0.04]'
            }`}
          >
            {st.stream} — {st.subject}
          </button>
        ))}
      </div>

      {/* Chapter Mastery Matrix */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white dark:bg-[#1D1D1F] border border-slate-200/80 dark:border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-5">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#AAAAAA]/30 dark:border-white/[0.08]">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F0F6FC] font-display">
              {activeStream.subject} Chapter Health
            </h2>
            <div className="text-xs text-slate-500 dark:text-[#8B949E] font-mono">{activeStream.stream}</div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold">
            <span className="text-[#007AFF]">● Strong (≥80%)</span>
            <span className="text-sky-400">● Moderate (60-79%)</span>
            <span className="text-rose-400">● Gap (&lt;60%)</span>
          </div>
        </div>

        <div className="space-y-3">
          {activeStream.chapters.map((ch, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-[#AAAAAA]/30 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#F5F5F7] dark:bg-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#007AFF]/50"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold font-mono text-xs ${
                  ch.score >= 80 ? 'bg-[#007AFF] text-white' :
                  ch.score >= 60 ? 'bg-sky-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {ch.score}%
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-[#F0F6FC] font-display">
                    {ch.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 dark:text-[#8B949E] flex items-center gap-2">
                    <span className={ch.score >= 80 ? 'text-[#007AFF]' : ch.score >= 60 ? 'text-sky-400' : 'text-rose-400'}>
                      Status: {ch.status}
                    </span>
                    {ch.action && <span className="text-rose-400 font-mono">• {ch.action}</span>}
                  </div>
                </div>
              </div>

              {ch.score < 80 && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleLaunchFixDrill(ch)}
                  className="px-4 py-2 rounded-xl bg-[#007AFF] hover:bg-[#5EFCC2] text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch 10-Q Fix Drill</span>
                </motion.button>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

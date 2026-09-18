import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Flame, 
  HelpCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Award, 
  Clock, 
  ArrowRight,
  Calculator,
  Layers,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { StreamExamData } from '../../data/otherStreamsSyllabusData';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface StreamSyllabusViewerProps {
  streamData: StreamExamData;
  setActiveTab?: (tab: string) => void;
  onSelectTopic?: (topic: string) => void;
  onOpenMockTest?: (subject: string, streamId?: string) => void;
  onChangeTrack: () => void;
}

export const StreamSyllabusViewer: React.FC<StreamSyllabusViewerProps> = ({
  streamData,
  setActiveTab,
  onSelectTopic,
  onOpenMockTest,
  onChangeTrack
}) => {
  const [activeSubjectId, setActiveSubjectId] = useState<string>(
    streamData.subjects[0]?.id || ''
  );
  const [activeViewMode, setActiveViewMode] = useState<'blueprint' | 'pyqs' | 'formulas' | 'strategy'>('blueprint');
  const [copiedFormulaIndex, setCopiedFormulaIndex] = useState<number | null>(null);

  const activeSubject = streamData.subjects.find(s => s.id === activeSubjectId) || streamData.subjects[0];

  const handleCopyFormula = (formulaText: string, index: number) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedFormulaIndex(index);
    toast.success('Formula Copied to Clipboard!');
    setTimeout(() => setCopiedFormulaIndex(null), 2000);
  };

  const handleLaunchPractice = (subjectName: string) => {
    if (onOpenMockTest) {
      onOpenMockTest(subjectName, streamData.id);
    } else if (setActiveTab) {
      setActiveTab('mockTests');
    }
  };

  const handleExploreTopic = (topicName: string) => {
    if (onSelectTopic) {
      onSelectTopic(topicName);
    }
    toast.info(`Opening Topic: ${topicName}`, {
      description: 'Generating step-by-step notes and video recommendations...'
    });
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      
      {/* 1. Track Overview Card with Change Track Action */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30 text-xs font-mono font-bold">
              {streamData.boardOrAuthority}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[11px] font-mono">
              {streamData.patternName}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
            {streamData.title}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            {streamData.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#007AFF]" />
              <span><strong>Total:</strong> {streamData.totalMarks} Marks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span><strong>Duration:</strong> {streamData.durationMinutes} Mins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span><strong>Pass:</strong> {streamData.passingThreshold}</span>
            </div>
          </div>
        </div>

        {/* Change Track Action Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={onChangeTrack}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.06] hover:bg-[#30363D] text-white text-xs font-mono font-bold border border-[#AAAAAA]/30 dark:border-white/[0.08] transition-all cursor-pointer shadow-sm"
          >
            <span>🔄 Change Exam Track</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleLaunchPractice(activeSubject.name)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#007AFF] text-white hover:bg-[#00E58D] text-xs font-mono font-bold transition-all cursor-pointer shadow-md shadow-[#007AFF]/25"
          >
            <Flame className="w-4 h-4" />
            <span>Launch Mock Test</span>
          </button>
        </div>
      </div>

      {/* 2. Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08]">
        <button
          type="button"
          onClick={() => setActiveViewMode('blueprint')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            activeViewMode === 'blueprint'
              ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Syllabus & Blueprint</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveViewMode('pyqs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            activeViewMode === 'pyqs'
              ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Top Repeated PYQs ({streamData.topRepeatedPYQs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveViewMode('formulas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            activeViewMode === 'formulas'
              ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Formula & Shortcut Matrix ({streamData.formulaMatrix.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveViewMode('strategy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            activeViewMode === 'strategy'
              ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>30-Day Strategy</span>
        </button>
      </div>

      {/* VIEW 1: SYLLABUS & BLUEPRINT */}
      {activeViewMode === 'blueprint' && (
        <div className="space-y-6">
          {/* Subject Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {streamData.subjects.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setActiveSubjectId(sub.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  activeSubjectId === sub.id
                    ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-md shadow-[#007AFF]/25'
                    : 'bg-[#F5F5F7] dark:bg-white/[0.04] text-neutral-300 border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-neutral-500'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* Active Subject Detail Card */}
          {activeSubject && (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#AAAAAA]/30 dark:border-white/[0.08]">
                <div>
                  <div className="text-[11px] font-mono text-[#007AFF] font-bold uppercase tracking-wider">
                    {activeSubject.category} • {activeSubject.code || 'Official Course Code'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                    {activeSubject.name}
                  </h3>
                  <div className="text-xs text-neutral-400 mt-1">
                    Weightage: <span className="text-white font-mono font-semibold">{activeSubject.weightage}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleLaunchPractice(activeSubject.name)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-mono font-bold transition-all cursor-pointer self-start sm:self-auto"
                >
                  <span>Practice Subject Test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Hardest Module Alert & Pass Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Hardest Concept / Frequent Pitfall:</span>
                  </div>
                  <p className="text-xs text-red-200 leading-relaxed font-sans">
                    {activeSubject.hardestModule}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>High-Yield Strategy & Scoring Tip:</span>
                  </div>
                  <p className="text-xs text-emerald-200 leading-relaxed font-sans">
                    {activeSubject.passTips}
                  </p>
                </div>
              </div>

              {/* Modules & Chapters List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#007AFF]" />
                    <span>Complete Chapters & Curriculum Breakdown ({activeSubject.modules.length} Modules)</span>
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-400">Click any topic to explore notes</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {activeSubject.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleExploreTopic(mod)}
                      className="p-3.5 rounded-xl bg-white dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/50 hover:bg-[#F0F9FF] dark:hover:bg-[#1C2128] transition-all flex items-start justify-between gap-4 cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#EBF5FF] dark:bg-white/[0.06] border border-[#007AFF]/30 dark:border-white/[0.08] text-[11px] font-mono font-bold text-[#007AFF] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#007AFF] group-hover:text-white transition-colors">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-neutral-100 group-hover:text-[#007AFF] transition-colors leading-relaxed font-sans">
                            {mod}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-[#007AFF] shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: TOP REPEATED PYQS */}
      {activeViewMode === 'pyqs' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
              High-Frequency Questions asked repeatedly in past {streamData.title} board/competitive exams.
            </span>
            <span className="text-xs font-mono font-bold text-[#007AFF]">
              Step-Marking Verified
            </span>
          </div>

          <div className="space-y-4">
            {streamData.topRepeatedPYQs.map((pyq) => (
              <div
                key={pyq.id}
                className="p-5 rounded-xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#AAAAAA]/30 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[11px] font-mono font-bold">
                      {pyq.subject}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 font-bold">
                      {pyq.marks} Marks
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    {pyq.frequency}
                  </span>
                </div>

                <p className="text-sm font-medium text-white leading-relaxed whitespace-pre-line">
                  {pyq.question}
                </p>

                <div className="p-3.5 rounded-lg bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-1">
                  <div className="text-[11px] font-mono text-[#007AFF] font-bold uppercase tracking-wider">
                    Expected Step-by-Step Marking Answer Structure:
                  </div>
                  <p className="text-xs text-neutral-300 font-mono leading-relaxed">
                    {pyq.expectedAnswerFormat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: FORMULA & SHORTCUT MATRIX */}
      {activeViewMode === 'formulas' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-300">
              Exam-day formula cheat sheet and numerical shortcuts for {streamData.title}.
            </span>
            <span className="text-xs font-mono text-[#007AFF]">1-Click Copy Supported</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {streamData.formulaMatrix.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-neutral-500 transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-[#007AFF] uppercase tracking-wider">
                    {item.topic}
                  </div>
                  <p className="text-xs font-mono text-white bg-[#F5F5F7] dark:bg-white/[0.04] p-3 rounded-lg border border-[#AAAAAA]/30 dark:border-white/[0.08] leading-relaxed break-words">
                    {item.formula}
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => handleCopyFormula(item.formula, idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.06] hover:bg-[#EBF5FF] dark:hover:bg-[#30363D] text-xs font-mono font-medium text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
                  >
                    {copiedFormulaIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#007AFF]" />
                        <span className="text-[#007AFF] font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: 30-DAY STRATEGY */}
      {activeViewMode === 'strategy' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
              High-yield 30-day revision roadmap designed to maximize marks with minimum stress.
            </span>
            <span className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400">Target: 90%+ Marks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {streamData.thirtyDayPassStrategy.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-2 relative overflow-hidden shadow-2xs"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30 text-xs font-mono font-bold">
                  <span>{step.week}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-neutral-200 font-sans leading-relaxed pt-1">
                  {step.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

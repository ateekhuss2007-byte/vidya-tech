import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Flame, 
  Check, 
  Clock, 
  Calculator, 
  Calendar, 
  FileText, 
  MessageSquare, 
  X, 
  Copy, 
  Layers, 
  ChevronRight 
} from 'lucide-react';
import { StreamExamData } from '../../data/otherStreamsSyllabusData';
import { toast } from 'sonner';

interface StreamSyllabusViewerProps {
  streamData: StreamExamData;
  setActiveTab?: (tab: string) => void;
  onSelectTopic?: (topic: string) => void;
  onOpenMockTest?: (subject: string, streamId?: string) => void;
  onChangeTrack: () => void;
}

// Map topics to their custom icon/emoji
const getTopicIcon = (topicText: string, index: number) => {
  const lower = topicText.toLowerCase();
  if (lower.includes('arithmetic') || lower.includes('percentage')) {
    return <span className="text-sm font-bold text-slate-700 select-none">➕</span>;
  }
  if (lower.includes('interest') || lower.includes('compound') || lower.includes('profit')) {
    return <span className="text-sm select-none">💰</span>;
  }
  if (lower.includes('ratio') || lower.includes('proportion') || lower.includes('partnership')) {
    return <span className="text-sm select-none">📊</span>;
  }
  if (lower.includes('time and work') || lower.includes('pipes')) {
    return <span className="text-sm select-none">🕒</span>;
  }
  if (lower.includes('speed') || lower.includes('distance') || lower.includes('train')) {
    return <span className="text-sm select-none">⚡</span>;
  }
  if (lower.includes('number system') || lower.includes('divisibility') || lower.includes('unit digit')) {
    return <span className="text-sm select-none">🔢</span>;
  }
  if (lower.includes('algebra') || lower.includes('identities')) {
    return <span className="text-sm select-none">📐</span>;
  }
  if (lower.includes('geometry') || lower.includes('triangle') || lower.includes('circle')) {
    return <span className="text-sm select-none">🔺</span>;
  }
  if (lower.includes('mensuration') || lower.includes('cylinder') || lower.includes('cone')) {
    return <span className="text-sm select-none">📦</span>;
  }
  if (lower.includes('data interpretation') || lower.includes('graph') || lower.includes('chart')) {
    return <span className="text-sm select-none">📊</span>;
  }
  
  const fallbacks = ['📘', '⚡', '📐', '🔬', '💡', '📝', '🎯', '🚀'];
  return <span className="text-sm select-none">{fallbacks[index % fallbacks.length]}</span>;
};

// National/Government Crest SVG
const GovtCrestIcon = () => (
  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 border-2 border-amber-300/80 shadow-xs flex items-center justify-center shrink-0 p-0.5">
    <div className="w-full h-full rounded-full border border-amber-400/50 flex items-center justify-center bg-amber-900/60">
      <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-200 fill-current" stroke="none">
        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 4.14-2.73 7.99-6 9-3.27-1.01-6-4.86-6-9V6.43l6-2.25z" />
        <path d="M12 7c-1.66 0-3 1.34-3 3v1h6v-1c0-1.66-1.34-3-3-3zm-1 6v3h2v-3h-2z" />
      </svg>
    </div>
  </div>
);

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
  const [activeModal, setActiveModal] = useState<'pyqs' | 'strategy' | 'formulas' | 'planner' | 'notes' | null>(null);
  const [selectedTopicForNotes, setSelectedTopicForNotes] = useState<string>('');
  const [copiedFormulaIndex, setCopiedFormulaIndex] = useState<number | null>(null);

  const activeSubject = streamData.subjects.find(s => s.id === activeSubjectId) || streamData.subjects[0];

  const handleCopyFormula = (formulaText: string, index: number) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedFormulaIndex(index);
    toast.success('Formula Copied to Clipboard!');
    setTimeout(() => setCopiedFormulaIndex(null), 2000);
  };

  const handleLaunchPractice = (subjectName?: string) => {
    const sub = subjectName || activeSubject.name;
    if (onOpenMockTest) {
      onOpenMockTest(sub, streamData.id);
    } else if (setActiveTab) {
      setActiveTab('mockTests');
    }
  };

  const handleExploreNotesClick = (topicName: string) => {
    setSelectedTopicForNotes(topicName);
    setActiveModal('notes');
    if (onSelectTopic) {
      onSelectTopic(topicName);
    }
  };

  return (
    <div className="w-full space-y-4 font-sans text-slate-800 antialiased">
      
      {/* 1. BREADCRUMBS (Home > SSC CGL > Study Room) */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium px-1">
        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab('home')}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <button
          type="button"
          onClick={onChangeTrack}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          {streamData.title.includes('(') ? streamData.title.replace(/\(.*\)/, '').trim() : streamData.title}
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-semibold">Study Room</span>
      </nav>

      {/* 2. SELECTED TRACK BAR (Exact design from screenshot) */}
      <div className="w-full rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/90 dark:border-white/10 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <GovtCrestIcon />
          <div>
            <div className="text-[11px] font-medium text-slate-500">
              Selected Track:
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {streamData.title.includes('(') ? streamData.title.replace(/\(.*\)/, '').trim() : streamData.title} (Tier-1 & 2)
            </div>
          </div>
        </div>

        {/* Change Track Button (Deep Navy Pill) */}
        <button
          type="button"
          onClick={onChangeTrack}
          className="px-5 py-2 rounded-xl bg-[#0B2545] hover:bg-[#143B66] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          Change Track
        </button>
      </div>


      {/* 4. HEADING & SUBJECT SELECTOR TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
          SSC CGL Tier-1: {activeSubject.name}
        </h1>

        {/* Quick Subject Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {streamData.subjects.map((sub) => (
            <button
              key={sub.id}
              type="button"
              onClick={() => setActiveSubjectId(sub.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubjectId === sub.id
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'bg-white dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-white/10'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>

      {/* 5. TWO-BOX HEADER: LEFT BLUEPRINT + RIGHT RESOURCE CENTER (White Card) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Box: Syllabus & Blueprint */}
        <div className="md:col-span-4 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/90 dark:border-white/10 p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B2545] text-white text-xs font-semibold shadow-xs mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Syllabus & Blueprint</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div>
                Exam Structure: <span className="font-bold text-slate-900 dark:text-white">Tier-1 & 2</span>
              </div>
              <div>
                Duration: <span className="font-bold text-slate-900 dark:text-white">{streamData.durationMinutes} Mins</span>
              </div>
              <div>
                Pass: <span className="font-bold text-slate-900 dark:text-white">{streamData.passingThreshold.replace(/Cutoff typically /i, '').replace(/ depending on category/i, '')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Box: Resource Center (White card with 2 rows of powder-blue pill buttons) */}
        <div className="md:col-span-8 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/90 dark:border-white/10 p-5 shadow-xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-3">
            Resource Center
          </h3>

          <div className="space-y-2.5">
            {/* Row 1: Syllabus & Blueprint, 30-Day Strategy, Top PYQs */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveModal('notes')}
                className="px-4 py-2 rounded-xl bg-[#DFECF4] hover:bg-[#D3E5EE] text-slate-800 text-xs font-semibold transition-all border border-[#CEE0EC] flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>Syllabus & Blueprint</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('strategy')}
                className="px-4 py-2 rounded-xl bg-[#DFECF4] hover:bg-[#D3E5EE] text-slate-800 text-xs font-semibold transition-all border border-[#CEE0EC] flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>30-Day Strategy</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('pyqs')}
                className="px-4 py-2 rounded-xl bg-[#DFECF4] hover:bg-[#D3E5EE] text-slate-800 text-xs font-semibold transition-all border border-[#CEE0EC] flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>Top PYQs</span>
              </button>
            </div>

            {/* Row 2: Formula & Shortcut Matrix, Formula & Matrix */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveModal('formulas')}
                className="px-4 py-2 rounded-xl bg-[#DFECF4] hover:bg-[#D3E5EE] text-slate-800 text-xs font-semibold transition-all border border-[#CEE0EC] flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Calculator className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>Formula & Shortcut Matrix</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('formulas')}
                className="px-4 py-2 rounded-xl bg-[#DFECF4] hover:bg-[#D3E5EE] text-slate-800 text-xs font-semibold transition-all border border-[#CEE0EC] flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Calculator className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>Formula & Matrix</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. MAIN TWO-COLUMN SECTION (Left Topic Rows + Right Test & Performance Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start pt-1">
        
        {/* LEFT COLUMN: TOPIC ROWS */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-2">
          {activeSubject.modules.map((moduleStr, idx) => {
            const isFirstRow = idx === 0;

            return (
              <div
                key={idx}
                className="w-full p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
              >
                {/* Left Side: Layout matching screenshot */}
                {isFirstRow ? (
                  /* Row 1 layout: "+ Arithmetic" on left and dark black capsule in middle */
                  <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      <span className="text-slate-400">➕</span>
                      <span>Arithmetic</span>
                    </div>

                    <div className="px-4 py-1.5 rounded-full bg-[#111827] text-white text-xs font-medium max-w-full truncate shadow-xs">
                      Percentage, Profit & Loss (e.g., Fraction to % values, ...)
                    </div>
                  </div>
                ) : (
                  /* Rows 2 to 10: Icon + Topic description */
                  <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      {getTopicIcon(moduleStr, idx)}
                    </div>

                    <div className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 font-medium leading-relaxed break-words flex-1">
                      {moduleStr}
                    </div>
                  </div>
                )}

                {/* Right Side: Status Indicator + Explore Notes + Take Quiz */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  
                  {/* Status Indicator (Green circle checkmark or status dot) */}
                  {idx >= 4 ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-2 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0"></div>
                  )}

                  {/* Explore Notes Button */}
                  <button
                    type="button"
                    onClick={() => handleExploreNotesClick(moduleStr)}
                    className="px-3.5 py-1.5 rounded-full bg-white dark:bg-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-white/15 transition-all shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    Explore Notes
                  </button>

                  {/* Take Quiz Button */}
                  <button
                    type="button"
                    onClick={() => handleLaunchPractice(activeSubject.name)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap ${
                      idx === 1 || idx === 3 || idx === 5
                        ? 'bg-[#B0894A] hover:bg-[#9B753A] text-white'
                        : 'bg-[#0B2545] hover:bg-[#143B66] text-white'
                    }`}
                  >
                    Take Quiz
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: TEST & PERFORMANCE CARD */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          
          <div className="rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/90 dark:border-white/10 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Test & Performance
            </h3>

            {/* Segmented Progress Dashes (4 dark navy, 2 light blue) */}
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 flex-1 rounded-full bg-[#0B2545]"></div>
              <div className="h-1.5 flex-1 rounded-full bg-[#0B2545]"></div>
              <div className="h-1.5 flex-1 rounded-full bg-[#0B2545]"></div>
              <div className="h-1.5 flex-1 rounded-full bg-[#0B2545]"></div>
              <div className="h-1.5 flex-1 rounded-full bg-sky-200 dark:bg-slate-700"></div>
              <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-800"></div>
            </div>

            {/* Score Box */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] space-y-1">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                Avg Score: 180
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Accuracy: 92%
              </div>
            </div>

            {/* Launch Sectional Test Button */}
            <button
              type="button"
              onClick={() => handleLaunchPractice(activeSubject.name)}
              className="w-full py-2.5 px-4 rounded-full bg-[#0B2545] hover:bg-[#143B66] text-white text-xs font-bold text-center transition-all shadow-sm cursor-pointer"
            >
              Launch Sectional Test
            </button>
          </div>

        </div>
      </div>

      {/* 7. FLOATING BOTTOM-RIGHT SUPPORT WIDGET (Exact match from screenshot) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <div className="bg-white dark:bg-[#1E232A] border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-xl shadow-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex flex-col items-start leading-tight">
          <button 
            type="button" 
            onClick={() => handleLaunchPractice(activeSubject.name)} 
            className="hover:text-[#0B2545] cursor-pointer"
          >
            Practice
          </button>
          <button 
            type="button" 
            onClick={() => toast.info('Vidya AI Support Assistant is online!')} 
            className="hover:text-[#0B2545] cursor-pointer"
          >
            Support
          </button>
        </div>

        <button
          type="button"
          onClick={() => toast.info('How can we help your preparation today?')}
          className="w-11 h-11 rounded-full bg-[#0B2545] hover:bg-[#143B66] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer border border-white/10"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
        </button>
      </div>

      {/* =========================================================================
          MODALS / DRAWERS
          ========================================================================= */}

      {/* MODAL 1: TOP REPEATED PYQS */}
      {activeModal === 'pyqs' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E232A] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-[#0B2545] text-white">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Top Repeated PYQs ({streamData.title})</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {streamData.topRepeatedPYQs.map((pyq) => (
                <div
                  key={pyq.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0B2545]/10 text-[#0B2545] dark:text-sky-300 text-[11px] font-bold">
                      {pyq.subject}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {pyq.frequency}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-line">
                    {pyq.question}
                  </p>

                  <div className="p-3 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Expected Answer / Solution:</div>
                    {pyq.expectedAnswerFormat}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#143B66] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: 30-DAY STRATEGY */}
      {activeModal === 'strategy' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E232A] rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-[#0B2545] text-white">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">30-Day Master Preparation Strategy</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3">
              {streamData.thirtyDayPassStrategy.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-1.5"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B2545] text-white text-[11px] font-bold">
                    {step.week}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                    {step.focus}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#143B66] cursor-pointer"
              >
                Close Roadmap
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: FORMULA & SHORTCUT MATRIX */}
      {activeModal === 'formulas' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E232A] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-[#0B2545] text-white">
              <div className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-base">Formula & Shortcut Matrix</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto grid grid-cols-1 gap-3">
              {streamData.formulaMatrix.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B2545] dark:text-sky-300 uppercase tracking-wider">
                      {item.topic}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyFormula(item.formula, idx)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedFormulaIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs font-mono bg-white dark:bg-black/30 p-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-100 break-words leading-relaxed">
                    {item.formula}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#143B66] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: INSTANT TOPIC NOTES */}
      {activeModal === 'notes' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E232A] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-[#0B2545] text-white">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Study Notes & Formula Blueprint</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div>
                <div className="text-[11px] font-bold text-[#0B2545] dark:text-sky-300 uppercase tracking-wide">
                  Topic Deep Dive
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedTopicForNotes || 'Arithmetic & Algebra'}
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                <p>
                  <strong>Core Examination Concept:</strong> Master this unit by solving standard patterns with speed shortcuts instead of lengthy algebraic equations. Focus on fraction-to-percentage conversions and ratio cross-multiplication.
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
                  <div>⚡ <strong>Golden Shortcut:</strong> For successive changes of a% and b%, Net Change = a + b + (ab / 100)%</div>
                  <div>⚡ <strong>Fraction Table:</strong> 1/6 = 16.66%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    handleLaunchPractice(activeSubject.name);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0B2545] hover:bg-[#143B66] text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Yourself on This Topic</span>
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-100 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Close Notes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

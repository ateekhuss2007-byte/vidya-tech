import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Copy, 
  Check, 
  Award, 
  Clock, 
  ArrowRight,
  Calculator,
  Calendar,
  RotateCcw,
  ChevronDown,
  FileText,
  Plus,
  MessageSquare,
  ShieldCheck,
  X,
  TrendingUp,
  Percent,
  Hash,
  Layers,
  Search,
  ExternalLink,
  Zap
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
  
  // Fallback sequential emojis
  const fallbacks = ['📘', '⚡', '📐', '🔬', '💡', '📝', '🎯', '🚀', '⭐'];
  return <span className="text-sm select-none">{fallbacks[index % fallbacks.length]}</span>;
};

// National/Government Crest SVG
const GovtCrestIcon = () => (
  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 border-2 border-amber-300/80 shadow-md flex items-center justify-center shrink-0 p-1">
    <div className="w-full h-full rounded-full border border-amber-400/50 flex items-center justify-center bg-amber-900/60">
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-200 fill-current" stroke="none">
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'pyqs' | 'strategy' | 'formulas' | 'planner' | 'notes' | null>(null);
  const [selectedTopicForNotes, setSelectedTopicForNotes] = useState<string>('');
  const [copiedFormulaIndex, setCopiedFormulaIndex] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      
      {/* 1. TOP NAVY BANNER (Exact screenshot match) */}
      <div className="w-full rounded-2xl bg-[#0B2545] text-white px-4 sm:px-6 py-3 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-[#16365C]">
        <div className="text-xs sm:text-[13px] text-slate-200 font-medium leading-snug flex-1 pr-2">
          Welcome Learner! Sign in to access all university syllabus notes, step-marked PYQs, and your cognitive to...
        </div>

        {/* Right Recent Activity Pill */}
        <div className="bg-[#123862] hover:bg-[#18467A] transition-colors border border-white/10 rounded-xl px-3.5 py-2 flex items-center gap-3 shrink-0 cursor-pointer shadow-xs">
          <RotateCcw className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <div className="text-left">
            <div className="text-xs font-bold text-white leading-tight">
              Recent Activity: Percentages Part 1
            </div>
            <div className="text-[10px] text-slate-300 leading-tight flex items-center gap-2 mt-0.5">
              <span>Last viewed: Percentages Part 1</span>
              <span className="text-slate-400 font-mono">Examples: Teon...</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SELECTED PREPARATION TRACK CARD */}
      <div className="relative z-30 w-full rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/90 dark:border-white/10 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left Track Info */}
        <div className="flex items-start sm:items-center gap-3.5">
          <GovtCrestIcon />
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Selected Preparation Track:
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {streamData.title.includes('(') ? streamData.title.replace(/\(.*\)/, '').trim() : streamData.title} (Tier-1 & Tier-2)
            </h2>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {streamData.boardOrAuthority}
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-slate-500 dark:text-slate-400">
                SSC CGL Tier-1 over: 200 Questions, 205 Minutes
              </span>
            </div>
          </div>
        </div>

        {/* Right: Refined menu menu dropdown button */}
        <div className="relative self-stretch sm:self-auto" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.1] text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/15 transition-all shadow-xs cursor-pointer"
          >
            <span>Refined menu menu</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Open Dropdown Modal Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-[#1E232A] border border-slate-200 dark:border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onChangeTrack();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Change Track (B.Tech / 10th / 12th / SSC / JEE / GATE)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onChangeTrack();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer pl-7"
                >
                  Change Track (B.Tech / 10th / 12th / JEE / GATE)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onChangeTrack();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-slate-400">⇆</span>
                  <span>Change Track (B.Tech / 10th / SEC / JEE / GATE)</span>
                </button>
              </div>

              <div className="my-1.5 border-t border-slate-200 dark:border-white/10" />

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleExploreNotesClick('Arithmetic: Percentage, Profit & Loss');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Percentages Part 1</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveModal('planner');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Study Planner</span>
                </button>

                <div className="px-3 py-2 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Staff Selection Commission (Govt. Ind)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SUBJECT SELECTOR TABS (Seamless switching between Quant, Reasoning, English, GA) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {streamData.subjects.map((sub) => (
          <button
            key={sub.id}
            type="button"
            onClick={() => setActiveSubjectId(sub.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSubjectId === sub.id
                ? 'bg-[#0B2545] text-white shadow-sm'
                : 'bg-white dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* 3. SECTION TITLE */}
      <div className="pt-1">
        <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
          SSC CGL Tier-1: {activeSubject.name}
        </h1>
      </div>

      {/* 4. TWO-BOX RESOURCE HEADER (Left Blueprint + Right Deep Navy Featured Resources) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Box: Syllabus & Blueprint */}
        <div className="md:col-span-4 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/90 dark:border-white/10 p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold shadow-xs mb-3">
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

        {/* Right Box: Featured Resources (Deep Navy Card with 4 Pills in 2x2 Grid) */}
        <div className="md:col-span-8 rounded-2xl bg-[#0B2545] text-white p-5 shadow-sm border border-[#16365C] flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white tracking-wide mb-3">
            Featured Resources
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Pill 1: Top Repeated PYQs */}
            <button
              type="button"
              onClick={() => setActiveModal('pyqs')}
              className="px-4 py-2.5 rounded-full bg-[#E4EEF8] hover:bg-white text-[#0B2545] text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <FileText className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
              <span className="truncate">Top Repeated PYQs: 1-135</span>
            </button>

            {/* Pill 2: 30-Day Strategy */}
            <button
              type="button"
              onClick={() => setActiveModal('strategy')}
              className="px-4 py-2.5 rounded-full bg-[#E4EEF8] hover:bg-white text-[#0B2545] text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
              <span className="truncate">30-Day Strategy</span>
            </button>

            {/* Pill 3: Formula & Shortcut Matrix */}
            <button
              type="button"
              onClick={() => setActiveModal('formulas')}
              className="px-4 py-2.5 rounded-full bg-[#E4EEF8] hover:bg-white text-[#0B2545] text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <Calculator className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
              <span className="truncate">Formula & Shortcut Matrix</span>
            </button>

            {/* Pill 4: Study Planner */}
            <button
              type="button"
              onClick={() => setActiveModal('planner')}
              className="px-4 py-2.5 rounded-full bg-[#E4EEF8] hover:bg-white text-[#0B2545] text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
              <span className="truncate">Study Planner</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. MAIN TWO-COLUMN CONTENT (Left Topic Rows + Right Test & Performance Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start pt-1">
        
        {/* LEFT COLUMN: TOPIC ROWS (~75% on large screens) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-2">
          {activeSubject.modules.map((moduleStr, idx) => (
            <div
              key={idx}
              className="w-full p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
            >
              {/* Left Side: Topic Emoji/Icon + Title */}
              <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  {getTopicIcon(moduleStr, idx)}
                </div>

                <div className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 font-medium leading-relaxed break-words flex-1">
                  {moduleStr}
                </div>
              </div>

              {/* Right Side: Status Badge + Explore Notes + Take Quiz */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                
                {/* Status indicator: green checkmark */}
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>

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
                  className="px-4 py-1.5 rounded-full bg-[#0B2545] hover:bg-[#143B66] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                >
                  Take Quiz
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: TEST & PERFORMANCE CARD (~25% on large screens) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          
          <div className="rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/90 dark:border-white/10 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Test & Performance
            </h3>

            {/* Segmented Progress Dashes (4 filled dark blue, 2 light blue/gray) */}
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

            {/* Launch Sectional Test Pill Button */}
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

      {/* 6. FLOATING BOTTOM BUTTONS (Practice Tests & Support) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 shadow-xl">
        <button
          type="button"
          onClick={() => handleLaunchPractice(activeSubject.name)}
          className="px-4 py-2 rounded-xl bg-[#0B2545] hover:bg-[#143B66] text-white text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center gap-2 border border-white/10"
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Practice Tests</span>
        </button>

        <button
          type="button"
          onClick={() => toast.info('Vidya AI Support & Mentor Assistant is ready to help!')}
          className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center gap-1.5 border border-white/10"
        >
          <span>Support</span>
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>

      {/* =========================================================================
          MODALS / DRAWERS FOR FEATURED RESOURCES
          ========================================================================= */}

      {/* MODAL 1: TOP REPEATED PYQS */}
      {activeModal === 'pyqs' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E232A] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-[#0B2545] text-white">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Top Repeated PYQs: 1-135 ({streamData.title})</h3>
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

      {/* MODAL 4: STUDY PLANNER */}
      {activeModal === 'planner' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E232A] rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-[#0B2545] text-white">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Personalized Study Planner</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-5 space-y-3 overflow-y-auto text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-blue-900 dark:text-blue-200 leading-relaxed">
                🎯 <strong>Daily Target:</strong> 2 Topics Notes Revision + 1 Sectional Speed Quiz (25 Questions in 18 mins).
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-100">Morning Session (7:00 AM - 9:00 AM)</div>
                <p>Arithmetic speed tricks, fraction tables (1/2 to 1/20), and 50 quantitative mental calculation shortcuts.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-100">Evening Session (6:00 PM - 8:00 PM)</div>
                <p>Reasoning puzzles, syllogisms, and SSC CGL previous year papers simulation with negative mark analysis.</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#143B66] cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: INSTANT TOPIC NOTES */}
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
                  {selectedTopicForNotes}
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

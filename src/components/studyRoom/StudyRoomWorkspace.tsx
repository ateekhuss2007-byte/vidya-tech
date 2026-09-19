/**
 * ============================================================================
 * VIDYA AI — Study Room Workspace (Apple Developer / Linear Canvas)
 * ============================================================================
 * Minimalist, high-readability study canvas:
 * - Sticky header with breadcrumbs, action triggers, and Apple-style mode tabs
 * - Fluid motion.dev active indicator bar
 * - 100% independent scroll with overscroll-contain and data-lenis-prevent
 * ============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Flame, 
  Layers, 
  Award, 
  Clock, 
  Copy, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Calculator, 
  Calendar, 
  AlertTriangle, 
  FlaskConical, 
  GraduationCap, 
  Menu,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';
import { UnifiedSubject, UnifiedUnit } from './studyRoomAdapter';
import { TopicDeepDiveSection } from '../collegeHub/TopicDeepDiveSection';
import { HandwrittenNotesViewer } from './HandwrittenNotesViewer';
import { getUniversityHandwrittenNotes } from '../../data/handwrittenNotesData';

export type StudyRoomMode = 'syllabus' | 'handwritten' | 'deepDive' | 'pyqs' | 'formulas' | 'strategy' | 'practice';

interface StudyRoomWorkspaceProps {
  trackTitle: string;
  stageTitle: string | number;
  subject: UnifiedSubject;
  activeUnitId: string | null;
  activeMode: StudyRoomMode;
  collegeName?: string;
  onSelectUnit: (unitId: string | null) => void;
  onSelectMode: (mode: StudyRoomMode) => void;
  onOpenMockTest?: (subjectName: string, streamId?: string) => void;
  onOpenMobileDrawer?: () => void;
}

export const StudyRoomWorkspace: React.FC<StudyRoomWorkspaceProps> = ({
  trackTitle,
  stageTitle,
  subject,
  activeUnitId,
  activeMode,
  collegeName,
  onSelectUnit,
  onSelectMode,
  onOpenMockTest,
  onOpenMobileDrawer
}) => {
  const [copiedFormulaIndex, setCopiedFormulaIndex] = useState<number | null>(null);
  const [pyqMarkFilter, setPyqMarkFilter] = useState<'all' | 2 | 5 | 10>('all');
  const [showObjectives, setShowObjectives] = useState(false);

  // Reading scale: default 'large' so reading is comfortable as requested
  const [textScale, setTextScale] = useState<'normal' | 'large' | 'xlarge'>(() => {
    return (localStorage.getItem('vidya_reading_scale') as any) || 'large';
  });

  const handleScaleChange = (scale: 'normal' | 'large' | 'xlarge') => {
    setTextScale(scale);
    localStorage.setItem('vidya_reading_scale', scale);
    toast.success(
      scale === 'normal'
        ? 'Reading size: Standard (100%)'
        : scale === 'large'
          ? 'Reading size: Large (115% — Easy Reading)'
          : 'Reading size: Extra Large (130% — Maximum Readability)'
    );
  };

  const activeUnit = subject.units.find(u => u.id === activeUnitId);

  const handleCopyFormula = (formulaText: string, index: number) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedFormulaIndex(index);
    toast.success('Formula Copied to Clipboard!');
    setTimeout(() => setCopiedFormulaIndex(null), 2000);
  };

  const handleCopySyllabus = () => {
    const syllabusText = `${subject.code}: ${subject.name}\n` +
      subject.units.map(u => `Unit ${u.unitNumber}: ${u.title}\n${u.topics.join(', ')}`).join('\n\n');
    navigator.clipboard.writeText(syllabusText);
    toast.success('Unit Syllabus Copied to Clipboard!');
  };

  const handleLaunchDeepDive = (queryText: string) => {
    onSelectMode('deepDive');
    toast.info(`Generating AI Deep Dive: ${queryText}`, {
      description: 'Assembling interactive proofs, video lectures, and viva cards...'
    });
  };

  const handleLaunchMockExam = () => {
    if (onOpenMockTest) {
      onOpenMockTest(subject.name);
    } else {
      onSelectMode('practice');
    }
  };

  const filteredPyqs = subject.pyqs.filter(q => {
    if (pyqMarkFilter === 'all') return true;
    return q.marks === pyqMarkFilter;
  });

  const handwrittenNotes = React.useMemo(() => {
    return getUniversityHandwrittenNotes(
      subject.code || subject.id,
      trackTitle,
      subject.category,
      typeof stageTitle === 'number' ? stageTitle : undefined
    );
  }, [subject, trackTitle, stageTitle]);

  const modeTabs: { id: StudyRoomMode; label: string; icon: any; count?: number | string }[] = [
    { id: 'syllabus', label: 'Syllabus & Units', icon: BookOpen, count: subject.units.length },
    { id: 'handwritten', label: "✍️ Topper's Notes", icon: FileText, count: `${handwrittenNotes.pdfPagesCount}p` },
    { id: 'deepDive', label: 'AI Deep Dive', icon: Sparkles },
    { id: 'pyqs', label: 'Exam PYQs', icon: Flame, count: subject.pyqs.length },
    { id: 'formulas', label: 'Formula Vault', icon: Calculator, count: subject.formulas.length },
    { id: 'strategy', label: 'Pass Strategy', icon: Calendar },
    { id: 'practice', label: 'Mock Exam', icon: Award }
  ];

  return (
    <main 
      data-lenis-prevent="true"
      className="flex-1 min-w-0 h-full overflow-y-auto overscroll-contain bg-white dark:bg-[#111112] flex flex-col custom-scrollbar"
    >
      {/* 1. STICKY DOCKED CANVAS HEADER */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#111112]/95 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.08] px-6 sm:px-8 py-3.5 space-y-3 shrink-0">
        
        {/* Top Breadcrumb & Mobile Menu Trigger */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 flex-wrap">
            <span className="font-semibold text-neutral-600 dark:text-neutral-300">{trackTitle}</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600" />
            <span>{typeof stageTitle === 'number' ? `Semester ${stageTitle}` : stageTitle}</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600" />
            <span className="font-bold text-[#007AFF]">{subject.code}</span>
            {activeUnit && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600" />
                <span className="px-2 py-0.5 rounded bg-[#007AFF]/10 text-[#007AFF] font-bold">
                  Unit {activeUnit.unitNumber}
                </span>
              </>
            )}
          </div>

          {onOpenMobileDrawer && (
            <button
              type="button"
              onClick={onOpenMobileDrawer}
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] text-xs font-mono text-neutral-600 dark:text-neutral-300"
            >
              <Menu className="w-4 h-4" />
              <span>Courses</span>
            </button>
          )}
        </div>

        {/* Subject Title & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                {subject.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-xs font-mono text-neutral-500 font-semibold">
                {subject.creditsOrMarks}
              </span>
            </div>

            {activeUnit ? (
              <p className="text-sm text-neutral-500 mt-1 flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[#007AFF]">Unit {activeUnit.unitNumber}:</span>
                <span className="font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{activeUnit.title}</span>
                <button
                  type="button"
                  onClick={() => onSelectUnit(null)}
                  className="text-xs font-mono text-[#007AFF] hover:underline ml-1 cursor-pointer font-semibold"
                >
                  (View All Units)
                </button>
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5 font-mono">
                {subject.category} • {subject.contactHours || 'Standard University Curriculum'}
              </p>
            )}
          </div>

          {/* Subtle Utilities (Zoom & Copy) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Reading Font Scaler (Aa) */}
            <div className="flex items-center rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-0.5 border border-black/[0.06] dark:border-white/[0.08]" title="Reading Text Size">
              <button
                type="button"
                onClick={() => handleScaleChange('normal')}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  textScale === 'normal'
                    ? 'bg-white dark:bg-[#252528] text-[#007AFF] shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="Standard Text Size (100%)"
              >
                Aa
              </button>
              <button
                type="button"
                onClick={() => handleScaleChange('large')}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  textScale === 'large'
                    ? 'bg-white dark:bg-[#252528] text-[#007AFF] shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="Large Text (115%)"
              >
                Aa+
              </button>
              <button
                type="button"
                onClick={() => handleScaleChange('xlarge')}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-extrabold transition-all cursor-pointer ${
                  textScale === 'xlarge'
                    ? 'bg-white dark:bg-[#252528] text-[#007AFF] shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="Extra Large (130%)"
              >
                Aa++
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopySyllabus}
              className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors cursor-pointer border border-black/[0.04] dark:border-white/[0.06]"
              title="Copy Course Syllabus"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Apple Underline Mode Tabs */}
        <div className="flex items-center gap-7 overflow-x-auto custom-scrollbar border-t border-black/[0.06] dark:border-white/[0.06] pt-1.5 -mb-1">
          {modeTabs.map((tab) => {
            const isActive = activeMode === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectMode(tab.id)}
                className={`relative py-2.5 text-sm sm:text-base font-semibold transition-colors cursor-pointer select-none shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'text-[#007AFF] font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-xs px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-[#007AFF]/10 text-[#007AFF] font-bold' : 'text-neutral-400'
                  }`}>
                    {tab.count}
                  </span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="activeStudyTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#007AFF]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN READING & STUDY CANVAS WITH DYNAMIC FONT ZOOM */}
      <div className={`p-6 sm:p-8 max-w-5xl mx-auto w-full space-y-8 flex-1 ${
        textScale === 'xlarge' 
          ? 'text-lg [&_p]:text-lg [&_li]:text-base [&_.reading-text]:text-lg' 
          : textScale === 'large' 
            ? 'text-[15px] [&_p]:text-[15px] [&_li]:text-sm [&_.reading-text]:text-[15px]' 
            : 'text-sm [&_p]:text-sm [&_li]:text-xs [&_.reading-text]:text-sm'
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${subject.id}-${activeMode}-${activeUnitId || 'all'}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* ===============================================================
                MODE 1: SYLLABUS & UNITS
                =============================================================== */}
            {activeMode === 'syllabus' && (
              <div className="space-y-6">
                
                {/* Objectives & Outcomes (Clean Collapsible Accordion to prevent clutter) */}
                {(subject.courseObjectives || subject.courseOutcomes) && (
                  <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] overflow-hidden bg-[#FBFBFC] dark:bg-[#18181A]">
                    <button
                      type="button"
                      onClick={() => setShowObjectives(prev => !prev)}
                      className="w-full flex items-center justify-between px-5 py-3 text-left cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors select-none"
                    >
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#007AFF] font-semibold">
                        <GraduationCap className="w-4 h-4" />
                        <span>Course Learning Objectives & Outcomes</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                        <span>{showObjectives ? 'Collapse' : 'Expand Details'}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showObjectives ? 'rotate-90' : ''}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {showObjectives && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-5 pb-5 pt-1 space-y-4 border-t border-black/[0.04] dark:border-white/[0.04]"
                        >
                          {subject.courseObjectives && subject.courseObjectives.length > 0 && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                              {subject.courseObjectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-[#007AFF] font-bold text-base leading-none">•</span>
                                  <span>{obj}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {subject.courseOutcomes && subject.courseOutcomes.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                              {subject.courseOutcomes.map((co, i) => (
                                <div key={i} className="p-3 rounded-xl bg-white dark:bg-[#121214] border border-black/[0.04] dark:border-white/[0.04]">
                                  <span className="px-1.5 py-0.5 rounded bg-[#007AFF]/10 text-[#007AFF] text-[11px] font-mono font-bold">
                                    {co.co}
                                  </span>
                                  <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans mt-1 leading-relaxed">
                                    {co.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Units List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#007AFF]" />
                      <span>Unit Breakdown ({subject.units.length} Modules)</span>
                    </h3>
                  </div>

                  <div className="space-y-3.5">
                    {subject.units.map((unit) => {
                      const isSelectedUnit = activeUnitId === unit.id;

                      return (
                        <div
                          key={unit.id}
                          className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                            isSelectedUnit
                              ? 'bg-white dark:bg-[#18181A] border-[#007AFF] shadow-sm ring-1 ring-[#007AFF]/30'
                              : 'bg-white dark:bg-[#18181A] border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.15]'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.04] dark:border-white/[0.04]">
                            <div 
                              onClick={() => onSelectUnit(isSelectedUnit ? null : unit.id)}
                              className="flex items-center gap-2.5 flex-wrap cursor-pointer group"
                            >
                              <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md transition-colors ${
                                isSelectedUnit 
                                  ? 'bg-[#007AFF] text-white' 
                                  : 'bg-[#007AFF]/10 text-[#007AFF] group-hover:bg-[#007AFF]/20'
                              }`}>
                                Unit {unit.unitNumber}
                              </span>
                              <h4 className="font-display font-bold text-base sm:text-lg text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#007AFF] transition-colors">
                                {unit.title}
                              </h4>
                              {unit.contactHours && (
                                <span className="text-xs font-mono text-neutral-400">
                                  ({unit.contactHours})
                                </span>
                              )}
                              {unit.isHardest && (
                                <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                                  <Flame className="w-3 h-3" /> High Yield
                                </span>
                              )}
                            </div>

                            {/* Clean Minimal Action Buttons */}
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  onSelectUnit(unit.id);
                                  onSelectMode('handwritten');
                                }}
                                className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/25 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                                title="Read Topper Handwritten Notebook for this unit"
                              >
                                <span>✍️ Notes</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleLaunchDeepDive(`${subject.name}: ${unit.title}`)}
                                className="px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-[#007AFF]/10 hover:text-[#007AFF] text-neutral-600 dark:text-neutral-300 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
                                <span>AI Study</span>
                              </button>
                            </div>
                          </div>

                          {/* Topics List with Large, Readable Chips */}
                          <div className="pt-4 flex flex-wrap gap-2">
                            {unit.topics.map((t, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleLaunchDeepDive(`${subject.name} - ${t}`)}
                                className="px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-[#007AFF]/10 hover:text-[#007AFF] text-sm sm:text-[15px] font-medium text-neutral-700 dark:text-neutral-200 transition-colors text-left cursor-pointer leading-relaxed border border-black/[0.03] dark:border-white/[0.03]"
                              >
                                • {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Prescribed Textbooks */}
                {(subject.textbooks || subject.referenceBooks) && (
                  <div className="p-6 rounded-2xl bg-[#FBFBFC] dark:bg-[#18181A] border border-black/[0.06] dark:border-white/[0.08] space-y-3.5">
                    <span className="text-xs sm:text-sm font-mono font-bold text-neutral-500 uppercase tracking-wider">
                      Prescribed Textbooks & References
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                      {subject.textbooks?.map((tb, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-[#121214] border border-black/[0.04] dark:border-white/[0.04] text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2.5 leading-relaxed">
                          <span className="text-[#007AFF] font-bold font-mono">[{idx + 1}]</span>
                          <span>{tb}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ===============================================================
                MODE: TOPPER'S HANDWRITTEN NOTES (Notebook Paper Style)
                =============================================================== */}
            {activeMode === 'handwritten' && (
              <HandwrittenNotesViewer
                notesData={handwrittenNotes}
                subjectName={subject.name}
                subjectCode={subject.code}
                universityName={trackTitle}
                collegeName={collegeName}
                activeUnitId={activeUnitId}
              />
            )}

            {/* ===============================================================
                MODE 2: AI DEEP DIVE & NOTES
                =============================================================== */}
            {activeMode === 'deepDive' && (
              <div className="space-y-4">
                <TopicDeepDiveSection
                  initialQuery={activeUnit ? `${subject.name} - ${activeUnit.title}` : subject.name}
                />
              </div>
            )}

            {/* ===============================================================
                MODE 3: PREVIOUS YEAR QUESTIONS (PYQS)
                =============================================================== */}
            {activeMode === 'pyqs' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.06] flex-wrap gap-2">
                  <span className="font-display font-extrabold text-base sm:text-lg text-[#1D1D1F] dark:text-[#F5F5F7]">
                    High-Yield Exam Questions ({filteredPyqs.length})
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-mono text-neutral-400 mr-1.5">Marks Filter:</span>
                    {(['all', 2, 5, 10] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPyqMarkFilter(m)}
                        className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                          pyqMarkFilter === m
                            ? 'bg-[#007AFF] text-white'
                            : 'bg-black/[0.04] dark:bg-white/[0.06] text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                      >
                        {m === 'all' ? 'All' : `${m}M`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredPyqs.map((pyq, i) => (
                    <div
                      key={pyq.id || i}
                      className="p-6 rounded-2xl bg-white dark:bg-[#18181A] border border-black/[0.06] dark:border-white/[0.08] space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 rounded-lg bg-[#007AFF]/10 text-[#007AFF] font-mono text-xs sm:text-sm font-bold">
                            {pyq.marks} Marks
                          </span>
                          <span className="text-xs sm:text-sm font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1 font-bold">
                            <Flame className="w-3.5 h-3.5" /> {pyq.frequency}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleLaunchDeepDive(`${subject.name}: ${pyq.question}`)}
                          className="text-xs sm:text-sm font-mono font-bold text-[#007AFF] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Solve with AI →</span>
                        </button>
                      </div>

                      {/* Large, Easy to Read Question Text */}
                      <p className="text-base sm:text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] font-sans leading-relaxed pt-1">
                        {pyq.question}
                      </p>

                      {pyq.expectedAnswerFormat && (
                        <div className="p-4 rounded-xl bg-[#FBFBFC] dark:bg-[#121214] text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed border border-black/[0.03] dark:border-white/[0.04]">
                          <span className="font-bold text-neutral-800 dark:text-neutral-200 font-mono">Step Rubric: </span>
                          {pyq.expectedAnswerFormat}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                MODE 4: FORMULA VAULT
                =============================================================== */}
            {activeMode === 'formulas' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subject.formulas.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white dark:bg-[#18181A] border border-black/[0.06] dark:border-white/[0.08] space-y-3 flex flex-col justify-between shadow-xs"
                    >
                      <div className="space-y-2">
                        <div className="text-xs sm:text-sm font-mono text-[#007AFF] font-bold">
                          {item.topic}
                        </div>
                        {/* Large, High-Contrast Equation Box */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-[#FBFBFC] dark:bg-[#121214] font-mono text-base sm:text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] overflow-x-auto border border-black/[0.03] dark:border-white/[0.04]">
                          <code>{item.formula}</code>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyFormula(item.formula, idx)}
                        className="self-end flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] text-[#007AFF] text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer hover:bg-[#007AFF]/10"
                      >
                        {copiedFormulaIndex === idx ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Formula</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                MODE 5: PASS STRATEGY
                =============================================================== */}
            {activeMode === 'strategy' && (
              <div className="space-y-5">
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-sm sm:text-base text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
                  <strong>30-Day Tactical Guideline: </strong>
                  {subject.passTips || 'Focus on high-weightage modules first. Practice 10-mark PYQs and derivation proofs.'}
                </div>

                <div className="space-y-3">
                  {subject.strategy.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white dark:bg-[#18181A] border border-black/[0.06] dark:border-white/[0.08] flex items-start gap-4 shadow-xs"
                    >
                      <span className="font-mono font-bold text-xs sm:text-sm text-[#007AFF] px-3 py-1 rounded-lg bg-[#007AFF]/10 shrink-0">
                        {step.week}
                      </span>
                      <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed">
                        {step.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                MODE 6: PRACTICE MOCK EXAM
                =============================================================== */}
            {activeMode === 'practice' && (
              <div className="p-10 rounded-2xl bg-[#FBFBFC] dark:bg-[#18181A] border border-black/[0.06] dark:border-white/[0.08] text-center space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center mx-auto">
                  <Award className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-xl text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Take {subject.code} Mock Exam
                  </h3>
                  <p className="text-sm text-neutral-500 font-sans max-w-sm mx-auto leading-relaxed">
                    Test your speed and accuracy with simulated university pattern questions, timed environment, and instant AI grading.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLaunchMockExam}
                  className="px-6 py-3 rounded-xl bg-[#007AFF] hover:bg-[#007AFF]/90 text-white font-mono font-bold text-sm transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.98]"
                >
                  Start {subject.code} Exam Simulation →
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

    </main>
  );
};

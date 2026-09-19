/**
 * ============================================================================
 * VIDYA AI — Study Room Navigator (Linear / Apple-Grade Sidebar)
 * ============================================================================
 * Sleek, distraction-free hierarchical explorer:
 * - Clean border-r studio sidebar layout
 * - Real-time fuzzy filter across course names, codes, and module topics
 * - Clean tree view with collapsible modules and active unit selection
 * - 100% independent scroll with overscroll-contain & data-lenis-prevent
 * ============================================================================
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Flame, 
  Layers, 
  CheckCircle2,
  Clock,
  Sparkles,
  FlaskConical,
  GraduationCap,
  X,
  FileText
} from 'lucide-react';
import { UnifiedSubject, UnifiedUnit } from './studyRoomAdapter';

interface StudyRoomNavigatorProps {
  subjects: UnifiedSubject[];
  activeSubjectId: string;
  activeUnitId: string | null;
  onSelectSubject: (subjectId: string) => void;
  onSelectUnit: (unitId: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const StudyRoomNavigator: React.FC<StudyRoomNavigatorProps> = ({
  subjects,
  activeSubjectId,
  activeUnitId,
  onSelectSubject,
  onSelectUnit,
  searchQuery,
  onSearchChange,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer
}) => {
  // Accordion expanded state for subjects
  const [expandedSubjectIds, setExpandedSubjectIds] = useState<Record<string, boolean>>(() => {
    return { [activeSubjectId]: true };
  });

  const toggleExpand = (subjectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSubjectIds(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  // Instant query filtering
  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return subjects;
    const q = searchQuery.toLowerCase().trim();

    return subjects.filter(subject => {
      const matchName = subject.name.toLowerCase().includes(q);
      const matchCode = subject.code.toLowerCase().includes(q);
      const matchUnit = subject.units.some(u => 
        u.title.toLowerCase().includes(q) || 
        u.topics.some(t => t.toLowerCase().includes(q))
      );
      return matchName || matchCode || matchUnit;
    });
  }, [subjects, searchQuery]);

  // Separate Theory vs Practical
  const theoryCourses = useMemo(() => {
    return filteredSubjects.filter(s => s.type !== 'Practical');
  }, [filteredSubjects]);

  const practicalCourses = useMemo(() => {
    return filteredSubjects.filter(s => s.type === 'Practical');
  }, [filteredSubjects]);

  const renderSubjectItem = (subject: UnifiedSubject) => {
    const isActive = subject.id === activeSubjectId;
    const isExpanded = expandedSubjectIds[subject.id] ?? isActive;
    const isPractical = subject.type === 'Practical';

    return (
      <div key={subject.id} className="space-y-1 select-none">
        {/* Subject Item Row */}
        <div
          onClick={() => {
            onSelectSubject(subject.id);
            onSelectUnit(null);
            setExpandedSubjectIds(prev => ({ ...prev, [subject.id]: true }));
            if (onCloseMobileDrawer) onCloseMobileDrawer();
          }}
          className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all ${
            isActive
              ? 'bg-[#007AFF]/10 text-[#007AFF] font-semibold ring-1 ring-[#007AFF]/20'
              : 'text-[#1D1D1F] dark:text-[#E5E5EA] hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              isActive 
                ? 'bg-[#007AFF] text-white shadow-xs' 
                : 'bg-black/[0.04] dark:bg-white/[0.06] text-neutral-500'
            }`}>
              {isPractical ? (
                <FlaskConical className="w-4 h-4" />
              ) : (
                <BookOpen className="w-4 h-4" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-bold uppercase">
                  {subject.code}
                </span>
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 font-medium">
                  • {subject.creditsOrMarks}
                </span>
              </div>
              <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#E5E5EA] leading-snug line-clamp-2">
                {subject.name}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => toggleExpand(subject.id, e)}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-md transition-colors shrink-0"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Tree of Units / Modules */}
        <AnimatePresence initial={false}>
          {isExpanded && subject.units.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="overflow-hidden pl-7 pr-1 space-y-0.5 border-l-2 border-black/[0.06] dark:border-white/[0.08] ml-4 my-1"
            >
              {/* All Units Link */}
              <button
                type="button"
                onClick={() => {
                  onSelectSubject(subject.id);
                  onSelectUnit(null);
                  if (onCloseMobileDrawer) onCloseMobileDrawer();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-[13px] font-mono flex items-center justify-between transition-colors ${
                  isActive && activeUnitId === null
                    ? 'text-[#007AFF] font-bold bg-[#007AFF]/10'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                }`}
              >
                <span>Full Course Overview</span>
                {isActive && activeUnitId === null && (
                  <span className="w-2 h-2 rounded-full bg-[#007AFF]"></span>
                )}
              </button>

              {/* Individual Units */}
              {subject.units.map((unit) => {
                const isUnitActive = isActive && activeUnitId === unit.id;

                return (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => {
                      onSelectSubject(subject.id);
                      onSelectUnit(unit.id);
                      if (onCloseMobileDrawer) onCloseMobileDrawer();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-[13px] flex items-center justify-between gap-2 transition-colors leading-snug ${
                      isUnitActive
                        ? 'text-[#007AFF] font-bold bg-[#007AFF]/10'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="truncate">
                      <strong className="font-mono font-bold text-xs text-neutral-400 mr-2">
                        U{unit.unitNumber}
                      </strong>
                      {unit.title}
                    </span>

                    {unit.isHardest && (
                      <span className="text-xs text-amber-500 shrink-0" title="High Yield Exam Unit">
                        🔥
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const navigatorContent = (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search Header */}
      <div className="p-3.5 border-b border-black/[0.06] dark:border-white/[0.08] shrink-0 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
            Syllabus Navigation
          </span>
          <span className="text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06]">
            {filteredSubjects.length} Courses
          </span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter courses or units..."
            className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm font-medium bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] focus:outline-none focus:border-[#007AFF] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white text-xs p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Courses Tree List with Independent Scroll */}
      <div 
        data-lenis-prevent="true"
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 space-y-5 custom-scrollbar"
      >
        {filteredSubjects.length === 0 ? (
          <div className="p-6 text-center text-sm font-mono text-neutral-400 space-y-2">
            <p>No matching courses or units found.</p>
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-[#007AFF] hover:underline font-semibold"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            {/* Theory Courses */}
            {theoryCourses.length > 0 && (
              <div className="space-y-1.5">
                <div className="px-2 py-0.5 text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                  Theory Courses ({theoryCourses.length})
                </div>
                <div className="space-y-1">
                  {theoryCourses.map(renderSubjectItem)}
                </div>
              </div>
            )}

            {/* Practical Courses */}
            {practicalCourses.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="px-2 py-0.5 text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold">
                  Laboratory Practicals ({practicalCourses.length})
                </div>
                <div className="space-y-1">
                  {practicalCourses.map(renderSubjectItem)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Pane */}
      <aside 
        data-lenis-prevent="true"
        className="hidden md:flex flex-col w-72 lg:w-84 shrink-0 h-full bg-[#FBFBFC] dark:bg-[#18181A] border-r border-black/[0.08] dark:border-white/[0.08] overflow-hidden select-none"
      >
        {navigatorContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobileDrawer}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-5/6 max-w-sm h-full bg-[#FBFBFC] dark:bg-[#18181A] shadow-2xl z-10 flex flex-col"
            >
              {navigatorContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

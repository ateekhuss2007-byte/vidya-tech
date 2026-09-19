   import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TopicNotesModal } from './TopicNotesModal';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Search, 
  Sparkles, 
  BookOpen, 
  FileCheck, 
  Flame, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  Copy, 
  Calendar, 
  Layers,
  FlaskConical,
  BookMarked,
  BarChart3,
  X,
  ListTree,
  Play
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { 
  analyzeSemesterSyllabus,
  RepeatedPYQ,
  FormulaItem,
  PassStrategyStep,
  R25_COURSES,
  R25_CREDIT_DISTRIBUTION,
  queryR25Syllabus,
  R25Course
} from '../../data/btechSemesterSyllabusData';
import { getUniversityById } from '../../data/panIndiaUniversitiesData';
import { getVerifiedCoursesForUniversity } from '../../data/officialSyllabusRegistry';
import { 
  getVerifiedPapersForUniversity, 
  OFFICIAL_PREVIOUS_YEAR_QUESTIONS,
  VerifiedPreviousYearQuestion
} from '../../data/officialPyqRegistry';
import { DataProvenanceBadge } from '../ui/DataProvenanceBadge';

interface BtechSemesterAnalyzerProps {
  setActiveTab?: (tab: any) => void;
  onSelectTopic?: (topic: string) => void;
  onOpenMockTest?: (subject: string, streamId?: string) => void;
  initialSemester?: number;
  selectedUniversityId?: string;
}

export const BtechSemesterAnalyzer: React.FC<BtechSemesterAnalyzerProps> = ({ 
  setActiveTab, 
  onSelectTopic,
  onOpenMockTest,
  initialSemester = 3,
  selectedUniversityId = 'makaut'
}) => {
  const universityMeta = getUniversityById(selectedUniversityId);
  const [selectedSem, setSelectedSem] = useState<number>(initialSemester || 3);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'subjects' | 'labs' | 'textbooks' | 'pyqs' | 'formulas' | 'strategy' | 'credits'>('subjects');
  const [selectedTopic, setSelectedTopic] = useState<{ topicName: string; subjectCode: string; subjectName: string; semesterNum: number } | null>(null);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string | null>(null);
  const [selectedModuleNumber, setSelectedModuleNumber] = useState<string | number | null>(null);
  const [viewMode, setViewMode] = useState<'hierarchy' | 'all'>('hierarchy');

  const handleTopicClick = useCallback((topicName: string, subjectCode: string, subjectName: string, semesterNum: number) => {
    setSelectedTopic({ topicName, subjectCode, subjectName, semesterNum });
  }, []);

  useEffect(() => {
    if (initialSemester && initialSemester >= 1 && initialSemester <= 8) {
      setSelectedSem(initialSemester);
      setSelectedSubjectCode(null);
      setSelectedModuleNumber(null);
    }
  }, [initialSemester]);

  const semesterData = analyzeSemesterSyllabus(selectedSem);

  // Check if verified official courses exist for the selected university
  const verifiedCourses = useMemo(() => {
    return getVerifiedCoursesForUniversity(selectedUniversityId, selectedSem);
  }, [selectedUniversityId, selectedSem]);

  // Check if verified official question papers and questions exist for the selected university
  const verifiedUniversityPapers = useMemo(() => {
    return getVerifiedPapersForUniversity(selectedUniversityId);
  }, [selectedUniversityId]);

  const verifiedUniversityQuestions = useMemo(() => {
    return OFFICIAL_PREVIOUS_YEAR_QUESTIONS.filter(
      (q) => q.universityId.toLowerCase() === selectedUniversityId.toLowerCase()
    );
  }, [selectedUniversityId]);

  // Unified courses: either verified university courses with provenance, or R25_COURSES fallback
  const semesterR25Courses: (R25Course & { source?: any; detailedModules?: any })[] = useMemo(() => {
    if (verifiedCourses.length > 0) {
      return verifiedCourses.map(vc => ({
        code: vc.courseCode,
        name: vc.courseTitle,
        semester: vc.semester,
        type: (vc.courseType === 'Practical' ? 'Practical' : 'Theory') as any,
        category: (vc.category || 'Major') as any,
        contact: `${vc.contactHours?.lecture || 3}-${vc.contactHours?.tutorial || 0}-${vc.contactHours?.practical || 0}`,
        credits: vc.credits || 4,
        contactHours: vc.contactHours?.total || 4,
        prerequisites: vc.prerequisites.join(', '),
        courseObjectives: vc.courseObjectives.map(o => o.text),
        courseOutcomes: vc.courseOutcomes.map(o => ({ co: o.code, description: o.text })),
        modules: vc.modules.map(m => ({
          moduleNumber: m.moduleNumber,
          title: m.officialTitle,
          lectures: m.hours ? `${m.hours} Lectures` : undefined,
          topics: m.topics.map(t => t.officialTopic)
        })),
        detailedModules: vc.modules,
        textBooks: vc.textbooks.map(b => `${b.author ? b.author + ': ' : ''}${b.title}${b.publisher ? ' (' + b.publisher + ')' : ''}`),
        referenceBooks: vc.referenceBooks?.map(b => `${b.author ? b.author + ': ' : ''}${b.title}`) || [],
        source: vc.source
      }));
    }
    return R25_COURSES.filter(c => c.semester === selectedSem);
  }, [verifiedCourses, selectedSem]);

  const semesterTheoryCourses = useMemo(() => {
    return semesterR25Courses.filter(c => c.type === 'Theory');
  }, [semesterR25Courses]);

  const selectedCourse = useMemo(() => {
    if (!selectedSubjectCode) return null;
    return semesterTheoryCourses.find(c => c.code === selectedSubjectCode) || null;
  }, [selectedSubjectCode, semesterTheoryCourses]);

  const selectedModule = useMemo(() => {
    if (!selectedCourse || selectedModuleNumber === null) return null;
    return selectedCourse.modules?.find(m => m.moduleNumber === selectedModuleNumber) || null;
  }, [selectedCourse, selectedModuleNumber]);

  const semesterPracticalCourses = useMemo(() => {
    return semesterR25Courses.filter(c => c.type === 'Practical');
  }, [semesterR25Courses]);

  // Real-time query result based on search input
  const liveSearchResult = useMemo(() => {
    if (!searchInput.trim()) return null;
    return queryR25Syllabus(searchInput);
  }, [searchInput]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const result = analyzeSemesterSyllabus(searchInput);
    setSelectedSem(result.semesterNumber);

    const queryRes = queryR25Syllabus(searchInput);
    if (queryRes.matchedCourses.length > 0) {
      const topCourse = queryRes.matchedCourses[0];
      setSelectedSem(topCourse.semester);
      toast.success(`Found ${topCourse.code}: ${topCourse.name}!`, {
        description: `Switched to Semester ${topCourse.semester} Syllabus.`
      });
    } else {
      toast.success(`Analyzed Semester ${result.semesterNumber} Syllabus!`, {
        description: `Loaded ${result.subjects.length} core subjects & syllabus blueprint.`
      });
    }
    setIsSearching(false);
  };

  const handleSemClick = (semNum: number) => {
    setSelectedSem(semNum);
    setSelectedSubjectCode(null);
    setSelectedModuleNumber(null);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    toast.info(`Switched to Semester ${semNum} Syllabus Matrix`);
  };

  const handleCopyFormula = (f: FormulaItem) => {
    navigator.clipboard.writeText(f.formula);
    toast.success(`Copied ${f.topic} formula to clipboard!`);
  };

  return (
    <>
    <div className="w-full space-y-6">
      
      {/* 1. Header Banner & Universal Search Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 text-[#007AFF] text-xs font-mono font-bold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{universityMeta.icon} {universityMeta.shortName} [{universityMeta.regulationCode}] Official Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">
              {universityMeta.shortName} <span className="text-[#007AFF]">Curriculum & Syllabus Intelligence</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#1D1D1F]/70 dark:text-[#AAAAAA] max-w-2xl font-sans">
              {universityMeta.description} Active Blueprint: <span className="text-[#007AFF] font-mono">{universityMeta.blueprintPattern?.split('(')[0] || 'Official Pattern'}</span>. Search any course code, module topic, or lab experiment.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative max-w-md w-full">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-[#AAAAAA] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onFocus={() => setIsSearching(true)}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setIsSearching(true);
                  }}
                  placeholder="Search subject code, module topic, lab..."
                  className="w-full pl-9 pr-8 py-2.5 rounded-2xl text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('');
                      setIsSearching(false);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-neutral-600 dark:hover:text-neutral-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-2xl bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25 text-xs font-mono font-bold hover:opacity-90 transition-all shrink-0 cursor-pointer shadow-sm"
              >
                Search
              </button>
            </form>

            {/* Instant Search Results Dropdown / Modal */}
            <AnimatePresence>
              {isSearching && liveSearchResult && searchInput.trim().length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-white dark:bg-[#151922] border border-black/10 dark:border-white/10 shadow-2xl z-50 max-h-[380px] overflow-y-auto space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-2">
                    <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                      100% Accuracy R-25 Results ({liveSearchResult.matchedCourses.length} Courses Found)
                    </span>
                    <button
                      onClick={() => setIsSearching(false)}
                      className="text-[#AAAAAA] hover:text-neutral-900 dark:hover:text-white text-xs font-mono"
                    >
                      Close ✕
                    </button>
                  </div>

                  {liveSearchResult.matchedCourses.slice(0, 4).map((c) => (
                    <div
                      key={c.code}
                      onClick={() => {
                        setSelectedSem(c.semester);
                        setSelectedSubjectCode(c.code);
                        setSelectedModuleNumber(null);
                        setIsSearching(false);
                        toast.success(`Loaded ${c.code}: ${c.name} (Semester ${c.semester})`);
                      }}
                      className="p-3 rounded-xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.04] dark:border-white/[0.06] hover:border-blue-500 transition-all cursor-pointer space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                        <span className="text-blue-600 dark:text-blue-400">{c.code}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                          Sem {c.semester} • {c.credits} Credits ({c.contact})
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                        {c.name}
                      </div>
                      {c.modules && (
                        <div className="text-[11px] text-[#AAAAAA] dark:text-[#AAAAAA] line-clamp-1 font-sans">
                          Modules: {c.modules.map(m => m.title).join(', ')}
                        </div>
                      )}
                    </div>
                  ))}

                  {liveSearchResult.matchedLabs.length > 0 && (
                    <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] space-y-1.5">
                      <div className="text-[10px] font-mono text-[#AAAAAA] font-bold uppercase">
                        Matching Lab Experiments:
                      </div>
                      {liveSearchResult.matchedLabs.slice(0, 3).map((l, idx) => (
                        <div key={idx} className="text-xs text-neutral-700 dark:text-neutral-300 font-mono flex items-start gap-1.5">
                          <FlaskConical className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span><strong>{l.course.code}:</strong> {l.experiment}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 8-Semester Interactive Switcher Tabs */}
        <div className="space-y-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
          <div className="text-[11px] font-mono text-[#AAAAAA] font-semibold uppercase tracking-wider flex items-center justify-between">
            <span>Select Semester (All 8 Semesters Verified):</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Active: Semester {selectedSem} • Total Degree: 160 Credits
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
              const isSelected = selectedSem === sem;
              const semCredits = R25_CREDIT_DISTRIBUTION.semesterCredits.find(s => s.sem === sem)?.credits || 20;
              return (
                <button
                  key={sem}
                  type="button"
                  onClick={() => handleSemClick(sem)}
                  className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-0.5 sm:gap-1 transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.03] border border-blue-400'
                      : 'bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.08] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">Sem {sem}</span>
                  <span className="text-[10px] font-mono opacity-90 font-semibold">
                    {semCredits} Cr
                  </span>
                  <span className="text-[9px] opacity-75 uppercase tracking-tighter truncate w-full text-center">
                    {sem <= 2 ? '1st Year' : sem <= 4 ? '2nd Year' : sem <= 6 ? '3rd Year' : '4th Year'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 2. Active Semester Academic Blueprint Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-6">
        
        {/* Semester Meta Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {semesterData.academicYear}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">
              {semesterData.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-sans max-w-3xl">
              {semesterData.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] text-center min-w-[90px]">
              <div className="text-xs font-mono text-[#AAAAAA] font-bold uppercase">Credits</div>
              <div className="text-lg font-bold font-display text-blue-600 dark:text-blue-400">{semesterData.totalCredits}</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] text-center min-w-[90px]">
              <div className="text-xs font-mono text-[#AAAAAA] font-bold uppercase">Courses</div>
              <div className="text-lg font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">{semesterR25Courses.length}</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] text-center min-w-[120px]">
              <div className="text-xs font-mono text-[#AAAAAA] font-bold uppercase">Difficulty</div>
              <div className="text-sm font-bold font-display text-amber-600 dark:text-amber-400">{semesterData.difficultyRating}</div>
            </div>

            {onOpenMockTest && (
              <button
                type="button"
                onClick={() => {
                  const firstSubj = semesterData.subjects[0]?.name || 'Data Structures';
                  onOpenMockTest(firstSubj, 'btech_makaut');
                  toast.success(`Launching Semester ${selectedSem} Mock Test!`);
                }}
                className="p-3 rounded-2xl bg-blue-600 text-white font-mono text-xs font-bold hover:bg-blue-500 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <FileCheck className="w-4 h-4" />
                <span>Test Paper ↗</span>
              </button>
            )}
          </div>
        </div>

        {/* 7 Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-black/[0.05] dark:border-white/[0.06]">
          {[
            { id: 'subjects' as const, label: `Core Theory (${semesterTheoryCourses.length})`, icon: BookOpen },
            { id: 'labs' as const, label: `Lab Practicals (${semesterPracticalCourses.length})`, icon: FlaskConical },
            { id: 'textbooks' as const, label: 'Prescribed Books', icon: BookMarked },
            { 
              id: 'pyqs' as const, 
              label: verifiedUniversityQuestions.length > 0 
                ? `Verified PYQs (${verifiedUniversityQuestions.length})` 
                : `Practice PYQs (${semesterData.topRepeatedPYQs.length})`, 
              icon: FileCheck 
            },
            { id: 'formulas' as const, label: `Formula Matrix (${semesterData.formulaMatrix.length})`, icon: Layers },
            { id: 'strategy' as const, label: '30-Day Pass Blueprint', icon: Calendar },
            { id: 'credits' as const, label: '160-Credit Matrix', icon: BarChart3 }
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeAnalysisTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAnalysisTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25 font-bold shadow-sm'
                    : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Core Theory Subjects & Hierarchical Drill-Down */}
        {activeAnalysisTab === 'subjects' && (
          <div className="space-y-5 animate-fade-in">
            {/* Header Control & Mode Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ListTree className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Curriculum Navigator</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      Step-by-Step Drilldown
                    </span>
                  </div>
                  <div className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-sans">
                    {selectedCourse && selectedModule
                      ? `Level 3: ${selectedCourse.code} › Module ${selectedModule.moduleNumber} Chapters`
                      : selectedCourse
                      ? `Level 2: ${selectedCourse.code} Modules › Select a Module`
                      : `Level 1: Semester ${selectedSem} (${semesterTheoryCourses.length} Theory Subjects) › Click a Subject`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('hierarchy')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'hierarchy'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F]/70 dark:text-[#AAAAAA] border border-black/[0.06] dark:border-white/[0.08]'
                  }`}
                >
                  <ListTree className="w-3.5 h-3.5" />
                  <span>Step-by-Step Flow</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'all'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F]/70 dark:text-[#AAAAAA] border border-black/[0.06] dark:border-white/[0.08]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Expand All</span>
                </button>
              </div>
            </div>

            {/* Breadcrumbs Navigation Bar (Active in Hierarchy Mode when drilled down) */}
            {viewMode === 'hierarchy' && selectedCourse && (
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] dark:bg-[#06080F] border border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-2xs">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSubjectCode(null);
                      setSelectedModuleNumber(null);
                    }}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
                  >
                    <span>Semester {selectedSem} Subjects</span>
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-[#AAAAAA]" />
                  
                  <button
                    type="button"
                    onClick={() => setSelectedModuleNumber(null)}
                    className={`flex items-center gap-1 font-bold cursor-pointer ${
                      selectedModule
                        ? 'text-blue-600 dark:text-blue-400 hover:underline'
                        : 'text-[#1D1D1F] dark:text-[#F5F5F7]'
                    }`}
                  >
                    <span>{selectedCourse.code}: {selectedCourse.name.length > 28 ? selectedCourse.name.substring(0, 28) + '...' : selectedCourse.name}</span>
                  </button>

                  {selectedModule && (
                    <>
                      <ChevronRight className="w-3.5 h-3.5 text-[#AAAAAA]" />
                      <span className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7] px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300">
                        Mod {selectedModule.moduleNumber}: {selectedModule.title.length > 24 ? selectedModule.title.substring(0, 24) + '...' : selectedModule.title}
                      </span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (selectedModule) {
                      setSelectedModuleNumber(null);
                    } else {
                      setSelectedSubjectCode(null);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/[0.1] text-neutral-700 dark:text-neutral-300 hover:text-blue-600 text-xs font-mono font-semibold cursor-pointer transition-colors shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{selectedModule ? 'Back to Modules' : `Back to Sem ${selectedSem} Subjects`}</span>
                </button>
              </div>
            )}

            {/* LEVEL 1: Subjects List View (when no subject is selected) */}
            {viewMode === 'hierarchy' && !selectedCourse && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-bold font-display text-base sm:text-lg text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Subjects in Semester {selectedSem}
                    </h3>
                    <p className="text-xs text-[#AAAAAA] font-sans">
                      Click any subject card below to view its syllabus modules.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#AAAAAA] font-semibold px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06]">
                    {semesterTheoryCourses.length} Subjects
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {semesterTheoryCourses.map((course: R25Course) => {
                    const totalTopics = course.modules?.reduce((acc, m) => acc + (m.topics?.length || 0), 0) || 0;
                    return (
                      <div
                        key={course.code}
                        onClick={() => {
                          setSelectedSubjectCode(course.code);
                          setSelectedModuleNumber(null);
                        }}
                        className="p-5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] space-y-4 hover:border-blue-500/60 dark:hover:border-blue-500/60 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-900/50 uppercase">
                              {course.code} • {course.category}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-semibold">
                              {course.credits} Credits ({course.contact})
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7] font-display group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {course.name}
                            </h4>
                            {course.contactHours && (
                              <div className="text-[11px] font-mono text-[#AAAAAA] mt-1">
                                Total Contact: {course.contactHours} Lecture Hours
                              </div>
                            )}
                          </div>

                          {/* Modules and Chapters Badges */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
                            <span className="px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5" />
                              <span>{course.modules?.length || 0} Modules</span>
                            </span>
                            <span className="px-2.5 py-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06] text-[#1D1D1F]/70 dark:text-[#AAAAAA] flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                              <span>{totalTopics} Chapters</span>
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSubjectCode(course.code);
                              setSelectedModuleNumber(null);
                            }}
                            className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
                          >
                            <span>Explore Modules ({course.modules?.length || 0})</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[11px] text-[#AAAAAA]">Click card</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LEVEL 2: Modules of Selected Subject (when subject chosen, module not chosen) */}
            {viewMode === 'hierarchy' && selectedCourse && !selectedModule && (
              <div className="space-y-6">
                {/* Subject Summary Banner */}
                <div className="p-6 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 uppercase">
                          {selectedCourse.code} • {selectedCourse.category}
                        </span>
                        <span className="text-xs font-mono text-[#AAAAAA]">
                          Semester {selectedSem} • {selectedCourse.credits} Credits • {selectedCourse.contactHours || 36} Hours
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">
                          {selectedCourse.name}
                        </h3>
                        {selectedCourse.source && (
                          <DataProvenanceBadge metadata={selectedCourse.source} />
                        )}
                      </div>
                      <p className="text-xs text-[#AAAAAA] dark:text-[#AAAAAA] font-sans max-w-2xl">
                        Select any module below to inspect its detailed syllabus chapters, video derivations, lecture hours, and AI revision notes.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {onOpenMockTest && (
                        <button
                          type="button"
                          onClick={() => {
                            toast.info(`Configuring Mock Test for ${selectedCourse.name}...`);
                            onOpenMockTest(selectedCourse.name, 'btech_makaut');
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Take Mock Test</span>
                        </button>
                      )}
                      {(setActiveTab || onSelectTopic) && (
                        <button
                          type="button"
                          onClick={() => {
                            toast.success(`Opening Study Room for ${selectedCourse.name}`);
                            if (onSelectTopic) onSelectTopic(selectedCourse.name);
                            if (setActiveTab) setActiveTab('studyHub');
                          }}
                          className="px-4 py-2 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/[0.1] text-neutral-800 dark:text-neutral-200 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer hover:border-blue-500 transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                          <span>Study Notes</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base font-display text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-500" />
                      <span>Modules in {selectedCourse.code} ({selectedCourse.modules?.length || 0})</span>
                    </h4>
                    <span className="text-xs font-mono text-[#AAAAAA]">
                      Click a module to view its chapters
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCourse.modules?.map((mod) => (
                      <div
                        key={mod.moduleNumber}
                        onClick={() => setSelectedModuleNumber(mod.moduleNumber)}
                        className="p-5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] hover:border-blue-500/60 dark:hover:border-blue-500/60 hover:shadow-md transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                              Module {mod.moduleNumber}
                            </span>
                            {mod.lectures && (
                              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-[#1D1D1F]/70 dark:text-[#AAAAAA]">
                                {mod.lectures} Lectures
                              </span>
                            )}
                          </div>

                          <h5 className="font-bold text-sm sm:text-base text-[#1D1D1F] dark:text-[#F5F5F7] font-display group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {mod.title}
                          </h5>

                          <p className="text-xs text-[#AAAAAA] dark:text-[#AAAAAA] font-sans line-clamp-2">
                            Includes {mod.topics?.length || 0} chapters: {mod.topics?.slice(0, 3).join(', ')}...
                          </p>
                        </div>

                        <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedModuleNumber(mod.moduleNumber);
                            }}
                            className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
                          >
                            <span>View {mod.topics?.length || 0} Chapters</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[11px] text-[#AAAAAA] font-semibold">
                            {mod.topics?.length || 0} Topics
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* LEVEL 3: Chapters of Selected Module */}
            {viewMode === 'hierarchy' && selectedCourse && selectedModule && (
              <div className="space-y-6">
                {/* Horizontal Module Quick Switcher */}
                <div className="p-2 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] flex items-center gap-1.5 overflow-x-auto shadow-2xs">
                  {selectedCourse.modules?.map((m) => {
                    const isCurrent = m.moduleNumber === selectedModule.moduleNumber;
                    return (
                      <button
                        key={m.moduleNumber}
                        type="button"
                        onClick={() => setSelectedModuleNumber(m.moduleNumber)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                          isCurrent
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                        }`}
                      >
                        <span>Mod {m.moduleNumber}</span>
                        <span className="text-[10px] opacity-80">({m.topics?.length || 0})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Module Detail Card */}
                <div className="p-6 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.05] dark:border-white/[0.06] pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          Module {selectedModule.moduleNumber}
                        </span>
                        {selectedModule.lectures && (
                          <span className="text-xs font-mono text-[#AAAAAA]">
                            {selectedModule.lectures} Lecture Hours
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">
                        {selectedModule.title}
                      </h3>
                    </div>

                    <div className="text-xs font-mono text-[#AAAAAA]">
                      {selectedModule.topics?.length || 0} Prescribed Chapters / Topics
                    </div>
                  </div>

                  {/* Chapters List */}
                  <div className="space-y-2.5">
                    {selectedModule.topics?.map((topic, idx) => {
                      const detailedMod = (selectedCourse as any).detailedModules?.find(
                        (m: any) => m.moduleNumber === selectedModule.moduleNumber
                      );
                      const topicObj = detailedMod?.topics?.[idx];
                      const hasMicroTopics = topicObj?.microTopics && topicObj.microTopics.length > 0;

                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.06] hover:border-blue-400 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between gap-3 group"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-center text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                                #{idx + 1}
                              </span>
                              <div>
                                <span className="text-xs sm:text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-sans">
                                  {topic}
                                </span>
                                {topicObj && (
                                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                                    <span>✓ Official Syllabus Prescribed</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                              <button
                                type="button"
                                onClick={() => handleTopicClick(topic, selectedCourse.code, selectedCourse.name, selectedSem)}
                                className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-600 hover:text-white text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Full Notes & Formulas</span>
                              </button>

                              {onSelectTopic && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleTopicClick(topic, selectedCourse.code, selectedCourse.name, selectedSem);
                                    if (onSelectTopic) onSelectTopic(topic);
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 text-xs font-mono font-medium transition-colors cursor-pointer"
                                  title="Topic Video & Derivation"
                                >
                                  <Play className="w-3.5 h-3.5 text-blue-500" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* AI-Derived Micro-Topics Breakdown */}
                          {hasMicroTopics && (
                            <div className="mt-1 pt-2.5 border-t border-black/[0.04] dark:border-white/[0.05] space-y-1.5">
                              <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-purple-500" />
                                <span>AI-Derived Micro-Topic Decomposition (SIH26043 Remediation):</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {topicObj.microTopics.map((mt: any) => (
                                  <span
                                    key={mt.id}
                                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center gap-1"
                                    title={`Derived from: ${mt.derivedFromOfficialTopic}`}
                                  >
                                    <span className="opacity-60">•</span>
                                    <span>{mt.name}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Prev / Next Module Navigation */}
                  {(() => {
                    const currentIdx = selectedCourse.modules?.findIndex(m => m.moduleNumber === selectedModule.moduleNumber) ?? -1;
                    const prevMod = currentIdx > 0 ? selectedCourse.modules?.[currentIdx - 1] : null;
                    const nextMod = (currentIdx >= 0 && selectedCourse.modules && currentIdx < selectedCourse.modules.length - 1)
                      ? selectedCourse.modules[currentIdx + 1]
                      : null;

                    return (
                      <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-3">
                        {prevMod ? (
                          <button
                            type="button"
                            onClick={() => setSelectedModuleNumber(prevMod.moduleNumber)}
                            className="px-4 py-2 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Prev: Mod {prevMod.moduleNumber}</span>
                          </button>
                        ) : <div />}

                        {nextMod ? (
                          <button
                            type="button"
                            onClick={() => setSelectedModuleNumber(nextMod.moduleNumber)}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <span>Next: Mod {nextMod.moduleNumber}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedModuleNumber(null)}
                            className="px-4 py-2 rounded-xl bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>All Modules Completed ✓</span>
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* EXPAND ALL VIEW (if user explicitly switches viewMode to 'all') */}
            {viewMode === 'all' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                {semesterTheoryCourses.map((course: R25Course) => (
                  <div
                    key={course.code}
                    className="p-5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] space-y-3 flex flex-col justify-between hover:border-black/[0.12] dark:hover:border-white/[0.12] transition-all shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">
                          {course.code} • {course.category}
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-neutral-700 dark:text-neutral-300 font-bold">
                          {course.credits} Credits ({course.contact})
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7] font-display">
                        {course.name}
                      </h4>

                      {course.contactHours && (
                        <div className="text-[11px] font-mono text-[#AAAAAA]">
                          Total Contact Hours: {course.contactHours} Hours
                        </div>
                      )}

                      <div className="space-y-2 pt-2">
                        <div className="text-[10px] font-mono text-[#AAAAAA] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                          <span>Course Modules ({course.modules?.length || 0}):</span>
                        </div>
                        <div className="space-y-2">
                          {course.modules?.map((mod, idx) => (
                            <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.04] dark:border-white/[0.05] text-xs space-y-1.5">
                              <div className="font-bold text-neutral-800 dark:text-neutral-200 font-mono flex items-center justify-between">
                                <span>Mod {mod.moduleNumber}: {mod.title}</span>
                                {mod.lectures && <span className="text-[10px] text-blue-600 dark:text-blue-400">{mod.lectures}</span>}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {mod.topics.map((t, tIdx) => (
                                  <button
                                    key={tIdx}
                                    type="button"
                                    onClick={() => handleTopicClick(t, course.code, course.name, selectedSem)}
                                    className="px-2 py-1 rounded-lg text-[11px] bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-700 dark:hover:text-blue-300 text-neutral-700 dark:text-neutral-300 border border-black/[0.06] dark:border-white/[0.08] hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer text-left font-sans leading-tight flex items-center gap-1 group"
                                  >
                                    <span className="text-[9px] text-blue-400 dark:text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-300">📖</span>
                                    <span>{t}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center gap-2">
                      {(setActiveTab || onSelectTopic) && (
                        <button
                          type="button"
                          onClick={() => {
                            toast.success(`Opening Study Room for ${course.name}`);
                            if (onSelectTopic) onSelectTopic(course.name);
                            if (setActiveTab) setActiveTab('studyHub');
                          }}
                          className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold border border-black/10 dark:border-white/15 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[#1D1D1F] dark:text-[#F5F5F7] transition-all cursor-pointer text-center truncate"
                        >
                          Study Notes →
                        </button>
                      )}
                      {onOpenMockTest && (
                        <button
                          type="button"
                          onClick={() => {
                            toast.info(`Configuring Mock Test Paper for ${course.name}...`);
                            onOpenMockTest(course.name, 'btech_makaut');
                          }}
                          className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all cursor-pointer text-center truncate"
                        >
                          Take Mock Test →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Lab Practicals & Experiments */}
        {activeAnalysisTab === 'labs' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-xs text-indigo-800 dark:text-indigo-200 font-mono">
              🧪 <strong>Official Lab Syllabus:</strong> Verified experiments and hands-on laboratory modules prescribed in Regulation-25 for Semester {selectedSem}.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {semesterPracticalCourses.map((lab: R25Course) => (
                <div
                  key={lab.code}
                  className="p-5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                      {lab.code} • {lab.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold">
                      {lab.credits} Credits ({lab.contact})
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7] font-display">
                    {lab.name}
                  </h4>

                  {lab.labExperiments && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] font-mono text-[#AAAAAA] font-bold uppercase">
                        Prescribed Experiments / Tasks ({lab.labExperiments.length}):
                      </div>
                      <ol className="text-xs text-neutral-700 dark:text-neutral-300 space-y-1.5 list-decimal pl-4 font-sans leading-relaxed">
                        {lab.labExperiments.map((exp, idx) => (
                          <li key={idx}>{exp}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Prescribed Textbooks & References */}
        {activeAnalysisTab === 'textbooks' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-200 font-mono">
              📖 <strong>Prescribed Academic Bibliography:</strong> Official textbook and reference reading recommendations approved by the Board of Studies.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {semesterR25Courses.filter(c => (c.textBooks && c.textBooks.length > 0) || (c.referenceBooks && c.referenceBooks.length > 0)).map((c) => (
                <div
                  key={c.code}
                  className="p-5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {c.code}
                    </span>
                    <span className="text-[10px] font-mono text-[#AAAAAA]">
                      {c.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {c.name}
                  </h4>

                  {c.textBooks && c.textBooks.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-mono text-[#AAAAAA] font-bold uppercase">
                        Prescribed Text Books:
                      </div>
                      <ul className="text-xs text-neutral-700 dark:text-neutral-300 list-disc pl-4 space-y-1 font-sans">
                        {c.textBooks.map((tb, idx) => (
                          <li key={idx}>{tb}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {c.referenceBooks && c.referenceBooks.length > 0 && (
                    <div className="space-y-1 pt-2 border-t border-black/[0.04] dark:border-white/[0.05]">
                      <div className="text-[10px] font-mono text-[#AAAAAA] font-bold uppercase">
                        Reference Books:
                      </div>
                      <ul className="text-[11px] text-[#1D1D1F]/70 dark:text-[#AAAAAA] list-disc pl-4 space-y-0.5 font-sans">
                        {c.referenceBooks.map((rb, idx) => (
                          <li key={idx}>{rb}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Top Repeated PYQs & Official Verified Papers */}
        {activeAnalysisTab === 'pyqs' && (
          <div className="space-y-6 animate-fade-in">
            {/* Section 1: Official Verified Previous Year Questions (Prompt 4 Compliant) */}
            {verifiedUniversityQuestions.length > 0 && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-500/[0.08] dark:bg-emerald-500/[0.05] border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        ✓ Official University Examination Archive (SIH26043 Certified)
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                      {verifiedUniversityQuestions.length} Questions Verified
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {universityMeta.shortName} [{universityMeta.regulationCode}] Authentic Previous Year Questions
                  </h3>
                  <p className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] leading-relaxed">
                    Directly extracted from {universityMeta.shortName} official examination branch archives and question paper repositories. Every question preserves verbatim text, section/sub-part allocation, exact marks, and official syllabus topic linkage.
                  </p>

                  {/* Unavailable / Covid-19 Disruption Disclosure */}
                  {verifiedUniversityPapers.some(p => p.status === 'NOT_AVAILABLE') && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                      <span className="text-amber-500 font-bold">ℹ</span>
                      <span>
                        <strong>Historical Transparency Note:</strong> The {verifiedUniversityPapers.find(p => p.status === 'NOT_AVAILABLE')?.examinationYear} examination session was conducted under pandemic special assessment modalities (regular physical paper was not archived). In compliance with the SIH26043 Zero-Fabrication Policy, this session is marked <strong>NOT_AVAILABLE</strong> rather than filled with AI hallucinations.
                      </span>
                    </div>
                  )}
                </div>

                {/* Verified Question Cards */}
                <div className="space-y-3">
                  {verifiedUniversityQuestions.map((q: VerifiedPreviousYearQuestion) => (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] hover:border-emerald-500/30 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {q.courseCode} · {q.courseTitle}
                          </span>
                          <span className="text-[11px] font-mono text-[#AAAAAA]">
                            ({q.examinationYear} · {q.examinationSession})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {q.section && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
                              {q.section}
                            </span>
                          )}
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                            {q.questionNumber}
                          </span>
                          {q.marks !== null && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                              {q.marks} Marks
                            </span>
                          )}
                          <DataProvenanceBadge source={q.source} size="sm" />
                        </div>
                      </div>

                      {/* Verbatim Question Text */}
                      <div className="p-3.5 rounded-xl bg-white dark:bg-black/40 border border-black/[0.04] dark:border-white/[0.05]">
                        <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed font-sans">
                          {q.questionText}
                        </p>
                      </div>

                      {/* Topic & Micro-Topic Traceability Box */}
                      <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">✓ Official Syllabus Topic:</span>
                          <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                            {q.topicMapping.officialTopic || 'General Course Foundation'}
                          </span>
                        </div>
                        {q.topicMapping.microTopics.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold">⚡ Micro-Topics:</span>
                            {q.topicMapping.microTopics.map((micro: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20"
                              >
                                {micro}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="text-[10px] font-mono text-[#AAAAAA] pt-1 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between">
                          <span>Source Archive: {q.source.sourceName}</span>
                          {q.source.sourceUrl && (
                            <a
                              href={q.source.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                            >
                              Official Portal ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Pedagogical Practice Questions (Explicitly segregated) */}
            <div className="space-y-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-200 font-mono space-y-1">
                <div className="flex items-center justify-between">
                  <span>⚡ <strong>Pedagogical Practice Bank & Frequently Repeated Exam Concepts</strong></span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                    Demo / Practice Data
                  </span>
                </div>
                <p className="text-[11px] text-amber-700 dark:text-amber-300/90 leading-relaxed font-sans">
                  The following questions represent curated practice problems and examiner mark rubrics compiled for revision drill. They are segregated to ensure no synthetic or generalized question is misidentified as an official university examination paper.
                </p>
              </div>

              <div className="space-y-3">
                {semesterData.topRepeatedPYQs.map((pyq: RepeatedPYQ) => (
                  <div
                    key={pyq.id}
                    className="p-5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] space-y-3"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        {pyq.subject}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20">
                          Demo Question
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold border border-rose-200/50">
                          <Flame className="w-3 h-3 inline mr-1" />
                          {pyq.frequency}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-bold">
                          {pyq.marks} Marks
                        </span>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed font-sans">
                      {pyq.question}
                    </p>

                    <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] space-y-1 text-xs">
                      <div className="text-[10px] font-mono text-[#AAAAAA] font-bold uppercase">
                        Exact Examiner Marking Rubric & Key Steps:
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                        {pyq.expectedAnswerFormat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Formula & Theorem Matrix */}
        {activeAnalysisTab === 'formulas' && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {semesterData.formulaMatrix.map((item: FormulaItem, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] space-y-2 flex flex-col justify-between"
                >
                  <div className="text-[11px] font-mono font-bold text-[#AAAAAA] dark:text-[#AAAAAA] uppercase">
                    {item.topic}
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.08] text-xs font-mono text-[#1D1D1F] dark:text-[#F5F5F7] select-all break-words leading-relaxed font-semibold">
                    {item.formula}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyFormula(item)}
                    className="self-end text-[10px] font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Formula</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: 30-Day Passing Strategy Blueprint */}
        {activeAnalysisTab === 'strategy' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-200 font-mono">
              🎯 <strong>Zero-Stress Pass Plan:</strong> Designed for students starting with 30 days remaining. Follow weekly priorities to clear all theory papers with 8.0+ SGPA.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {semesterData.thirtyDayPassStrategy.map((step: PassStrategyStep, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] space-y-3 relative overflow-hidden"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md">
                    W{idx + 1}
                  </div>
                  <div className="text-sm font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {step.week}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                    {step.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Official 160-Credit Matrix */}
        {activeAnalysisTab === 'credits' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-200 font-mono">
              📊 <strong>Regulation-25 (NEP 2020) Total Degree Distribution:</strong> 160.0 Credits across 8 semesters with complete major, minor, and multidisciplinary categories.
            </div>

            {/* Semester-wise breakdown table */}
            <div className="overflow-x-auto rounded-2xl border border-black/[0.06] dark:border-white/[0.08]">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-black/[0.03] dark:bg-[#F5F5F7] dark:bg-white/[0.04] text-[#1D1D1F]/70 dark:text-[#AAAAAA] border-b border-black/[0.06] dark:border-white/[0.08]">
                  <tr>
                    <th className="p-3">Semester</th>
                    <th className="p-3">Academic Year</th>
                    <th className="p-3">Credits</th>
                    <th className="p-3">Cumulative</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] text-neutral-800 dark:text-neutral-200">
                  {R25_CREDIT_DISTRIBUTION.semesterCredits.map((s) => {
                    const cumCredits = R25_CREDIT_DISTRIBUTION.semesterCredits
                      .filter(x => x.sem <= s.sem)
                      .reduce((acc, curr) => acc + curr.credits, 0);
                    return (
                      <tr key={s.sem} className={s.sem === selectedSem ? 'bg-blue-50/50 dark:bg-blue-950/30 font-bold text-blue-600 dark:text-blue-400' : ''}>
                        <td className="p-3">Semester {s.sem}</td>
                        <td className="p-3">{s.year}</td>
                        <td className="p-3">{s.credits} Credits</td>
                        <td className="p-3">{cumCredits} / 160</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* NEP Category Split */}
            <div className="p-5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.06] space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-[#AAAAAA]">
                NEP 2020 Course Category Breakdown:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.08]">
                  <div className="text-[#AAAAAA] text-[10px]">Major (Core)</div>
                  <div className="text-base font-bold text-blue-600">{R25_CREDIT_DISTRIBUTION.categoryTotals.major} Cr</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.08]">
                  <div className="text-[#AAAAAA] text-[10px]">Minor</div>
                  <div className="text-base font-bold text-indigo-600">{R25_CREDIT_DISTRIBUTION.categoryTotals.minor} Cr</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.08]">
                  <div className="text-[#AAAAAA] text-[10px]">Multi-Disciplinary</div>
                  <div className="text-base font-bold text-emerald-600">{R25_CREDIT_DISTRIBUTION.categoryTotals.multiDisciplinary} Cr</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.08]">
                  <div className="text-[#AAAAAA] text-[10px]">Projects (I, II, III)</div>
                  <div className="text-base font-bold text-purple-600">{R25_CREDIT_DISTRIBUTION.categoryTotals.project} Cr</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.08]">
                  <div className="text-[#AAAAAA] text-[10px]">Skill Enhancement (SEC)</div>
                  <div className="text-base font-bold text-amber-600">{R25_CREDIT_DISTRIBUTION.categoryTotals.skillEnhancement} Cr</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.08]">
                  <div className="text-[#AAAAAA] text-[10px]">Value Added (VAC)</div>
                  <div className="text-base font-bold text-cyan-600">{R25_CREDIT_DISTRIBUTION.categoryTotals.valueAdded} Cr</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.08]">
                  <div className="text-[#AAAAAA] text-[10px]">Ability Enhancement (AEC)</div>
                  <div className="text-base font-bold text-teal-600">{R25_CREDIT_DISTRIBUTION.categoryTotals.abilityEnhancement} Cr</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.08]">
                  <div className="text-[#AAAAAA] text-[10px]">Internship & Grand Viva</div>
                  <div className="text-base font-bold text-rose-600">4.0 Cr</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>

    {/* Topic Notes Modal — opens when any topic is clicked */}
    {selectedTopic && (
      <TopicNotesModal
        topicName={selectedTopic.topicName}
        subjectCode={selectedTopic.subjectCode}
        subjectName={selectedTopic.subjectName}
        semesterNum={selectedTopic.semesterNum}
        onClose={() => setSelectedTopic(null)}
      />
    )}
    </>
  );
};

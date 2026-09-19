/**
 * ============================================================================
 * VIDYA AI — Curriculum Studio (Pan-India Curriculum Studio Shell)
 * ============================================================================
 * High-performance, edge-to-edge Studio experience matching Study Room layout:
 * - Top Bar: "Target Selection" dropdown + Semester pills + "🔄 Switch Curriculum"
 * - Master-Detail Split Pane:
 *    * Left: Sleek hierarchical syllabus navigator (My Courses + Unit tree)
 *    * Right: Apple-style reading canvas (Subject Card, Tabs & Unit Breakdown)
 * - Switch Curriculum Modal with authentic university cards (MAKAUT, AKTU, VTU, VIT, BITS, CU, etc.)
 * ============================================================================
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getUnifiedTrackData, 
  UnifiedSubject, 
  UnifiedTrackData 
} from '../studyRoom/studyRoomAdapter';
import { StudyRoomNavigator } from '../studyRoom/StudyRoomNavigator';
import { StudyRoomWorkspace, StudyRoomMode } from '../studyRoom/StudyRoomWorkspace';
import { UniversitySelectorBar } from './UniversitySelectorBar';
import { UniversalSyllabusUploaderModal } from './UniversalSyllabusUploaderModal';
import { PAN_INDIA_UNIVERSITIES, UniversityMeta } from '../../data/panIndiaUniversitiesData';
import { TARGET_TRACK_OPTIONS } from '../../data/otherStreamsSyllabusData';
import { 
  ChevronDown, 
  Check, 
  RotateCcw, 
  Layers, 
  X, 
  Upload, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';

interface CollegeHubViewProps {
  setActiveTab?: (tab: any) => void;
  onOpenMockTest?: (subject: string, streamId?: string) => void;
  initialSemester?: number;
}

export const CollegeHubView: React.FC<CollegeHubViewProps> = ({ 
  setActiveTab,
  onOpenMockTest,
  initialSemester = 3
}) => {
  // 1. University & Track selection state
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>(() => {
    return localStorage.getItem('vidya_selected_uni') || 'makaut';
  });

  const [selectedTrack, setSelectedTrack] = useState<string>(() => {
    return localStorage.getItem('vidya_target_track') || 'btech';
  });

  const [activeSem, setActiveSem] = useState<number>(() => {
    return initialSemester || 3;
  });

  // 2. Modals state
  const [isSwitchCurriculumModalOpen, setIsSwitchCurriculumModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Active university metadata
  const activeUniversity: UniversityMeta = useMemo(() => {
    return PAN_INDIA_UNIVERSITIES.find(u => u.id === selectedUniversityId) || PAN_INDIA_UNIVERSITIES[0];
  }, [selectedUniversityId]);

  // Current track metadata
  const currentTrackMeta = useMemo(() => {
    return TARGET_TRACK_OPTIONS.find(t => t.id === selectedTrack) || TARGET_TRACK_OPTIONS[0];
  }, [selectedTrack]);

  // 3. Unified Track Data based on selection
  const trackData: UnifiedTrackData = useMemo(() => {
    return getUnifiedTrackData(selectedTrack, activeSem, selectedUniversityId);
  }, [selectedTrack, activeSem, selectedUniversityId]);

  // 4. Active Subject & Unit
  const [activeSubjectId, setActiveSubjectId] = useState<string>(() => {
    return trackData.subjects[0]?.id || '';
  });
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);

  useEffect(() => {
    if (trackData.subjects.length > 0) {
      const exists = trackData.subjects.some(s => s.id === activeSubjectId);
      if (!exists) {
        setActiveSubjectId(trackData.subjects[0].id);
        setActiveUnitId(null);
      }
    }
  }, [trackData, activeSubjectId]);

  // 5. Active Mode in Workspace
  const [activeMode, setActiveMode] = useState<StudyRoomMode>('syllabus');

  const activeSubject: UnifiedSubject | undefined = useMemo(() => {
    return trackData.subjects.find(s => s.id === activeSubjectId) || trackData.subjects[0];
  }, [trackData, activeSubjectId]);

  const handleSelectUniversity = (uniId: string) => {
    setSelectedUniversityId(uniId);
    localStorage.setItem('vidya_selected_uni', uniId);
    setIsSwitchCurriculumModalOpen(false);
  };

  const handleSwitchTrack = (trackId: string) => {
    setSelectedTrack(trackId);
    localStorage.setItem('vidya_target_track', trackId);
    setActiveUnitId(null);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#FBFBFC] dark:bg-[#18181A]">
      
      {/* 1. TOP HEADER BAR (Exact match to screenshot: Target Selection + Switch Curriculum) */}
      <header className="min-h-14 border-b border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#18181A] px-4 sm:px-6 py-2 flex items-center justify-between gap-3 shrink-0 select-none z-30">
        
        {/* Left: Target Selection Label & Dropdown + Semesters */}
        <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar py-0.5 min-w-0">
          <div className="flex flex-col shrink-0">
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
              Target Selection
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer text-xs sm:text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] shrink-0 group border border-black/[0.06] dark:border-white/[0.08]"
                  title="Switch target curriculum or university"
                >
                  <span className="text-base">{currentTrackMeta.icon}</span>
                  <span className="font-bold truncate max-w-[150px] sm:max-w-[200px]">
                    {activeUniversity.shortName || activeUniversity.name} • {currentTrackMeta.title}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#007AFF] transition-colors shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 p-2">
                <DropdownMenuLabel className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-2 py-1">
                  Switch Course / Stream
                </DropdownMenuLabel>
                {TARGET_TRACK_OPTIONS.map((track) => {
                  const isSelected = selectedTrack === track.id;
                  return (
                    <DropdownMenuItem
                      key={track.id}
                      onClick={() => handleSwitchTrack(track.id)}
                      className="flex items-center justify-between p-2 rounded-xl cursor-pointer hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{track.icon}</span>
                        <div className="flex flex-col">
                          <span className={`text-xs font-semibold ${isSelected ? 'text-[#007AFF]' : 'text-neutral-800 dark:text-neutral-200'}`}>
                            {track.title}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {track.subtitle}
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#007AFF]" />}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Minimalist Semester Pills */}
          {Boolean(trackData.semestersAvailable && trackData.semestersAvailable.length > 0) && (
            <div className="flex items-center gap-1 shrink-0 self-end mb-1">
              {trackData.semestersAvailable!.map((semNum) => {
                const isSelected = activeSem === semNum;

                return (
                  <button
                    key={semNum}
                    type="button"
                    onClick={() => {
                      setActiveSem(semNum);
                      setActiveUnitId(null);
                    }}
                    className={`relative px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer select-none shrink-0 ${
                      isSelected
                        ? 'text-[#007AFF] font-bold'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="curriculumSemesterPill"
                        className="absolute inset-0 bg-[#007AFF]/10 rounded-lg"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">
                      Sem {semNum}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Switch Curriculum Button & Upload PDF */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Switch Curriculum Button (Exact match to screenshot) */}
          <button
            type="button"
            onClick={() => setIsSwitchCurriculumModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-xs font-mono font-bold text-neutral-700 dark:text-neutral-200 transition-all cursor-pointer shadow-2xs bg-white dark:bg-[#202023]"
            title="Switch University Curriculum or Examination Target"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
            <span>Switch Curriculum</span>
          </button>

          {/* Upload Custom Syllabus */}
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#007AFF]/10 hover:bg-[#007AFF]/20 text-[#007AFF] text-xs font-mono font-bold transition-all cursor-pointer"
            title="Upload Custom Syllabus PDF"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Upload PDF</span>
          </button>
        </div>
      </header>

      {/* 2. MASTER-DETAIL SPLIT PANE (Study Room Studio Engine) */}
      {activeSubject ? (
        <div className="flex-1 min-h-0 flex items-stretch overflow-hidden relative">
          {/* Left: Syllabus Navigation Sidebar */}
          <StudyRoomNavigator
            subjects={trackData.subjects}
            activeSubjectId={activeSubjectId}
            activeUnitId={activeUnitId}
            onSelectSubject={(id) => setActiveSubjectId(id)}
            onSelectUnit={(unitId) => setActiveUnitId(unitId)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isMobileDrawerOpen={isMobileDrawerOpen}
            onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
          />

          {/* Right: Main Learning & Study Canvas */}
          <StudyRoomWorkspace
            trackTitle={activeUniversity.shortName || activeUniversity.name}
            stageTitle={trackData.semestersAvailable ? activeSem : trackData.currentStage}
            subject={activeSubject}
            activeUnitId={activeUnitId}
            activeMode={activeMode}
            collegeName={activeUniversity.name}
            onSelectUnit={(unitId) => setActiveUnitId(unitId)}
            onSelectMode={(mode) => setActiveMode(mode)}
            onOpenMockTest={(subj) => {
              if (onOpenMockTest) {
                onOpenMockTest(subj, selectedTrack || undefined);
              } else if (setActiveTab) {
                setActiveTab('mockTests');
              }
            }}
            onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="space-y-2">
            <p className="text-xs font-mono text-neutral-400">No subjects found for this selection.</p>
            <button
              type="button"
              onClick={() => setActiveSem(1)}
              className="px-3 py-1.5 rounded-lg bg-[#007AFF] text-white text-xs font-mono font-bold"
            >
              Reset to Semester 1
            </button>
          </div>
        </div>
      )}

      {/* 3. SWITCH CURRICULUM MODAL (Features the 12 Authentic University Cards from Image 1) */}
      {isSwitchCurriculumModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#18181A] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl border border-black/[0.08] dark:border-white/[0.1] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#007AFF]" />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-display">
                  Select University Curriculum & Authority
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSwitchCurriculumModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <UniversitySelectorBar
              selectedUniversityId={selectedUniversityId}
              onSelectUniversity={handleSelectUniversity}
              onOpenUploadModal={() => {
                setIsSwitchCurriculumModalOpen(false);
                setIsUploadModalOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* 4. UNIVERSAL SYLLABUS UPLOADER MODAL */}
      <UniversalSyllabusUploaderModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSyllabusLoaded={() => {
          setIsUploadModalOpen(false);
        }}
      />

    </div>
  );
};

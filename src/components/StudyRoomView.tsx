/**
 * ============================================================================
 * VIDYA AI — Study Room Studio (Personalized Intake & Studio Shell)
 * ============================================================================
 * 1. Interactive Academic Intake: Gathers track, semester, branch, university,
 *    and study mission before generating the personalized Study Room.
 * 2. Edge-to-edge integrated studio workspace:
 *    - Pinned Top Studio Bar: Learner badge, instant semester selector, and profile editor
 *    - Left Pane: Clean bordered navigation sidebar with independent scroll
 *    - Right Pane: Spacious reading canvas with sticky header and independent scroll
 * ============================================================================
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getUnifiedTrackData, 
  UnifiedSubject, 
  UnifiedTrackData 
} from './studyRoom/studyRoomAdapter';
import { StudyRoomNavigator } from './studyRoom/StudyRoomNavigator';
import { StudyRoomWorkspace, StudyRoomMode } from './studyRoom/StudyRoomWorkspace';
import { LearnerIntakeWizard, LearnerProfile } from './studyRoom/LearnerIntakeWizard';
import { TARGET_TRACK_OPTIONS } from '../data/otherStreamsSyllabusData';
import { 
  Edit3, 
  Sparkles, 
  GraduationCap, 
  ChevronRight,
  ChevronDown,
  Check,
  CheckCircle2,
  Layers,
  Award,
  Building2,
  BookOpen,
  Target,
  X,
  RotateCcw
} from 'lucide-react';
import { UniversitySelectorBar } from './collegeHub/UniversitySelectorBar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from './ui/dropdown-menu';
import { PAN_INDIA_UNIVERSITIES } from '../data/panIndiaUniversitiesData';
import { toast } from 'sonner';
import { 
  saveLearnerProfileToFirebase, 
  loadLearnerProfileFromFirebase 
} from '../lib/firebase';

interface StudyRoomViewProps {
  initialTopic?: string;
  onSelectTopic?: (topic: string) => void;
  setActiveTab?: (tab: string) => void;
  onOpenMockTest?: (subject: string, streamId?: string) => void;
  initialSemester?: number;
  onSelectSemester?: (sem: number) => void;
}

const normalizeTrack = (trackId?: string | null): string => {
  if (!trackId) return 'btech';
  if (trackId === 'bca' || trackId === 'bca_mca' || trackId === 'bca_college') return 'bca_college';
  if (trackId === 'btech' || trackId === 'btech_university') return 'btech';
  return trackId;
};

export const StudyRoomView: React.FC<StudyRoomViewProps> = ({
  initialTopic = 'Data Structures & Algorithms',
  onSelectTopic,
  setActiveTab,
  onOpenMockTest,
  initialSemester = 3,
  onSelectSemester
}) => {
  // 1. Learner Profile State (Retrieved from localStorage; null if first time)
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(() => {
    try {
      const saved = localStorage.getItem('vidya_learner_profile');
      const targetTrack = localStorage.getItem('vidya_target_track');
      if (saved) {
        const parsed: LearnerProfile = JSON.parse(saved);
        if (targetTrack && targetTrack !== parsed.trackId) {
          const normalizedTrack = normalizeTrack(targetTrack);
          const matchedTrack = TARGET_TRACK_OPTIONS.find(t => t.id === normalizedTrack) || TARGET_TRACK_OPTIONS[0];
          parsed.trackId = normalizedTrack;
          parsed.trackTitle = matchedTrack.title;
          if (normalizedTrack === 'bca_college') {
            parsed.semester = Math.min(6, Math.max(1, parsed.semester || 1));
            parsed.branch = (parsed.branch === 'CSE' || !parsed.branch) ? 'BCA Core' : parsed.branch;
          } else if (normalizedTrack === 'btech') {
            parsed.semester = Math.min(8, Math.max(1, parsed.semester || 3));
            parsed.branch = (parsed.branch === 'BCA Core' || !parsed.branch) ? 'CSE' : parsed.branch;
          }
          localStorage.setItem('vidya_learner_profile', JSON.stringify(parsed));
        }
        return parsed;
      }
      // If no saved profile but targetTrack is saved
      if (targetTrack) {
        const normalizedTrack = normalizeTrack(targetTrack);
        const matchedTrack = TARGET_TRACK_OPTIONS.find(t => t.id === normalizedTrack) || TARGET_TRACK_OPTIONS[0];
        const isBcaTrack = normalizedTrack === 'bca_college';
        const defaultProfile: LearnerProfile = {
          trackId: normalizedTrack,
          trackTitle: matchedTrack.title,
          semester: isBcaTrack ? 1 : 3,
          branch: isBcaTrack ? 'BCA Core' : 'CSE',
          universityId: 'calcutta_univ',
          universityName: 'Calcutta Univ',
          targetOutcome: 'pass_blueprint'
        };
        localStorage.setItem('vidya_learner_profile', JSON.stringify(defaultProfile));
        return defaultProfile;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [profileModalInitialStep, setProfileModalInitialStep] = useState<number>(1);

  // 2. Active Semester State
  const [activeSem, setActiveSem] = useState<number>(() => {
    return learnerProfile?.semester || initialSemester || 1;
  });

  useEffect(() => {
    if (learnerProfile?.semester) {
      setActiveSem(learnerProfile.semester);
    }
  }, [learnerProfile]);

  // Hydrate academic profile from Firebase Firestore if available
  useEffect(() => {
    let isMounted = true;
    loadLearnerProfileFromFirebase().then((cloudProfile) => {
      if (!isMounted || !cloudProfile) return;
      setLearnerProfile((prev) => {
        if (!prev) {
          if (cloudProfile.semester) setActiveSem(cloudProfile.semester);
          return cloudProfile;
        }
        // Update if cloud has newer college, programme or customized track info
        if (
          cloudProfile.collegeName !== prev.collegeName ||
          cloudProfile.programmeName !== prev.programmeName ||
          cloudProfile.universityId !== prev.universityId ||
          cloudProfile.trackId !== prev.trackId ||
          cloudProfile.semester !== prev.semester
        ) {
          if (cloudProfile.semester) setActiveSem(cloudProfile.semester);
          return cloudProfile;
        }
        return prev;
      });
    }).catch((err) => {
      console.warn('[VIDYA] Firestore academic profile fetch notice:', err);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Synchronize target track if changed outside StudyRoomView
  useEffect(() => {
    try {
      const targetTrack = localStorage.getItem('vidya_target_track');
      if (targetTrack && learnerProfile && targetTrack !== learnerProfile.trackId) {
        const normalizedTrack = normalizeTrack(targetTrack);
        const matchedTrack = TARGET_TRACK_OPTIONS.find(t => t.id === normalizedTrack) || TARGET_TRACK_OPTIONS[0];
        const isBcaTrack = normalizedTrack === 'bca_college';
        const isBtechTrack = normalizedTrack === 'btech';

        const targetSem = isBcaTrack 
          ? Math.min(6, Math.max(1, learnerProfile.semester || 1)) 
          : isBtechTrack 
            ? Math.min(8, Math.max(1, learnerProfile.semester || 3)) 
            : 1;

        const targetBranch = isBcaTrack
          ? (learnerProfile.branch === 'CSE' || !learnerProfile.branch ? 'BCA Core' : learnerProfile.branch)
          : isBtechTrack
            ? (learnerProfile.branch === 'BCA Core' || !learnerProfile.branch ? 'CSE' : learnerProfile.branch)
            : '';

        const updated: LearnerProfile = {
          ...learnerProfile,
          trackId: normalizedTrack,
          trackTitle: matchedTrack.title,
          semester: targetSem,
          branch: targetBranch
        };
        setLearnerProfile(updated);
        setActiveSem(targetSem);
        setActiveUnitId(null);
        localStorage.setItem('vidya_learner_profile', JSON.stringify(updated));
      }
    } catch {}
  }, []);

  const selectedTrack = learnerProfile?.trackId || 'btech';

  // 3. Unified Track Data based on user's profile
  const trackData: UnifiedTrackData = useMemo(() => {
    return getUnifiedTrackData(selectedTrack, activeSem, learnerProfile?.universityId);
  }, [selectedTrack, activeSem, learnerProfile?.universityId]);

  // 4. Subject & Unit State
  const [activeSubjectId, setActiveSubjectId] = useState<string>(() => {
    return trackData.subjects[0]?.id || '';
  });
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);

  useEffect(() => {
    if (trackData.subjects.length > 0) {
      const subjectExists = trackData.subjects.some(s => s.id === activeSubjectId);
      if (!subjectExists) {
        setActiveSubjectId(trackData.subjects[0].id);
        setActiveUnitId(null);
      }
    }
  }, [trackData, activeSubjectId]);

  // 5. Active Mode State
  const [activeMode, setActiveMode] = useState<StudyRoomMode>('syllabus');

  // If initialTopic is passed, highlight it
  useEffect(() => {
    if (initialTopic && initialTopic !== 'Matrices & Determinants (Maths)' && initialTopic !== 'Data Structures & Algorithms') {
      const match = trackData.subjects.find(s => 
        s.name.toLowerCase().includes(initialTopic.toLowerCase()) ||
        initialTopic.toLowerCase().includes(s.name.toLowerCase())
      );
      if (match) {
        setActiveSubjectId(match.id);
      }
    }
  }, [initialTopic, trackData]);

  // 6. Navigator Search Query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 7. Mobile Drawer State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // 8. Dismissible College Notification Banner (keeps interface clean & distraction-free)
  const [dismissCollegeBanner, setDismissCollegeBanner] = useState(false);

  // 9. Full Switch Curriculum Modal
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);

  const getGoalBadgeInfo = (outcome?: string) => {
    switch (outcome) {
      case 'pass_blueprint':
        return { label: 'Pass Blueprint', icon: '🎯', mode: 'Pass Strategy' };
      case 'full_mastery':
        return { label: '9+ SGPA Blueprint', icon: '🚀', mode: 'Full Syllabus' };
      case 'ai_deep_dive':
        return { label: 'Concept Deep Dive', icon: '🧠', mode: 'Viva Prep' };
      case 'speed_drills':
        return { label: 'Speed Drills & PYQs', icon: '🧪', mode: 'Mock Practice' };
      default:
        return { label: 'Pass Blueprint', icon: '🎯', mode: 'Pass Strategy' };
    }
  };

  // Handlers
  const handleProfileComplete = (newProfile: LearnerProfile) => {
    const normalized = normalizeTrack(newProfile.trackId);
    const finalProfile: LearnerProfile = { ...newProfile, trackId: normalized };
    const sem = finalProfile.semester || 1;
    setActiveSem(sem);
    setActiveUnitId(null);
    if (onSelectSemester) {
      onSelectSemester(sem);
    }
    localStorage.setItem('vidya_learner_profile', JSON.stringify(finalProfile));
    localStorage.setItem('vidya_target_track', normalized);
    saveLearnerProfileToFirebase(finalProfile).catch(() => {});
    setShowProfileModal(false);

    // Automatically calibrate mode based on chosen target outcome
    if (finalProfile.targetOutcome === 'pass_blueprint') {
      setActiveMode('strategy');
    } else if (finalProfile.targetOutcome === 'speed_drills') {
      setActiveMode('practice');
    } else if (finalProfile.targetOutcome === 'ai_deep_dive') {
      setActiveMode('deepDive');
    } else if (finalProfile.targetOutcome === 'full_mastery') {
      setActiveMode('syllabus');
    }

    toast.success(`Study Room Configured for ${finalProfile.trackId === 'btech' ? `B.Tech ${finalProfile.branch}` : finalProfile.trackTitle}!`, {
      description: `Loaded official syllabus, verified PYQs, and pass strategy for ${finalProfile.universityName}.`
    });
  };

  const handleSwitchTrack = (newTrackId: string) => {
    const normalized = normalizeTrack(newTrackId);
    const isBcaTrack = normalized === 'bca_college';
    const isBtechTrack = normalized === 'btech';
    const matchedTrack = TARGET_TRACK_OPTIONS.find(t => t.id === normalized) || TARGET_TRACK_OPTIONS[0];

    const targetSem = isBcaTrack
      ? Math.min(6, Math.max(1, activeSem || 1))
      : isBtechTrack
        ? Math.min(8, Math.max(1, activeSem || 3))
        : 1;

    const newBranch = isBtechTrack
      ? (learnerProfile?.branch && learnerProfile.branch !== 'BCA Core' ? learnerProfile.branch : 'CSE')
      : isBcaTrack
        ? 'BCA Core'
        : '';

    const newUniversityId = (isBtechTrack || isBcaTrack)
      ? (learnerProfile?.universityId && !['cbse', 'icse', 'upmsp', 'wbchse', 'nta', 'ssc'].includes(learnerProfile.universityId)
          ? learnerProfile.universityId
          : 'calcutta_univ')
      : (normalized === 'cbse_12' || normalized === 'cbse_10') ? 'cbse' : (normalized === 'jee_main' ? 'nta' : 'ssc');

    const matchedUniv = PAN_INDIA_UNIVERSITIES.find(u => u.id === newUniversityId);
    const newUniversityName = matchedUniv ? matchedUniv.shortName : (newUniversityId === 'calcutta_univ' ? 'Calcutta Univ' : newUniversityId.toUpperCase());

    const updatedProfile: LearnerProfile = {
      trackId: normalized,
      trackTitle: matchedTrack.title,
      semester: targetSem,
      branch: newBranch,
      universityId: newUniversityId,
      universityName: newUniversityName,
      targetOutcome: learnerProfile?.targetOutcome || 'pass_blueprint'
    };

    setLearnerProfile(updatedProfile);
    setActiveSem(targetSem);
    setActiveUnitId(null);
    if (onSelectSemester) {
      onSelectSemester(targetSem);
    }
    localStorage.setItem('vidya_learner_profile', JSON.stringify(updatedProfile));
    localStorage.setItem('vidya_target_track', normalized);
    saveLearnerProfileToFirebase(updatedProfile).catch(() => {});

    toast.success(`Switched Study Room to ${isBtechTrack ? `B.Tech ${newBranch}` : matchedTrack.title}!`, {
      description: `Loaded official curriculum, verified PYQs, and 30-day pass strategy.`
    });
  };

  const handleSelectSemester = (sem: number) => {
    setActiveSem(sem);
    setActiveUnitId(null);
    if (onSelectSemester) {
      onSelectSemester(sem);
    }
    // Update profile semester in storage
    if (learnerProfile) {
      const updated = { ...learnerProfile, semester: sem };
      setLearnerProfile(updated);
      localStorage.setItem('vidya_learner_profile', JSON.stringify(updated));
      saveLearnerProfileToFirebase(updated).catch(() => {});
    }
  };

  const activeSubject = useMemo(() => {
    return trackData.subjects.find(s => s.id === activeSubjectId) || trackData.subjects[0];
  }, [trackData, activeSubjectId]);

  const currentTrackMeta = TARGET_TRACK_OPTIONS.find(t => t.id === selectedTrack) || TARGET_TRACK_OPTIONS[0];

  // =========================================================================
  // CASE 1: FIRST-TIME INTAKE FLOW (User hasn't configured basic data yet)
  // =========================================================================
  if (!learnerProfile) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 bg-[#FBFBFC] dark:bg-[#18181A] overflow-y-auto custom-scrollbar">
        <LearnerIntakeWizard
          onComplete={handleProfileComplete}
        />
      </div>
    );
  }

  // =========================================================================
  // CASE 2: PERSONALIZED STUDY ROOM STUDIO (Profile already set)
  // =========================================================================
  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#FBFBFC] dark:bg-[#18181A]">
      
      {/* Edit Profile & Goal Modal */}
      {showProfileModal && (
        <LearnerIntakeWizard
          isModal={true}
          initialStep={profileModalInitialStep}
          initialProfile={learnerProfile}
          onComplete={(p) => {
            handleProfileComplete(p);
            setProfileModalInitialStep(1);
          }}
          onCancel={() => {
            setShowProfileModal(false);
            setProfileModalInitialStep(1);
          }}
        />
      )}

      {/* =======================================================================
          1. INTEGRATED STUDIO SUB-HEADER BAR (Distraction-Free, Apple-Grade)
          ======================================================================= */}
      <header className="min-h-14 border-b border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#18181A] px-4 sm:px-6 py-2 flex items-center justify-between gap-3 shrink-0 select-none z-30">
        
        {/* Left: Stream Selector & Minimalist Semester Pills */}
        <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar py-0.5 min-w-0">
          <div className="flex flex-col shrink-0">
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
              Target Selection
            </span>
            {/* Stream Switcher Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer text-xs sm:text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] shrink-0 group border border-black/[0.06] dark:border-white/[0.08]"
                  title="Switch curriculum stream or customize target"
                >
                  <span className="text-base">{currentTrackMeta.icon}</span>
                  <span className="font-bold truncate max-w-[150px] sm:max-w-[200px]">
                    {learnerProfile.programmeName
                      ? (learnerProfile.programmeName.length > 22 ? (learnerProfile.branch || learnerProfile.programmeName) : learnerProfile.programmeName)
                      : trackData.isBtech
                      ? `B.Tech ${learnerProfile.branch || 'CSE'}`
                      : (learnerProfile.trackId === 'bca_college' || learnerProfile.trackId === 'bca_mca'
                          ? `BCA (${learnerProfile.branch || 'Core'})`
                          : currentTrackMeta.title)}
                  </span>
                  {learnerProfile.collegeName && (
                    <span className="hidden lg:inline-block text-[11px] text-neutral-400 font-normal truncate max-w-[140px]">
                      • {learnerProfile.collegeName}
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#007AFF] transition-colors shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 p-2">
                <DropdownMenuLabel className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-2 py-1">
                  Switch Course / Stream
                </DropdownMenuLabel>
                {TARGET_TRACK_OPTIONS.map((track) => {
                  const isSelected = selectedTrack === track.id || (track.id === 'bca_college' && (selectedTrack === 'bca_mca' || selectedTrack === 'bca'));
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
                <DropdownMenuSeparator className="my-1.5" />
                <DropdownMenuItem
                  onClick={() => {
                    setProfileModalInitialStep(4);
                    setShowProfileModal(true);
                  }}
                  className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 rounded-xl cursor-pointer hover:text-[#007AFF] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  <Target className="w-3.5 h-3.5 text-amber-500" />
                  <span>Change Study Goal ({getGoalBadgeInfo(learnerProfile.targetOutcome).label})...</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setProfileModalInitialStep(3);
                    setShowProfileModal(true);
                  }}
                  className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 rounded-xl cursor-pointer hover:text-[#007AFF] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span className="truncate">
                    {learnerProfile.universityId === 'makaut'
                      ? (learnerProfile.programmeName || learnerProfile.collegeName
                          ? `MAKAUT Degree & College (${(learnerProfile.programmeName || learnerProfile.collegeName || '').split('(')[0].trim()})`
                          : 'Select MAKAUT Degree & College...')
                      : learnerProfile.universityId === 'calcutta_univ'
                      ? (learnerProfile.collegeName ? `Change College (${learnerProfile.collegeName.split('(')[0].trim()})` : 'Enter CU College...')
                      : 'Select Affiliated College...'}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setProfileModalInitialStep(1);
                    setShowProfileModal(true);
                  }}
                  className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 rounded-xl cursor-pointer hover:text-[#007AFF] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile & Target Semester (Steps 1–4)...</span>
                </DropdownMenuItem>
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
                    onClick={() => handleSelectSemester(semNum)}
                    className={`relative px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer select-none shrink-0 ${
                      isSelected
                        ? 'text-[#007AFF] font-bold'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="studioSemesterPill"
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

        {/* Right: Switch Curriculum, Goal Pill & Profile Settings Button */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Switch Curriculum Button (Exact match to screenshot) */}
          <button
            type="button"
            onClick={() => setShowCurriculumModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-xs font-mono font-bold text-neutral-700 dark:text-neutral-200 transition-all cursor-pointer shadow-2xs bg-white dark:bg-[#202023]"
            title="Switch University Curriculum or Exam Target"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
            <span>Switch Curriculum</span>
          </button>

          {/* Subtle Goal Pill */}
          <button
            type="button"
            onClick={() => {
              setProfileModalInitialStep(4);
              setShowProfileModal(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20 transition-all cursor-pointer text-xs font-mono"
            title="Active Study Goal — Click to Change"
          >
            <span>{getGoalBadgeInfo(learnerProfile.targetOutcome).icon}</span>
            <span className="hidden md:inline font-medium">
              {getGoalBadgeInfo(learnerProfile.targetOutcome).label}
            </span>
          </button>

          {/* Profile Setup Trigger */}
          <button
            type="button"
            onClick={() => {
              setProfileModalInitialStep(1);
              setShowProfileModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:text-[#007AFF] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer"
            title="Edit Track, Degree, College & Semester"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Profile</span>
          </button>
        </div>
      </header>

      {/* Switch Curriculum Modal with Authentic University Selector Grid */}
      {showCurriculumModal && (
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
                onClick={() => setShowCurriculumModal(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <UniversitySelectorBar
              selectedUniversityId={learnerProfile.universityId || 'makaut'}
              onSelectUniversity={(uniId) => {
                const updated: LearnerProfile = {
                  ...learnerProfile,
                  universityId: uniId,
                  universityName: uniId.toUpperCase()
                };
                setLearnerProfile(updated);
                localStorage.setItem('vidya_learner_profile', JSON.stringify(updated));
                setShowCurriculumModal(false);
              }}
              onOpenUploadModal={() => {
                setShowCurriculumModal(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Sleek, Non-Intrusive Dismissible College Prompt (MAKAUT) */}
      {!dismissCollegeBanner && learnerProfile.universityId === 'makaut' && !learnerProfile.collegeName && (
        <div className="mx-4 sm:mx-6 mt-2 p-2.5 sm:px-4 rounded-xl bg-blue-500/[0.06] dark:bg-blue-500/[0.08] border border-[#007AFF]/20 flex items-center justify-between gap-3 text-xs shrink-0 animate-fade-in">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm shrink-0">🏛️</span>
            <p className="text-neutral-700 dark:text-neutral-300 truncate">
              Select your MAKAUT college to personalize college-specific notes & PYQs.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setProfileModalInitialStep(3);
                setShowProfileModal(true);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#007AFF] text-white font-mono font-semibold text-[11px] hover:bg-[#0062CC] transition-colors cursor-pointer"
            >
              Select College
            </button>
            <button
              type="button"
              onClick={() => setDismissCollegeBanner(true)}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Sleek, Non-Intrusive Dismissible College Prompt (CU) */}
      {!dismissCollegeBanner && learnerProfile.universityId === 'calcutta_univ' && !learnerProfile.collegeName && (
        <div className="mx-4 sm:mx-6 mt-2 p-2.5 sm:px-4 rounded-xl bg-amber-500/[0.06] dark:bg-amber-500/[0.08] border border-amber-500/20 flex items-center justify-between gap-3 text-xs shrink-0 animate-fade-in">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm shrink-0">🏛️</span>
            <p className="text-neutral-700 dark:text-neutral-300 truncate">
              Select your CU college to personalize college-specific notes & PYQs.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setProfileModalInitialStep(3);
                setShowProfileModal(true);
              }}
              className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-mono font-semibold text-[11px] hover:bg-amber-700 transition-colors cursor-pointer"
            >
              Select CU College
            </button>
            <button
              type="button"
              onClick={() => setDismissCollegeBanner(true)}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}


      {/* =======================================================================
          2. SEAMLESS MASTER-DETAIL SPLIT PANE
          ======================================================================= */}
      {activeSubject ? (
        <div className="flex-1 min-h-0 flex items-stretch overflow-hidden relative">
          {/* Left Sidebar Pane */}
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

          {/* Right Main Learning Canvas */}
          <StudyRoomWorkspace
            trackTitle={trackData.title}
            stageTitle={trackData.semestersAvailable ? activeSem : trackData.currentStage}
            subject={activeSubject}
            activeUnitId={activeUnitId}
            activeMode={activeMode}
            collegeName={learnerProfile.collegeName}
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
              onClick={() => handleSelectSemester(1)}
              className="px-3 py-1.5 rounded-lg bg-[#007AFF] text-white text-xs font-mono font-bold"
            >
              Reset to Semester 1
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

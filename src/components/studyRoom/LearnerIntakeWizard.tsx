/**
 * ============================================================================
 * VIDYA AI — Learner Intake & Profile Customizer
 * ============================================================================
 * Step-by-step personalized onboarding flow with Firebase persistence:
 * 1. Target Track (B.Tech, BCA, CBSE 10/12, State Boards, GATE, JEE, SSC)
 * 2. Board / University Authority (MAKAUT, Calcutta University, CBSE, AKTU, VTU)
 * 3. College / Institution (Official 200 MAKAUT Programmes & Codes 101-392 Colleges, CU 155 Colleges)
 * 4. Semester, Branch & Study Goal (Sem 1-8, Pass Blueprint, 9+ SGPA) -> Save to Firebase
 * ============================================================================
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Flame, 
  Award, 
  Calculator,
  Search,
  Building2,
  Target,
  ExternalLink,
  Cloud,
  Database,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TARGET_TRACK_OPTIONS } from '../../data/otherStreamsSyllabusData';
import { PAN_INDIA_UNIVERSITIES } from '../../data/panIndiaUniversitiesData';
import { 
  ALL_EDUCATION_BOARDS, 
  EDUCATION_BOARDS_CATEGORIES, 
  EducationBoardMeta 
} from '../../data/educationBoardsData';
import { 
  MAKAUT_AFFILIATED_COLLEGES, 
  CU_AFFILIATED_COLLEGES, 
  AffiliatedCollege, 
  getAffiliatedCollegesByUniversity 
} from '../../data/affiliatedCollegesData';
import {
  MAKAUT_PROGRAMMES,
  MAKAUT_PROGRAMME_TYPES,
  POPULAR_MAKAUT_PROGRAMMES,
  searchMakautProgrammes,
  MakautProgramme,
  MakautProgrammeType
} from '../../data/makautProgrammesData';
import { 
  saveLearnerProfileToFirebase, 
  SavedAcademicProfile 
} from '../../lib/firebase';

export interface LearnerProfile {
  trackId: string;
  trackTitle: string;
  semester?: number;
  branch?: string;
  universityId: string;
  universityName: string;
  collegeId?: string;
  collegeName?: string;
  programmeId?: string;
  programmeName?: string;
  targetOutcome: string;
}

interface LearnerIntakeWizardProps {
  initialProfile?: LearnerProfile | null;
  initialStep?: number;
  onComplete: (profile: LearnerProfile) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

const BTECH_BRANCHES = [
  { id: 'cse', name: 'Computer Science & Engineering (CSE)', code: 'CSE', icon: '💻' },
  { id: 'it', name: 'Information Technology (IT)', code: 'IT', icon: '🌐' },
  { id: 'aiml', name: 'Artificial Intelligence & Machine Learning (AI/ML)', code: 'AIML', icon: '🤖' },
  { id: 'ds', name: 'Data Science (CSE - DS)', code: 'DS', icon: '📊' },
  { id: 'csbs', name: 'Computer Science & Business Systems (CSBS)', code: 'CSBS', icon: '📈' },
  { id: 'cyber', name: 'Cyber Security & Digital Forensics', code: 'Cyber', icon: '🛡️' },
  { id: 'ece', name: 'Electronics & Communication (ECE)', code: 'ECE', icon: '⚡' },
  { id: 'ee', name: 'Electrical Engineering (EE)', code: 'EE', icon: '🔌' },
  { id: 'me', name: 'Mechanical Engineering (ME)', code: 'ME', icon: '⚙️' },
  { id: 'civil', name: 'Civil Engineering (CE)', code: 'CE', icon: '🏗️' },
  { id: 'biotech', name: 'Biotechnology (B.Tech Biotech)', code: 'Biotech', icon: '🧬' },
  { id: 'food_tech', name: 'Food Science & Technology', code: 'Food Tech', icon: '🔬' }
];

const BCA_TRACKS = [
  { id: 'bca_core', name: 'Bachelor of Computer Applications (Core BCA)', code: 'BCA Core', icon: '💻' },
  { id: 'bca_ai_ds', name: 'BCA in Artificial Intelligence & Data Science', code: 'BCA AI/DS', icon: '🤖' },
  { id: 'bca_cloud_web', name: 'BCA in Cloud Computing & Cyber Security', code: 'BCA Cloud', icon: '🌐' },
  { id: 'bsc_it_ds', name: 'B.Sc. in Data Science / IT (Data Science)', code: 'B.Sc Data Science', icon: '📊' },
  { id: 'bsc_cyber_sec', name: 'B.Sc. in Cyber Security / IT (Cyber Security)', code: 'B.Sc Cyber', icon: '🛡️' },
  { id: 'bsc_it_ai', name: 'B.Sc. in IT (Artificial Intelligence)', code: 'B.Sc IT AI', icon: '🧠' },
  { id: 'bsc_cs', name: 'B.Sc. Computer Science', code: 'B.Sc CS', icon: '💻' },
  { id: 'bsc_anim_vfx', name: 'B.Sc. in Animation, Film Making, Graphics & VFX', code: 'B.Sc Animation & VFX', icon: '🎬' },
  { id: 'bsc_gaming', name: 'B.Sc. in Gaming & Mobile App Development', code: 'B.Sc Gaming', icon: '🎮' },
  { id: 'bba_analytics', name: 'BBA in Business Analytics', code: 'BBA Analytics', icon: '📈' },
  { id: 'bba_hospital', name: 'BBA in Hospital Management', code: 'BBA Hospital Mgmt', icon: '🏥' },
  { id: 'bba_marketing', name: 'BBA in Digital Marketing', code: 'BBA Digital', icon: '📱' },
  { id: 'bsc_forensic', name: 'B.Sc. in Forensic Science', code: 'B.Sc Forensic', icon: '🔍' },
  { id: 'bsc_biotech', name: 'B.Sc. in Biotechnology & Bioinformatics', code: 'B.Sc Biotech', icon: '🧬' },
  { id: 'b_optom', name: 'B.Optom (Bachelor of Optometry)', code: 'B.Optom', icon: '👁️' },
  { id: 'bsc_mlt', name: 'B.Sc. Medical Lab Technology (BMLT)', code: 'BMLT', icon: '🔬' }
];

const PREPARATION_GOALS = [
  {
    id: 'pass_blueprint',
    title: 'High-Yield PYQs & 30-Day Pass Blueprint',
    desc: 'Target minimum 40%+ passing threshold with repeated 10-mark questions & derivation proofs.',
    icon: '🎯',
    badge: 'Exam Focused'
  },
  {
    id: 'full_mastery',
    title: 'Full Syllabus Mastery & 9+ SGPA Blueprint',
    desc: 'Complete unit-by-unit syllabus, academic outcomes, and textbook reference notes.',
    icon: '🚀',
    badge: 'Topper Track'
  },
  {
    id: 'ai_deep_dive',
    title: 'AI Concept Deep Dive & Lab Viva Preparation',
    desc: 'Interactive mathematical proofs, code examples, and oral viva question banks.',
    icon: '🧠',
    badge: 'Conceptual'
  },
  {
    id: 'speed_drills',
    title: 'Mock Examination & Timed Speed Drills',
    desc: 'Test your speed and accuracy with simulated university exam test engines.',
    icon: '🧪',
    badge: 'Practice'
  }
];

const FEATURED_UNIVERSITIES_QUICK = [
  { id: 'makaut', name: 'MAKAUT (WBUT)', state: 'West Bengal', badge: 'State Technical Board', icon: '🏛️' },
  { id: 'calcutta_univ', name: 'Calcutta University (CU)', state: 'West Bengal', badge: 'Heritage State Univ (Est. 1857)', icon: '🏛️' },
  { id: 'jadavpur', name: 'Jadavpur University', state: 'West Bengal', badge: 'State Autonomous', icon: '🏛️' },
  { id: 'aktu', name: 'AKTU (UPTU)', state: 'Uttar Pradesh', badge: 'State Technical Board', icon: '🎓' },
  { id: 'vtu', name: 'VTU Belagavi', state: 'Karnataka', badge: 'State Technical Board', icon: '🏛️' },
  { id: 'anna_univ', name: 'Anna University', state: 'Tamil Nadu', badge: 'Affiliating Board', icon: '🏛️' },
  { id: 'dtu', name: 'Delhi Tech Univ (DTU)', state: 'Delhi', badge: 'Autonomous State Univ', icon: '🏛️' }
];

const FEATURED_BOARDS_QUICK = [
  { id: 'cbse', name: 'CBSE', state: 'Pan-India', badge: 'National Board', icon: '🏫' },
  { id: 'icse', name: 'CISCE / ISC', state: 'Pan-India', badge: 'National Board', icon: '🏫' },
  { id: 'wbchse', name: 'WBCHSE', state: 'West Bengal', badge: 'Higher Secondary', icon: '🏛️' },
  { id: 'upmsp', name: 'UP Board', state: 'Uttar Pradesh', badge: 'High School & Inter', icon: '🏛️' },
  { id: 'msbshse', name: 'Maharashtra Board', state: 'Maharashtra', badge: 'SSC / HSC', icon: '🏛️' },
  { id: 'kseab', name: 'Karnataka KSEAB', state: 'Karnataka', badge: 'SSLC / PUC', icon: '🏛️' },
  { id: 'bseb', name: 'Bihar BSEB', state: 'Bihar', badge: 'Matric & Inter', icon: '🏛️' },
  { id: 'nta', name: 'NTA (JEE / NEET)', state: 'Pan-India', badge: 'Testing Agency', icon: '⚡' }
];

export const LearnerIntakeWizard: React.FC<LearnerIntakeWizardProps> = ({
  initialProfile,
  initialStep = 1,
  onComplete,
  onCancel,
  isModal = false
}) => {
  const [step, setStep] = useState<number>(initialStep || 1);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (initialStep) {
      setStep(initialStep);
    }
  }, [initialStep]);

  // Form State
  const [selectedTrackId, setSelectedTrackId] = useState<string>(() => {
    if (initialProfile?.trackId) {
      const t = initialProfile.trackId;
      return (t === 'bca' || t === 'bca_mca') ? 'bca_college' : (t === 'btech_university' ? 'btech' : t);
    }
    try {
      const stored = localStorage.getItem('vidya_target_track');
      if (stored) {
        return (stored === 'bca' || stored === 'bca_mca') ? 'bca_college' : (stored === 'btech_university' ? 'btech' : stored);
      }
    } catch {}
    return 'btech';
  });

  const [selectedUniversityId, setSelectedUniversityId] = useState<string>(
    initialProfile?.universityId || (initialProfile?.trackId === 'cbse_12' || initialProfile?.trackId === 'cbse_10' ? 'cbse' : 'makaut')
  );

  const [selectedCollegeId, setSelectedCollegeId] = useState<string>(
    initialProfile?.collegeId || ''
  );
  const [selectedCollegeName, setSelectedCollegeName] = useState<string>(
    initialProfile?.collegeName || ''
  );
  const [collegeSearch, setCollegeSearch] = useState<string>('');

  // MAKAUT Degree & Programme State
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<string>(
    initialProfile?.programmeId || ''
  );
  const [selectedProgrammeName, setSelectedProgrammeName] = useState<string>(
    initialProfile?.programmeName || ''
  );
  const [makautProgSearch, setMakautProgSearch] = useState<string>('');
  const [makautProgTypeFilter, setMakautProgTypeFilter] = useState<MakautProgrammeType | 'all'>('all');

  const filteredMakautProgrammes = useMemo(() => {
    return searchMakautProgrammes(makautProgSearch, undefined, makautProgTypeFilter);
  }, [makautProgSearch, makautProgTypeFilter]);

  const [cuSearch, setCuSearch] = useState<string>('');
  const [cuDistrictFilter, setCuDistrictFilter] = useState<string>('all');

  const [selectedSemester, setSelectedSemester] = useState<number>(
    initialProfile?.semester || 3
  );
  const [selectedBranch, setSelectedBranch] = useState<string>(
    initialProfile?.branch || 'CSE'
  );

  const [selectedOutcome, setSelectedOutcome] = useState<string>(
    initialProfile?.targetOutcome || 'pass_blueprint'
  );
  const [univSearch, setUnivSearch] = useState<string>('');
  const [boardCategoryFilter, setBoardCategoryFilter] = useState<string>('all');

  const filteredMakautColleges = useMemo(() => {
    if (!collegeSearch.trim()) return MAKAUT_AFFILIATED_COLLEGES;
    const q = collegeSearch.toLowerCase().trim();
    return MAKAUT_AFFILIATED_COLLEGES.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.code.includes(q) ||
      c.district.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q)
    );
  }, [collegeSearch]);

  const filteredCuColleges = useMemo(() => {
    return CU_AFFILIATED_COLLEGES.filter(c => {
      const matchDistrict = cuDistrictFilter === 'all' || c.district === cuDistrictFilter;
      if (!matchDistrict) return false;
      if (!cuSearch.trim()) return true;
      const q = cuSearch.toLowerCase().trim();
      return (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q) ||
        (c.cityOrArea && c.cityOrArea.toLowerCase().includes(q))
      );
    });
  }, [cuSearch, cuDistrictFilter]);

  const selectedTrackMeta = TARGET_TRACK_OPTIONS.find(t => t.id === selectedTrackId) || TARGET_TRACK_OPTIONS[0];
  const isBtech = selectedTrackId === 'btech';
  const isBca = selectedTrackId === 'bca_college' || selectedTrackId === 'bca_mca' || selectedTrackId === 'bca';
  const isCollegeTrack = isBtech || isBca;
  const isSchoolOrExamBoard = !isCollegeTrack;

  const handleSelectTrack = (trackId: string) => {
    const normalized = (trackId === 'bca' || trackId === 'bca_mca') ? 'bca_college' : trackId;
    setSelectedTrackId(normalized);
    setUnivSearch('');
    // Auto-select sensible board or university when switching track
    if (normalized === 'cbse_12' || normalized === 'cbse_10') {
      setSelectedUniversityId('cbse');
    } else if (normalized === 'jee_main') {
      setSelectedUniversityId('nta');
    } else if (normalized === 'gate_2027') {
      setSelectedUniversityId('gate_iit');
    } else if (normalized === 'ssc_cgl') {
      setSelectedUniversityId('ssc');
    } else if (normalized === 'btech' || normalized === 'bca_college') {
      setSelectedUniversityId('makaut');
    }

    // Harmonize semester & branch when switching track
    if (normalized === 'bca_college') {
      setSelectedSemester(prev => Math.min(6, Math.max(1, prev || 1)));
      if (!selectedBranch || selectedBranch === 'CSE') {
        setSelectedBranch('BCA Core');
      }
    } else if (normalized === 'btech') {
      setSelectedSemester(prev => Math.min(8, Math.max(1, prev || 3)));
      if (!selectedBranch || selectedBranch === 'BCA Core') {
        setSelectedBranch('CSE');
      }
    }

    // Advance to Step 2 (Board)
    setStep(2);
  };

  // Filtered universities for B.Tech / BCA College tracks
  const filteredUniversities = PAN_INDIA_UNIVERSITIES.filter(u => {
    if (!univSearch.trim()) return true;
    const q = univSearch.toLowerCase().trim();
    return (
      u.name.toLowerCase().includes(q) ||
      u.shortName.toLowerCase().includes(q) ||
      u.state.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      (q === 'cu' && u.id === 'calcutta_univ') ||
      (q === 'makaut' && u.id === 'makaut')
    );
  }).slice(0, 20);

  // Filtered education boards for School / Exam tracks
  const filteredBoards = ALL_EDUCATION_BOARDS.filter(b => {
    const matchCat = boardCategoryFilter === 'all' || b.category === boardCategoryFilter;
    if (!matchCat) return false;
    if (!univSearch.trim()) return true;
    const q = univSearch.toLowerCase().trim();
    return (
      b.name.toLowerCase().includes(q) ||
      b.shortName.toLowerCase().includes(q) ||
      b.state.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q)
    );
  });

  const handleFinish = async () => {
    setIsSaving(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    const matchedBoard = ALL_EDUCATION_BOARDS.find(b => b.id === selectedUniversityId);
    const matchedUniv = PAN_INDIA_UNIVERSITIES.find(u => u.id === selectedUniversityId);

    const resolvedAuthorityName = isSchoolOrExamBoard
      ? (matchedBoard ? matchedBoard.shortName : selectedUniversityId.toUpperCase())
      : (matchedUniv ? matchedUniv.shortName : (matchedBoard ? matchedBoard.shortName : 'MAKAUT (WBUT)'));

    const normalizedTrackId = (selectedTrackId === 'bca' || selectedTrackId === 'bca_mca') ? 'bca_college' : selectedTrackId;
    const finalProfile: LearnerProfile = {
      trackId: normalizedTrackId,
      trackTitle: selectedTrackMeta.title,
      semester: selectedSemester,
      branch: isBtech ? selectedBranch : isBca ? (selectedBranch || 'BCA Core') : (selectedProgrammeName || selectedBranch || ''),
      universityId: selectedUniversityId,
      universityName: resolvedAuthorityName,
      collegeId: selectedCollegeId || undefined,
      collegeName: selectedCollegeName || undefined,
      programmeId: selectedProgrammeId || undefined,
      programmeName: selectedProgrammeName || undefined,
      targetOutcome: selectedOutcome
    };

    // Save to Firebase Firestore & localStorage
    try {
      await saveLearnerProfileToFirebase(finalProfile);
    } catch (e) {
      console.warn('Could not sync to Firebase:', e);
    }

    setIsSaving(false);
    onComplete(finalProfile);
  };

  const headerContent = (
    <div className="text-center space-y-2.5">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/25 text-xs sm:text-sm font-mono font-bold">
        <Sparkles className="w-4 h-4" />
        <span>Step {step} of 4 • Academic Intake</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
          <Cloud className="w-3 h-3" />
          <span>Firebase Sync Active</span>
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
        {step === 1 && "1. Select your Target Track"}
        {step === 2 && (isSchoolOrExamBoard ? "2. Select your Examination Board" : "2. Select your Board or University")}
        {step === 3 && (isSchoolOrExamBoard ? "3. Select your School or Center" : "3. Select your College")}
        {step === 4 && (isBtech ? "4. Select your B.Tech Semester & Save" : isBca ? "4. Select your BCA Semester & Save" : "4. Select your Semester / Stage & Save")}
      </h2>

      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed">
        {step === 1 && "Choose what you are preparing for (B.Tech, BCA, CBSE 10/12, GATE, JEE, SSC)."}
        {step === 2 && (isSchoolOrExamBoard ? "Select your education board (CBSE, ICSE/ISC, WBCHSE, UP Board, etc.)." : "Select your university or affiliating board (MAKAUT, Calcutta University, VTU, AKTU, etc.).")}
        {step === 3 && (isSchoolOrExamBoard ? "Select or enter your school/exam center." : "Choose your college and degree under your university.")}
        {step === 4 && "Choose your active semester and study goal. VIDYA AI will save your full profile to Firebase so you can resume anytime."}
      </p>

      {/* Interactive Step Navigation Tabs (Exact 1. Track -> 2. Board -> 3. College -> 4. Semester) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-2 max-w-xl mx-auto">
        {[
          { num: 1, label: 'Track', icon: '🎯' },
          { num: 2, label: isSchoolOrExamBoard ? 'Board' : 'Board / Univ', icon: '🏛️' },
          { num: 3, label: 'College', icon: '🏫' },
          { num: 4, label: 'Semester', icon: '📚' }
        ].map((item) => {
          const isActive = step === item.num;
          const isCompleted = step > item.num;
          return (
            <button
              key={item.num}
              type="button"
              onClick={() => setStep(item.num)}
              className={`py-2 px-2.5 rounded-xl text-xs sm:text-[13px] font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border text-center ${
                isActive
                  ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm ring-2 ring-[#007AFF]/30'
                  : isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-black/[0.03] dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400 border-black/[0.06] dark:border-white/[0.08] hover:border-[#007AFF]/40 hover:bg-black/[0.05]'
              }`}
              title={`Jump to Step ${item.num}: ${item.label}`}
            >
              <span>{item.icon}</span>
              <span className="truncate">{item.num}. {item.label}</span>
              {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );

  const stepContent = (
    <>
      {/* =========================================================================
          STEP 1: SELECT YOUR TRACK (like BTech)
          ========================================================================= */}
      {step === 1 && (
        <motion.div
          key="step-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
        >
          {TARGET_TRACK_OPTIONS.map((track) => {
            const isSelected = selectedTrackId === track.id;

            return (
              <div
                key={track.id}
                onClick={() => handleSelectTrack(track.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'bg-[#007AFF]/10 border-[#007AFF] ring-2 ring-[#007AFF] shadow-sm'
                    : 'bg-white dark:bg-[#1C1C1E] border-black/[0.08] dark:border-white/[0.08] hover:border-[#007AFF]/50'
                }`}
              >
                <span className="text-3xl shrink-0 p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05]">
                  {track.icon}
                </span>
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm sm:text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
                      {track.title}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#007AFF] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {track.description}
                  </p>
                  <span className="inline-block text-xs font-mono font-bold text-[#007AFF]">
                    {track.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* =========================================================================
          STEP 2: BOARD / UNIVERSITY AUTHORITY
          ========================================================================= */}
      {step === 2 && (
        <motion.div
          key="step-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.18 }}
          className="space-y-4"
        >
          {isSchoolOrExamBoard ? (
            /* School / Competitive Exam Boards */
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Popular Examination Boards:
                  </label>
                  <span className="text-[11px] font-mono text-[#007AFF] font-semibold">1-Click Select</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_BOARDS_QUICK.map(fb => {
                    const isSelected = selectedUniversityId === fb.id;
                    return (
                      <button
                        key={fb.id}
                        type="button"
                        onClick={() => {
                          setSelectedUniversityId(fb.id);
                          setUnivSearch('');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm ring-2 ring-[#007AFF]/30'
                            : 'bg-white dark:bg-[#1C1C1E] border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:border-[#007AFF]/60'
                        }`}
                      >
                        <span>{fb.icon}</span>
                        <span>{fb.name}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Board Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
                {EDUCATION_BOARDS_CATEGORIES.map(cat => {
                  const isActive = boardCategoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setBoardCategoryFilter(cat.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#007AFF]/15 text-[#007AFF] border border-[#007AFF]/40 font-bold'
                          : 'bg-black/[0.03] dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400 border border-black/[0.06] dark:border-white/[0.08]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Input for Boards */}
              <div className="relative pt-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  value={univSearch}
                  onChange={(e) => setUnivSearch(e.target.value)}
                  placeholder="Search board by name, abbreviation, or state (e.g. CBSE, ICSE, WBCHSE, UP Board)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.08] focus:outline-none focus:border-[#007AFF] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400"
                />
                {univSearch && (
                  <button
                    type="button"
                    onClick={() => setUnivSearch('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white text-xs p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Education Boards Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto custom-scrollbar pr-1">
                {filteredBoards.map((board) => {
                  const isSelected = selectedUniversityId === board.id;

                  return (
                    <div
                      key={board.id}
                      onClick={() => setSelectedUniversityId(board.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-[#007AFF]/10 border-[#007AFF] ring-2 ring-[#007AFF]/40'
                          : 'bg-white dark:bg-[#1C1C1E] border-black/[0.08] dark:border-white/[0.08] hover:border-[#007AFF]/50'
                      }`}
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{board.icon}</span>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-display font-extrabold text-sm sm:text-base text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
                            {board.shortName}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />}
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-1 font-medium">
                          {board.name}
                        </p>
                        <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                          <span className="text-xs font-mono text-neutral-400 font-semibold">{board.state}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                            {board.categoryLabel.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Technical Boards & Universities (MAKAUT, CU, VTU, AKTU) */
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Select University / Technical Board:
                  </label>
                  <span className="text-[11px] font-mono text-[#007AFF] font-semibold">1-Click Select</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_UNIVERSITIES_QUICK.map(fu => {
                    const isSelected = selectedUniversityId === fu.id;
                    return (
                      <button
                        key={fu.id}
                        type="button"
                        onClick={() => {
                          setSelectedUniversityId(fu.id);
                          setUnivSearch('');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm ring-2 ring-[#007AFF]/30'
                            : 'bg-white dark:bg-[#1C1C1E] border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:border-[#007AFF]/60'
                        }`}
                      >
                        <span>{fu.icon}</span>
                        <span>{fu.name}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search & Browse All Pan-India Universities */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  <input
                    type="text"
                    value={univSearch}
                    onChange={(e) => setUnivSearch(e.target.value)}
                    placeholder="Search university by name, state, or abbreviation (e.g. MAKAUT, Calcutta University, VTU, AKTU)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.08] focus:outline-none focus:border-[#007AFF] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400"
                  />
                  {univSearch && (
                    <button
                      type="button"
                      onClick={() => setUnivSearch('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white text-xs p-0.5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* University Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto custom-scrollbar pr-1">
                  {filteredUniversities.map((univ) => {
                    const isSelected = selectedUniversityId === univ.id;

                    return (
                      <div
                        key={univ.id}
                        onClick={() => setSelectedUniversityId(univ.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-[#007AFF]/10 border-[#007AFF] ring-2 ring-[#007AFF]/40'
                            : 'bg-white dark:bg-[#1C1C1E] border-black/[0.08] dark:border-white/[0.08] hover:border-[#007AFF]/50'
                        }`}
                      >
                        <span className="text-xl shrink-0 mt-0.5">{univ.icon}</span>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-display font-bold text-xs sm:text-sm text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
                              {univ.shortName}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />}
                          </div>
                          <p className="text-[11px] text-neutral-500 line-clamp-1 font-medium">
                            {univ.name}
                          </p>
                          <span className="text-[10px] font-mono text-neutral-400 font-semibold">{univ.state}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* =========================================================================
          STEP 3: COLLEGE (Affiliated College & Degree Selection)
          ========================================================================= */}
      {step === 3 && (
        <motion.div
          key="step-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.18 }}
          className="space-y-4"
        >
          {selectedUniversityId === 'makaut' ? (
            /* MAKAUT University Hub: Programmes (200 Courses) & Affiliated Colleges (Codes 101-392) */
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-[#007AFF]/40 space-y-4 animate-fade-in shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-display font-extrabold text-sm sm:text-base text-[#1D1D1F] dark:text-[#F5F5F7]">
                      MAKAUT Official Academic Hub:
                    </h4>
                    <p className="text-xs text-neutral-500 font-sans">
                      Directory of 200 Programmes (In-House & Affiliated) and Codes 101–392 Institutions
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedProgrammeName && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#007AFF]/15 text-[#007AFF] border border-[#007AFF]/30 text-xs font-mono font-bold flex items-center gap-1.5">
                      <span>🎓</span>
                      <span className="truncate max-w-[200px]">{selectedProgrammeName}</span>
                    </span>
                  )}
                  {selectedCollegeName && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[180px]">{selectedCollegeName}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Sub-Section 1: Course / Degree Programme Selector */}
              <div className="space-y-3 bg-white/90 dark:bg-[#151518]/90 p-3.5 sm:p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎓</span>
                    <span className="text-xs sm:text-[13px] font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                      1. Select Your Degree / Programme:
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#007AFF] font-bold">200 Verified Courses</span>
                </div>

                {/* Popular Pills */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">Popular Programmes (1-Click):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_MAKAUT_PROGRAMMES.map(prog => {
                      const isPicked = selectedProgrammeId === prog.id;
                      return (
                        <button
                          key={prog.id}
                          type="button"
                          onClick={() => {
                            setSelectedProgrammeId(prog.id);
                            setSelectedProgrammeName(prog.name);
                            const matched = MAKAUT_PROGRAMMES.find(p => p.id === prog.id);
                            if (matched) {
                              if (matched.type === 'In-House UG' && (matched.code === 'BTECH-CSE' || matched.code === 'BTECH-IT')) {
                                setSelectedBranch(matched.code === 'BTECH-CSE' ? 'CSE' : 'IT');
                              } else {
                                setSelectedBranch(matched.shortName);
                              }
                            }
                          }}
                          className={`px-2 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                            isPicked
                              ? 'bg-[#007AFF] text-white font-bold shadow-xs ring-2 ring-[#007AFF]/30'
                              : 'bg-black/[0.03] dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 border border-black/[0.06] dark:border-white/[0.08] hover:border-[#007AFF]/50'
                          }`}
                        >
                          <span>{prog.icon}</span>
                          <span>{prog.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Type Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
                  {MAKAUT_PROGRAMME_TYPES.map(tab => {
                    const isActive = makautProgTypeFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setMakautProgTypeFilter(tab.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#007AFF]/15 text-[#007AFF] border border-[#007AFF]/40 font-bold'
                            : 'bg-black/[0.03] dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400 border border-black/[0.06] dark:border-white/[0.08]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Search Input for Programmes */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  <input
                    type="text"
                    value={makautProgSearch}
                    onChange={(e) => setMakautProgSearch(e.target.value)}
                    placeholder="Search all 200 MAKAUT courses (e.g. Data Science, BCA, Cyber, Bioinformatics, MBA, Forensic, PhD)..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-[#1E1E22] border border-black/[0.1] dark:border-white/[0.1] focus:outline-none focus:border-[#007AFF] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400"
                  />
                  {makautProgSearch && (
                    <button
                      type="button"
                      onClick={() => setMakautProgSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filtered Programmes Scrollable Grid */}
                <div className="max-h-36 overflow-y-auto custom-scrollbar space-y-1 pr-1 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl p-1.5 border border-black/[0.04] dark:border-white/[0.06]">
                  {filteredMakautProgrammes.slice(0, 40).map(prog => {
                    const isChosen = selectedProgrammeId === prog.id;
                    return (
                      <div
                        key={prog.id}
                        onClick={() => {
                          setSelectedProgrammeId(prog.id);
                          setSelectedProgrammeName(prog.name);
                          if (prog.type === 'In-House UG' && (prog.code === 'BTECH-CSE' || prog.code === 'BTECH-IT')) {
                            setSelectedBranch(prog.code === 'BTECH-CSE' ? 'CSE' : 'IT');
                          } else {
                            setSelectedBranch(prog.shortName);
                          }
                        }}
                        className={`p-2 rounded-lg flex items-center justify-between gap-2 text-xs font-mono cursor-pointer transition-colors ${
                          isChosen
                            ? 'bg-[#007AFF]/15 text-[#007AFF] font-bold border border-[#007AFF]/30'
                            : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base shrink-0">{prog.icon}</span>
                          <div className="min-w-0">
                            <div className="truncate font-semibold text-neutral-800 dark:text-neutral-200">{prog.name}</div>
                            <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                              <span className="px-1 py-0.2 rounded bg-black/[0.05] dark:bg-white/[0.08] font-mono">{prog.type}</span>
                              {prog.seats && <span>• {prog.seats} Seats</span>}
                              {prog.durationYears && <span>• {prog.durationYears} Yrs</span>}
                              {prog.department && <span className="truncate max-w-[200px]">• {prog.department}</span>}
                            </div>
                          </div>
                        </div>
                        {isChosen && <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Section 2: Affiliated College Selector */}
              <div className="space-y-3 bg-white/90 dark:bg-[#151518]/90 p-3.5 sm:p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏫</span>
                    <span className="text-xs sm:text-[13px] font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                      2. Select Your College under MAKAUT:
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#007AFF] font-bold">Codes 101 to 392</span>
                </div>

                {/* Quick Popular College Pills */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">Popular MAKAUT Colleges (1-Click):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { code: '126', name: 'Heritage Institute of Technology' },
                      { code: '130', name: 'Techno Main Salt Lake' },
                      { code: '102', name: 'Kalyani Govt Engineering College' },
                      { code: '101', name: 'Jalpaiguri Govt Engineering College' },
                      { code: '117', name: 'RCCIIT Beliaghata' },
                      { code: '127', name: 'Narula Institute of Technology' },
                      { code: '115', name: 'B.P. Poddar (BPPIMT)' },
                      { code: '142', name: 'Meghnad Saha (MSIT)' },
                      { code: '148', name: 'Future Institute (FIEM)' },
                      { code: '108', name: 'Asansol Engineering College' },
                      { code: '120', name: 'Dr. B. C. Roy (BCREC)' },
                      { code: '116', name: 'MCKV Institute of Engineering' }
                    ].map(c => {
                      const isPicked = selectedCollegeId === c.code;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setSelectedCollegeId(c.code);
                            setSelectedCollegeName(`${c.name} (Code ${c.code})`);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                            isPicked
                              ? 'bg-[#007AFF] text-white font-bold shadow-xs ring-2 ring-[#007AFF]/30'
                              : 'bg-black/[0.03] dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 border border-black/[0.06] dark:border-white/[0.08] hover:border-[#007AFF]/60'
                          }`}
                        >
                          <span>[{c.code}] {c.name.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Search Input for MAKAUT Colleges */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  <input
                    type="text"
                    value={collegeSearch}
                    onChange={(e) => setCollegeSearch(e.target.value)}
                    placeholder="Search MAKAUT college by name, code, or district (e.g. Heritage, 126, Techno, Jalpaiguri, 101, Nadia)..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-[#1E1E22] border border-black/[0.1] dark:border-white/[0.1] focus:outline-none focus:border-[#007AFF] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400"
                  />
                  {collegeSearch && (
                    <button
                      type="button"
                      onClick={() => setCollegeSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filtered Colleges Scrollable Grid */}
                <div className="max-h-32 overflow-y-auto custom-scrollbar space-y-1 pr-1 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl p-1.5 border border-black/[0.04] dark:border-white/[0.06]">
                  {filteredMakautColleges.slice(0, 30).map(col => {
                    const isChosen = selectedCollegeId === col.code;
                    return (
                      <div
                        key={col.code}
                        onClick={() => {
                          setSelectedCollegeId(col.code);
                          setSelectedCollegeName(`${col.name} (Code ${col.code})`);
                        }}
                        className={`p-2 rounded-lg flex items-center justify-between gap-2 text-xs font-mono cursor-pointer transition-colors ${
                          isChosen
                            ? 'bg-[#007AFF]/15 text-[#007AFF] font-bold border border-[#007AFF]/30'
                            : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="px-1.5 py-0.5 rounded bg-black/[0.06] dark:bg-white/[0.08] text-[10px] font-bold text-neutral-600 dark:text-neutral-300 shrink-0">
                            Code {col.code}
                          </span>
                          <span className="truncate font-semibold">{col.name}</span>
                          <span className="text-[10px] text-neutral-400 shrink-0">({col.district})</span>
                        </div>
                        {isChosen && <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Manual Fallback Input */}
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[11px] font-mono text-neutral-500 shrink-0">Or enter manually:</span>
                  <input
                    type="text"
                    value={selectedCollegeName}
                    onChange={(e) => {
                      setSelectedCollegeName(e.target.value);
                      setSelectedCollegeId('CUSTOM');
                    }}
                    placeholder="Enter your college or campus name..."
                    className="flex-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-white dark:bg-[#1E1E22] border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#007AFF]"
                  />
                </div>
              </div>
            </div>
          ) : selectedUniversityId === 'calcutta_univ' ? (
            /* Calcutta University (CU) Hub: 155 Affiliated Colleges */
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/90 to-orange-50/90 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-500/40 space-y-3.5 animate-fade-in shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-display font-extrabold text-sm sm:text-base text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Calcutta University (CU) Affiliated Colleges:
                    </h4>
                    <p className="text-xs text-neutral-500 font-sans">
                      Directory of 155 Colleges across Kolkata, South 24 Pgs, Howrah & Hooghly
                    </p>
                  </div>
                </div>
                {selectedCollegeName && (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{selectedCollegeName}</span>
                  </span>
                )}
              </div>

              {/* Quick Popular CU Pills */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Popular CU Colleges (1-Click Select):
                  </span>
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">155 Official Colleges</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { code: 'CU-004', name: 'Asutosh College' },
                    { code: 'CU-056', name: 'Scottish Church' },
                    { code: 'CU-041', name: 'Maulana Azad' },
                    { code: 'CU-023', name: 'Goenka College' },
                    { code: 'CU-010', name: 'Bethune College' },
                    { code: 'CU-014', name: 'City College' },
                    { code: 'CU-065', name: 'Vidyasagar' },
                    { code: 'CU-062', name: 'Surendranath' },
                    { code: 'CU-005', name: 'Bangabasi' },
                    { code: 'CU-150', name: 'Serampore' },
                    { code: 'CU-118', name: 'Narasinha Dutt' },
                    { code: 'CU-076', name: 'Fakir Chand' }
                  ].map(c => {
                    const isPicked = selectedCollegeId === c.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCollegeId(c.code);
                          setSelectedCollegeName(`${c.name} (${c.code})`);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                          isPicked
                            ? 'bg-amber-600 text-white font-bold shadow-xs ring-2 ring-amber-600/30'
                            : 'bg-white dark:bg-[#1E1E22] text-neutral-700 dark:text-neutral-300 border border-black/[0.08] dark:border-white/[0.08] hover:border-amber-500/60'
                        }`}
                      >
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CU District Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
                {[
                  { id: 'all', label: 'All Districts (155)' },
                  { id: 'Kolkata', label: 'Kolkata (72)' },
                  { id: 'South 24 Parganas', label: 'South 24 Pgs (36)' },
                  { id: 'Howrah', label: 'Howrah (22)' },
                  { id: 'Hooghly', label: 'Hooghly (25)' }
                ].map(dist => {
                  const isActive = cuDistrictFilter === dist.id;
                  return (
                    <button
                      key={dist.id}
                      type="button"
                      onClick={() => setCuDistrictFilter(dist.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/40 font-bold'
                          : 'bg-white/80 dark:bg-[#1C1C1E] text-neutral-600 dark:text-neutral-400 border border-black/[0.06] dark:border-white/[0.08]'
                      }`}
                    >
                      {dist.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Input for CU Colleges */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  value={cuSearch}
                  onChange={(e) => setCuSearch(e.target.value)}
                  placeholder="Search CU college by name, code, or area (e.g. Asutosh, Scottish, Maulana, CU-004)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-[#1A1A1D] border border-black/[0.1] dark:border-white/[0.1] focus:outline-none focus:border-amber-500 text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400"
                />
              </div>

              {/* Filtered CU Colleges List */}
              <div className="max-h-40 overflow-y-auto custom-scrollbar space-y-1 pr-1 bg-white/80 dark:bg-[#141416]/80 rounded-xl p-2 border border-black/[0.06] dark:border-white/[0.06]">
                {filteredCuColleges.slice(0, 30).map(col => {
                  const isChosen = selectedCollegeId === col.code;
                  return (
                    <div
                      key={col.code}
                      onClick={() => {
                        setSelectedCollegeId(col.code);
                        setSelectedCollegeName(`${col.name} (${col.code})`);
                      }}
                      className={`p-2.5 rounded-lg flex items-center justify-between gap-2 text-xs font-mono cursor-pointer transition-colors ${
                        isChosen
                          ? 'bg-amber-500/15 text-amber-900 dark:text-amber-200 font-bold border border-amber-500/30'
                          : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-[10px] font-bold text-amber-700 dark:text-amber-300 shrink-0">
                          {col.code}
                        </span>
                        <span className="truncate font-semibold">{col.name}</span>
                        <span className="text-[10px] text-neutral-400 shrink-0">({col.district})</span>
                      </div>
                      {isChosen && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {/* Manual Fallback Input */}
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[11px] font-mono text-neutral-500 shrink-0">Or enter manually:</span>
                <input
                  type="text"
                  value={selectedCollegeName}
                  onChange={(e) => {
                    setSelectedCollegeName(e.target.value);
                    setSelectedCollegeId('CU-CUSTOM');
                  }}
                  placeholder="e.g. Scottish Church, Asutosh, St. Xavier's, Maulana Azad..."
                  className="flex-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-white dark:bg-[#1A1A1D] border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          ) : (
            /* Other Affiliated College / Institution Entry */
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.08] space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏫</span>
                <div>
                  <h4 className="font-display font-bold text-base text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Affiliated College or Campus Name:
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Enter your college name under {selectedUniversityId.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  College / Institution Name:
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={selectedCollegeName}
                    onChange={(e) => {
                      setSelectedCollegeName(e.target.value);
                      setSelectedCollegeId('CUSTOM');
                    }}
                    placeholder="Enter your college or campus name..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-mono bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] focus:outline-none focus:border-[#007AFF] text-[#1D1D1F] dark:text-[#F5F5F7]"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* =========================================================================
          STEP 4: SEMESTER, BRANCH & STUDY GOAL (Save to Firebase)
          ========================================================================= */}
      {step === 4 && (
        <motion.div
          key="step-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.18 }}
          className="space-y-5"
        >
          {isBtech ? (
            <>
              {/* Semester Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Select Your Current B.Tech Semester:
                  </label>
                  <span className="text-[11px] font-mono text-[#007AFF] font-bold">Sem 1 to 8</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => {
                    const isSelected = selectedSemester === sem;
                    return (
                      <button
                        key={sem}
                        type="button"
                        onClick={() => setSelectedSemester(sem)}
                        className={`py-3 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          isSelected
                            ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm ring-2 ring-[#007AFF]/40'
                            : 'bg-white dark:bg-[#1C1C1E] border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:border-[#007AFF]/50'
                        }`}
                      >
                        <span className="text-[10px] opacity-90">Sem</span>
                        <span className="text-base font-extrabold">{sem}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Engineering Branch Selector */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  Select Engineering Branch:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                  {BTECH_BRANCHES.map(b => {
                    const isSelected = selectedBranch === b.code;
                    return (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBranch(b.code)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF] font-semibold ring-1 ring-[#007AFF]'
                            : 'bg-white dark:bg-[#1C1C1E] border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:border-[#007AFF]/50'
                        }`}
                      >
                        <span className="text-xl">{b.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm truncate font-semibold">{b.name}</div>
                          <span className="text-[10px] font-mono text-neutral-500 font-bold">{b.code}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#007AFF]" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : isBca ? (
            <>
              {/* BCA Semester Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Select Your Current BCA Semester:
                  </label>
                  <span className="text-[11px] font-mono text-[#007AFF] font-bold">Sem 1 to 6</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map(sem => {
                    const isSelected = selectedSemester === sem;
                    return (
                      <button
                        key={sem}
                        type="button"
                        onClick={() => setSelectedSemester(sem)}
                        className={`py-3 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          isSelected
                            ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm ring-2 ring-[#007AFF]/40'
                            : 'bg-white dark:bg-[#1C1C1E] border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:border-[#007AFF]/50'
                        }`}
                      >
                        <span className="text-[10px] opacity-90">Sem</span>
                        <span className="text-base font-extrabold">{sem}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BCA Specialization Selector */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  Select Program Specialization:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                  {BCA_TRACKS.map(b => {
                    const isSelected = selectedBranch === b.code;
                    return (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBranch(b.code)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF] font-semibold ring-1 ring-[#007AFF]'
                            : 'bg-white dark:bg-[#1C1C1E] border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:border-[#007AFF]/50'
                        }`}
                      >
                        <span className="text-xl">{b.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm truncate font-semibold">{b.name}</div>
                          <span className="text-[10px] font-mono text-neutral-500 font-bold">{b.code}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#007AFF]" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex items-center gap-3">
              <span className="text-2xl">{selectedTrackMeta.icon}</span>
              <div>
                <span className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] block">{selectedTrackMeta.title}</span>
                <span className="text-xs text-neutral-500">{selectedTrackMeta.subtitle}</span>
              </div>
            </div>
          )}

          {/* Primary Study Goal Selector */}
          <div className="space-y-2 pt-1">
            <label className="text-xs sm:text-sm font-mono font-bold text-neutral-500 uppercase tracking-wider">
              Primary Study Outcome Goal:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PREPARATION_GOALS.map((goal) => {
                const isSelected = selectedOutcome === goal.id;
                return (
                  <div
                    key={goal.id}
                    onClick={() => setSelectedOutcome(goal.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#007AFF]/10 border-[#007AFF] ring-2 ring-[#007AFF]/40'
                        : 'bg-white dark:bg-[#1C1C1E] border-black/[0.08] dark:border-white/[0.08] hover:border-[#007AFF]/50'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{goal.icon}</span>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs sm:text-sm text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
                          {goal.title}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#007AFF]" />}
                      </div>
                      <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
                        {goal.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Firebase Persistence Status Indicator */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
            <Cloud className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>
              <strong>Firebase Cloud Sync:</strong> Your track, board, college, and semester preferences will be saved to Firebase and automatically restored every time you return.
            </span>
          </div>
        </motion.div>
      )}
    </>
  );

  const footerContent = (
    <div className="w-full flex items-center justify-between">
      {step > 1 ? (
        <button
          type="button"
          onClick={() => setStep(s => Math.max(1, s - 1))}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            {step === 2 && '← Track'}
            {step === 3 && '← Board'}
            {step === 4 && '← College'}
          </span>
        </button>
      ) : onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
        >
          Skip for now
        </button>
      ) : (
        <div />
      )}

      {step < 4 ? (
        <button
          type="button"
          onClick={() => setStep(s => Math.min(4, s + 1))}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#007AFF] hover:bg-[#007AFF]/90 text-white text-xs sm:text-sm font-mono font-bold shadow-md shadow-blue-500/20 cursor-pointer transition-all active:scale-[0.98]"
        >
          <span>
            {step === 1 && 'Next: Select Board'}
            {step === 2 && 'Next: Select College'}
            {step === 3 && 'Next: Select Semester'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleFinish}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-mono font-bold shadow-lg shadow-blue-500/25 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isSaving ? 'Saving to Firebase...' : 'Save Profile & Launch Study Room →'}</span>
        </button>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div 
          onClick={onCancel}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
        />
        <div className="relative w-full max-w-3xl bg-white dark:bg-[#18181A] rounded-3xl shadow-2xl z-10 border border-black/[0.08] dark:border-white/[0.08] max-h-[92vh] flex flex-col overflow-hidden">
          {/* Pinned Top Header & Step Navigation */}
          <div className="p-5 sm:p-6 pb-4 border-b border-black/[0.06] dark:border-white/[0.08] shrink-0 relative bg-white dark:bg-[#18181A]">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer hover:bg-black/[0.05] dark:hover:bg-white/[0.05]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {headerContent}
          </div>

          {/* Scrollable Step Body */}
          <div className="p-5 sm:p-6 flex-1 overflow-y-auto custom-scrollbar min-h-0">
            <AnimatePresence mode="wait">
              {stepContent}
            </AnimatePresence>
          </div>

          {/* Pinned Bottom Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-black/[0.06] dark:border-white/[0.08] bg-neutral-50/95 dark:bg-[#141416]/95 backdrop-blur-md shrink-0">
            {footerContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-6 sm:py-10 px-4 space-y-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.08] shadow-sm space-y-6">
        {headerContent}
        <div className="pt-2">
          <AnimatePresence mode="wait">
            {stepContent}
          </AnimatePresence>
        </div>
        <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
          {footerContent}
        </div>
      </div>
    </div>
  );
};

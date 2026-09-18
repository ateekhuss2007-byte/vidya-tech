import React, { useState, useEffect } from 'react';
import { TopicDeepDiveSection } from './collegeHub/TopicDeepDiveSection';
import { BtechSemesterAnalyzer } from './collegeHub/BtechSemesterAnalyzer';
import { PyqPredictorVault } from './collegeHub/PyqPredictorVault';
import { StreamSyllabusViewer } from './collegeHub/StreamSyllabusViewer';
import { TargetTrackSelector } from './collegeHub/TargetTrackSelector';
import { 
  OTHER_STREAMS_DATA, 
  TARGET_TRACK_OPTIONS 
} from '../data/otherStreamsSyllabusData';
import { 
  BookOpen, 
  Sparkles, 
  Video, 
  GraduationCap, 
  ArrowRight, 
  Brain, 
  Calculator, 
  Cpu, 
  Code2,
  Calendar,
  Layers,
  Flame,
  Cloud,
  Shield,
  Network,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

export const StudyRoomView = ({ 
  initialTopic = 'Matrices & Determinants (Maths)', 
  onSelectTopic,
  setActiveTab,
  onOpenMockTest,
  initialSemester = 3,
  onSelectSemester
}) => {
  // Track selection state: check localStorage or default to ssc_cgl
  const [selectedTrack, setSelectedTrack] = useState(() => {
    return localStorage.getItem('vidya_target_track') || 'ssc_cgl';
  });
  const [showTrackModal, setShowTrackModal] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [activeStudyMode, setActiveStudyMode] = useState('semester'); // 'semester' | 'deepDive' | 'pyqVault'
  const [activeSem, setActiveSem] = useState(initialSemester || 3);

  useEffect(() => {
    if (initialSemester) {
      setActiveSem(initialSemester);
    }
  }, [initialSemester]);

  const handleSelectTrack = (trackId) => {
    setSelectedTrack(trackId);
    localStorage.setItem('vidya_target_track', trackId);
    setShowTrackModal(false);

    const trackObj = TARGET_TRACK_OPTIONS.find(t => t.id === trackId);
    toast.success(`Track Selected: ${trackObj?.title || trackId}!`, {
      description: 'Your Study Room, syllabus, and PYQ blueprints have been customized.'
    });
  };

  const currentTrackMeta = TARGET_TRACK_OPTIONS.find(t => t.id === selectedTrack) || {
    id: 'ssc_cgl',
    title: 'SSC CGL (Tier-1 & Tier-2)',
    icon: '🎯'
  };

  const yearCategories = [
    {
      year: '🌱 1st Year (Sem 1 & 2)',
      subjects: [
        'Engineering Physics (Wave Optics & Quantum)',
        'Mathematics - I (Calculus & Cayley-Hamilton)',
        'Basic Electrical Engineering (KCL/KVL & Thevenin)',
        'Engineering Chemistry (MOT & Batteries)',
        'C Programming & Pointers',
        'Basic Electronics (Op-Amp & Rectifiers)'
      ]
    },
    {
      year: '💻 2nd Year (Sem 3 & 4)',
      subjects: [
        'Data Structures & Algorithms (AVL, Graphs, Heaps)',
        'Computer Organization & Architecture (Booth & Cache)',
        'Discrete Mathematics & Hasse Diagrams',
        'Digital Logic & Master-Slave JK Counters',
        'Operating Systems (Bankers & Page Replacement)',
        'Design & Analysis of Algorithms (Matrix Chain & DP)',
        'Formal Language & Automata (NFA to DFA & Arden)',
        'Mathematics - III (Newton-Raphson & Probability)'
      ]
    },
    {
      year: '🚀 3rd Year (Sem 5 & 6)',
      subjects: [
        'Database Management Systems (BCNF & 2PL)',
        'Computer Networks (IPv4 Subnetting & CRC)',
        'Software Engineering (Cyclomatic Complexity)',
        'Object Oriented Programming with Java',
        'Compiler Design (LL(1) & SLR(1) Parsing)',
        'Artificial Intelligence & Machine Learning (A* & Trees)',
        'Full-Stack Web Tech (React & REST APIs)',
        'Cryptography & Network Security (RSA & DES)'
      ]
    },
    {
      year: '⚡ 4th Year (Sem 7 & 8)',
      subjects: [
        'Cloud Computing (CAP Theorem & Docker)',
        'Big Data Analytics (HDFS & MapReduce)',
        'Deep Learning & NLP (CNN, LSTM, Transformers)',
        'Information & Cloud Security (SQLi & OAuth)',
        'Internet of Things (MQTT QoS & Sensor Nodes)',
        'Blockchain & Smart Contracts (Merkle Trees & PoW)',
        'High-Performance Computing (Amdahl Law & MPI)'
      ]
    }
  ];

  const handleLaunchTopic = (topic) => {
    setSelectedTopic(topic);
    if (onSelectTopic) {
      onSelectTopic(topic);
    }
    setActiveStudyMode('deepDive');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // STEP 1: If user hasn't selected a preparation goal yet, ask first!
  if (!selectedTrack) {
    return (
      <div className="w-full fluid-container py-8 sm:py-12 animate-fade-in">
        <TargetTrackSelector 
          onSelectTrack={handleSelectTrack} 
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 animate-fade-in space-y-4">
      
      {/* Target Track Switcher Modal if opened */}
      {showTrackModal && (
        <TargetTrackSelector
          currentTrackId={selectedTrack}
          onSelectTrack={handleSelectTrack}
          onCancel={() => setShowTrackModal(false)}
          isModal={true}
        />
      )}

      {/* Persistent Active Goal Bar ONLY for B.Tech engineering */}
      {selectedTrack === 'btech' && (
        <div className="px-5 py-3 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{currentTrackMeta.icon}</span>
            <div>
              <div className="text-[10px] font-mono text-[#AAAAAA] uppercase tracking-wider">
                Selected Preparation Track:
              </div>
              <div className="text-xs sm:text-sm font-bold font-mono text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                <span>{currentTrackMeta.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30 text-[10px] font-bold">
                  Semester {activeSem}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowTrackModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.06] hover:bg-[#007AFF]/10 text-[#007AFF] text-xs font-mono font-bold border border-[#AAAAAA]/30 dark:border-white/[0.1] hover:border-[#007AFF] transition-all cursor-pointer self-stretch sm:self-auto justify-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Change Track (B.Tech / 10th / 12th / SSC / JEE / GATE)</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          CASE A: USER SELECTED B.TECH ENGINEERING
          ========================================================================= */}
      {selectedTrack === 'btech' && (
        <>
          {/* Top Study Room Control & Mode Switcher */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/25 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse"></span>
                <span>B.Tech Hub • 8 Semesters & Topic Engine</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] leading-tight">
                Complete <span className="text-[#007AFF]">8-Semester B.Tech Syllabus</span> Study Room
              </h1>

              <p className="text-xs sm:text-sm text-[#1D1D1F]/70 dark:text-[#AAAAAA] leading-relaxed font-sans">
                Every semester from Sem 1 to Sem 8 is analyzed with high-yield 10-mark PYQs, mathematical derivations, lab viva banks, and official university patterns.
              </p>
            </div>

            {/* Dual Mode Switcher Pills */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 p-1.5 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.05] border border-[#AAAAAA]/30 dark:border-white/[0.08] shrink-0 self-stretch sm:self-auto w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveStudyMode('semester')}
                className={`flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer select-none ${
                  activeStudyMode === 'semester'
                    ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25'
                    : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF]'
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>🎯 B.Tech Semesters (1-8)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStudyMode('pyqVault')}
                className={`flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer select-none ${
                  activeStudyMode === 'pyqVault'
                    ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25'
                    : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF]'
                }`}
              >
                <Flame className="w-4 h-4 shrink-0" />
                <span>📜 PYQ Predictor (70M)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStudyMode('deepDive')}
                className={`flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer select-none ${
                  activeStudyMode === 'deepDive'
                    ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25'
                    : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF]'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>🔍 Notes & Videos</span>
              </button>
            </div>
          </div>

          {/* Mode A: B.Tech Semester Syllabus Intelligence Engine */}
          {activeStudyMode === 'semester' && (
            <div className="space-y-6">
              <BtechSemesterAnalyzer
                initialSemester={activeSem}
                setActiveTab={setActiveTab}
                onSelectTopic={handleLaunchTopic}
                onOpenMockTest={onOpenMockTest}
              />
            </div>
          )}

          {/* Mode C: Subject-Wise Predicted Semester Question Papers & PYQ Vault */}
          {activeStudyMode === 'pyqVault' && (
            <div className="space-y-6">
              <PyqPredictorVault
                initialSemester={activeSem}
                setActiveTab={setActiveTab}
                onOpenMockTest={onOpenMockTest}
              />
            </div>
          )}

          {/* Mode B: Single Topic Deep Dive & Curated YouTube Engine */}
          {activeStudyMode === 'deepDive' && (
            <div className="space-y-6">
              {/* Quick Topic Chips by Academic Year */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-[#AAAAAA] font-bold uppercase tracking-wider">
                      Quick Focus Selector
                    </div>
                    <h3 className="font-bold text-base text-[#1D1D1F] dark:text-[#F5F5F7] font-display">
                      Indexed Core Subjects by Academic Year (Semesters 1-8)
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStudyMode('semester')}
                    className="text-xs font-mono text-[#007AFF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Switch to Full Semester Blueprint →</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {yearCategories.map((cat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.03] border border-[#AAAAAA]/25 dark:border-white/[0.06] space-y-2.5">
                      <h4 className="text-xs font-bold font-mono text-[#1D1D1F] dark:text-[#F5F5F7]">{cat.year}</h4>
                      <div className="flex flex-col gap-1.5">
                        {cat.subjects.map((subj, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleLaunchTopic(subj)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left truncate max-w-full cursor-pointer ${
                              selectedTopic === subj
                                ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25 font-bold'
                                : 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-[#F5F5F7] hover:border-[#007AFF] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08]'
                            }`}
                          >
                            {subj}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Topic Deep Dive Component with Solved Examples & YouTube Embeds */}
              <TopicDeepDiveSection initialQuery={selectedTopic} />
            </div>
          )}
        </>
      )}

      {/* =========================================================================
          CASE B: USER SELECTED CBSE 10, CBSE 12, SSC CGL, JEE, GATE, OR BCA
          ========================================================================= */}
      {selectedTrack !== 'btech' && OTHER_STREAMS_DATA[selectedTrack] && (
        <StreamSyllabusViewer
          streamData={OTHER_STREAMS_DATA[selectedTrack]}
          setActiveTab={setActiveTab}
          onSelectTopic={handleLaunchTopic}
          onOpenMockTest={onOpenMockTest}
          onChangeTrack={() => setShowTrackModal(true)}
        />
      )}

    </div>
  );
};

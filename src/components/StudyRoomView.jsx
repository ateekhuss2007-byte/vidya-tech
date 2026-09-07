import React, { useState, useEffect } from 'react';
import { TopicDeepDiveSection } from './collegeHub/TopicDeepDiveSection';
import { BtechSemesterAnalyzer } from './collegeHub/BtechSemesterAnalyzer';
import { PyqPredictorVault } from './collegeHub/PyqPredictorVault';
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
  Network
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const StudyRoomView = ({ 
  initialTopic = 'Matrices & Determinants (Maths)', 
  onSelectTopic,
  setActiveTab,
  onOpenMockTest,
  initialSemester = 3,
  onSelectSemester
}) => {
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [activeStudyMode, setActiveStudyMode] = useState('semester'); // 'semester' | 'deepDive' | 'pyqVault'
  const [activeSem, setActiveSem] = useState(initialSemester || 3);

  useEffect(() => {
    if (initialSemester) {
      setActiveSem(initialSemester);
    }
  }, [initialSemester]);

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

  return (
    <div className="w-full fluid-container py-6 sm:py-8 animate-fade-in space-y-6">
      
      {/* 1. Top Study Room Control & Mode Switcher */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0D1117] border border-[#30363D] shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30 text-xs font-mono font-bold shadow-glow-green">
            <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse"></span>
            <span>AI Study Room • 8 B.Tech Semesters & Topic Engine</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
            Complete <span className="text-[#00F59B]">8-Semester B.Tech Syllabus</span> Study Room
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            Every semester from Sem 1 to Sem 8 is analyzed with high-yield 10-mark PYQs, mathematical derivations, lab viva banks, and official university patterns.
          </p>
        </div>

        {/* Dual Mode Switcher Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 p-1.5 rounded-xl bg-[#161B22] border border-[#30363D] shrink-0 self-stretch sm:self-auto w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveStudyMode('semester')}
            className={`flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer select-none ${
              activeStudyMode === 'semester'
                ? 'bg-[#00F59B] text-[#07090D] shadow-glow-green'
                : 'text-neutral-400 hover:text-white'
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
                ? 'bg-[#00F59B] text-[#07090D] shadow-glow-green'
                : 'text-neutral-400 hover:text-white'
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
                ? 'bg-[#00F59B] text-[#07090D] shadow-glow-green'
                : 'text-neutral-400 hover:text-white'
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
          <div className="p-6 rounded-2xl bg-[#0D1117] border border-[#30363D] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
                  Quick Focus Selector
                </div>
                <h3 className="font-bold text-base text-white font-display">
                  Indexed Core Subjects by Academic Year (Semesters 1-8)
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveStudyMode('semester')}
                className="text-xs font-mono text-[#00F59B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Switch to Full Semester Blueprint →</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {yearCategories.map((cat, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] space-y-2.5">
                  <h4 className="text-xs font-bold font-mono text-white">{cat.year}</h4>
                  <div className="flex flex-col gap-1.5">
                    {cat.subjects.map((subj, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleLaunchTopic(subj)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left truncate max-w-full cursor-pointer ${
                          selectedTopic === subj
                            ? 'bg-[#00F59B] text-[#07090D] shadow-glow-green font-bold'
                            : 'bg-[#0D1117] text-neutral-300 hover:bg-[#21262D] hover:text-white border border-[#30363D]'
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

    </div>
  );
};

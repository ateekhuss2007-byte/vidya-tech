import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { 
  Menu, 
  Search, 
  Sparkles, 
  Flame, 
  Trophy, 
  Brain,
  Bell,
  ChevronDown,
  GraduationCap,
  CheckCircle2,
  BookOpen,
  Building2,
  Target
} from 'lucide-react';
import { COURSE_DEFINITIONS } from '../data/mockPaperDatabase';
import { toast } from 'sonner';

const TAB_TITLES = {
  home: { title: 'Home', subtitle: 'Universal Educational Architecture & AI Cockpit' },
  dashboard: { title: 'Student Dashboard', subtitle: 'Real-Time Cognitive Learning Telemetry' },
  studyHub: { title: 'Syllabus Study Room', subtitle: 'Interactive Modules & Deep Engineering Concepts' },
  mockTests: { title: 'Mock Test Engine', subtitle: 'Autonomous 3-Step Question Paper Studio' },
  pyqVault: { title: 'PYQ Predictor Vault', subtitle: '95% Yield Probability Matrix & Exam Blueprint' },
  doubtSolver: { title: 'AI Instant Doubt Solver', subtitle: '24/7 Question OCR & Step-by-Step Derivations' },
  flashcards: { title: 'Flashcard Studio', subtitle: 'Anki-Style SM-2 Spaced Repetition Decks' },
  smartPdf: { title: 'Smart Notes & PDF Reader', subtitle: 'Contextual AI Notes Extractor & Split View' },
  weaknessHeatmap: { title: 'Weakness Radar', subtitle: 'Diagnostic Chapter Retention & Health Heatmap' },
  vivaExaminer: { title: 'AI Viva Voice Examiner', subtitle: 'Real-Time Speech-Enabled University Viva Simulator' },
  cheatSheets: { title: '1-Page Formula Sheets', subtitle: 'High-Yield Last-Minute Revision Matrices' },
  focusRoom: { title: 'Pomodoro Focus Room', subtitle: 'Binaural Alpha Waves & Distraction-Free Zen Mode' },
  digitalTwin: { title: 'Cognitive Memory Twin', subtitle: 'Ebbinghaus Forgetting Curve & Forgetting Forecast' },
  conceptGraph: { title: 'Knowledge Graph', subtitle: 'Interactive Prerequisite Tree & Curriculum Graph' },
  agentSwarm: { title: 'Multi-Agent AI Swarm', subtitle: 'Pedagogical Multi-Agent System & Debate Studio' },
  educatorRadar: { title: 'Student Radar', subtitle: 'Early-Warning Signals & Mastery Indicators' },
  publicApiHub: { title: 'Developer API Hub', subtitle: 'Open REST APIs & Educational Data Pipeline' },
  deckStudio: { title: 'Executive Pitch Deck', subtitle: 'System Architecture & Engineering Showcase' },
  collegeHub: { title: 'College Curriculum Hub', subtitle: 'Official Syllabus, PYQ Vault & Semester Roadmap' }
};

export const TopHeader = ({ activeTab, setActiveTab, setMobileOpen, user }) => {
  const [selectedExamId, setSelectedExamId] = useState('btech_makaut');
  const currentInfo = TAB_TITLES[activeTab] || { title: 'VIDYA AI', subtitle: 'Cognitive Learning Engine' };

  const currentCourse = COURSE_DEFINITIONS.find(c => c.id === selectedExamId) || COURSE_DEFINITIONS[0];

  const handleSelectStream = (course) => {
    setSelectedExamId(course.id);
    toast.success(`Active Target: ${course.name}!`, {
      description: `Exam patterns and syllabi switched to ${course.name}.`
    });
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-[#07090D]/90 backdrop-blur-md border-b border-[#30363D] px-4 sm:px-8 flex items-center justify-between gap-4 transition-colors">
      
      {/* 1. Left: Mobile Menu Toggle + Breadcrumbs Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#161B22] focus:outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-white font-display leading-tight truncate">
            {currentInfo.title}
          </h1>
          <p className="hidden sm:block text-[11px] text-neutral-400 font-sans truncate">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* 2. Center: Minimal AI Search Capsule (⌘K) */}
      <button
        onClick={() => setActiveTab('doubtSolver')}
        className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-neutral-400 hover:border-[#00F59B]/50 hover:text-white transition-all cursor-pointer"
      >
        <Search className="w-3.5 h-3.5 text-[#00F59B]" />
        <span>Ask AI or search topic...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-[#161B22] border border-[#30363D] text-[10px] font-mono text-neutral-400">
          ⌘K
        </kbd>
      </button>

      {/* 3. Right: Fast Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* Streak Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs font-mono font-bold text-neutral-300">
          <Flame className="w-3.5 h-3.5 text-[#00F59B]" />
          <span>{user?.currentStreak || 14}d Streak</span>
        </div>

        {/* 1-Click Exam Target Switcher Pill */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1117] hover:bg-[#161B22] text-xs font-bold text-white border border-[#30363D] hover:border-[#00F59B]/40 transition-all cursor-pointer">
              <span>{currentCourse.boardLogo}</span>
              <span className="hidden sm:inline truncate max-w-[120px]">{currentCourse.name.split('(')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              side="bottom"
              align="end"
              className="z-50 min-w-[240px] p-1.5 rounded-2xl bg-[#161B22] border border-[#30363D] shadow-2xl text-xs space-y-1 animate-scale-in"
            >
              <div className="px-3 py-2 border-b border-white/10 text-[10px] font-mono text-neutral-400 font-bold uppercase">
                Active Curriculum Target
              </div>
              {COURSE_DEFINITIONS.map((course) => (
                <DropdownMenu.Item
                  key={course.id}
                  onClick={() => handleSelectStream(course)}
                  className={`px-3 py-2 rounded-xl flex items-center justify-between cursor-pointer ${
                    selectedExamId === course.id
                      ? 'bg-[#00F59B]/15 text-[#00F59B] font-bold border border-[#00F59B]/30'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{course.boardLogo}</span>
                    <span>{course.name}</span>
                  </div>
                  {selectedExamId === course.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#00F59B]" />}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

      </div>
    </header>
  );
};

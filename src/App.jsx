import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { CommandPalette } from './components/CommandPalette';
import { AiAssistant } from './components/AiAssistant';
import { Footer } from './components/Footer';
import { DashboardSkeleton } from './components/dashboard/DashboardSkeleton';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { TooltipProvider } from './components/ui/tooltip';

// Code-split heavy secondary views for maximum performance & fast initial paint:
const StudyRoomView = lazy(() => import('./components/StudyRoomView').then(m => ({ default: m.StudyRoomView })));
const MockTestEngine = lazy(() => import('./components/MockTestEngine').then(m => ({ default: m.MockTestEngine })));
const DoubtSolver = lazy(() => import('./components/DoubtSolver').then(m => ({ default: m.DoubtSolver })));
const FlashcardStudio = lazy(() => import('./components/FlashcardStudio').then(m => ({ default: m.FlashcardStudio })));
const SmartPDFViewer = lazy(() => import('./components/SmartPDFViewer').then(m => ({ default: m.SmartPDFViewer })));
const WeaknessHeatmap = lazy(() => import('./components/WeaknessHeatmap').then(m => ({ default: m.WeaknessHeatmap })));
const VivaExaminer = lazy(() => import('./components/VivaExaminer').then(m => ({ default: m.VivaExaminer })));
const CheatSheetGenerator = lazy(() => import('./components/CheatSheetGenerator').then(m => ({ default: m.CheatSheetGenerator })));
const FocusRoom = lazy(() => import('./components/FocusRoom').then(m => ({ default: m.FocusRoom })));
const DigitalTwin = lazy(() => import('./components/DigitalTwin').then(m => ({ default: m.DigitalTwin })));
const ConceptGraph = lazy(() => import('./components/ConceptGraph').then(m => ({ default: m.ConceptGraph })));
const AgentSwarm = lazy(() => import('./components/AgentSwarm').then(m => ({ default: m.AgentSwarm })));
const EducatorRadar = lazy(() => import('./components/EducatorRadar').then(m => ({ default: m.EducatorRadar })));
const PublicApiHub = lazy(() => import('./components/PublicApiHub').then(m => ({ default: m.PublicApiHub })));
const DeckStudio = lazy(() => import('./components/DeckStudio').then(m => ({ default: m.DeckStudio })));
const CollegeHubView = lazy(() => import('./components/collegeHub/CollegeHubView').then(m => ({ default: m.CollegeHubView })));
const PyqPredictorVault = lazy(() => import('./components/collegeHub/PyqPredictorVault').then(m => ({ default: m.PyqPredictorVault })));

const VALID_TABS = [
  'home',
  'dashboard',
  'studyHub',
  'mockTests',
  'doubtSolver',
  'flashcards',
  'smartPdf',
  'weaknessHeatmap',
  'vivaExaminer',
  'cheatSheets',
  'focusRoom',
  'digitalTwin',
  'conceptGraph',
  'agentSwarm',
  'educatorRadar',
  'publicApiHub',
  'deckStudio',
  'collegeHub',
  'pyqVault'
];

const getInitialTabFromUrl = () => {
  if (typeof window === 'undefined') return 'home';

  // 1. Check pathname (e.g. /dashboard)
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').trim();
  if (path && VALID_TABS.includes(path)) {
    return path;
  }

  // 2. Check hash (e.g. #dashboard)
  const hash = window.location.hash.replace(/^#+/, '').trim();
  if (hash && VALID_TABS.includes(hash)) {
    return hash;
  }

  return 'home';
};

export const App = () => {
  const [activeTab, setActiveTabState] = useState(getInitialTabFromUrl);
  const [isDark, setIsDark] = useState(true);
  const [studyTopic, setStudyTopic] = useState('Data Structures & Algorithms (DSA)');
  const [selectedMockSubject, setSelectedMockSubject] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(3);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vidya_user');
    return saved ? JSON.parse(saved) : {
      name: 'Aryan Kumar Shaw',
      email: 'aryan@vidya.ai',
      plan: 'Pro Scholar',
      currentStreak: 14,
      targetExam: 'B.Tech CSE (MAKAUT)'
    };
  });

  // Synchronize Tab with browser URL & history
  const setActiveTab = useCallback((tab, options = {}) => {
    if (!VALID_TABS.includes(tab)) return;
    
    setActiveTabState(tab);

    if (options.subject) {
      setSelectedMockSubject(options.subject);
    }
    if (options.semester) {
      setSelectedSemester(options.semester);
    }

    const targetPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab }, '', targetPath);
    }
  }, []);

  // Listen to browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.tab && VALID_TABS.includes(event.state.tab)) {
        setActiveTabState(event.state.tab);
      } else {
        setActiveTabState(getInitialTabFromUrl());
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dark mode effect on <html> root element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleOpenTopic = (topic) => {
    setStudyTopic(topic);
    setActiveTab('studyHub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSemester = (semNum, targetTab = 'studyHub') => {
    setSelectedSemester(semNum);
    setActiveTab(targetTab, { semester: semNum });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMockTest = (subject, streamId) => {
    setSelectedMockSubject(subject);
    setActiveTab('mockTests');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page motion transition
  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } }
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060B14] text-[#0F172A] dark:text-[#F1F5F9] flex flex-col font-sans transition-colors duration-300 selection:bg-sky-400 selection:text-white relative overflow-x-hidden">
        
        {/* Google Sky Blue Fluid Ambient Light Mesh for Liquid Glass Refraction */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute w-[700px] h-[700px] -top-32 -left-20 bg-sky-400/15 dark:bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute w-[640px] h-[640px] top-[24%] -right-36 bg-blue-500/12 dark:bg-blue-600/18 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute w-[580px] h-[580px] top-[60%] -left-28 bg-cyan-300/10 dark:bg-sky-400/10 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute w-[500px] h-[500px] -bottom-24 right-[12%] bg-sky-500/12 dark:bg-blue-700/15 rounded-full blur-[120px] pointer-events-none" />
        </div>
      
        {/* Toast Notifications */}
        <Toaster 
          position="bottom-right" 
          richColors 
          theme={isDark ? 'dark' : 'light'} 
        />

      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDark={isDark} 
        setIsDark={setIsDark} 
        user={user}
        setUser={setUser}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full relative z-10">
        <ErrorBoundary>
          <Suspense fallback={
            <div className="w-full fluid-container py-12">
              <DashboardSkeleton />
            </div>
          }>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                {activeTab === 'home' && (
                  <HomePage 
                    setActiveTab={setActiveTab} 
                    onOpenTopic={handleOpenTopic} 
                    onOpenSemester={handleOpenSemester} 
                    user={user} 
                  />
                )}
                {activeTab === 'studyHub' && (
                  <StudyRoomView 
                    initialTopic={studyTopic} 
                    onSelectTopic={setStudyTopic} 
                    setActiveTab={setActiveTab}
                    onOpenMockTest={handleOpenMockTest}
                    initialSemester={selectedSemester}
                    onSelectSemester={setSelectedSemester}
                  />
                )}
                {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} user={user} />}
                {activeTab === 'mockTests' && (
                  <MockTestEngine 
                    user={user} 
                    initialSubject={selectedMockSubject} 
                  />
                )}
                {activeTab === 'doubtSolver' && <DoubtSolver />}
                {activeTab === 'flashcards' && <FlashcardStudio />}
                {activeTab === 'smartPdf' && <SmartPDFViewer />}
                {activeTab === 'weaknessHeatmap' && <WeaknessHeatmap setActiveTab={setActiveTab} />}
                {activeTab === 'vivaExaminer' && <VivaExaminer user={user} />}
                {activeTab === 'cheatSheets' && <CheatSheetGenerator user={user} />}
                {activeTab === 'focusRoom' && <FocusRoom user={user} />}
                {activeTab === 'digitalTwin' && <DigitalTwin user={user} />}
                {activeTab === 'conceptGraph' && <ConceptGraph user={user} />}
                {activeTab === 'agentSwarm' && <AgentSwarm user={user} />}
                {activeTab === 'educatorRadar' && <EducatorRadar user={user} />}
                {activeTab === 'publicApiHub' && <PublicApiHub user={user} />}
                {activeTab === 'deckStudio' && <DeckStudio user={user} />}
                {activeTab === 'collegeHub' && (
                  <CollegeHubView 
                    setActiveTab={setActiveTab} 
                    onOpenMockTest={handleOpenMockTest}
                    initialSemester={selectedSemester}
                  />
                )}
                {activeTab === 'pyqVault' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                    <PyqPredictorVault 
                      initialSemester={selectedSemester}
                      setActiveTab={setActiveTab}
                      onOpenMockTest={handleOpenMockTest}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Universal Cmd+K Command Palette */}
      <CommandPalette
        isOpen={searchModalOpen}
        setIsOpen={setSearchModalOpen}
        setActiveTab={setActiveTab}
        onSelectTopic={handleOpenTopic}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* Persistent Floating AI Assistant */}
      <AiAssistant setActiveTab={setActiveTab} />

      {/* Modern SaaS Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  </TooltipProvider>
  );
};

export default App;

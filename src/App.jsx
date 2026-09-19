import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Toaster, toast } from 'sonner';
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
const IGOTDashboard = lazy(() => import('./components/igot/IGOTDashboard').then(m => ({ default: m.IGOTDashboard })));

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
  'pyqVault',
  'igotKarmayogi'
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
  const [isDark, setIsDark] = useState(false);
  const [studyTopic, setStudyTopic] = useState('Data Structures & Algorithms (DSA)');
  const [selectedMockSubject, setSelectedMockSubject] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(3);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vidya_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure legacy hardcoded user "Aryan" is purged so visitors start as guest
        if (parsed?.name?.includes('Aryan') || parsed?.email?.includes('aryan')) {
          localStorage.removeItem('vidya_user');
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const handleOpenAuth = useCallback(() => {
    setAuthModalOpen(true);
  }, []);

  // Synchronize Tab with browser URL & history
  const setActiveTab = useCallback((tab, options = {}) => {
    if (!VALID_TABS.includes(tab)) return;
    
    // Gate personalized tabs behind login
    const PERSONALIZED_TABS = ['dashboard', 'digitalTwin', 'learningPath', 'analytics', 'educatorInsights'];
    if (!user && PERSONALIZED_TABS.includes(tab)) {
      setAuthModalOpen(true);
      toast.info('Sign in / Let\'s Get Started to unlock your personalized learning data & cognitive twin!');
      return;
    }

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
  }, [user]);

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

  // Light mode enforcement on <html> root element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    try {
      localStorage.setItem('theme', 'light');
    } catch {
      // ignore
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

  // Motion.dev scroll progress synchronization
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <TooltipProvider delayDuration={150}>
      <div className={`min-h-screen bg-[#F5F5F7] dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-[#F5F5F7] flex flex-col font-sans transition-colors duration-300 selection:bg-[#007AFF] selection:text-white relative ${activeTab === 'studyHub' ? 'h-screen max-h-screen overflow-hidden' : 'overflow-x-hidden'}`}>
        
        {/* motion.dev Interactive Scroll Progress Indicator */}
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#083A4F] via-[#407E8C] to-[#A58D66] origin-left z-[9999] pointer-events-none"
        />

        {/* Apple Modern Fluid Ambient Light Mesh */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute w-[700px] h-[700px] -top-32 -left-20 bg-[#007AFF]/[0.06] dark:bg-[#007AFF]/[0.08] rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute w-[640px] h-[640px] top-[24%] -right-36 bg-[#007AFF]/[0.05] dark:bg-[#007AFF]/[0.07] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute w-[580px] h-[580px] top-[60%] -left-28 bg-[#AAAAAA]/[0.08] dark:bg-[#AAAAAA]/[0.04] rounded-full blur-[120px] pointer-events-none" />
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
        authModalOpen={authModalOpen}
        setAuthModalOpen={setAuthModalOpen}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Guest Welcome & Sign-In Callout (Only shown when not logged in) */}
      {!user && (
        <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white py-2.5 px-4 text-xs font-medium shadow-sm transition-all animate-fade-in flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <span>
            🎓 <strong>Welcome Learner!</strong> Sign in to access all university syllabus notes, step-marked PYQs, and your cognitive memory twin.
          </span>
          <button
            type="button"
            onClick={handleOpenAuth}
            className="px-3 py-1 rounded-full bg-white text-blue-700 font-bold hover:bg-blue-50 transition-all shadow-sm shrink-0 cursor-pointer"
          >
            Let's Get Started / Sign In →
          </button>
        </div>
      )}

      {/* Main View Container */}
      <main className={`flex-1 w-full relative z-10 ${activeTab === 'studyHub' ? 'min-h-0 overflow-hidden flex flex-col' : ''}`}>
        <ErrorBoundary>
          <Suspense fallback={
            <div className="w-full fluid-container py-12">
              <DashboardSkeleton />
            </div>
          }>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`w-full ${activeTab === 'studyHub' ? 'h-full flex-1 min-h-0 flex flex-col overflow-hidden' : ''}`}
              >
                {activeTab === 'home' && (
                  <HomePage 
                    setActiveTab={setActiveTab} 
                    onOpenTopic={handleOpenTopic} 
                    onOpenSemester={handleOpenSemester} 
                    user={user} 
                    onOpenAuth={handleOpenAuth}
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
                {activeTab === 'igotKarmayogi' && <IGOTDashboard />}
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

      {/* Modern SaaS Footer (Shown on landing and other pages, hidden in full-height Study Studio) */}
      {activeTab !== 'studyHub' && <Footer setActiveTab={setActiveTab} />}

    </div>
  </TooltipProvider>
  );
};

export default App;

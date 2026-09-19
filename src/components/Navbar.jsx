import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

// Radix UI Dropdown for user menu
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from './ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

// Minimalist, crisp Lucide icons
import { 
  Home,
  LayoutDashboard,
  FileCheck,
  HelpCircle,
  BookOpen,
  Layers,
  Brain,
  Network,
  Sun,
  Moon,
  LogOut,
  LogIn,
  Menu,
  X,
  Search,
  Sparkles,
  Award,
  GraduationCap
} from 'lucide-react';

import { AuthModal } from './AuthModal';
import { examStreams } from '../data/examPatterns';

// Concentric arches icon inspired by Gemini Notebook
const NotebookArchesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5.5 h-5.5 shrink-0">
    <path d="M3.5 19.5C3.5 10.94 10.44 4 19 4" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M3.5 19.5C3.5 13.98 7.98 9.5 13.5 9.5C16.26 9.5 18.76 10.62 20.56 12.44" stroke="#0EA5E9" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M3.5 19.5C3.5 16.46 5.96 14 9 14C10.52 14 11.9 14.62 12.89 15.61" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Discord Icon
const DiscordIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// Reddit Icon
const RedditIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

// X (Twitter) Icon
const XIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  user, 
  setUser, 
  isDark, 
  setIsDark,
  onOpenSearch,
  authModalOpen: externalAuthModalOpen,
  setAuthModalOpen: externalSetAuthModalOpen
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalAuthModalOpen, setInternalAuthModalOpen] = useState(false);
  const authModalOpen = externalAuthModalOpen !== undefined ? externalAuthModalOpen : internalAuthModalOpen;
  const setAuthModalOpen = externalSetAuthModalOpen || setInternalAuthModalOpen;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clean Reference Navigation Links
  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'studyHub', label: 'Study Room' },
    { id: 'collegeHub', label: 'Curriculum' },
    { id: 'mockTests', label: 'Mock Tests' },
    { id: 'igotKarmayogi', label: 'iGOT Karmayogi' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('vidya_user');
    toast.info('Signed out successfully');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('vidya_user', JSON.stringify(userData));
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F5F7]/90 dark:bg-[#1D1D1F]/90 backdrop-blur-xl border-b border-[#AAAAAA]/30 dark:border-[#AAAAAA]/20 shadow-[0_2px_15px_rgba(0,0,0,0.04)]'
          : 'bg-[#F5F5F7] dark:bg-[#1D1D1F] border-b border-[#AAAAAA]/20 dark:border-[#AAAAAA]/15'
      }`}>
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between h-16 sm:h-17">
          
          {/* 1. Left: Gemini Notebook-style Logo (Blue Arches + Vidya AI) */}
          <div className="flex items-center shrink-0">
            {/* Logo button - no nested buttons inside */}
            <button 
              type="button"
              onClick={() => setActiveTab('home')} 
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <NotebookArchesIcon />
              <span className="font-sans font-medium text-[17px] sm:text-[18px] tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                Vidya AI
              </span>
            </button>
            {/* iGOT badge — separate element outside the logo button to avoid nested <button> */}
            <div className="hidden lg:flex items-center gap-1.5 ml-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30">
                SIH26101
              </span>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveTab('igotKarmayogi')}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab('igotKarmayogi')}
                className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 cursor-pointer transition-colors select-none" 
                title="Open official iGOT Karmayogi capacity building dashboard"
              >
                iGOT: Mock Adapter ↗
              </div>
            </div>
          </div>

          {/* 2. Right: Overview (underlined) + Links + Discord/Reddit/X + Get the App */}
          <div className="flex items-center gap-5 sm:gap-6 lg:gap-7">
            
            {/* Primary Nav Links */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-6">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => setActiveTab(link.id)}
                    className={`relative text-[14px] transition-colors cursor-pointer py-1 ${
                      isActive
                        ? 'text-[#007AFF] font-medium border-b-2 border-[#007AFF]'
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-[#007AFF] dark:hover:text-[#007AFF] font-normal'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Utility Search */}
            <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search"
                className="p-1.5 rounded-lg hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Rightmost Action: "Get the app" and User Profile / Sign In */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    type="button"
                    className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-[#007AFF] transition-all cursor-pointer focus:outline-none shrink-0"
                  >
                    <Avatar className="w-8 h-8 border border-[#AAAAAA]/30">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-[#007AFF] text-white font-medium text-xs">
                        {user.name ? user.name.slice(0, 2).toUpperCase() : 'AK'}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side="bottom"
                  align="end"
                  className="z-50 min-w-[220px] p-2 rounded-2xl bg-[#F5F5F7]/95 dark:bg-[#1D1D1F]/95 backdrop-blur-2xl border border-[#AAAAAA]/30 shadow-xl text-xs space-y-1 text-[#1D1D1F] dark:text-[#F5F5F7]"
                >
                  <div className="px-3 py-2 border-b border-[#AAAAAA]/20">
                    <div className="font-semibold text-sm truncate">{user.name}</div>
                    <div className="text-[11px] text-neutral-500 font-mono truncate">{user.email}</div>
                  </div>

                  <DropdownMenuItem
                    onClick={() => setActiveTab('dashboard')}
                    className="px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2.5 cursor-pointer font-medium"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#007AFF]" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setActiveTab('studyHub')}
                    className="px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2.5 cursor-pointer font-medium"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Edit Academic Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center gap-2.5 cursor-pointer font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('studyHub')}
                  className="hidden sm:inline-block text-[14px] font-normal text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-[#007AFF] transition-colors cursor-pointer"
                >
                  Get the app
                </button>
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="text-[13px] font-bold px-4 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white shadow-sm shadow-[#007AFF]/25 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Started</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

        </div>
      </header>

      {/* Clean Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-[#F8FAFC] dark:bg-[#060B14] p-6 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto border-l border-white/60 dark:border-sky-500/20"
            >
              <div className="space-y-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-sky-500/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white flex items-center justify-center shadow-sm">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-montserrat font-extrabold text-lg text-slate-900 dark:text-white">
                      VIDYA AI
                    </span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setMobileMenuOpen(false)} 
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-1.5">
                  {navLinks.map((link) => {
                    const isActive = activeTab === link.id;
                    return (
                      <button
                        key={link.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(link.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-md shadow-sky-500/20'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-sky-500/10 dark:hover:bg-sky-400/10'
                        }`}
                      >
                        {link.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-5 border-t border-slate-200 dark:border-sky-500/20 space-y-3">
                {!user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="w-full py-3.5 rounded-full liquid-glass-button text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        setIsOpen={setAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

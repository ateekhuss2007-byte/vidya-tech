import React from 'react';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="w-full mt-24 border-t border-[#AAAAAA]/30 bg-[#F5F5F7] dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors overflow-hidden font-sans">
      
      {/* 1. Main Navigation & Links Grid */}
      <div className="w-full fluid-container py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#AAAAAA]/30 bg-white dark:bg-[#2C2C2E] p-0.5 flex items-center justify-center shadow-xs">
                <img 
                  src="/images/logos/vidya_ai_logo.jpg" 
                  alt="VIDYA AI Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                VIDYA AI
              </span>
            </div>
            
            <p className="text-sm text-[#1D1D1F]/70 dark:text-[#AAAAAA] max-w-sm leading-relaxed font-sans">
              The Official AI Academic Intelligence Platform. Modeling human memory decay, prerequisite knowledge graphs, and authentic university step marking for India's top academic aspirants.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 text-[11px] font-mono font-semibold text-[#007AFF]">
              <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
              <span>All Systems Operational • Apple Modern Design</span>
            </div>
          </div>

          {/* Sitemap Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            
            {/* Column 1: Core Platform */}
            <div className="space-y-3">
              <div className="font-mono uppercase font-bold tracking-wider text-[#007AFF] text-[10px]">
                Platform
              </div>
              <ul className="space-y-2.5 text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-medium">
                <li>
                  <button onClick={() => setActiveTab('studyHub')} className="hover:text-[#007AFF] transition-colors cursor-pointer flex items-center gap-1">
                    <span>Study Room</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#007AFF] text-white font-mono font-bold">New</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('dashboard')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    AIR Forecast Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('mockTests')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    Mock Exam Simulators
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('doubtSolver')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    AI Doubt Solver
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Curriculums */}
            <div className="space-y-3">
              <div className="font-mono uppercase font-bold tracking-wider text-[#007AFF] text-[10px]">
                Curriculums
              </div>
              <ul className="space-y-2.5 text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-medium">
                <li>
                  <button onClick={() => setActiveTab('collegeHub')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    B.Tech CSE / IT / ECE
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('mockTests')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    GATE 2027 Simulator
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('mockTests')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    CBSE Class 10 & 12
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('mockTests')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    SSC CGL Tier 1 & 2
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Intelligence Engine */}
            <div className="space-y-3">
              <div className="font-mono uppercase font-bold tracking-wider text-[#007AFF] text-[10px]">
                Cognitive Engine
              </div>
              <ul className="space-y-2.5 text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-medium">
                <li>
                  <button onClick={() => setActiveTab('digitalTwin')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    Digital Memory Twin
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('conceptGraph')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    Prerequisite Knowledge DAG
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('vivaExaminer')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    AI Viva Voice Examiner
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('agentSwarm')} className="hover:text-[#007AFF] transition-colors cursor-pointer">
                    Multi-Agent Swarm
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Standards */}
            <div className="space-y-3">
              <div className="font-mono uppercase font-bold tracking-wider text-[#007AFF] text-[10px]">
                Standards & Trust
              </div>
              <ul className="space-y-2.5 text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>MAKAUT Step Rubric</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>CBSE PYQ Verified</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>Zero Hallucination Grounding</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>Public Research APIs</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* 2. Signature Full-Bleed Apple Dark Brand Banner */}
      <div className="w-full bg-[#1D1D1F] text-[#F5F5F7] px-6 sm:px-12 py-16 sm:py-20 relative overflow-hidden select-none border-t border-[#AAAAAA]/30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#007AFF]/12 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8 relative z-10">
          
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 text-[#007AFF] text-xs font-mono font-bold shadow-xs">
              <Sparkles className="w-3 h-3 text-[#007AFF]" />
              <span>Autonomous Exam Mastery</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.05] text-[#F5F5F7]">
              Syllabus intelligence, built for top rankers.
            </h2>
            <p className="text-sm sm:text-base font-normal text-[#AAAAAA] leading-relaxed font-sans">
              Stop panicking over forgotten formulas. Turn every hour of preparation into verified long-term retention.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('studyHub')}
              className="px-8 py-3.5 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white font-bold text-sm transition-all shadow-md shadow-[#007AFF]/25 flex items-center justify-center gap-2 cursor-pointer shrink-0 font-sans"
            >
              <span>Launch Study Room</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-7 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-[#F5F5F7] font-bold text-sm transition-all border border-[#AAAAAA]/30 hover:border-[#007AFF] flex items-center justify-center gap-2 cursor-pointer shrink-0 font-sans"
            >
              <span>Explore Dashboard</span>
            </button>
          </div>

        </div>

        {/* Decorative Typography Wordmark */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#AAAAAA]/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono font-medium text-[#AAAAAA] gap-4">
          <div className="tracking-wider">
            © {new Date().getFullYear()} VIDYA AI TECHNOLOGIES • ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-6">
            <span>BUILT WITH COGNITIVE PRECISION</span>
            <span>•</span>
            <span>APPLE MODERN DESIGN SYSTEM</span>
          </div>
        </div>

        {/* Watermark Brand Typography */}
        <div className="text-[14vw] sm:text-[16vw] font-extrabold font-display leading-none tracking-tighter opacity-5 pointer-events-none text-center -mb-8 sm:-mb-14 overflow-hidden text-[#007AFF]">
          VIDYA AI
        </div>

      </div>

    </footer>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Network, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  Zap,
  Layers,
  ChevronRight,
  Target,
  Clock,
  Terminal,
  Shield
} from 'lucide-react';
import { AIStatusBadge } from '../ui/AIStatusBadge';
import { Button } from '../ui/Button';

export const CognitivePreview = ({ setActiveTab, onOpenTopic, user }) => {
  const [activeView, setActiveView] = useState('twin'); // 'twin' | 'retention' | 'prereq'

  return (
    <div id="twin-preview" className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-white/95 dark:bg-[#1D1D1F]/90 shadow-2xl text-left overflow-hidden relative border border-[#AAAAAA]/30 dark:border-white/10 backdrop-blur-xl scroll-gpu"
      >
        {/* Ambient Subtle Apple Blue Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#007AFF]/[0.08] dark:bg-[#007AFF]/[0.12] blur-3xl pointer-events-none -z-0" />

        {/* 1. macOS Window Header */}
        <div className="px-5 py-3.5 border-b border-[#AAAAAA]/20 dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/20" />
            </div>
            <span className="text-[11px] font-mono text-[#AAAAAA] ml-2 hidden sm:inline">
              vidya-ai / cognitive-twin / {user?.name ? user.name.toLowerCase().replace(' ', '_') : 'guest_learner'}.synced
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-[10px] font-mono font-semibold border border-[#007AFF]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse" />
              <span>Telemetry Synchronized (12ms)</span>
            </span>
          </div>
        </div>

        {/* 2. Top Profile Bar & Interactive Tab Switcher */}
        <div className="p-5 sm:p-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#AAAAAA]/20 dark:border-white/[0.05] relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border border-[#AAAAAA]/30 dark:border-white/[0.1] shadow-sm shrink-0">
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"} 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#AAAAAA] font-mono">Cognitive Learning Twin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse" />
              </div>
              <div className="text-sm sm:text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7] font-display">
                Good morning, {user?.name ? user.name.split(' ')[0] : 'Scholar'}
              </div>
            </div>
          </div>

          {/* Interactive Mode Pills */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.05] border border-[#AAAAAA]/30 dark:border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActiveView('twin')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeView === 'twin'
                  ? 'bg-[#007AFF] text-white font-semibold shadow-sm shadow-[#007AFF]/25'
                  : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF]'
              }`}
            >
              Telemetry
            </button>
            <button
              type="button"
              onClick={() => setActiveView('retention')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeView === 'retention'
                  ? 'bg-[#007AFF] text-white font-semibold shadow-sm shadow-[#007AFF]/25'
                  : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF]'
              }`}
            >
              Retention Curve
            </button>
            <button
              type="button"
              onClick={() => setActiveView('prereq')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeView === 'prereq'
                  ? 'bg-[#007AFF] text-white font-semibold shadow-sm shadow-[#007AFF]/25'
                  : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF]'
              }`}
            >
              Knowledge DAG
            </button>
          </div>
        </div>

        {/* 3. Dynamic Interactive Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <AnimatePresence mode="wait">
            {activeView === 'twin' && (
              <motion.div
                key="twin"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* 3 Telemetry Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  
                  {/* Metric 1 */}
                  <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.04] space-y-1 border border-[#AAAAAA]/30 dark:border-white/10 hover:border-[#007AFF] transition-colors">
                    <div className="text-[11px] font-mono text-[#AAAAAA] uppercase font-semibold flex items-center justify-between">
                      <span>Prerequisite Readiness</span>
                      <span className="w-2 h-2 rounded-full bg-[#007AFF]" />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">87%</span>
                      <span className="text-xs font-mono text-[#007AFF] font-semibold">+4.2% this week</span>
                    </div>
                    <div className="w-full bg-[#1D1D1F]/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className="bg-[#007AFF] h-full rounded-full" style={{ width: '87%' }} />
                    </div>
                    <div className="text-[10px] font-mono text-[#AAAAAA] pt-1">
                      Optimal focus window (42m left)
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.04] space-y-1 border border-[#AAAAAA]/30 dark:border-white/10 hover:border-[#007AFF] transition-colors">
                    <div className="text-[11px] font-mono text-[#AAAAAA] uppercase font-semibold flex items-center justify-between">
                      <span>Memory Retention</span>
                      <span className="w-2 h-2 rounded-full bg-[#007AFF]" />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">92.4%</span>
                      <span className="text-xs font-mono text-[#007AFF] font-semibold">18d half-life</span>
                    </div>
                    <div className="w-full bg-[#1D1D1F]/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className="bg-[#007AFF] h-full rounded-full" style={{ width: '92.4%' }} />
                    </div>
                    <div className="text-[10px] font-mono text-[#AAAAAA] pt-1">
                      SM-2 Spaced Interval: 4 days until review
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.04] space-y-1 border border-[#AAAAAA]/30 dark:border-white/10 hover:border-[#007AFF] transition-colors">
                    <div className="text-[11px] font-mono text-[#AAAAAA] uppercase font-semibold flex items-center justify-between">
                      <span>AI Performance Forecast</span>
                      <span className="text-[10px] font-mono bg-[#007AFF]/10 text-[#007AFF] px-1.5 py-0.5 rounded font-bold border border-[#007AFF]/25">AIR Track</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">AIR 1,420</span>
                      <span className="text-xs font-mono text-[#007AFF] font-semibold">99.12 %ile</span>
                    </div>
                    <div className="text-[11px] text-[#AAAAAA] font-mono mt-2">
                      Target: <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">Top 500</strong> in GATE 2027
                    </div>
                    <div className="text-[10px] font-mono text-[#AAAAAA]">
                      Velocity: +3.2 rank steps/wk
                    </div>
                  </div>

                </div>

                {/* Next Best Action Banner */}
                <div className="p-4 rounded-2xl border border-[#007AFF]/25 bg-[#007AFF]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start sm:items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#007AFF] text-white shrink-0 mt-0.5 sm:mt-0 tracking-wide shadow-sm shadow-[#007AFF]/30">
                      Next Best Action
                    </span>
                    <span className="text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Revise: <strong>Combinational Circuits & Boolean Minimization</strong> (Est. mastery gain: <span className="text-[#007AFF] font-bold font-mono">+8.4%</span>)
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    showArrow
                    onClick={() => {
                      if (onOpenTopic) onOpenTopic('Combinational Circuits');
                      else setActiveTab('studyHub');
                    }}
                    className="shrink-0 w-full sm:w-auto text-xs py-1.5 px-3.5 shadow-md shadow-[#007AFF]/20"
                  >
                    Start AI Session
                  </Button>
                </div>
              </motion.div>
            )}

            {activeView === 'retention' && (
              <motion.div
                key="retention"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#007AFF]" />
                    <span>Algorithmic Ebbinghaus Decay vs. Spaced Interventions</span>
                  </div>
                  <span className="text-[10px] font-mono bg-[#007AFF]/10 text-[#007AFF] px-2.5 py-0.5 rounded-full font-bold border border-[#007AFF]/25 inline-flex items-center gap-1 self-start sm:self-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse" />
                    <span>SM-2 Memory Engine Active</span>
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#AAAAAA]">
                    <span>Day 1 (100% Retained)</span>
                    <span>Day 3 (72%) • Review #1</span>
                    <span>Day 7 (89%) • Review #2</span>
                    <span className="text-[#007AFF] font-bold">Day 21 (98% Mastered)</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F5F5F7] dark:bg-white/10 rounded-full overflow-hidden flex">
                    <div className="w-[28%] bg-[#007AFF] h-full" />
                    <div className="w-[32%] bg-[#5AC8FA] h-full" />
                    <div className="w-[40%] bg-[#007AFF] h-full" />
                  </div>
                  
                  {/* Competitive Callout */}
                  <div className="p-3 rounded-xl bg-[#007AFF]/5 border border-[#007AFF]/20 flex items-start gap-2.5 text-xs text-[#1D1D1F] dark:text-[#F5F5F7]">
                    <span className="text-base leading-none mt-0.5">⚡</span>
                    <p className="leading-relaxed">
                      <strong>Why legacy EdTech (PW, Allen, Byju's) fails:</strong> Passive 3-hour video bingeing decays completely in 7 days without spaced recall. VIDYA automatically schedules <strong>5-minute active retrieval tests</strong> the moment your retention curve drops below 70%.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'prereq' && (
              <motion.div
                key="prereq"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                    <Network className="w-4 h-4 text-[#007AFF]" />
                    <span>Prerequisite Topological DAG (Directed Acyclic Graph)</span>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setActiveTab('conceptGraph')}
                    className="text-[11px] py-1 px-3 h-7 self-start sm:self-auto shadow-sm shadow-[#007AFF]/20"
                  >
                    Open Graph Studio
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/40 text-[#1D1D1F] dark:text-[#F5F5F7] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#1D1D1F] dark:bg-[#F5F5F7] text-[#F5F5F7] dark:text-[#1D1D1F] text-[9px] font-bold rounded-bl">PASSED</div>
                    <div className="text-[10px] text-[#007AFF] font-bold uppercase tracking-wider">FOUNDATION (100% READY)</div>
                    <div className="font-bold text-sm mt-1 text-[#1D1D1F] dark:text-[#F5F5F7]">Matrix Determinants</div>
                    <div className="text-[11px] text-[#AAAAAA] mt-0.5">Verified in Class 12 Maths</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#007AFF]/5 border-2 border-[#007AFF] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#007AFF] text-white text-[9px] font-bold rounded-bl animate-pulse">REVISE NOW</div>
                    <div className="text-[10px] text-[#007AFF] font-bold uppercase tracking-wider">CURRENT CRITICAL NODE</div>
                    <div className="font-bold text-sm mt-1 text-[#1D1D1F] dark:text-[#F5F5F7]">Eigenvalues & Vectors</div>
                    <div className="text-[11px] text-[#AAAAAA] mt-0.5">B.Tech Sem 1 Core (10 Marks)</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/20 text-[#1D1D1F] dark:text-[#F5F5F7] shadow-sm relative overflow-hidden opacity-75">
                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#AAAAAA] text-white text-[9px] font-bold rounded-bl">LOCKED</div>
                    <div className="text-[10px] text-[#AAAAAA] font-bold uppercase tracking-wider">TARGET MILESTONE</div>
                    <div className="font-bold text-sm mt-1 text-[#1D1D1F] dark:text-[#F5F5F7]">PCA & Dimensionality</div>
                    <div className="text-[11px] text-[#AAAAAA] mt-0.5">Unlocks after Eigenvalues</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-3xl glass-surface shadow-2xl text-left overflow-hidden relative border border-white/60 dark:border-white/10"
      >
        {/* Ambient Subtle Teal/Navy Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#407E8C]/[0.08] dark:bg-[#407E8C]/[0.12] blur-3xl pointer-events-none -z-0" />

        {/* 1. macOS / Linear-Style Window Header */}
        <div className="px-5 py-3.5 border-b border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/20" />
            </div>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 ml-2 hidden sm:inline">
              vidya-ai / cognitive-twin / {user?.name ? user.name.toLowerCase().replace(' ', '_') : 'aryan_shaw'}.synced
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-teal text-[10px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#407E8C] animate-pulse" />
              <span>Telemetry Synchronized (12ms)</span>
            </span>
          </div>
        </div>

        {/* 2. Top Profile Bar & Interactive Tab Switcher */}
        <div className="p-5 sm:p-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.05] dark:border-white/[0.05] relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border border-[#083A4F]/15 dark:border-white/[0.1] shadow-sm shrink-0">
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"} 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Cognitive Learning Twin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#407E8C] animate-pulse" />
              </div>
              <div className="text-sm sm:text-base font-bold text-[#083A4F] dark:text-white font-display">
                Good morning, {user?.name ? user.name.split(' ')[0] : 'Aryan'}
              </div>
            </div>
          </div>

          {/* Interactive Mode Pills */}
          <div className="flex items-center gap-1 p-1 rounded-xl glass-pill">
            <button
              type="button"
              onClick={() => setActiveView('twin')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeView === 'twin'
                  ? 'bg-[#083A4F] text-white dark:bg-[#407E8C] font-semibold shadow-sm'
                  : 'text-neutral-500 hover:text-[#083A4F] dark:hover:text-white'
              }`}
            >
              Telemetry
            </button>
            <button
              type="button"
              onClick={() => setActiveView('retention')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeView === 'retention'
                  ? 'bg-[#083A4F] text-white dark:bg-[#407E8C] font-semibold shadow-sm'
                  : 'text-neutral-500 hover:text-[#083A4F] dark:hover:text-white'
              }`}
            >
              Retention Curve
            </button>
            <button
              type="button"
              onClick={() => setActiveView('prereq')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeView === 'prereq'
                  ? 'bg-[#083A4F] text-white dark:bg-[#407E8C] font-semibold shadow-sm'
                  : 'text-neutral-500 hover:text-[#083A4F] dark:hover:text-white'
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
                  <div className="p-4 rounded-2xl glass-card space-y-1 border border-white/60 dark:border-white/10">
                    <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                      Prerequisite Readiness
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-display text-[#083A4F] dark:text-white">87%</span>
                      <span className="text-xs font-mono text-[#407E8C] dark:text-[#6BB0C0] font-semibold">+4.2% this week</span>
                    </div>
                    <div className="w-full bg-[#083A4F]/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className="bg-[#407E8C] h-full rounded-full" style={{ width: '87%' }} />
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 pt-1">
                      Optimal focus window (42m left)
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 rounded-2xl glass-card space-y-1 border border-white/60 dark:border-white/10">
                    <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                      Memory Retention
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-display text-[#083A4F] dark:text-white">92.4%</span>
                      <span className="text-xs font-mono text-[#A58D66] dark:text-[#C5AF88] font-semibold">18d half-life</span>
                    </div>
                    <div className="w-full bg-[#083A4F]/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className="bg-[#A58D66] h-full rounded-full" style={{ width: '92.4%' }} />
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 pt-1">
                      SM-2 Spaced Interval: 4 days until review
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 rounded-2xl glass-card space-y-1 border border-white/60 dark:border-white/10">
                    <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                      AI Performance Forecast
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-display text-[#083A4F] dark:text-white">AIR 1,420</span>
                      <span className="text-xs font-mono text-[#407E8C] dark:text-[#6BB0C0] font-semibold">99.12 %ile</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-2">
                      Target: <strong className="text-[#083A4F] dark:text-white">Top 500</strong> in GATE 2027
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      Velocity: +3.2 rank steps/wk
                    </div>
                  </div>

                </div>

                {/* Next Best Action Banner */}
                <div className="p-4 rounded-2xl glass-surface border border-[#083A4F]/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start sm:items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#A58D66] text-white shrink-0 mt-0.5 sm:mt-0 tracking-wide">
                      Next Best Action
                    </span>
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Revise: <strong>Combinational Circuits & Boolean Minimization</strong> (Est. mastery gain: <span className="text-[#407E8C] dark:text-[#6BB0C0] font-bold font-mono">+8.4%</span>)
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
                    className="shrink-0 w-full sm:w-auto text-xs py-1.5 px-3.5"
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
                className="p-5 rounded-2xl bg-[#FAF9F7] dark:bg-[#062432] border border-[#083A4F]/10 dark:border-white/[0.06] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono font-semibold text-[#083A4F] dark:text-neutral-200 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#407E8C]" />
                    <span>Ebbinghaus Memory Decay vs. Spaced Recall Interventions</span>
                  </div>
                  <span className="text-[10px] font-mono bg-[#407E8C]/15 text-[#407E8C] dark:text-[#6BB0C0] px-2.5 py-0.5 rounded-full font-semibold border border-[#407E8C]/20">
                    Zero Forgetting Enabled
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>Day 1 (100%)</span>
                    <span>Day 3 (72%) • Review #1</span>
                    <span>Day 7 (88%) • Review #2</span>
                    <span>Day 21 (96% Mastered)</span>
                  </div>
                  <div className="h-2 w-full bg-[#083A4F]/10 dark:bg-white/10 rounded-full overflow-hidden flex">
                    <div className="w-[30%] bg-[#083A4F] h-full" />
                    <div className="w-[30%] bg-[#407E8C] h-full" />
                    <div className="w-[40%] bg-[#A58D66] h-full" />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans pt-1">
                    Instead of 4-hour cramming sessions that decay within 7 days, VIDYA prompts <strong className="text-[#083A4F] dark:text-neutral-200">5-minute micro-recalls</strong> precisely when retention dips to 68%.
                  </p>
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
                className="p-5 rounded-2xl bg-[#FAF9F7] dark:bg-[#062432] border border-[#083A4F]/10 dark:border-white/[0.06] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono font-semibold text-[#083A4F] dark:text-neutral-200 flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-[#407E8C]" />
                    <span>Knowledge Dependency DAG (Direct Acyclic Graph)</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveTab('conceptGraph')}
                    className="text-[11px] py-1 px-2.5 h-7"
                  >
                    Open Graph Studio
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#083A4F]/40 border border-[#407E8C]/30 text-neutral-800 dark:text-neutral-200 shadow-sm">
                    <div className="text-[10px] text-[#407E8C] font-bold uppercase tracking-wider">FOUNDATION (MASTERED)</div>
                    <div className="font-bold text-xs mt-0.5 text-[#083A4F] dark:text-white">Matrix Determinants</div>
                    <div className="text-[10px] text-neutral-400">Class 12 Maths</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#083A4F]/40 border border-[#A58D66]/40 text-neutral-800 dark:text-neutral-200 shadow-sm">
                    <div className="text-[10px] text-[#A58D66] font-bold uppercase tracking-wider">CURRENT BRIDGE (REVISE)</div>
                    <div className="font-bold text-xs mt-0.5 text-[#083A4F] dark:text-white">Eigenvalues & Vectors</div>
                    <div className="text-[10px] text-neutral-400">B.Tech Sem 1</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#083A4F]/40 border border-[#083A4F]/30 dark:border-[#407E8C]/40 text-neutral-800 dark:text-neutral-200 shadow-sm">
                    <div className="text-[10px] text-[#083A4F] dark:text-[#407E8C] font-bold uppercase tracking-wider">TARGET (READY TO UNLOCK)</div>
                    <div className="font-bold text-xs mt-0.5 text-[#083A4F] dark:text-white">PCA & Dimensionality</div>
                    <div className="text-[10px] text-neutral-400">GATE / ML Core</div>
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

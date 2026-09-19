import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Zap, 
  CheckCircle2, 
  Brain, 
  Clock, 
  Layers, 
  Activity, 
  Target 
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export const LearningChart = ({ activity = [] }) => {
  const [activeTab, setActiveTab] = useState('weekly'); // 'weekly' | 'decay' | 'mastery' | 'consistency'
  const [activeDay, setActiveDay] = useState('Thu');

  const maxHours = Math.max(...(activity || []).map(d => d.hours), 4.5);
  const selected = (activity || []).find(d => d.day === activeDay) || (activity || [])[3];

  const subjects = [
    { name: 'Data Structures & Algorithms', mastery: 89, target: 90, color: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'Computer Networks (OSI & CIDR)', mastery: 72, target: 85, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    { name: 'Discrete Mathematics (Logic)', mastery: 61, target: 80, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    { name: 'Digital Electronics (Circuits)', mastery: 58, target: 85, color: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' }
  ];

  return (
    <SpotlightCard
      glowEdge={true}
      edgeColor="cyan"
      className="p-6 sm:p-7 space-y-5"
    >
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.05] dark:border-white/[0.06]">
        <div className="space-y-0.5">
          <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
            Learning Intelligence Engine
          </div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white font-display">
            Cognitive Telemetry & Analytics
          </h3>
        </div>

        {/* View Toggle Pill */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.08] text-[11px] font-mono overflow-x-auto no-scrollbar max-w-full">
          {[
            { id: 'weekly', label: 'Activity' },
            { id: 'decay', label: 'Memory Decay' },
            { id: 'mastery', label: 'Subject Mastery' },
            { id: 'consistency', label: 'Consistency' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-xl transition-all font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#1E2330] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Module Body */}
      <AnimatePresence mode="wait">
        {/* 1. Weekly Learning Activity */}
        {activeTab === 'weekly' && (
          <motion.div
            key="weekly"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="text-[11px]">Click any day to inspect focus telemetry</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-blue-600" />
                  <span>Study Hours</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-emerald-500" />
                  <span>Accuracy %</span>
                </span>
              </div>
            </div>

            {/* Bar Chart Visualization */}
            <div className="h-40 flex items-end justify-between gap-2 sm:gap-4 pt-2 px-2 border-b border-black/[0.04] dark:border-white/[0.04] pb-2">
              {(activity || []).map((item) => {
                const heightPercent = (item.hours / maxHours) * 100;
                const isSelected = item.day === activeDay;

                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => setActiveDay(item.day)}
                    className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group focus:outline-none"
                  >
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      {/* Hours Bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className={`w-full max-w-[20px] rounded-t-lg transition-all ${
                          isSelected
                            ? 'bg-blue-600 dark:bg-blue-500 shadow-md'
                            : 'bg-black/10 dark:bg-white/15 group-hover:bg-blue-400/80'
                        }`}
                      />
                    </div>
                    <span className={`text-[11px] font-mono transition-colors ${
                      isSelected
                        ? 'font-bold text-neutral-900 dark:text-white'
                        : 'text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200'
                    }`}>
                      {item.day}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Day Detailed Telemetry Strip */}
            {selected && (
              <div className="p-3.5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-bold text-neutral-900 dark:text-white">{selected.day} Telemetry:</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-300">
                  <span>Duration: <strong className="text-neutral-900 dark:text-white">{selected.hours} hrs</strong></span>
                  <span>Accuracy: <strong className="text-emerald-600 dark:text-emerald-400">{selected.accuracy}%</strong></span>
                  <span>Mastery: <strong className="text-blue-600 dark:text-blue-400">+{selected.concepts} Concepts</strong></span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 2. Memory Decay Curve (Ebbinghaus Spaced Repetition) */}
        {activeTab === 'decay' && (
          <motion.div
            key="decay"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="space-y-0.5">
                <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-emerald-500" />
                  Ebbinghaus Memory Half-Life: 18 Days
                </span>
                <span className="text-[11px] text-neutral-400">Adaptive spaced reinforcement prevents knowledge evaporation.</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200/60 text-[10px]">
                0 Backlogs
              </span>
            </div>

            {/* SVG Visual Decay Curve */}
            <div className="p-4 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] space-y-2">
              <svg viewBox="0 0 500 120" className="w-full h-28 overflow-visible">
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="currentColor" strokeDasharray="3 3" className="text-black/5 dark:text-white/5" />
                <line x1="40" y1="60" x2="480" y2="60" stroke="currentColor" strokeDasharray="3 3" className="text-black/5 dark:text-white/5" />
                <line x1="40" y1="100" x2="480" y2="100" stroke="currentColor" className="text-black/10 dark:text-white/10" />

                {/* Y-Axis Labels */}
                <text x="10" y="24" className="text-[9px] fill-neutral-400 font-mono">100%</text>
                <text x="15" y="64" className="text-[9px] fill-neutral-400 font-mono">80%</text>
                <text x="15" y="104" className="text-[9px] fill-neutral-400 font-mono">60%</text>

                {/* Unreinforced Decay Path (faint dashed red) */}
                <path
                  d="M 40 20 Q 150 95, 480 115"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />

                {/* Reinforced Sawtooth Curve (Emerald VIDYA Spaced Repetition) */}
                <path
                  d="M 40 20 Q 90 45, 120 48 L 120 22 Q 180 38, 240 42 L 240 20 Q 340 32, 480 34"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Recall Interventions */}
                <circle cx="120" cy="22" r="3.5" fill="#10B981" />
                <circle cx="240" cy="20" r="3.5" fill="#10B981" />
                <circle cx="480" cy="34" r="4" fill="#0055FE" />

                {/* Intervention labels */}
                <text x="105" y="12" className="text-[8px] fill-emerald-600 dark:fill-emerald-400 font-mono font-bold">Day 3</text>
                <text x="225" y="10" className="text-[8px] fill-emerald-600 dark:fill-emerald-400 font-mono font-bold">Day 7</text>
                <text x="440" y="22" className="text-[8px] fill-blue-600 dark:fill-blue-400 font-mono font-bold">Day 21 (92.4%)</text>
              </svg>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-emerald-500" />
                  <span>VIDYA Spaced Recall (92.4% Retention)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-rose-400 border-dashed" />
                  <span>Typical Forgetting Without Twin</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. Subject Mastery Breakdown */}
        {activeTab === 'mastery' && (
          <motion.div
            key="mastery"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="space-y-3.5"
          >
            <div className="text-xs font-mono text-neutral-400 flex items-center justify-between">
              <span>Curriculum Subject Matrix</span>
              <span>Target Benchmark: 80%+</span>
            </div>

            <div className="space-y-3">
              {subjects.map((subj) => (
                <div key={subj.name} className="p-3 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-900 dark:text-white">{subj.name}</span>
                    <span className={`font-mono font-bold ${subj.text}`}>
                      {subj.mastery}% <span className="text-neutral-400 font-normal">/ {subj.target}% target</span>
                    </span>
                  </div>

                  {/* Progress Meter */}
                  <div className="w-full h-2 rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${subj.color} transition-all duration-500`}
                      style={{ width: `${subj.mastery}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 4. Study Consistency & Peak Focus */}
        {activeTab === 'consistency' && (
          <motion.div
            key="consistency"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div className="p-4 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Optimal Focus Window</span>
              </div>
              <div className="text-lg font-bold font-display text-neutral-900 dark:text-white">
                42 Minutes
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Cognitive telemetry flags fatigue drop-offs beyond minute 45.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Peak Alertness Window</span>
              </div>
              <div className="text-lg font-bold font-display text-neutral-900 dark:text-white">
                08:30 – 11:15 AM
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Highest problem-solving accuracy observed during morning hours.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
};

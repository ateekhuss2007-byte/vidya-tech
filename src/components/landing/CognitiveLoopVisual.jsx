import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { 
  BookOpen, 
  Brain, 
  Clock, 
  Radar, 
  RefreshCw, 
  Trophy, 
  ArrowRight,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';

export const CognitiveLoopVisual = ({ setActiveTab }) => {
  const [activeStep, setActiveStep] = useState(3); // Default on "AI Detects"
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 35%']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 260, damping: 28 });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.05 && latest <= 0.95) {
        const stepIdx = Math.min(Math.floor(latest * 6), 5);
        setActiveStep(stepIdx);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const steps = [
    {
      id: 0,
      title: 'Study',
      subtitle: 'Structured Curriculum',
      icon: BookOpen,
      badge: 'Step 01',
      description: 'You engage with university semester notes, PYQs, and verified YouTube lectures mapped directly to official syllabi.',
      stat: '100% Syllabus Traceability',
      color: 'blue'
    },
    {
      id: 1,
      title: 'Learn',
      subtitle: 'Active Step Working',
      icon: Brain,
      badge: 'Step 02',
      description: 'You solve 10-mark numericals with authentic step-by-step rubrics instead of passively reading answers.',
      stat: '4x Higher Encoding Depth',
      color: 'indigo'
    },
    {
      id: 2,
      title: 'Forget',
      subtitle: 'Ebbinghaus Decay',
      icon: Clock,
      badge: 'Step 03',
      description: 'Human memory naturally drops to 60% within 48 hours without timely retrieval practice.',
      stat: 'Exponential Half-Life Model',
      color: 'amber'
    },
    {
      id: 3,
      title: 'AI Detects',
      subtitle: 'Telemetry Trigger',
      icon: Radar,
      badge: 'Step 04 • AI Engine',
      description: 'VIDYA AI’s Cognitive Twin monitors your retention curve and spots the exact moment recall probability dips below 68%.',
      stat: 'Real-Time Neural Calibration',
      color: 'accent'
    },
    {
      id: 4,
      title: 'Revise',
      subtitle: '5-Min Spaced Recall',
      icon: RefreshCw,
      badge: 'Step 05',
      description: 'You receive a high-yield 5-minute micro-drill targeting your specific prerequisite gaps before memory decays completely.',
      stat: 'Zero Guilt Dynamic Scheduling',
      color: 'emerald'
    },
    {
      id: 5,
      title: 'Master',
      subtitle: 'Permanent Retention',
      icon: Trophy,
      badge: 'Step 06',
      description: 'After 3 calibrated spaced reviews, concepts transition into long-term crystalline memory for exam day.',
      stat: '99.4% Peak Recall in Finals',
      color: 'emerald'
    }
  ];

  const current = steps[activeStep];

  return (
    <section 
      id="cognitive-loop" 
      ref={containerRef}
      className="w-full fluid-container space-y-8 scroll-mt-24"
    >
      {/* Section Header */}
      <SectionHeader
        badge="Cognitive Loop Intelligence"
        badgeVariant="neutral"
        title="Your learning has a pattern."
        highlightText="VIDYA AI finds it."
        description="Traditional study platforms treat education as static video consumption. VIDYA AI models human memory decay, detects conceptual gaps before semester finals, and triggers automated spaced reviews."
      />

      {/* Dynamic Scroll Progress Scrub Beam */}
      <div className="relative w-full h-1 bg-neutral-200/80 dark:bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#007AFF] via-[#3395FF] to-[#5AC8FA]"
          style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
        />
      </div>

      {/* Interactive 6-Step Cognitive Pipeline Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          const isAccent = step.badge.includes('AI Engine');

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border relative overflow-hidden ${
                isActive
                  ? 'bg-white dark:bg-[#1D1D1F] border-[#007AFF] shadow-sm shadow-[#007AFF]/15 ring-1 ring-[#007AFF]/30'
                  : 'bg-[#F5F5F7] dark:bg-white/[0.03] border-[#AAAAAA]/30 dark:border-white/[0.06] hover:border-[#007AFF]/40'
              }`}
            >
              {isAccent && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse" />
              )}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold ${
                  isActive ? 'text-[#007AFF]' : 'text-[#AAAAAA]'
                }`}>
                  {step.badge.split('•')[0]}
                </span>
                <Icon className={`w-4 h-4 ${
                  isActive ? 'text-[#007AFF]' : 'text-[#AAAAAA]'
                }`} />
              </div>
              <div className={`font-bold text-sm ${
                isActive ? 'text-[#1D1D1F] dark:text-[#F5F5F7]' : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA]'
              }`}>
                {step.title}
              </div>
              <div className="text-[11px] text-[#AAAAAA] font-sans truncate">
                {step.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Focused Step Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl p-6 sm:p-8 bg-white/95 dark:bg-[#1D1D1F]/90 border border-[#AAAAAA]/30 dark:border-white/10 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-md"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5F5F7] dark:bg-white/[0.06] border border-[#AAAAAA]/30 text-[#1D1D1F] dark:text-[#F5F5F7] text-xs font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]" />
              <span>Phase {current.id + 1} of 6 • {current.subtitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">
              {current.title}: {current.description}
            </h3>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#007AFF] font-semibold bg-[#007AFF]/10 px-3 py-1 rounded-lg border border-[#007AFF]/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{current.stat}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            {activeStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveStep(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-[#F5F5F7] hover:bg-black/5 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-[#1D1D1F] dark:text-[#F5F5F7] font-medium text-xs border border-[#AAAAAA]/30 dark:border-white/[0.1] hover:border-[#007AFF] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Next Phase</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => setActiveTab('digitalTwin')}
              className="px-6 py-2.5 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#007AFF]/25"
            >
              <span>Explore Memory Twin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

    </section>
  );
};

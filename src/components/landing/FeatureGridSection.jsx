import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Brain, 
  Network, 
  Layers, 
  HelpCircle, 
  FileCheck, 
  RefreshCw, 
  TrendingUp, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

export const FeatureGridSection = ({ setActiveTab }) => {
  const features = [
    {
      id: 'studyHub',
      badge: '01 • Study Room',
      title: 'AI Study Room',
      description: 'Instant 10-mark solved numericals, formula sheets, and curated YouTube lectures matched to your exact university syllabus.',
      icon: BookOpen,
      action: 'Open Study Room'
    },
    {
      id: 'digitalTwin',
      badge: '02 • Cognitive Twin',
      title: 'Digital Learning Twin',
      description: 'A dynamic AI clone of your memory state, estimating forgetting curves and calculating daily cognitive readiness.',
      icon: Brain,
      action: 'Inspect Twin'
    },
    {
      id: 'conceptGraph',
      badge: '03 • Dependencies',
      title: 'Prerequisite DAG Gap Detection',
      description: 'Maps topological subject hierarchies. Never struggle in advanced topics because of an unmastered foundational lemma.',
      icon: Network,
      action: 'Explore Graph'
    },
    {
      id: 'flashcards',
      badge: '04 • Spaced Recall',
      title: 'SM-2 Memory Retention Engine',
      description: 'Automated flashcard decks with algorithmic scheduling that triggers quick reviews right before memory decays.',
      icon: Layers,
      action: 'Practice Decks'
    },
    {
      id: 'doubtSolver',
      badge: '05 • Instant Help',
      title: 'AI Step-Marked Doubt Solver',
      description: 'Ask any question or snap an exam problem. Get full university working with formulas, substitutions, and verify steps.',
      icon: HelpCircle,
      action: 'Solve Doubts'
    },
    {
      id: 'mockTests',
      badge: '06 • Simulators',
      title: 'Authentic Mock Test Engine',
      description: '70M, 80M, and 100M timed papers with real university marking schemes, negative penalties, and diagnostic reports.',
      icon: FileCheck,
      action: 'Take Test'
    },
    {
      id: 'weaknessHeatmap',
      badge: '07 • Diagnostic',
      title: 'Chapter Weakness Heatmap',
      description: 'Identifies high-yield score leakage chapters across syllabus modules and slots targeted revisions into your plan.',
      icon: RefreshCw,
      action: 'View Heatmap'
    },
    {
      id: 'dashboard',
      badge: '08 • Benchmarking',
      title: 'AIR Performance Forecast',
      description: 'Predictive rank and percentile telemetry based on national cohort data, historical papers, and test velocity.',
      icon: TrendingUp,
      action: 'View Forecast'
    }
  ];

  return (
    <section id="feature-grid" className="w-full fluid-container space-y-8 scroll-mt-24 perspective-stage">
      <SectionHeader
        badge="Platform Architecture"
        badgeVariant="neutral"
        title="Complete intelligence ecosystem."
        highlightText="Engineered for high performance."
        description="Every tool in VIDYA AI connects to your central cognitive twin to provide a unified, distraction-free study operating system."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feat, idx) => {
          const Icon = feat.icon;

          return (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 28, rotateX: 7 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ 
                duration: 0.55, 
                delay: (idx % 4) * 0.08, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ y: -6, scale: 1.015 }}
              onClick={() => setActiveTab(feat.id)}
              className="p-6 rounded-2xl bg-white/95 dark:bg-[#1D1D1F]/90 cursor-pointer group flex flex-col justify-between space-y-4 relative overflow-hidden transition-all duration-300 border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF] hover:shadow-xl hover:shadow-[#007AFF]/10 backdrop-blur-md scroll-gpu"
            >
              {/* Apple Blue Gradient Top Accent on Hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#007AFF] via-[#5AC8FA] to-[#007AFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F5F5F7] dark:bg-white/[0.05] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#AAAAAA]/30 group-hover:border-[#007AFF]/40 group-hover:text-[#007AFF] transition-colors">
                    {feat.badge}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.05] flex items-center justify-center text-[#1D1D1F]/70 dark:text-[#AAAAAA] group-hover:text-[#007AFF] dark:group-hover:text-[#007AFF] group-hover:bg-[#007AFF]/10 group-hover:scale-110 transition-all border border-[#AAAAAA]/30 group-hover:border-[#007AFF]/30">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-bold text-base text-[#1D1D1F] dark:text-[#F5F5F7] font-display group-hover:text-[#007AFF] transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>

              <div className="text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-1 group-hover:translate-x-1.5 transition-transform pt-2 border-t border-[#AAAAAA]/20 dark:border-white/[0.06] group-hover:text-[#007AFF]">
                <span>{feat.action}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#AAAAAA] group-hover:text-[#007AFF] transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

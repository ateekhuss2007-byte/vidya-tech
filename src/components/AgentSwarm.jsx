import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Stethoscope, 
  Brain, 
  Compass, 
  ShieldAlert, 
  Globe, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export const AgentSwarm = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([0, 1]);

  const simpleAgents = [
    {
      id: 'diagnostic',
      name: 'Topic Doctor',
      role: 'Finds your weak topics',
      desc: 'Discovered that you need a 15-min brush-up on Eigenvalues before starting PCA.',
      icon: Stethoscope,
      color: 'text-blue-600',
      status: 'Ready'
    },
    {
      id: 'memory',
      name: 'Memory Assistant',
      role: 'Schedules review dates',
      desc: 'Calculated that Calculus should be reviewed in 2 days to prevent forgetting.',
      icon: Brain,
      color: 'text-purple-600',
      status: 'Active'
    },
    {
      id: 'curriculum',
      name: 'Schedule Optimizer',
      role: 'Shifts timetable automatically',
      desc: 'Rebalanced your 7-day study plan with zero guilt if you missed college lectures.',
      icon: Compass,
      color: 'text-emerald-600',
      status: 'Ready'
    },
    {
      id: 'intervention',
      name: 'Exam Guard',
      role: 'Early warning system',
      desc: 'Predicts semester score improvements and alerts you before exam hurdles occur.',
      icon: ShieldAlert,
      color: 'text-amber-600',
      status: 'Monitoring'
    },
    {
      id: 'library',
      name: 'Resource Finder',
      role: 'Finds papers & summaries',
      desc: 'Linked top arXiv papers and visual notes to your syllabus chapters.',
      icon: Globe,
      color: 'text-rose-600',
      status: 'Connected'
    }
  ];

  const handleOptimize = () => {
    setIsRunning(true);
    toast.info('AI Study Agents are analyzing your syllabus and schedule...');

    setTimeout(() => {
      setIsRunning(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      toast.success('Study Plan Fully Optimized!', {
        description: 'Schedule re-sequenced for maximum retention with 15-minute daily focus blocks.'
      });
    }, 1000);
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-10 animate-fade-in space-y-8">
      
      {/* Friendly Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/30 text-[#00F59B] text-xs font-bold mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Study Swarm</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-[#F0F6FC]">
            5 Smart Cognitive Agents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8B949E] mt-1 font-sans">
            Autonomous AI assistants working in the background to optimize your exam preparation.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOptimize}
          disabled={isRunning}
          className="px-6 py-3 rounded-xl bg-[#00F59B] hover:bg-[#5EFCC2] text-[#07090D] font-bold text-xs sm:text-sm shadow-md shadow-[#00F59B]/20 flex items-center gap-2"
        >
          {isRunning ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-[#07090D]" />
              <span>Optimizing Timetable...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Optimize My Study Plan</span>
            </>
          )}
        </motion.button>
      </div>

      {/* 5 Clean Friendly Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {simpleAgents.map((agent) => {
          const Icon = agent.icon;
          return (
            <div
              key={agent.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-[#30363D] hover:border-[#00F59B] transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#161B22] border border-slate-200 dark:border-[#30363D] flex items-center justify-center">
                    <Icon className={`w-5 h-5 text-[#00F59B]`} />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" /> {agent.status}
                  </span>
                </div>

                <h3 className="font-bold text-base font-display text-slate-900 dark:text-[#F0F6FC]">
                  {agent.name}
                </h3>
                <div className="text-xs font-semibold text-[#00F59B] mb-2 font-sans">
                  {agent.role}
                </div>
                <p className="text-xs text-slate-500 dark:text-[#8B949E] leading-relaxed">
                  {agent.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-[#21262D] text-[11px] text-slate-400 dark:text-[#8B949E] font-medium font-mono">
                ⚡ Autonomous background sync active
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

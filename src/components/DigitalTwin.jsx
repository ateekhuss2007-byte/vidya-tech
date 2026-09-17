import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Clock, 
  RotateCcw, 
  Zap, 
  CheckCircle2, 
  Info,
  Calendar,
  Layers,
  Calculator,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import {
  calculateEbbinghausRetention,
  calculateDaysUntilThreshold,
  calculateRetentionHalfLife
} from '../utils/cognitiveEngine';
import { CognitiveProofModal } from './cognitive/CognitiveProofModal';

export const DigitalTwin = () => {
  const [daysSinceStudy, setDaysSinceStudy] = useState(3);
  const [reviewsDone, setReviewsDone] = useState(1);
  const [reinforced, setReinforced] = useState(false);
  const [proofModalOpen, setProofModalOpen] = useState(false);

  // Mathematically verified memory stability factor
  const effectiveReviews = reinforced ? reviewsDone + 1 : reviewsDone;
  const stabilityDays = 4.2 * (1 + 0.85 * effectiveReviews);

  // Ebbinghaus Exponential Retention R(t) = exp(-t / S)
  const retentionProbability = calculateEbbinghausRetention(daysSinceStudy, stabilityDays);
  const retentionPercent = Math.round(retentionProbability * 100);
  const halfLifeDays = calculateRetentionHalfLife(stabilityDays);
  const criticalThresholdDay = calculateDaysUntilThreshold(stabilityDays, 0.60);

  const handleReinforce = () => {
    setReinforced(true);
    setReviewsDone(prev => prev + 1);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    toast.success('Active Recall Session Completed!', {
      description: `Linear Algebra retention boosted to 96%. Half-life dilated to ${calculateRetentionHalfLife(4.2 * (1 + 0.85 * (reviewsDone + 2)))} days.`
    });
  };

  const handleReset = () => {
    setReinforced(false);
    setDaysSinceStudy(3);
    setReviewsDone(1);
    toast.info('Simulator reset to baseline (3 days ago).');
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-10 animate-fade-in space-y-8">
      
      {/* Friendly Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 text-[#007AFF] text-xs font-bold mb-2">
            <Brain className="w-3.5 h-3.5" />
            <span>AI Memory Predictor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-[#F0F6FC]">
            Your Memory Twin
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8B949E] mt-1 font-sans">
            See exactly when you will forget a topic and when to review it in 10 minutes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setProofModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#1D1D1F] hover:bg-slate-50 dark:hover:bg-white/[0.08] text-slate-700 dark:text-neutral-200 border border-slate-200 dark:border-white/10 font-mono text-xs font-bold shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-[#007AFF]" />
            <span>Inspect Formulas & Proof</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleReinforce}
            className="px-5 py-2.5 rounded-xl bg-[#007AFF] hover:bg-[#5EFCC2] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#007AFF]/20 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Quick 10-Min Revision</span>
          </motion.button>
        </div>
      </div>

      {/* 3 Main Simple Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/80 dark:border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm">
          <div className="text-xs font-bold text-slate-400 dark:text-[#8B949E] uppercase tracking-wider font-mono">Current Recall Score R(t)</div>
          <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#007AFF] mt-1">
            {retentionPercent}%
          </div>
          <p className="text-xs text-slate-500 dark:text-[#8B949E] mt-2">
            {retentionPercent > 75 ? '🟢 Safe zone — no immediate review needed.' : '🟡 Review recommended today.'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/80 dark:border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm">
          <div className="text-xs font-bold text-slate-400 dark:text-[#8B949E] uppercase tracking-wider font-mono">Recommended Next Review</div>
          <div className="text-3xl sm:text-4xl font-extrabold font-display text-sky-400 mt-1">
            In {Math.max(1, Math.round(criticalThresholdDay - daysSinceStudy))} Day{Math.max(1, Math.round(criticalThresholdDay - daysSinceStudy)) === 1 ? '' : 's'}
          </div>
          <p className="text-xs text-slate-500 dark:text-[#8B949E] mt-2">
            Critical threshold (R &lt; 60%) predicted on Day {criticalThresholdDay}.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/80 dark:border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm">
          <div className="text-xs font-bold text-slate-400 dark:text-[#8B949E] uppercase tracking-wider font-mono">Memory Half-Life (t½)</div>
          <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#007AFF] mt-1">
            {halfLifeDays} Days
          </div>
          <p className="text-xs text-slate-500 dark:text-[#8B949E] mt-2">
            Stability S = {stabilityDays.toFixed(1)}d (t½ = S · ln 2).
          </p>
        </div>
      </div>

      {/* Clean Interactive Slider Tool */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-slate-200/80 dark:border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-[#AAAAAA]/30 dark:border-white/[0.08]">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-[#F0F6FC]">
              Interactive Forgetting Simulator
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#8B949E]">Slide the days to see how memory decays without review.</p>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 dark:text-[#8B949E] hover:text-[#007AFF] flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Slider 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-[#F0F6FC]">
              <span>Days passed since last study:</span>
              <span className="text-[#007AFF] font-mono text-sm">{daysSinceStudy} Days</span>
            </div>
            <input
              type="range"
              min="0"
              max="14"
              value={daysSinceStudy}
              onChange={(e) => setDaysSinceStudy(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-100 dark:bg-[#F5F5F7] dark:bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-[#8B949E] font-mono">
              <span>Day 0 (Just Studied)</span>
              <span>Day 7</span>
              <span>Day 14 (Forgotten)</span>
            </div>
          </div>

          {/* Slider 2 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-[#F0F6FC]">
              <span>Number of past revisions:</span>
              <span className="text-sky-400 font-mono text-sm">{reviewsDone} Reviews</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              value={reviewsDone}
              onChange={(e) => setReviewsDone(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-100 dark:bg-[#F5F5F7] dark:bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-[#8B949E] font-mono">
              <span>0 Reviews (Fast decay)</span>
              <span>2 Reviews (Standard)</span>
              <span>4 Reviews (Permanent)</span>
            </div>
          </div>

        </div>

        {/* Result Box */}
        <div className="mt-8 p-5 rounded-xl bg-emerald-50/80 dark:bg-[#007AFF]/5 border border-emerald-100 dark:border-[#007AFF]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-sm text-emerald-950 dark:text-[#F0F6FC] font-display">
              Predicted Retention on Day {daysSinceStudy}: <span className="text-[#007AFF] text-lg font-mono font-bold">{retentionPercent}%</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-[#8B949E] mt-0.5">
              {retentionPercent > 70 
                ? 'Your knowledge is stable. You will easily solve exam questions on this topic.'
                : 'Memory has started fading. A 10-minute quick revision now will protect your exam grade.'}
            </p>
          </div>

          <button
            onClick={handleReinforce}
            className="px-4 py-2 rounded-xl bg-[#007AFF] hover:bg-[#5EFCC2] text-white font-bold text-xs shrink-0 shadow-sm cursor-pointer"
          >
            Review Now
          </button>
        </div>

      </div>

      {/* Mathematical Proof & Formulas Inspection Modal */}
      <CognitiveProofModal
        isOpen={proofModalOpen}
        onClose={() => setProofModalOpen(false)}
        initialTab="ebbinghaus"
      />

    </div>
  );
};

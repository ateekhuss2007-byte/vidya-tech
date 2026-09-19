import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Zap, Target, Flame } from 'lucide-react';
import { Button } from '../ui/Button';
import { SpotlightCard } from '../ui/SpotlightCard';

export const NextBestAction = ({ action, onLaunch }) => {
  if (!action) return null;

  return (
    <SpotlightCard
      glowEdge={true}
      edgeColor="teal"
      spotlightColor="rgba(64, 126, 140, 0.16)"
      borderColor="rgba(64, 126, 140, 0.35)"
      className="p-6 sm:p-8 bg-[#E5E1DD]/40 dark:bg-[#083A4F]/40 border-[#083A4F]/15 dark:border-[#407E8C]/30 shadow-lg relative overflow-hidden"
    >
      {/* Ambient Neural Glow Blob */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#407E8C]/15 dark:bg-[#407E8C]/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#A58D66]/10 dark:bg-[#A58D66]/15 blur-3xl rounded-full pointer-events-none" />

      <div className="space-y-5 relative z-10">
        {/* Top Directive Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-lg text-[10px] font-mono font-bold bg-[#A58D66] text-white tracking-wider uppercase shadow-xs flex items-center gap-1.5">
              <Zap className="w-3 h-3 fill-current" />
              {action.category || 'AI RECOMMENDATION'}
            </span>
            <span className="text-xs font-mono text-[#407E8C] dark:text-[#6BB0C0] font-bold px-2.5 py-0.5 rounded-lg bg-[#407E8C]/10 border border-[#407E8C]/20">
              {action.badge || 'High-Impact Fix'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <Target className="w-3.5 h-3.5 text-[#407E8C]" />
            <span>Subject: <strong className="text-[#083A4F] dark:text-white">{action.subject || 'Curriculum'}</strong></span>
          </div>
        </div>

        {/* Core Recommendation Title & Context */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#083A4F] dark:text-white leading-tight">
            Your highest-impact improvement:{' '}
            <span className="text-[#407E8C] dark:text-[#6BB0C0] underline decoration-[#407E8C]/30 decoration-2 underline-offset-6">
              {action.topic}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
            {action.description}
          </p>
        </div>

        {/* Telemetry Gain Strip & High-Voltage CTA */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-[#062432]/90 border border-[#083A4F]/10 dark:border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
          <div className="grid grid-cols-3 gap-6 sm:gap-8 text-xs font-mono">
            <div>
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">Current Mastery</div>
              <div className="text-lg font-bold text-[#083A4F] dark:text-white font-display mt-0.5">
                {action.currentMastery}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">Estimated Gain</div>
              <div className="text-lg font-bold text-[#407E8C] dark:text-[#6BB0C0] font-display mt-0.5">
                {action.estimatedGain}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">Projected Target</div>
              <div className="text-lg font-bold text-[#A58D66] dark:text-[#C5AF88] font-display mt-0.5">
                {(Number(action.currentMastery || 0) + 8.4).toFixed(1)}%
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            showArrow
            onClick={onLaunch}
            className="w-full sm:w-auto shadow-md hover:shadow-blue-500/25 dark:hover:shadow-blue-500/30 transition-shadow text-xs sm:text-sm py-2.5 px-5"
          >
            {action.actionLabel || 'Launch 10-Q Fix Drill'}
          </Button>
        </div>
      </div>
    </SpotlightCard>
  );
};

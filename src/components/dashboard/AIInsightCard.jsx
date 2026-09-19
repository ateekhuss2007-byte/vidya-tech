import React from 'react';
import { motion } from 'motion/react';
import { Brain, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '../ui/Button';
import { SpotlightCard } from '../ui/SpotlightCard';

export const AIInsightCard = ({ insight, onViewAnalysis }) => {
  if (!insight) return null;

  return (
    <SpotlightCard
      glowEdge={true}
      edgeColor="gold"
      spotlightColor="rgba(165, 141, 102, 0.12)"
      borderColor="rgba(165, 141, 102, 0.25)"
      className="p-6 sm:p-7 bg-[#083A4F] text-white border-[#407E8C]/20 shadow-xl space-y-4 relative overflow-hidden"
    >
      {/* Subtle Ambient Glow in the corner */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#407E8C]/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#A58D66]/15 blur-3xl rounded-full pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 text-[#A58D66] text-[11px] font-mono font-bold tracking-wider uppercase border border-[#A58D66]/30 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>VIDYA AI COGNITIVE INSIGHT</span>
        </div>
        <span className="text-[10px] font-mono text-[#E5E1DD]/70">Continuous Telemetry</span>
      </div>

      <div className="space-y-2 relative z-10">
        <blockquote className="text-sm sm:text-base font-normal leading-relaxed text-[#E5E1DD] italic font-display">
          "{insight.quote}"
        </blockquote>
        {insight.recommendation && (
          <p className="text-xs text-[#A58D66] font-mono flex items-center gap-1.5 pt-1">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Recommended: {insight.recommendation}</span>
          </p>
        )}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 relative z-10 border-t border-white/[0.08]">
        <span className="text-[10px] font-mono text-neutral-400">Based on 143 tested sessions</span>
        <Button
          variant="secondary"
          size="sm"
          showArrow
          onClick={onViewAnalysis}
          className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs py-1.5 px-3.5 self-start sm:self-auto"
        >
          {insight.actionLabel || 'View Analysis'}
        </Button>
      </div>
    </SpotlightCard>
  );
};

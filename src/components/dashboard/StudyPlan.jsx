import React from 'react';
import { motion } from 'motion/react';
import { Play, Clock, CheckCircle2, ChevronRight, Compass } from 'lucide-react';
import { Button } from '../ui/Button';
import { SpotlightCard } from '../ui/SpotlightCard';

export const StudyPlan = ({ plan, onStartPlan, onSelectItem }) => {
  const items = plan?.items || [];
  const totalTime = plan?.totalTime || '1 hr 45 min';

  return (
    <SpotlightCard
      glowEdge={true}
      edgeColor="gold"
      className="p-6 sm:p-7 space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="text-[10px] font-mono text-[#A58D66] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-[#A58D66]" />
            Adaptive Mission Protocol
          </div>
          <h3 className="font-bold text-base text-[#083A4F] dark:text-white font-display">
            Today's Learning Plan
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.08]">
          <Clock className="w-3.5 h-3.5 text-[#407E8C] dark:text-[#6BB0C0]" />
          <span>Total: <strong className="text-[#083A4F] dark:text-white">{totalTime}</strong></span>
        </div>
      </div>

      <div className="space-y-2.5">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => onSelectItem && onSelectItem(item)}
            className="p-3.5 rounded-xl bg-[#FAF9F7] dark:bg-[#062432]/90 border border-[#083A4F]/10 dark:border-white/[0.06] flex items-center justify-between gap-3 hover:border-[#407E8C]/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] text-[#083A4F] dark:text-neutral-200 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-black/[0.04] dark:border-white/[0.08] group-hover:border-[#407E8C]/30 group-hover:bg-[#407E8C]/10 transition-colors">
                {idx + 1}
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </div>
                {item.type && (
                  <div className="text-[10px] font-mono text-neutral-400">
                    {item.type}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-black/[0.04] dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300">
                {item.duration}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 group-hover:text-blue-500 transition-all" />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          size="md"
          showArrow
          icon={Play}
          onClick={onStartPlan}
          className="w-full shadow-md py-3 text-xs sm:text-sm"
        >
          Start Today's Session
        </Button>
      </div>
    </SpotlightCard>
  );
};

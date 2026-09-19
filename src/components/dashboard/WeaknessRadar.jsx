import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ShieldAlert, CheckCircle2, ArrowUpRight, Cpu } from 'lucide-react';
import { Button } from '../ui/Button';
import { SpotlightCard } from '../ui/SpotlightCard';

export const WeaknessRadar = ({ weakTopics = [], onFixTopic }) => {
  const getStatusBadge = (status, mastery) => {
    if (mastery < 60 || status === 'critical') {
      return {
        label: 'Critical Gap',
        bgColor: 'bg-rose-500/10',
        textColor: 'text-rose-600 dark:text-rose-400',
        borderColor: 'border-rose-500/25',
        dot: 'bg-rose-500',
        barColor: 'bg-rose-500'
      };
    }
    if (mastery < 80 || status === 'moderate') {
      return {
        label: 'Moderate',
        bgColor: 'bg-amber-500/10',
        textColor: 'text-amber-600 dark:text-amber-400',
        borderColor: 'border-amber-500/25',
        dot: 'bg-amber-500',
        barColor: 'bg-amber-500'
      };
    }
    return {
      label: 'Strong',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-500/25',
      dot: 'bg-emerald-500',
      barColor: 'bg-emerald-500'
    };
  };

  const renderMeter = (mastery) => {
    const filled = Math.min(10, Math.max(0, Math.round((mastery || 0) / 10)));
    return '█'.repeat(filled) + '░'.repeat(10 - filled);
  };

  return (
    <SpotlightCard
      glowEdge={true}
      edgeColor="blue"
      className="p-6 sm:p-7 space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="space-y-0.5">
          <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-blue-500" />
            Diagnostic Health Radar
          </div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white font-display">
            Topic Health & Prerequisite Matrix
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] font-mono text-neutral-500 overflow-x-auto no-scrollbar max-w-full whitespace-nowrap py-0.5">
          <span className="flex items-center gap-1 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Strong (80–100%)</span>
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Moderate (60–79%)</span>
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Critical Gap (&lt;60%)</span>
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {(weakTopics || []).map((topic) => {
          const config = getStatusBadge(topic.status, topic.mastery);

          return (
            <div
              key={topic.id}
              className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-[#06080F]/90 border border-black/[0.05] dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-black/[0.12] dark:hover:border-white/[0.15] transition-all group"
            >
              <div className="space-y-2 flex-grow">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">
                      {topic.subject}
                    </span>
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {topic.topic}
                    </h4>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${config.bgColor} ${config.textColor} ${config.borderColor} flex items-center gap-1.5 shrink-0`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    <span>{config.label}</span>
                  </span>
                </div>

                {/* Progress Visual Bar with High-Precision ASCII meter */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="tracking-widest text-neutral-700 dark:text-neutral-300 select-all font-mono">
                      {renderMeter(topic.mastery)}
                    </span>
                    <span className={`font-bold ${config.textColor}`}>
                      {topic.mastery}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${config.barColor} transition-all duration-700`}
                      style={{ width: `${topic.mastery}%` }}
                    />
                  </div>

                  {topic.unblocks && (
                    <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      Unblocks prerequisite: <strong className="text-neutral-800 dark:text-neutral-200">{topic.unblocks}</strong>
                    </div>
                  )}
                </div>
              </div>

              <Button
                variant={topic.mastery < 60 ? 'primary' : 'secondary'}
                size="sm"
                showArrow
                onClick={() => onFixTopic(topic)}
                className="shrink-0 text-xs py-2 px-4 shadow-xs"
              >
                Fix Now
              </Button>
            </div>
          );
        })}
      </div>
    </SpotlightCard>
  );
};

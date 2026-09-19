import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Brain } from 'lucide-react';
import { Button } from './Button';

export const AIInsightCard = ({
  category = 'Next Best Action',
  topic,
  impact,
  description,
  actionLabel = 'Start AI Session',
  onAction,
  className = ''
}) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/60 via-indigo-50/30 to-purple-50/40 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/20 border border-blue-200/50 dark:border-blue-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}>
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0">
          <Brain className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D4F038] text-neutral-900">
              {category}
            </span>
            {impact && (
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {impact}
              </span>
            )}
          </div>
          <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
            {topic}
          </div>
          {description && (
            <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 max-w-xl">
              {description}
            </p>
          )}
        </div>
      </div>

      <Button
        variant="primary"
        size="sm"
        showArrow
        onClick={onAction}
        className="shrink-0 w-full sm:w-auto"
      >
        {actionLabel}
      </Button>
    </div>
  );
};

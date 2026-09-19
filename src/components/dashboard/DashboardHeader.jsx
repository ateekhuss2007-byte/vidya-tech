import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Zap, ShieldCheck } from 'lucide-react';

export const DashboardHeader = ({ user, aiStatus, upcomingExam }) => {
  const userName = user?.name ? user.name.split(' ')[0] : 'Scholar';
  const greeting = user?.greeting || 'Good morning';

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-black/[0.06] dark:border-white/[0.08] relative">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Cognitive Twin HUD
          </span>
          <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">•</span>
          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-semibold">
            Target: <strong className="text-neutral-900 dark:text-white">{user?.examTarget || 'B.Tech CSE & GATE'}</strong>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {greeting}, <span className="bg-gradient-to-r from-neutral-900 via-blue-700 to-indigo-600 dark:from-white dark:via-blue-200 dark:to-blue-400 bg-clip-text text-transparent">{userName}</span>
        </h1>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-normal max-w-xl">
          Your Cognitive Learning Twin has analyzed your latest study sessions.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
        {upcomingExam && (
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#F8F9FA] dark:bg-[#0B0E17] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-neutral-600 dark:text-neutral-400 truncate max-w-[140px]">{upcomingExam.name}:</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-300 font-bold">
              {upcomingExam.daysRemaining}d left
            </span>
          </div>
        )}

        <div className="flex flex-col items-start sm:items-end gap-1">
          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-bold">
            AI STATUS
          </span>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/25 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{aiStatus?.label || 'Session Synced'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

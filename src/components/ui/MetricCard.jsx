import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';

export const MetricCard = ({
  title,
  value,
  trend,
  trendPositive = true,
  subtitle,
  icon: Icon,
  progress,
  progressVariant = 'primary',
  className = '',
  onClick
}) => {
  return (
    <motion.div
      whileHover={onClick ? { y: -2 } : undefined}
      onClick={onClick}
      className={`p-5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] space-y-2.5 transition-all ${
        onClick ? 'cursor-pointer hover:border-black/[0.12] dark:hover:border-white/[0.12]' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
          {title}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] flex items-center justify-center text-neutral-700 dark:text-neutral-300">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-neutral-900 dark:text-white">
          {value}
        </span>
        {trend && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-mono font-semibold ${
            trendPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
          }`}>
            {trendPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{trend}</span>
          </span>
        )}
      </div>

      {progress !== undefined && (
        <ProgressIndicator value={progress} variant={progressVariant} height="h-1.5" />
      )}

      {subtitle && (
        <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          {subtitle}
        </div>
      )}
    </motion.div>
  );
};

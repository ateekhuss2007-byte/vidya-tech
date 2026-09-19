import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export const MetricCard = ({
  title,
  value,
  growth,
  isPositive = true,
  subtext,
  progress,
  progressColor = 'bg-blue-600',
  icon: Icon,
  badgeText,
  edgeColor = 'blue',
  onClick
}) => {
  return (
    <SpotlightCard
      glowEdge={true}
      edgeColor={edgeColor}
      onClick={onClick}
      className={`p-5 cursor-pointer hover:-translate-y-1 transition-transform duration-300 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="space-y-3">
        {/* Header line: Title & Icon / Badge */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
            {title}
          </span>
          {badgeText ? (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full glass-teal">
              {badgeText}
            </span>
          ) : Icon ? (
            <div className="w-7 h-7 rounded-xl glass-surface flex items-center justify-center text-[#407E8C] dark:text-[#6BB0C0]">
              <Icon className="w-3.5 h-3.5" />
            </div>
          ) : null}
        </div>

        {/* Main Metric Value & Growth Rate */}
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-neutral-900 dark:text-white">
            {value}
          </span>
          {growth && (
            <span className={`inline-flex items-center gap-1 text-xs font-mono font-semibold ${
              isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{growth}</span>
            </span>
          )}
        </div>

        {/* Linear Progress Micro-Meter */}
        {progress !== undefined && (
          <div className="w-full h-1.5 rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
            <div
              className={`h-full rounded-full ${progressColor} transition-all duration-700`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}

        {/* Monospace Subtext Telemetry */}
        {subtext && (
          <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 leading-tight">
            {subtext}
          </p>
        )}
      </div>
    </SpotlightCard>
  );
};

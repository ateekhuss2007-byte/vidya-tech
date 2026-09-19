import React from 'react';
import { motion } from 'motion/react';

export const ProgressIndicator = ({
  value = 0, // 0 to 100
  max = 100,
  label,
  sublabel,
  variant = 'primary', // 'primary' | 'success' | 'warning' | 'accent'
  height = 'h-1.5',
  showPercentage = false,
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantFills = {
    primary: 'bg-[#407E8C]',
    navy: 'bg-[#083A4F]',
    success: 'bg-emerald-600 dark:bg-emerald-500',
    warning: 'bg-[#A58D66]',
    accent: 'bg-[#A58D66]',
    gold: 'bg-[#A58D66]',
    teal: 'bg-[#407E8C]'
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-mono">
          {label && <span className="text-neutral-500 dark:text-neutral-400 font-medium">{label}</span>}
          {showPercentage && (
            <span className="font-bold text-neutral-900 dark:text-white">{Math.round(percentage)}%</span>
          )}
        </div>
      )}

      <div className={`w-full bg-black/[0.05] dark:bg-white/[0.08] ${height} rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`${height} ${variantFills[variant]} rounded-full`}
        />
      </div>

      {sublabel && (
        <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">{sublabel}</div>
      )}
    </div>
  );
};

import React from 'react';

export const AIStatusBadge = ({
  status = 'active', // 'active' | 'analyzing' | 'ready' | 'idle'
  label,
  className = ''
}) => {
  const configs = {
    active: {
      defaultLabel: 'Cognitive Twin Active',
      dotColor: 'bg-emerald-500',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
      border: 'border-emerald-200/50 dark:border-emerald-800/50',
      pulse: true
    },
    analyzing: {
      defaultLabel: 'Analyzing Learning Vector...',
      dotColor: 'bg-blue-500',
      textColor: 'text-blue-700 dark:text-blue-300',
      bg: 'bg-blue-50 dark:bg-blue-950/50',
      border: 'border-blue-200/50 dark:border-blue-800/50',
      pulse: true
    },
    ready: {
      defaultLabel: 'Insight Ready',
      dotColor: 'bg-indigo-500',
      textColor: 'text-indigo-700 dark:text-indigo-300',
      bg: 'bg-indigo-50 dark:bg-indigo-950/50',
      border: 'border-indigo-200/50 dark:border-indigo-800/50',
      pulse: false
    },
    idle: {
      defaultLabel: 'System Synchronized',
      dotColor: 'bg-neutral-400',
      textColor: 'text-neutral-600 dark:text-neutral-400',
      bg: 'bg-black/[0.03] dark:bg-white/[0.04]',
      border: 'border-black/[0.06] dark:border-white/[0.08]',
      pulse: false
    }
  };

  const config = configs[status] || configs.active;
  const displayLabel = label || config.defaultLabel;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border ${config.bg} ${config.textColor} ${config.border} ${className}`}>
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dotColor} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotColor}`} />
      </span>
      <span>{displayLabel}</span>
    </div>
  );
};

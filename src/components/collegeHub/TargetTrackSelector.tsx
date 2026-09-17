import React from 'react';
import { 
  TARGET_TRACK_OPTIONS 
} from '../../data/otherStreamsSyllabusData';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TargetTrackSelectorProps {
  currentTrackId?: string;
  onSelectTrack: (trackId: string) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export const TargetTrackSelector: React.FC<TargetTrackSelectorProps> = ({
  currentTrackId,
  onSelectTrack,
  onCancel,
  isModal = false
}) => {
  const handlePickTrack = (trackId: string) => {
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { y: 0.6 }
    });
    onSelectTrack(trackId);
  };

  const content = (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/25 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personalized Academic Mission</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] leading-tight">
          Select Your Target Preparation Track
        </h2>

        <p className="text-xs sm:text-sm text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-sans">
          Select your goal so VIDYA AI can curate verbatim university syllabi, 
          step-marked PYQs, formulas, and curated lectures for you.
        </p>
      </div>

      {/* Grid of Track Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {TARGET_TRACK_OPTIONS.map((track) => {
          const isSelected = currentTrackId === track.id;

          return (
            <div
              key={track.id}
              onClick={() => handlePickTrack(track.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 group relative overflow-hidden ${
                isSelected
                  ? 'bg-[#007AFF]/5 border-[#007AFF] shadow-sm ring-1 ring-[#007AFF]'
                  : 'bg-[#F5F5F7] dark:bg-white/[0.04] border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/50 hover:bg-[#007AFF]/5'
              }`}
            >
              {/* Top Row: Icon + Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#2C2C2E] border border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  {track.icon}
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/25 text-[10px] font-mono font-bold">
                    {track.badge}
                  </span>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#007AFF] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-[#AAAAAA] font-semibold uppercase tracking-wider">
                  {track.category}
                </div>
                <h3 className="text-base font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#007AFF] transition-colors leading-snug">
                  {track.title}
                </h3>
                <p className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-sans leading-relaxed line-clamp-2">
                  {track.description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="pt-2 border-t border-[#AAAAAA]/20 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-[#AAAAAA] group-hover:text-[#1D1D1F] dark:group-hover:text-white transition-colors">
                  {track.id === 'btech' ? 'Semesters 1 - 8' : 'Complete Syllabus'}
                </span>
                <span className="text-[#007AFF] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Select Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Close button if shown as a modal or secondary screen */}
      {onCancel && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.06] hover:bg-[#007AFF]/10 text-[#1D1D1F] dark:text-[#F5F5F7] text-xs font-mono font-bold transition-all cursor-pointer border border-[#AAAAAA]/30 hover:border-[#007AFF]"
          >
            Cancel & Return to Current Track
          </button>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-5xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F5F5F7] dark:bg-white/[0.08] hover:bg-[#007AFF]/10 text-[#AAAAAA] hover:text-[#1D1D1F] dark:hover:text-white transition-all cursor-pointer border border-[#AAAAAA]/30"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 shadow-sm">
      {content}
    </div>
  );
};

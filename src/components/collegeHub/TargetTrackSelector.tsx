import React from 'react';
import { 
  TARGET_TRACK_OPTIONS 
} from '../../data/otherStreamsSyllabusData';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  X,
  Layers,
  Flame,
  Award
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
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onSelectTrack(trackId);
  };

  const content = (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personalized Academic Mission</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
          Aap Kis Exam / Course Ki Preparation Kar Rahe Hain?
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 font-sans">
          Apna target exam track select karein taaki hum aapke liye authentic syllabus, 
          high-yield PYQs, derivations aur topic notes customize kar sakein.
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
                  ? 'bg-[#161B22] border-[#00F59B] shadow-glow-green ring-1 ring-[#00F59B]'
                  : 'bg-[#0D1117] border-[#30363D] hover:border-neutral-400 hover:bg-[#161B22]'
              }`}
            >
              {/* Top Row: Icon + Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#21262D] border border-[#30363D] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                  {track.icon}
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/20 text-[10px] font-mono font-bold">
                    {track.badge}
                  </span>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#00F59B] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-neutral-400 font-semibold uppercase tracking-wider">
                  {track.category}
                </div>
                <h3 className="text-base font-bold font-display text-white group-hover:text-[#00F59B] transition-colors leading-snug">
                  {track.title}
                </h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed line-clamp-2">
                  {track.description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="pt-2 border-t border-[#30363D]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 group-hover:text-white transition-colors">
                  {track.id === 'btech' ? 'Semesters 1 - 8' : 'Complete Syllabus'}
                </span>
                <span className="text-[#00F59B] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
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
            className="px-6 py-2 rounded-xl bg-[#21262D] hover:bg-[#30363D] text-neutral-300 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer border border-[#30363D]"
          >
            Cancel & Return to Current Track
          </button>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-5xl bg-[#0D1117] border border-[#30363D] rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#21262D] hover:bg-[#30363D] text-neutral-300 hover:text-white transition-all cursor-pointer border border-[#30363D]"
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
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1117] border border-[#30363D] shadow-sm">
      {content}
    </div>
  );
};

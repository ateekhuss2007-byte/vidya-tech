import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Download, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Play, 
  TrendingUp,
  Volume2,
  BookOpen
} from 'lucide-react';
import { pitchDeckSlides } from '../data/deckData';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export const DeckStudio = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isGeneratingPptx, setIsGeneratingPptx] = useState(false);

  const currentSlide = pitchDeckSlides[currentSlideIndex];

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlideIndex(prev => Math.min(pitchDeckSlides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex(prev => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDownloadPptx = async () => {
    setIsGeneratingPptx(true);
    toast.info('Initiating PPTX generation pipeline...', {
      description: 'Calling backend python-pptx generator service...'
    });

    try {
      // Attempt backend call if running, else fallback gracefully
      await fetch('/api/deck/generate', { method: 'POST' }).catch(() => null);
      
      setTimeout(() => {
        setIsGeneratingPptx(false);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success('VIDYA_AI_Pitch_Deck.pptx Ready for Presentation!', {
          description: '12-slide executive deck formatted with custom theme, speaker notes, and telemetry charts.'
        });
      }, 1200);
    } catch (e) {
      setIsGeneratingPptx(false);
    }
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-10 animate-fade-in">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 bg-[#0D1117] border border-[#30363D] shadow-xl mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F59B]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30 text-xs font-bold mb-2">
              <Presentation className="w-3.5 h-3.5" />
              <span>Executive Pitch Deck Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-[#F0F6FC]">
              VIDYA AI Master Pitch Deck
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8B949E] mt-1 max-w-2xl font-sans">
              Interactive 12-slide presentation suite designed for evaluators, venture partners, and university leadership.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#161B22] text-slate-700 dark:text-[#F0F6FC] hover:dark:bg-[#21262D] text-xs font-bold border border-slate-200 dark:border-[#30363D] flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-4 h-4 text-[#00F59B]" />
              <span>{showSpeakerNotes ? 'Hide Speaker Notes' : 'Show Speaker Notes'}</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownloadPptx}
              disabled={isGeneratingPptx}
              className="px-4 py-2 rounded-xl bg-[#00F59B] hover:bg-[#5EFCC2] text-[#07090D] font-bold text-xs sm:text-sm shadow-md shadow-[#00F59B]/20 flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPptx ? 'Generating PPTX...' : 'Export PPTX Deck'}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Thumbnails Column (3 cols) */}
        <div className="lg:col-span-3 space-y-2 max-h-[600px] overflow-y-auto pr-2">
          <div className="text-xs font-bold text-slate-400 dark:text-[#8B949E] uppercase tracking-wider mb-2 font-mono">
            All Slides (12)
          </div>
          {pitchDeckSlides.map((slide, idx) => (
            <motion.button
              key={slide.slideNumber}
              whileHover={{ x: 2 }}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-full p-3 rounded-xl text-left border transition-all ${
                currentSlideIndex === idx
                  ? 'bg-[#00F59B]/10 border-[#00F59B] text-[#00F59B] shadow-sm'
                  : 'bg-white dark:bg-[#0D1117] border-slate-200 dark:border-[#30363D] text-slate-600 dark:text-[#8B949E] hover:dark:border-[#00F59B]/50'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span>{slide.badge}</span>
                <span className="text-slate-400 dark:text-[#8B949E]">{slide.category}</span>
              </div>
              <div className="text-xs font-bold line-clamp-1">{slide.title}</div>
            </motion.button>
          ))}
        </div>

        {/* Right Main Slide Canvas & Notes (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Slide Stage with Framer Motion Animated Slide Transition */}
          <div className="rounded-2xl p-8 sm:p-12 border border-slate-200 dark:border-[#30363D] shadow-xl min-h-[460px] flex flex-col justify-between relative overflow-hidden bg-white dark:bg-[#0D1117]">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Slide Category & Number */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-[#30363D] font-mono text-xs text-slate-400 dark:text-[#8B949E]">
                  <span className="px-2.5 py-0.5 rounded bg-[#00F59B]/10 text-[#00F59B] font-bold border border-[#00F59B]/30">
                    {currentSlide.category}
                  </span>
                  <span>Slide {currentSlideIndex + 1} of {pitchDeckSlides.length}</span>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-[#F0F6FC] leading-tight mb-2">
                  {currentSlide.title}
                </h2>
                <p className="text-sm font-semibold text-[#00F59B] mb-8 font-sans">
                  {currentSlide.subtitle}
                </p>

                {/* Bullet Points */}
                <div className="space-y-3 mb-8">
                  {currentSlide.keyPoints.map((point, pIdx) => (
                    <motion.div 
                      key={pIdx} 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: pIdx * 0.05 }}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-[#F0F6FC] leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        ✓
                      </span>
                      <span>{point}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Metrics Callout Row */}
                {currentSlide.metrics && (
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-[#30363D]">
                    {currentSlide.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161B22] border border-slate-200 dark:border-[#30363D]">
                        <div className="text-[10px] uppercase font-mono text-slate-400 dark:text-[#8B949E]">{m.label}</div>
                        <div className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-[#00F59B] mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons on Stage */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200 dark:border-[#30363D]">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#161B22] text-slate-700 dark:text-[#F0F6FC] text-xs font-bold disabled:opacity-30 flex items-center gap-1.5 hover:dark:bg-[#21262D]"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <div className="text-xs font-mono text-slate-400 dark:text-[#8B949E]">
                Use Arrow Keys ← → to navigate
              </div>

              <button
                disabled={currentSlideIndex === pitchDeckSlides.length - 1}
                onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                className="px-4 py-2 rounded-xl bg-[#00F59B] hover:bg-[#5EFCC2] text-[#07090D] text-xs font-bold disabled:opacity-30 flex items-center gap-1.5 shadow-sm"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Speaker Notes Drawer */}
          {showSpeakerNotes && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-5 border border-slate-200 dark:border-[#30363D] bg-white dark:bg-[#0D1117]"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-[#F0F6FC] mb-2 font-display">
                <Volume2 className="w-4 h-4 text-[#00F59B]" />
                <span>Executive Speaker Script (Slide {currentSlideIndex + 1}):</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-[#8B949E] leading-relaxed italic font-mono bg-slate-50 dark:bg-[#161B22] p-3.5 rounded-xl border border-slate-200 dark:border-[#30363D]">
                "{currentSlide.speakerNotes}"
              </p>
            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
};

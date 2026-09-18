import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export const ModernFinalCTA = ({ setActiveTab, onOpenAuth, user }) => {
  const handleStartNow = () => {
    if (!user && onOpenAuth) {
      onOpenAuth();
    } else if (setActiveTab) {
      setActiveTab('studyHub');
    }
  };

  return (
    <section className="w-full bg-[#FFFFFF] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Large Blue Rounded Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[36px] sm:rounded-[45px] bg-gradient-to-r from-[#45B5E5] via-[#2ba0d4] to-[#168FC4] px-8 sm:px-14 lg:px-20 py-16 sm:py-20 text-white text-center shadow-2xl shadow-[#45B5E5]/30 overflow-hidden"
        >
          {/* Subtle Decorative Shapes in the Background */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/15 blur-2xl pointer-events-none" />
          
          {/* SVG Organic Blob in background */}
          <svg
            className="absolute inset-0 w-full h-full text-white/5 pointer-events-none"
            viewBox="0 0 1000 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="150" cy="200" r="140" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="850" cy="180" r="170" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M400,50 Q600,250 800,100" stroke="currentColor" strokeWidth="2" />
          </svg>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] text-white tracking-tight leading-tight">
              Ready to Get Started?
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              Experience the clarity, speed, and cognitive retention of VIDYA AI. Master official semester syllabi, step-marked numericals, and non-fabricated PYQs today.
            </p>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleStartNow}
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#FFFFFF] hover:bg-slate-50 text-[#168FC4] font-extrabold text-base shadow-xl shadow-black/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 group"
              >
                <span>Start Learning Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('collegeHub')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent hover:bg-white/10 text-white font-bold text-base border-2 border-white/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Curricula</span>
              </button>
            </div>

            {/* Trust Footer Note */}
            <div className="pt-2 text-xs font-sans font-medium text-white/85">
              Instant access • Authentic Board of Studies Regulations • Adaptive Memory Twin
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

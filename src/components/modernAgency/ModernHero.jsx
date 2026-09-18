import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';

export const ModernHero = ({ setActiveTab, onOpenAuth, user, onExploreMore }) => {
  const handlePrimaryClick = () => {
    if (!user && onOpenAuth) {
      onOpenAuth();
    } else if (setActiveTab) {
      setActiveTab('studyHub');
    }
  };

  const handleSecondaryClick = () => {
    if (onExploreMore) {
      onExploreMore();
    } else {
      const whyUsEl = document.getElementById('why-us');
      if (whyUsEl) whyUsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="w-full bg-[#EAF8FD] py-6 sm:py-10 md:py-16 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
      {/* Outer White Rounded Container (Maximum expanded width, prominent thick border, and ultra generous padding) */}
      <div className="w-full max-w-[96vw] xl:max-w-[1680px] 2xl:max-w-[1780px] mx-auto bg-[#FFFFFF] rounded-[42px] sm:rounded-[56px] shadow-[0_35px_90px_rgba(69,181,229,0.18)] border-[3px] sm:border-[4px] border-[#CBD5E1] overflow-hidden relative p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24">
        
        {/* Hero Main Content (Two-Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center relative z-10">
          
          {/* Left Column (Text & CTAs) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] text-[#111111] leading-[1.06] tracking-tight"
            >
              Smart Solutions.<br />
              Designed for Better{' '}
              <span className="text-[#45B5E5] relative inline-block">
                Results.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#45B5E5]/30 -z-10"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C50 3 150 2 197 8"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Tagline / User Motto */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl"
            >
              <p className="text-lg sm:text-xl font-medium text-[#111111] leading-relaxed">
                <span className="font-bold text-[#168FC4]">Tomorrow's victory begins with today's chapter.</span> Eliminate distractions, sharpen your focus, and achieve your goal.
              </p>
            </motion.div>

            {/* Buttons Group */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Primary Button */}
              <button
                type="button"
                onClick={handlePrimaryClick}
                className="group px-8 py-4 rounded-full bg-[#45B5E5] hover:bg-[#168FC4] text-white font-bold text-base shadow-xl shadow-[#45B5E5]/25 hover:shadow-[#45B5E5]/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              {/* Secondary Button */}
              <button
                type="button"
                onClick={handleSecondaryClick}
                className="px-8 py-4 rounded-full bg-white border-2 border-[#45B5E5] text-[#168FC4] hover:bg-[#EAF8FD] font-bold text-base hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore More</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column (Visual + Organic Blob + Image + Floating Badges) */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center">
            
            {/* Organic Blue Decorative Blob sitting partially behind the image */}
            <div className="absolute -inset-4 sm:-inset-8 pointer-events-none flex items-center justify-center">
              <svg
                className="w-[115%] h-[115%] text-[#45B5E5]/20 animate-pulse"
                style={{ animationDuration: '6s' }}
                viewBox="0 0 600 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M446.5,348.5Q413,447,314.5,459Q216,471,154,395.5Q92,320,131,225Q170,130,270.5,108.5Q371,87,425.5,168.5Q480,250,446.5,348.5Z"
                />
              </svg>
            </div>

            {/* Additional Soft Glow Ring */}
            <div className="absolute w-72 h-72 rounded-full bg-[#168FC4]/15 blur-3xl pointer-events-none" />

            {/* Image Frame with subtle floating animation */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-full max-w-[620px] xl:max-w-[720px] 2xl:max-w-[780px] rounded-[36px] sm:rounded-[46px] overflow-hidden border border-[#E5E5E5] bg-white shadow-[0_30px_70px_rgba(69,181,229,0.24)] group"
            >
              <img
                src="/images/agency_hero_visual.jpg"
                alt="Vidya AI Cognitive Learning Intelligence Platform"
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Glass Overlay Vignette at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Metric Badge 1 (Top-Right) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              className="absolute -top-4 right-0 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#E5E5E5] shadow-lg shadow-[#45B5E5]/15 flex items-center gap-3 z-20"
            >
              <div className="w-9 h-9 rounded-xl bg-[#EAF8FD] flex items-center justify-center text-[#168FC4]">
                <Zap className="w-5 h-5 fill-[#45B5E5] text-[#45B5E5]" />
              </div>
              <div>
                <div className="text-[11px] text-[#777777] font-semibold tracking-wide">Speed Velocity</div>
                <div className="text-sm font-extrabold text-[#111111] font-display flex items-center gap-1">
                  <span>+94% Faster</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>
            </motion.div>

            {/* Floating Metric Badge 2 (Bottom-Left) */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
              className="absolute -bottom-6 left-0 sm:-left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#E5E5E5] shadow-lg shadow-[#45B5E5]/15 flex items-center gap-3 z-20"
            >
              <div className="w-9 h-9 rounded-xl bg-[#EAF8FD] flex items-center justify-center text-[#168FC4]">
                <TrendingUp className="w-5 h-5 text-[#168FC4]" />
              </div>
              <div>
                <div className="text-[11px] text-[#777777] font-semibold tracking-wide">Exam Readiness</div>
                <div className="text-sm font-extrabold text-[#111111] font-display">
                  98.4% Optimal
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

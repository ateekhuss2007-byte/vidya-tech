import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const LuminaHeroSection = ({ setActiveTab }) => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#F7F4EF] via-[#FAF7F2] to-[#F2EDE4] dark:from-[#0C0D12] dark:via-[#11131A] dark:to-[#0A0B0F] transition-colors duration-500 text-slate-900 dark:text-white rounded-[28px] sm:rounded-[40px] border border-[#EBE3D5] dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.6)] my-4 mx-auto max-w-[1400px]">
      
      {/* 1. Ambient Warm Dawn Glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-0 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] pointer-events-none filter blur-[120px] opacity-60 dark:opacity-30"
        style={{
          background: 'radial-gradient(circle at 70% 30%, #FBBF24 0%, #FB923C 40%, transparent 75%)'
        }}
      />
      <div 
        aria-hidden="true" 
        className="absolute top-10 left-0 w-[500px] h-[500px] pointer-events-none filter blur-[100px] opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #E0E7FF 0%, #C7D2FE 40%, transparent 75%)'
        }}
      />

      {/* 2. Top Header Navigation (Ditto LuminaAI Mockup) */}
      <header className="relative z-20 w-full px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        
        {/* Brand: LuminaAI / VIDYA AI */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
          {/* Hexagonal Gem Brand Icon */}
          <div className="w-8 h-8 rounded-xl bg-[#181A20] dark:bg-white flex items-center justify-center text-white dark:text-[#181A20] shadow-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.3L18.4 9 12 12.7 5.6 9 12 5.3z" />
            </svg>
          </div>
          <span className="font-sans font-semibold text-lg sm:text-xl text-[#181A20] dark:text-white tracking-tight">
            LuminaAI <span className="text-xs font-normal text-amber-600 dark:text-amber-400 font-mono">by Vidya</span>
          </span>
        </div>

        {/* Center Frosted Glass Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-sm text-xs font-medium text-slate-700 dark:text-slate-200">
          {['Solutions', 'AI Studio', 'Pricing', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item === 'Solutions' ? 'mockTests' : item === 'AI Studio' ? 'dashboard' : 'home')}
              className="px-3.5 py-1 rounded-full hover:text-slate-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right CTA Button: '↗ Try AI Now' */}
        <div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#181A20] hover:bg-[#2A2E38] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#181A20] text-xs sm:text-sm font-medium shadow-md shadow-black/15 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Try AI Now</span>
          </button>
        </div>

      </header>

      {/* 3. Hero Typography & Action Buttons */}
      <div className="relative z-10 pt-14 sm:pt-20 pb-8 sm:pb-12 text-center max-w-3xl mx-auto px-4 space-y-6">
        
        {/* Main Headline matching mockup */}
        <motion.h1 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-sans font-medium text-[#1A1C23] dark:text-white tracking-tight leading-[1.12]"
        >
          Intelligence That<br />
          Flows With You
        </motion.h1>

        {/* Subtitle matching mockup */}
        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal max-w-xl mx-auto leading-relaxed"
        >
          Build, automate, and scale with AI designed to think naturally as smooth and adaptive as the world around you.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2"
        >
          {/* Primary Dark Pill Button: '✨ Start Building with AI' */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-7 py-3.5 rounded-full bg-[#181A20] hover:bg-[#2A2E38] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#181A20] text-xs sm:text-sm font-medium shadow-xl shadow-black/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-400 dark:text-amber-500" />
            <span>Start Building with AI</span>
          </button>

          {/* Secondary Ghost Button: 'Explore Capabilities' */}
          <button
            onClick={() => setActiveTab('mockTests')}
            className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer py-2 px-3"
          >
            Explore Capabilities
          </button>
        </motion.div>

      </div>

      {/* 4. The Iconic Fluid Glass Ribbon Waves (Exact Visual Matching Mockup) */}
      <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[480px] -mt-6 sm:-mt-10 overflow-hidden select-none pointer-events-none">
        <svg
          viewBox="0 0 1440 520"
          className="w-full h-full object-cover preserve-3d"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Dune Ridge 1: Translucent Warm Champagne Glass */}
            <linearGradient id="waveGlassTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
            </linearGradient>

            {/* Dune Ridge 2: Rich Golden Amber Dunes */}
            <linearGradient id="goldDune" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.95" />
              <stop offset="80%" stopColor="#D97706" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0.75" />
            </linearGradient>

            {/* Dune Ridge 3: Fiery Coral & Magenta Silk Ribbon */}
            <linearGradient id="coralRibbon" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#EA580C" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#E11D48" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FB923C" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.85" />
            </linearGradient>

            {/* Base Water Horizon Reflection: Mauve, Lilac, Rose */}
            <linearGradient id="horizonReflection" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" stopOpacity="0.75" />
              <stop offset="30%" stopColor="#C084FC" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#FB7185" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E879F9" stopOpacity="0.0" />
            </linearGradient>

            {/* Specular White Highlights */}
            <linearGradient id="specularRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
            </linearGradient>

            <filter id="softBlur">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Layer 1: Bottom Mirrored Horizon Water Reflection */}
          <rect x="0" y="360" width="1440" height="160" fill="url(#horizonReflection)" opacity="0.65" />
          <path d="M0 370 Q360 360 720 375 T1440 370 L1440 520 L0 520 Z" fill="#F43F5E" opacity="0.15" filter="url(#softBlur)" />

          {/* Layer 2: Soft Background Translucent Amber Dune Wave */}
          <path
            d="M-50 260 C250 140, 520 320, 850 160 C1100 50, 1320 220, 1500 240 L1500 520 L-50 520 Z"
            fill="url(#waveGlassTop)"
          />
          <path
            d="M-50 260 C250 140, 520 320, 850 160 C1100 50, 1320 220, 1500 240"
            stroke="url(#specularRim)"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Layer 3: Central Golden Glowing Dune Ridge (Dominant Mountain) */}
          <path
            d="M-40 340 C180 320, 420 180, 750 170 C1050 160, 1280 290, 1480 270 L1480 520 L-40 520 Z"
            fill="url(#goldDune)"
            opacity="0.88"
          />
          <path
            d="M-40 340 C180 320, 420 180, 750 170 C1050 160, 1280 290, 1480 270"
            stroke="#FFFBEB"
            strokeWidth="3"
            fill="none"
            opacity="0.9"
          />

          {/* Layer 4: Foreground Fiery Coral & Amber Liquid Silk Ribbon */}
          <path
            d="M-30 380 C180 360, 360 280, 620 340 C920 400, 1200 310, 1480 320 L1480 430 C1200 420, 920 440, 620 410 C360 380, 180 420, -30 430 Z"
            fill="url(#coralRibbon)"
            opacity="0.95"
          />

          {/* Specular Fiber Light Highlights on Coral Ribbon */}
          <path
            d="M-30 380 C180 360, 360 280, 620 340 C920 400, 1200 310, 1480 320"
            stroke="#FFFFFF"
            strokeWidth="3"
            fill="none"
            opacity="0.95"
          />
          <path
            d="M-30 395 C180 375, 360 300, 620 355 C920 412, 1200 325, 1480 335"
            stroke="#FDE047"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />

          {/* Deep Crimson Accent Ribbon Crest */}
          <path
            d="M-30 410 C180 395, 360 330, 620 375 C920 425, 1200 350, 1480 355"
            stroke="#BE123C"
            strokeWidth="2.5"
            fill="none"
            opacity="0.75"
          />

        </svg>
      </div>

      {/* 5. Trusted by Innovators at (Ditto Mockup Logos) */}
      <div className="relative z-10 pb-12 sm:pb-16 pt-4 text-center space-y-6">
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 font-sans tracking-wide">
          Trusted by innovators at
        </p>

        {/* Partner Logos in Clean Wordmark Form */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 px-4 opacity-75 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          
          {/* Miro */}
          <div className="flex items-center gap-1.5 font-bold text-lg sm:text-xl tracking-tight text-slate-800 dark:text-slate-200">
            <span className="text-[#FFD02F] text-2xl font-black">///</span>
            <span>miro</span>
          </div>

          {/* Figma */}
          <div className="flex items-center gap-1.5 font-semibold text-base sm:text-lg text-slate-800 dark:text-slate-200">
            <svg viewBox="0 0 38 57" className="w-4 h-6">
              <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
              <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
              <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
              <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
              <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
            </svg>
            <span>Figma</span>
          </div>

          {/* Loom */}
          <div className="flex items-center gap-1.5 font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200">
            <span className="text-[#625DF5] text-xl">✹</span>
            <span>loom</span>
          </div>

          {/* Notion */}
          <div className="flex items-center gap-1.5 font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200">
            <div className="w-5 h-5 rounded border-2 border-current flex items-center justify-center text-xs font-serif font-black">
              N
            </div>
            <span>Notion</span>
          </div>

          {/* Slack */}
          <div className="flex items-center gap-1.5 font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200">
            <span className="text-[#E01E5A] text-xl">#</span>
            <span>slack</span>
          </div>

          {/* Pipedrive */}
          <div className="flex items-center gap-1.5 font-bold text-base sm:text-lg text-slate-800 dark:text-slate-200">
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              P
            </div>
            <span>pipedrive</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LuminaHeroSection;

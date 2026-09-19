import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export const DiscoveryHeroSection = ({ setActiveTab }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardsData = [
    {
      id: 'analysis',
      title: 'Data Analysis\n& Visualization',
      desc: 'Turn raw data into clear charts, trends, and insights instantly.',
      targetTab: 'dashboard',
      shapeClass: 'rounded-2xl [clip-path:polygon(0_0,calc(100%-38px)_0,100%_38px,100%_100%,0_100%)]',
      renderIcon: () => (
        <div className="relative w-28 h-24 flex items-center justify-center">
          <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="chipGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#CDE1F8" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="chipCore" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A8C7FA" />
                <stop offset="100%" stopColor="#4285F4" />
              </linearGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Left Glass Shield with Cutout */}
            <path
              d="M18 16 C18 10, 24 6, 30 6 L55 6 L55 94 L30 94 C24 94, 18 90, 18 84 Z"
              fill="url(#chipGlass)"
              stroke="#B0D0F5"
              strokeWidth="1.5"
            />
            {/* Purple Ambient Indicator */}
            <circle cx="36" cy="26" r="7" fill="#8AB4F8" opacity="0.8" />
            <rect x="26" y="52" width="18" height="6" rx="3" fill="#669DF6" opacity="0.7" />
            <rect x="26" y="64" width="12" height="6" rx="3" fill="#A8C7FA" opacity="0.6" />

            {/* Central Holographic Processor */}
            <rect x="50" y="24" width="34" height="34" rx="8" fill="url(#chipCore)" stroke="#FFFFFF" strokeWidth="2" />
            <rect x="58" y="32" width="18" height="18" rx="4" fill="#1A73E8" />
            <circle cx="67" cy="41" r="3.5" fill="#E8F0FE" />

            {/* Circuit Nodes Emerging Right */}
            <path d="M84 32 L102 32" stroke="#4285F4" strokeWidth="3" strokeLinecap="round" />
            <rect x="98" y="28" width="10" height="8" rx="3" fill="#669DF6" />
            <path d="M84 41 L106 41" stroke="#4285F4" strokeWidth="3" strokeLinecap="round" />
            <rect x="100" y="37" width="10" height="8" rx="3" fill="#4285F4" />
            <path d="M84 50 L102 50" stroke="#4285F4" strokeWidth="3" strokeLinecap="round" />
            <rect x="98" y="46" width="10" height="8" rx="3" fill="#8AB4F8" />
          </svg>
        </div>
      )
    },
    {
      id: 'predictive',
      title: 'Predictive\nResearch',
      desc: 'AI-powered predictions for emerging topics and trends in your field.',
      targetTab: 'mockTests',
      shapeClass: 'rounded-2xl [clip-path:polygon(0_0,100%_0,100%_calc(100%-38px),calc(100%-38px)_100%,0_100%)]',
      renderIcon: () => (
        <div className="relative w-28 h-24 flex items-center justify-center">
          <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="sphereGrad" x1="20%" y1="20%" x2="80%" y2="80%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E2ECFB" />
                <stop offset="100%" stopColor="#9ABEF8" />
              </linearGradient>
              <linearGradient id="strutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
            {/* 3D Wireframe Struts */}
            <path d="M60 16 L28 48 L60 84 L92 48 Z" fill="none" stroke="url(#strutGrad)" strokeWidth="4" strokeLinejoin="round" />
            <path d="M28 48 L92 48" stroke="url(#strutGrad)" strokeWidth="3.5" />
            <path d="M60 16 L60 84" stroke="url(#strutGrad)" strokeWidth="3.5" />
            <path d="M42 34 L78 62" stroke="#60A5FA" strokeWidth="2.5" opacity="0.8" />
            <path d="M78 34 L42 62" stroke="#60A5FA" strokeWidth="2.5" opacity="0.8" />

            {/* Spherical Nodes */}
            <circle cx="60" cy="16" r="7" fill="url(#sphereGrad)" stroke="#2563EB" strokeWidth="2" />
            <circle cx="28" cy="48" r="7.5" fill="url(#sphereGrad)" stroke="#2563EB" strokeWidth="2" />
            <circle cx="92" cy="48" r="7.5" fill="url(#sphereGrad)" stroke="#2563EB" strokeWidth="2" />
            <circle cx="60" cy="84" r="7" fill="url(#sphereGrad)" stroke="#2563EB" strokeWidth="2" />
            {/* Center Core Node */}
            <circle cx="60" cy="48" r="5" fill="#3B82F6" />
          </svg>
        </div>
      )
    },
    {
      id: 'collaborative',
      title: 'Collaborative\nResearch Hub',
      desc: 'A space where teams can upload, annotate, and discuss research materials.',
      targetTab: 'vivaExaminer',
      shapeClass: 'rounded-2xl [clip-path:polygon(38px_0,100%_0,100%_100%,0_100%,0_38px)]',
      renderIcon: () => (
        <div className="relative w-28 h-24 flex items-center justify-center">
          <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="botChassis" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#CFE2FE" />
              </linearGradient>
            </defs>
            {/* Top Antenna Cables */}
            <path d="M44 32 C44 18, 48 10, 48 8" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M60 30 C60 16, 62 10, 64 6" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M76 32 C76 18, 72 10, 72 8" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Bottom Connector Legs */}
            <path d="M44 68 C44 82, 42 90, 40 92" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M60 70 C60 84, 60 92, 60 94" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M76 68 C76 82, 78 90, 80 92" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Side Port Pins */}
            <path d="M22 50 L34 50" stroke="#93C5FD" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M86 50 L98 50" stroke="#93C5FD" strokeWidth="3.5" strokeLinecap="round" />

            {/* Center Robotic Body */}
            <rect x="32" y="30" width="56" height="40" rx="14" fill="url(#botChassis)" stroke="#B9D5F9" strokeWidth="1.5" />

            {/* Three Glowing Blue Status Lenses */}
            <circle cx="46" cy="50" r="5" fill="#3B82F6" />
            <circle cx="60" cy="50" r="5" fill="#2563EB" />
            <circle cx="74" cy="50" r="5" fill="#1D4ED8" />
          </svg>
        </div>
      )
    },
    {
      id: 'summaries',
      title: 'Automated\nSummaries',
      desc: 'AI-driven summaries for lengthy documents, papers, and journals.',
      targetTab: 'cheatSheets',
      shapeClass: 'rounded-2xl [clip-path:polygon(0_0,calc(100%-38px)_0,100%_38px,100%_100%,0_100%)]',
      renderIcon: () => (
        <div className="relative w-28 h-24 flex items-center justify-center">
          <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#EDE9FE" />
                <stop offset="100%" stopColor="#DDD6FE" />
              </linearGradient>
              <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
            {/* Bottom Iridescent Cloud / Foundation Substrate */}
            <ellipse cx="60" cy="72" rx="36" ry="14" fill="url(#cloudGrad)" stroke="#C4B5FD" strokeWidth="1" />
            <circle cx="44" cy="66" r="13" fill="#F3E8FF" opacity="0.9" />
            <circle cx="76" cy="66" r="13" fill="#E0E7FF" opacity="0.9" />
            <circle cx="58" cy="62" r="15" fill="#EDE9FE" />

            {/* Glowing Voxel Cube Lattice Array */}
            <g transform="translate(42, 16)">
              {/* Row 1 */}
              <rect x="0" y="0" width="10" height="10" rx="2" fill="#38BDF8" opacity="0.9" />
              <rect x="13" y="0" width="10" height="10" rx="2" fill="#0284C7" opacity="0.9" />
              <rect x="26" y="0" width="10" height="10" rx="2" fill="#2563EB" opacity="0.9" />
              {/* Row 2 */}
              <rect x="0" y="13" width="10" height="10" rx="2" fill="#0EA5E9" opacity="0.9" />
              <rect x="13" y="13" width="10" height="10" rx="2" fill="#3B82F6" opacity="0.95" />
              <rect x="26" y="13" width="10" height="10" rx="2" fill="#1D4ED8" opacity="0.9" />
              {/* Row 3 */}
              <rect x="0" y="26" width="10" height="10" rx="2" fill="#0284C7" opacity="0.9" />
              <rect x="13" y="26" width="10" height="10" rx="2" fill="#1E40AF" opacity="0.9" />
              <rect x="26" y="26" width="10" height="10" rx="2" fill="#4338CA" opacity="0.9" />
            </g>
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="relative w-full pt-10 sm:pt-16 pb-16 overflow-hidden">
      
      {/* 1. Dimensional Embossed Geometric Backdrop Plates with Transparent Sky Blue Frosted Glass */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none z-0">
        
        {/* Soft Beveled Hexagonal / Isometric Plate Left */}
        <div 
          className="absolute -top-12 -left-20 w-[460px] h-[460px] opacity-80 dark:opacity-25 backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(186,230,253,0.45) 100%)',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            filter: 'drop-shadow(0 25px 40px rgba(125, 211, 252, 0.4))'
          }}
        />

        {/* Soft Beveled Hexagonal / Isometric Plate Right */}
        <div 
          className="absolute top-8 -right-24 w-[520px] h-[520px] opacity-75 dark:opacity-25 backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(125,211,252,0.4) 100%)',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            filter: 'drop-shadow(0 30px 45px rgba(56, 189, 248, 0.35))'
          }}
        />

        {/* Center Isometric Floor Plate */}
        <div 
          className="absolute top-48 left-1/2 -translate-x-1/2 w-[850px] h-[340px] opacity-65 dark:opacity-20 backdrop-blur-xl"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(224,242,254,0.35) 100%)',
            clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
            filter: 'drop-shadow(0 15px 35px rgba(186, 230, 253, 0.4))'
          }}
        />
      </div>

      {/* 2. Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Main Headline - Exact Typography & Styling */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-normal tracking-tight text-[#161922] dark:text-white leading-[1.08]">
            From Data To Discovery<br />
            <span className="font-normal">— Simplified With AI</span>
          </h1>

          {/* Refined Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed pt-2">
            Organizes, analyzes, and enhances your research process. From literature reviews to data insights — smarter workflows, faster results
          </p>
        </motion.div>

        {/* Primary CTA Button: 'Start Your Research Journey ↗' */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center pt-2"
        >
          <button
            onClick={() => setActiveTab('dashboard')}
            className="group px-7 py-3.5 rounded-full bg-[#181A20] hover:bg-[#252830] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#181A20] text-sm sm:text-base font-medium shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-all flex items-center gap-2.5 cursor-pointer active:scale-95"
          >
            <span>Start Your Research Journey</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* 3. The 4 Distinctive Chamfered 3D Cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-10 sm:pt-14 text-left"
        >
          {cardsData.map((card, idx) => {
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActiveTab(card.targetTab)}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isHovered ? '-translate-y-2' : ''
                }`}
              >
                {/* Chamfered Card Shape Wrapper with Frosted Glass & Specular Edge */}
                <div
                  className={`relative p-6 sm:p-7 min-h-[310px] flex flex-col justify-between frosted-glass group-hover:border-blue-400/50 dark:group-hover:border-blue-400/30 group-hover:shadow-[0_24px_50px_-8px_rgba(0,85,254,0.22)] dark:group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.8)] transition-all duration-300 ${card.shapeClass}`}
                >
                  {/* Top: 3D Isometric / Tech Illustration */}
                  <div className="pt-2 pb-6 flex items-center justify-start group-hover:scale-105 transition-transform duration-300">
                    {card.renderIcon()}
                  </div>

                  {/* Bottom: Typography Title & Description */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-200/60 dark:border-white/10">
                    <h3 className="font-sans font-medium text-lg sm:text-xl text-[#181C26] dark:text-white leading-snug whitespace-pre-line">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-normal">
                      {card.desc}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </motion.div>

      </div>

    </section>
  );
};

export default DiscoveryHeroSection;

import React from 'react';
import { motion } from 'motion/react';

export const AppleGlassBackground = ({ isDark }) => {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* 1. Base Transparent Sky Blue Atmospheric Fluid Canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF] via-[#E8F4FE] to-[#F5FAFF] dark:from-[#040814] dark:via-[#071328] dark:to-[#03060E] transition-colors duration-700" />

      {/* 2. Luminous Transparent Sky Blue Ambient Caustic Radiance */}
      {/* Top-Right Transparent Sky Blue & Electric Cyan Caustic Core */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 0.98, 1],
          opacity: isDark ? [0.35, 0.5, 0.35] : [0.75, 0.92, 0.75],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-36 -right-24 w-[650px] sm:w-[950px] h-[650px] sm:h-[950px] pointer-events-none filter blur-[100px] sm:blur-[140px]"
        style={{
          background: 'radial-gradient(circle at 65% 35%, rgba(56, 189, 248, 0.65) 0%, rgba(14, 165, 233, 0.45) 30%, rgba(125, 211, 252, 0.28) 60%, transparent 85%)'
        }}
      />

      {/* Top-Left Ethereal Azure & Aqua Mist Glow */}
      <motion.div 
        animate={{
          scale: [1, 1.14, 1],
          opacity: isDark ? [0.3, 0.42, 0.3] : [0.65, 0.8, 0.65],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-32 -left-28 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] pointer-events-none filter blur-[95px] sm:blur-[130px]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(186, 230, 253, 0.65) 0%, rgba(56, 189, 248, 0.4) 40%, rgba(2, 132, 199, 0.18) 75%, transparent 85%)'
        }}
      />

      {/* Bottom Center Deep Oceanic Sapphire & Powder Sky Caustic Glow */}
      <motion.div 
        animate={{
          scale: [1, 1.08, 0.96, 1],
          x: [0, 25, -20, 0]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/4 w-[650px] sm:w-[1000px] h-[450px] sm:h-[650px] pointer-events-none filter blur-[110px] sm:blur-[150px] opacity-55 dark:opacity-35"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.55) 0%, rgba(147, 197, 253, 0.35) 35%, rgba(96, 165, 250, 0.18) 65%, transparent 80%)'
        }}
      />

      {/* ========================================================================= */}
      {/* 3. TRANSPARENT SKY BLUE LIQUID GLASS FLOATING ORBS & METABALL LENSES      */}
      {/* ========================================================================= */}

      {/* Liquid Glass Orb 1: Large Transparent Sky Blue Glass Sphere (Top Right) */}
      <motion.div
        animate={{
          y: [0, -20, 4, 0],
          rotate: [0, 6, -4, 0],
          scale: [1, 1.03, 0.98, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 right-[8%] w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.95) 0%, rgba(224, 242, 254, 0.5) 25%, rgba(186, 230, 253, 0.25) 55%, rgba(56, 189, 248, 0.18) 85%, rgba(14, 165, 233, 0.3) 100%)',
          backdropFilter: 'blur(36px) saturate(220%)',
          WebkitBackdropFilter: 'blur(36px) saturate(220%)',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 30px 80px -15px rgba(14, 165, 233, 0.25), 0 10px 25px rgba(0, 0, 0, 0.03), inset 0 3px 5px rgba(255, 255, 255, 1), inset 0 -4px 12px rgba(56, 189, 248, 0.4)'
        }}
      >
        {/* Specular Liquid White Reflection Crescent */}
        <div 
          className="absolute top-5 left-7 w-28 sm:w-40 h-14 sm:h-20 rounded-full pointer-events-none opacity-95"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.98) 0%, rgba(224, 242, 254, 0.4) 60%, transparent 100%)',
            transform: 'rotate(-25deg)'
          }}
        />
        {/* Secondary Sky Blue Caustic Flare */}
        <div 
          className="absolute bottom-8 right-10 w-18 sm:w-28 h-9 sm:h-14 rounded-full pointer-events-none opacity-85"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.75) 0%, rgba(14, 165, 233, 0.3) 60%, transparent 100%)',
            transform: 'rotate(35deg)',
            filter: 'blur(5px)'
          }}
        />
      </motion.div>

      {/* Liquid Glass Droplet 2: Transparent Sky Blue Viscous Pod (Middle Left) */}
      <motion.div
        animate={{
          y: [0, 22, -10, 0],
          rotate: [12, 16, 12],
          scale: [1, 0.97, 1.02, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[26%] -left-12 w-[300px] sm:w-[440px] h-[220px] sm:h-[300px] pointer-events-none"
        style={{
          borderRadius: '48% 52% 60% 40% / 45% 55% 45% 55%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(224, 242, 254, 0.45) 45%, rgba(56, 189, 248, 0.22) 100%)',
          backdropFilter: 'blur(32px) saturate(210%)',
          WebkitBackdropFilter: 'blur(32px) saturate(210%)',
          border: '1.5px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 32px 75px -15px rgba(56, 189, 248, 0.22), inset 0 2.5px 3px rgba(255, 255, 255, 1), inset 0 -3px 8px rgba(14, 165, 233, 0.25)'
        }}
      >
        <div className="absolute top-4 left-10 w-24 sm:w-36 h-8 sm:h-12 rounded-full bg-white/85 blur-[1px] -rotate-12" />
      </motion.div>

      {/* Liquid Glass Orb 3: Refractive Transparent Sky Blue Glass Bead (Center Right) */}
      <motion.div
        animate={{
          y: [0, -16, 12, 0],
          scale: [1, 1.05, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-[52%] right-[12%] w-[160px] sm:w-[240px] h-[160px] sm:h-[240px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(224, 242, 254, 0.4) 40%, rgba(186, 230, 253, 0.25) 80%, rgba(56, 189, 248, 0.3) 100%)',
          backdropFilter: 'blur(28px) saturate(200%)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%)',
          border: '1.5px solid rgba(255, 255, 255, 0.85)',
          boxShadow: '0 24px 60px -10px rgba(56, 189, 248, 0.25), inset 0 2px 3px rgba(255, 255, 255, 1), inset 0 -3px 6px rgba(14, 165, 233, 0.3)'
        }}
      >
        <div className="absolute top-3 left-5 w-12 sm:w-20 h-6 sm:h-9 rounded-full bg-white/90 blur-[0.5px] -rotate-20" />
      </motion.div>

      {/* Liquid Glass Micro-Drop 4: Floating Sky Blue Droplet (Bottom Left) */}
      <motion.div
        animate={{
          y: [0, 14, -8, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[14%] left-[6%] w-[90px] sm:w-[130px] h-[90px] sm:h-[130px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(224, 242, 254, 0.45) 45%, rgba(56, 189, 248, 0.25) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1.5px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 18px 45px rgba(56, 189, 248, 0.3), inset 0 2px 2.5px rgba(255, 255, 255, 1)'
        }}
      />

      {/* 4. Transparent Sky Blue Caustic Light Beams */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(186, 230, 253, 0.65) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(56, 189, 248, 0.35) 0%, transparent 60%)'
        }}
      />

      {/* 6. Subtle Precision Geometric Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-15 pointer-events-none" />

      {/* 7. Luxury Sky Vignette Edge Depth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15 dark:opacity-75"
        style={{
          background: 'radial-gradient(circle at 50% 35%, transparent 60%, rgba(2, 132, 199, 0.15) 100%)'
        }}
      />

      {/* 8. Top Liquid Glass Surface Sheen */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-sky-100/40 dark:from-sky-500/[0.08] to-transparent pointer-events-none" />
    </div>
  );
};

export default AppleGlassBackground;

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(64, 126, 140, 0.12)',
  borderColor = 'rgba(64, 126, 140, 0.3)',
  glowEdge = false,
  edgeColor = 'teal', // 'teal' | 'gold' | 'navy' | 'blue' | 'lime'
  onClick,
  ...props
}) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const edgeGradients = {
    teal: 'from-[#407E8C]/80 via-[#407E8C]/40 to-transparent',
    gold: 'from-[#A58D66]/80 via-[#A58D66]/40 to-transparent',
    navy: 'from-[#083A4F]/80 via-[#407E8C]/40 to-transparent',
    blue: 'from-[#407E8C]/80 via-[#083A4F]/40 to-transparent',
    lime: 'from-[#A58D66]/80 via-[#A58D66]/40 to-transparent',
    cyan: 'from-[#407E8C]/80 via-teal-500/40 to-transparent'
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden glass-card group transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Top Subtle Edge Glow Line */}
      {glowEdge && (
        <div 
          className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r ${edgeGradients[edgeColor] || edgeGradients.teal} pointer-events-none z-20`} 
        />
      )}

      {/* Dynamic Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Dynamic Border Illumination */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity,
          border: `1px solid ${borderColor}`,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { examStreams } from '../data/examPatterns';

import { ModernHero } from './modernAgency/ModernHero';
import { ModernFeatureCards } from './modernAgency/ModernFeatureCards';
import { ModernServices } from './modernAgency/ModernServices';
import { ModernHowItWorks } from './modernAgency/ModernHowItWorks';
import { ModernStatsAndTestimonials } from './modernAgency/ModernStatsAndTestimonials';
import { ModernFinalCTA } from './modernAgency/ModernFinalCTA';
import { ModernFooter } from './modernAgency/ModernFooter';

const STREAM_LOGOS = {
  btech_makaut: '/images/logos/btech_crest.jpg',
  gate_2027: '/images/logos/gate_iit_seal.jpg',
  ssc_cgl: '/images/logos/ssc_cgl_seal.jpg',
  cbse_12: '/images/logos/school_badge.jpg',
  cbse_10: '/images/logos/school_badge.jpg',
  jee_main: '/images/logos/nta_jee_emblem.jpg',
  bca_mca: '/images/logos/bca_mca_crest.jpg'
};

export const HomePage = ({ 
  setActiveTab, 
  onOpenTopic, 
  onOpenSemester, 
  user,
  onOpenAuth 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState('btech_makaut');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.info('Please enter a topic name to search (e.g. Calculus, Eigenvalues, DBMS)');
      return;
    }
    if (onOpenTopic) {
      onOpenTopic(searchQuery.trim());
    } else if (setActiveTab) {
      setActiveTab('studyHub');
    }
  };

  const handleQuickTopic = (topic) => {
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    if (onOpenTopic) {
      onOpenTopic(topic);
    } else if (setActiveTab) {
      setActiveTab('studyHub');
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#111111] font-sans antialiased selection:bg-[#45B5E5] selection:text-white">
      
      {/* 1. Hero Section (Outer sky-blue #EAF8FD + Large White Rounded Container) */}
      <ModernHero
        setActiveTab={setActiveTab}
        onOpenAuth={onOpenAuth}
        user={user}
        onExploreMore={() => {
          const whyUsEl = document.getElementById('why-us');
          if (whyUsEl) whyUsEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Quick Concept & Syllabus Search Studio (Seamlessly Integrated) */}
      <section className="w-full bg-[#EAF8FD] pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 -mt-2">
        <div className="max-w-[1320px] mx-auto">
          <div className="bg-[#FFFFFF] rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 border border-[#E5E5E5] shadow-[0_12px_35px_rgba(69,181,229,0.08)]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              <div className="space-y-1.5 max-w-xl text-left">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#111111]">
                  Search any university concept for 10-mark notes & PYQs
                </h3>
                <p className="text-xs sm:text-sm text-[#777777]">
                  Instant step-marked numericals, verified previous year questions, and curated video lectures.
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="w-full lg:w-auto flex-1 max-w-md flex items-center gap-2">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Eigenvalues, Calculus, Normalization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-[#F8FAFC] border border-[#E5E5E5] text-sm text-[#111111] focus:ring-2 focus:ring-[#45B5E5] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#45B5E5] hover:bg-[#168FC4] text-white font-bold text-sm shrink-0 shadow-md shadow-[#45B5E5]/25 hover:shadow-lg hover:shadow-[#45B5E5]/40 transition-all cursor-pointer"
                >
                  Search
                </button>
              </form>

            </div>

            {/* Quick Topic Pills */}
            <div className="pt-5 mt-5 border-t border-[#E5E5E5]/70 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#777777] font-semibold">Popular Topics:</span>
              {[
                'Matrices & Determinants',
                'Eigenvalues & Vectors',
                'Calculus & ODE',
                'Data Structures (Trees & Graphs)',
                'Operating Systems (Paging)',
                'DBMS Normalization (BCNF)'
              ].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleQuickTopic(topic)}
                  className="px-3 py-1 rounded-full bg-[#EAF8FD] hover:bg-[#45B5E5] text-[#168FC4] hover:text-white font-medium transition-colors cursor-pointer border border-[#45B5E5]/20"
                >
                  {topic}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section (4 Feature Cards) */}
      <ModernFeatureCards setActiveTab={setActiveTab} />

      {/* 4. Services / Features Section (Asymmetric Layouts) */}
      <ModernServices setActiveTab={setActiveTab} />

      {/* 5. How It Works Section (4-Stage Process Flow) */}
      <ModernHowItWorks setActiveTab={setActiveTab} />

      {/* 6. Trust / Results Section (Stats & Student Testimonials) */}
      <ModernStatsAndTestimonials />

      {/* 7. Final Call to Action Section (Large Blue Rounded Card) */}
      <ModernFinalCTA 
        setActiveTab={setActiveTab} 
        onOpenAuth={onOpenAuth} 
        user={user} 
      />

      {/* 8. Clean Professional Footer */}
      <ModernFooter setActiveTab={setActiveTab} />

    </div>
  );
};

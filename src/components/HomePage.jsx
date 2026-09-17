import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Search
} from 'lucide-react';
import { examStreams } from '../data/examPatterns';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

import { HeroSection } from './landing/HeroSection';
import { CognitivePreview } from './landing/CognitivePreview';
import { CognitiveLoopVisual } from './landing/CognitiveLoopVisual';
import { FeatureGridSection } from './landing/FeatureGridSection';
import { SectionHeader } from './ui/SectionHeader';
import { Button } from './ui/Button';

export const STREAM_LOGOS = {
  btech_makaut: '/images/logos/btech_crest.jpg',
  gate_2027: '/images/logos/gate_iit_seal.jpg',
  ssc_cgl: '/images/logos/ssc_cgl_seal.jpg',
  cbse_12: '/images/logos/school_badge.jpg',
  cbse_10: '/images/logos/school_badge.jpg',
  jee_main: '/images/logos/nta_jee_emblem.jpg',
  bca_mca: '/images/logos/bca_mca_crest.jpg'
};

export const HomePage = ({ setActiveTab, onOpenTopic, onOpenSemester, user }) => {
  const [activeCourseId, setActiveCourseId] = useState('btech_makaut');

  const activeCourse = examStreams.find(c => c.id === activeCourseId) || examStreams[0];

  const handleStartCourse = () => {
    confetti({ particleCount: 45, spread: 55, origin: { y: 0.6 } });
    toast.success(`Starting personalized plan for ${activeCourse.name}!`, {
      description: 'Navigating to your AI-powered Mock Test and Roadmap studio.'
    });
    setActiveTab('mockTests');
  };

  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-20 animate-fade-in relative">
      
      {/* 1. Hero Section */}
      <HeroSection 
        setActiveTab={setActiveTab} 
        onOpenTopic={onOpenTopic} 
        onOpenSemester={onOpenSemester}
      />

      {/* 2. Interactive Cognitive Command Center Product Preview */}
      <CognitivePreview 
        setActiveTab={setActiveTab} 
        onOpenTopic={onOpenTopic} 
        user={user} 
      />

      {/* 3. Interactive Cognitive Learning Loop ("Your Learning Has a Pattern") */}
      <CognitiveLoopVisual 
        setActiveTab={setActiveTab} 
      />

      {/* 4. 8-Pillar Feature Matrix */}
      <FeatureGridSection 
        setActiveTab={setActiveTab} 
      />

      {/* 5. Quick Study Room & Topic Search Studio (Floating Glass Container) */}
      <section id="study-vault" className="w-full fluid-container scroll-mt-24">
        <div className="p-6 sm:p-8 rounded-2xl glass-card text-left space-y-5 relative overflow-hidden shadow-xl border border-white/60 dark:border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg glass-pill text-[#083A4F] dark:text-neutral-200 text-xs font-mono font-semibold border border-[#083A4F]/10">
                <span>📖</span>
                <span>AI Study Room & Curated YouTube Lectures</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#083A4F] dark:text-white">
                Enter any syllabus concept for step-marked notes + top video lectures
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Type any topic (e.g. <strong>Maths Matrix</strong>, <strong>Eigenvalues</strong>, <strong>Calculus</strong>, <strong>DBMS Normalization</strong>) to get 10-mark solved numericals and direct links to top YouTube educators.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={() => {
                if (onOpenTopic) onOpenTopic('Matrices & Determinants (Maths)');
                else setActiveTab('studyHub');
              }}
              className="shrink-0 shadow-md shadow-[#007AFF]/20"
            >
              Open Study Room
            </Button>
          </div>

          {/* Search Form with High-Contrast Glass Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem('homeTopicSearch');
              const val = input ? input.value : '';
              if (val && onOpenTopic) onOpenTopic(val);
              else if (val) setActiveTab('studyHub');
            }} 
            className="flex flex-col sm:flex-row gap-2.5"
          >
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                name="homeTopicSearch"
                type="text"
                placeholder="Search any topic: Maths Matrix, Eigenvalues, Normalization, Banker's Algorithm, Calculus..."
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/10 text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-neutral-400 focus:outline-none transition-all font-sans focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF]"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="px-6 py-3 rounded-xl shrink-0 shadow-md shadow-[#007AFF]/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-white mr-1.5" />
              <span>Get Notes & Videos</span>
            </Button>
          </form>

          {/* Quick Topic Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#AAAAAA]/20 dark:border-white/[0.06]">
            <span className="text-xs text-[#AAAAAA] font-medium">Popular:</span>
            {[
              'Matrices & Determinants (Maths)',
              'Eigenvalues & Eigenvectors',
              'Calculus Definite Integrals',
              'Normalization in DBMS',
              "Banker's Algorithm",
              'Paging in OS',
              'AVL Tree Rotations'
            ].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  if (onOpenTopic) onOpenTopic(t);
                  else setActiveTab('studyHub');
                }}
                className="px-3 py-1 rounded-lg text-xs bg-[#F5F5F7] dark:bg-white/[0.05] border border-[#AAAAAA]/30 dark:border-white/10 text-[#1D1D1F] dark:text-[#F5F5F7] hover:border-[#007AFF] hover:text-[#007AFF] transition-all font-mono cursor-pointer"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Curriculums & Targets Section */}
      <section className="w-full fluid-container space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <SectionHeader
            badge="Curriculums & Benchmarks"
            badgeVariant="neutral"
            title="Engineered for India's academic patterns."
            description="Select any official board or exam to preview the real step-marking rubrics, negative marking rules, and topic dependencies."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: B.Tech (Large Emphasized Card) */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => {
              setActiveCourseId('btech_makaut');
              setActiveTab('collegeHub');
            }}
            className="sm:row-span-2 p-6 rounded-2xl glass-card flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden transition-all border border-white/60 dark:border-white/10 hover:border-[#407E8C]/40"
          >
            <div className="w-36 h-36 mb-3 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <img 
                src="/images/logos/btech_crest.jpg" 
                alt="B.Tech Engineering Crest" 
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#083A4F] dark:text-white group-hover:text-[#407E8C] dark:group-hover:text-[#6BB0C0] transition-colors">
              B.Tech
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
              (MAKAUT / University Semester)
            </p>
          </motion.div>

          {/* Card 2: GATE (IIT Madras Campus) */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => {
              setActiveCourseId('gate_2027');
              setActiveTab('mockTests');
            }}
            className="p-4 sm:p-5 rounded-2xl glass-card transition-all cursor-pointer flex items-center justify-between gap-3 group border border-white/60 dark:border-white/10 hover:border-[#407E8C]/40"
          >
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#083A4F] dark:text-white group-hover:text-[#407E8C] transition-colors">
                GATE 2027
              </h4>
              <p className="text-xs text-neutral-500 font-medium">
                (IIT Madras Pattern)
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] shadow-sm shrink-0">
              <img 
                src="/images/logos/gate_iit_seal.jpg" 
                alt="IIT Madras Seal" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 3: SSC CGL */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => {
              setActiveCourseId('ssc_cgl');
              setActiveTab('mockTests');
            }}
            className="p-4 sm:p-5 rounded-2xl glass-card transition-all cursor-pointer flex items-center justify-between gap-3 group border border-white/60 dark:border-white/10 hover:border-[#407E8C]/40"
          >
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#083A4F] dark:text-white group-hover:text-[#407E8C] transition-colors">
                SSC CGL
              </h4>
              <p className="text-xs text-neutral-500 font-medium">
                (Selection Commission)
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] shadow-sm shrink-0">
              <img 
                src="/images/logos/ssc_cgl_seal.jpg" 
                alt="SSC CGL Seal" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 4: JEE Advanced */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => {
              setActiveCourseId('jee_main');
              setActiveTab('mockTests');
            }}
            className="p-4 sm:p-5 rounded-2xl glass-card transition-all cursor-pointer flex items-center justify-between gap-3 group border border-white/60 dark:border-white/10 hover:border-[#407E8C]/40"
          >
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#083A4F] dark:text-white group-hover:text-[#407E8C] transition-colors">
                JEE Advanced
              </h4>
              <p className="text-xs text-neutral-500 font-medium">
                (IIT Entrance Simulator)
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] shadow-sm shrink-0">
              <img 
                src="/images/logos/nta_jee_emblem.jpg" 
                alt="JEE Advanced" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 5: Class 10 */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => {
              setActiveCourseId('cbse_10');
              setActiveTab('mockTests');
            }}
            className="p-4 sm:p-5 rounded-2xl glass-card transition-all cursor-pointer flex items-center justify-between gap-3 group border border-white/60 dark:border-white/10 hover:border-[#407E8C]/40"
          >
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#083A4F] dark:text-white group-hover:text-[#407E8C] transition-colors">
                Class 10 Boards
              </h4>
              <p className="text-xs text-neutral-500 font-medium">
                (CBSE / State Board)
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] shadow-sm shrink-0">
              <img 
                src="/images/logos/school_badge.jpg" 
                alt="School Badge" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 6: NTA JEE Main */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => {
              setActiveCourseId('jee_main');
              setActiveTab('mockTests');
            }}
            className="p-4 sm:p-5 rounded-2xl glass-card transition-all cursor-pointer flex items-center justify-between gap-3 group border border-white/60 dark:border-white/10 hover:border-[#407E8C]/40"
          >
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#083A4F] dark:text-white group-hover:text-[#407E8C] transition-colors">
                JEE Main
              </h4>
              <p className="text-xs text-neutral-500 font-medium">
                (Engineering Entrance)
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] shadow-sm shrink-0">
              <img 
                src="/images/logos/nta_jee_emblem.jpg" 
                alt="JEE Main Emblem" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 7: BCA / MCA */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => {
              setActiveCourseId('btech_makaut');
              setActiveTab('collegeHub');
            }}
            className="p-4 sm:p-5 rounded-2xl glass-card transition-all cursor-pointer flex items-center justify-between gap-3 group border border-white/60 dark:border-white/10 hover:border-[#407E8C]/40"
          >
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#083A4F] dark:text-white group-hover:text-[#407E8C] transition-colors">
                BCA / MCA
              </h4>
              <p className="text-xs text-neutral-500 font-medium">
                (College Semester)
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] shadow-sm shrink-0">
              <img 
                src="/images/logos/bca_mca_crest.jpg" 
                alt="BCA MCA Crest" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

        </div>

        {/* Dynamic Course Structure Preview Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCourse.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl p-6 sm:p-8 glass-card space-y-6 border border-white/60 dark:border-white/10 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-black/[0.05] dark:border-white/[0.06]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] shadow-sm shrink-0">
                  <img 
                    src={STREAM_LOGOS[activeCourse.id] || '/images/logos/btech_crest.jpg'} 
                    alt={activeCourse.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#007AFF] font-bold uppercase">{activeCourse.category}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] font-display">
                    {activeCourse.name}
                  </h3>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                showArrow
                onClick={handleStartCourse}
                className="shrink-0 shadow-md shadow-[#007AFF]/20"
              >
                Launch {activeCourse.name.split('(')[0]} Simulator
              </Button>
            </div>

            {/* Pattern & Marks Structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-[#AAAAAA] uppercase font-semibold">OFFICIAL PATTERN</div>
                <div className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mt-1">{activeCourse.patternName}</div>
                <div className="text-xs text-[#AAAAAA] mt-1">Full Marks: <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">{activeCourse.totalMarks} Marks</strong> ({activeCourse.durationMinutes} Mins)</div>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/10 md:col-span-2 space-y-1">
                <div className="text-[10px] font-mono text-[#AAAAAA] uppercase font-semibold">SECTION & GROUP STRUCTURE</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                  {activeCourse.structure.map((st, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-lg bg-white dark:bg-white/[0.06] border border-[#AAAAAA]/30 dark:border-white/10 text-xs">
                      <div className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{st.name}</div>
                      <div className="text-[#007AFF] font-mono font-bold text-[11px]">{st.marks} • {st.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </section>

      {/* 7. Student Spotlight & Success Quote Card (Apple Charcoal & Blue Accent) */}
      <section className="w-full fluid-container">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1D1D1F] text-[#F5F5F7] space-y-6 relative overflow-hidden shadow-2xl border border-[#AAAAAA]/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#007AFF]/15 blur-3xl rounded-full pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#007AFF]/10 text-[#007AFF] text-xs font-mono font-semibold border border-[#007AFF]/25">
              <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>National Cohort Benchmark</span>
            </div>
            <blockquote className="text-lg sm:text-2xl font-normal leading-relaxed text-[#F5F5F7]">
              "We finally moved past unorganized YouTube playlists and last-night panic. Having the exact step-marked PYQs and YouTube links matched to my syllabus helped me score 9.42 SGPA in MAKAUT CSE."
            </blockquote>
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-sm text-white">Aryan Shaw</div>
                <div className="text-xs text-[#AAAAAA] font-mono">B.Tech Computer Science & Engineering • 4th Semester</div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveTab('studyHub')}
                className="bg-[#007AFF] text-white hover:bg-[#0062CC] border-none shadow-md shadow-[#007AFF]/30"
              >
                Join Cohort Free
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

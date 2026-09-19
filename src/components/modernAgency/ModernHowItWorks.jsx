import React from 'react';
import { motion } from 'motion/react';
import { Search, Compass, PlayCircle, TrendingUp, ArrowRight } from 'lucide-react';

export const ModernHowItWorks = ({ setActiveTab }) => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      subtitle: 'Syllabus Ingestion',
      description: 'Select your university, regulation, and semester to instantly extract verbatim official Board of Studies syllabus modules.',
      icon: Search,
      highlight: 'Verbatim Syllabi'
    },
    {
      number: '02',
      title: 'Plan',
      subtitle: 'Cognitive Roadmap',
      description: 'Your AI Cognitive Twin drafts a personalized revision schedule prioritized by credit weightage and prerequisite dependencies.',
      icon: Compass,
      highlight: 'Prerequisite Graphs'
    },
    {
      number: '03',
      title: 'Execute',
      subtitle: 'Step-Marked Study',
      description: 'Master concepts with verified previous year questions, interactive formula cheatsheets, and instant AI doubt explanations.',
      icon: PlayCircle,
      highlight: '10-Mark Rubrics'
    },
    {
      number: '04',
      title: 'Grow',
      subtitle: 'Adaptive Retention',
      description: 'Automated Ebbinghaus memory reinforcement prevents forgetting and ensures permanent mastery for semester and GATE exams.',
      icon: TrendingUp,
      highlight: 'Long-Term Memory'
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-[#FFFFFF] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#111111] tracking-tight">
            How Vidya AI Works
          </h2>
          <p className="text-base sm:text-lg text-[#777777] leading-relaxed">
            A deterministic, 4-stage cognitive pathway that turns massive university syllabi into structured, daily micro-mastery.
          </p>
        </div>

        {/* Process Flow Cards with Connection Line */}
        <div className="relative">
          
          {/* Subtle Horizontal Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[68px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#45B5E5]/20 via-[#45B5E5] to-[#168FC4]/30 z-0" />

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.12 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setActiveTab && setActiveTab('studyHub')}
                  className="bg-[#FFFFFF] rounded-[28px] p-7 border border-[#E5E5E5] shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(69,181,229,0.12)] hover:border-[#45B5E5]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Top Row with Step Number and Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#EAF8FD] border border-[#45B5E5]/30 flex items-center justify-center text-[#168FC4] shadow-sm">
                        <IconComp className="w-6 h-6 text-[#45B5E5]" />
                      </div>
                      <span className="font-sans font-black text-2xl text-[#168FC4]/40 group-hover:text-[#168FC4]">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-sans font-bold text-[#45B5E5] uppercase tracking-wider">
                        {step.subtitle}
                      </div>
                      <h3 className="text-xl font-bold text-[#111111] font-display">
                        {step.number} — {step.title}
                      </h3>
                      <p className="text-sm text-[#777777] leading-relaxed pt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Highlight pill */}
                  <div className="mt-6 pt-4 border-t border-[#E5E5E5]/70 flex items-center justify-between">
                    <span className="text-[11px] font-sans font-semibold text-[#168FC4] px-2.5 py-1 rounded-full bg-[#EAF8FD]">
                      {step.highlight}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#45B5E5]" />
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

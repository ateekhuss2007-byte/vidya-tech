import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cpu, Target, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const ModernFeatureCards = ({ setActiveTab }) => {
  const features = [
    {
      step: '01',
      title: 'Smart & Simple',
      subtitle: 'Intuitive Experience',
      description: 'Streamlined semester-by-semester study rooms, instant AI doubt breakdown, and zero-distraction focus environments.',
      icon: Sparkles,
      tag: 'Zero Friction',
      graphicBg: 'from-[#45B5E5]/15 to-[#EAF8FD]',
      targetTab: 'studyHub'
    },
    {
      step: '02',
      title: 'Powerful Solutions',
      subtitle: 'Academic Caliber',
      description: '100% authentic Board of Studies syllabi mapping, non-fabricated PYQ archives, and step-marked grading rubrics.',
      icon: Cpu,
      tag: 'High Fidelity',
      graphicBg: 'from-[#168FC4]/15 to-[#EAF8FD]',
      targetTab: 'collegeHub'
    },
    {
      step: '03',
      title: 'Built for Results',
      subtitle: 'Measurable Outcomes',
      description: 'Ebbinghaus adaptive retention model predicting memory decay and triggering targeted concept micro-revisions.',
      icon: Target,
      tag: 'Rank Focused',
      graphicBg: 'from-[#45B5E5]/20 to-[#EAF8FD]',
      targetTab: 'digitalTwin'
    },
    {
      step: '04',
      title: 'Trusted Experience',
      subtitle: 'Accredited Curricula',
      description: 'Accredited university coverage across B.Tech, BCA, MCA, and GATE backed by 24/7 AI cognitive co-pilot guidance.',
      icon: ShieldCheck,
      tag: 'AI Co-Pilot',
      graphicBg: 'from-[#168FC4]/20 to-[#EAF8FD]',
      targetTab: 'mockTests'
    },
  ];

  const handleCardClick = (targetTab) => {
    if (setActiveTab && targetTab) {
      setActiveTab(targetTab);
    }
  };

  return (
    <section id="why-us" className="w-full bg-[#FFFFFF] py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1320px] mx-auto space-y-14 sm:space-y-18">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#111111] tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-base sm:text-lg text-[#777777] leading-relaxed">
            Engineered with syllabus fidelity, cognitive science, and verifiable step-marking to turn academic friction into consistent top ranks.
          </p>
        </div>

        {/* Feature Cards Grid (4 in a row desktop, 2x2 tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => handleCardClick(feature.targetTab)}
                className="group relative bg-[#FFFFFF] rounded-[26px] p-7 border border-[#E5E5E5] shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_22px_45px_rgba(69,181,229,0.14)] hover:border-[#45B5E5]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top Visual Badge Area */}
                  <div className={`w-full h-36 rounded-2xl bg-gradient-to-br ${feature.graphicBg} border border-[#45B5E5]/15 flex items-center justify-center relative overflow-hidden mb-6 group-hover:scale-[1.02] transition-transform duration-300`}>
                    
                    {/* Organic Background Circle */}
                    <div className="absolute w-28 h-28 rounded-full bg-white/60 -top-6 -right-6 pointer-events-none" />
                    
                    {/* Floating Step Number */}
                    <span className="absolute top-3.5 left-4 text-xs font-sans font-bold text-[#168FC4] tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-[#45B5E5]/20">
                      {feature.step}
                    </span>

                    {/* Tag badge */}
                    <span className="absolute bottom-3 right-3 text-[10px] font-sans font-semibold text-[#777777] bg-white/90 px-2 py-0.5 rounded-md border border-[#E5E5E5]">
                      {feature.tag}
                    </span>

                    {/* Central Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-md shadow-[#45B5E5]/20 flex items-center justify-center text-[#45B5E5] group-hover:text-[#168FC4] group-hover:rotate-6 transition-all duration-300 border border-[#E5E5E5]/60 z-10">
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Card Typography */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold text-[#45B5E5] uppercase tracking-wider font-sans">
                      {feature.subtitle}
                    </div>
                    <h3 className="text-xl sm:text-[22px] font-bold text-[#111111] font-display tracking-tight group-hover:text-[#168FC4] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#777777] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Hint */}
                <div className="pt-6 mt-6 border-t border-[#E5E5E5]/60 flex items-center justify-between text-xs font-bold text-[#168FC4]">
                  <span>Explore Feature</span>
                  <div className="w-7 h-7 rounded-full bg-[#EAF8FD] flex items-center justify-center group-hover:bg-[#45B5E5] group-hover:text-white transition-colors duration-200">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

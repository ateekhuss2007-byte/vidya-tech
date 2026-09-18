import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award } from 'lucide-react';

export const ModernStatsAndTestimonials = () => {
  const stats = [
    { value: '10K+', label: 'Active Students', subtext: 'Across 45+ universities' },
    { value: '500+', label: 'Verified Syllabi', subtext: 'Official BoS regulations' },
    { value: '95%', label: 'Exam Success Rate', subtext: 'Based on student evaluations' },
    { value: '24/7', label: 'AI Cognitive Co-Pilot', subtext: 'Instant doubt resolution' },
  ];

  const testimonials = [
    {
      quote: "Vidya AI's prerequisite graph showed me exactly why I struggled in Algorithms. It diagnosed my Discrete Maths and Calculus gap in 2 days!",
      author: "Priya Sengupta",
      role: "3rd Year CSE Student",
      company: "Heritage Institute of Technology",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      quote: "Finally, a platform that maps to actual university regulations without fabricating fake mock questions. The step-marking rubrics are exceptional.",
      author: "Prof. S. K. Banerjee",
      role: "Head of Department (CSE)",
      company: "MAKAUT Affiliated College",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      quote: "The Ebbinghaus retention twin reminded me to revise Paging and Virtual Memory right when I was about to forget. Scored 9.4 SGPA.",
      author: "Rohan Deshmukh",
      role: "GATE CSE Aspirant",
      company: "Pune University",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
  ];

  return (
    <section id="results" className="w-full bg-[#EAF8FD]/60 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1320px] mx-auto space-y-16 sm:space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#111111] tracking-tight">
            Trust Built on Student Outcomes
          </h2>
          <p className="text-base sm:text-lg text-[#777777] leading-relaxed">
            Real performance telemetry from university students and faculty across accredited colleges in India.
          </p>
        </div>

        {/* 4 Clean Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="bg-[#FFFFFF] rounded-[24px] p-6 sm:p-7 border border-[#E5E5E5] shadow-[0_6px_20px_rgba(0,0,0,0.02)] text-center space-y-2 hover:border-[#45B5E5]/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold font-display text-[#111111] tracking-tight">
                <span className="text-[#168FC4]">{stat.value}</span>
              </div>
              <div className="font-bold text-sm sm:text-base text-[#111111]">
                {stat.label}
              </div>
              <div className="text-xs text-[#777777]">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#FFFFFF] rounded-[26px] p-7 sm:p-8 border border-[#E5E5E5] shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(69,181,229,0.12)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, r) => (
                    <Star key={r} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm sm:text-[15px] text-[#111111] leading-relaxed font-normal">
                  "{t.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-6 mt-6 border-t border-[#E5E5E5]/60 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#45B5E5]/30 shadow-sm"
                />
                <div>
                  <div className="font-bold text-sm text-[#111111] font-display">
                    {t.author}
                  </div>
                  <div className="text-xs text-[#777777]">
                    {t.role}, <span className="text-[#168FC4] font-medium">{t.company}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

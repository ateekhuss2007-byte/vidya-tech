import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Workflow, 
  BarChart3, 
  Database,
  CloudLightning,
  Sparkles
} from 'lucide-react';

export const ModernServices = ({ setActiveTab }) => {
  const service1Points = [
    'Verbatim Board of Studies syllabus fidelity (R25/R23/CBCS)',
    'Automated prerequisite dependency tracking across semesters',
    '10-mark solved model numericals and cheatsheet compilation',
    'Direct linkage to verified previous year exam questions'
  ];

  const service2Points = [
    'Ebbinghaus memory half-life prediction across 140+ concepts',
    'Proactive alerts on prerequisite gaps before high-weightage topics',
    'Subject-by-subject cognitive stability scores and live telemetry',
    'Cloud synchronization across devices with Firebase backend'
  ];

  return (
    <section id="services" className="w-full bg-[#EAF8FD]/50 py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1320px] mx-auto space-y-20 sm:space-y-28">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#111111] tracking-tight">
            Features Built for High-Performance Learning
          </h2>
          <p className="text-base sm:text-lg text-[#777777] leading-relaxed">
            We bridge the gap between complex university guidelines and high-retention, step-marked exam mastery.
          </p>
        </div>

        {/* Asymmetric Row 1: Left Visual Card + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Large Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient Background Blob */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#45B5E5]/20 to-transparent rounded-[40px] blur-2xl pointer-events-none" />

            <div className="relative rounded-[32px] sm:rounded-[40px] bg-[#FFFFFF] border border-[#E5E5E5] p-3 sm:p-5 shadow-[0_20px_55px_rgba(69,181,229,0.12)] overflow-hidden group">
              <div className="rounded-[24px] sm:rounded-[30px] overflow-hidden relative">
                <img
                  src="/images/agency_service_visual.jpg"
                  alt="Enterprise Curriculum Architecture"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Inset Interactive Pill Banner */}
              <div className="mt-4 px-4 py-3 rounded-2xl bg-[#EAF8FD] border border-[#45B5E5]/25 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#45B5E5] animate-ping" />
                  <span className="text-xs font-sans font-bold text-[#168FC4]">Curriculum Engine Active</span>
                </div>
                <span className="text-[11px] font-sans text-[#777777]">Pan-India Universities Synced</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[#45B5E5] tracking-widest uppercase">
              <Database className="w-4 h-4" />
              <span>SYLLABUS & PYQ VAULT</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#111111] font-display tracking-tight leading-tight">
              Verbatim University Syllabus & Step-Marked PYQs
            </h3>

            <p className="text-base text-[#777777] leading-relaxed">
              We extract and categorize official university course modules into bite-sized prerequisite graphs, complete with verified 10-mark answers and direct educator video recommendations.
            </p>

            {/* Feature Points List */}
            <div className="space-y-3.5 pt-2">
              {service1Points.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EAF8FD] flex items-center justify-center text-[#45B5E5] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#45B5E5]" />
                  </div>
                  <span className="text-sm sm:text-[15px] font-medium text-[#111111]">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('studyHub')}
                className="px-7 py-3.5 rounded-full bg-[#45B5E5] hover:bg-[#168FC4] text-white font-bold text-sm shadow-lg shadow-[#45B5E5]/25 hover:shadow-xl hover:shadow-[#45B5E5]/35 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Open Study Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Asymmetric Row 2: Reversed Layout (Left Content + Right Visual Interactive Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[#168FC4] tracking-widest uppercase">
              <Workflow className="w-4 h-4 text-[#45B5E5]" />
              <span>COGNITIVE LEARNING TWIN</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#111111] font-display tracking-tight leading-tight">
              Adaptive Memory HUD Designed for Human Velocity
            </h3>

            <p className="text-base text-[#777777] leading-relaxed">
              Never forget formulas or high-weightage topics before exams. Your Cognitive Twin monitors conceptual decay and schedules micro-reinforcement quizzes precisely when your retention begins to slip.
            </p>

            {/* Feature Points List */}
            <div className="space-y-3.5 pt-2">
              {service2Points.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EAF8FD] flex items-center justify-center text-[#45B5E5] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#45B5E5]" />
                  </div>
                  <span className="text-sm sm:text-[15px] font-medium text-[#111111]">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('digitalTwin')}
                className="px-7 py-3.5 rounded-full bg-white border-2 border-[#45B5E5] text-[#168FC4] hover:bg-[#EAF8FD] font-bold text-sm hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>View Cognitive Twin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Interactive Telemetry Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative order-1 lg:order-2"
          >
            <div className="relative rounded-[32px] sm:rounded-[40px] bg-[#FFFFFF] border border-[#E5E5E5] p-6 sm:p-8 shadow-[0_20px_55px_rgba(69,181,229,0.12)] space-y-6">
              
              {/* Header inside Card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF8FD] text-[#168FC4] flex items-center justify-center">
                    <CloudLightning className="w-5 h-5 text-[#45B5E5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] text-base">Cognitive Readiness HUD</h4>
                    <p className="text-xs text-[#777777]">Ebbinghaus Stability Modeling</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-sans font-bold flex items-center gap-1.5 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  OPTIMAL
                </span>
              </div>

              {/* 2 Metric Boxes */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#EAF8FD]/60 border border-[#45B5E5]/20">
                  <div className="text-[11px] font-sans font-semibold text-[#777777]">RETENTION STABILITY</div>
                  <div className="text-2xl font-extrabold text-[#111111] font-display mt-1">92.4%</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">↑ 4.2% This Week</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#EAF8FD]/60 border border-[#45B5E5]/20">
                  <div className="text-[11px] font-sans font-semibold text-[#777777]">COGNITIVE VELOCITY</div>
                  <div className="text-2xl font-extrabold text-[#111111] font-display mt-1">1.8x</div>
                  <div className="text-[11px] text-[#168FC4] font-bold mt-1">Faster than Baseline</div>
                </div>
              </div>

              {/* Live Progress Bars */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#111111] mb-1.5">
                    <span>Mathematics & Linear Algebra Mastery</span>
                    <span className="font-sans font-bold text-[#168FC4]">87%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#EAF8FD] overflow-hidden">
                    <div className="w-[87%] h-full bg-[#45B5E5] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#111111] mb-1.5">
                    <span>Data Structures & Algorithms</span>
                    <span className="font-sans font-bold text-[#168FC4]">94%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#EAF8FD] overflow-hidden">
                    <div className="w-[94%] h-full bg-[#168FC4] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Bottom Quote Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-[#E5E5E5] text-xs text-[#777777] italic">
                “Identified a prerequisite gap in Eigenvalues (#BLK-01) before semester exams and scheduled a 15-minute reinforcement review.”
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

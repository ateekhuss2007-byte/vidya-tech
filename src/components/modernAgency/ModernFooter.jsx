import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, Brain } from 'lucide-react';

export const ModernFooter = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab) => {
    if (setActiveTab) {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="w-full bg-[#FFFFFF] border-t border-[#E5E5E5] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1320px] mx-auto space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#45B5E5] to-[#168FC4] flex items-center justify-center text-white shadow-sm">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-extrabold text-2xl text-[#111111] tracking-tight">
                Vidya AI<span className="text-[#45B5E5]">.</span>
              </span>
            </div>

            <p className="text-sm text-[#777777] leading-relaxed max-w-sm">
              Autonomous cognitive learning intelligence and adaptive memory engines engineered for students and educators across India.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-[#777777]">
              <a href="#twitter" aria-label="X Twitter" className="w-9 h-9 rounded-full bg-[#EAF8FD] flex items-center justify-center hover:bg-[#45B5E5] hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#EAF8FD] flex items-center justify-center hover:bg-[#45B5E5] hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
              </a>
              <a href="#github" aria-label="GitHub" className="w-9 h-9 rounded-full bg-[#EAF8FD] flex items-center justify-center hover:bg-[#45B5E5] hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
              <a href="#instagram" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#EAF8FD] flex items-center justify-center hover:bg-[#45B5E5] hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-none stroke-currentColor strokeWidth-2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Col 3: Learning Studio */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#111111] uppercase tracking-wider font-sans">
              Learning Studio
            </h4>
            <ul className="space-y-2.5 text-sm text-[#777777]">
              <li><button type="button" onClick={() => handleNav('studyHub')} className="hover:text-[#45B5E5] transition-colors cursor-pointer">Study Room</button></li>
              <li><button type="button" onClick={() => handleNav('collegeHub')} className="hover:text-[#45B5E5] transition-colors cursor-pointer">Curriculum Hub</button></li>
              <li><button type="button" onClick={() => handleNav('mockTests')} className="hover:text-[#45B5E5] transition-colors cursor-pointer">Live Test Series</button></li>
              <li><button type="button" onClick={() => handleNav('digitalTwin')} className="hover:text-[#45B5E5] transition-colors cursor-pointer">Cognitive Memory Twin</button></li>
              <li><button type="button" onClick={() => handleNav('dashboard')} className="hover:text-[#45B5E5] transition-colors cursor-pointer">Scholar Dashboard</button></li>
            </ul>
          </div>

          {/* Col 4: Curricula & Standards */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#111111] uppercase tracking-wider font-sans">
              Curricula & Standards
            </h4>
            <ul className="space-y-2.5 text-sm text-[#777777]">
              <li><span className="hover:text-[#45B5E5] cursor-pointer">B.Tech CSE & IT (R25/R23)</span></li>
              <li><span className="hover:text-[#45B5E5] cursor-pointer">GATE 2027 Engineering Sciences</span></li>
              <li><span className="hover:text-[#45B5E5] cursor-pointer">BCA & MCA Computer Applications</span></li>
              <li><span className="hover:text-[#45B5E5] cursor-pointer">AICTE / UGC Model Syllabus</span></li>
              <li><span className="hover:text-[#45B5E5] cursor-pointer">Non-Fabricated PYQ Registry</span></li>
            </ul>
          </div>

          {/* Col 5: Contact & Academic Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#111111] uppercase tracking-wider font-sans">
              Academic Support
            </h4>
            <div className="space-y-3 text-sm text-[#777777]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#45B5E5] shrink-0 mt-0.5" />
                <span>Pan-India Higher Education Intelligence<br />Kolkata • Bengaluru • New Delhi</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#45B5E5] shrink-0" />
                <a href="mailto:support@vidya.ai" className="hover:text-[#45B5E5]">support@vidya.ai</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#45B5E5] shrink-0" />
                <span>+91 1800-VIDYA-AI</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => handleNav('studyHub')}
              className="mt-2 w-full py-2.5 rounded-full bg-[#EAF8FD] hover:bg-[#45B5E5] text-[#168FC4] hover:text-white font-bold text-xs transition-colors duration-200 border border-[#45B5E5]/20 cursor-pointer"
            >
              Launch Study Room →
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <div>
            © 2026 VIDYA AI Platform Inc. Built with university syllabus fidelity.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#111111] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#111111] cursor-pointer">Terms of Service</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAF8FD] hover:bg-[#45B5E5] text-[#168FC4] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

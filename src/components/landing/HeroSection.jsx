import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  GraduationCap, 
  FileCheck, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  Zap, 
  X, 
  Target, 
  ArrowLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export const HeroSection = ({ setActiveTab, onOpenTopic, onOpenSemester }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  
  // Guided Onboarding Steps: 1: Target Stream, 2: Semester/Branch/Subject, 3: Goal/Need
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedStream, setSelectedStream] = useState('btech');
  
  // Stream-specific sub-selection
  const [selectedSem, setSelectedSem] = useState(3);
  const [selectedBcaSem, setSelectedBcaSem] = useState(2);
  const [selectedGatePaper, setSelectedGatePaper] = useState('CS');
  const [selectedJeeTrack, setSelectedJeeTrack] = useState('jee_main');
  const [selectedSscSection, setSelectedSscSection] = useState('ssc_full');
  const [selectedCbse12Track, setSelectedCbse12Track] = useState('cbse12_pcm_cs');
  const [selectedCbse10Subject, setSelectedCbse10Subject] = useState('cbse10_math');
  
  const [selectedGoal, setSelectedGoal] = useState('blueprint');
  const [heroTopic, setHeroTopic] = useState('');

  const streams = [
    { id: 'btech', name: 'B.Tech Engineering', desc: 'Semester 1 to 8 (MAKAUT & Autonomous)', icon: '🎓' },
    { id: 'cbse_12', name: 'CBSE Class 12 Board', desc: 'Science (PCM / Biology / CS Python & SQL)', icon: '🏫' },
    { id: 'cbse_10', name: 'CBSE Class 10 Board', desc: 'Maths, Science, Social Science & English', icon: '🎒' },
    { id: 'ssc', name: 'SSC CGL (Govt Exams)', desc: 'Tier-1 & Tier-2 Speed CBT Simulator', icon: '🎯' },
    { id: 'jee', name: 'NTA JEE (Main & Advanced)', desc: 'NTA Computer Based Test (300 Marks PCM)', icon: '⚡' },
    { id: 'gate', name: 'GATE 2027 (IIT Madras)', desc: 'National Test (CS, DA, EC, EE, ME, CE)', icon: '🏛️' },
    { id: 'bca', name: 'BCA / MCA Semester', desc: 'C, Python, Java OOPs, DBMS SQL, Web Tech', icon: '💻' }
  ];

  const cbse12Tracks = [
    { id: 'cbse12_pcm_cs', name: 'PCM + Computer Science', desc: 'Calculus, Vectors, Optics, Electrostatics, Organic Chemistry & Python/SQL' },
    { id: 'cbse12_pcm_bio', name: 'PCM + Biology', desc: 'Calculus, Ray/Wave Optics, Genetics, Human Physiology & Organic Reactions' },
    { id: 'cbse12_math', name: 'Mathematics Focus', desc: 'Integration, Differential Equations, 3D Geometry, Vectors & Matrices' },
    { id: 'cbse12_phys', name: 'Physics Focus', desc: 'Gauss Law, Lens Maker Formula, LCR Circuits, Wave Optics & Semiconductors' }
  ];

  const cbse10Subjects = [
    { id: 'cbse10_math', name: 'Mathematics (Standard / Basic)', desc: 'Thales Theorem, Quadratic Equations, Arithmetic Progressions & Trigonometry' },
    { id: 'cbse10_sci', name: 'Integrated Science', desc: 'Light Reflection/Refraction, Electricity, Life Processes & Chemical Reactions' },
    { id: 'cbse10_sst', name: 'Social Science', desc: 'Nationalism in India, Federalism, Agriculture & Sectors of Indian Economy' },
    { id: 'cbse10_eng', name: 'English Language & Literature', desc: 'Reading Passages, Analytical Paragraphs, Grammar Rules & First Flight' }
  ];

  const gatePapers = [
    { id: 'CS', name: 'CS — Computer Science & IT', desc: 'Algorithms, OS, DBMS, Networks, TOC, Compiler & Math' },
    { id: 'DA', name: 'DA — Data Science & AI', desc: 'Machine Learning, AI, Python, Probability & DBMS' },
    { id: 'EC', name: 'EC — Electronics & Comm.', desc: 'Digital Circuits, Signals, Analog, EMF & Communications' },
    { id: 'EE', name: 'EE — Electrical Engineering', desc: 'Power Systems, Machines, Control Systems & Network Theory' },
    { id: 'ME', name: 'ME — Mechanical Engineering', desc: 'Thermodynamics, Fluid Mechanics, Manufacturing & SOM' },
    { id: 'CE', name: 'CE — Civil Engineering', desc: 'Structures, Geotechnical, Environmental & Surveying' }
  ];

  const jeeTracks = [
    { id: 'jee_main', name: 'JEE Main Full CBT Mock', desc: 'Physics (25Q) + Chemistry (25Q) + Mathematics (25Q) — 300 Marks NTA Pattern' },
    { id: 'jee_adv', name: 'JEE Advanced Paper Simulator', desc: 'IIT Multi-Correct MSQs, Numerical Value Type & Paragraph Comprehension' },
    { id: 'physics_jee', name: 'JEE Physics Focus Track', desc: 'Mechanics, Electrodynamics, Optics, Thermodynamics & Modern Physics' },
    { id: 'chemistry_jee', name: 'JEE Chemistry Focus Track', desc: 'Organic Reaction Mechanisms, Coordination Compounds, Physical & Inorganic' },
    { id: 'maths_jee', name: 'JEE Mathematics Focus Track', desc: 'Calculus, Coordinate Geometry, Vectors & 3D, Matrices & Algebra' }
  ];

  const sscSections = [
    { id: 'ssc_full', name: 'SSC CGL Tier-1 (Full Mock)', desc: '100 Questions / 200 Marks (60 Mins Timed Simulator)' },
    { id: 'quant', name: 'Quantitative Aptitude', desc: 'Arithmetic, Advanced Algebra, Geometry & Trigonometry' },
    { id: 'reasoning', name: 'General Intelligence & Reasoning', desc: 'Syllogism, Analogy, Coding-Decoding & Logic' },
    { id: 'gk', name: 'General Awareness & Science', desc: 'Polity, Modern History, Economy & Current Affairs' }
  ];

  const getGoalsForStream = () => {
    switch (selectedStream) {
      case 'gate':
        return [
          { id: 'blueprint', label: 'Complete GATE Syllabus Blueprint & Study Room', desc: 'Detailed topics, hardest hurdle warnings, and repeated PYQs', icon: BookOpen },
          { id: 'mockTest', label: 'Official 100-Mark IIT Madras Simulator', desc: 'Timed 65-question test with MCQs, MSQs & NAT numericals', icon: FileCheck },
          { id: 'cheatsheet', label: 'Engineering Math & Aptitude Cheat Sheet', desc: 'High-speed formula derivation and shortcut cards', icon: Layers }
        ];
      case 'jee':
        return [
          { id: 'blueprint', label: 'High-Weightage Chapter Blueprint & Study Room', desc: 'Isolate 80%+ repeated derivations, reactions and numerical patterns', icon: BookOpen },
          { id: 'mockTest', label: 'Official 300-Mark NTA JEE CBT Simulator', desc: 'Timed 75-question test with +4 / -1 negative marking', icon: FileCheck },
          { id: 'cheatsheet', label: '1-Page JEE Formula Sheets & Key Named Reactions', desc: 'Emergency speed-solving formulas for Physics, Chemistry & Maths', icon: Layers }
        ];
      case 'ssc':
        return [
          { id: 'blueprint', label: 'SSC CGL Topic Blueprint & Study Room', desc: 'Complete breakdown of Arithmetic, Reasoning, GK & English', icon: BookOpen },
          { id: 'mockTest', label: 'SSC CGL 60-Min Speed Mock Test Paper', desc: '100-Question full simulator with -0.50 negative marking', icon: FileCheck },
          { id: 'cheatsheet', label: 'Quantitative Shortcut Tricks & Vocab Sheets', desc: 'Mental math shortcuts, grammar rules & GK capsules', icon: Layers }
        ];
      case 'cbse_12':
        return [
          { id: 'blueprint', label: 'Class 12 Board Blueprint & Study Room', desc: 'Subject chapters, hardest derivations, and repeated board PYQs', icon: BookOpen },
          { id: 'mockTest', label: 'Official 80-Mark CBSE Board Model Paper', desc: 'Timed board exam simulator with step-by-step marking rubrics', icon: FileCheck },
          { id: 'cheatsheet', label: '1-Page Derivation & Formula Cheat Sheet', desc: 'Lens Maker, Gauss Law, Nernst equation & calculus summaries', icon: Layers }
        ];
      case 'cbse_10':
        return [
          { id: 'blueprint', label: 'Class 10 Board Blueprint & Study Room', desc: 'NCERT chapters, Thales theorem proofs, and 5-mark PYQs', icon: BookOpen },
          { id: 'mockTest', label: 'Official 80-Mark CBSE Class 10 Model Paper', desc: 'Full-length board test with Section A to E rubrics', icon: FileCheck },
          { id: 'cheatsheet', label: 'High-Yield Formula & Theorem Cheat Sheet', desc: 'Trigonometry values, quadratic formulas, and ray diagrams', icon: Layers }
        ];
      case 'bca':
        return [
          { id: 'blueprint', label: 'BCA Semester Curriculum & Study Room', desc: 'C, Python, Java, and DBMS SQL complete blueprints', icon: BookOpen },
          { id: 'mockTest', label: 'Official 70-Mark University Model Paper', desc: 'MCQs, algorithm logic & program code questions', icon: FileCheck },
          { id: 'cheatsheet', label: 'Syntax & Algorithm Logic Cheat Sheet', desc: 'Stack, Queue, SQL queries, and Python OOPs cheat sheet', icon: Layers }
        ];
      default: // btech
        return [
          { id: 'blueprint', label: '30-Day Exam Pass Blueprint & Study Room', desc: 'Isolate 80%+ repeated 10M questions & hardest hurdles', icon: BookOpen },
          { id: 'mockTest', label: 'Official 70-Mark University Mock Test Paper', desc: 'Timed exam simulator with Group A, B, C marking', icon: FileCheck },
          { id: 'cheatsheet', label: '1-Page Formula & Theorem Cheat Sheet', desc: 'Emergency last-minute recall sheets', icon: Layers }
        ];
    }
  };

  const handleFinishWizard = () => {
    setIsWizardOpen(false);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

    // Map internal stream id to target track & exam keys
    let trackKey = 'btech';
    let examKey = 'btech_makaut';
    let streamLabel = 'B.Tech Engineering';

    if (selectedStream === 'btech') {
      trackKey = 'btech';
      examKey = 'btech_makaut';
      streamLabel = `B.Tech Semester ${selectedSem}`;
    } else if (selectedStream === 'cbse_12') {
      trackKey = 'cbse_12';
      examKey = 'cbse_12';
      streamLabel = 'CBSE Class 12 Board';
    } else if (selectedStream === 'cbse_10') {
      trackKey = 'cbse_10';
      examKey = 'cbse_10';
      streamLabel = 'CBSE Class 10 Board';
    } else if (selectedStream === 'ssc') {
      trackKey = 'ssc_cgl';
      examKey = 'ssc_cgl';
      streamLabel = 'SSC CGL';
    } else if (selectedStream === 'jee') {
      trackKey = 'jee_main';
      examKey = 'jee_main';
      streamLabel = 'NTA JEE Main';
    } else if (selectedStream === 'gate') {
      trackKey = 'gate_2027';
      examKey = 'gate_2027';
      streamLabel = `GATE 2027 (${selectedGatePaper})`;
    } else if (selectedStream === 'bca') {
      trackKey = 'bca_college';
      examKey = 'bca_college';
      streamLabel = `BCA Semester ${selectedBcaSem}`;
    }

    // Persist user selection
    localStorage.setItem('vidya_target_track', trackKey);
    localStorage.setItem('vidya_selected_exam', examKey);

    const targetTab = selectedGoal === 'mockTest' ? 'mockTests' : selectedGoal === 'cheatsheet' ? 'cheatSheets' : 'studyHub';

    if (selectedStream === 'btech' && onOpenSemester) {
      onOpenSemester(selectedSem, targetTab);
    } else {
      setActiveTab(targetTab);
    }

    toast.success(`Loaded ${streamLabel} Experience!`, {
      description: `Target set: ${selectedGoal === 'mockTest' ? 'Mock Test Engine' : selectedGoal === 'cheatsheet' ? 'Cheat Sheet Studio' : 'Study Room Blueprint'}`
    });
  };

  const getStep1ButtonText = () => {
    switch (selectedStream) {
      case 'btech': return 'Next: Choose Semester';
      case 'gate': return 'Next: Choose GATE Paper';
      case 'jee': return 'Next: Choose JEE Focus Track';
      case 'ssc': return 'Next: Choose Exam Section';
      case 'cbse_12': return 'Next: Choose Class 12 Track';
      case 'cbse_10': return 'Next: Choose Class 10 Subject';
      case 'bca': return 'Next: Choose BCA Semester';
      default: return 'Next: Choose Focus';
    }
  };

  const currentGoals = getGoalsForStream();

  return (
    <section className="relative w-full min-h-[76vh] flex flex-col items-center justify-center pt-18 sm:pt-24 lg:pt-28 pb-18 sm:pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-9 w-full max-w-7xl 2xl:max-w-[1500px] mx-auto">
      
      {/* Ambient Light Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] sm:w-[1200px] lg:w-[1440px] h-[540px] bg-gradient-to-tr from-sky-400/22 via-blue-500/18 to-cyan-300/22 blur-[140px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 -left-28 w-[420px] h-[420px] bg-sky-400/15 blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 -right-28 w-[420px] h-[420px] bg-blue-500/15 blur-[120px] pointer-events-none -z-10 rounded-full" />

      {/* Hero Typography */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="space-y-6 w-full"
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[110px] tracking-tight leading-[1.04] select-none">
          <span className="font-montserrat font-black text-slate-900 dark:text-[#F8FAFC] block">
            Understanding changes everything.
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl sm:max-w-4xl mx-auto font-normal font-sans pt-2">
          Turn any syllabus into a perfect score with AI precision, authentic exam simulators, 
          spaced repetition, and 24/7 step-by-step doubt derivations.
        </p>

        {/* Action Buttons: Start Learning & 3-Step Wizard */}
        <div className="pt-4 flex items-center justify-center gap-4 sm:gap-5 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('studyHub')}
            className="px-9 py-4 sm:py-4.5 rounded-full liquid-glass-button font-bold text-base sm:text-lg flex items-center justify-center gap-3 cursor-pointer group shadow-[0_10px_35px_rgba(14,165,233,0.4)] hover:shadow-[0_14px_45px_rgba(56,189,248,0.6)] select-none hover:-translate-y-0.5 transition-all"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
          
          <button
            type="button"
            onClick={() => {
              setWizardStep(1);
              setIsWizardOpen(true);
            }}
            className="px-8 py-4 sm:py-4.5 rounded-full liquid-glass border border-slate-200/90 dark:border-sky-500/30 text-slate-700 dark:text-sky-200 hover:border-sky-400 text-base sm:text-lg font-semibold cursor-pointer transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            <span>3-Step Wizard</span>
          </button>
        </div>
      </motion.div>

      {/* 5. Guided Step-by-Step Preparation Modal (Adaptive to Stream) */}
      {isWizardOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsWizardOpen(false);
          }}
        >
          <div className="relative w-full max-w-xl max-h-[90vh] rounded-3xl bg-[#0D1117] border border-[#30363D] shadow-2xl p-6 sm:p-8 space-y-6 text-left overflow-y-auto animate-scale-in my-8 text-white">
            
            {/* Header & Step Indicator */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30">
                  Step {wizardStep} of 3
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {wizardStep === 1 && 'Select Target Exam'}
                  {wizardStep === 2 && (
                    selectedStream === 'btech' ? 'Select Semester' :
                    selectedStream === 'cbse_12' ? 'Select Focus Track' :
                    selectedStream === 'cbse_10' ? 'Select Focus Subject' :
                    selectedStream === 'gate' ? 'Select Paper' :
                    selectedStream === 'jee' ? 'Select JEE Track' :
                    selectedStream === 'bca' ? 'Select Semester' : 'Select Section'
                  )}
                  {wizardStep === 3 && 'Choose Goal'}
                </span>
              </div>

              <button 
                type="button"
                onClick={() => setIsWizardOpen(false)}
                className="p-1.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-neutral-400 hover:text-white transition-all cursor-pointer border border-[#30363D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* STEP 1: What are you preparing for? */}
            {wizardStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-display text-[#083A4F] dark:text-[#FAF9F8]">
                    What are you preparing for?
                  </h3>
                  <p className="text-xs text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                    VIDYA AI will customize the question paper pattern, syllabus, and PYQ blueprints.
                  </p>
                </div>

                <div className="space-y-2 pt-1 max-h-[360px] overflow-y-auto pr-1">
                  {streams.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStream(s.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        selectedStream === s.id
                          ? 'glass-teal shadow-xs border-[#407E8C]'
                          : 'glass-surface hover:border-[#407E8C]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{s.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-[#083A4F] dark:text-white font-display">
                            {s.name}
                          </div>
                          <div className="text-xs text-[#083A4F]/65 dark:text-[#CBDCE3]/70 font-sans">
                            {s.desc}
                          </div>
                        </div>
                      </div>

                      {selectedStream === s.id && (
                        <CheckCircle2 className="w-5 h-5 text-[#407E8C] shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className="w-full py-3 rounded-xl bg-[#407E8C] text-white hover:bg-[#336570] font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span>{getStep1ButtonText()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Stream-Specific Sub-Selection */}
            {wizardStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                
                {/* 2A. B.Tech Semesters (1 to 8) */}
                {selectedStream === 'btech' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#083A4F] dark:text-[#FAF9F8]">
                        Which semester are you in?
                      </h3>
                      <p className="text-xs text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                        We will load the exact MAKAUT / University curriculum for this semester.
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <button
                          key={sem}
                          type="button"
                          onClick={() => setSelectedSem(sem)}
                          className={`p-3.5 rounded-xl text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                            selectedSem === sem
                              ? 'bg-[#407E8C] text-white shadow-sm border border-[#407E8C]'
                              : 'glass-surface text-[#083A4F] dark:text-[#E5E1DD] hover:bg-[#E5E1DD]/30'
                          }`}
                        >
                          Sem {sem}
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl glass-teal text-xs font-mono">
                      Selected: <strong>Semester {selectedSem} B.Tech</strong> (Includes all core theory subjects, lab viva guides & repeated questions).
                    </div>
                  </>
                )}

                {/* 2B. CBSE Class 12 Tracks */}
                {selectedStream === 'cbse_12' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#083A4F] dark:text-[#FAF9F8]">
                        Select your Class 12 Focus Track
                      </h3>
                      <p className="text-xs text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                        CBSE 80/70-mark official board pattern with step-by-step marking rubrics.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 max-h-[280px] overflow-y-auto">
                      {cbse12Tracks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setSelectedCbse12Track(t.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedCbse12Track === t.id
                              ? 'glass-teal shadow-xs border-[#407E8C]'
                              : 'glass-surface hover:border-[#407E8C]/40'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#083A4F] dark:text-white font-display">
                              {t.name}
                            </div>
                            <div className="text-[11px] text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                              {t.desc}
                            </div>
                          </div>
                          {selectedCbse12Track === t.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#407E8C] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl glass-teal text-xs font-mono">
                      Selected: <strong>{cbse12Tracks.find(t => t.id === selectedCbse12Track)?.name}</strong>.
                    </div>
                  </>
                )}

                {/* 2C. CBSE Class 10 Subjects */}
                {selectedStream === 'cbse_10' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#083A4F] dark:text-[#FAF9F8]">
                        Select your Class 10 Subject Focus
                      </h3>
                      <p className="text-xs text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                        CBSE 80-mark board model papers, NCERT proofs, and formula sheets.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 max-h-[280px] overflow-y-auto">
                      {cbse10Subjects.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => setSelectedCbse10Subject(s.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedCbse10Subject === s.id
                              ? 'glass-teal shadow-xs border-[#407E8C]'
                              : 'glass-surface hover:border-[#407E8C]/40'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#083A4F] dark:text-white font-display">
                              {s.name}
                            </div>
                            <div className="text-[11px] text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                              {s.desc}
                            </div>
                          </div>
                          {selectedCbse10Subject === s.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#407E8C] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl glass-teal text-xs font-mono">
                      Selected: <strong>{cbse10Subjects.find(s => s.id === selectedCbse10Subject)?.name}</strong>.
                    </div>
                  </>
                )}

                {/* 2D. GATE 2027 Papers */}
                {selectedStream === 'gate' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#083A4F] dark:text-[#FAF9F8]">
                        Select your GATE 2027 Paper
                      </h3>
                      <p className="text-xs text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                        IIT Madras official 100-mark pattern (65 Questions: GA + Engg Math + Core).
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 max-h-[280px] overflow-y-auto">
                      {gatePapers.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setSelectedGatePaper(p.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedGatePaper === p.id
                              ? 'glass-teal shadow-xs border-[#407E8C]'
                              : 'glass-surface hover:border-[#407E8C]/40'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#083A4F] dark:text-white font-display">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                              {p.desc}
                            </div>
                          </div>
                          {selectedGatePaper === p.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#407E8C] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl glass-teal text-xs font-mono">
                      Selected: <strong>GATE 2027 ({selectedGatePaper})</strong> — IIT Madras 100-Mark official pattern.
                    </div>
                  </>
                )}

                {/* 2E. JEE Focus Tracks */}
                {selectedStream === 'jee' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#083A4F] dark:text-[#FAF9F8]">
                        Select your JEE Focus Track
                      </h3>
                      <p className="text-xs text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                        NTA official 300-mark CBT simulator (Physics, Chemistry & Mathematics).
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 max-h-[280px] overflow-y-auto">
                      {jeeTracks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setSelectedJeeTrack(t.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedJeeTrack === t.id
                              ? 'glass-teal shadow-xs border-[#407E8C]'
                              : 'glass-surface hover:border-[#407E8C]/40'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#083A4F] dark:text-white font-display">
                              {t.name}
                            </div>
                            <div className="text-[11px] text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                              {t.desc}
                            </div>
                          </div>
                          {selectedJeeTrack === t.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#407E8C] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl glass-teal text-xs font-mono">
                      Selected: <strong>{jeeTracks.find(t => t.id === selectedJeeTrack)?.name}</strong>.
                    </div>
                  </>
                )}

                {/* 2F. SSC CGL Sections */}
                {selectedStream === 'ssc' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#083A4F] dark:text-[#FAF9F8]">
                        Select your Govt Exam Focus
                      </h3>
                      <p className="text-xs text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                        Choose a full-length speed mock or focus on specific test sections.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 max-h-[280px] overflow-y-auto">
                      {sscSections.map((sec) => (
                        <div
                          key={sec.id}
                          onClick={() => setSelectedSscSection(sec.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedSscSection === sec.id
                              ? 'glass-teal shadow-xs border-[#407E8C]'
                              : 'glass-surface hover:border-[#407E8C]/40'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#083A4F] dark:text-white font-display">
                              {sec.name}
                            </div>
                            <div className="text-[11px] text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                              {sec.desc}
                            </div>
                          </div>
                          {selectedSscSection === sec.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#407E8C] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl glass-teal text-xs font-mono">
                      Selected: <strong>{sscSections.find(s => s.id === selectedSscSection)?.name}</strong>.
                    </div>
                  </>
                )}

                {/* 2G. BCA / MCA Semesters (1 to 6) */}
                {selectedStream === 'bca' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#083A4F] dark:text-[#FAF9F8]">
                        Which BCA / MCA Semester are you in?
                      </h3>
                      <p className="text-xs text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                        University 70-mark pattern covering C, Python, Java, DBMS & Web Tech.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 pt-2">
                      {[1, 2, 3, 4, 5, 6].map((sem) => (
                        <button
                          key={sem}
                          type="button"
                          onClick={() => setSelectedBcaSem(sem)}
                          className={`p-3.5 rounded-xl text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                            selectedBcaSem === sem
                              ? 'bg-[#407E8C] text-white shadow-sm border border-[#407E8C]'
                              : 'glass-surface text-[#083A4F] dark:text-[#E5E1DD] hover:bg-[#E5E1DD]/30'
                          }`}
                        >
                          Semester {sem}
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl glass-teal text-xs font-mono">
                      Selected: <strong>Semester {selectedBcaSem} BCA / MCA</strong>.
                    </div>
                  </>
                )}

                {/* Back / Next Buttons for Step 2 */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="py-3 px-5 rounded-xl glass-button-secondary text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="flex-grow py-3 rounded-xl bg-[#407E8C] text-white hover:bg-[#336570] font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Next: Select Goal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Dynamic Goals based on Stream */}
            {wizardStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-display text-[#083A4F] dark:text-[#FAF9F8]">
                    What do you need right now?
                  </h3>
                  <p className="text-xs text-[#083A4F]/65 dark:text-[#CBDCE3]/70">
                    Choose what you want VIDYA AI to generate for your preparation.
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  {currentGoals.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => setSelectedGoal(g.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        selectedGoal === g.id
                          ? 'glass-teal shadow-xs border-[#407E8C]'
                          : 'glass-surface hover:border-[#407E8C]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          selectedGoal === g.id ? 'bg-[#407E8C] text-white' : 'bg-[#083A4F]/5 dark:bg-white/10 text-[#083A4F] dark:text-[#E5E1DD]'
                        }`}>
                          <g.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#083A4F] dark:text-white font-display">
                            {g.label}
                          </div>
                          <div className="text-[11px] text-[#083A4F]/65 dark:text-[#CBDCE3]/70 font-sans">
                            {g.desc}
                          </div>
                        </div>
                      </div>

                      {selectedGoal === g.id && (
                        <CheckCircle2 className="w-5 h-5 text-[#407E8C] shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="py-3 px-5 rounded-xl glass-button-secondary text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFinishWizard}
                    className="flex-grow py-3 rounded-xl bg-[#407E8C] text-white hover:bg-[#336570] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
                  >
                    <Sparkles className="w-4 h-4 text-[#E5E1DD]" />
                    <span>Generate My Study Plan →</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

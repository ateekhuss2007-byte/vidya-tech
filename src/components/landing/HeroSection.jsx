import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
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
import { PAN_INDIA_UNIVERSITIES } from '../../data/panIndiaUniversitiesData';

const BTECH_SEMESTER_SUBJECTS = {
  1: [
    { code: 'BS-M101', name: 'Mathematics-I (Calculus & Linear Algebra)', tag: 'Calculus, Eigenvalues' },
    { code: 'BS-PH101', name: 'Engineering Physics', tag: 'Quantum & Optics' },
    { code: 'ES-EE101', name: 'Basic Electrical Engineering', tag: 'AC Circuits, Transformers' },
    { code: 'ES-CS101', name: 'Programming for Problem Solving (C)', tag: 'Pointers, Arrays, Structs' }
  ],
  2: [
    { code: 'BS-M201', name: 'Mathematics-II (ODE & Complex Variables)', tag: 'Laplace & Fourier' },
    { code: 'BS-CH201', name: 'Engineering Chemistry', tag: 'Polymers & Thermodynamics' },
    { code: 'ES-EC201', name: 'Basic Electronics Engineering', tag: 'Diodes, BJTs, Op-Amps' },
    { code: 'ES-CS201', name: 'Data Structures & Algorithms', tag: 'Stacks, Queues, Linked Lists' }
  ],
  3: [
    { code: 'PCC-CS301', name: 'Data Structures & Algorithms', tag: 'Trees, Graphs, Sorting, Hash' },
    { code: 'ESC-CS301', name: 'Digital Logic & Circuit Design', tag: 'Boolean Algebra, K-Maps, MUX' },
    { code: 'PCC-CS302', name: 'Computer Organization & Architecture', tag: 'Pipelines, Cache, Control Unit' },
    { code: 'BSC-CS301', name: 'Discrete Mathematics', tag: 'Graph Theory, Relations, Sets' }
  ],
  4: [
    { code: 'PCC-CS401', name: 'Design & Analysis of Algorithms', tag: 'Greedy, DP, Divide & Conquer' },
    { code: 'PCC-CS402', name: 'Operating Systems', tag: 'Paging, Deadlocks, Scheduling' },
    { code: 'PCC-CS403', name: 'Database Management Systems', tag: 'SQL, Normalization, ACID' },
    { code: 'PCC-CS404', name: 'Formal Language & Automata Theory', tag: 'DFA, NFA, Turing Machines' }
  ],
  5: [
    { code: 'PCC-CS501', name: 'Compiler Design', tag: 'Lexical, Parsing, Code Gen' },
    { code: 'PCC-CS502', name: 'Computer Networks', tag: 'OSI, TCP/IP, Subnetting, DNS' },
    { code: 'PCC-CS503', name: 'Software Engineering', tag: 'Agile, SDLC, UML Diagrams' },
    { code: 'PCC-CS504', name: 'Object Oriented Programming (Java/C++)', tag: 'Inheritance, Polymorphism' }
  ],
  6: [
    { code: 'PEC-CS601', name: 'Machine Learning', tag: 'Supervised, Clustering, Neural Nets' },
    { code: 'PEC-CS602', name: 'Cloud Computing & DevOps', tag: 'AWS, Virtualization, Containers' },
    { code: 'PCC-CS601', name: 'Web Technologies & Full Stack', tag: 'REST APIs, React, Node' },
    { code: 'PEC-CS603', name: 'Artificial Intelligence', tag: 'A* Search, Knowledge Rep' }
  ],
  7: [
    { code: 'PEC-CS701', name: 'Deep Learning', tag: 'CNN, RNN, Transformers, PyTorch' },
    { code: 'PEC-CS702', name: 'Cryptography & Network Security', tag: 'RSA, AES, Digital Signatures' },
    { code: 'PEC-CS703', name: 'Distributed Systems', tag: 'Raft, Paxos, Microservices' },
    { code: 'OEC-CS701', name: 'Internet of Things (IoT)', tag: 'Embedded C, MQTT, Sensors' }
  ],
  8: [
    { code: 'PEC-CS801', name: 'High Performance Computing', tag: 'CUDA, MPI, OpenMP' },
    { code: 'PEC-CS802', name: 'Big Data Analytics', tag: 'Spark, Hadoop, MapReduce' },
    { code: 'PROJ-CS801', name: 'Capstone Project & Grand Viva', tag: 'Defense, Rubric Evaluation' },
    { code: 'OEC-CS802', name: 'Cyber Security & Forensics', tag: 'Penetration Testing, Auditing' }
  ]
};

export const HeroSection = ({ setActiveTab, onOpenTopic, onOpenSemester }) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });
  const bgY = useTransform(smoothScroll, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(smoothScroll, [0, 1], [1, 1.05]);
  const textY = useTransform(smoothScroll, [0, 1], ['0%', '10%']);
  const heroOpacity = useTransform(smoothScroll, [0, 0.85, 1], [1, 0.95, 0.7]);

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
    <section 
      id="hero-section"
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center pt-2 sm:pt-4 md:pt-6 pb-6 sm:pb-10 px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-5 sm:space-y-6 w-full max-w-7xl 2xl:max-w-[1500px] mx-auto overflow-visible"
    >
      
      {/* Background Atmospheric Layer */}
      <motion.div 
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 pointer-events-none -z-10 scroll-gpu flex items-center justify-center"
      >
        <div className="w-[850px] sm:w-[1150px] lg:w-[1350px] h-[480px] bg-gradient-to-tr from-[#007AFF]/18 via-[#5AC8FA]/12 to-[#007AFF]/15 blur-[130px] rounded-full" />
        <div className="absolute top-1/4 -left-20 w-[380px] h-[380px] bg-[#007AFF]/10 blur-[110px] rounded-full" />
        <div className="absolute top-1/4 -right-20 w-[380px] h-[380px] bg-[#5AC8FA]/10 blur-[110px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.045] bg-[radial-gradient(#007AFF_1px,transparent_1px)] [background-size:24px_24px]" />
      </motion.div>

      {/* High-Utility Top Academic Track Selector Bar (Uses the top space purposefully) */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-white/90 dark:bg-[#252528]/90 border border-[#AAAAAA]/30 dark:border-white/[0.1] shadow-sm backdrop-blur-md">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#AAAAAA] px-2.5 py-1 hidden sm:inline">
            Target Track:
          </span>
          {streams.map((s) => {
            const isSelected = selectedStream === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSelectedStream(s.id);
                  setIsWizardOpen(true);
                  setWizardStep(2);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#007AFF] text-white shadow-sm shadow-[#007AFF]/30 font-semibold'
                    : 'text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Subject Plane (Headline, Subtitle, Primary CTA) */}
      <motion.div 
        style={{ y: textY, opacity: heroOpacity }}
        className="space-y-4 sm:space-y-5 w-full scroll-gpu"
      >
        {/* Hero Headline & Subtitle */}
        <div className="space-y-3 w-full">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight leading-[1.08] select-none font-display">
            <span className="text-[#1D1D1F] dark:text-[#F5F5F7] block">
              The Official AI Academic
            </span>
            <span className="block bg-gradient-to-r from-[#007AFF] via-[#3395FF] to-[#5AC8FA] bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl sm:max-w-4xl mx-auto font-normal font-sans pt-0.5">
            Verbatim syllabus extraction, authentic non-fabricated PYQ vaults, and adaptive exam readiness engines engineered for university students and educators across India.
          </p>
        </div>

        {/* Primary Call-to-Action */}
        <div className="pt-2 flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
              if (onOpenSemester) {
                onOpenSemester(3, 'studyHub');
              } else {
                setActiveTab('studyHub');
              }
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white font-display font-bold text-base sm:text-lg shadow-xl shadow-[#007AFF]/30 hover:shadow-[#007AFF]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-white/90 group-hover:rotate-12 transition-transform duration-300" />
            <span>Let's Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          {/* Trust Points */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 pt-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verbatim BoS Syllabi</span>
            </span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Non-Fabricated PYQs</span>
            </span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Adaptive Retention</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* 4. Pan-India Audited Universities Continuous Marquee Ticker */}
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto pt-2 overflow-hidden">
        <div className="text-center mb-3">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1D1D1F]/70 dark:text-[#AAAAAA] inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
            <span>Audited Across 36 Premier Pan-India Technical Universities & Authorities</span>
            <span className="px-2 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-[10px] font-bold border border-[#007AFF]/25">
              100% Verifiable Source URLs
            </span>
          </span>
        </div>

        <div className="relative w-full overflow-hidden mask-fade-edges py-2">
          <div className="animate-marquee gap-3">
            {PAN_INDIA_UNIVERSITIES.concat(PAN_INDIA_UNIVERSITIES).map((u, idx) => (
              <button
                key={`${u.id}-${idx}`}
                type="button"
                onClick={() => {
                  setActiveTab('collegeHub');
                  toast.info(`Inspecting ${u.shortName}`, { description: `${u.officialName} • ${u.state}` });
                }}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-[#1D1D1F]/90 border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF] hover:shadow-md hover:shadow-[#007AFF]/10 transition-all cursor-pointer shrink-0 text-left backdrop-blur-md group"
              >
                <span className="text-base">{u.icon || '🏛️'}</span>
                <div>
                  <div className="text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#007AFF] transition-colors whitespace-nowrap">
                    {u.shortName}
                  </div>
                  <div className="text-[10px] font-mono text-[#AAAAAA] whitespace-nowrap">
                    {u.state} • {u.authorityLabel || 'Autonomous'}
                  </div>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] shrink-0 ml-1.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Guided Step-by-Step Preparation Modal (Adaptive to Stream) */}
      {isWizardOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsWizardOpen(false);
          }}
        >
          <div className="relative w-full max-w-xl max-h-[90vh] rounded-3xl bg-[#1D1D1F] border border-[#AAAAAA]/30 shadow-2xl p-6 sm:p-8 space-y-6 text-left overflow-y-auto animate-scale-in my-8 text-[#F5F5F7]">
            
            {/* Header & Step Indicator */}
            <div className="flex items-center justify-between pb-3 border-b border-[#AAAAAA]/20">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#007AFF]/15 text-[#007AFF] border border-[#007AFF]/30">
                  Step {wizardStep} of 3
                </span>
                <span className="text-xs font-mono text-[#AAAAAA]">
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
                className="p-1.5 rounded-lg bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#AAAAAA] hover:text-[#F5F5F7] transition-all cursor-pointer border border-[#AAAAAA]/30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* STEP 1: What are you preparing for? */}
            {wizardStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-display text-[#F5F5F7]">
                    What are you preparing for?
                  </h3>
                  <p className="text-xs text-[#AAAAAA]">
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
                          ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-sm'
                          : 'bg-white/[0.03] border-white/[0.08] hover:border-[#007AFF]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{s.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-[#F5F5F7] font-display">
                            {s.name}
                          </div>
                          <div className="text-xs text-[#AAAAAA] font-sans">
                            {s.desc}
                          </div>
                        </div>
                      </div>

                      {selectedStream === s.id && (
                        <CheckCircle2 className="w-5 h-5 text-[#007AFF] shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className="w-full py-3 rounded-xl bg-[#007AFF] text-white hover:bg-[#0062CC] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
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
                      <h3 className="text-xl font-bold font-display text-[#F5F5F7]">
                        Which semester are you in?
                      </h3>
                      <p className="text-xs text-[#AAAAAA]">
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
                              ? 'bg-[#007AFF] text-white shadow-md border border-[#007AFF]'
                              : 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] hover:border-[#007AFF]/40'
                          }`}
                        >
                          Sem {sem}
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/25 text-[#007AFF] text-xs font-mono">
                      Selected: <strong>Semester {selectedSem} B.Tech</strong> (Includes all core theory subjects, lab viva guides & repeated questions).
                    </div>
                  </>
                )}

                {/* 2B. CBSE Class 12 Tracks */}
                {selectedStream === 'cbse_12' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#F5F5F7]">
                        Select your Class 12 Focus Track
                      </h3>
                      <p className="text-xs text-[#AAAAAA]">
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
                              ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-sm'
                              : 'bg-white/[0.03] border-white/[0.08] hover:border-[#007AFF]/40'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#F5F5F7] font-display">
                              {t.name}
                            </div>
                            <div className="text-[11px] text-[#AAAAAA]">
                              {t.desc}
                            </div>
                          </div>
                          {selectedCbse12Track === t.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/25 text-[#007AFF] text-xs font-mono">
                      Selected: <strong>{cbse12Tracks.find(t => t.id === selectedCbse12Track)?.name}</strong>.
                    </div>
                  </>
                )}

                {/* 2C. CBSE Class 10 Subjects */}
                {selectedStream === 'cbse_10' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#F5F5F7]">
                        Select your Class 10 Subject Focus
                      </h3>
                      <p className="text-xs text-[#AAAAAA]">
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
                              ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-sm'
                              : 'bg-white/[0.03] border-white/[0.08] hover:border-[#007AFF]/40'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#F5F5F7] font-display">
                              {s.name}
                            </div>
                            <div className="text-[11px] text-[#AAAAAA]">
                              {s.desc}
                            </div>
                          </div>
                          {selectedCbse10Subject === s.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/25 text-[#007AFF] text-xs font-mono">
                      Selected: <strong>{cbse10Subjects.find(s => s.id === selectedCbse10Subject)?.name}</strong>.
                    </div>
                  </>
                )}

                {/* 2D. GATE Papers */}
                {selectedStream === 'gate' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#F5F5F7]">
                        Select your GATE Engineering Discipline
                      </h3>
                      <p className="text-xs text-[#AAAAAA]">
                        IIT Madras 100-mark paper pattern with MCQs, MSQs & NAT numericals.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 max-h-[280px] overflow-y-auto">
                      {gatePapers.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setSelectedGatePaper(p.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedGatePaper === p.id
                              ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-sm'
                              : 'bg-white/[0.03] border-white/[0.08] hover:border-[#007AFF]/40'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#F5F5F7] font-display">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-[#AAAAAA]">
                              {p.desc}
                            </div>
                          </div>
                          {selectedGatePaper === p.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/25 text-[#007AFF] text-xs font-mono">
                      Selected: <strong>{gatePapers.find(p => p.id === selectedGatePaper)?.name}</strong>.
                    </div>
                  </>
                )}

                {/* 2E. JEE Main Tracks */}
                {selectedStream === 'jee' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#F5F5F7]">
                        Select your JEE Main & Advanced Track
                      </h3>
                      <p className="text-xs text-[#AAAAAA]">
                        NTA CBT Pattern (300 Marks) with +4 / -1 marking and integer numericals.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 max-h-[280px] overflow-y-auto">
                      {jeeTracks.map((j) => (
                        <div
                          key={j.id}
                          onClick={() => setSelectedJeeTrack(j.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedJeeTrack === j.id
                              ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-sm'
                              : 'bg-white/[0.03] border-white/[0.08] hover:border-[#007AFF]/40'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#F5F5F7] font-display">
                              {j.name}
                            </div>
                            <div className="text-[11px] text-[#AAAAAA]">
                              {j.desc}
                            </div>
                          </div>
                          {selectedJeeTrack === j.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/25 text-[#007AFF] text-xs font-mono">
                      Selected: <strong>{jeeTracks.find(j => j.id === selectedJeeTrack)?.name}</strong>.
                    </div>
                  </>
                )}

                {/* 2F. SSC CGL Sections */}
                {selectedStream === 'ssc' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#F5F5F7]">
                        Select your SSC CGL Section Focus
                      </h3>
                      <p className="text-xs text-[#AAAAAA]">
                        Tier-1 & Tier-2 speed test format with 0.50 negative marking and shortcuts.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 max-h-[280px] overflow-y-auto">
                      {sscSections.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => setSelectedSscSection(s.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedSscSection === s.id
                              ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-sm'
                              : 'bg-white/[0.03] border-white/[0.08] hover:border-[#007AFF]/40'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#F5F5F7] font-display">
                              {s.name}
                            </div>
                            <div className="text-[11px] text-[#AAAAAA]">
                              {s.desc}
                            </div>
                          </div>
                          {selectedSscSection === s.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/25 text-[#007AFF] text-xs font-mono">
                      Selected: <strong>{sscSections.find(s => s.id === selectedSscSection)?.name}</strong>.
                    </div>
                  </>
                )}

                {/* 2G. BCA / MCA Semesters (1 to 6) */}
                {selectedStream === 'bca' && (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-display text-[#F5F5F7]">
                        Which BCA / MCA Semester are you in?
                      </h3>
                      <p className="text-xs text-[#AAAAAA]">
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
                              ? 'bg-[#007AFF] text-white shadow-md border border-[#007AFF]'
                              : 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] hover:border-[#007AFF]/40'
                          }`}
                        >
                          Semester {sem}
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/25 text-[#007AFF] text-xs font-mono">
                      Selected: <strong>Semester {selectedBcaSem} BCA / MCA</strong>.
                    </div>
                  </>
                )}

                {/* Back / Next Buttons for Step 2 */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="py-3 px-5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1 border border-[#AAAAAA]/30"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="flex-grow py-3 rounded-xl bg-[#007AFF] text-white hover:bg-[#0062CC] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                  <h3 className="text-xl font-bold font-display text-[#F5F5F7]">
                    What do you need right now?
                  </h3>
                  <p className="text-xs text-[#AAAAAA]">
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
                          ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-sm'
                          : 'bg-white/[0.03] border-white/[0.08] hover:border-[#007AFF]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          selectedGoal === g.id ? 'bg-[#007AFF] text-white' : 'bg-white/10 text-neutral-300'
                        }`}>
                          <g.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#F5F5F7] font-display">
                            {g.label}
                          </div>
                          <div className="text-[11px] text-[#AAAAAA] font-sans">
                            {g.desc}
                          </div>
                        </div>
                      </div>

                      {selectedGoal === g.id && (
                        <CheckCircle2 className="w-5 h-5 text-[#007AFF] shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="py-3 px-5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1 border border-[#AAAAAA]/30"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFinishWizard}
                    className="flex-grow py-3 rounded-xl bg-[#007AFF] text-white hover:bg-[#0062CC] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
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

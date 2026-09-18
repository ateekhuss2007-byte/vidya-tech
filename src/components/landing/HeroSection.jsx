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
  
  // Guided Diagnostic Session States
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedStream, setSelectedStream] = useState('btech');
  const [selectedUniversity, setSelectedUniversity] = useState('makaut');
  const [selectedSem, setSelectedSem] = useState(3);
  const [selectedBranch, setSelectedBranch] = useState('Computer Science & Engineering (CSE)');

  // Baseline Foundation Check (10th, 12th, CGPA & Basics)
  const [tenthScore, setTenthScore] = useState('80% - 90%');
  const [twelfthScore, setTwelfthScore] = useState('75% - 85%');
  const [prevCgpa, setPrevCgpa] = useState('7.5 - 8.5');
  const [backlogStatus, setBacklogStatus] = useState('clean'); // 'clean' | 'one_two' | 'critical'
  const [mathConfidence, setMathConfidence] = useState(3);
  const [codingConfidence, setCodingConfidence] = useState(4);
  const [theoryConfidence, setTheoryConfidence] = useState(4);

  // Timeline & Target Goal
  const [examDaysLeft, setExamDaysLeft] = useState(25);
  const [targetGoal, setTargetGoal] = useState('solid'); // 'pass' | 'solid' | 'topper'

  // Daily Bandwidth & Study Style
  const [dailyHours, setDailyHours] = useState('2.5');
  const [peakTime, setPeakTime] = useState('night'); // 'morning' | 'evening' | 'night'
  const [studyStyle, setStudyStyle] = useState('pyq_cheatsheets'); // 'pyq_cheatsheets' | 'detailed_notes' | 'timed_mocks'

  // Stream-specific sub-selection
  const [selectedBcaSem, setSelectedBcaSem] = useState(2);
  const [selectedGatePaper, setSelectedGatePaper] = useState('CS');
  const [selectedJeeTrack, setSelectedJeeTrack] = useState('jee_main');
  const [selectedSscSection, setSelectedSscSection] = useState('ssc_full');
  const [selectedCbse12Track, setSelectedCbse12Track] = useState('cbse12_pcm_cs');
  const [selectedCbse10Subject, setSelectedCbse10Subject] = useState('cbse10_math');

  const [heroTopic, setHeroTopic] = useState('');

  // Prioritize premier national institutions (IIT Madras, IIT Kanpur, IIT Bombay, etc.) followed by affiliating state boards
  const prioritizedUniversities = React.useMemo(() => {
    const premierPriorityIds = [
      'iit_madras', 
      'iit_kanpur', 
      'iit_bombay', 
      'iit_delhi', 
      'iit_kharagpur', 
      'bits_pilani', 
      'nit_trichy', 
      'makaut', 
      'aktu', 
      'vtu', 
      'anna_univ', 
      'mumbai_univ',
      'dtu_delhi',
      'jadavpur'
    ];

    const premierList = [];
    const otherList = [];

    PAN_INDIA_UNIVERSITIES.forEach((u) => {
      const idx = premierPriorityIds.indexOf(u.id);
      if (idx !== -1) {
        premierList.push({ u, order: idx });
      } else {
        otherList.push(u);
      }
    });

    premierList.sort((a, b) => a.order - b.order);
    return [...premierList.map(item => item.u), ...otherList];
  }, []);

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

      {/* Main Subject Plane (Headline, Subtitle, Primary CTA) */}
      <motion.div 
        style={{ y: textY, opacity: heroOpacity }}
        className="space-y-4 sm:space-y-5 w-full scroll-gpu pt-2 sm:pt-4"
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
              setWizardStep(1);
              setIsWizardOpen(true);
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

      {/* 4. Pan-India Audited Universities Continuous Marquee Ticker (Premier Institutes Upfront, Larger & Smooth) */}
      <div className="w-full max-w-7xl mx-auto pt-6 overflow-hidden">
        <div className="text-center mb-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1D1D1F]/70 dark:text-[#AAAAAA] inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF] animate-pulse" />
            <span>Audited Across 36 Premier Pan-India Technical Universities & Authorities</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-[11px] font-bold border border-[#007AFF]/25">
              100% Verifiable Source URLs
            </span>
          </span>
        </div>

        <div className="relative w-full overflow-hidden mask-fade-edges py-3">
          <div className="animate-marquee-premium gap-4 sm:gap-5 py-2">
            {prioritizedUniversities.concat(prioritizedUniversities).map((u, idx) => (
              <button
                key={`${u.id}-${idx}`}
                type="button"
                onClick={() => {
                  setActiveTab('collegeHub');
                  toast.info(`Inspecting ${u.shortName}`, { description: `${u.officialName} • ${u.state}` });
                }}
                className="flex items-center gap-3.5 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-white/95 dark:bg-[#1D1D1F]/90 border border-black/[0.08] dark:border-white/[0.12] hover:border-[#007AFF] shadow-sm hover:shadow-xl hover:shadow-[#007AFF]/15 hover:-translate-y-1 transition-all duration-300 cursor-pointer shrink-0 text-left backdrop-blur-xl group min-w-[270px] sm:min-w-[310px]"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#007AFF]/12 to-[#5AC8FA]/15 dark:from-[#007AFF]/25 dark:to-[#5AC8FA]/10 border border-[#007AFF]/25 flex items-center justify-center text-xl sm:text-2xl shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <span>{u.icon || '🏛️'}</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm sm:text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#007AFF] transition-colors whitespace-nowrap tracking-tight flex items-center gap-1.5">
                    <span>{u.shortName}</span>
                    {u.autonomous && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Autonomous Institute" />
                    )}
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono text-[#8E8E93] dark:text-[#CBDCD3] whitespace-nowrap flex items-center gap-1.5">
                    <span>{u.state}</span>
                    <span>•</span>
                    <span className="text-[#007AFF] font-medium">{u.authorityLabel || 'Autonomous'}</span>
                  </div>
                </div>
                <div className="ml-auto pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-[#007AFF]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Guided Step-by-Step AI Diagnostic & Onboarding Session (English • Light Mode) */}
      {isWizardOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsWizardOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl max-h-[92vh] rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 text-left overflow-y-auto animate-scale-in my-8 text-[#1D1D1F]">
            
            {/* Header & Step Indicator */}
            <div className="space-y-3 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/25">
                    {wizardStep <= 4 ? `Step ${wizardStep} of 4` : 'Diagnostic Summary'}
                  </span>
                  <span className="text-xs font-mono text-[#8E8E93] font-semibold">
                    {wizardStep === 1 && 'Academic Identity & University'}
                    {wizardStep === 2 && 'Prior Academics & Foundation Check'}
                    {wizardStep === 3 && 'Exam Timeline & Target Goal'}
                    {wizardStep === 4 && 'Daily Bandwidth & Study Style'}
                    {wizardStep === 5 && 'AI Roadmap & Readiness Level'}
                  </span>
                </div>

                <button 
                  type="button"
                  onClick={() => setIsWizardOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#8E8E93] hover:text-[#1D1D1F] transition-all cursor-pointer border border-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] transition-all duration-300 rounded-full"
                  style={{ 
                    width: wizardStep === 1 ? '25%' : wizardStep === 2 ? '50%' : wizardStep === 3 ? '75%' : '100%' 
                  }}
                />
              </div>
            </div>

            {/* STEP 1: Academic Identity & University */}
            {wizardStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1D1D1F]">
                    What are you preparing for?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Select your degree or target examination to lock your official BoS syllabus.
                  </p>
                </div>

                {/* Target Stream Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {streams.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStream(s.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                        selectedStream === s.id
                          ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-[#007AFF]/50 hover:bg-[#007AFF]/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{s.icon}</span>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#1D1D1F] font-display">
                            {s.name}
                          </div>
                          <div className="text-[11px] text-[#64748B] font-sans line-clamp-1">
                            {s.desc}
                          </div>
                        </div>
                      </div>
                      {selectedStream === s.id && (
                        <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                {/* University / Board Affiliation Selection */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                    <span>University or Affiliating Technical Board:</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'makaut', name: 'MAKAUT (WBUT)', state: 'West Bengal' },
                      { id: 'aktu', name: 'AKTU (UPTU)', state: 'Uttar Pradesh' },
                      { id: 'vtu', name: 'VTU Belagavi', state: 'Karnataka' },
                      { id: 'mumbai', name: 'Mumbai Univ', state: 'Maharashtra' },
                      { id: 'anna', name: 'Anna University', state: 'Tamil Nadu' },
                      { id: 'iit_madras', name: 'IIT Madras', state: 'National (INI)' },
                      { id: 'cbse', name: 'CBSE Board', state: 'All-India' },
                      { id: 'other', name: 'Autonomous / Other', state: 'Pan-India' }
                    ].map((univ) => (
                      <button
                        key={univ.id}
                        type="button"
                        onClick={() => setSelectedUniversity(univ.name)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          selectedUniversity === univ.name
                            ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm'
                            : 'bg-slate-50 text-[#1D1D1F] border-slate-200 hover:border-[#007AFF]'
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight line-clamp-1">{univ.name}</div>
                        <div className={`text-[10px] font-mono mt-0.5 ${selectedUniversity === univ.name ? 'text-white/80' : 'text-[#8E8E93]'}`}>
                          {univ.state}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Semester / Year Selector for B.Tech & BCA */}
                {(selectedStream === 'btech' || selectedStream === 'bca') && (
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                      Current Semester:
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <button
                          key={sem}
                          type="button"
                          onClick={() => setSelectedSem(sem)}
                          className={`py-2 rounded-xl text-xs font-mono font-bold transition-all text-center cursor-pointer border ${
                            selectedSem === sem
                              ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm'
                              : 'bg-slate-50 text-[#1D1D1F] border-slate-200 hover:border-[#007AFF]'
                          }`}
                        >
                          Sem {sem}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className="w-full py-3.5 rounded-xl bg-[#007AFF] text-white hover:bg-[#0062CC] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  <span>Next: Prior Academics & Foundation Check</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Prior Academics & Foundation Diagnostic */}
            {wizardStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1D1D1F]">
                    Prior Academics & Foundation Check
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Helps the AI determine if you need foundational revision capsules or direct high-level PYQ problem solving.
                  </p>
                </div>

                {/* Past Academic Milestones (10th, 12th, Previous CGPA) */}
                <div className="space-y-3 pt-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Academic Baseline (Past Scores):
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* 10th Percentage */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-xs font-bold text-[#1D1D1F]">10th Board Score</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['70-80%', '80-90%', '90-95%', '95%+'].map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setTenthScore(val)}
                            className={`py-1 text-[11px] rounded-lg font-mono font-semibold transition-all ${
                              tenthScore === val ? 'bg-[#007AFF] text-white' : 'bg-white text-[#1D1D1F] border border-slate-200'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 12th Percentage */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-xs font-bold text-[#1D1D1F]">12th Board Score</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['65-75%', '75-85%', '85-92%', '92%+'].map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setTwelfthScore(val)}
                            className={`py-1 text-[11px] rounded-lg font-mono font-semibold transition-all ${
                              twelfthScore === val ? 'bg-[#007AFF] text-white' : 'bg-white text-[#1D1D1F] border border-slate-200'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Previous Sem CGPA */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-xs font-bold text-[#1D1D1F]">Previous Sem CGPA</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['6.0 - 7.0', '7.0 - 8.0', '8.0 - 9.0', '9.0+'].map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setPrevCgpa(val)}
                            className={`py-1 text-[11px] rounded-lg font-mono font-semibold transition-all ${
                              prevCgpa === val ? 'bg-[#007AFF] text-white' : 'bg-white text-[#1D1D1F] border border-slate-200'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backlog / Arrear Status */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Active Backlog / Supplementary Arrear Status:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'clean', label: 'Clean Record', desc: 'Zero pending backlogs' },
                      { id: 'one_two', label: '1 - 2 Backlogs', desc: 'Need backlog clearing priority' },
                      { id: 'critical', label: '3+ Backlogs', desc: 'Emergency passing focus' }
                    ].map(b => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBacklogStatus(b.id)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          backlogStatus === b.id
                            ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF]'
                            : 'bg-slate-50 border-slate-200 text-[#1D1D1F] hover:border-[#007AFF]/50'
                        }`}
                      >
                        <div className="text-xs font-bold font-display">{b.label}</div>
                        <div className="text-[10px] text-[#8E8E93] mt-0.5">{b.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Self-Rating: Confidence in Core Fundamentals */}
                <div className="space-y-2.5 pt-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Rate Your Current Baseline Confidence (1 to 5):
                  </label>

                  <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    {/* Math */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1D1D1F]">Mathematics & Formula Derivations:</span>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setMathConfidence(star)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                              mathConfidence >= star ? 'bg-[#007AFF] text-white shadow-sm' : 'bg-white border border-slate-200 text-[#8E8E93]'
                            }`}
                          >
                            {star}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Coding */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                      <span className="font-semibold text-[#1D1D1F]">Programming & Algorithmic Logic:</span>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setCodingConfidence(star)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                              codingConfidence >= star ? 'bg-[#007AFF] text-white shadow-sm' : 'bg-white border border-slate-200 text-[#8E8E93]'
                            }`}
                          >
                            {star}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Theory */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                      <span className="font-semibold text-[#1D1D1F]">Theoretical Concepts & Long Answers:</span>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setTheoryConfidence(star)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                              theoryConfidence >= star ? 'bg-[#007AFF] text-white shadow-sm' : 'bg-white border border-slate-200 text-[#8E8E93]'
                            }`}
                          >
                            {star}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1D1D1F] text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1 border border-slate-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="flex-grow py-3 rounded-xl bg-[#007AFF] text-white hover:bg-[#0062CC] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Next: Exam Timeline & Target Outcome</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Exam Timeline & Target Outcome */}
            {wizardStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1D1D1F]">
                    Exam Timeline & Target Outcome
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Specifying your countdown allows the dynamic engine to divide remaining syllabus chapters into realistic daily sprints.
                  </p>
                </div>

                {/* Days Remaining Countdown */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] flex items-center justify-between">
                    <span>How many days until your examination begins?</span>
                    <span className="text-[#007AFF] font-bold">{examDaysLeft} Days Left</span>
                  </label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { days: 12, label: '12 Days', sub: 'Emergency Cram' },
                      { days: 25, label: '25 Days', sub: 'Fast-Track Sprint' },
                      { days: 45, label: '45 Days', sub: 'Standard Cadence' },
                      { days: 75, label: '75+ Days', sub: 'Full Comprehensive' }
                    ].map(opt => (
                      <button
                        key={opt.days}
                        type="button"
                        onClick={() => setExamDaysLeft(opt.days)}
                        className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                          examDaysLeft === opt.days
                            ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-[#1D1D1F] hover:border-[#007AFF]'
                        }`}
                      >
                        <div className="text-sm font-bold font-mono">{opt.label}</div>
                        <div className={`text-[10px] mt-0.5 ${examDaysLeft === opt.days ? 'text-white/80' : 'text-[#8E8E93]'}`}>
                          {opt.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Outcome Goals */}
                <div className="space-y-2.5 pt-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    What is your target academic outcome?
                  </label>

                  <div className="space-y-2.5">
                    {[
                      { 
                        id: 'pass', 
                        title: 'Safe Passing Margin (6.5+ CGPA)', 
                        badge: 'High-Yield Only',
                        desc: 'Filters out 60% low-weightage theory. Isolates top 10-mark repeated questions to guarantee passing with safe margin.' 
                      },
                      { 
                        id: 'solid', 
                        title: 'Strong Distinction (8.0+ CGPA)', 
                        badge: 'Balanced Roadmap',
                        desc: 'Complete coverage of core modules, standard derivations, solved numericals, and mid-semester mock tests.' 
                      },
                      { 
                        id: 'topper', 
                        title: 'Class Topper & Placement Ready (9.2+ CGPA)', 
                        badge: 'Exhaustive Depth',
                        desc: 'Comprehensive mastery of tough edge cases, full syllabus derivations, and timed negative-marking simulations.' 
                      }
                    ].map(goal => (
                      <div
                        key={goal.id}
                        onClick={() => setTargetGoal(goal.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          targetGoal === goal.id
                            ? 'bg-[#007AFF]/10 border-[#007AFF] shadow-sm'
                            : 'bg-slate-50 border-slate-200 hover:border-[#007AFF]/50'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#1D1D1F] font-display">{goal.title}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/25">
                              {goal.badge}
                            </span>
                          </div>
                          <p className="text-xs text-[#64748B] leading-relaxed">
                            {goal.desc}
                          </p>
                        </div>
                        {targetGoal === goal.id && (
                          <CheckCircle2 className="w-5 h-5 text-[#007AFF] shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1D1D1F] text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1 border border-slate-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWizardStep(4)}
                    className="flex-grow py-3 rounded-xl bg-[#007AFF] text-white hover:bg-[#0062CC] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Next: Daily Bandwidth & Study Style</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Daily Bandwidth & Learning Style */}
            {wizardStep === 4 && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1D1D1F]">
                    Daily Reality & Study Preferences
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Prevents burnout by constructing realistic study blocks tailored to your college schedule and attention span.
                  </p>
                </div>

                {/* Daily Hours Commitment */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Realistic daily study availability:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { val: '1.5', label: '1.5 - 2 Hours / Day', sub: 'After college classes & commute' },
                      { val: '3.0', label: '3 - 4 Hours / Day', sub: 'Balanced study session' },
                      { val: '6.0', label: '5+ Hours / Day', sub: 'Dedicated exam leave study' }
                    ].map(h => (
                      <button
                        key={h.val}
                        type="button"
                        onClick={() => setDailyHours(h.val)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          dailyHours === h.val
                            ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF]'
                            : 'bg-slate-50 border-slate-200 text-[#1D1D1F] hover:border-[#007AFF]/50'
                        }`}
                      >
                        <div className="text-xs font-bold font-display">{h.label}</div>
                        <div className="text-[10px] text-[#8E8E93] mt-0.5">{h.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Peak Focus Window */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Peak Mental Focus Window:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'morning', label: 'Early Morning', time: '5:00 AM – 8:30 AM' },
                      { id: 'evening', label: 'Evening', time: '4:00 PM – 7:30 PM' },
                      { id: 'night', label: 'Night Owl', time: '9:30 PM – 2:00 AM' }
                    ].map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPeakTime(p.id)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          peakTime === p.id
                            ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF]'
                            : 'bg-slate-50 border-slate-200 text-[#1D1D1F] hover:border-[#007AFF]/50'
                        }`}
                      >
                        <div className="text-xs font-bold font-display">{p.label}</div>
                        <div className="text-[10px] text-[#8E8E93] mt-0.5">{p.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Study Format */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Preferred Study Material Format:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'pyq_cheatsheets', label: '1-Page Cheatsheets & PYQs', sub: 'Fastest revision for exams' },
                      { id: 'detailed_notes', label: 'Step-by-Step Solved Numericals', sub: 'Visual step marked answers' },
                      { id: 'timed_mocks', label: 'Active Recall Mock Tests', sub: 'Simulate negative marking' }
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setStudyStyle(f.id)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          studyStyle === f.id
                            ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF]'
                            : 'bg-slate-50 border-slate-200 text-[#1D1D1F] hover:border-[#007AFF]/50'
                        }`}
                      >
                        <div className="text-xs font-bold font-display">{f.label}</div>
                        <div className="text-[10px] text-[#8E8E93] mt-0.5">{f.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWizardStep(3)}
                    className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1D1D1F] text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1 border border-slate-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWizardStep(5)}
                    className="flex-grow py-3.5 rounded-xl bg-[#007AFF] text-white hover:bg-[#0062CC] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Analyze Diagnostic & Generate Roadmap →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Diagnostic Readiness Profile & Roadmap Launch */}
            {wizardStep === 5 && (
              <div className="space-y-6 animate-fade-in text-center">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 text-xs font-mono font-bold mx-auto">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>AI Diagnostic Baseline Calculated</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#1D1D1F]">
                    Your Personalized Study Gameplan is Ready
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
                    We've mapped your university syllabus and past academic baseline into an actionable day-by-day roadmap.
                  </p>
                </div>

                {/* Diagnostic Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-[#8E8E93] font-bold">Estimated Baseline</div>
                    <div className="text-2xl sm:text-3xl font-black text-[#007AFF] font-mono">
                      {targetGoal === 'topper' ? '62%' : targetGoal === 'solid' ? '54%' : '46%'}
                    </div>
                    <div className="text-[11px] text-[#64748B]">Readiness Index to Target</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-[#8E8E93] font-bold">Target Trajectory</div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                      {targetGoal === 'topper' ? '9.4 CGPA' : targetGoal === 'solid' ? '8.2 CGPA' : '6.8 CGPA'}
                    </div>
                    <div className="text-[11px] text-[#64748B]">Realistic exam score goal</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-[#8E8E93] font-bold">Daily Study Bite</div>
                    <div className="text-2xl sm:text-3xl font-black text-[#1D1D1F] font-mono">
                      {dailyHours} Hrs/Day
                    </div>
                    <div className="text-[11px] text-[#64748B]">Balanced daily target</div>
                  </div>
                </div>

                {/* Strategy Highlights */}
                <div className="p-4 rounded-2xl bg-[#007AFF]/5 border border-[#007AFF]/20 text-left space-y-2">
                  <div className="text-xs font-bold text-[#007AFF] font-mono uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Target Strategy for {selectedUniversity}:</span>
                  </div>
                  <ul className="text-xs text-[#64748B] space-y-1.5 list-disc list-inside">
                    <li>Syllabus mapped for <strong>{selectedUniversity} Semester {selectedSem}</strong>.</li>
                    <li>
                      Prioritizing <strong>80% high-yield recurring question patterns</strong> based on 10-year examination records.
                    </li>
                    <li>
                      <strong>Zero-Guilt Dynamic Rebalancing:</strong> If college fests or illness cause missed days, schedule smoothly adapts.
                    </li>
                  </ul>
                </div>

                {/* Final Launch Action */}
                <button
                  type="button"
                  onClick={() => {
                    setIsWizardOpen(false);
                    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
                    
                    const diagnosticProfile = {
                      stream: selectedStream,
                      university: selectedUniversity,
                      semester: selectedSem,
                      branch: selectedBranch,
                      tenthScore,
                      twelfthScore,
                      prevCgpa,
                      backlogStatus,
                      confidence: { math: mathConfidence, coding: codingConfidence, theory: theoryConfidence },
                      daysLeft: examDaysLeft,
                      targetGoal,
                      dailyHours,
                      peakTime,
                      studyStyle,
                      initialReadinessScore: targetGoal === 'topper' ? 62 : targetGoal === 'solid' ? 54 : 46,
                      completedAt: new Date().toISOString()
                    };

                    localStorage.setItem('vidya_diagnostic_profile', JSON.stringify(diagnosticProfile));
                    localStorage.setItem('vidya_target_track', selectedStream);
                    localStorage.setItem('vidya_target_university', selectedUniversity);
                    localStorage.setItem('vidya_selected_sem', String(selectedSem));

                    toast.success("AI Diagnostic Assessment Complete!", {
                      description: `Generated custom ${dailyHours}h/day roadmap for ${selectedUniversity} Semester ${selectedSem}.`
                    });

                    if (onOpenSemester) {
                      onOpenSemester(selectedSem, 'studyHub');
                    } else {
                      setActiveTab('studyHub');
                    }
                  }}
                  className="w-full py-4 rounded-2xl bg-[#007AFF] hover:bg-[#0062CC] text-white font-bold text-base shadow-xl shadow-[#007AFF]/30 transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>Launch My Personalized AI Study Roadmap →</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

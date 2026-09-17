import React, { useState, useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { 
  Search, 
  BookOpen, 
  GraduationCap, 
  FileCheck, 
  HelpCircle, 
  Layers, 
  Timer, 
  Mic, 
  Brain, 
  Network, 
  FileText, 
  Moon, 
  Sun, 
  ArrowRight,
  Sparkles,
  Command,
  Target,
  Building2
} from 'lucide-react';

const SEARCH_ITEMS = [
  // R-25 Semesters (NIT Autonomous / MAKAUT NEP 2020)
  { id: 'sem-1', category: 'R-25 B.Tech Semester', title: '1st Semester (CS101 C Prog, PH101 Physics, M101 Math-I, HU101 EVS, HU102 IKS)', type: 'semester', semNum: 1, tab: 'collegeHub' },
  { id: 'sem-2', category: 'R-25 B.Tech Semester', title: '2nd Semester (CS201 DSA, CS202 Intro AI, CS203 Digital Logic, CH201 Chem, M201 Math-II)', type: 'semester', semNum: 2, tab: 'collegeHub' },
  { id: 'sem-3', category: 'R-25 B.Tech Semester', title: '3rd Semester (CS301 COA, CS302 DAA, CS303 OS, CS304 Adv AI, EC(CS)301 IoT, Discrete Math)', type: 'semester', semNum: 3, tab: 'collegeHub' },
  { id: 'sem-4', category: 'R-25 B.Tech Semester', title: '4th Semester (CS401 DBMS, CS402 Networks, CS403 ML, CS404 Automata / TOC, Prob & Stats)', type: 'semester', semNum: 4, tab: 'collegeHub' },
  { id: 'sem-5', category: 'R-25 B.Tech Semester', title: '5th Semester (CS501 Software Engg, CS502 Java, CS503 Compiler/Crypto/Graphics, Soft Comp)', type: 'semester', semNum: 5, tab: 'collegeHub' },
  { id: 'sem-6', category: 'R-25 B.Tech Semester', title: '6th Semester (CS601 Web Tech, CS602 Deep Learning, CS603 Cloud/BigData/NLP, Cyber Law)', type: 'semester', semNum: 6, tab: 'collegeHub' },
  { id: 'sem-7', category: 'R-25 B.Tech Semester', title: '7th Semester (CS701 Blockchain/Robotics/Optimization, HRD & OB, IPR, Project-III)', type: 'semester', semNum: 7, tab: 'collegeHub' },
  { id: 'sem-8', category: 'R-25 B.Tech Semester', title: '8th Semester (CS881 Industry Internship/Entrepreneurship, CS882 Grand Viva)', type: 'semester', semNum: 8, tab: 'collegeHub' },

  // National Competitive Exam Streams
  { id: 'gate-cs', category: 'GATE 2027 (IIT Madras)', title: 'GATE CS / IT (Algorithms, OS, DBMS, Networks, TOC, Compiler)', type: 'tool', tab: 'mockTests', icon: FileCheck },
  { id: 'gate-da', category: 'GATE 2027 (IIT Madras)', title: 'GATE DA (Data Science & AI, ML, Python, Probability, DBMS)', type: 'tool', tab: 'mockTests', icon: FileCheck },
  { id: 'gate-ec', category: 'GATE 2027 (IIT Madras)', title: 'GATE EC (Electronics & Comm: Signals, Digital, Analog, EMF)', type: 'tool', tab: 'mockTests', icon: FileCheck },
  { id: 'jee-main', category: 'JEE CBT Simulator', title: 'JEE Main 300-Mark Full Mock (Physics, Chemistry & Maths CBT)', type: 'tool', tab: 'mockTests', icon: FileCheck },
  { id: 'jee-adv', category: 'JEE CBT Simulator', title: 'JEE Advanced Paper Simulator (IIT Multi-Correct MSQs & Numerical)', type: 'tool', tab: 'mockTests', icon: FileCheck },
  { id: 'ssc-cgl', category: 'Govt Job Exam', title: 'SSC CGL Tier-1 60-Min Speed Mock Test (100 Questions / 200 Marks)', type: 'tool', tab: 'mockTests', icon: FileCheck },

  // Core Subjects & Topics
  { id: 'sub-dsa', category: 'Core Subject', title: 'Data Structures & Algorithms (AVL Trees, Graphs, Sorting)', type: 'topic', topic: 'Data Structures & Algorithms (DSA)', tab: 'studyHub' },
  { id: 'sub-os', category: 'Core Subject', title: "Operating Systems (Banker's Algorithm, Paging, Deadlocks)", type: 'topic', topic: 'Operating Systems (OS)', tab: 'studyHub' },
  { id: 'sub-dbms', category: 'Core Subject', title: 'Database Management Systems (1NF-BCNF Normalization, SQL)', type: 'topic', topic: 'Database Management Systems (DBMS)', tab: 'studyHub' },
  { id: 'sub-cn', category: 'Core Subject', title: 'Computer Networks (Subnetting, CIDR, TCP 3-Way Handshake)', type: 'topic', topic: 'Computer Networks (CN)', tab: 'studyHub' },
  { id: 'sub-coa', category: 'Core Subject', title: 'Computer Organization & Architecture (Booth Algorithm, Cache)', type: 'topic', topic: 'Computer Organization & Architecture (COA)', tab: 'studyHub' },
  { id: 'sub-math', category: 'Core Subject', title: 'Linear Algebra & Calculus (Eigenvalues, Cayley-Hamilton)', type: 'topic', topic: 'Matrices & Determinants (Maths)', tab: 'studyHub' },

  // Platform Tools
  { id: 'tool-mock', category: 'Exam Tool', title: 'Mock Test Engine (Dynamic 3-Step Course & Subject Studio)', type: 'tool', tab: 'mockTests', icon: FileCheck },
  { id: 'tool-pyq', category: 'Prediction Tool', title: 'PYQ Predictor Vault (95% Yield Likelihood Matrix)', type: 'tool', tab: 'pyqVault', icon: Target },
  { id: 'tool-doubt', category: 'AI Tool', title: 'AI Instant Doubt Solver (Step Derivations & OCR)', type: 'tool', tab: 'doubtSolver', icon: HelpCircle },
  { id: 'tool-cards', category: 'Study Tool', title: 'Flashcard Studio (Anki SM-2 Spaced Repetition)', type: 'tool', tab: 'flashcards', icon: Layers },
  { id: 'tool-focus', category: 'Productivity', title: 'Pomodoro Focus Room (432Hz Alpha Waves & Rain Audio)', type: 'tool', tab: 'focusRoom', icon: Timer },
  { id: 'tool-viva', category: 'Lab Tool', title: 'AI Viva Voice Examiner (Speech Recognition Simulator)', type: 'tool', tab: 'vivaExaminer', icon: Mic },
  { id: 'tool-twin', category: 'AI Tool', title: 'Cognitive Memory Twin (Ebbinghaus Forgetting Curve)', type: 'tool', tab: 'digitalTwin', icon: Brain },
  { id: 'tool-dag', category: 'AI Tool', title: 'Knowledge Graph (Prerequisite Blocker Discovery)', type: 'tool', tab: 'conceptGraph', icon: Network },
  { id: 'tool-cheat', category: 'Study Tool', title: '1-Page Formula Cheat Sheets (High-Yield Matrices)', type: 'tool', tab: 'cheatSheets', icon: FileText }
];

export const CommandPalette = ({ 
  isOpen, 
  setIsOpen, 
  setActiveTab, 
  onSelectTopic,
  isDark,
  setIsDark
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Keyboard shortcut listener for Cmd + K or Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredItems = SEARCH_ITEMS.filter(item => {
    const q = query.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  const handleSelect = (item) => {
    setIsOpen(false);
    if (item.type === 'topic') {
      if (onSelectTopic) onSelectTopic(item.topic);
      setActiveTab('studyHub');
    } else if (item.type === 'semester') {
      setActiveTab('collegeHub', { semester: item.semNum });
    } else if (item.tab) {
      setActiveTab(item.tab);
    }
  };

  const handleKeyDownInList = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-fade-in" />
        <Dialog.Content className="fixed top-[15%] left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-2xl shadow-black/80 overflow-hidden text-neutral-200 outline-none animate-scale-in">
          
          {/* Search Header Input */}
          <div className="p-4 border-b border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center gap-3 bg-white dark:bg-[#1D1D1F]">
            <Search className="w-5 h-5 text-[#007AFF] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDownInList}
              placeholder="Search B.Tech Semesters, GATE Papers, Mock Tests, or Topics..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-neutral-500 focus:outline-none font-sans"
            />
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#F5F5F7] dark:bg-white/[0.06] text-[10px] font-mono text-neutral-400 border border-white/5">
              <kbd>ESC</kbd>
            </span>
          </div>

          {/* Results List */}
          <div className="p-2 overflow-y-auto max-h-[50vh] space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-neutral-500">
                No matching academic topics or tools found for "{query}".
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const Icon = item.icon || (item.type === 'semester' ? GraduationCap : BookOpen);

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-xl flex items-center justify-between gap-3 text-xs transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#007AFF]/15 text-white font-semibold border border-[#007AFF]/40 shadow-md shadow-[#007AFF]/25'
                        : 'text-neutral-300 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected 
                          ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25 font-bold' 
                          : 'bg-[#F5F5F7] dark:bg-white/[0.06] text-neutral-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="truncate font-medium text-white">{item.title}</div>
                        <div className="text-[10px] font-mono text-[#007AFF] uppercase tracking-wider">{item.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isSelected && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-[#007AFF]">
                          <span>Select</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Quick Keys Help */}
          <div className="p-3 border-t border-[#AAAAAA]/30 dark:border-white/[0.08] bg-white dark:bg-[#1D1D1F] flex items-center justify-between text-[11px] font-mono text-neutral-400 px-4">
            <div className="flex items-center gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>ESC Close</span>
            </div>
            {setIsDark && (
              <button
                onClick={() => setIsDark(!isDark)}
                className="hover:text-[#007AFF] text-neutral-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-[#007AFF]" /> : <Moon className="w-3.5 h-3.5 text-[#007AFF]" />}
                <span>Toggle Theme</span>
              </button>
            )}
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

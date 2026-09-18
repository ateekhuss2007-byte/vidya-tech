import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  HelpCircle, 
  Play, 
  Pause,
  RotateCcw, 
  Award, 
  GraduationCap, 
  Layers, 
  Eye, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Bookmark, 
  Sliders, 
  Download, 
  Printer, 
  FileText,
  Search,
  Shuffle,
  ArrowRight,
  ArrowLeft,
  Settings2,
  Hash,
  Timer,
  Calendar,
  Filter,
  Send
} from 'lucide-react';
import { COURSE_DEFINITIONS, generateDynamicMockPaper } from '../data/mockPaperDatabase';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export const MockTestEngine = ({ _user, initialSubject }) => {
  // Wizard & Configuration State
  // Step 1: Course/Stream selection
  // Step 2: Semester selection (Which semester?)
  // Step 3: Subject selection
  // Step 4: Marks Pattern & Duration (Optional)
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedStreamId, setSelectedStreamId] = useState('btech_makaut');
  const [selectedSemester, setSelectedSemester] = useState(3);
  const [selectedSubject, setSelectedSubject] = useState('Data Structures & Algorithms');
  const [paperFormat, setPaperFormat] = useState('official'); // 'official' | 'midterm' | 'rapid' | 'custom'
  const [customMarks, setCustomMarks] = useState(50);
  const [customDuration, setCustomDuration] = useState(90);
  const [subjectSearchQuery, setSubjectSearchQuery] = useState('');

  // Active Test State
  const [activeTestPaper, setActiveTestPaper] = useState(null);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Timer State
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(10800); // 3 hrs default
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Active selected course definition
  const currentCourse = COURSE_DEFINITIONS.find(c => c.id === selectedStreamId) || COURSE_DEFINITIONS[0];

  // Semester options generator tailored to current course
  const getSemesterOptions = (course) => {
    if (!course) return [];
    if (course.id === 'btech_makaut') {
      return [
        { sem: 1, label: 'Semester 1', year: '1st Year B.Tech', badge: 'SEM 01', desc: 'Engineering Math I, Chemistry, Basic Electrical' },
        { sem: 2, label: 'Semester 2', year: '1st Year B.Tech', badge: 'SEM 02', desc: 'Engineering Math II, Physics, C Programming' },
        { sem: 3, label: 'Semester 3', year: '2nd Year B.Tech', badge: 'SEM 03', desc: 'Data Structures & Algo, Discrete Math, Digital Logic, CO' },
        { sem: 4, label: 'Semester 4', year: '2nd Year B.Tech', badge: 'SEM 04', desc: 'Operating Systems, DAA, Computer Arch, Automata' },
        { sem: 5, label: 'Semester 5', year: '3rd Year B.Tech', badge: 'SEM 05', desc: 'DBMS, Compiler Design, Software Eng, Java OOPs' },
        { sem: 6, label: 'Semester 6', year: '3rd Year B.Tech', badge: 'SEM 06', desc: 'Computer Networks, Cloud Computing, Web Tech' },
        { sem: 7, label: 'Semester 7', year: '4th Year B.Tech', badge: 'SEM 07', desc: 'AI & Machine Learning, Cyber Security, IoT' },
        { sem: 8, label: 'Semester 8', year: '4th Year B.Tech', badge: 'SEM 08', desc: 'Deep Learning, Blockchain & Distributed Ledgers' },
        { sem: 'all', label: 'All Semesters', year: '1st - 4th Year', badge: 'ALL', desc: 'Full B.Tech 8-Semester curriculum and question papers' }
      ];
    }
    if (course.id === 'bca_college') {
      return [
        { sem: 1, label: 'Semester 1', year: '1st Year BCA', badge: 'SEM 01', desc: 'C Programming Fundamentals, Digital Logic' },
        { sem: 2, label: 'Semester 2', year: '1st Year BCA', badge: 'SEM 02', desc: 'Data Structures using C, Discrete Math Structures' },
        { sem: 3, label: 'Semester 3', year: '2nd Year BCA', badge: 'SEM 03', desc: 'Python Programming, DBMS (SQL)' },
        { sem: 4, label: 'Semester 4', year: '2nd Year BCA', badge: 'SEM 04', desc: 'Core Java & OOPs, Web Development' },
        { sem: 5, label: 'Semester 5', year: '3rd Year BCA', badge: 'SEM 05', desc: 'Computer Networks, Information Security' },
        { sem: 6, label: 'Semester 6', year: '3rd Year BCA', badge: 'SEM 06', desc: 'Cloud Architecture & Web Services' },
        { sem: 'all', label: 'All Semesters', year: 'Full Degree', badge: 'ALL', desc: 'All 6 Semesters BCA / MCA core curriculum' }
      ];
    }
    if (course.id === 'jee_main') {
      return [
        { sem: '11', label: 'Class 11th', year: 'XI Syllabus', badge: 'CLASS 11', desc: 'Mechanics, Physical Chem, Algebra & Calculus foundations' },
        { sem: '12', label: 'Class 12th', year: 'XII Syllabus', badge: 'CLASS 12', desc: 'Electrodynamics, Optics, Organic Chemistry, Calculus' },
        { sem: '11-12', label: 'Complete Syllabus', year: 'Class 11 + 12', badge: 'FULL CBT', desc: 'Full NTA 300-mark paper with 20 MCQs + 5 NAT per subject' }
      ];
    }
    if (course.id === 'cbse_12') {
      return [
        { sem: 'term1', label: 'Term 1 / Mid-Sem', year: 'Half-Yearly', badge: 'MID-TERM', desc: 'First half syllabus objective and conceptual questions' },
        { sem: '12', label: 'Final Board Exam', year: 'Annual Board', badge: 'BOARD 12', desc: 'Standard 80-mark Class 12 board blueprint with Section A-E' }
      ];
    }
    if (course.id === 'ssc_cgl') {
      return [
        { sem: 'Tier 1', label: 'Tier-1 Examination', year: 'Graduate Level', badge: 'TIER-1', desc: '200 Marks (100 Qs): Quant, Reasoning, English, GK' },
        { sem: 'Tier 2', label: 'Tier-2 Advanced', year: 'Mains Examination', badge: 'TIER-2', desc: 'Advanced quantitative, reasoning and English tests' }
      ];
    }
    return [
      { sem: 'all', label: 'All Modules / Terms', year: 'Full Curriculum', badge: 'ALL', desc: 'Comprehensive examination question bank' }
    ];
  };

  const semesterOptions = getSemesterOptions(currentCourse);

  const getSubjectCountForSem = (sem) => {
    if (sem === 'all' || sem === '11-12') return currentCourse.subjects.length;
    return currentCourse.subjects.filter(s => s.semester === sem || String(s.semester) === String(sem)).length;
  };

  // Auto-adapt if initialSubject prop is provided from Study Room
  useEffect(() => {
    if (initialSubject) {
      for (const c of COURSE_DEFINITIONS) {
        const match = c.subjects.find(s => 
          s.name.toLowerCase().includes(initialSubject.toLowerCase()) || 
          initialSubject.toLowerCase().includes(s.name.toLowerCase())
        );
        if (match) {
          setSelectedStreamId(c.id);
          if (match.semester) setSelectedSemester(match.semester);
          setSelectedSubject(match.name);
          setWizardStep(4);
          break;
        }
      }
    }
  }, [initialSubject]);

  // Handler: Submit Paper & Instant Grading
  const handleSubmitPaper = useCallback(() => {
    let score = 0;
    let totalMcq = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    if (activeTestPaper) {
      activeTestPaper.groups.forEach(g => {
        g.questions.forEach(q => {
          if (q.type === 'mcq') {
            totalMcq += q.marks;
            if (userAnswers[q.id]) {
              if (userAnswers[q.id] === q.correct) {
                score += q.marks;
                correctCount++;
              } else {
                // Negative marking penalty by exam type
                const penalty = selectedStreamId === 'ssc_cgl' 
                  ? 0.50 
                  : selectedStreamId === 'gate_2027' 
                    ? (q.marks === 1 ? 0.33 : 0.66) 
                    : selectedStreamId === 'jee_main' 
                      ? 1.0 
                      : 0;
                score = Math.max(0, score - penalty);
                incorrectCount++;
              }
            }
          }
        });
      });
    }

    setShowAnswers(true);
    setIsTimerRunning(false);
    setScoreResult({ score, totalMcq, correctCount, incorrectCount });
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    toast.success('Mock Paper Evaluated!', {
      description: `Final Score: ${score.toFixed(1)} Marks. Detailed step-marking rubric now visible.`
    });
  }, [activeTestPaper, userAnswers, selectedStreamId]);

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (activeTestPaper && isTimerRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds(prev => Math.max(0, prev - 1));
      }, 1000);
    } else if (timeLeftSeconds === 0 && activeTestPaper && !scoreResult) {
      handleSubmitPaper();
      toast.warning('Time Up! Mock test automatically submitted for evaluation.');
    }
    return () => clearInterval(interval);
  }, [activeTestPaper, isTimerRunning, timeLeftSeconds, scoreResult, handleSubmitPaper]);

  const formatTimer = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handler: Change Course (Step 1)
  const handleSelectCourse = (courseId) => {
    setSelectedStreamId(courseId);
    const targetCourse = COURSE_DEFINITIONS.find(c => c.id === courseId);
    if (targetCourse) {
      const semOpts = getSemesterOptions(targetCourse);
      const defaultSem = semOpts[0]?.sem || 1;
      setSelectedSemester(defaultSem);
      
      const semSubject = targetCourse.subjects.find(s => s.semester === defaultSem || defaultSem === 'all') || targetCourse.subjects[0];
      if (semSubject) {
        setSelectedSubject(semSubject.name);
      }
    }
    setSubjectSearchQuery('');
    setWizardStep(2); // Auto-advance to Step 2: Which Semester?
  };

  // Handler: Change Semester (Step 2)
  const handleSelectSemester = (sem) => {
    setSelectedSemester(sem);
    const semSubjects = (sem === 'all' || sem === '11-12')
      ? currentCourse.subjects
      : currentCourse.subjects.filter(s => s.semester === sem || String(s.semester) === String(sem));
    
    if (semSubjects.length > 0) {
      const alreadyMatches = semSubjects.some(s => s.name === selectedSubject);
      if (!alreadyMatches) {
        setSelectedSubject(semSubjects[0].name);
      }
    }
    setSubjectSearchQuery('');
    setWizardStep(3); // Auto-advance to Step 3: Subject Selection
  };

  // Handler: Change Subject (Step 3)
  const handleSelectSubject = (subjectName) => {
    setSelectedSubject(subjectName);
    setWizardStep(4); // Auto-advance to Step 4: Marks Pattern Selection
  };

  // Handler: Generate Paper using Dynamic Database Engine
  const handleGeneratePaper = (formatToUse = paperFormat) => {
    setIsEvaluating(true);
    const semLabel = selectedSemester && selectedSemester !== 'all' ? `Semester ${selectedSemester}` : 'Standard';
    toast.info(`Generating authentic ${currentCourse.name} (${semLabel}) paper...`, {
      description: `Loading subject questions for "${selectedSubject}" with ${formatToUse.toUpperCase()} pattern.`
    });

    setTimeout(() => {
      setIsEvaluating(false);
      try {
        const generatedPaper = generateDynamicMockPaper({
          streamId: selectedStreamId,
          subject: selectedSubject,
          semester: selectedSemester,
          paperFormat: formatToUse,
          customMarks: parseInt(customMarks, 10) || 50,
          customDuration: parseInt(customDuration, 10) || 90
        });

        setActiveTestPaper(generatedPaper);
        setActiveGroupIndex(0);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setMarkedForReview({});
        setShowAnswers(false);
        setScoreResult(null);

        // Parse duration in minutes to set countdown timer
        const durationMatch = generatedPaper.duration.match(/(\d+)/);
        const durationMins = durationMatch ? parseInt(durationMatch[1], 10) : 180;
        setTimeLeftSeconds(durationMins * 60);
        setIsTimerRunning(true);

        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        toast.success(`Authentic Examination Paper Generated (${generatedPaper.paperCode})!`);
      } catch (err) {
        console.error('Error generating mock paper:', err);
        toast.error('Failed to assemble paper. Please try again.');
      }
    }, 450);
  };

  // Handler: Shuffle / Re-roll new paper variation for same subject
  const handleShufflePaper = () => {
    if (!activeTestPaper) return;
    toast.info('Shuffling question pool to create a fresh paper set...');
    handleGeneratePaper(activeTestPaper.format || paperFormat);
  };

  // Handler: Download Clean Printable A4 PDF
  const handleDownloadPDF = (includeSolutions = false) => {
    if (!activeTestPaper) {
      toast.error('Please generate a paper first before downloading!');
      return;
    }

    toast.info('Preparing Official Examination PDF...', {
      description: includeSolutions ? 'Generating Question Paper with Model Solutions & Marking Scheme.' : 'Generating Standard Examination Paper (Printable A4).'
    });

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Popup blocker prevented opening PDF window. Please allow popups.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${activeTestPaper.title} - VIDYA AI Official Paper</title>
        <style>
          @page { size: A4; margin: 18mm; }
          body { font-family: 'Times New Roman', serif; color: #111; line-height: 1.4; padding: 10px; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 15px; }
          .inst-box { border: 1px solid #444; padding: 10px; margin-bottom: 20px; font-size: 13px; background: #fafafa; }
          .meta-row { display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 8px; font-size: 14px; }
          .group-header { font-weight: bold; font-size: 15px; text-decoration: underline; margin-top: 20px; margin-bottom: 8px; text-transform: uppercase; }
          .q-block { margin-bottom: 15px; page-break-inside: avoid; font-size: 14px; }
          .q-text { font-weight: 600; margin-bottom: 4px; }
          .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-left: 20px; margin-top: 4px; }
          .solution-box { background: #f0fdf4; border-left: 4px solid #16a34a; padding: 8px; margin-top: 6px; font-family: monospace; font-size: 12px; }
          .watermark { position: fixed; bottom: 10px; right: 10px; font-size: 10px; color: #888; font-family: sans-serif; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2 style="margin: 0; text-transform: uppercase; font-size: 19px;">${activeTestPaper.courseName || currentCourse.name}</h2>
          <h3 style="margin: 4px 0; font-size: 16px;">${activeTestPaper.title}</h3>
          <div style="font-size: 13px; margin-top: 4px;">${activeTestPaper.semester && activeTestPaper.semester !== 'All' ? `Semester: <strong>Semester ${activeTestPaper.semester}</strong> | ` : ''}Subject: <strong>${activeTestPaper.subject}</strong> | Paper Code: <strong>${activeTestPaper.paperCode}</strong></div>
        </div>

        <div class="meta-row">
          <div>Time Allowed: <strong>${activeTestPaper.duration}</strong></div>
          <div>Roll No: ____________________</div>
          <div>Full Marks: <strong>${activeTestPaper.totalMarks}</strong></div>
        </div>

        <div class="inst-box">
          <strong>GENERAL INSTRUCTIONS:</strong>
          <ul style="margin: 4px 0 0 0; padding-left: 20px;">
            <li>The figures in the margin indicate full marks for the questions.</li>
            <li>Candidates are required to give their answers in their own words as far as practicable.</li>
            <li>Use of scientific calculators is permitted where required by university regulations.</li>
            ${includeSolutions ? '<li style="color: green;"><strong>[OFFICIAL MODEL ANSWER KEY & MARKING SCHEME INCLUDED]</strong></li>' : ''}
          </ul>
        </div>

        ${activeTestPaper.groups.map((group) => `
          <div class="group-header">${group.name}</div>
          <div style="font-size: 12px; font-style: italic; margin-bottom: 10px;">${group.instructions || ''}</div>
          
          ${group.questions.map((q) => `
            <div class="q-block">
              <div class="q-text">
                <span>${q.text}</span>
                <span style="float: right; font-weight: bold;">[${q.marks} Mark${q.marks > 1 ? 's' : ''}]</span>
              </div>
              
              ${q.subparts ? `
                <ul style="margin: 4px 0; padding-left: 25px; font-size: 13px;">
                  ${q.subparts.map(sp => `<li>${sp}</li>`).join('')}
                </ul>
              ` : ''}

              ${q.type === 'mcq' && q.options ? `
                <div class="options-grid">
                  ${q.options.map(opt => `<div>${opt}</div>`).join('')}
                </div>
              ` : ''}

              ${includeSolutions ? `
                <div class="solution-box">
                  <strong>Model Answer / Rubric:</strong><br/>
                  ${q.correct ? `<strong>Correct Option:</strong> ${q.correct}<br/>` : ''}
                  ${q.explanation || q.modelAnswer || 'Step-marking applied based on standard derivation and syllabus rubrics.'}
                </div>
              ` : ''}
            </div>
          `).join('')}
        `).join('')}

        <div class="watermark">Generated via VIDYA AI Cognitive Test Engine • ${new Date().toLocaleDateString()}</div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 400);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    toast.success('Question Paper PDF Ready for Download / Printing!');
  };

  const handleSelectOption = (questionId, option) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleTextAnswerChange = (questionId, text) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: text }));
  };

  const toggleMarkForReview = (questionId) => {
    setMarkedForReview(prev => ({ ...prev, [questionId]: !prev[questionId] }));
    toast.info('Question marked for review.');
  };

  // Filtered subjects for Step 3 (scoped to selected semester)
  const availableSubjectsForSem = (selectedSemester === 'all' || selectedSemester === '11-12')
    ? currentCourse.subjects
    : currentCourse.subjects.filter(s => s.semester === selectedSemester || String(s.semester) === String(selectedSemester));

  const subjectsToDisplay = availableSubjectsForSem.length > 0 ? availableSubjectsForSem : currentCourse.subjects;

  const filteredSubjects = subjectsToDisplay.filter(s => 
    s.name.toLowerCase().includes(subjectSearchQuery.toLowerCase()) ||
    (s.code && s.code.toLowerCase().includes(subjectSearchQuery.toLowerCase()))
  );

  const currentQuestions = activeTestPaper ? activeTestPaper.groups[activeGroupIndex].questions : [];
  const currentQ = currentQuestions[currentQuestionIndex] || currentQuestions[0];

  return (
    <div className="w-full fluid-container py-6 sm:py-8 animate-fade-in space-y-6">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#AAAAAA]/30 dark:border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-mono font-bold mb-2 border border-[#007AFF]/30 shadow-md shadow-[#007AFF]/25">
            <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
            <span>Autonomous Examination Engine • 4-Step Setup</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            Full-Length Mock Paper Generator
          </h1>
          <p className="text-xs sm:text-sm text-[#1D1D1F]/70 dark:text-[#AAAAAA] mt-1 max-w-2xl font-sans">
            Configure your Course, pick your Semester, select your Subject, and adjust your Marks Pattern to generate authentic, university-grade question papers with step rubrics and PDF export.
          </p>
        </div>

        {/* Global Action: Return to Setup Wizard if currently in active test */}
        {activeTestPaper && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTestPaper(null)}
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Settings2 className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>Change Course / Semester</span>
            </button>
            <button
              onClick={handleShufflePaper}
              className="px-4 py-2 rounded-xl bg-[#007AFF]/10 hover:bg-[#007AFF]/20 text-[#007AFF] border border-[#007AFF]/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>New Set (Shuffle)</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4-STEP SETUP WIZARD (Displayed when no test is active or when configuring) */}
      {/* ========================================================================= */}
      {!activeTestPaper && (
        <div className="space-y-6">
          
          {/* Step Navigation Progress Bar */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center justify-between gap-2 overflow-x-auto">
            
            {/* Step 1 Pill: Course */}
            <button
              onClick={() => setWizardStep(1)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                wizardStep === 1 
                  ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25' 
                  : 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                wizardStep === 1 ? 'bg-[#007AFF] text-white' : 'bg-[#F5F5F7] dark:bg-white/[0.04] text-[#1D1D1F]/60 dark:text-[#AAAAAA]'
              }`}>
                1
              </div>
              <span>1. Course</span>
              {currentCourse && <span className="opacity-80 hidden md:inline">({currentCourse.name.split(' ')[0]})</span>}
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />

            {/* Step 2 Pill: Semester */}
            <button
              onClick={() => setWizardStep(2)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                wizardStep === 2 
                  ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25' 
                  : 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                wizardStep === 2 ? 'bg-[#007AFF] text-white' : 'bg-[#F5F5F7] dark:bg-white/[0.04] text-[#1D1D1F]/60 dark:text-[#AAAAAA]'
              }`}>
                2
              </div>
              <span>2. Semester</span>
              {selectedSemester && <span className="opacity-80 hidden md:inline">({selectedSemester === 'all' ? 'All' : `Sem ${selectedSemester}`})</span>}
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />

            {/* Step 3 Pill: Subject */}
            <button
              onClick={() => setWizardStep(3)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                wizardStep === 3 
                  ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25' 
                  : 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                wizardStep === 3 ? 'bg-[#007AFF] text-white' : 'bg-[#F5F5F7] dark:bg-white/[0.04] text-[#1D1D1F]/60 dark:text-[#AAAAAA]'
              }`}>
                3
              </div>
              <span>3. Subject</span>
              {selectedSubject && <span className="opacity-80 hidden md:inline">({selectedSubject.split(' ')[0]})</span>}
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />

            {/* Step 4 Pill: Marks Pattern */}
            <button
              onClick={() => setWizardStep(4)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                wizardStep === 4 
                  ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25' 
                  : 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                wizardStep === 4 ? 'bg-[#007AFF] text-white' : 'bg-[#F5F5F7] dark:bg-white/[0.04] text-[#1D1D1F]/60 dark:text-[#AAAAAA]'
              }`}>
                4
              </div>
              <span>4. Marks Pattern</span>
            </button>

          </div>

          {/* STEP 1: COURSE SELECTION */}
          {wizardStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#007AFF]" />
                    <span>Step 1: Which course do you take?</span>
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Select your degree, academic curriculum, or target competitive examination.
                  </p>
                </div>
                <button
                  onClick={() => setWizardStep(2)}
                  className="px-4 py-2 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-md shadow-[#007AFF]/25"
                >
                  <span>Next: Choose Semester</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {COURSE_DEFINITIONS.map((course) => {
                  const isSelected = selectedStreamId === course.id;
                  return (
                    <motion.div
                      key={course.id}
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectCourse(course.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#F5F5F7] dark:bg-white/[0.04] border-[#007AFF] shadow-md shadow-[#007AFF]/25 ring-1 ring-[#007AFF]'
                          : 'bg-white dark:bg-[#1D1D1F] border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/50 hover:bg-[#F5F5F7] dark:bg-white/[0.04]/80'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-3xl p-2 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.06] border border-white/5">{course.boardLogo}</span>
                          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#F5F5F7] dark:bg-white/[0.06] text-neutral-300 border border-white/5">
                            {course.category}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-bold text-base text-[#1D1D1F] dark:text-[#F5F5F7]">{course.name}</h3>
                          <p className="text-xs text-neutral-400 mt-0.5">{course.standard}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center justify-between text-xs">
                        <div className="text-[11px] font-mono text-[#007AFF]">
                          {course.defaultMarks} Marks • {course.defaultDuration} Mins
                        </div>
                        {isSelected ? (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#007AFF]">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Selected</span>
                          </div>
                        ) : (
                          <span className="text-[#1D1D1F]/60 dark:text-[#AAAAAA] text-xs flex items-center gap-1 group-hover:text-[#007AFF]">
                            Select <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SEMESTER SELECTION (EXPLICIT STEP AS REQUESTED) */}
          {wizardStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#007AFF]" />
                    <span>Step 2: Which Semester are you preparing for?</span>
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Select your semester or academic term for <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">{currentCourse.name}</strong> to view matching syllabus and question papers.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-3.5 py-2 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Course</span>
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="px-4 py-2 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#007AFF]/25"
                  >
                    <span>Next: Choose Subject</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Semester Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {semesterOptions.map((item) => {
                  const isSelected = selectedSemester === item.sem || String(selectedSemester) === String(item.sem);
                  const subCount = getSubjectCountForSem(item.sem);
                  return (
                    <motion.div
                      key={String(item.sem)}
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectSemester(item.sem)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative ${
                        isSelected
                          ? 'bg-[#F5F5F7] dark:bg-white/[0.04] border-[#007AFF] shadow-md shadow-[#007AFF]/25 ring-1 ring-[#007AFF]'
                          : 'bg-white dark:bg-[#1D1D1F] border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/50 hover:bg-[#F5F5F7] dark:bg-white/[0.04]/80'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F5F5F7] dark:bg-white/[0.06] text-[#007AFF] border border-[#007AFF]/20">
                            {item.badge}
                          </span>
                          <span className="text-[11px] font-sans text-neutral-400">
                            {item.year}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-bold text-base text-[#1D1D1F] dark:text-[#F5F5F7]">{item.label}</h3>
                          <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-neutral-400">
                          {subCount} {subCount === 1 ? 'Subject' : 'Subjects'} available
                        </span>
                        {isSelected ? (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#007AFF]">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Selected</span>
                          </div>
                        ) : (
                          <span className="text-[#1D1D1F]/60 dark:text-[#AAAAAA] text-xs flex items-center gap-1 group-hover:text-[#007AFF]">
                            Select <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: SUBJECT SELECTION */}
          {wizardStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#007AFF]" />
                    <span>Step 3: Select Subject ({selectedSemester && selectedSemester !== 'all' ? `Semester ${selectedSemester}` : 'All Semesters'})</span>
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Syllabus-grounded question papers for <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">{currentCourse.name}</strong> • {selectedSemester && selectedSemester !== 'all' ? `Semester ${selectedSemester}` : 'Full Course'}.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="px-3.5 py-2 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Semester</span>
                  </button>
                  <button
                    onClick={() => setWizardStep(4)}
                    className="px-4 py-2 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#007AFF]/25"
                  >
                    <span>Next: Marks Pattern</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Semester Switcher Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-mono text-[#1D1D1F]/60 dark:text-[#AAAAAA] shrink-0 flex items-center gap-1 mr-1">
                  <Filter className="w-3 h-3 text-[#007AFF]" /> Switch Sem:
                </span>
                {semesterOptions.map((opt) => {
                  const isAct = selectedSemester === opt.sem || String(selectedSemester) === String(opt.sem);
                  return (
                    <button
                      key={String(opt.sem)}
                      onClick={() => {
                        setSelectedSemester(opt.sem);
                        const semSubs = (opt.sem === 'all' || opt.sem === '11-12')
                          ? currentCourse.subjects
                          : currentCourse.subjects.filter(s => s.semester === opt.sem || String(s.semester) === String(opt.sem));
                        if (semSubs.length > 0 && !semSubs.some(s => s.name === selectedSubject)) {
                          setSelectedSubject(semSubs[0].name);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                        isAct
                          ? 'bg-[#007AFF] text-white font-bold shadow-md shadow-[#007AFF]/25'
                          : 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08]'
                      }`}
                    >
                      {opt.label.replace('Semester ', 'Sem ')}
                    </button>
                  );
                })}
              </div>

              {/* Subject Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder={`Search subjects in ${currentCourse.name}... (e.g. Operating Systems, Networks, Math)`}
                  value={subjectSearchQuery}
                  onChange={(e) => setSubjectSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F5F5F7] text-xs placeholder:text-[#AAAAAA] outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF]"
                />
              </div>

              {/* Subjects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSubjects.map((sub, idx) => {
                  const isSelected = selectedSubject === sub.name;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectSubject(sub.name)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#F5F5F7] dark:bg-white/[0.04] border-[#007AFF] shadow-md shadow-[#007AFF]/25 ring-1 ring-[#007AFF]'
                          : 'bg-white dark:bg-[#1D1D1F] border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/50 hover:bg-[#F5F5F7] dark:bg-white/[0.04]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {sub.code && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F5F7] dark:bg-white/[0.06] text-[#007AFF] border border-white/5">
                              {sub.code}
                            </span>
                          )}
                          {sub.semester && (
                            <span className="text-[10px] font-mono text-neutral-400">
                              Sem {sub.semester}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-[#1D1D1F] dark:text-[#F5F5F7]">{sub.name}</h4>
                      </div>

                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                        isSelected ? 'bg-[#007AFF] border-[#007AFF] text-white' : 'border-neutral-600'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: MARKS PATTERN & DURATION (OPTIONAL POINT) */}
          {wizardStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#007AFF]" />
                    <span>Step 4: Marks Pattern & Duration (Optional)</span>
                  </h2>
                  <p className="text-xs text-neutral-400">
                    By default, the standard university blueprint is applied. You can pick an assessment format or configure custom marks.
                  </p>
                </div>

                <button
                  onClick={() => setWizardStep(3)}
                  className="px-3.5 py-2 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Subject</span>
                </button>
              </div>

              {/* Format Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Official Blueprint */}
                <div
                  onClick={() => setPaperFormat('official')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    paperFormat === 'official'
                      ? 'bg-[#F5F5F7] dark:bg-white/[0.04] border-[#007AFF] shadow-md shadow-[#007AFF]/25 ring-1 ring-[#007AFF]'
                      : 'bg-white dark:bg-[#1D1D1F] border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#007AFF] font-bold">Recommended</span>
                      {paperFormat === 'official' && <CheckCircle2 className="w-4 h-4 text-[#007AFF]" />}
                    </div>
                    <h4 className="font-bold text-sm text-[#1D1D1F] dark:text-[#F5F5F7]">🏛️ Official Board Blueprint</h4>
                    <p className="text-xs text-neutral-400">
                      Standard {currentCourse.defaultMarks} Marks ({currentCourse.defaultDuration} Mins) with Group A (MCQs), Group B (Short), and Group C (Long).
                    </p>
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-slate-800 dark:text-neutral-200 bg-[#F5F5F7] dark:bg-white/[0.06] px-2.5 py-1 rounded-lg">
                    Full Sem / Board Exam
                  </div>
                </div>

                {/* 2. Mid-Term Assessment */}
                <div
                  onClick={() => setPaperFormat('midterm')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    paperFormat === 'midterm'
                      ? 'bg-[#F5F5F7] dark:bg-white/[0.04] border-[#007AFF] shadow-md shadow-[#007AFF]/25 ring-1 ring-[#007AFF]'
                      : 'bg-white dark:bg-[#1D1D1F] border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#1D1D1F]/60 dark:text-[#AAAAAA] font-bold">Internal / CA</span>
                      {paperFormat === 'midterm' && <CheckCircle2 className="w-4 h-4 text-[#007AFF]" />}
                    </div>
                    <h4 className="font-bold text-sm text-[#1D1D1F] dark:text-[#F5F5F7]">📝 Mid-Term Assessment</h4>
                    <p className="text-xs text-neutral-400">
                      30 Marks (60 Mins). Includes 10 MCQs (10m) + 4 Analytical Descriptive questions (20m).
                    </p>
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-slate-800 dark:text-neutral-200 bg-[#F5F5F7] dark:bg-white/[0.06] px-2.5 py-1 rounded-lg">
                    Class Test & Mid-Sem
                  </div>
                </div>

                {/* 3. Rapid Diagnostic Sprint */}
                <div
                  onClick={() => setPaperFormat('rapid')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    paperFormat === 'rapid'
                      ? 'bg-[#F5F5F7] dark:bg-white/[0.04] border-[#007AFF] shadow-md shadow-[#007AFF]/25 ring-1 ring-[#007AFF]'
                      : 'bg-white dark:bg-[#1D1D1F] border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#1D1D1F]/60 dark:text-[#AAAAAA] font-bold">High Speed</span>
                      {paperFormat === 'rapid' && <CheckCircle2 className="w-4 h-4 text-[#007AFF]" />}
                    </div>
                    <h4 className="font-bold text-sm text-[#1D1D1F] dark:text-[#F5F5F7]">⚡ Rapid Concept Sprint</h4>
                    <p className="text-xs text-neutral-400">
                      15 Marks (20 Mins). 15 Fast Concept Diagnostic MCQs for quick revision and recall.
                    </p>
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-slate-800 dark:text-neutral-200 bg-[#F5F5F7] dark:bg-white/[0.06] px-2.5 py-1 rounded-lg">
                    Daily 20-Min Drill
                  </div>
                </div>

                {/* 4. Custom Marks & Time */}
                <div
                  onClick={() => setPaperFormat('custom')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    paperFormat === 'custom'
                      ? 'bg-[#F5F5F7] dark:bg-white/[0.04] border-[#007AFF] shadow-md shadow-[#007AFF]/25 ring-1 ring-[#007AFF]'
                      : 'bg-white dark:bg-[#1D1D1F] border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#007AFF] font-bold">Custom Blueprint</span>
                      {paperFormat === 'custom' && <CheckCircle2 className="w-4 h-4 text-[#007AFF]" />}
                    </div>
                    <h4 className="font-bold text-sm text-[#1D1D1F] dark:text-[#F5F5F7]">🛠️ Custom Marks & Time</h4>
                    <p className="text-xs text-neutral-400">
                      Specify your own custom Total Marks and Exam Duration.
                    </p>
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-slate-800 dark:text-neutral-200 bg-[#F5F5F7] dark:bg-white/[0.06] px-2.5 py-1 rounded-lg">
                    User Configured
                  </div>
                </div>

              </div>

              {/* Custom Configuration Inputs (If Custom Format selected) */}
              {paperFormat === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#007AFF]/30 space-y-4"
                >
                  <div className="text-xs font-mono font-bold text-[#007AFF] uppercase flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    <span>Enter Your Custom Pattern Parameters</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-neutral-300 font-bold flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-[#007AFF]" />
                        <span>Enter Total Marks:</span>
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="300"
                        value={customMarks}
                        onChange={(e) => setCustomMarks(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F5F5F7] text-xs font-mono outline-none focus:border-[#007AFF]"
                        placeholder="e.g. 50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-neutral-300 font-bold flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5 text-[#007AFF]" />
                        <span>Enter Duration (Minutes):</span>
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="360"
                        value={customDuration}
                        onChange={(e) => setCustomDuration(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F5F5F7] text-xs font-mono outline-none focus:border-[#007AFF]"
                        placeholder="e.g. 90"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Summary & Final Launch Box */}
              <div className="p-6 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-[#007AFF] font-bold">Ready to Assemble:</div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {currentCourse.name} • {selectedSemester && selectedSemester !== 'all' ? `Semester ${selectedSemester}` : 'Full Curriculum'} • {selectedSubject}
                  </h3>
                  <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-3 pt-1">
                    <span>Semester: <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">{selectedSemester && selectedSemester !== 'all' ? `Sem ${selectedSemester}` : 'All Semesters'}</strong></span>
                    <span>•</span>
                    <span>Format: <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">{paperFormat.toUpperCase()}</strong></span>
                    <span>•</span>
                    <span>Total Marks: <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">{paperFormat === 'custom' ? customMarks : paperFormat === 'midterm' ? 30 : paperFormat === 'rapid' ? 15 : currentCourse.defaultMarks}</strong></span>
                    <span>•</span>
                    <span>Time: <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">{paperFormat === 'custom' ? `${customDuration} Mins` : paperFormat === 'midterm' ? '60 Mins' : paperFormat === 'rapid' ? '20 Mins' : `${currentCourse.defaultDuration} Mins`}</strong></span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleGeneratePaper()}
                  disabled={isEvaluating}
                  className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white font-display font-extrabold text-xs sm:text-sm shadow-md shadow-[#007AFF]/25 flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Generate Examination Paper</span>
                </motion.button>
              </div>

            </motion.div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTIVE EXAMINATION PAPER VIEW */}
      {/* ========================================================================= */}
      {activeTestPaper && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (8 cols): Active Question & Answering Stage */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Header info with PDF Download actions & Live Timer */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono text-[#007AFF]">
                  {activeTestPaper.courseName || currentCourse.name} • {activeTestPaper.semester && activeTestPaper.semester !== 'All' ? `Semester ${activeTestPaper.semester}` : 'Full Curriculum'} • Code: {activeTestPaper.paperCode}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5">
                  {activeTestPaper.title}
                </h2>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Live Timer Pill */}
                <div className="px-3.5 py-1.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] text-xs font-mono font-bold text-[#007AFF] flex items-center gap-2 border border-[#007AFF]/30 shadow-md shadow-[#007AFF]/25">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(timeLeftSeconds)}</span>
                  <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)} 
                    title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
                    className="hover:text-white transition-colors"
                  >
                    {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                </div>

                <button
                  onClick={() => handleDownloadPDF(false)}
                  title="Download standard question paper PDF for offline practice"
                  className="px-3 py-1.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>PDF</span>
                </button>

                <button
                  onClick={() => handleDownloadPDF(true)}
                  title="Download question paper with full step-marking model answer key"
                  className="px-3 py-1.5 rounded-xl bg-[#007AFF]/10 text-[#007AFF] hover:bg-[#007AFF]/20 border border-[#007AFF]/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF + Solutions</span>
                </button>
              </div>
            </div>

            {/* Section / Group Tabs with Sliding Pill */}
            <div className="flex items-center gap-2 border-b border-[#AAAAAA]/30 dark:border-white/[0.08] pb-2 overflow-x-auto">
              {activeTestPaper.groups.map((group, idx) => {
                const isActive = activeGroupIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveGroupIndex(idx);
                      setCurrentQuestionIndex(0);
                    }}
                    className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors duration-150 z-10 shrink-0 cursor-pointer ${
                      isActive
                        ? 'text-white'
                        : 'bg-white dark:bg-[#1D1D1F] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] border border-[#AAAAAA]/30 dark:border-white/[0.08]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="groupTogglePill"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 bg-[#007AFF] rounded-xl shadow-md shadow-[#007AFF]/25 -z-10"
                      />
                    )}
                    <span>{group.name.split(':')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Question Display Card */}
            {currentQ && (
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-5">
                
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#AAAAAA]/30 dark:border-white/[0.08]">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#007AFF] font-mono">
                      Question {currentQuestionIndex + 1} of {currentQuestions.length} ({activeTestPaper.groups[activeGroupIndex].name})
                    </span>
                    <div className="text-[11px] text-[#1D1D1F]/60 dark:text-[#AAAAAA] italic">
                      {activeTestPaper.groups[activeGroupIndex].instructions}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#F5F5F7] dark:bg-white/[0.06] text-xs font-mono font-bold text-[#007AFF] border border-white/5">
                      [{currentQ.marks} Mark{currentQ.marks > 1 ? 's' : ''}]
                    </span>
                    <button
                      onClick={() => toggleMarkForReview(currentQ.id)}
                      className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                        markedForReview[currentQ.id]
                          ? 'bg-purple-900/40 text-purple-300 border-purple-500 font-bold'
                          : 'text-neutral-400 border-[#AAAAAA]/30 dark:border-white/[0.08] hover:bg-[#F5F5F7] dark:bg-white/[0.04]'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Review</span>
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed whitespace-pre-line">
                  {currentQ.text}
                </h3>

                {currentQ.subparts && (
                  <ul className="space-y-1.5 text-xs text-neutral-300 list-disc list-inside bg-[#F5F5F7] dark:bg-white/[0.04] p-4 rounded-xl border border-[#AAAAAA]/30 dark:border-white/[0.08]">
                    {currentQ.subparts.map((sub, sIdx) => (
                      <li key={sIdx}>{sub}</li>
                    ))}
                  </ul>
                )}

                {/* MCQ Options */}
                {currentQ.type === 'mcq' && currentQ.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentQ.options.map((opt, oIdx) => {
                      const isSelected = userAnswers[currentQ.id] === opt;
                      const isThisCorrect = opt === currentQ.correct;

                      let btnStyle = 'bg-white dark:bg-[#1D1D1F] border-[#AAAAAA]/30 dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F5F5F7] hover:border-[#007AFF] hover:bg-[#007AFF]/5';
                      if (isSelected) {
                        btnStyle = 'bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF] font-bold shadow-sm shadow-[#007AFF]/15';
                      }
                      if (showAnswers) {
                        if (isThisCorrect) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isSelected && !isThisCorrect) {
                          btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(currentQ.id, opt)}
                          className={`p-4 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#007AFF] shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Subjective / Descriptive Answering Box */}
                {(currentQ.type === 'descriptive' || currentQ.type === 'subjective') && (
                  <div className="space-y-2 pt-2">
                    <textarea
                      rows={5}
                      placeholder="Write your step-by-step mathematical proof, architectural derivation, algorithm, or code solution here..."
                      value={userAnswers[currentQ.id] || ''}
                      onChange={(e) => handleTextAnswerChange(currentQ.id, e.target.value)}
                      className="w-full p-4 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F5F5F7] text-xs outline-none focus:ring-1 focus:ring-[#007AFF] focus:border-[#007AFF] font-mono leading-relaxed bg-white dark:bg-[#1D1D1F]"
                    />
                  </div>
                )}

                {/* Official Step-Marking Model Answer Solution */}
                {showAnswers && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#007AFF]/40 text-xs space-y-2"
                  >
                    <div className="font-bold text-[#007AFF] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Official Step-Marking Rubric & Model Solution:</span>
                    </div>
                    {currentQ.correct && (
                      <div className="text-[#1D1D1F] dark:text-[#F5F5F7] font-mono">
                        Correct Option: <span className="text-[#007AFF] font-bold">{currentQ.correct}</span>
                      </div>
                    )}
                    <p className="text-[#1D1D1F]/80 dark:text-[#AAAAAA] leading-relaxed font-mono whitespace-pre-line">
                      {currentQ.explanation || currentQ.modelAnswer || 'Standard step-marking applied based on syllabus rubrics.'}
                    </p>
                  </motion.div>
                )}

                {/* Previous / Next Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-[#AAAAAA]/30 dark:border-white/[0.08]">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] hover:bg-[#F5F5F7] dark:bg-white/[0.06] text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] text-xs font-bold disabled:opacity-30 flex items-center gap-1.5 border border-[#AAAAAA]/30 dark:border-white/[0.08] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  <button
                    disabled={currentQuestionIndex === currentQuestions.length - 1}
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-bold disabled:opacity-30 flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#007AFF]/25"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* Bottom Actions Toolbar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="px-4 py-2 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] hover:bg-[#EBF5FF] dark:hover:bg-white/[0.06] text-slate-800 dark:text-neutral-200 text-xs font-bold border border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Eye className="w-4 h-4 text-[#007AFF]" />
                  <span>{showAnswers ? 'Hide Solution Key' : 'Reveal Model Answer Key'}</span>
                </button>

                <button
                  onClick={() => handleDownloadPDF(false)}
                  className="px-3.5 py-2 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] hover:bg-[#EBF5FF] dark:hover:bg-white/[0.06] text-slate-800 dark:text-neutral-200 text-xs font-bold border border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600 dark:text-neutral-400" />
                  <span>Print</span>
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmitPaper}
                className="px-6 py-2.5 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#007AFF]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Full Paper & Check Score</span>
              </motion.button>
            </div>

          </div>

          {/* Right Column (4 cols): Full Question Navigator Palette */}
          <div className="lg:col-span-4 space-y-5">
            
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1D1D1F] dark:text-[#F5F5F7]">Question Palette</h3>
                <span className="text-xs font-mono text-[#1D1D1F]/60 dark:text-[#AAAAAA]">
                  {Object.keys(userAnswers).length} / {currentQuestions.length} Answered
                </span>
              </div>
              
              {/* Question Number Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {currentQuestions.map((q, qIdx) => {
                  const isAns = userAnswers[q.id];
                  const isRev = markedForReview[q.id];
                  const isCur = currentQuestionIndex === qIdx;

                  let badgeColor = 'bg-[#F5F5F7] dark:bg-white/[0.04] text-neutral-400 border-[#AAAAAA]/30 dark:border-white/[0.08]';
                  if (isRev) badgeColor = 'bg-purple-600 text-white font-bold border-purple-500';
                  else if (isAns) badgeColor = 'bg-[#007AFF] text-white font-bold border-[#007AFF] shadow-md shadow-[#007AFF]/25';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(qIdx)}
                      className={`h-10 rounded-xl text-xs transition-all border font-mono cursor-pointer ${badgeColor} ${
                        isCur ? 'ring-2 ring-[#007AFF] scale-105' : ''
                      }`}
                    >
                      {qIdx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="pt-4 border-t border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-2 text-[11px] text-[#1D1D1F]/60 dark:text-[#AAAAAA]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#007AFF]"></span>
                  <span>Answered Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-purple-600"></span>
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08]"></span>
                  <span>Not Answered Yet</span>
                </div>
              </div>

              {/* Score summary if submitted */}
              {scoreResult && (
                <div className="p-4 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#007AFF]/50 space-y-2">
                  <div className="text-xs font-mono font-bold text-[#007AFF]">Instant Evaluation Result:</div>
                  <div className="text-2xl font-extrabold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {scoreResult.score.toFixed(1)} <span className="text-xs font-mono text-[#1D1D1F]/60 dark:text-[#AAAAAA]">/ {scoreResult.totalMcq} MCQs</span>
                  </div>
                  <div className="text-[11px] text-neutral-300">
                    Correct: <strong className="text-emerald-400">{scoreResult.correctCount}</strong> • Incorrect: <strong className="text-rose-400">{scoreResult.incorrectCount}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-3 text-xs">
              <div className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-[#007AFF]" />
                <span>Paper Controls</span>
              </div>
              <p className="text-[#1D1D1F]/70 dark:text-[#AAAAAA] leading-relaxed">
                Need another variation or different subject? You can shuffle the question pool or return to the setup wizard at any time.
              </p>
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleShufflePaper}
                  className="w-full py-2.5 rounded-xl bg-white dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Shuffle className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>Shuffle New Question Set</span>
                </button>
                <button
                  onClick={() => setActiveTestPaper(null)}
                  className="w-full py-2.5 rounded-xl bg-[#007AFF]/10 hover:bg-[#007AFF]/20 text-[#007AFF] border border-[#007AFF]/30 font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Configure Different Course / Subject</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

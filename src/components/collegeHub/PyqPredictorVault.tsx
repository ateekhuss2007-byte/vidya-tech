import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCheck, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Layers, 
  Printer, 
  Copy, 
  Eye, 
  EyeOff, 
  HelpCircle, 
  GraduationCap, 
  Search, 
  Award, 
  ChevronRight, 
  BookOpen, 
  BarChart3, 
  ArrowRight,
  Clock,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { 
  PREDICTED_PAPERS, 
  BRANCH_LIST, 
  PredictedExamPaper, 
  MCQQuestion, 
  ShortQuestionGroup, 
  LongQuestionGroup 
} from '../../data/predictedPapersDatabase';

interface PyqPredictorVaultProps {
  onOpenMockTest?: (subject: string, streamId?: string) => void;
  setActiveTab?: (tab: any) => void;
  initialSemester?: number;
}

export const PyqPredictorVault: React.FC<PyqPredictorVaultProps> = ({
  onOpenMockTest,
  setActiveTab,
  initialSemester = 3
}) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedSem, setSelectedSem] = useState<number>(initialSemester || 3);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPaperId, setSelectedPaperId] = useState<string>(() => {
    return PREDICTED_PAPERS[0]?.id || 'paper-cs301';
  });
  const [vaultView, setVaultView] = useState<'paper' | 'quiz' | 'solutions' | 'pyqHeatmap'>('paper');
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: string]: number }>({});
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);

  // Filter available papers
  const filteredPapers = useMemo(() => {
    return PREDICTED_PAPERS.filter((paper) => {
      const matchBranch = selectedBranch === 'all' || paper.branches.includes(selectedBranch);
      const matchSem = selectedSem === 0 || paper.semester === selectedSem;
      const matchQuery = !searchQuery.trim() || 
        paper.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBranch && matchSem && matchQuery;
    });
  }, [selectedBranch, selectedSem, searchQuery]);

  // Active Paper
  const activePaper: PredictedExamPaper = useMemo(() => {
    const found = PREDICTED_PAPERS.find(p => p.id === selectedPaperId);
    if (found) return found;
    return filteredPapers[0] || PREDICTED_PAPERS[0];
  }, [selectedPaperId, filteredPapers]);

  const handleSelectAnswer = (qId: string, optionIdx: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handlePrintPaper = () => {
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    toast.success('Preparing Official University Paper for Printing / PDF Export!', {
      description: 'Opening system print dialog...'
    });
    window.print();
  };

  const handleCopyPaperMarkdown = () => {
    if (!activePaper) return;

    let md = `# ${activePaper.subjectName} (${activePaper.subjectCode})\n`;
    md += `Semester: ${activePaper.semester} | Time: ${activePaper.timeHours} Hours | Full Marks: ${activePaper.totalMarks}\n`;
    md += `Regulation: ${activePaper.regulation}\n\n`;

    md += `## GROUP A (10 x 1 = 10 Marks)\n`;
    activePaper.groupA.forEach((q, idx) => {
      md += `Q1.${idx + 1}: ${q.question} [CO: ${q.co} | Bloom: ${q.bloom}]\n`;
      q.options.forEach((opt, oIdx) => {
        const letter = String.fromCharCode(65 + oIdx);
        md += `  (${letter}) ${opt}\n`;
      });
      md += `  Correct Answer: (${String.fromCharCode(65 + q.answerIndex)}) - ${q.explanation}\n\n`;
    });

    md += `## GROUP B (Short Answers - Answer any 3)\n`;
    activePaper.groupB.forEach((g) => {
      md += `Q${g.questionNumber}:\n`;
      g.subParts.forEach((sp) => {
        md += `  ${sp.part} ${sp.question} [${sp.marks} Marks | CO: ${sp.co} | Bloom: ${sp.bloom}]\n`;
        md += `  Key: ${sp.answerKey}\n\n`;
      });
    });

    md += `## GROUP C (Long Questions - Answer any 3)\n`;
    activePaper.groupC.forEach((g) => {
      md += `Q${g.questionNumber}. [${g.title}]\n`;
      g.subParts.forEach((sp) => {
        md += `  ${sp.part} ${sp.question} [${sp.marks} Marks | CO: ${sp.co} | Bloom: ${sp.bloom}]\n`;
        md += `  Evaluation Scheme: ${sp.answerKey}\n\n`;
      });
    });

    navigator.clipboard.writeText(md);
    toast.success('Full Question Paper & Marking Key copied in clean Markdown format!');
  };

  return (
    <div className="w-full space-y-8 animate-fade-in print:space-y-4">
      
      {/* 1. Header & Autonomous Exam Intelligence Engine Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-6 relative overflow-hidden print:hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#007AFF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#4E8AFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30 text-xs font-mono font-bold shadow-md shadow-[#007AFF]/25">
              <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
              <span>Autonomous University PYQ Intelligence & Predicted Papers</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] leading-tight">
              Subject-Wise <span className="text-[#007AFF]">Predicted Question Papers</span> & 7-Year PYQ Vault
            </h1>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              Statistically synthesized question papers mapped to <strong>Course Outcomes (CO1-CO6)</strong> and <strong>Bloom's Taxonomy</strong>. Featuring exact 70-Mark / 3-Hour university exam formats, step-by-step evaluation rubrics, and recurring numerical invariants.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={handlePrintPaper}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.04] hover:bg-[#F5F5F7] dark:bg-white/[0.06] text-xs font-mono font-bold text-neutral-200 border border-[#AAAAAA]/30 dark:border-white/[0.08] transition-all cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4 text-[#007AFF]" />
              <span>Print / PDF ↗</span>
            </button>

            <button
              type="button"
              onClick={handleCopyPaperMarkdown}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.04] hover:bg-[#F5F5F7] dark:bg-white/[0.06] text-xs font-mono font-bold text-neutral-200 border border-[#AAAAAA]/30 dark:border-white/[0.08] transition-all cursor-pointer shadow-xs"
            >
              <Copy className="w-4 h-4 text-[#007AFF]" />
              <span>Copy Markdown</span>
            </button>
          </div>
        </div>

        {/* Branch Filters (Horizontal Scrollable Pills) */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
            Select Engineering Branch:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {BRANCH_LIST.map((branch) => {
              const isSelected = selectedBranch === branch.id;
              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => setSelectedBranch(branch.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#007AFF] text-white font-bold shadow-md shadow-[#007AFF]/25'
                      : 'bg-[#F5F5F7] dark:bg-white/[0.04] text-neutral-400 hover:text-white border border-[#AAAAAA]/30 dark:border-white/[0.08]'
                  }`}
                >
                  <span>{branch.icon}</span>
                  <span>{branch.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 8-Semester Interactive Switcher */}
        <div className="space-y-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#AAAAAA] font-bold">
            <span>Filter by Semester:</span>
            <span className="text-[#007AFF] dark:text-blue-400">
              Active: Semester {selectedSem === 0 ? 'All' : selectedSem}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-9 gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSelectedSem(0)}
              className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer select-none text-xs font-mono font-bold ${
                selectedSem === 0
                  ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25 shadow-sm'
                  : 'bg-white dark:bg-[#1D1D1F] border border-black/[0.06] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.03]'
              }`}
            >
              <span>All Sem</span>
              <span className="text-[9px] opacity-75 font-normal">Overview</span>
            </button>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
              const isSelected = selectedSem === sem;
              return (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSelectedSem(sem)}
                  className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[#007AFF] text-white shadow-md shadow-blue-500/25 scale-[1.02] border border-[#007AFF]'
                      : 'bg-white dark:bg-[#1D1D1F] border border-black/[0.06] dark:border-white/[0.08] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">Sem {sem}</span>
                  <span className="text-[9px] opacity-75 uppercase tracking-tighter truncate">
                    {sem <= 2 ? '1st Yr' : sem <= 4 ? '2nd Yr' : sem <= 6 ? '3rd Yr' : '4th Yr'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar for Subject Code or Concept */}
        <div className="relative w-full pt-1">
          <Search className="w-4 h-4 text-[#AAAAAA] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by subject code (CS301, CH101, M101), title, or concept (AVL, Nernst, Banker's)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder:text-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>

      </div>

      {/* 2. Available Predicted Papers Grid */}
      <div className="space-y-3 print:hidden">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500">
          <span className="font-bold uppercase tracking-wider">
            Available Verified Predicted Question Papers ({filteredPapers.length}):
          </span>
          <span>Click any subject to inspect full 70-Mark Question Paper</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredPapers.map((paper) => {
            const isSelected = activePaper?.id === paper.id;
            return (
              <div
                key={paper.id}
                onClick={() => setSelectedPaperId(paper.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group space-y-3 ${
                  isSelected
                    ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                    : 'bg-white dark:bg-[#12151D] border-black/[0.08] dark:border-white/[0.08] hover:border-[#007AFF]/50 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200/60 dark:border-blue-800/60">
                    {paper.subjectCode}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                    <Sparkles className="w-3 h-3" />
                    <span>{paper.predictionConfidence}% Match</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#007AFF] transition-colors">
                    {paper.subjectName}
                  </h3>
                  <div className="text-[11px] font-mono text-[#1D1D1F]/70 dark:text-[#AAAAAA] mt-1 flex items-center gap-2">
                    <span>Semester {paper.semester}</span>
                    <span>•</span>
                    <span>70 Marks (3.0 Hrs)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[10px] font-mono">
                  <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    <span>{paper.repetitionRate}</span>
                  </span>
                  <span className="text-[#007AFF] dark:text-blue-400 font-bold flex items-center gap-0.5">
                    <span>View Paper</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Main Examination Paper Viewer */}
      {activePaper && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/[0.08] shadow-lg space-y-8 print:p-0 print:border-none print:shadow-none">
          
          {/* Formal University Examination Header */}
          <div className="text-center space-y-1.5 pb-6 border-b-2 border-black/10 dark:border-white/10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#007AFF] dark:text-blue-400">
              <span>AUTONOMOUS SEMESTER EXAMINATION (MODEL PREDICTIVE PAPER)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7] uppercase tracking-tight">
              {activePaper.subjectName}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-medium">
              <span>Course Code: <strong>{activePaper.subjectCode}</strong></span>
              <span>•</span>
              <span>Semester: <strong>{activePaper.semester}</strong></span>
              <span>•</span>
              <span>Time Allowed: <strong>{activePaper.timeHours} Hours</strong></span>
              <span>•</span>
              <span>Full Marks: <strong>{activePaper.totalMarks}</strong></span>
            </div>
          </div>

          {/* View Switcher Tabs (Paper vs Quiz vs Solutions vs Heatmap) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.06] print:hidden">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { id: 'paper', label: '📄 Question Paper', icon: FileCheck },
                { id: 'quiz', label: '🎯 Interactive MCQ Test', icon: HelpCircle },
                { id: 'solutions', label: '🔑 Answer Key & Step Marks', icon: Award },
                { id: 'pyqHeatmap', label: '🔥 7-Year PYQ Trend', icon: Flame }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = vaultView === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setVaultView(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#007AFF] text-white shadow-sm'
                        : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setShowAnswerKey(!showAnswerKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  showAnswerKey
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-[#1A1F2C] text-slate-700 dark:text-slate-300 border border-black/10 dark:border-white/10'
                }`}
              >
                {showAnswerKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showAnswerKey ? 'Hide Evaluation Key' : 'Reveal Evaluation Key'}</span>
              </button>

              {onOpenMockTest && (
                <button
                  type="button"
                  onClick={() => onOpenMockTest(activePaper.subjectName, 'btech_makaut')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25 text-xs font-mono font-bold hover:opacity-90 transition-all cursor-pointer"
                >
                  <span>Start CBT Mock ↗</span>
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: QUESTION PAPER VIEW */}
          {vaultView === 'paper' && (
            <div className="space-y-10">
              
              {/* Instructions Box */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-[#0A0C10] border border-black/[0.06] dark:border-white/[0.08] space-y-1 text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-mono">
                <div className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7] uppercase mb-1">
                  General Instructions:
                </div>
                {activePaper.instructions.map((ins, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>{ins}</span>
                  </div>
                ))}
              </div>

              {/* GROUP A (10 x 1 = 10 Marks) */}
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7] uppercase">
                      GROUP — A (Multiple Choice Questions)
                    </h3>
                    <p className="text-xs font-mono text-slate-500">
                      Answer any TEN questions. Each question carries 1 mark. [10 × 1 = 10 Marks]
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold">
                    10 Marks
                  </span>
                </div>

                <div className="space-y-4">
                  {activePaper.groupA.map((mcq, idx) => (
                    <div
                      key={mcq.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.06] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed font-sans">
                          <strong>Q1.{idx + 1}.</strong> {mcq.question}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono">
                          <span className="px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-slate-500">
                            {mcq.co}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#007AFF] dark:text-blue-400 font-bold">
                            {mcq.bloom}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans text-xs">
                        {mcq.options.map((opt, oIdx) => {
                          const letter = String.fromCharCode(65 + oIdx);
                          const isCorrect = mcq.answerIndex === oIdx;
                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                                showAnswerKey && isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold'
                                  : 'bg-white dark:bg-[#12151D] border-black/[0.05] dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center font-mono font-bold text-[11px] shrink-0">
                                {letter}
                              </span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {showAnswerKey && (
                        <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs font-mono text-emerald-800 dark:text-emerald-300">
                          <strong>Correct Answer: ({String.fromCharCode(65 + mcq.answerIndex)})</strong> — {mcq.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* GROUP B (3 x 5 = 15 Marks) */}
              <div className="space-y-5 pt-4">
                <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7] uppercase">
                      GROUP — B (Short Answer Type Questions)
                    </h3>
                    <p className="text-xs font-mono text-slate-500">
                      Answer any THREE questions. Each question carries 5 marks. [3 × 5 = 15 Marks]
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold">
                    15 Marks
                  </span>
                </div>

                <div className="space-y-4">
                  {activePaper.groupB.map((g) => (
                    <div
                      key={g.id}
                      className="p-5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-black/[0.05] dark:border-white/[0.06] space-y-3"
                    >
                      <div className="font-bold text-sm font-display text-[#1D1D1F] dark:text-[#F5F5F7]">
                        Question {g.questionNumber}.
                      </div>

                      {g.subParts.map((sp, sIdx) => (
                        <div key={sIdx} className="space-y-2 pl-3 border-l-2 border-blue-500/30">
                          <div className="flex items-start justify-between gap-3 text-xs sm:text-sm font-sans text-slate-800 dark:text-slate-200">
                            <div>
                              <strong>{sp.part}</strong> {sp.question}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono">
                              <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#007AFF] dark:text-blue-400 font-bold">
                                [{sp.marks}M]
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-slate-500">
                                {sp.co}
                              </span>
                            </div>
                          </div>

                          {showAnswerKey && (
                            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-black/[0.04] dark:border-white/[0.06] text-xs font-mono text-slate-700 dark:text-slate-300">
                              <strong className="text-[#007AFF] dark:text-blue-400">Marking Rubric:</strong> {sp.answerKey}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* GROUP C (3 x 15 = 45 Marks) */}
              <div className="space-y-5 pt-4">
                <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7] uppercase">
                      GROUP — C (Long Analytical / Numerical Type)
                    </h3>
                    <p className="text-xs font-mono text-slate-500">
                      Answer any THREE questions. Each question carries 15 marks. [3 × 15 = 45 Marks]
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#007AFF] text-white font-mono text-xs font-bold shadow-xs">
                    45 Marks
                  </span>
                </div>

                <div className="space-y-5">
                  {activePaper.groupC.map((g) => (
                    <div
                      key={g.id}
                      className="p-6 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-black/[0.06] dark:border-white/[0.08] space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-base font-bold font-display text-[#1D1D1F] dark:text-[#F5F5F7]">
                          Question {g.questionNumber}. [{g.title}]
                        </div>
                        <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#007AFF] dark:text-blue-400 font-mono text-xs font-bold">
                          15 Marks Total
                        </span>
                      </div>

                      {g.subParts.map((sp, sIdx) => (
                        <div key={sIdx} className="space-y-2 pl-3 border-l-2 border-emerald-500/30">
                          <div className="flex items-start justify-between gap-3 text-xs sm:text-sm font-sans text-slate-800 dark:text-slate-200">
                            <div>
                              <strong>{sp.part}</strong> {sp.question}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold">
                                [{sp.marks}M]
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-slate-500">
                                {sp.co}
                              </span>
                            </div>
                          </div>

                          {showAnswerKey && (
                            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-black/[0.04] dark:border-white/[0.06] text-xs font-mono text-slate-700 dark:text-slate-300">
                              <strong className="text-emerald-600 dark:text-emerald-400">Solution & Marking Scheme:</strong> {sp.answerKey}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE QUIZ MODE */}
          {vaultView === 'quiz' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 uppercase">
                    Interactive Group A Simulator
                  </div>
                  <div className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA]">
                    Attempt all 12 objective questions. Immediate automated evaluation with explanation.
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-[#AAAAAA]">Score</div>
                  <div className="text-lg font-bold font-mono text-[#007AFF] dark:text-blue-400">
                    {Object.entries(quizAnswers).filter(([qId, ans]) => {
                      const mcq = activePaper.groupA.find(q => q.id === qId);
                      return mcq && mcq.answerIndex === ans;
                    }).length} / {activePaper.groupA.length}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {activePaper.groupA.map((mcq, idx) => {
                  const selected = quizAnswers[mcq.id];
                  const hasAnswered = selected !== undefined;
                  const isCorrect = hasAnswered && selected === mcq.answerIndex;

                  return (
                    <div
                      key={mcq.id}
                      className="p-5 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-black/[0.06] dark:border-white/[0.08] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                          <strong>Q1.{idx + 1}.</strong> {mcq.question}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#007AFF] dark:text-blue-300 font-bold shrink-0">
                          {mcq.bloom}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                        {mcq.options.map((opt, oIdx) => {
                          const letter = String.fromCharCode(65 + oIdx);
                          const isOptionSelected = selected === oIdx;
                          const isThisCorrect = mcq.answerIndex === oIdx;

                          let btnStyle = 'bg-white dark:bg-[#12151D] border-black/[0.06] dark:border-white/[0.08] hover:border-blue-500';
                          if (hasAnswered) {
                            if (isThisCorrect) {
                              btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 font-bold';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleSelectAnswer(mcq.id, oIdx)}
                              className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all cursor-pointer ${btnStyle}`}
                            >
                              <span className="w-5 h-5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center font-mono font-bold text-[11px] shrink-0">
                                {letter}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className={`p-3 rounded-xl text-xs font-mono ${
                          isCorrect 
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200' 
                            : 'bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200'
                        }`}>
                          <strong>{isCorrect ? '✓ Correct Answer' : '✗ Incorrect'}:</strong> {mcq.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: STEP-BY-STEP EVALUATION SOLUTIONS */}
          {vaultView === 'solutions' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs font-mono text-emerald-800 dark:text-emerald-300">
                ⭐ <strong>Senior University Evaluator Key:</strong> Step marking criteria, intermediate formulas, and expected final answers across Groups A, B, and C.
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-bold font-mono text-xs text-[#AAAAAA] uppercase tracking-wider">
                    Group A Solutions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {activePaper.groupA.map((q, idx) => (
                      <div key={q.id} className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#0A0C10] border border-black/[0.04] dark:border-white/[0.06] text-xs font-mono space-y-1">
                        <div className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                          Q1.{idx + 1}: ({String.fromCharCode(65 + q.answerIndex)}) {q.options[q.answerIndex]}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-relaxed">
                          {q.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold font-mono text-xs text-[#AAAAAA] uppercase tracking-wider">
                    Group B & C Step Solutions
                  </h4>
                  {activePaper.groupB.concat(activePaper.groupC as any).map((g: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-[#0A0C10] border border-black/[0.04] dark:border-white/[0.06] space-y-3">
                      <div className="font-bold text-xs font-mono text-[#007AFF] dark:text-blue-400">
                        Question {g.questionNumber} {g.title ? `— ${g.title}` : ''}
                      </div>
                      {g.subParts.map((sp: any, sIdx: number) => (
                        <div key={sIdx} className="space-y-1 text-xs font-mono pl-3 border-l-2 border-blue-500/30">
                          <div className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                            {sp.part} {sp.question} [{sp.marks} Marks]
                          </div>
                          <div className="text-[#1D1D1F]/70 dark:text-[#AAAAAA] p-2.5 rounded-xl bg-white dark:bg-[#12151D] border border-black/[0.04] dark:border-white/[0.06]">
                            {sp.answerKey}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 7-YEAR PYQ RECURRENCE HEATMAP */}
          {vaultView === 'pyqHeatmap' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs font-mono text-amber-800 dark:text-amber-300">
                🔥 <strong>7-Year Question Recurrence Analysis (2018–2025):</strong> Statistical probability of topics reappearing in the upcoming semester examination based on historical cycle patterns.
              </div>

              <div className="space-y-3">
                {activePaper.highYieldPYQs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F8F9FA] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="space-y-0.5">
                        <div className="font-bold text-sm text-[#1D1D1F] dark:text-[#F5F5F7] font-sans">
                          {item.topic}
                        </div>
                        <div className="text-xs text-[#AAAAAA] font-mono flex items-center gap-2">
                          <span>Last Seen: <strong>{item.lastAppeared}</strong></span>
                          <span>•</span>
                          <span>Average Value: <strong>{item.recurringMarks} Marks</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200">
                          {item.frequency}% Probability
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                          {item.recurrenceTag}
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-500 transition-all duration-700"
                        style={{ width: `${item.frequency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

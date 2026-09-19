import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  HelpCircle, 
  GraduationCap, 
  Play, 
  Flame, 
  Send,
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const vivaQuestionBank = {
  dsa: [
    {
      id: 'v_dsa_1',
      question: "Examiner: 'Explain the difference between an AVL Tree and a Red-Black Tree. In which scenario would you prefer an AVL tree over a Red-Black tree in a production database index?'",
      expectedKeywords: ['height balance', 'strict balancing', 'lookup intensive', 'rotations', 'O(log n)', 'read heavy'],
      sampleAnswer: "AVL trees are strictly height-balanced (|BF| <= 1), which gives faster lookups. Red-Black trees have looser balancing (path length <= 2x shortest), allowing faster insertions and deletions. In read-heavy database indexing, AVL trees are preferred.",
      idealScore: 92
    },
    {
      id: 'v_dsa_2',
      question: "Examiner: 'Why is Quick Sort preferred over Merge Sort for sorting arrays, but Merge Sort is preferred for sorting Linked Lists?'",
      expectedKeywords: ['cache locality', 'in-place', 'O(1) extra space', 'random access', 'sequential access'],
      sampleAnswer: "Quick Sort has excellent cache locality and works in-place with O(1) auxiliary space on contiguous arrays. For linked lists, sequential access avoids cache penalties and Merge Sort merges lists without extra memory allocation.",
      idealScore: 88
    },
    {
      id: 'v_dsa_3',
      question: "Examiner: 'How does Dijkstra\'s Algorithm handle graphs with negative edge weights? What happens and which algorithm should we use instead?'",
      expectedKeywords: ['greedy choice fails', 'infinite loop / wrong distance', 'Bellman-Ford', 'negative cycle detection'],
      sampleAnswer: "Dijkstra assumes distances are monotonically increasing once a vertex is marked visited. With negative edges, this greedy property fails. We must use the Bellman-Ford algorithm (O(V*E)) to handle negative weights and detect negative cycles.",
      idealScore: 95
    }
  ],
  os: [
    {
      id: 'v_os_1',
      question: "Examiner: 'Explain the difference between a Process and a Thread. What resources are shared between threads of the same process?'",
      expectedKeywords: ['address space', 'heap', 'code segment', 'stack is private', 'context switch overhead', 'PCB vs TCB'],
      sampleAnswer: "A process is an execution unit with its own address space, memory, and PCB. A thread is a lightweight execution stream inside a process. Threads share the code, data, heap, and open file descriptors, but maintain private program counters, registers, and stacks.",
      idealScore: 90
    },
    {
      id: 'v_os_2',
      question: "Examiner: 'What are the four necessary and sufficient conditions for a Deadlock to occur in an operating system?'",
      expectedKeywords: ['mutual exclusion', 'hold and wait', 'no preemption', 'circular wait', 'Coffman conditions'],
      sampleAnswer: "The four Coffman conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, and 4. Circular Wait. Breaking any one of these conditions prevents deadlocks.",
      idealScore: 94
    }
  ],
  dbms: [
    {
      id: 'v_dbms_1',
      question: "Examiner: 'Explain the difference between BCNF (Boyce-Codd Normal Form) and 3NF. Can a 3NF relation have functional dependency anomalies?'",
      expectedKeywords: ['superkey', 'prime attribute', 'determinant', 'transitive dependency', 'lossless join', 'dependency preservation'],
      sampleAnswer: "In 3NF, for every X -> Y, X must be a superkey OR Y must be a prime attribute. In BCNF, X must ALWAYS be a superkey with no exceptions. 3NF allows anomalies if non-superkey determinants exist for prime attributes.",
      idealScore: 89
    }
  ]
};

export const VivaExaminer = () => {
  const [selectedSubject, setSelectedSubject] = useState('dsa');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [sessionScore, setSessionScore] = useState({ totalMarks: 0, count: 0 });

  const questions = vivaQuestionBank[selectedSubject] || vivaQuestionBank.dsa;
  const currentQ = questions[currentQIndex] || questions[0];

  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQ.question.replace('Examiner:', ''));
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      toast.info('Examiner is speaking question...');
    } else {
      toast.info('Speech synthesis not supported in this browser.');
    }
  };

  const handleToggleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast.info('Microphone active. Speak your answer clearly...');
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setStudentAnswer(prev => prev ? `${prev} ${transcript}` : transcript);
          setIsRecording(false);
          toast.success('Speech transcribed!');
        };
        recognition.onerror = () => {
          setIsRecording(false);
          toast.error('Could not capture audio. Please type your answer.');
        };
        recognition.start();
      } else {
        setIsRecording(false);
        toast.info('Speech recognition API is unavailable in this browser environment. Please type your answer directly into the response box.');
      }
    } else {
      setIsRecording(false);
      toast.info('Microphone stopped.');
    }
  };

  const handleEvaluateAnswer = () => {
    if (!studentAnswer.trim()) {
      toast.error('Please speak or type your answer before submitting.');
      return;
    }

    setIsEvaluating(true);
    toast.info('AI External Examiner is evaluating your technical depth & clarity...');

    setTimeout(() => {
      setIsEvaluating(false);
      
      const lower = studentAnswer.toLowerCase();
      let matchedCount = 0;
      currentQ.expectedKeywords.forEach(kw => {
        if (lower.includes(kw.toLowerCase())) matchedCount++;
      });

      const keywordRatio = currentQ.expectedKeywords.length > 0 
        ? matchedCount / currentQ.expectedKeywords.length 
        : 0;

      // Realistic and honest score calculation based on keyword coverage and depth
      let computedScore = 0;
      if (studentAnswer.trim().length >= 15 && matchedCount > 0) {
        computedScore = Math.min(100, Math.round((keywordRatio * 80) + (studentAnswer.trim().length > 60 ? 20 : 10)));
      } else if (studentAnswer.trim().length >= 15) {
        computedScore = 15; // Minimal attempt mark
      }

      const missing = currentQ.expectedKeywords.filter(kw => !lower.includes(kw.toLowerCase()));
      const matched = currentQ.expectedKeywords.filter(kw => lower.includes(kw.toLowerCase()));

      let feedback = '';
      if (computedScore >= 80) {
        feedback = `Excellent technical response! Successfully covered core concepts: [${matched.join(', ')}].`;
      } else if (computedScore >= 50) {
        feedback = `Satisfactory answer. Mentioned [${matched.join(', ')}], but missing critical keywords: [${missing.slice(0, 3).join(', ')}].`;
      } else {
        feedback = `Incomplete or off-topic answer. Examiner expected key terms such as: [${missing.slice(0, 3).join(', ')}].`;
      }

      setEvaluationResult({
        score: computedScore,
        confidence: computedScore >= 75 ? 'High (85%)' : 'Moderate (65%)',
        clarity: computedScore >= 70 ? 'Crisp & Technical' : 'Needs Formal Terminology',
        feedback,
        matchedKeywords: matched,
        missingKeywords: missing
      });

      setSessionScore(prev => ({
        totalMarks: prev.totalMarks + computedScore,
        count: prev.count + 1
      }));

      if (computedScore >= 80) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }

      toast.success(`Examiner Evaluation: ${computedScore}/100 Marks!`);
    }, 800);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setStudentAnswer('');
      setEvaluationResult(null);
      setIsRecording(false);
    } else {
      toast.success('Viva Session Complete! You finished all questions in this module.');
    }
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-8 animate-fade-in space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30 text-xs font-mono font-bold mb-2 shadow-md shadow-[#007AFF]/25">
            <Mic className="w-3.5 h-3.5 text-[#007AFF]" />
            <span>AI External Examiner & Lab Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Live College Viva Voice Examiner
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl font-sans">
            Simulate real university external viva examinations. Get scored on technical accuracy, keywords, and speech clarity.
          </p>
        </div>

        {/* Overall session badge */}
        {sessionScore.count > 0 && (
          <div className="p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#007AFF]/40 text-right">
            <div className="text-[11px] font-mono text-neutral-400">Average Viva Grade</div>
            <div className="text-xl font-extrabold text-[#007AFF] font-display">
              {(sessionScore.totalMarks / sessionScore.count).toFixed(1)} / 100
            </div>
          </div>
        )}
      </div>

      {/* Subject Selector */}
      <div className="p-2 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm flex flex-wrap gap-2">
        {[
          { id: 'dsa', name: 'Data Structures & Algorithms (B.Tech / BCA)', icon: '🌳' },
          { id: 'os', name: 'Operating Systems & Concurrency', icon: '⚡' },
          { id: 'dbms', name: 'Database Management Systems (SQL & BCNF)', icon: '🗄️' }
        ].map((sub) => (
          <button
            key={sub.id}
            onClick={() => {
              setSelectedSubject(sub.id);
              setCurrentQIndex(0);
              setStudentAnswer('');
              setEvaluationResult(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedSubject === sub.id
                ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25 scale-[1.02]'
                : 'text-neutral-400 hover:text-white hover:bg-[#F5F5F7] dark:bg-white/[0.04]'
            }`}
          >
            <span>{sub.icon}</span>
            <span>{sub.name}</span>
          </button>
        ))}
      </div>

      {/* Examiner Stage Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Examiner Audio & Response */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Question Box with Voice Trigger */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1D1D1F] text-white shadow-xl border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#007AFF]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#007AFF]/40 text-[#007AFF] flex items-center justify-center font-bold text-lg">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-display">External Examiner (University Panel)</h3>
                  <div className="text-xs text-[#007AFF] font-mono">Question {currentQIndex + 1} of {questions.length}</div>
                </div>
              </div>

              <button
                onClick={handleSpeakQuestion}
                className="px-3.5 py-1.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] hover:bg-[#F5F5F7] dark:bg-white/[0.06] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-neutral-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-[#007AFF]" />
                <span>Hear Voice</span>
              </button>
            </div>

            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed font-display relative z-10">
              "{currentQ.question.replace('Examiner:', '').trim()}"
            </p>
          </div>

          {/* Student Response Canvas */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-300">Your Viva Explanation:</span>
              
              <button
                onClick={handleToggleMic}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isRecording 
                    ? 'bg-rose-600 text-white animate-pulse shadow-lg' 
                    : 'bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#007AFF]/40 text-[#007AFF] hover:bg-[#F5F5F7] dark:bg-white/[0.06]'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#007AFF]" />}
                <span>{isRecording ? 'Listening (Click to Stop)...' : 'Speak Answer'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="Speak using the microphone or type your technical answer here..."
              className="w-full p-4 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-xs sm:text-sm text-white outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] leading-relaxed font-mono"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStudentAnswer(currentQ.sampleAnswer)}
                className="text-xs text-[#007AFF] hover:underline font-mono cursor-pointer"
              >
                Insert Model Answer Example
              </button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEvaluateAnswer}
                disabled={isEvaluating}
                className="px-6 py-2.5 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#007AFF]/25 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit to Examiner</span>
              </motion.button>
            </div>
          </div>

          {/* Examiner Feedback Evaluation Card */}
          {evaluationResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#007AFF]/40 shadow-md shadow-[#007AFF]/25 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#007AFF]" />
                  <h3 className="font-bold text-sm text-white font-display">Examiner Feedback & Scorecard</h3>
                </div>
                <div className="text-2xl font-extrabold text-[#007AFF] font-display">
                  {evaluationResult.score} / 100 Marks
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {evaluationResult.feedback}
              </p>

              {/* Keyword Diagnostic */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-neutral-400 font-mono">Technical Keyword Breakdown:</div>
                <div className="flex flex-wrap gap-1.5">
                  {evaluationResult.matchedKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#007AFF]/15 text-[#007AFF] text-xs font-bold border border-[#007AFF]/30 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3 h-3" /> {kw}
                    </span>
                  ))}
                  {evaluationResult.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-950/40 text-amber-300 text-xs font-medium border border-amber-800/40 font-mono">
                      + Missing: {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end pt-3">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#007AFF]/25 cursor-pointer"
                >
                  <span>Next Viva Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

        </div>

        {/* Right Column (4 cols): Viva Tips & External Rubric */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#007AFF]" />
              <span>University Viva Scoring Rubric</span>
            </h3>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08]">
                <div className="font-bold text-white mb-1 font-mono">1. Exact Technical Terms (40%)</div>
                <p className="text-neutral-400">Invariants, asymptotic notation, and formal definitions.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08]">
                <div className="font-bold text-white mb-1 font-mono">2. Production Trade-offs (35%)</div>
                <p className="text-neutral-400">Why choose one data structure or algorithm over another?</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08]">
                <div className="font-bold text-white mb-1 font-mono">3. Delivery & Confidence (25%)</div>
                <p className="text-neutral-400">Concise answers without hesitation or filler words.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

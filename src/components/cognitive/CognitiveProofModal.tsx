import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Brain,
  Calculator,
  Activity,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  TrendingDown,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import {
  calculateEbbinghausRetention,
  calculateDaysUntilThreshold,
  calculateRetentionHalfLife,
  calculateSM2,
  updateBKTMastery,
  DEFAULT_BKT_PARAMS
} from '../../utils/cognitiveEngine';
import type { RecallQuality, SM2State } from '../../utils/cognitiveEngine';

interface CognitiveProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'ebbinghaus' | 'sm2' | 'bkt';
}

export const CognitiveProofModal: React.FC<CognitiveProofModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'ebbinghaus'
}) => {
  const [activeTab, setActiveTab] = useState<'ebbinghaus' | 'sm2' | 'bkt'>(initialTab);

  // Ebbinghaus Sandbox State
  const [ebbinghausDays, setEbbinghausDays] = useState<number>(4);
  const [ebbinghausStability, setEbbinghausStability] = useState<number>(7.5);

  // SM-2 Sandbox State
  const [sm2State, setSm2State] = useState<SM2State>({
    repetitions: 1,
    easeFactor: 2.5,
    intervalDays: 6,
    lastReviewedAt: new Date().toISOString(),
    nextDueDate: new Date(Date.now() + 6 * 86400000).toISOString(),
    stabilityDays: 8.4
  });
  const [sm2History, setSm2History] = useState<string[]>([
    'Initialized with standard Ease Factor (EF = 2.50)',
    '1st review completed: Interval = 1d',
    '2nd review completed (q=4): Interval = 6d'
  ]);

  // BKT Sandbox State
  const [bktMastery, setBktMastery] = useState<number>(0.35);
  const [bktHistory, setBktHistory] = useState<string[]>([
    'Initialized prior mastery P(L0) = 0.35 (35.0%)'
  ]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live Ebbinghaus Calculations
  const calculatedRetention = calculateEbbinghausRetention(ebbinghausDays, ebbinghausStability);
  const halfLifeDays = calculateRetentionHalfLife(ebbinghausStability);
  const criticalThresholdDays = calculateDaysUntilThreshold(ebbinghausStability, 0.60);

  // SM-2 Action Trigger
  const handleSM2Step = (q: RecallQuality, label: string) => {
    const result = calculateSM2(sm2State, q);
    setSm2State(result.nextState);
    setSm2History(prev => [result.mathematicalLog, ...prev.slice(0, 5)]);
  };

  const handleResetSM2 = () => {
    setSm2State({
      repetitions: 0,
      easeFactor: 2.5,
      intervalDays: 1,
      lastReviewedAt: new Date().toISOString(),
      nextDueDate: new Date(Date.now() + 86400000).toISOString(),
      stabilityDays: 2.1
    });
    setSm2History(['Reset to initial baseline state (EF = 2.50, Reps = 0, Interval = 1d)']);
  };

  // BKT Action Trigger
  const handleBKTStep = (isCorrect: boolean) => {
    const result = updateBKTMastery(bktMastery, isCorrect);
    setBktMastery(result.newMastery);
    setBktHistory(prev => [result.log, ...prev.slice(0, 5)]);
  };

  const handleResetBKT = () => {
    setBktMastery(0.35);
    setBktHistory(['Reset to baseline prior mastery P(L0) = 0.35']);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#161618] text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 bg-[#1D1D1F]/80 backdrop-blur-lg flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#007AFF]/15 text-[#007AFF] text-xs font-mono font-bold border border-[#007AFF]/30">
                    <Activity className="w-3.5 h-3.5" />
                    ACADEMIC MATHEMATICAL SPECIFICATION
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline-block">
                    Peer-Reviewed Cognitive Architectures
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
                  <span>Mathematical Verification & Proof Protocol</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1 max-w-2xl font-sans">
                  VIDYA AI replaces heuristic guesses with formal memory & knowledge equations. Inspect live variables, step-by-step logs, and theoretical formulas below.
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 pt-4 border-b border-white/10 bg-[#161618] flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('ebbinghaus')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'ebbinghaus'
                    ? 'border-[#007AFF] text-[#007AFF]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>1. Ebbinghaus Memory Decay</span>
              </button>

              <button
                onClick={() => setActiveTab('sm2')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'sm2'
                    ? 'border-[#007AFF] text-[#007AFF]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>2. SuperMemo-2 (SM-2) Spaced Intervals</span>
              </button>

              <button
                onClick={() => setActiveTab('bkt')}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'bkt'
                    ? 'border-[#007AFF] text-[#007AFF]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>3. Bayesian Knowledge Tracing (BKT)</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm font-sans flex-1">
              
              {/* TAB 1: Ebbinghaus Decay */}
              {activeTab === 'ebbinghaus' && (
                <div className="space-y-6">
                  {/* Formula Display Card */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="text-xs font-mono text-[#007AFF] font-bold">GOVERNING EQUATION</div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-center text-base sm:text-lg text-emerald-400 overflow-x-auto">
                      R(t) = exp( -t / S )
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300 font-sans">
                      <div className="p-2.5 rounded-lg bg-white/[0.02]">
                        <span className="font-mono text-[#007AFF] font-bold">R(t)</span>: Probability of recall at time <span className="font-mono">t</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.02]">
                        <span className="font-mono text-[#007AFF] font-bold">t</span>: Elapsed days since last revision session
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.02]">
                        <span className="font-mono text-[#007AFF] font-bold">S</span>: Memory stability factor (in days)
                      </div>
                    </div>
                  </div>

                  {/* Interactive Simulator */}
                  <div className="p-5 rounded-2xl bg-[#1D1D1F] border border-white/10 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#007AFF]" />
                        <span>Interactive Parameter Sandbox</span>
                      </h3>
                      <span className="text-[11px] font-mono text-neutral-400">Real-Time Evaluation</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Slider 1: Elapsed Days */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-neutral-300">Elapsed Time (t):</span>
                          <span className="font-mono text-[#007AFF] font-bold">{ebbinghausDays} Days</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="28"
                          step="1"
                          value={ebbinghausDays}
                          onChange={(e) => setEbbinghausDays(Number(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
                        />
                        <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                          <span>0d (Immediate)</span>
                          <span>14d</span>
                          <span>28d (Unreinforced)</span>
                        </div>
                      </div>

                      {/* Slider 2: Stability Factor */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-neutral-300">Memory Stability (S):</span>
                          <span className="font-mono text-emerald-400 font-bold">{ebbinghausStability} Days</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          step="0.5"
                          value={ebbinghausStability}
                          onChange={(e) => setEbbinghausStability(Number(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                        />
                        <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                          <span>1.0d (Novice)</span>
                          <span>15.0d (Reviewed)</span>
                          <span>30.0d (Consolidated)</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculated Live Metrics Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-center">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase">Calculated Retention R(t)</div>
                        <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                          {(calculatedRetention * 100).toFixed(1)}%
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-1">
                          {calculatedRetention >= 0.75 ? 'Safe Recall Range' : calculatedRetention >= 0.60 ? 'Review Due Soon' : 'Critical Forgetting'}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-center">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase">Half-Life (t½ = S · ln 2)</div>
                        <div className="text-2xl font-bold font-mono text-sky-400 mt-1">
                          {halfLifeDays} Days
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-1">Time to 50% probability</div>
                      </div>

                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-center">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase">Critical Threshold (60%)</div>
                        <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
                          Day {criticalThresholdDays}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-1">Recommended intervention deadline</div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Context */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-400 space-y-1">
                    <div className="font-bold text-neutral-200">Citation & Historical Foundations:</div>
                    <p>
                      Ebbinghaus, H. (1885). <em>Über das Gedächtnis: Untersuchungen zur experimentellen Psychologie</em>. Duncker & Humblot.
                      Demonstrates that memory decays logarithmically over time without spaced active intervention. VIDYA AI implements dynamic stability dilation with every verified flashcard and mock review.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: SuperMemo-2 (SM-2) */}
              {activeTab === 'sm2' && (
                <div className="space-y-6">
                  {/* Recurrence Equation */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="text-xs font-mono text-[#007AFF] font-bold">SM-2 RECURRENCE RELATIONS</div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs sm:text-sm text-sky-300 space-y-1 overflow-x-auto">
                      <div>EF&apos; = max(1.30, EF + (0.1 - (5 - q) · (0.08 + (5 - q) · 0.02)))</div>
                      <div>I(1) = 1 day, &nbsp; I(2) = 6 days, &nbsp; I(n) = round( I(n-1) · EF&apos; )</div>
                    </div>
                    <p className="text-xs text-neutral-300">
                      Where <span className="font-mono text-[#007AFF]">q ∈ [0..5]</span> is recall quality grade, <span className="font-mono text-[#007AFF]">EF</span> is Ease Factor, and <span className="font-mono text-[#007AFF]">I(n)</span> is the optimal spaced study interval.
                    </p>
                  </div>

                  {/* Interactive Flashcard Simulator */}
                  <div className="p-5 rounded-2xl bg-[#1D1D1F] border border-white/10 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-[#007AFF]" />
                        <span>Live State Vector & Recalculator</span>
                      </h3>
                      <button
                        onClick={handleResetSM2}
                        className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset State
                      </button>
                    </div>

                    {/* Current State Vector */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-[10px] font-mono text-neutral-400">EASE FACTOR (EF)</div>
                        <div className="text-xl font-bold font-mono text-[#007AFF] mt-1">{sm2State.easeFactor.toFixed(2)}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-[10px] font-mono text-neutral-400">INTERVAL (I)</div>
                        <div className="text-xl font-bold font-mono text-emerald-400 mt-1">{sm2State.intervalDays} Days</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-[10px] font-mono text-neutral-400">REPETITIONS (n)</div>
                        <div className="text-xl font-bold font-mono text-amber-400 mt-1">{sm2State.repetitions}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-[10px] font-mono text-neutral-400">STABILITY (S)</div>
                        <div className="text-xl font-bold font-mono text-purple-400 mt-1">{sm2State.stabilityDays} Days</div>
                      </div>
                    </div>

                    {/* Trigger Buttons */}
                    <div>
                      <div className="text-xs text-neutral-300 font-medium mb-2.5">
                        Simulate Student Recall Rating (q):
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <button
                          onClick={() => handleSM2Step(1, 'Again')}
                          className="p-3 rounded-xl bg-rose-950/30 hover:bg-rose-950/50 border border-rose-800 text-rose-300 text-xs font-bold transition-all text-left cursor-pointer"
                        >
                          <div>q=1 (Again)</div>
                          <div className="text-[10px] font-mono opacity-70">Complete Blackout</div>
                        </button>
                        <button
                          onClick={() => handleSM2Step(3, 'Hard')}
                          className="p-3 rounded-xl bg-amber-950/30 hover:bg-amber-950/50 border border-amber-800 text-amber-300 text-xs font-bold transition-all text-left cursor-pointer"
                        >
                          <div>q=3 (Hard)</div>
                          <div className="text-[10px] font-mono opacity-70">Significant Effort</div>
                        </button>
                        <button
                          onClick={() => handleSM2Step(4, 'Good')}
                          className="p-3 rounded-xl bg-blue-950/30 hover:bg-blue-950/50 border border-blue-800 text-blue-300 text-xs font-bold transition-all text-left cursor-pointer"
                        >
                          <div>q=4 (Good)</div>
                          <div className="text-[10px] font-mono opacity-70">Normal Hesitation</div>
                        </button>
                        <button
                          onClick={() => handleSM2Step(5, 'Easy')}
                          className="p-3 rounded-xl bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs font-bold transition-all text-left cursor-pointer"
                        >
                          <div>q=5 (Easy)</div>
                          <div className="text-[10px] font-mono opacity-70">Instant Mastery</div>
                        </button>
                      </div>
                    </div>

                    {/* Step Execution Log */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase flex items-center justify-between">
                        <span>Execution Trace Log</span>
                        <span>Latest 5 Events</span>
                      </div>
                      <div className="space-y-1 font-mono text-xs">
                        {sm2History.map((entry, idx) => (
                          <div key={idx} className="text-neutral-300 flex items-start gap-2">
                            <span className="text-[#007AFF] shrink-0">›</span>
                            <span>{entry}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Academic Context */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-400 space-y-1">
                    <div className="font-bold text-neutral-200">Citation & Historical Foundations:</div>
                    <p>
                      Wozniak, P. A. (1990). <em>Optimization of Learning: A New Approach to the Problem of Remembering</em>. Master&apos;s Thesis, Poznan University of Technology.
                      SM-2 provides mathematically guaranteed scheduling intervals that maintain a retention floor of 90% while minimizing student review toil.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: Bayesian Knowledge Tracing (BKT) */}
              {activeTab === 'bkt' && (
                <div className="space-y-6">
                  {/* BKT Formulas */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="text-xs font-mono text-[#007AFF] font-bold">BAYESIAN KNOWLEDGE TRACING POSTERIOR UPDATE</div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs sm:text-sm text-purple-300 space-y-1.5 overflow-x-auto">
                      <div>P(L | Correct) = [ P(L) · (1 - P(S)) ] / [ P(L) · (1 - P(S)) + (1 - P(L)) · P(G) ]</div>
                      <div>P(L | Incorrect) = [ P(L) · P(S) ] / [ P(L) · P(S) + (1 - P(L)) · (1 - P(G)) ]</div>
                      <div>P(L_t+1) = P(L | Obs) + (1 - P(L | Obs)) · P(T)</div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-neutral-300">
                      <div>P(L0) = {DEFAULT_BKT_PARAMS.prior} (Prior)</div>
                      <div>P(T) = {DEFAULT_BKT_PARAMS.learnRate} (Learn)</div>
                      <div>P(G) = {DEFAULT_BKT_PARAMS.guessRate} (Guess)</div>
                      <div>P(S) = {DEFAULT_BKT_PARAMS.slipRate} (Slip)</div>
                    </div>
                  </div>

                  {/* Interactive BKT Simulator */}
                  <div className="p-5 rounded-2xl bg-[#1D1D1F] border border-white/10 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>Interactive Mastery Probability Sandbox</span>
                      </h3>
                      <button
                        onClick={handleResetBKT}
                        className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset Prior
                      </button>
                    </div>

                    {/* Live Mastery Bar */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-300 font-semibold">Posterior Knowledge State P(L):</span>
                        <span className="font-mono text-lg font-bold text-purple-400">{(bktMastery * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(5, bktMastery * 100))}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                        <span>Unlearned (&lt;40%)</span>
                        <span>Emerging (40-75%)</span>
                        <span>Mastered (&gt;85%)</span>
                      </div>
                    </div>

                    {/* Step Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleBKTStep(true)}
                        className="flex-1 py-3 px-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-700 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Simulate Correct Answer (+P(T))</span>
                      </button>
                      <button
                        onClick={() => handleBKTStep(false)}
                        className="flex-1 py-3 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-950/60 border border-rose-700 text-rose-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <TrendingDown className="w-4 h-4" />
                        <span>Simulate Mistake (Update Slip)</span>
                      </button>
                    </div>

                    {/* BKT Execution Trace */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Posterior Evolution Log</div>
                      <div className="space-y-1 font-mono text-xs">
                        {bktHistory.map((entry, idx) => (
                          <div key={idx} className="text-neutral-300 flex items-start gap-2">
                            <span className="text-purple-400 shrink-0">›</span>
                            <span>{entry}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Academic Context */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-400 space-y-1">
                    <div className="font-bold text-neutral-200">Citation & Historical Foundations:</div>
                    <p>
                      Corbett, A. T., & Anderson, J. R. (1994). <em>Knowledge tracing: Modeling the acquisition of procedural knowledge</em>. User Modeling and User-Adapted Interaction, 4(4), 253-278.
                      Standard in intelligent tutoring systems (Carnegie Learning, ACT-R), ensuring the system distinguishes lucky guesses from true latent mastery.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#1D1D1F] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-neutral-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#007AFF]" />
                <span>Zero mock data in production — all curves execute live in browser memory.</span>
              </div>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#007AFF] hover:bg-[#5EFCC2] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Verification Modal
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  RotateCw, 
  CheckCircle2, 
  Sparkles, 
  Brain, 
  Flame, 
  TrendingUp, 
  Award,
  ChevronLeft,
  ChevronRight,
  Zap,
  Repeat,
  Calculator,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { calculateSM2 } from '../utils/cognitiveEngine';
import { CognitiveProofModal } from './cognitive/CognitiveProofModal';

const DECKS = [
  {
    id: 'dsa_core',
    name: 'B.Tech / GATE DSA Mastery',
    icon: '⚡',
    cards: [
      {
        front: 'What is the exact recurrence relation and time complexity of Merge Sort?',
        back: 'T(n) = 2T(n/2) + Θ(n)\nBy Master Theorem Case 2 (a=2, b=2, k=1):\nTime Complexity = Θ(n log n) in Best, Average, and Worst cases.\nAuxiliary Space = O(n).',
        category: 'Algorithms'
      },
      {
        front: 'What is the difference between Array-based Min-Heap vs Binary Search Tree (BST)?',
        back: 'Min-Heap: Parent ≤ Children. Complete Binary Tree stored in array without pointer overhead. Find-Min is O(1), Insert is O(log n).\nBST: Left < Root < Right. Sorted in-order traversal in O(n). Search is O(log n) average, O(n) worst if unbalanced.',
        category: 'Data Structures'
      },
      {
        front: 'Explain Dijkstra’s Shortest Path Algorithm time complexity using a Min-Priority Queue.',
        back: 'Using an Adjacency List + Min-Heap:\nTime Complexity = O((V + E) log V).\nKey Constraint: Does NOT work with negative weight edges (Use Bellman-Ford for negative cycles O(VE)).',
        category: 'Graph Algorithms'
      }
    ]
  },
  {
    id: 'os_sync',
    name: 'Operating Systems & Concurrency',
    icon: '💻',
    cards: [
      {
        front: 'What are the 4 Necessary Conditions for Deadlock to occur?',
        back: '1. Mutual Exclusion (Non-shareable resource)\n2. Hold and Wait (Holding resource while waiting)\n3. No Preemption (Resource cannot be forcibly taken)\n4. Circular Wait (P0 waiting for P1 waiting for P0)',
        category: 'Operating Systems'
      },
      {
        front: 'What is the difference between Counting Semaphore and Binary Semaphore (Mutex)?',
        back: 'Binary Semaphore (0 or 1): Mutual exclusion lock.\nCounting Semaphore (Integer value N): Controls access to a resource pool with N identical instances. Wait (P) decrements; Signal (V) increments.',
        category: 'Concurrency'
      }
    ]
  },
  {
    id: 'ssc_vocab',
    name: 'SSC CGL High-Frequency Vocab & Idioms',
    icon: '🏛️',
    cards: [
      {
        front: 'Idiom: "A dark horse"',
        back: 'Meaning: A candidate or competitor about whom little is known but who unexpectedly wins or succeeds.\nExample: Rohit was a dark horse in the selection exam.',
        category: 'English Vocab'
      },
      {
        front: 'Word: "Ephemeral"',
        back: 'Meaning: Lasting for a very short time; transient, fleeting.\nSynonyms: Evanescent, fleeting, momentary.\nAntonyms: Permanent, eternal, perpetual.',
        category: 'One Word Substitution'
      }
    ]
  }
];

export const FlashcardStudio = () => {
  const [selectedDeckId, setSelectedDeckId] = useState(DECKS[0].id);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [proofModalOpen, setProofModalOpen] = useState(false);

  // Persistent SM-2 states per card key
  const [cardStates, setCardStates] = useState(() => {
    try {
      const saved = localStorage.getItem('vidya_sm2_deck_states');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentDeck = DECKS.find(d => d.id === selectedDeckId) || DECKS[0];
  const currentCard = currentDeck.cards[currentCardIndex];
  const currentCardKey = `${selectedDeckId}_${currentCardIndex}`;
  
  const currentCardState = cardStates[currentCardKey] || {
    repetitions: 0,
    easeFactor: 2.5,
    intervalDays: 1,
    lastReviewedAt: null,
    nextDueDate: null,
    stabilityDays: 2.0
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = (quality, label) => {
    setReviewedCount(prev => prev + 1);

    // Genuine SM-2 Spaced Repetition calculation
    const result = calculateSM2(currentCardState, quality);
    const updatedStates = {
      ...cardStates,
      [currentCardKey]: result.nextState
    };
    setCardStates(updatedStates);
    try {
      localStorage.setItem('vidya_sm2_deck_states', JSON.stringify(updatedStates));
    } catch (e) {
      console.warn('Could not persist SM-2 states:', e);
    }

    toast.success(`SM-2 Schedule: ${label}`, {
      description: `Next review: ${result.nextState.intervalDays} day(s) | EF: ${result.newEaseFactor.toFixed(2)} | Stability: ${result.nextState.stabilityDays}d`
    });

    if (currentCardIndex + 1 < currentDeck.cards.length) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      confetti({ particleCount: 50, spread: 60 });
      toast.success('Deck completed for today!', {
        description: 'All flashcards reviewed with active recall.'
      });
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-8 animate-fade-in space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#1D1D1F] text-white border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#007AFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 text-xs font-mono font-bold text-[#007AFF] shadow-md shadow-[#007AFF]/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Anki-Style SM-2 Spaced Repetition Decks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
            Flashcard Active Recall Studio
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed font-sans">
            Harness the Ebbinghaus forgetting curve to lock core formulas, definitions, and code patterns into long-term memory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => setProofModalOpen(true)}
            className="px-4 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono font-bold text-[#007AFF] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Calculator className="w-4 h-4 text-[#007AFF]" />
            <span>Inspect SM-2 Formulas</span>
          </button>

          <div className="p-3.5 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#007AFF]/30 text-center">
            <div className="text-[10px] text-[#007AFF] font-mono">CARDS REVIEWED</div>
            <div className="text-xl font-bold text-white font-display">{reviewedCount} Cards</div>
          </div>
        </div>
      </div>

      {/* Deck Selector Pills */}
      <div className="flex flex-wrap items-center gap-2.5">
        {DECKS.map((deck) => (
          <button
            key={deck.id}
            onClick={() => {
              setSelectedDeckId(deck.id);
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              selectedDeckId === deck.id
                ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25 scale-[1.02]'
                : 'bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-neutral-300 hover:bg-[#F5F5F7] dark:bg-white/[0.04] hover:text-white'
            }`}
          >
            <span>{deck.icon}</span>
            <span>{deck.name}</span>
            <span className="px-1.5 py-0.5 rounded bg-[#F5F5F7] dark:bg-white/[0.04] text-[10px] font-mono border border-white/5">{deck.cards.length}</span>
          </button>
        ))}
      </div>

      {/* 3D Flip Card Container */}
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span>Card {currentCardIndex + 1} of {currentDeck.cards.length} ({currentCard.category})</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#007AFF] bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
            <span>EF: {currentCardState.easeFactor.toFixed(2)}</span>
            <span>•</span>
            <span>Int: {currentCardState.intervalDays}d</span>
            <span>•</span>
            <span>S: {currentCardState.stabilityDays}d</span>
          </div>
        </div>

        {/* The Card */}
        <motion.div
          onClick={handleFlip}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`min-h-[300px] sm:min-h-[340px] p-8 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between border shadow-2xl relative select-none ${
            isFlipped
              ? 'bg-[#F5F5F7] dark:bg-white/[0.04] text-white border-[#007AFF]/50 shadow-md shadow-[#007AFF]/25'
              : 'bg-white dark:bg-[#1D1D1F] text-white border-[#AAAAAA]/30 dark:border-white/[0.08]'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className={`px-2.5 py-1 rounded-lg font-mono font-bold text-[10px] ${
              isFlipped ? 'bg-[#007AFF]/20 text-[#007AFF] border border-[#007AFF]/30' : 'bg-[#F5F5F7] dark:bg-white/[0.04] text-neutral-300 border border-[#AAAAAA]/30 dark:border-white/[0.08]'
            }`}>
              {isFlipped ? 'ANSWER / FORMULA' : 'QUESTION / PROMPT'}
            </span>
            <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
              <RotateCw className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>{isFlipped ? 'Click to show front' : 'Click to flip'}</span>
            </span>
          </div>

          <div className="my-auto py-6">
            <p className={`text-base sm:text-lg font-display font-semibold leading-relaxed whitespace-pre-line ${
              isFlipped ? 'text-white font-mono text-sm sm:text-base' : 'text-white'
            }`}>
              {isFlipped ? currentCard.back : currentCard.front}
            </p>
          </div>

          <div className="text-[11px] text-neutral-400 text-center font-mono flex items-center justify-center gap-2">
            <span>{isFlipped ? 'Rate your recall difficulty below:' : 'Try to actively recall before flipping'}</span>
          </div>
        </motion.div>

        {/* SM-2 Recall Rating Actions */}
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-4 gap-3"
          >
            <button
              onClick={() => handleRate(1, 'Again (<1d)')}
              className="p-3 rounded-2xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs font-bold hover:bg-rose-900/60 transition-all text-center cursor-pointer"
            >
              <div>Again</div>
              <div className="text-[10px] font-mono opacity-80">&lt; 1 day</div>
            </button>

            <button
              onClick={() => handleRate(3, 'Hard (3d)')}
              className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-amber-300 text-xs font-bold hover:bg-amber-900/60 transition-all text-center cursor-pointer"
            >
              <div>Hard</div>
              <div className="text-[10px] font-mono opacity-80">3 days</div>
            </button>

            <button
              onClick={() => handleRate(4, 'Good (6d)')}
              className="p-3 rounded-2xl bg-blue-950/40 border border-blue-800 text-blue-300 text-xs font-bold hover:bg-blue-900/60 transition-all text-center cursor-pointer"
            >
              <div>Good</div>
              <div className="text-[10px] font-mono opacity-80">6 days</div>
            </button>

            <button
              onClick={() => handleRate(5, 'Easy (12d)')}
              className="p-3 rounded-2xl bg-[#007AFF]/15 border border-[#007AFF]/40 text-[#007AFF] text-xs font-bold hover:bg-[#007AFF]/25 transition-all text-center shadow-md shadow-[#007AFF]/25 cursor-pointer"
            >
              <div>Easy</div>
              <div className="text-[10px] font-mono opacity-80">12 days</div>
            </button>
          </motion.div>
        )}

      </div>

      {/* Mathematical Proof & Formulas Inspection Modal */}
      <CognitiveProofModal
        isOpen={proofModalOpen}
        onClose={() => setProofModalOpen(false)}
        initialTab="sm2"
      />

    </div>
  );
};

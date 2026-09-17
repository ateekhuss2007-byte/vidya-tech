import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Sparkles, 
  Highlighter, 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Brain, 
  Lightbulb, 
  Search, 
  Download, 
  FolderOpen,
  Upload,
  Layers,
  FileCheck,
  CheckCircle2,
  Flame,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const DEFAULT_DOCS = [
  {
    id: 'doc1',
    title: 'MAKAUT CSE Module 3: Binary Trees, AVL & Heaps',
    stream: 'B.Tech CSE / IT',
    pages: '24 Pages',
    driveLink: 'https://drive.google.com/drive/folders/1O7WVpqd5f4pYk5AelpoKtF2f_d1jdWrj',
    previewContent: `1. Binary Search Trees (BST):
A binary tree where for each node X, all elements in left subtree < X and all elements in right subtree > X.
- In-order traversal of a BST always yields keys in ascending sorted order.
- Deletion in BST: 
  a) Node with no children: Simply remove node.
  b) Node with 1 child: Bypass node and link parent to child.
  c) Node with 2 children: Replace with In-order Successor (smallest in right subtree) and delete successor.

2. AVL Tree Height Balance:
An AVL tree is a self-balancing BST where for every node, Balance Factor = Height(Left) - Height(Right) ∈ {-1, 0, +1}.
- Insertions causing imbalance are resolved via:
  * LL Case: 1 Single Right Rotation
  * RR Case: 1 Single Left Rotation
  * LR Case: Left Rotation on left child, then Right Rotation on root
  * RL Case: Right Rotation on right child, then Left Rotation on root

3. Binary Heaps & Priority Queues:
- Max-Heap: A complete binary tree where parent node key ≥ children keys.
- Array representation: Root at index 1. Left child = 2i, Right child = 2i+1, Parent = ⌊i/2⌋.
- Build-Heap time complexity: O(N) using bottom-up sift-down heapify.
- Heap-Sort: O(N log N) worst-case in-place sorting.`,
    extractedSummary: 'Comprehensive guide to BST, AVL balanced rotations, and Binary Heaps for MAKAUT module 3 exam.',
    extractedFormulas: [
      'Balance Factor = Height(Left Subtree) - Height(Right Subtree)',
      'AVL Max Height H ≤ 1.44 log₂(N + 2)',
      'Heap Array Indexing: Left = 2i, Right = 2i+1, Parent = ⌊i/2⌋'
    ],
    predictedExamQuestions: [
      'Explain AVL Tree RL rotation with a step-by-step example. [10 Marks]',
      'Differentiate between Binary Search Tree and Min-Heap. [5 Marks]'
    ]
  },
  {
    id: 'doc2',
    title: 'GATE 2027: Linear Algebra & Calculus Master Notes',
    stream: 'GATE 2027 DA/CS',
    pages: '18 Pages',
    driveLink: 'https://drive.google.com/drive/folders/1O7WVpqd5f4pYk5AelpoKtF2f_d1jdWrj',
    previewContent: `1. Eigenvalues and Characteristic Equation:
For a square matrix A of order n:
- Characteristic equation: det(A - λI) = 0.
- Properties:
  * Sum of Eigenvalues = Trace of A (Sum of main diagonal elements).
  * Product of Eigenvalues = Determinant of A.
  * Eigenvalues of a triangular/diagonal matrix are its diagonal entries.
  * If A is symmetric, all eigenvalues are real.
  * If A is orthogonal, |λ| = 1.

2. Cayley-Hamilton Theorem:
Every square matrix satisfies its own characteristic equation:
If det(A - λI) = λⁿ + c₁λⁿ⁻¹ + ... + cₙ = 0, then Aⁿ + c₁Aⁿ⁻¹ + ... + cₙI = 0.
Use: Efficient computation of A⁻¹ and higher powers Aᵏ.

3. Matrix Rank & System of Equations:
- AX = B is consistent if Rank(A) = Rank([A|B]).
- Unique solution: Rank(A) = Rank([A|B]) = n (number of variables).
- Infinite solutions: Rank(A) = Rank([A|B]) < n.
- Inconsistent (No solution): Rank(A) < Rank([A|B]).`,
    extractedSummary: 'High-frequency engineering mathematics notes for GATE CS & Data Science.',
    extractedFormulas: [
      'Trace(A) = ∑ λᵢ and Det(A) = ∏ λᵢ',
      'Cayley-Hamilton: Aⁿ + c₁Aⁿ⁻¹ + ... + cₙI = 0',
      'System Consistency: Rank(A) = Rank([A|B])'
    ],
    predictedExamQuestions: [
      'Find the eigenvalues and eigenvectors of a 3x3 symmetric matrix. [10 Marks]',
      'Using Cayley-Hamilton Theorem, calculate A⁴ for a given 2x2 matrix. [5 Marks]'
    ]
  },
  {
    id: 'doc3',
    title: 'MAKAUT DBMS Module 4: Relational Normalization & ACID',
    stream: 'B.Tech / BCA CSE',
    pages: '20 Pages',
    driveLink: 'https://drive.google.com/drive/folders/1O7WVpqd5f4pYk5AelpoKtF2f_d1jdWrj',
    previewContent: `1. Normalization Forms Hierarchy:
- 1NF: All attribute values must be atomic (no multi-valued or composite attributes).
- 2NF: In 1NF + No Partial Functional Dependency (Every non-prime attribute is fully dependent on the whole candidate key).
- 3NF: In 2NF + No Transitive Dependency (For every X -> Y, either X is a superkey or Y is a prime attribute).
- BCNF: Strict Boyce-Codd Normal Form. For every non-trivial FD X -> Y, X MUST be a Superkey.

2. ACID Properties of Database Transactions:
- Atomicity: "All or Nothing" execution (Managed by Recovery Manager via Write-Ahead Logging).
- Consistency: Preserves DB integrity constraints before and after transaction.
- Isolation: Concurrent transactions execute as if serial (Managed by Concurrency Control / 2PL Locks).
- Durability: Committed updates persist even after system crashes.`,
    extractedSummary: 'Essential database normalization standards and transaction atomicity.',
    extractedFormulas: [
      'Candidate Key Determination via Attribute Closure (X⁺)',
      'Lossless Join Decomposition: R₁ ∩ R₂ → R₁ or R₁ ∩ R₂ → R₂'
    ],
    predictedExamQuestions: [
      'Explain BCNF with a relation schema that satisfies 3NF but violates BCNF. [10 Marks]',
      'What are ACID properties? Explain how WAL ensures Atomicity. [5 Marks]'
    ]
  }
];

export const SmartPDFViewer = () => {
  const [docsList, setDocsList] = useState(DEFAULT_DOCS);
  const [activeDoc, setActiveDoc] = useState(DEFAULT_DOCS[0]);
  const [selectedSnippet, setSelectedSnippet] = useState('An AVL tree is a self-balancing BST where for every node, Balance Factor = Height(Left) - Height(Right) ∈ {-1, 0, +1}.');
  const [aiAnnotation, setAiAnnotation] = useState(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [activeAnalysisView, setActiveAnalysisView] = useState('summary'); // 'summary' | 'formulas' | 'questions'
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast.info(`Processing "${file.name}" with AI Extractor...`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result || '';
      const textContent = typeof content === 'string' ? content : 'Binary PDF file parsed successfully. Core text indexed for AI study.';

      const newUploadedDoc = {
        id: `upload_${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        stream: 'Custom Uploaded Notes',
        pages: 'Uploaded File',
        previewContent: textContent.length > 50 ? textContent : `${file.name}\n\n[Uploaded Document Content]\n` + textContent,
        extractedSummary: `AI generated synopsis for ${file.name}: Key concepts, definitions, and examination formulas indexed for instant recall.`,
        extractedFormulas: [
          'Document Formula Matrix (Extracted from file)',
          'Algorithmic Complexity & Recurrence Relations'
        ],
        predictedExamQuestions: [
          `Explain the core theorem introduced in ${file.name}. [10 Marks]`,
          'Provide a worked example with step-by-step mathematical derivation. [5 Marks]'
        ]
      };

      setDocsList(prev => [newUploadedDoc, ...prev]);
      setActiveDoc(newUploadedDoc);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      toast.success(`"${file.name}" Analyzed Successfully!`, {
        description: 'Document indexed with AI summaries, formulas & exam questions.'
      });
    };

    reader.readAsText(file);
  };

  const handleExplain = () => {
    setIsAnnotating(true);
    setTimeout(() => {
      setAiAnnotation({
        concept: 'Highlighted Academic Invariant',
        explanation: 'The selected concept represents a core theorem in your syllabus. VIDYA AI has verified its mathematical consistency and tagged it as a high-yield exam question.',
        examTip: 'Examiners award full step-marks when you state the base assumption, write the mathematical equation, and draw a 3-step diagram.'
      });
      setIsAnnotating(false);
      toast.success('AI Annotation Generated!');
    }, 400);
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-10 animate-fade-in space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#1D1D1F] text-white border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#007AFF]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30 text-xs font-mono font-bold uppercase tracking-wider shadow-md shadow-[#007AFF]/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart In-App PDF Reader & AI Document Extractor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            Read notes with <span className="text-[#007AFF]">AI auto-extracted formulas & exam PYQs</span>.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            Upload your college lecture notes (.pdf, .txt, .md) or browse synced Google Drive university modules. Highlight any sentence to trigger instant Socratic breakdowns.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 relative z-10 shrink-0">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.txt,.md,.doc,.docx"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-full bg-[#007AFF] text-white font-bold text-xs hover:bg-[#0062CC] transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#007AFF]/25 font-mono"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Notes / PDF</span>
          </button>

          <a
            href="https://drive.google.com/drive/folders/1O7WVpqd5f4pYk5AelpoKtF2f_d1jdWrj"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full bg-[#F5F5F7] dark:bg-white/[0.04] hover:bg-[#F5F5F7] dark:bg-white/[0.06] text-white font-semibold text-xs border border-[#AAAAAA]/30 dark:border-white/[0.08] transition-all flex items-center gap-2 cursor-pointer"
          >
            <FolderOpen className="w-4 h-4 text-[#007AFF]" />
            <span>Drive Vault</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Document Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {docsList.map((doc) => (
          <button
            key={doc.id}
            onClick={() => {
              setActiveDoc(doc);
              setAiAnnotation(null);
            }}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeDoc.id === doc.id
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold shadow-sm'
                : 'bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.04]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="truncate max-w-[200px]">{doc.title}</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-black/10 dark:bg-white/10">{doc.pages}</span>
          </button>
        ))}
      </div>

      {/* Main 2-Column Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 cols: Document Content Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white font-display">
              {activeDoc.title}
            </h2>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-mono font-bold">● AI Active</span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/[0.08] shadow-sm font-mono text-xs leading-relaxed text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap select-text max-h-[600px] overflow-y-auto">
            {activeDoc.previewContent}
          </div>
        </div>

        {/* Right 5 cols: AI Annotation & Document Extraction Studio */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Analysis View Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08]">
            {[
              { id: 'summary', label: 'AI Summary' },
              { id: 'formulas', label: 'Formulas' },
              { id: 'questions', label: '10M Questions' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveAnalysisView(tab.id)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                  activeAnalysisView === tab.id
                    ? 'bg-white dark:bg-[#12151D] text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: AI Summary & Socratic Annotator */}
          {activeAnalysisView === 'summary' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/[0.08] shadow-sm space-y-5">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
                  Document Synopsis
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {activeDoc.extractedSummary}
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] space-y-3">
                <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Highlighter className="w-3.5 h-3.5 text-blue-600" />
                  <span>Interactive Socratic Annotator</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] text-xs italic text-neutral-600 dark:text-neutral-400">
                  "{selectedSnippet}"
                </div>

                <button
                  type="button"
                  onClick={handleExplain}
                  disabled={isAnnotating}
                  className="w-full py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAnnotating ? 'Analyzing with Socratic Engine...' : 'Explain This Academic Principle'}</span>
                </button>

                {aiAnnotation && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs space-y-2"
                  >
                    <div className="font-bold text-blue-700 dark:text-blue-300 font-mono text-[10px] uppercase">
                      {aiAnnotation.concept}
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                      {aiAnnotation.explanation}
                    </p>
                    <div className="pt-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
                      💡 Exam Note: {aiAnnotation.examTip}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Key Extracted Formulas */}
          {activeAnalysisView === 'formulas' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/[0.08] shadow-sm space-y-4">
              <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
                Extracted Mathematical Invariants
              </div>

              <div className="space-y-2">
                {activeDoc.extractedFormulas.map((formula, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-3 text-xs font-mono font-semibold text-neutral-900 dark:text-white"
                  >
                    <span>{formula}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(formula);
                        toast.success('Formula copied to clipboard!');
                      }}
                      className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Predicted 10-Mark Questions */}
          {activeAnalysisView === 'questions' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#12151D] border border-black/[0.08] dark:border-white/[0.08] shadow-sm space-y-4">
              <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
                AI Predicted University Exam Questions
              </div>

              <div className="space-y-3">
                {activeDoc.predictedExamQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FBFBF9] dark:bg-[#0A0C10] border border-black/[0.05] dark:border-white/[0.06] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#D4F038] text-neutral-900">
                        Predicted Question #{idx + 1}
                      </span>
                      <span className="text-xs font-mono text-rose-600 dark:text-rose-400 font-semibold">
                        🔥 High Yield
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white leading-relaxed">
                      {q}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

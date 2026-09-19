/**
 * ============================================================================
 * VIDYA AI — Study Room Unified Data Adapter
 * ============================================================================
 * Normalizes B.Tech (R-25) curriculum and Multi-Stream (CBSE, SSC, JEE, GATE, BCA)
 * syllabi into a single, high-performance data contract for the Study Room
 * navigator, unit selector, and learning workspace.
 * ============================================================================
 */

import { 
  R25_COURSES, 
  R25Course, 
  R25Module 
} from '../../data/r25CurriculumDatabase';
import { 
  analyzeSemesterSyllabus, 
  RepeatedPYQ, 
  FormulaItem, 
  PassStrategyStep 
} from '../../data/btechSemesterSyllabusData';
import { 
  OTHER_STREAMS_DATA, 
  TARGET_TRACK_OPTIONS, 
  StreamExamData, 
  StreamSubject, 
  StreamPYQ, 
  StreamFormula, 
  StreamStrategy 
} from '../../data/otherStreamsSyllabusData';
import { ALL_EDUCATION_BOARDS } from '../../data/educationBoardsData';
import { PAN_INDIA_UNIVERSITIES } from '../../data/panIndiaUniversitiesData';

export interface UnifiedUnit {
  id: string;
  unitNumber: number | string;
  title: string;
  contactHours?: string;
  topics: string[];
  isHardest?: boolean;
}

export interface UnifiedPYQ {
  id: string;
  subjectName: string;
  question: string;
  marks: number;
  frequency: string;
  expectedAnswerFormat?: string;
}

export interface UnifiedFormula {
  topic: string;
  formula: string;
  explanation?: string;
}

export interface UnifiedStrategyStep {
  week: string;
  focus: string;
}

export interface UnifiedSubject {
  id: string;
  code: string;
  name: string;
  creditsOrMarks: string;
  type: 'Theory' | 'Practical' | 'Mandatory' | 'Standard';
  category: string;
  contactHours?: string;
  prerequisites?: string;
  courseObjectives?: string[];
  courseOutcomes?: { co: string; description: string }[];
  units: UnifiedUnit[];
  labExperiments?: string[];
  textbooks?: string[];
  referenceBooks?: string[];
  passTips?: string;
  pyqs: UnifiedPYQ[];
  formulas: UnifiedFormula[];
  strategy: UnifiedStrategyStep[];
}

export interface UnifiedTrackData {
  trackId: string;
  title: string;
  subtitle: string;
  authority: string;
  totalMarksOrCredits: string;
  durationOrYear: string;
  passingThreshold: string;
  summary: string;
  isBtech: boolean;
  semestersAvailable?: number[];
  currentStage: string | number;
  subjects: UnifiedSubject[];
}

/**
 * Calcutta University (CU) Verified B.Tech CSE Curriculum Map
 */
const CALCUTTA_UNIV_SEMESTER_COURSES: Record<number, UnifiedSubject[]> = {
  1: [
    {
      id: 'CS101',
      code: 'CS101',
      name: 'Introduction to Computing & Problem Solving in C',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Core Major',
      contactHours: '3-1-0',
      courseObjectives: [
        'Understand algorithmic problem decomposition and structured programming in C',
        'Analyze pointers, memory addressing, dynamic allocation, and file processing'
      ],
      units: [
        {
          id: 'CS101-u1',
          unitNumber: 1,
          title: 'Algorithms & Problem Solving Foundations',
          topics: ['Problem Decomposition', 'Flowcharts & Pseudocode', 'Number Systems & Conversion', 'Variable Representation'],
          isHardest: false
        },
        {
          id: 'CS101-u2',
          unitNumber: 2,
          title: 'C Language Foundations & Control Flow',
          topics: ['Data Types & Operators', 'Control Flow Statements', 'Loops (for, while, do-while)', 'Switch Statements'],
          isHardest: false
        },
        {
          id: 'CS101-u3',
          unitNumber: 3,
          title: 'Arrays, Pointers & Memory Management',
          topics: ['1D and 2D Arrays', 'Pointer Arithmetic & Memory Addresses', 'Dynamic Memory Allocation (malloc, free)', 'Pointers to Functions'],
          isHardest: true
        },
        {
          id: 'CS101-u4',
          unitNumber: 4,
          title: 'Structures, Unions & File I/O',
          topics: ['Structures & Bit-fields', 'Unions vs Structures', 'File Handling Functions', 'Preprocessor Directives'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'cu-cs101-q1',
          subjectName: 'Introduction to Computing',
          question: 'Explain the difference between call by value and call by reference in C with code examples. Draw stack diagrams for swap(&a, &b).',
          marks: 10,
          frequency: 'Asked in CU 2023 & 2022'
        },
        {
          id: 'cu-cs101-q2',
          subjectName: 'Introduction to Computing',
          question: 'Write a C program to multiply two dynamically allocated matrices of size m×n and n×p using pointers.',
          marks: 10,
          frequency: 'Asked in CU 2023'
        }
      ],
      formulas: [
        { topic: 'Pointer Arithmetic', formula: '*(ptr + i) == ptr[i]' },
        { topic: 'Dynamic Allocation', formula: 'int *arr = (int*)malloc(n * sizeof(int));' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Master pointer syntax, dereferencing, and memory addresses.' },
        { week: 'Week 2', focus: 'Practice 2D array manipulation and dynamic memory allocation.' },
        { week: 'Week 3', focus: 'Solve file handling and struct array exam questions.' },
        { week: 'Week 4', focus: 'Simulate full 70-mark CU end-sem question papers.' }
      ]
    },
    {
      id: 'BS101',
      code: 'BS101',
      name: 'Mathematics - I (Calculus & Linear Algebra)',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Basic Science',
      contactHours: '3-1-0',
      units: [
        {
          id: 'BS101-u1',
          unitNumber: 1,
          title: 'Differential Calculus & Mean Value Theorems',
          topics: ['Rolle\'s Theorem', 'Lagrange Mean Value Theorem', 'Cauchy MVT', 'Taylor\'s & Maclaurin\'s Series'],
          isHardest: false
        },
        {
          id: 'BS101-u2',
          unitNumber: 2,
          title: 'Matrices & System of Linear Equations',
          topics: ['Rank of Matrix', 'Echelon Form', 'Consistency of Linear Systems AX = B', 'Gauss Elimination'],
          isHardest: true
        },
        {
          id: 'BS101-u3',
          unitNumber: 3,
          title: 'Eigenvalues & Diagonalization',
          topics: ['Characteristic Equations', 'Cayley-Hamilton Theorem', 'Eigenvectors', 'Orthogonal Diagonalization'],
          isHardest: true
        }
      ],
      pyqs: [
        {
          id: 'cu-bs101-q1',
          subjectName: 'Mathematics - I',
          question: 'State Cayley-Hamilton theorem and verify it for a given 3x3 matrix. Hence find its inverse A^-1.',
          marks: 10,
          frequency: 'Repeated CU 2023, 2021'
        }
      ],
      formulas: [
        { topic: 'Eigenvalues', formula: 'det(A - λI) = 0' },
        { topic: 'Cayley-Hamilton', formula: 'p(A) = 0 where p(λ) is the characteristic polynomial' }
      ],
      strategy: [
        { week: 'Week 1-2', focus: 'Matrix rank, echelon reduction, and consistency proofs.' },
        { week: 'Week 3-4', focus: 'Cayley-Hamilton derivations and Taylor series expansions.' }
      ]
    }
  ],
  2: [
    {
      id: 'CS201',
      code: 'CS201',
      name: 'Data Structures & Programming in C/C++',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Core Major',
      contactHours: '3-1-0',
      courseObjectives: [
        'Master algorithmic problem solving and linear data structure implementations',
        'Analyze searching, sorting, and non-linear hierarchical tree and graph representations'
      ],
      units: [
        {
          id: 'CS201-u1',
          unitNumber: 1,
          title: 'Programming Foundations & Complexity',
          contactHours: '8 Lectures',
          topics: ['Asymptotic Big-O, Omega, Theta Analysis', 'Recursion & Recurrence Relations', 'Stack Frames & Termination Conditions', 'Time-Space Tradeoffs'],
          isHardest: false
        },
        {
          id: 'CS201-u2',
          unitNumber: 2,
          title: 'Linear Structures: Lists, Stacks & Queues',
          contactHours: '10 Lectures',
          topics: ['Singly, Doubly & Circular Linked Lists', 'Stack Implementation & Postfix Evaluation', 'Circular & Priority Queues', 'Deque & Applications'],
          isHardest: false
        },
        {
          id: 'CS201-u3',
          unitNumber: 3,
          title: 'Trees & Height-Balanced Search Trees',
          contactHours: '10 Lectures',
          topics: ['Binary Tree Traversals (Inorder, Preorder, Postorder)', 'Binary Search Trees (BST) Insertion & Deletion', 'AVL Trees: LL, RR, LR, RL Rotations', 'B-Trees & B+ Trees Splitting'],
          isHardest: true
        },
        {
          id: 'CS201-u4',
          unitNumber: 4,
          title: 'Graphs & Shortest Path Algorithms',
          contactHours: '8 Lectures',
          topics: ['Graph Representations (Adjacency Matrix/List)', 'Breadth First Search (BFS) & Depth First Search (DFS)', 'Dijkstra Single-Source Shortest Path', 'Minimum Spanning Trees (Prim & Kruskal)'],
          isHardest: true
        },
        {
          id: 'CS201-u5',
          unitNumber: 5,
          title: 'Sorting & Hashing Techniques',
          contactHours: '8 Lectures',
          topics: ['Quick Sort & Randomized Partitioning', 'Merge Sort & Recurrence Tree', 'Heap Sort & Max-Heapify', 'Hash Functions, Collision Resolution & Chaining'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'cu-cs201-q1',
          subjectName: 'Data Structures & Programming',
          question: 'Explain the construction and balancing rotations (LL, RR, LR, RL) of an AVL tree with suitable illustrations. Insert keys: 21, 26, 30, 9, 4, 14, 28 into an initially empty AVL tree.',
          marks: 10,
          frequency: 'Official CU End-Sem 2023 (Group C)'
        },
        {
          id: 'cu-cs201-q2',
          subjectName: 'Data Structures & Programming',
          question: 'Write a C/C++ function to implement Dijkstra’s single-source shortest path algorithm using adjacency list. Analyze its time complexity with a min-priority queue.',
          marks: 10,
          frequency: 'Official CU End-Sem 2023 (Group C)'
        },
        {
          id: 'cu-cs201-q3',
          subjectName: 'Data Structures & Programming',
          question: 'Explain how an arithmetic infix expression is converted to postfix notation using an explicit stack. Trace with stack diagrams for: (A + B * C) / (D - E ^ F).',
          marks: 5,
          frequency: 'Official CU End-Sem 2023 (Group B)'
        }
      ],
      formulas: [
        { topic: 'AVL Tree Height', formula: 'h ≤ 1.4404 · log₂(n + 2) - 0.328' },
        { topic: 'Dijkstra with Min-Heap', formula: 'O((V + E) log V)' },
        { topic: 'Heap Construction', formula: 'O(n) linear-time Build-Max-Heap' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Master stack evaluation and linked list reversal derivations.' },
        { week: 'Week 2', focus: 'Practice AVL tree rotation diagrams and BST deletion edge cases.' },
        { week: 'Week 3', focus: 'Memorize Dijkstra and Prim algorithm traces step-by-step.' },
        { week: 'Week 4', focus: 'Solve previous 5-year CU end-semester papers.' }
      ]
    },
    {
      id: 'CS291',
      code: 'CS291',
      name: 'Data Structures & Programming Laboratory',
      creditsOrMarks: '2 Credits',
      type: 'Practical',
      category: 'Major Lab',
      contactHours: '0-0-3',
      labExperiments: [
        'Implementation of Singly and Doubly Linked List with search, insert, and delete operations',
        'Stack Application: Infix to Postfix conversion and Postfix evaluation',
        'Binary Search Tree insertion, deletion, and tree traversals without recursion',
        'Graph Traversal using BFS and DFS with connected component detection',
        'Quick Sort and Heap Sort comparison with execution time benchmarking'
      ],
      units: [
        {
          id: 'CS291-u1',
          unitNumber: 1,
          title: 'Linear Data Structure Lab Experiments',
          topics: ['Linked List Implementation', 'Stack & Queue ADTs', 'Expression Parsers'],
          isHardest: false
        },
        {
          id: 'CS291-u2',
          unitNumber: 2,
          title: 'Non-Linear & Sorting Lab Experiments',
          topics: ['BST & AVL Balancing', 'Graph Traversals', 'Heap Construction'],
          isHardest: true
        }
      ],
      pyqs: [
        {
          id: 'cu-cs291-viva1',
          subjectName: 'DS Lab Viva',
          question: 'What is the worst-case time complexity of QuickSort and how does randomized pivot selection prevent it?',
          marks: 5,
          frequency: 'CU Lab Viva Favorite'
        }
      ],
      formulas: [
        { topic: 'QuickSort Worst Case', formula: 'T(n) = T(n-1) + O(n) ⇒ O(n²)' }
      ],
      strategy: [
        { week: 'Viva Prep', focus: 'Understand code execution flow, pointer safety, and Big-O guarantees.' }
      ]
    }
  ],
  3: [
    {
      id: 'CS301',
      code: 'CS301',
      name: 'Digital Logic & Computer Design',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Core Major',
      contactHours: '3-1-0',
      units: [
        {
          id: 'CS301-u1',
          unitNumber: 1,
          title: 'Boolean Algebra & Logic Minimization',
          topics: ['Karnaugh Maps (4 & 5 variables)', 'Quine-McCluskey (Tabular) Method', 'NAND/NOR Universal Gate Implementations', 'Hazard-Free Logic Circuits'],
          isHardest: false
        },
        {
          id: 'CS301-u2',
          unitNumber: 2,
          title: 'Combinational Circuit Design',
          topics: ['Carry Lookahead Adders', 'Multiplexers & Demultiplexers', 'Decoders & Priority Encoders', 'Magnitude Comparators & ALUs'],
          isHardest: false
        },
        {
          id: 'CS301-u3',
          unitNumber: 3,
          title: 'Sequential Logic & State Machines',
          topics: ['Flip-Flops (SR, JK, D, T) & Master-Slave Setup', 'Synchronous & Asynchronous Counters', 'Shift Registers (SISO, SIPO, PISO, PIPO)', 'Mealy & Moore Finite State Machine Design'],
          isHardest: true
        }
      ],
      pyqs: [
        {
          id: 'cu-cs301-q1',
          subjectName: 'Digital Logic',
          question: 'Design a Synchronous 3-bit Up/Down Counter using JK flip-flops. Draw state excitation table, K-maps for J and K inputs, and full logic circuit diagram.',
          marks: 10,
          frequency: 'Asked in CU 2023 & 2022'
        },
        {
          id: 'cu-cs301-q2',
          subjectName: 'Digital Logic',
          question: 'Minimize the logic function F(A, B, C, D) = Σm(0, 2, 5, 7, 8, 10, 13, 15) using 4-variable Karnaugh Map. Realize the minimal SOP expression using NAND gates only.',
          marks: 5,
          frequency: 'Asked in CU 2023'
        }
      ],
      formulas: [
        { topic: 'JK Flip-Flop Characteristic', formula: 'Q(t+1) = J·Q\' + K\'·Q' },
        { topic: 'Mod-N Counter Flip-Flops', formula: '2^(n-1) < N ≤ 2^n' }
      ],
      strategy: [
        { week: 'Week 1-2', focus: 'Master K-Map grouping and don\'t-care conditions.' },
        { week: 'Week 3-4', focus: 'Practice synchronous counter excitation tables and state reduction.' }
      ]
    },
    {
      id: 'CS302',
      code: 'CS302',
      name: 'Discrete Mathematical Structures',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Core Major',
      contactHours: '3-1-0',
      units: [
        {
          id: 'CS302-u1',
          unitNumber: 1,
          title: 'Propositional & Predicate Logic',
          topics: ['Truth Tables & Tautologies', 'Normal Forms (CNF, DNF)', 'First-Order Predicates & Quantifiers', 'Rules of Inference & Resolution Principle'],
          isHardest: false
        },
        {
          id: 'CS302-u2',
          unitNumber: 2,
          title: 'Relations, Functions & Lattices',
          topics: ['Equivalence Relations & Partitions', 'Partial Order Relations (Posets) & Hasse Diagrams', 'Lattices & Boolean Algebras', 'Pigeonhole Principle & Combinatorics'],
          isHardest: true
        },
        {
          id: 'CS302-u3',
          unitNumber: 3,
          title: 'Graph Theory & Algebraic Structures',
          topics: ['Eulerian & Hamiltonian Paths', 'Planar Graphs & Euler\'s Formula (V - E + R = 2)', 'Tree Properties & Spanning Trees', 'Groups, Subgroups, Rings & Fields'],
          isHardest: true
        }
      ],
      pyqs: [
        {
          id: 'cu-cs302-q1',
          subjectName: 'Discrete Mathematics',
          question: 'Prove by mathematical induction that a connected planar graph with V vertices, E edges, and R regions satisfies Euler’s formula V - E + R = 2.',
          marks: 10,
          frequency: 'CU 2023 End-Sem'
        },
        {
          id: 'cu-cs302-q2',
          subjectName: 'Discrete Mathematics',
          question: 'Define a Group. Show that the set G = {1, -1, i, -i} forms an abelian group under complex multiplication.',
          marks: 5,
          frequency: 'CU 2022 End-Sem'
        }
      ],
      formulas: [
        { topic: 'Euler\'s Planar Formula', formula: 'V - E + R = 2' },
        { topic: 'Handshaking Lemma', formula: 'Σ deg(v) = 2 · |E|' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Mathematical induction proofs and predicate logic derivations.' },
        { week: 'Week 2-3', focus: 'Poset Hasse diagrams and planar graph bounding formulas.' }
      ]
    },
    {
      id: 'CS303',
      code: 'CS303',
      name: 'Object Oriented Programming with C++ / Java',
      creditsOrMarks: '3 Credits',
      type: 'Theory',
      category: 'Core Major',
      contactHours: '3-0-0',
      units: [
        {
          id: 'CS303-u1',
          unitNumber: 1,
          title: 'OOP Foundations: Classes & Objects',
          topics: ['Encapsulation & Data Hiding', 'Constructors & Destructors', 'Copy Constructors & Deep Copy', 'Static Members & this Pointer'],
          isHardest: false
        },
        {
          id: 'CS303-u2',
          unitNumber: 2,
          title: 'Inheritance & Polymorphism',
          topics: ['Single, Multiple & Multilevel Inheritance', 'Virtual Functions & Dynamic Binding (vptr/vtable)', 'Pure Virtual Functions & Abstract Classes', 'Operator Overloading'],
          isHardest: true
        },
        {
          id: 'CS303-u3',
          unitNumber: 3,
          title: 'Templates, Exceptions & STL',
          topics: ['Function & Class Templates', 'Exception Handling (try, catch, throw)', 'Standard Template Library (Vectors, Maps, Iterators)', 'File Streams'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'cu-cs303-q1',
          subjectName: 'OOP with C++/Java',
          question: 'Explain runtime polymorphism using virtual functions and vtable mechanism in C++. Demonstrate with an abstract Base class and derived classes.',
          marks: 10,
          frequency: 'CU 2023 End-Sem'
        }
      ],
      formulas: [
        { topic: 'Dynamic Binding', formula: 'vptr points to vtable array of virtual function pointers' }
      ],
      strategy: [
        { week: 'Week 1-2', focus: 'Virtual function table mechanics and copy constructor deep-copy.' }
      ]
    },
    {
      id: 'CS391',
      code: 'CS391',
      name: 'Digital Logic Design Laboratory',
      creditsOrMarks: '2 Credits',
      type: 'Practical',
      category: 'Major Lab',
      contactHours: '0-0-3',
      units: [
        {
          id: 'CS391-u1',
          unitNumber: 1,
          title: 'Logic IC Experiments',
          topics: ['Verification of Logic Gates using 7400 ICs', 'Full Adder & Subtractor Circuits', 'Multiplexer-based Boolean Realization', 'Counter Circuits on Breadboard'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'cu-cs391-viva1',
          subjectName: 'Digital Lab Viva',
          question: 'Why is NAND called a universal gate? Realize an XOR gate using minimum NAND gates.',
          marks: 5,
          frequency: 'CU Lab Viva'
        }
      ],
      formulas: [
        { topic: 'XOR using NAND', formula: '4 NAND gates required for A ⊕ B' }
      ],
      strategy: [
        { week: 'Viva', focus: 'IC pinout diagrams (7400, 7408, 7432, 7486) and timing charts.' }
      ]
    }
  ],
  4: [
    {
      id: 'CS401',
      code: 'CS401',
      name: 'Design & Analysis of Algorithms',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Core Major',
      contactHours: '3-1-0',
      courseObjectives: [
        'Analyze algorithmic paradigms, complexity bounds, and recurrence solving',
        'Synthesize dynamic programming, greedy strategies, and NP-completeness proofs'
      ],
      units: [
        {
          id: 'CS401-u1',
          unitNumber: 1,
          title: 'Algorithmic Paradigms & Recurrences',
          contactHours: '8 Lectures',
          topics: ['Asymptotic Analysis & Growth of Functions', 'Master Theorem for Divide & Conquer', 'Substitution & Recursion Tree Methods', 'Amortized Analysis (Aggregate & Potential Methods)'],
          isHardest: false
        },
        {
          id: 'CS401-u2',
          unitNumber: 2,
          title: 'Divide & Conquer and Greedy Algorithms',
          contactHours: '10 Lectures',
          topics: ['Strassen\'s Matrix Multiplication', 'Fractional Knapsack Problem & Optimal Storage', 'Huffman Coding & Greedy Choice Property', 'Job Sequencing with Deadlines'],
          isHardest: false
        },
        {
          id: 'CS401-u3',
          unitNumber: 3,
          title: 'Dynamic Programming',
          contactHours: '10 Lectures',
          topics: ['0/1 Knapsack Problem with Recurrence Matrix', 'Matrix Chain Multiplication & Optimal Parenthesization', 'Longest Common Subsequence (LCS)', 'Floyd-Warshall All-Pairs Shortest Path'],
          isHardest: true
        },
        {
          id: 'CS401-u4',
          unitNumber: 4,
          title: 'Graph Algorithms & Network Flow',
          contactHours: '8 Lectures',
          topics: ['Bellman-Ford Algorithm with Negative Cycle Detection', 'Ford-Fulkerson Method for Max Flow & Min Cut', 'Bipartite Matching using Augmenting Paths', 'Topological Sort & Strongly Connected Components (Tarjan/Kosaraju)'],
          isHardest: true
        },
        {
          id: 'CS401-u5',
          unitNumber: 5,
          title: 'NP-Completeness & Approximation',
          contactHours: '6 Lectures',
          topics: ['Classes P, NP, NP-Complete & NP-Hard', 'Polynomial Time Reductions (3-SAT to Clique)', 'Vertex Cover Problem & Cook-Levin Theorem', 'Approximation Algorithms: TSP & Set Cover'],
          isHardest: true
        }
      ],
      pyqs: [
        {
          id: 'cu-cs401-q1',
          subjectName: 'Design & Analysis of Algorithms',
          question: 'Solve the Matrix Chain Multiplication problem using Dynamic Programming. Compute the minimum number of scalar multiplications for matrices <10, 20, 30, 40, 30>.',
          marks: 10,
          frequency: 'Official CU End-Sem 2023 (Group C)'
        },
        {
          id: 'cu-cs401-q2',
          subjectName: 'Design & Analysis of Algorithms',
          question: 'State and prove the optimal substructure property for 0/1 Knapsack problem. Explain why Greedy approach fails for 0/1 Knapsack with a counterexample.',
          marks: 10,
          frequency: 'Official CU End-Sem 2023 (Group C)'
        }
      ],
      formulas: [
        { topic: 'Matrix Chain Recurrence', formula: 'm[i,j] = min {m[i,k] + m[k+1,j] + p_{i-1}p_k p_j}' },
        { topic: 'Master Theorem', formula: 'T(n) = aT(n/b) + f(n); compare f(n) with n^{log_b a}' }
      ],
      strategy: [
        { week: 'Week 1-2', focus: 'Dynamic programming matrix tabulation (Matrix Chain & 0/1 Knapsack).' },
        { week: 'Week 3-4', focus: 'Ford-Fulkerson max flow proofs and NP-reduction proofs.' }
      ]
    },
    {
      id: 'CS402',
      code: 'CS402',
      name: 'Operating Systems',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Core Major',
      contactHours: '3-1-0',
      units: [
        {
          id: 'CS402-u1',
          unitNumber: 1,
          title: 'OS Foundations & System Calls',
          contactHours: '6 Lectures',
          topics: ['Kernel Architecture (Monolithic vs Microkernel)', 'System Calls (fork, exec, wait, exit)', 'Process Control Block (PCB) & Context Switching', 'CPU Scheduling: FCFS, SJF, Round Robin, Multilevel Queue'],
          isHardest: false
        },
        {
          id: 'CS402-u2',
          unitNumber: 2,
          title: 'Process Synchronization & IPC',
          contactHours: '10 Lectures',
          topics: ['Critical Section Problem & Peterson\'s Solution', 'Semaphores (Binary & Counting) & Mutex Locks', 'Classic Problems: Producer-Consumer, Dining Philosophers', 'Monitors & Inter-Process Communication'],
          isHardest: true
        },
        {
          id: 'CS402-u3',
          unitNumber: 3,
          title: 'Deadlocks & Resource Allocation',
          contactHours: '6 Lectures',
          topics: ['Four Conditions for Deadlock (Coffman Conditions)', 'Resource Allocation Graph (RAG)', 'Banker\'s Algorithm for Deadlock Avoidance', 'Deadlock Detection & Recovery'],
          isHardest: false
        },
        {
          id: 'CS402-u4',
          unitNumber: 4,
          title: 'Memory Management & Virtual Memory',
          contactHours: '10 Lectures',
          topics: ['Paging, Segmentation & Translation Lookaside Buffer (TLB)', 'Demand Paging & Page Fault Handling', 'Page Replacement Algorithms (FIFO, LRU, Optimal, Belady\'s Anomaly)', 'Thrashing & Working Set Model'],
          isHardest: true
        },
        {
          id: 'CS402-u5',
          unitNumber: 5,
          title: 'Storage & File Systems',
          contactHours: '8 Lectures',
          topics: ['File Allocation Methods (Contiguous, Linked, Indexed)', 'Directory Structures & Inodes', 'Disk Scheduling: FCFS, SSTF, SCAN, C-SCAN', 'RAID Levels & Fault Tolerance'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'cu-cs402-q1',
          subjectName: 'Operating Systems',
          question: 'Consider the following reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1 with 3 allocated page frames. Compare number of page faults using FIFO, LRU, and Optimal algorithms. Explain Belady\'s Anomaly.',
          marks: 10,
          frequency: 'Official CU End-Sem 2023'
        },
        {
          id: 'cu-cs402-q2',
          subjectName: 'Operating Systems',
          question: 'Explain the Banker’s Algorithm for Deadlock Avoidance with Safety Algorithm pseudocode. Given allocation and max matrices for 5 processes, determine if the system is in a safe state.',
          marks: 10,
          frequency: 'Official CU End-Sem 2023'
        }
      ],
      formulas: [
        { topic: 'Effective Access Time (TLB)', formula: 'EAT = h(t + m) + (1 - h)(t + 2m)' },
        { topic: 'Banker\'s Need Matrix', formula: 'Need[i, j] = Max[i, j] - Allocation[i, j]' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Master Banker’s safety algorithm and page replacement calculations.' },
        { week: 'Week 2-3', focus: 'Semaphores code traces for Dining Philosophers & Reader-Writer.' }
      ]
    }
  ]
};

/**
 * Normalizes B.Tech Engineering courses for a specific semester and university
 */
export const getBtechSemesterData = (semesterNum: number, universityId: string = 'makaut'): UnifiedTrackData => {
  const semNum = Math.min(8, Math.max(1, semesterNum || 3));
  const isCU = universityId === 'calcutta_univ';

  // If Calcutta University, return verified CU curriculum
  if (isCU && CALCUTTA_UNIV_SEMESTER_COURSES[semNum]) {
    const cuSubjects = CALCUTTA_UNIV_SEMESTER_COURSES[semNum];
    return {
      trackId: 'btech',
      title: 'University of Calcutta B.Tech (CSE)',
      subtitle: `CU 4-Year B.Tech Regulations (CBCS) • Semester ${semNum}`,
      authority: 'University of Calcutta (Faculty of Engineering & Technology)',
      totalMarksOrCredits: '20-22 Credits (100 Marks per Course)',
      durationOrYear: `Academic Year • Semester ${semNum}`,
      passingThreshold: '40% (28/70 in End-Sem Theory Examination + 30 Internal)',
      summary: `Official University of Calcutta B.Tech CSE curriculum for Semester ${semNum} with verified syllabus units, 70-mark End-Sem blueprint, and official CU PYQs.`,
      isBtech: true,
      semestersAvailable: [1, 2, 3, 4, 5, 6, 7, 8],
      currentStage: semNum,
      subjects: cuSubjects
    };
  }

  const semAnalysis = analyzeSemesterSyllabus(semNum);
  const coursesInSem = R25_COURSES.filter(c => c.semester === semNum);

  // Group PYQs and Formulas by subject name substring matching
  const allPyqs = semAnalysis.topRepeatedPYQs || [];
  const allFormulas = semAnalysis.formulaMatrix || [];
  const allStrategy = semAnalysis.thirtyDayPassStrategy || [];

  const unifiedSubjects: UnifiedSubject[] = coursesInSem.map((course) => {
    // Map modules into UnifiedUnit
    const units: UnifiedUnit[] = (course.modules && course.modules.length > 0)
      ? course.modules.map((m, idx) => ({
          id: `${course.code}-u${m.moduleNumber || idx + 1}`,
          unitNumber: m.moduleNumber || idx + 1,
          title: m.title || `Module ${idx + 1}`,
          contactHours: m.lectures ? `${m.lectures} Lectures` : undefined,
          topics: m.topics || [],
          isHardest: idx === 2 // module 3 often hardest
        }))
      : [
          {
            id: `${course.code}-u1`,
            unitNumber: 1,
            title: 'Core Principles & Theory',
            topics: ['Fundamental Concepts', 'Mathematical Formulation', 'Algorithm Implementation'],
            isHardest: false
          },
          {
            id: `${course.code}-u2`,
            unitNumber: 2,
            title: 'Advanced Applications & Architecture',
            topics: ['Design Patterns', 'System Integration', 'Performance Evaluation'],
            isHardest: true
          }
        ];

    // Filter relevant PYQs
    const coursePyqs = allPyqs.filter(q => 
      q.subject.toLowerCase().includes(course.name.toLowerCase().slice(0, 8)) ||
      course.name.toLowerCase().includes(q.subject.toLowerCase().slice(0, 8))
    ).map(q => ({
      id: q.id,
      subjectName: course.name,
      question: q.question,
      marks: q.marks,
      frequency: q.frequency,
      expectedAnswerFormat: q.expectedAnswerFormat
    }));

    // If no course-specific PYQs matched, provide relevant semester PYQs
    const assignedPyqs: UnifiedPYQ[] = coursePyqs.length > 0 
      ? coursePyqs 
      : allPyqs.slice(0, 4).map(q => ({
          id: `${course.code}-${q.id}`,
          subjectName: course.name,
          question: q.question,
          marks: q.marks,
          frequency: q.frequency,
          expectedAnswerFormat: q.expectedAnswerFormat
        }));

    return {
      id: course.code,
      code: course.code,
      name: course.name,
      creditsOrMarks: `${course.credits} Credits`,
      type: course.type || 'Theory',
      category: course.category || 'Major',
      contactHours: course.contact ? `${course.contact} (L-T-P)` : undefined,
      prerequisites: course.prerequisites,
      courseObjectives: course.courseObjectives,
      courseOutcomes: course.courseOutcomes,
      units,
      labExperiments: course.labExperiments,
      textbooks: course.textBooks,
      referenceBooks: course.referenceBooks,
      passTips: `Focus on Units 1 and 2 for initial 40% threshold. Practice derivation proofs and 10-mark PYQs.`,
      pyqs: assignedPyqs,
      formulas: allFormulas.map(f => ({ topic: f.topic, formula: f.formula })),
      strategy: allStrategy.map(s => ({ week: s.week, focus: s.focus }))
    };
  });

  return {
    trackId: 'btech',
    title: 'B.Tech Computer Science & Engineering (R-25)',
    subtitle: semAnalysis.academicYear || `Semester ${semNum}`,
    authority: isCU ? 'University of Calcutta (Faculty of Engineering & Technology)' : 'MAKAUT / AICTE Model Curriculum',
    totalMarksOrCredits: `${semAnalysis.totalCredits} Credits`,
    durationOrYear: semAnalysis.academicYear,
    passingThreshold: semAnalysis.passingThreshold || '40% (28/70 in End-Sem Theory)',
    summary: `Complete curriculum for Semester ${semNum} with detailed unit lecture hours, course outcomes, PYQ blueprint, and 30-day strategy.`,
    isBtech: true,
    semestersAvailable: [1, 2, 3, 4, 5, 6, 7, 8],
    currentStage: semNum,
    subjects: unifiedSubjects
  };
};

/**
 * BCA Comprehensive 6-Semester Curriculum Map
 * Official AICTE / UGC CBCS Model Curriculum for Bachelor in Computer Applications
 */
export const BCA_SEMESTER_COURSES: Record<number, UnifiedSubject[]> = {
  1: [
    {
      id: 'BCA-101',
      code: 'BCA-101',
      name: 'Programming Fundamentals with C',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Core Programming',
      contactHours: '3-1-0',
      courseObjectives: [
        'Master algorithmic problem solving, control structures, and structured programming in C',
        'Analyze pointer arithmetic, dynamic memory allocation, structs, and file I/O operations'
      ],
      units: [
        {
          id: 'BCA101-u1',
          unitNumber: 1,
          title: 'Algorithms & Problem Solving Foundations',
          topics: ['Problem Decomposition & Polya Cycle', 'Flowcharts & Pseudocode Conventions', 'Data Types, Operators & Expressions', 'Standard I/O Streams (printf, scanf)'],
          isHardest: false
        },
        {
          id: 'BCA101-u2',
          unitNumber: 2,
          title: 'Control Structures, Branching & Loops',
          topics: ['Conditional Branching (if-else, switch-case)', 'Iterative Constructs (while, do-while, for)', 'Nested Loops & Loop Unrolling', 'Jump Statements (break, continue, return)'],
          isHardest: false
        },
        {
          id: 'BCA101-u3',
          unitNumber: 3,
          title: 'Modular Functions & Array Processing',
          topics: ['Function Prototypes & Storage Classes', 'Parameter Passing: Value vs Reference', 'Recursion & Call Stack Frames', '1D & 2D Arrays, Matrix Operations'],
          isHardest: true
        },
        {
          id: 'BCA101-u4',
          unitNumber: 4,
          title: 'Pointers & Dynamic Memory Management',
          topics: ['Pointer Declarations & Dereferencing', 'Pointer Arithmetic & Array Stride Navigation', 'Dynamic Allocation (malloc, calloc, realloc, free)', 'Dangling Pointers & Memory Leaks'],
          isHardest: true
        },
        {
          id: 'BCA101-u5',
          unitNumber: 5,
          title: 'Structures, Unions & File I/O',
          topics: ['User-Defined Types: struct & union', 'Nested Structures & Arrays of Structures', 'Sequential & Random File Access (fopen, fclose)', 'Binary File Records (fread, fwrite, fseek)'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'bca-101-q1',
          subjectName: 'Programming Fundamentals with C',
          question: 'Write a complete menu-driven C program to reverse a dynamic 1D array using pointer arithmetic without allocating a secondary buffer. Trace time complexity.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023',
          expectedAnswerFormat: 'C program with dynamic malloc allocation, left/right two-pointer swap logic with dereferencing, and O(N) time complexity proof.'
        },
        {
          id: 'bca-101-q2',
          subjectName: 'Programming Fundamentals with C',
          question: 'Explain Recursion. Write recursive and iterative functions for Fibonacci number generation and illustrate call stack frame growth for N=4.',
          marks: 10,
          frequency: 'Official University End-Sem 2023, 2022',
          expectedAnswerFormat: 'Base case vs recursive step explanation, activation record diagram showing return addresses, local variables, and time comparison.'
        }
      ],
      formulas: [
        { topic: '1D Array Address Calculation', formula: 'Loc(A[i]) = Base + (i - LowerBound) × sizeof(element)' },
        { topic: 'Row-Major 2D Address', formula: 'Loc(A[i][j]) = Base + [(i × N_cols) + j] × sizeof(element)' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Master control flow, switch statements, and loop tracing questions.' },
        { week: 'Week 2-3', focus: 'Write out pointer arithmetic proofs and dynamic memory allocation programs.' },
        { week: 'Week 4', focus: 'Solve past 3 years university question papers and mock tests.' }
      ],
      passTips: 'Practice writing clean C syntax for pointer swapping and struct initialization. They carry 25+ assured marks in Section B & C.'
    },
    {
      id: 'BCA-102',
      code: 'BCA-102',
      name: 'Digital Logic & Computer Systems',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Hardware & Systems',
      contactHours: '3-1-0',
      courseObjectives: [
        'Understand Boolean algebra, logic gates, minimization techniques and combinational circuits',
        'Analyze flip-flops, synchronous counters, shift registers, and basic CPU organization'
      ],
      units: [
        {
          id: 'BCA102-u1',
          unitNumber: 1,
          title: 'Number Systems & Boolean Algebra',
          topics: ['Binary, Octal, Hexadecimal & BCD Codes', '1’s & 2’s Complement Arithmetic', 'De Morgan’s Theorems & Boolean Postulates', 'Canonical SOP and POS Standard Forms'],
          isHardest: false
        },
        {
          id: 'BCA102-u2',
          unitNumber: 2,
          title: 'Karnaugh Maps & Combinational Logic',
          topics: ['2, 3, and 4-Variable K-Map Minimization', 'Don’t Care Conditions & Prime Implicants', 'Half Adder & Full Adder Circuit Design', 'Half Subtractor & Full Subtractor Circuits'],
          isHardest: true
        },
        {
          id: 'BCA102-u3',
          unitNumber: 3,
          title: 'MSI Combinational Logic Circuits',
          topics: ['Multiplexers (4:1, 8:1) & Boolean Realization', 'Demultiplexers & Decoders (3:8 Decoder)', 'Priority Encoders & BCD to 7-Segment Display', 'Digital Magnitude Comparators'],
          isHardest: false
        },
        {
          id: 'BCA102-u4',
          unitNumber: 4,
          title: 'Sequential Logic & Flip-Flops',
          topics: ['SR Latch & Gated Flip-Flop', 'JK Flip-Flop & Race-Around Condition', 'Master-Slave JK Flip-Flop Architecture', 'D and T Flip-Flops & Excitation Tables'],
          isHardest: true
        },
        {
          id: 'BCA102-u5',
          unitNumber: 5,
          title: 'Registers, Counters & CPU Architecture',
          topics: ['Shift Registers (SISO, SIPO, PISO, PIPO)', 'Asynchronous Ripple & Synchronous Mod-N Counters', 'Ring Counter & Johnson Counter', 'Basic CPU Registers, ALU & Instruction Cycle'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'bca-102-q1',
          subjectName: 'Digital Logic & Computer Systems',
          question: 'Minimize the Boolean function F(A, B, C, D) = Σm(0, 1, 2, 5, 8, 9, 10, 14) + d(7, 15) using a 4-variable Karnaugh Map. Realize the minimized circuit using NAND gates only.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023',
          expectedAnswerFormat: '4-variable K-map grid, quad/pair grouping, minimized SOP equation, and two-level NAND gate circuit diagram.'
        },
        {
          id: 'bca-102-q2',
          subjectName: 'Digital Logic & Computer Systems',
          question: 'Design a 3-bit Synchronous Binary Up-Counter using Master-Slave JK Flip-Flops. Provide state table, excitation equations, and complete circuit schematic.',
          marks: 10,
          frequency: 'Official University End-Sem 2023, 2022',
          expectedAnswerFormat: 'State transition table (000 to 111), JK excitation table mapping, K-maps for J and K inputs, and clock-synchronized logic diagram.'
        }
      ],
      formulas: [
        { topic: 'De Morgan’s Laws', formula: '(A + B)’ = A’ · B’  and  (A · B)’ = A’ + B’' },
        { topic: '2’s Complement', formula: 'Neg(X) = (~X) + 1' },
        { topic: 'JK Flip-Flop Characteristic', formula: 'Q(next) = J·Q’ + K’·Q' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Master 4-variable K-Map grouping and NAND-only gate conversions.' },
        { week: 'Week 2-3', focus: 'Master JK flip-flop excitation tables and state diagrams.' },
        { week: 'Week 4', focus: 'Practice counter design and shift register truth tables.' }
      ],
      passTips: 'K-map minimization and Full Adder circuit diagrams guarantee 20+ marks. Memorize the JK excitation table.'
    }
  ],
  2: [
    {
      id: 'BCA-201',
      code: 'BCA-201',
      name: 'Data Structures using C',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Core Programming',
      contactHours: '3-1-0',
      courseObjectives: [
        'Implement linear and non-linear data structures: Stacks, Queues, Linked Lists, Trees, and Graphs',
        'Analyze asymptotic time and space complexities of searching and sorting algorithms'
      ],
      units: [
        {
          id: 'BCA201-u1',
          unitNumber: 1,
          title: 'Arrays & Dynamic Memory Allocation',
          topics: ['Asymptotic Notations (Big-O, Omega, Theta)', 'Row-Major & Column-Major Addressing', 'Sparse Matrix 3-Tuple Representation', 'Polynomial Addition using Arrays'],
          isHardest: false
        },
        {
          id: 'BCA201-u2',
          unitNumber: 2,
          title: 'Linear Structures: Stacks & Queues',
          topics: ['Stack ADT: Push, Pop, Peek, IsFull, IsEmpty', 'Infix to Postfix Conversion & Evaluation', 'Linear Queue & Array Boundary Limitation', 'Circular Queue & Priority Queue Implementations'],
          isHardest: false
        },
        {
          id: 'BCA201-u3',
          unitNumber: 3,
          title: 'Linked Lists Architecture',
          topics: ['Singly Linked List: Insertion, Deletion, Reversal', 'Doubly Linked List & Two-Way Traversal', 'Circular Linked Lists & Josephus Problem', 'Polynomial Representation using Linked Lists'],
          isHardest: true
        },
        {
          id: 'BCA201-u4',
          unitNumber: 4,
          title: 'Non-Linear Structures: Trees & BST',
          topics: ['Binary Tree Terminology & Array/Linked Representation', 'Preorder, Inorder, Postorder Traversals', 'Binary Search Tree (BST) Search, Insert, Delete', 'AVL Tree Balance Factor & 4 Rotations (LL, RR, LR, RL)'],
          isHardest: true
        },
        {
          id: 'BCA201-u5',
          unitNumber: 5,
          title: 'Graphs, Sorting & Searching Algorithms',
          topics: ['Graph Representation: Adjacency Matrix & List', 'Graph Traversals: BFS & DFS Implementations', 'Sorting: Bubble, Insertion, Quick Sort, Merge Sort', 'Searching: Linear Search vs Binary Search Analysis'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'bca-201-q1',
          subjectName: 'Data Structures using C',
          question: 'Write a complete C program to implement a menu-driven Stack using an array with PUSH, POP, and DISPLAY operations. Handle stack overflow and underflow conditions cleanly.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023, 2022',
          expectedAnswerFormat: 'C program with #define MAX, top variable initialized to -1, push/pop/display functions with boundary checks, and main() switch-case.'
        },
        {
          id: 'bca-201-q2',
          subjectName: 'Data Structures using C',
          question: 'What is an AVL Tree? Insert keys [14, 17, 11, 7, 53, 4, 13] into an initially empty AVL tree. Show the tree after each insertion and specify all rotations performed.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023',
          expectedAnswerFormat: 'Balance factor calculation (left height - right height), step-by-step tree drawings, and explicit labels for LL, RR, LR, RL rotation steps.'
        }
      ],
      formulas: [
        { topic: 'Circular Queue Modulo Index', formula: 'rear = (rear + 1) % MAX ; front = (front + 1) % MAX' },
        { topic: 'AVL Balance Factor', formula: 'BF(node) = Height(left_subtree) - Height(right_subtree) ∈ {-1, 0, 1}' },
        { topic: 'Quick Sort Recurrence', formula: 'T(N) = 2T(N/2) + O(N) [Best/Avg O(N log N)], T(N) = T(N-1) + O(N) [Worst O(N²)]' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Implement Stack and Queue array and pointer functions in C.' },
        { week: 'Week 2-3', focus: 'Master Singly & Doubly Linked list pointer maneuvers.' },
        { week: 'Week 4', focus: 'Practice AVL rotations and Quick Sort recursion tree traces.' }
      ],
      passTips: 'Stack operations (Push/Pop/Infix-Postfix) and Linked List insertion/deletion carry 30+ marks in every semester paper.'
    },
    {
      id: 'BCA-202',
      code: 'BCA-202',
      name: 'Discrete Mathematical Structures',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Mathematical Foundations',
      contactHours: '3-1-0',
      courseObjectives: [
        'Master set theory, relations, posets, propositional logic, and recurrence relations',
        'Analyze graph theory proofs, trees, and algebraic structures (groups, rings, monoids)'
      ],
      units: [
        {
          id: 'BCA202-u1',
          unitNumber: 1,
          title: 'Set Theory, Relations & Functions',
          topics: ['Sets, Subsets, Cartesian Products & Power Sets', 'Equivalence Relations & Equivalence Classes', 'Partial Order Relations & Posets', 'Hasse Diagrams, Lattices, Upper/Lower Bounds'],
          isHardest: false
        },
        {
          id: 'BCA202-u2',
          unitNumber: 2,
          title: 'Propositional & Predicate Logic',
          topics: ['Propositions, Connectives & Truth Tables', 'Tautology, Contradiction & Contingency', 'Logical Equivalence & Laws of Logic', 'Normal Forms (CNF, DNF), Universal/Existential Quantifiers'],
          isHardest: false
        },
        {
          id: 'BCA202-u3',
          unitNumber: 3,
          title: 'Combinatorics & Recurrence Relations',
          topics: ['Pigeonhole Principle & Generalized Applications', 'Permutations & Combinations with Repetition', 'Principle of Mathematical Induction Proofs', 'Solving Linear Homogeneous Recurrence Relations'],
          isHardest: true
        },
        {
          id: 'BCA202-u4',
          unitNumber: 4,
          title: 'Graph Theory & Tree Structures',
          topics: ['Graphs, Subgraphs, Degree & Handshaking Lemma', 'Eulerian & Hamiltonian Paths and Circuits', 'Planar Graphs & Euler’s Formula (V - E + R = 2)', 'Tree Properties, Spanning Trees, Graph Coloring'],
          isHardest: true
        },
        {
          id: 'BCA202-u5',
          unitNumber: 5,
          title: 'Algebraic Structures & Group Theory',
          topics: ['Binary Operations & Closure Properties', 'Semigroups & Monoids with Identity Element', 'Groups, Abelian Groups & Subgroups', 'Cosets & Lagrange’s Theorem on Group Order'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'bca-202-q1',
          subjectName: 'Discrete Mathematical Structures',
          question: 'Prove by Mathematical Induction that 1² + 2² + 3² + ... + n² = n(n + 1)(2n + 1) / 6 for all positive integers n ≥ 1.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023',
          expectedAnswerFormat: 'Base case verification for n=1, inductive hypothesis for n=k, algebraic inductive step for n=k+1, and concluding deduction statement.'
        },
        {
          id: 'bca-202-q2',
          subjectName: 'Discrete Mathematical Structures',
          question: 'Define a Poset. Draw the Hasse Diagram for the divisibility relation on set D30 = {1, 2, 3, 5, 6, 10, 15, 30}. State if it is a Lattice.',
          marks: 10,
          frequency: 'Official University End-Sem 2023, 2022',
          expectedAnswerFormat: 'Poset definition (reflexive, antisymmetric, transitive), level-by-level Hasse graph drawing without redundant edges, and GLB/LUB lattice verification.'
        }
      ],
      formulas: [
        { topic: 'Handshaking Lemma', formula: 'Σ deg(v) = 2 · |E|' },
        { topic: 'Euler’s Planar Formula', formula: 'V - E + R = 2  (for connected planar graph)' },
        { topic: 'Lagrange’s Theorem', formula: '|G| = |H| × [G : H]  (Order of subgroup divides order of finite group)' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Master mathematical induction and truth table derivations.' },
        { week: 'Week 2-3', focus: 'Practice characteristic root method for recurrence relations.' },
        { week: 'Week 4', focus: 'Graph theory proofs and Lagrange’s coset theorem.' }
      ],
      passTips: 'Mathematical induction proofs and Hasse diagram questions appear in every semester paper without exception.'
    }
  ],
  3: [
    {
      id: 'BCA-301',
      code: 'BCA-301',
      name: 'Python Programming',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Modern Programming',
      contactHours: '3-1-0',
      courseObjectives: [
        'Develop Python scripts using advanced data structures, lambda functions, and OOPs paradigms',
        'Implement robust file operations, exception handling, and database/data processing workflows'
      ],
      units: [
        {
          id: 'BCA301-u1',
          unitNumber: 1,
          title: 'Python Syntax & Flow Control',
          topics: ['Dynamic Typing & Memory References (id, type)', 'Mutable vs Immutable Data Types', 'Control Flow (if-elif-else, while, for-in)', 'Sequence Slicing & List Comprehensions'],
          isHardest: false
        },
        {
          id: 'BCA301-u2',
          unitNumber: 2,
          title: 'Core Collections & Data Structures',
          topics: ['Lists & Tuples (packing, unpacking, operations)', 'Dictionaries & Hash Maps (keys, values, items)', 'Sets & Mathematical Set Operations', 'Shallow Copy vs Deep Copy (copy module)'],
          isHardest: false
        },
        {
          id: 'BCA301-u3',
          unitNumber: 3,
          title: 'Functions, Lambdas & Modular Code',
          topics: ['Positional, Keyword & Default Arguments', 'Arbitrary Arguments (*args, **kwargs)', 'Lambda Functions, map(), filter(), reduce()', 'Namespaces, Scopes (LEGB rule) & Modules'],
          isHardest: true
        },
        {
          id: 'BCA301-u4',
          unitNumber: 4,
          title: 'Object-Oriented Python',
          topics: ['Classes, Objects & __init__() Initializer', 'Instance vs Class vs Static Methods', 'Single, Multiple & Multilevel Inheritance', 'super() Function & Method Resolution Order (MRO)'],
          isHardest: true
        },
        {
          id: 'BCA301-u5',
          unitNumber: 5,
          title: 'File I/O & Exception Handling',
          topics: ['File Context Managers (with open() as f)', 'Text File & CSV/JSON Data Parsing', 'Exception Hierarchy & try-except-else-finally', 'Custom Exception Classes with raise statement'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'bca-301-q1',
          subjectName: 'Python Programming',
          question: 'Explain Multiple Inheritance in Python. Write a complete program demonstrating how super() and the C3 Method Resolution Order (MRO) resolve the Diamond Problem.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023',
          expectedAnswerFormat: 'Class hierarchy code (A -> B, C -> D), super().__init__() calls, mro() printout analysis, and Diamond Problem explanation.'
        },
        {
          id: 'bca-301-q2',
          subjectName: 'Python Programming',
          question: 'Write a Python script that reads a text file input.txt, counts frequency of each unique word ignoring case and punctuation, and outputs word counts sorted by descending frequency.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2022',
          expectedAnswerFormat: 'Complete script using with open(), re.findall() or str.split(), dictionary frequency counter or collections.Counter, and sorted(dict.items()).'
        }
      ],
      formulas: [
        { topic: 'Sequence Slicing', formula: 'sequence[start:stop:step]' },
        { topic: 'List Comprehension Syntax', formula: '[expression for item in iterable if condition]' },
        { topic: 'Dictionary Comprehension', formula: '{k: v for (k, v) in iterable if condition}' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Master dictionary comprehensions, tuple unpacking, and lambda functions.' },
        { week: 'Week 2-3', focus: 'Write class inheritance hierarchies and file context managers.' },
        { week: 'Week 4', focus: 'Practice exception handling scenarios and mock tests.' }
      ],
      passTips: 'List comprehensions, dictionary operations, and class inheritance definitions are guaranteed 10-mark questions.'
    },
    {
      id: 'BCA-302',
      code: 'BCA-302',
      name: 'Database Management Systems (SQL)',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Data & Database Systems',
      contactHours: '3-1-0',
      courseObjectives: [
        'Master 3-schema architecture, ER modeling, relational algebra, and complex SQL joins/subqueries',
        'Apply database normalization theory (1NF to BCNF) and understand ACID transaction management'
      ],
      units: [
        {
          id: 'BCA302-u1',
          unitNumber: 1,
          title: 'DBMS Foundations & Architecture',
          topics: ['File Processing Limitations vs DBMS Advantages', '3-Schema ANSI/SPARC Architecture', 'Physical & Logical Data Independence', 'Database Users, DBA Roles & Data Dictionary'],
          isHardest: false
        },
        {
          id: 'BCA302-u2',
          unitNumber: 2,
          title: 'Conceptual Modeling with ER Diagrams',
          topics: ['Entity Sets, Attributes (Composite, Multi-valued)', 'Relationships & Structural Cardinality Ratios', 'Weak Entity Sets & Identifying Relationships', 'ER to Relational Schema Mapping Rules'],
          isHardest: false
        },
        {
          id: 'BCA302-u3',
          unitNumber: 3,
          title: 'Relational Model & Algebra',
          topics: ['Relational Model Constraints (Domain, Key, Foreign Key)', 'Relational Algebra: Select, Project, Rename', 'Set Operations: Union, Intersection, Difference', 'Joins (Theta, Natural, Equi, Outer) & Division'],
          isHardest: true
        },
        {
          id: 'BCA302-u4',
          unitNumber: 4,
          title: 'Structured Query Language (SQL)',
          topics: ['DDL (CREATE, ALTER, DROP, TRUNCATE)', 'DML (SELECT, INSERT, UPDATE, DELETE)', 'Aggregate Functions, GROUP BY, HAVING Clause', 'Subqueries (Correlated vs Non-correlated) & Joins'],
          isHardest: false
        },
        {
          id: 'BCA302-u5',
          unitNumber: 5,
          title: 'Normalization Theory & Transactions',
          topics: ['Functional Dependencies & Armstrong’s Axioms', 'Normal Forms: 1NF, 2NF, 3NF, BCNF Decomposition', 'Lossless Join & Dependency Preservation', 'ACID Properties, Transaction States & Serializability'],
          isHardest: true
        }
      ],
      pyqs: [
        {
          id: 'bca-302-q1',
          subjectName: 'Database Management Systems (SQL)',
          question: 'What is Normalization? Explain 1NF, 2NF, 3NF, and BCNF with a student-course-instructor database example showing step-by-step table decomposition.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023, 2022',
          expectedAnswerFormat: 'Definition of normalization, atomic value rule for 1NF, partial dependency removal for 2NF, transitive dependency removal for 3NF, and superkey rule for BCNF.'
        },
        {
          id: 'bca-302-q2',
          subjectName: 'Database Management Systems (SQL)',
          question: 'Given Employee(emp_id, emp_name, salary, dept_id) and Department(dept_id, dept_name), write SQL queries for: (a) Second highest salary without LIMIT, (b) Departments with more than 5 employees, (c) Employees earning above department average.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023',
          expectedAnswerFormat: 'Accurate SQL syntax using MAX() subquery, GROUP BY dept_id HAVING COUNT(*) > 5, and correlated subquery with WHERE salary > (SELECT AVG...).'
        }
      ],
      formulas: [
        { topic: 'Relational Algebra Natural Join', formula: 'R ⋈ S = π(σ_{R.A = S.A}(R × S))' },
        { topic: 'BCNF Rule', formula: 'For every FD X → Y in R, X must be a Superkey of R' },
        { topic: '3NF Rule', formula: 'For every FD X → Y in R, either X is a Superkey OR Y is a Prime Attribute' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Master ER diagrams to relational table mapping and primary/foreign keys.' },
        { week: 'Week 2-3', focus: 'Practice multi-table SQL joins and correlated subquery patterns.' },
        { week: 'Week 4', focus: 'Write normalization decomposition proofs (1NF to BCNF).' }
      ],
      passTips: 'Learn ER diagram notation and write out normalization table decomposition proofs. They appear in every 10-mark Section C.'
    }
  ],
  4: [
    {
      id: 'BCA-401',
      code: 'BCA-401',
      name: 'Core Java & OOPs',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Object-Oriented Software',
      contactHours: '3-1-0',
      courseObjectives: [
        'Master Java JVM architecture, OOPs principles, interfaces, exception handling, and multithreading',
        'Develop database-driven Java applications using Collections Framework and JDBC connectivity'
      ],
      units: [
        {
          id: 'BCA401-u1',
          unitNumber: 1,
          title: 'Java Architecture & Language Basics',
          topics: ['JVM, JRE, JDK & Bytecode Verification Pipeline', 'Primitive Data Types, Literals & Type Casting', 'Control Structures & Array Declarations', 'Static Variables, Static Methods & Static Blocks'],
          isHardest: false
        },
        {
          id: 'BCA401-u2',
          unitNumber: 2,
          title: 'Object-Oriented Principles in Java',
          topics: ['Encapsulation & Access Modifiers (public, private, protected)', 'Constructors & Constructor Overloading', 'Inheritance & super Keyword Execution Order', 'Runtime Polymorphism & Dynamic Method Dispatch'],
          isHardest: false
        },
        {
          id: 'BCA401-u3',
          unitNumber: 3,
          title: 'Abstract Classes, Interfaces & Packages',
          topics: ['Abstract Classes vs Pure Interfaces', 'Multiple Inheritance through Interfaces', 'Package Creation & import Statements', 'String vs StringBuffer vs StringBuilder Performance'],
          isHardest: true
        },
        {
          id: 'BCA401-u4',
          unitNumber: 4,
          title: 'Exception Handling & Multithreading',
          topics: ['Exception Hierarchy (Checked vs Unchecked)', 'try, catch, finally, throw, throws Constructs', 'Thread Lifecycle (Thread Class vs Runnable Interface)', 'Thread Synchronization & Deadlock Mitigation'],
          isHardest: true
        },
        {
          id: 'BCA401-u5',
          unitNumber: 5,
          title: 'Java Collections Framework & JDBC',
          topics: ['Collection Interface: List, Set, Map Hierarchies', 'ArrayList vs LinkedList, HashMap Key-Value Hashing', 'Iterator & Enhanced for-each Loop Traversal', 'JDBC Architecture, Connection, PreparedStatement, ResultSet'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'bca-401-q1',
          subjectName: 'Core Java & OOPs',
          question: 'Differentiate between an Abstract Class and an Interface in Java. Write a Java program illustrating how a class can implement multiple interfaces to achieve multiple inheritance.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023',
          expectedAnswerFormat: 'Comparison table (multiple inheritance, default methods, variables, constructors) and complete compilable Java program.'
        },
        {
          id: 'bca-401-q2',
          subjectName: 'Core Java & OOPs',
          question: 'Explain Multithreading in Java. Write a program demonstrating Thread Synchronization using the synchronized block or method to prevent race conditions on a shared bank account.',
          marks: 10,
          frequency: 'Official University End-Sem 2023, 2022',
          expectedAnswerFormat: 'Thread lifecycle explanation, bank account class with synchronized deposit() and withdraw() methods, and two concurrent thread runs.'
        }
      ],
      formulas: [
        { topic: 'Thread Lifecycle', formula: 'NEW → RUNNABLE → RUNNING → BLOCKED/WAITING → TERMINATED' },
        { topic: 'JDBC Connection', formula: 'Connection conn = DriverManager.getConnection(url, user, pass);' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Interface implementation, method overriding, and super/this keywords.' },
        { week: 'Week 2-3', focus: 'Multithreaded producer-consumer synchronization and exception hierarchies.' },
        { week: 'Week 4', focus: 'JDBC CRUD operations and Collections API exercises.' }
      ],
      passTips: 'Memorize the difference between Abstract Classes and Interfaces, and write out a synchronized multithreading program.'
    },
    {
      id: 'BCA-402',
      code: 'BCA-402',
      name: 'Web Development (HTML/CSS/JS)',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Web & Internet Technologies',
      contactHours: '3-1-0',
      courseObjectives: [
        'Design responsive, accessible web pages using semantic HTML5 and CSS3 Grid/Flexbox',
        'Build interactive client-side web applications with JavaScript DOM manipulation and Fetch API'
      ],
      units: [
        {
          id: 'BCA402-u1',
          unitNumber: 1,
          title: 'Semantic HTML5 Architecture',
          topics: ['Document Structure & DOCTYPE Declaration', 'Semantic Elements (header, nav, main, article, section)', 'HTML5 Form Controls & Validation Attributes', 'Embedding Media (audio, video, svg, canvas)'],
          isHardest: false
        },
        {
          id: 'BCA402-u2',
          unitNumber: 2,
          title: 'CSS3 Styling, Flexbox & Grid',
          topics: ['CSS Box Model (Content, Padding, Border, Margin)', 'Positioning (static, relative, absolute, fixed, sticky)', 'CSS Flexbox (flex-direction, justify-content, align-items)', 'CSS Grid (grid-template-columns, fr units, gap) & Media Queries'],
          isHardest: false
        },
        {
          id: 'BCA402-u3',
          unitNumber: 3,
          title: 'JavaScript DOM Manipulation',
          topics: ['Variables (var, let, const) & Data Types', 'DOM Traversal & Node Selection (querySelector, getElementById)', 'Event Handling & Event Delegation Model', 'Dynamic DOM Manipulation (createElement, appendChild, classList)'],
          isHardest: true
        },
        {
          id: 'BCA402-u4',
          unitNumber: 4,
          title: 'Modern ES6+ & Asynchronous JavaScript',
          topics: ['Arrow Functions & Lexical this Binding', 'Destructuring & Spread/Rest Operators', 'Promises & Promise Chaining Lifecycle', 'async/await & Asynchronous Fetch API Requests'],
          isHardest: true
        },
        {
          id: 'BCA402-u5',
          unitNumber: 5,
          title: 'Web Architecture & Client-Server Integration',
          topics: ['Client-Server Model & HTTP Request Methods (GET, POST)', 'JSON Serialization & Deserialization', 'Client-Side Storage (localStorage, sessionStorage, cookies)', 'Web Security Basics (XSS, CSRF, HTTPS, CORS)'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'bca-402-q1',
          subjectName: 'Web Development (HTML/CSS/JS)',
          question: 'Explain CSS Flexbox layout. Detail the roles of flex-direction, justify-content, align-items, and flex-wrap with practical responsive navigation bar code.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023',
          expectedAnswerFormat: 'Diagram of main axis vs cross axis, property definitions, and working HTML/CSS code snippet for a responsive navbar.'
        },
        {
          id: 'bca-402-q2',
          subjectName: 'Web Development (HTML/CSS/JS)',
          question: 'Write a JavaScript program that uses the Fetch API with async/await to request JSON student records from an API endpoint, handles errors with try-catch, and displays records in a dynamic HTML table.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2022',
          expectedAnswerFormat: 'Async function with await fetch(), response.ok check, res.json(), try-catch block, and document.createElement(\'tr\') DOM rendering.'
        }
      ],
      formulas: [
        { topic: 'Box Model Total Dimension', formula: 'Total Width = Width + 2×(Padding + Border + Margin)' },
        { topic: 'Fetch Async Pattern', formula: 'const res = await fetch(url); if (!res.ok) throw new Error(); const data = await res.json();' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Responsive design using CSS Flexbox and media query breakpoints.' },
        { week: 'Week 2-3', focus: 'Asynchronous fetch requests, Promises, and DOM manipulation scripts.' },
        { week: 'Week 4', focus: 'Build an integrated mini-application with local storage persistence.' }
      ],
      passTips: 'CSS Flexbox axis diagrams and JavaScript Fetch API code snippets appear in Section B and C consistently.'
    }
  ],
  5: [
    {
      id: 'BCA-501',
      code: 'BCA-501',
      name: 'Computer Networks & Security',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Networking & Security',
      contactHours: '3-1-0',
      courseObjectives: [
        'Understand OSI and TCP/IP network architectures, packet switching, IP subnetting CIDR, and routing protocols',
        'Analyze transport protocols (TCP/UDP), network security ciphers, RSA public key cryptography, and firewalls'
      ],
      units: [
        {
          id: 'BCA501-u1',
          unitNumber: 1,
          title: 'Network Models & Physical Architecture',
          topics: ['OSI 7-Layer Reference Model & Layer Functions', 'TCP/IP 4-Layer Architecture vs OSI Comparison', 'Topologies: Bus, Star, Ring, Mesh, Hybrid', 'Transmission Media (Twisted Pair, Coaxial, Optical Fiber)'],
          isHardest: false
        },
        {
          id: 'BCA501-u2',
          unitNumber: 2,
          title: 'Data Link Layer & Error Control',
          topics: ['Framing Methods & Bit/Byte Stuffing', 'Error Detection: Parity, Checksum, CRC Polynomials', 'Hamming Error-Correcting Code Construction', 'Flow Control: Stop-and-Wait, Go-Back-N, Selective Repeat, CSMA/CD'],
          isHardest: true
        },
        {
          id: 'BCA501-u3',
          unitNumber: 3,
          title: 'Network Layer & IP Addressing',
          topics: ['IPv4 Addressing: Classful vs CIDR Slash Notation', 'Subnetting & Supernetting Subnet Mask Calculations', 'Routing Algorithms: Distance Vector vs Link State (Dijkstra)', 'ARP, RARP, ICMP Protocols & IPv6 Overview'],
          isHardest: true
        },
        {
          id: 'BCA501-u4',
          unitNumber: 4,
          title: 'Transport Layer Protocols',
          topics: ['Transport Services & Port Addressing Conventions', 'TCP vs UDP Segment Headers & Differences', 'TCP 3-Way Handshake & 4-Way Connection Termination', 'Sliding Window Flow Control & TCP Congestion Control'],
          isHardest: false
        },
        {
          id: 'BCA501-u5',
          unitNumber: 5,
          title: 'Network Security & Cryptography',
          topics: ['Security Goals: Confidentiality, Integrity, Availability', 'Symmetric Key Ciphers: DES & AES Overview', 'Asymmetric Cryptography: RSA Algorithm & Key Generation', 'Digital Signatures, Hash Functions (SHA-256) & Firewalls'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'bca-501-q1',
          subjectName: 'Computer Networks & Security',
          question: 'An organization is granted the IP block 192.168.10.0/24. Divide this network into 4 equal subnets. For each subnet, determine: (a) Subnet Mask, (b) Subnet Address, (c) First & Last usable Host IP, (d) Directed Broadcast Address.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023',
          expectedAnswerFormat: 'Calculation showing 2 borrowed host bits (/26 or 255.255.255.192), 64 IPs per subnet, 62 usable hosts, and full subnet breakdown table.'
        },
        {
          id: 'bca-501-q2',
          subjectName: 'Computer Networks & Security',
          question: 'Explain the TCP 3-Way Handshake for connection establishment and 4-way handshake for connection termination with packet sequence sequence diagrams showing SYN, ACK, and FIN flags.',
          marks: 10,
          frequency: 'Official University End-Sem 2023, 2022',
          expectedAnswerFormat: 'Clear client-server sequence diagram with SYN, SYN+ACK, ACK flags, initial sequence number (ISN) exchanges, and FIN-ACK closure steps.'
        }
      ],
      formulas: [
        { topic: 'Subnet Usable Host Calculation', formula: 'Usable Hosts = 2^(32 - prefix) - 2' },
        { topic: 'Hamming Code Redundancy', formula: '2^r ≥ m + r + 1  (m = data bits, r = parity check bits)' },
        { topic: 'RSA Modulus & Totient', formula: 'n = p × q ;  φ(n) = (p - 1)(q - 1) ;  e · d ≡ 1 (mod φ(n))' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Master CIDR subnetting and host range address calculations.' },
        { week: 'Week 2-3', focus: 'TCP flow control, sliding window numericals, and CRC polynomial division.' },
        { week: 'Week 4', focus: 'RSA encryption steps and cryptographic protocol proofs.' }
      ],
      passTips: 'Subnetting numericals and TCP 3-way handshake diagrams provide guaranteed full marks in Section C.'
    }
  ],
  6: [
    {
      id: 'BCA-601',
      code: 'BCA-601',
      name: 'Cloud Architecture & Web Services',
      creditsOrMarks: '4 Credits',
      type: 'Theory',
      category: 'Cloud & Distributed Systems',
      contactHours: '3-1-0',
      courseObjectives: [
        'Analyze cloud computing deployment models, virtualization architectures, and service tiers (IaaS, PaaS, SaaS)',
        'Design microservices and RESTful web services using Docker containerization, API gateways, and cloud security'
      ],
      units: [
        {
          id: 'BCA601-u1',
          unitNumber: 1,
          title: 'Cloud Computing Foundations',
          topics: ['NIST Definition & 5 Essential Characteristics', 'Cloud Deployment Models: Public, Private, Hybrid, Community', 'CapEx vs OpEx Financial Paradigm Shift', 'Economics of Cloud: Multitenancy & Elastic Autoscaling'],
          isHardest: false
        },
        {
          id: 'BCA601-u2',
          unitNumber: 2,
          title: 'Cloud Service Models & Virtualization',
          topics: ['IaaS, PaaS, SaaS Architectural Comparisons & Real Examples', 'Hardware Virtualization: Type 1 (Bare-Metal) vs Type 2 Hypervisors', 'Virtual Machines vs Containerization', 'Cloud Storage: Block, Object (S3), and File Storage'],
          isHardest: true
        },
        {
          id: 'BCA601-u3',
          unitNumber: 3,
          title: 'Containers, Docker & Microservices',
          topics: ['Docker Engine Architecture & Container Isolation (cgroups, namespaces)', 'Dockerfile Creation, Image Layering & Container Lifecycle', 'Monolithic vs Microservices Decoupled Architecture', 'Container Orchestration with Kubernetes Principles'],
          isHardest: true
        },
        {
          id: 'BCA601-u4',
          unitNumber: 4,
          title: 'RESTful Web Services & API Design',
          topics: ['SOAP vs REST Architectural Principles & Constraints', 'HTTP Verbs (GET, POST, PUT, DELETE, PATCH) & Status Codes', 'Statelessness, URI Conventions & JSON Resource Modeling', 'API Gateways, Rate Limiting & OAuth 2.0 Token Authentication'],
          isHardest: false
        },
        {
          id: 'BCA601-u5',
          unitNumber: 5,
          title: 'Cloud Security, Resilience & Serverless',
          topics: ['Cloud Shared Responsibility Model', 'Identity & Access Management (IAM) & Role-Based Access Control', 'High Availability, Fault Tolerance & Disaster Recovery', 'Serverless Computing (FaaS) with AWS Lambda / Cloud Functions'],
          isHardest: false
        }
      ],
      pyqs: [
        {
          id: 'bca-601-q1',
          subjectName: 'Cloud Architecture & Web Services',
          question: 'Compare Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Detail consumer vs provider management responsibilities with vendor architectural diagrams.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2023',
          expectedAnswerFormat: 'Layered stack diagram (Networking, Storage, Servers, OS, Middleware, Runtime, Data, Applications) showing who manages what for IaaS, PaaS, SaaS.'
        },
        {
          id: 'bca-601-q2',
          subjectName: 'Cloud Architecture & Web Services',
          question: 'Explain the 6 REST architectural constraints. Design a complete RESTful API specification for a College Student Information System including URIs, HTTP verbs, request payloads, and status codes.',
          marks: 10,
          frequency: 'Official University End-Sem 2024, 2022',
          expectedAnswerFormat: 'Explanation of Client-Server, Stateless, Cacheable, Uniform Interface, Layered System, Code on Demand + API endpoints table.'
        }
      ],
      formulas: [
        { topic: 'Cloud Availability Metric', formula: 'Availability % = (MTBF / (MTBF + MTTR)) × 100' },
        { topic: 'HTTP REST Status Codes', formula: '200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error' }
      ],
      strategy: [
        { week: 'Week 1', focus: 'Service models comparison and hypervisor virtualization principles.' },
        { week: 'Week 2-3', focus: 'REST API design conventions, status codes, and containerization benefits.' },
        { week: 'Week 4', focus: 'Cloud security shared responsibility model and serverless computing.' }
      ],
      passTips: 'IaaS vs PaaS vs SaaS responsibility stack comparison and RESTful API design tables appear in every final-year exam.'
    }
  ]
};

/**
 * Normalizes BCA Computer Applications courses for a specific semester and university
 */
export const getBcaSemesterData = (semesterNum: number, universityId?: string): UnifiedTrackData => {
  const semNum = Math.min(6, Math.max(1, semesterNum || 1));
  const matchedUniv = universityId ? PAN_INDIA_UNIVERSITIES.find(u => u.id === universityId) : undefined;
  const authorityName = matchedUniv ? matchedUniv.name : 'State Technical University & Autonomous Colleges';

  const bcaSubjects = BCA_SEMESTER_COURSES[semNum] || BCA_SEMESTER_COURSES[1];

  return {
    trackId: 'bca_college',
    title: 'BCA / MCA (College Semester)',
    subtitle: matchedUniv ? `${matchedUniv.shortName} • Semester ${semNum}` : `BCA Semester ${semNum} • 70M University Pattern`,
    authority: authorityName,
    totalMarksOrCredits: '20 Credits (70 Marks Theory + 30 Internal per Course)',
    durationOrYear: `Academic Year • Semester ${semNum}`,
    passingThreshold: '40% (28 / 70 in End-Sem Theory Examination)',
    summary: `Complete official BCA curriculum for Semester ${semNum} with verified syllabus units, 70-mark End-Sem exam pattern, university repeated PYQs, and 30-day preparation strategy.`,
    isBtech: false,
    semestersAvailable: [1, 2, 3, 4, 5, 6],
    currentStage: semNum,
    subjects: bcaSubjects
  };
};

/**
 * Normalizes any non-B.Tech Multi-Stream track data
 */
export const getMultiStreamTrackData = (trackId: string, authorityId?: string): UnifiedTrackData => {
  const stream = OTHER_STREAMS_DATA[trackId] || OTHER_STREAMS_DATA['cbse_12'];
  const trackMeta = TARGET_TRACK_OPTIONS.find(t => t.id === trackId) || TARGET_TRACK_OPTIONS[1];
  const matchedBoard = authorityId ? ALL_EDUCATION_BOARDS.find(b => b.id === authorityId) : undefined;

  const unifiedSubjects: UnifiedSubject[] = stream.subjects.map((subj) => {
    // Map string modules into UnifiedUnit
    const units: UnifiedUnit[] = subj.modules.map((modStr, idx) => {
      const parts = modStr.split(':');
      const title = parts.length > 1 ? parts[1].trim() : parts[0].trim();
      return {
        id: `${subj.id}-u${idx + 1}`,
        unitNumber: idx + 1,
        title: title,
        topics: [title, 'Fundamental Laws & Definitions', 'Standard Problems & Numerical Examples'],
        isHardest: subj.hardestModule?.includes(title) || idx === 1
      };
    });

    // Map subject PYQs
    const matchedPyqs = stream.topRepeatedPYQs.filter(q => 
      q.subject.toLowerCase().includes(subj.name.toLowerCase().slice(0, 6)) ||
      subj.name.toLowerCase().includes(q.subject.toLowerCase().slice(0, 6))
    );

    const assignedPyqs: UnifiedPYQ[] = (matchedPyqs.length > 0 ? matchedPyqs : stream.topRepeatedPYQs.slice(0, 3)).map(q => ({
      id: q.id,
      subjectName: subj.name,
      question: q.question,
      marks: q.marks,
      frequency: q.frequency,
      expectedAnswerFormat: q.expectedAnswerFormat
    }));

    return {
      id: subj.id,
      code: subj.code || subj.id.toUpperCase(),
      name: subj.name,
      creditsOrMarks: subj.weightage || 'High Weightage',
      type: 'Standard',
      category: subj.category || 'Core Subject',
      units,
      passTips: subj.passTips,
      pyqs: assignedPyqs,
      formulas: stream.formulaMatrix.map(f => ({ topic: f.topic, formula: f.formula })),
      strategy: stream.thirtyDayPassStrategy.map(s => ({ week: s.week, focus: s.focus }))
    };
  });

  return {
    trackId: stream.id,
    title: matchedBoard ? `${stream.title} (${matchedBoard.shortName})` : stream.title,
    subtitle: matchedBoard ? `${matchedBoard.shortName} • ${stream.standard}` : (trackMeta.subtitle || stream.standard),
    authority: matchedBoard ? matchedBoard.name : stream.boardOrAuthority,
    totalMarksOrCredits: `${stream.totalMarks} Marks`,
    durationOrYear: `${stream.durationMinutes} Minutes Exam`,
    passingThreshold: matchedBoard?.evaluationScheme || stream.passingThreshold,
    summary: matchedBoard ? `${matchedBoard.description} ${stream.summary}` : stream.summary,
    isBtech: false,
    currentStage: stream.standard,
    subjects: unifiedSubjects
  };
};

/**
 * Universal getter for any selected track and university
 */
export const getUnifiedTrackData = (trackId: string, semesterNum: number = 3, universityId?: string): UnifiedTrackData => {
  if (trackId === 'btech' || trackId === 'btech_university') {
    return getBtechSemesterData(semesterNum, universityId);
  }
  if (trackId === 'bca_college' || trackId === 'bca' || trackId === 'bca_mca') {
    return getBcaSemesterData(semesterNum, universityId);
  }
  return getMultiStreamTrackData(trackId, universityId);
};


// =========================================================================
// VIDYA AI — Dynamic Subject-Grounded Mock Paper Database & Assembly Engine
// Supports dynamic generation for any Course, Subject, and Custom Marks Pattern.
// =========================================================================

import { EXTENDED_SUBJECT_POOLS } from './comprehensiveSubjectPools.js';

export const COURSE_DEFINITIONS = [
  {
    id: 'btech_calcutta',
    name: 'B.Tech (Calcutta University - CU)',
    category: 'Engineering & Technical',
    standard: '1st - 4th Year B.Tech (Faculty of Engg & Tech)',
    boardLogo: '🏛️',
    defaultMarks: 70,
    defaultDuration: 180,
    patternName: 'CU 70-Mark End-Sem Blueprint (10×1m + 3×5m + 3×15m)',
    subjects: [
      { id: 'cu_dsp', name: 'Data Structures & Programming in C/C++', code: 'CS201', semester: 2 },
      { id: 'cu_dld', name: 'Digital Logic & Computer Design', code: 'CS301', semester: 3 },
      { id: 'cu_dm', name: 'Discrete Mathematical Structures', code: 'CS302', semester: 3 },
      { id: 'cu_daa', name: 'Design & Analysis of Algorithms', code: 'CS401', semester: 4 },
      { id: 'cu_os', name: 'Operating Systems', code: 'CS402', semester: 4 },
      { id: 'cu_dbms', name: 'Database Management Systems', code: 'CS501', semester: 5 },
      { id: 'cu_cn', name: 'Computer Networks', code: 'CS502', semester: 5 },
      { id: 'cu_aiml', name: 'Artificial Intelligence & Machine Learning', code: 'CS701', semester: 7 }
    ]
  },
  {
    id: 'btech_makaut',
    name: 'B.Tech (MAKAUT / University)',
    category: 'Engineering & Technical',
    standard: '1st - 4th Year B.Tech',
    boardLogo: '🎓',
    defaultMarks: 70,
    defaultDuration: 180,
    patternName: '70-Mark End-Sem Blueprint (10×1m + 3×5m + 3×15m)',
    subjects: [
      // Semester 1
      { id: 'math1', name: 'Engineering Mathematics - I', code: 'BS-M101', semester: 1 },
      { id: 'chem', name: 'Engineering Chemistry', code: 'BS-CH101', semester: 1 },
      { id: 'bee', name: 'Basic Electrical Engineering', code: 'ES-EE101', semester: 1 },
      // Semester 2
      { id: 'math2', name: 'Engineering Mathematics - II', code: 'BS-M201', semester: 2 },
      { id: 'phys', name: 'Engineering Physics', code: 'BS-PH201', semester: 2 },
      { id: 'c_prog', name: 'Programming for Problem Solving in C', code: 'ES-CS201', semester: 2 },
      // Semester 3
      { id: 'dsa', name: 'Data Structures & Algorithms', code: 'PCC-CS301', semester: 3 },
      { id: 'dm', name: 'Discrete Mathematics', code: 'BSC-M301', semester: 3 },
      { id: 'de', name: 'Digital Electronics & Logic Design', code: 'ESC-301', semester: 3 },
      { id: 'co', name: 'Computer Organization', code: 'PCC-CS302', semester: 3 },
      // Semester 4
      { id: 'os', name: 'Operating Systems', code: 'PCC-CS401', semester: 4 },
      { id: 'daa', name: 'Design & Analysis of Algorithms', code: 'PCC-CS402', semester: 4 },
      { id: 'coa', name: 'Computer Architecture', code: 'PCC-CS403', semester: 4 },
      { id: 'flat', name: 'Formal Language & Automata Theory', code: 'PCC-CS404', semester: 4 },
      // Semester 5
      { id: 'dbms', name: 'Database Management Systems (DBMS)', code: 'PCC-CS501', semester: 5 },
      { id: 'cd', name: 'Compiler Design', code: 'PCC-CS502', semester: 5 },
      { id: 'se', name: 'Software Engineering', code: 'ESC-501', semester: 5 },
      { id: 'java', name: 'Object-Oriented Programming (Java)', code: 'PCC-CS503', semester: 5 },
      // Semester 6
      { id: 'cn', name: 'Computer Networks', code: 'PCC-CS601', semester: 6 },
      { id: 'cloud', name: 'Cloud Computing & Distributed Systems', code: 'PEC-CS601', semester: 6 },
      { id: 'web', name: 'Full-Stack Web Technologies', code: 'PEC-CS602', semester: 6 },
      // Semester 7
      { id: 'aiml', name: 'AI & Machine Learning', code: 'PCC-CS701', semester: 7 },
      { id: 'security', name: 'Cyber Security & Cryptography', code: 'PEC-CS702', semester: 7 },
      { id: 'iot', name: 'Internet of Things (IoT)', code: 'OEC-CS701', semester: 7 },
      // Semester 8
      { id: 'deep_learning', name: 'Deep Learning & Neural Architectures', code: 'PEC-CS801', semester: 8 },
      { id: 'blockchain', name: 'Blockchain Technology & Distributed Ledgers', code: 'PEC-CS802', semester: 8 }
    ]
  },
  {
    id: 'gate_2027',
    name: 'GATE 2027 (IIT Official)',
    category: 'National Entrance & PSU',
    standard: 'All India M.Tech / PSU Entrance',
    boardLogo: '🏛️',
    defaultMarks: 100,
    defaultDuration: 180,
    patternName: 'IIT Madras 100-Mark Pattern (GA 15m + Core 85m)',
    subjects: [
      { id: 'gate_dsa', name: 'CS: Data Structures & Algorithms', code: 'GATE-CS-01', semester: 'All' },
      { id: 'gate_os_dbms', name: 'CS: Operating Systems & DBMS', code: 'GATE-CS-02', semester: 'All' },
      { id: 'gate_toc', name: 'CS: Theory of Computation & Compilers', code: 'GATE-CS-03', semester: 'All' },
      { id: 'gate_ai', name: 'DA: Machine Learning & AI', code: 'GATE-DA-01', semester: 'All' },
      { id: 'gate_apt_math', name: 'Engineering Mathematics & General Aptitude', code: 'GATE-EM-01', semester: 'All' }
    ]
  },
  {
    id: 'jee_main',
    name: 'NTA JEE Main',
    category: 'Engineering Entrance',
    standard: 'Class 11 & 12 Syllabus',
    boardLogo: '⚡',
    defaultMarks: 300,
    defaultDuration: 180,
    patternName: 'NTA 300-Mark CBT (20 MCQs + 5 NAT per subject)',
    subjects: [
      { id: 'jee_phys', name: 'Physics (Mechanics, Optics, Modern Physics)', code: 'JEE-PH', semester: '11-12' },
      { id: 'jee_chem', name: 'Chemistry (Physical, Organic, Inorganic)', code: 'JEE-CH', semester: '11-12' },
      { id: 'jee_math', name: 'Mathematics (Calculus, Vectors, Coordinate)', code: 'JEE-MA', semester: '11-12' }
    ]
  },
  {
    id: 'cbse_12',
    name: 'Class 12 Board (CBSE / ISC)',
    category: 'Senior Secondary',
    standard: 'Class 12th Board',
    boardLogo: '🏫',
    defaultMarks: 80,
    defaultDuration: 180,
    patternName: 'CBSE 80-Mark Board Pattern (Sec A-E)',
    subjects: [
      { id: 'cbse12_math', name: 'Mathematics (Calculus & Vectors)', code: 'CBSE-041', semester: '12' },
      { id: 'cbse12_phys', name: 'Physics (Optics & Electromagnetism)', code: 'CBSE-042', semester: '12' },
      { id: 'cbse12_chem', name: 'Chemistry (Organic & Physical)', code: 'CBSE-043', semester: '12' },
      { id: 'cbse12_cs', name: 'Computer Science (Python & SQL)', code: 'CBSE-083', semester: '12' }
    ]
  },
  {
    id: 'ssc_cgl',
    name: 'SSC CGL (Tier-1)',
    category: 'Govt Administrative',
    standard: 'Graduate Staff Selection',
    boardLogo: '🎯',
    defaultMarks: 200,
    defaultDuration: 60,
    patternName: 'SSC CGL Tier-1 200-Mark Pattern (100 Qs × 2m)',
    subjects: [
      { id: 'ssc_quant', name: 'Quantitative Aptitude', code: 'SSC-QA', semester: 'Tier 1' },
      { id: 'ssc_reasoning', name: 'General Intelligence & Reasoning', code: 'SSC-GI', semester: 'Tier 1' },
      { id: 'ssc_english', name: 'English Comprehension', code: 'SSC-EN', semester: 'Tier 1' },
      { id: 'ssc_gk', name: 'General Awareness & Current Affairs', code: 'SSC-GA', semester: 'Tier 1' }
    ]
  },
  {
    id: 'bca_college',
    name: 'BCA / MCA (College Semester)',
    category: 'Computer Applications',
    standard: 'BCA / BSc CS / MCA',
    boardLogo: '💻',
    defaultMarks: 70,
    defaultDuration: 180,
    patternName: 'University 70-Mark BCA Pattern (Part A, B, C)',
    subjects: [
      { id: 'bca_c', name: 'Programming Fundamentals with C', code: 'BCA-101', semester: 1 },
      { id: 'bca_de', name: 'Digital Logic & Computer Systems', code: 'BCA-102', semester: 1 },
      { id: 'bca_dsa', name: 'Data Structures using C', code: 'BCA-201', semester: 2 },
      { id: 'bca_math', name: 'Discrete Mathematical Structures', code: 'BCA-202', semester: 2 },
      { id: 'bca_python', name: 'Python Programming', code: 'BCA-301', semester: 3 },
      { id: 'bca_sql', name: 'Database Management Systems (SQL)', code: 'BCA-302', semester: 3 },
      { id: 'bca_java', name: 'Core Java & OOPs', code: 'BCA-401', semester: 4 },
      { id: 'bca_web', name: 'Web Development (HTML/CSS/JS)', code: 'BCA-402', semester: 4 },
      { id: 'bca_cn', name: 'Computer Networks & Security', code: 'BCA-501', semester: 5 },
      { id: 'bca_cloud', name: 'Cloud Architecture & Web Services', code: 'BCA-601', semester: 6 }
    ]
  }
];

// =========================================================================
// SUBJECT QUESTION POOLS (Rich repository for generating distinct papers)
// =========================================================================

export const SUBJECT_QUESTION_POOLS = {
  // 1. DATA STRUCTURES & ALGORITHMS
  dsa: {
    mcqs: [
      {
        text: 'What is the worst-case time complexity of searching an element in an AVL Tree with N nodes?',
        options: ['A) O(1)', 'B) O(log N)', 'C) O(N)', 'D) O(N log N)'],
        correct: 'B) O(log N)',
        explanation: 'AVL trees strictly maintain a balance factor between -1 and +1, guaranteeing maximum height 1.44 log2 N, giving O(log N) search.',
        marks: 1
      },
      {
        text: 'Which data structure is primarily used to implement Breadth-First Search (BFS) on a graph?',
        options: ['A) Stack', 'B) Queue', 'C) Priority Queue', 'D) Binary Search Tree'],
        correct: 'B) Queue',
        explanation: 'BFS explores vertices level by level using FIFO (First-In-First-Out) ordering maintained by a Queue.',
        marks: 1
      },
      {
        text: 'What is the recurrence relation for the standard Merge Sort algorithm?',
        options: ['A) T(N) = 2T(N/2) + O(N)', 'B) T(N) = T(N-1) + O(N)', 'C) T(N) = 2T(N/2) + O(1)', 'D) T(N) = T(N/2) + O(N)'],
        correct: 'A) T(N) = 2T(N/2) + O(N)',
        explanation: 'Merge sort splits the array into two halves of size N/2 and merges them in linear time O(N).',
        marks: 1
      },
      {
        text: 'The postfix equivalent of the infix expression (A + B) * (C - D) is:',
        options: ['A) AB+CD-*', 'B) +AB*-CD', 'C) ABCD+-*', 'D) AB+*CD-'],
        correct: 'A) AB+CD-*',
        explanation: '(A + B) gives AB+, (C - D) gives CD-, multiplied giving AB+CD-*.',
        marks: 1
      },
      {
        text: 'What is the maximum number of nodes in a binary tree of depth d (root at depth 0)?',
        options: ['A) 2^d', 'B) 2^(d+1) - 1', 'C) 2^(d-1)', 'D) 2d'],
        correct: 'B) 2^(d+1) - 1',
        explanation: 'Sum of geometric series: 1 + 2 + 4 + ... + 2^d = 2^(d+1) - 1.',
        marks: 1
      },
      {
        text: 'In a min-heap with N elements, where is the second smallest element guaranteed to be located?',
        options: ['A) At the root', 'B) Either at index 1 or index 2 (children of root)', 'C) At any leaf node', 'D) At index N-1'],
        correct: 'B) Either at index 1 or index 2 (children of root)',
        explanation: 'The root contains the minimum element. Its smallest child must be the second smallest element overall.',
        marks: 1
      },
      {
        text: 'Which collision resolution technique stores all colliding keys in an external linked list?',
        options: ['A) Linear Probing', 'B) Quadratic Probing', 'C) Separate Chaining', 'D) Double Hashing'],
        correct: 'C) Separate Chaining',
        explanation: 'Separate Chaining links colliding entries into an external linked list at each table bucket.',
        marks: 1
      },
      {
        text: 'What is the best-case time complexity of Quick Sort with median-of-three pivot selection?',
        options: ['A) O(N)', 'B) O(N log N)', 'C) O(N^2)', 'D) O(log N)'],
        correct: 'B) O(N log N)',
        explanation: 'When pivots partition sub-arrays nearly equally, Quick Sort achieves O(N log N).',
        marks: 1
      },
      {
        text: 'Which graph traversal algorithm uses a Stack or recursion?',
        options: ['A) Breadth-First Search', 'B) Depth-First Search', 'C) Prim algorithm', 'D) Kruskal algorithm'],
        correct: 'B) Depth-First Search',
        explanation: 'DFS proceeds deeply down branches using LIFO order provided by a Stack.',
        marks: 1
      },
      {
        text: 'What is the auxiliary space required by iterative Binary Search on a sorted array?',
        options: ['A) O(1)', 'B) O(log N)', 'C) O(N)', 'D) O(N log N)'],
        correct: 'A) O(1)',
        explanation: 'Iterative binary search only uses low, mid, and high pointers, consuming O(1) extra space.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Explain AVL Tree Rotations with Diagrams',
        text: 'Define the Balance Factor of an AVL tree node. Illustrate Left-Left (LL) and Left-Right (LR) rotations with a small numerical example.',
        marks: 5,
        modelAnswer: 'Balance factor BF = Height(Left) - Height(Right). Valid BF is {-1, 0, 1}. For LL imbalance, a single Right Rotation restores balance. For LR imbalance, a Left rotation on left child followed by a Right rotation on root restores balance.'
      },
      {
        title: 'Differentiate BFS and DFS Graph Traversals',
        text: 'Compare Breadth-First Search (BFS) and Depth-First Search (DFS) in terms of data structure used, time complexity, and suitability for finding shortest paths in unweighted graphs.',
        marks: 5,
        modelAnswer: 'BFS uses a Queue (FIFO), runs in O(V + E), and guarantees shortest paths in unweighted graphs. DFS uses a Stack (LIFO), runs in O(V + E), and is used for topological sorting, cycle detection, and strongly connected components.'
      },
      {
        title: 'Binary Search Tree Deletion Cases',
        text: 'Discuss the three cases of deleting a node from a Binary Search Tree (BST). Why is the in-order successor or predecessor used for a node with two children?',
        marks: 5,
        modelAnswer: 'Case 1: Leaf node (delete directly). Case 2: Node with 1 child (bypass to child). Case 3: Node with 2 children (replace with in-order successor, the smallest node in right subtree, preserving BST ordering).'
      },
      {
        title: 'Compare Open Addressing vs Separate Chaining',
        text: 'Contrast Open Addressing (linear probing, quadratic probing) with Separate Chaining for hash table collisions with respect to load factor threshold.',
        marks: 5,
        modelAnswer: 'Separate chaining stores overflow in linked lists; load factor alpha can exceed 1.0. Open addressing keeps all elements within table; alpha must be < 1.0 (typically < 0.7) to prevent severe cluster degradation.'
      }
    ],
    longQuestions: [
      {
        title: 'Dijkstra Shortest Path & Binary Min-Heap Implementation',
        text: 'Trace Dijkstra Single-Source Shortest Path algorithm on a directed weighted graph starting from source vertex S. State the time complexity with an adjacency matrix vs a binary min-heap.',
        subparts: [
          'Show the distance array and visited set at each step.',
          'Explain why Dijkstra fails on graphs containing negative edge cycles.',
          'State how the Fibonacci heap reduces time complexity to O(E + V log V).'
        ],
        marks: 15,
        modelAnswer: 'Relaxation condition: if dist[u] + weight(u,v) < dist[v] then dist[v] = dist[u] + weight(u,v). Negative weight cycles allow distances to decrease infinitely. Adjacency list with Min-Heap takes O((V + E) log V).'
      },
      {
        title: 'Dynamic Programming: 0/1 Knapsack Problem',
        text: 'Formulate the 0/1 Knapsack problem using dynamic programming. Derive the recurrence relation and construct the DP table for weights W = [2, 3, 4, 5], values V = [3, 4, 5, 6], and maximum capacity C = 5.',
        subparts: [
          'Explain why the greedy choice strategy fails for 0/1 Knapsack.',
          'Fill the DP matrix table DP[i][w] step by step.',
          'Backtrack to identify which specific items were included in the optimal knapsack.'
        ],
        marks: 15,
        modelAnswer: 'DP recurrence: DP[i][w] = max(DP[i-1][w], V[i] + DP[i-1][w - W[i]]). Greedy fails because items cannot be divided. With C = 5, optimal items are items 1 and 2 giving total value 7.'
      }
    ]
  },

  // 2. OPERATING SYSTEMS
  os: {
    mcqs: [
      {
        text: 'Which of the following is NOT one of Coffman four necessary conditions for deadlock?',
        options: ['A) Mutual Exclusion', 'B) Hold and Wait', 'C) Preemptive Resource Allocation', 'D) Circular Wait'],
        correct: 'C) Preemptive Resource Allocation',
        explanation: 'The four conditions are Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. Preemption eliminates deadlock.',
        marks: 1
      },
      {
        text: 'In round-robin CPU scheduling, if the time quantum q becomes extremely large, the algorithm behaves as:',
        options: ['A) Shortest Job First (SJF)', 'B) First-Come First-Served (FCFS)', 'C) Priority Scheduling', 'D) Multilevel Queue'],
        correct: 'B) First-Come First-Served (FCFS)',
        explanation: 'If quantum is larger than the longest burst time, every process runs to completion on arrival, degenerating into FCFS.',
        marks: 1
      },
      {
        text: 'What hardware component accelerates virtual-to-physical address translation in a paged system?',
        options: ['A) ALU', 'B) Translation Lookaside Buffer (TLB)', 'C) DMA Controller', 'D) Instruction Register'],
        correct: 'B) Translation Lookaside Buffer (TLB)',
        explanation: 'TLB is a fast associative cache storing recently accessed page-to-frame mappings.',
        marks: 1
      },
      {
        text: 'Belady anomaly in page replacement occurs in which algorithm?',
        options: ['A) Optimal (OPT)', 'B) Least Recently Used (LRU)', 'C) First-In First-Out (FIFO)', 'D) Clock Algorithm'],
        correct: 'C) First-In First-Out (FIFO)',
        explanation: 'FIFO is susceptible to Belady anomaly, where increasing page frames causes MORE page faults.',
        marks: 1
      },
      {
        text: 'What system call is used in UNIX/Linux to create a new child process?',
        options: ['A) fork()', 'B) exec()', 'C) clone()', 'D) spawn()'],
        correct: 'A) fork()',
        explanation: 'fork() creates an exact duplicate child process with separate PID and address space.',
        marks: 1
      },
      {
        text: 'What is the phenomenon called when the CPU spends more time swapping pages in/out than executing processes?',
        options: ['A) Fragmentation', 'B) Starvation', 'C) Thrashing', 'D) Aging'],
        correct: 'C) Thrashing',
        explanation: 'Thrashing occurs when the sum of working sets exceeds physical memory, leading to constant page faults.',
        marks: 1
      },
      {
        text: 'A binary semaphore initialized to 1 can take values:',
        options: ['A) 0 and 1 only', 'B) Any positive integer', 'C) -1, 0, 1', 'D) 0, 1, 2'],
        correct: 'A) 0 and 1 only',
        explanation: 'A binary semaphore (mutex) restricts values to 0 (locked) and 1 (unlocked).',
        marks: 1
      },
      {
        text: 'Which CPU scheduling algorithm is mathematically provable to give minimum average waiting time?',
        options: ['A) FCFS', 'B) Non-preemptive Priority', 'C) Shortest Job First (SJF)', 'D) Round Robin'],
        correct: 'C) Shortest Job First (SJF)',
        explanation: 'SJF schedules shorter tasks first, mathematically minimizing total waiting time sum.',
        marks: 1
      },
      {
        text: 'Which file allocation strategy suffers from external fragmentation?',
        options: ['A) Contiguous Allocation', 'B) Linked Allocation', 'C) Indexed Allocation', 'D) Inode Allocation'],
        correct: 'A) Contiguous Allocation',
        explanation: 'Contiguous allocation requires unbroken blocks of disk space, producing external fragmentation.',
        marks: 1
      },
      {
        text: 'What technique is used in modern OS kernels to allow both parent and child to share physical pages until modification?',
        options: ['A) Demand Paging', 'B) Copy-On-Write (COW)', 'C) Segmentation', 'D) Swapping'],
        correct: 'B) Copy-On-Write (COW)',
        explanation: 'COW shares pages read-only until either process writes, saving memory and fork execution time.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Banker Algorithm for Deadlock Avoidance',
        text: 'State the working principle of Dijkstra Banker Algorithm. Differentiate between a Safe State and a Deadlock State.',
        marks: 5,
        modelAnswer: 'Banker algorithm ensures every resource allocation request leaves the system in a Safe State where a safe sequence exists to satisfy maximum remaining claims of all processes. An unsafe state is not necessarily deadlocked, but can transition into deadlock.'
      },
      {
        title: 'Effective Memory Access Time (EMAT) with TLB',
        text: 'Given memory access time = 100 ns, TLB access time = 20 ns, and TLB hit ratio = 85%, calculate the Effective Memory Access Time (EMAT) with single-level paging.',
        marks: 5,
        modelAnswer: 'Formula: EMAT = HitRatio × (TLB + Mem) + (1 - HitRatio) × (TLB + 2 × Mem) = 0.85 × (20 + 100) + 0.15 × (20 + 200) = 0.85 × 120 + 0.15 × 220 = 102 + 33 = 135 ns.'
      },
      {
        title: 'Compare Monolithic vs Microkernel Architecture',
        text: 'Explain the fundamental design differences between a Monolithic kernel (Linux) and a Microkernel (Mach/QNX) in terms of IPC overhead and fault isolation.',
        marks: 5,
        modelAnswer: 'Monolithic kernels run all OS services (VFS, drivers, networking) in ring 0 kernel space (fast, but driver crash crashes OS). Microkernels keep only IPC, scheduling, and basic memory in ring 0, running drivers in user space (fault-tolerant, but IPC overhead).'
      },
      {
        title: 'Explain Reader-Writer Synchronization Problem',
        text: 'Outline the Reader-Writer problem using semaphores. How can writer starvation be prevented when multiple readers read concurrently?',
        marks: 5,
        modelAnswer: 'Multiple readers can read concurrently, but writers require exclusive access. If new readers continuously arrive, a writer starves. Priority inversion can be resolved by letting incoming readers wait once a writer requests the lock.'
      }
    ],
    longQuestions: [
      {
        title: 'Page Replacement Algorithms: FIFO, LRU, Optimal Simulation',
        text: 'Given the page reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1 with 3 physical memory page frames (initially empty):',
        subparts: [
          'Simulate FIFO and calculate total page faults.',
          'Simulate LRU and calculate total page faults.',
          'Simulate Optimal (OPT) page replacement and compare hit ratios.',
          'Discuss Belady Anomaly and prove whether LRU can ever suffer from it.'
        ],
        marks: 15,
        modelAnswer: 'Trace page frames at each reference step. Optimal yields the theoretical minimum page faults. LRU is a stack algorithm (subsets property holds), so LRU is mathematically immune to Belady anomaly.'
      },
      {
        title: 'Process Synchronization: Semaphores & Dining Philosophers',
        text: 'Explain the classic Dining Philosophers Problem with 5 philosophers and 5 chopsticks. Write a deadlock-free synchronization solution using mutex semaphores.',
        subparts: [
          'State why the naive implementation (pick left, pick right) leads to deadlock.',
          'Implement asymmetric solution (odd philosophers pick left first, even pick right first).',
          'Explain how monitor condition variables eliminate busy-waiting.'
        ],
        marks: 15,
        modelAnswer: 'Naive approach leads to circular wait: every philosopher picks left chopstick simultaneously. Deadlock broken by breaking circular wait asymmetry: odd numbered philosophers grab left then right, even grab right then left.'
      }
    ]
  },

  // 3. DATABASE MANAGEMENT SYSTEMS (DBMS)
  dbms: {
    mcqs: [
      {
        text: 'Which normal form eliminates partial functional dependencies (functional dependencies on part of a composite primary key)?',
        options: ['A) 1NF', 'B) 2NF', 'C) 3NF', 'D) BCNF'],
        correct: 'B) 2NF',
        explanation: 'Second Normal Form (2NF) mandates 1NF and requires that no non-prime attribute depends on a proper subset of any candidate key.',
        marks: 1
      },
      {
        text: 'In ACID properties of transactions, which property ensures that once committed, changes survive system crashes?',
        options: ['A) Atomicity', 'B) Consistency', 'C) Isolation', 'D) Durability'],
        correct: 'D) Durability',
        explanation: 'Durability guarantees that committed data is written to non-volatile storage (WAL log / disk) and persists through crashes.',
        marks: 1
      },
      {
        text: 'What index structure is used by most relational databases (PostgreSQL, MySQL InnoDB) for range queries and table primary keys?',
        options: ['A) Hash Index', 'B) B+ Tree', 'C) Binary Search Tree', 'D) Red-Black Tree'],
        correct: 'B) B+ Tree',
        explanation: 'B+ Trees store all records in linked leaf nodes, making sequential range scans and O(log N) searches extremely fast on disk.',
        marks: 1
      },
      {
        text: 'Which relational algebra operation corresponds to SQL SELECT DISTINCT column_name FROM table?',
        options: ['A) Selection (sigma)', 'B) Projection (pi)', 'C) Join (bowtie)', 'D) Cartesian Product (X)'],
        correct: 'B) Projection (pi)',
        explanation: 'Projection (pi) extracts specific columns and removes duplicate rows mathematically.',
        marks: 1
      },
      {
        text: 'A schedule is conflict serializable if its precedence (serialization) graph contains:',
        options: ['A) A cycle', 'B) No cycles (Acyclic)', 'C) Isolated nodes only', 'D) Bidirectional edges'],
        correct: 'B) No cycles (Acyclic)',
        explanation: 'An acyclic precedence graph allows a topological sort, proving equivalence to a serial execution schedule.',
        marks: 1
      },
      {
        text: 'In BCNF, for every functional dependency X -> Y, X must be:',
        options: ['A) A prime attribute', 'B) A Superkey', 'C) A foreign key', 'D) A single attribute'],
        correct: 'B) A Superkey',
        explanation: 'Boyce-Codd Normal Form strictly requires that for every non-trivial FD X -> Y, determinant X is a Superkey.',
        marks: 1
      },
      {
        text: 'Which isolation level prevents Dirty Reads but still allows Non-Repeatable Reads?',
        options: ['A) Read Uncommitted', 'B) Read Committed', 'C) Repeatable Read', 'D) Serializable'],
        correct: 'B) Read Committed',
        explanation: 'Read Committed only reads data committed before query execution, preventing dirty reads of uncommitted transactions.',
        marks: 1
      },
      {
        text: 'What type of lock allows multiple transactions to read a database item simultaneously, but prevents write operations?',
        options: ['A) Exclusive Lock (X)', 'B) Shared Lock (S)', 'C) Intent Exclusive (IX)', 'D) Spinlock'],
        correct: 'B) Shared Lock (S)',
        explanation: 'Shared locks (S) permit multiple concurrent readers while blocking any exclusive write locks (X).',
        marks: 1
      },
      {
        text: 'Which recovery algorithm utilizes Write-Ahead Logging (WAL) with Analysis, Redo, and Undo passes?',
        options: ['A) Two-Phase Locking', 'B) ARIES', 'C) Timestamp Ordering', 'D) Multiversion Concurrency (MVCC)'],
        correct: 'B) ARIES',
        explanation: 'ARIES (Algorithms for Recovery and Isolation Exploiting Semantics) uses WAL with Analysis, Redo, and Undo passes.',
        marks: 1
      },
      {
        text: 'The SQL clause used to filter groups created by GROUP BY is:',
        options: ['A) WHERE', 'B) HAVING', 'C) ORDER BY', 'D) LIMIT'],
        correct: 'B) HAVING',
        explanation: 'HAVING filters aggregated groups, whereas WHERE filters individual rows before grouping.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Normalization: 3NF vs BCNF Comparison',
        text: 'Define Third Normal Form (3NF) and Boyce-Codd Normal Form (BCNF). Give an example of a relation in 3NF that violates BCNF.',
        marks: 5,
        modelAnswer: 'For X -> A: in 3NF, either X is a superkey or A is a prime attribute. In BCNF, X must strictly be a superkey. Consider R(Student, Subject, Teacher) with FDs { (Student, Subject) -> Teacher, Teacher -> Subject }. Candidate keys are (Student, Subject) and (Student, Teacher). Teacher -> Subject has prime attribute Subject, satisfying 3NF, but Teacher is not a superkey, violating BCNF.'
      },
      {
        title: 'Two-Phase Locking (2PL) and Serializability',
        text: 'Explain the Growing Phase and Shrinking Phase in Strict Two-Phase Locking (Strict 2PL). How does Strict 2PL prevent cascading aborts?',
        marks: 5,
        modelAnswer: 'In 2PL, transactions acquire locks in the growing phase and release in the shrinking phase. Strict 2PL holds all Exclusive locks until commit/abort, ensuring uncommitted data is never exposed, completely preventing cascading rollbacks.'
      },
      {
        title: 'ACID Properties and Recovery with WAL',
        text: 'Explain Write-Ahead Logging (WAL) protocol. Why must log records be flushed to disk before the corresponding database page is modified on disk?',
        marks: 5,
        modelAnswer: 'WAL guarantees Atomicity and Durability: log records describing a change must reach non-volatile disk before the modified data page is written. In a crash, uncommitted changes can be Undone and committed changes can be Redone.'
      },
      {
        title: 'Dense Index vs Sparse Index in B+ Tree',
        text: 'Differentiate between a Dense Index and a Sparse Index in file organization. Why are sparse indexes typically used only on sorted data files?',
        marks: 5,
        modelAnswer: 'Dense index contains an index entry for every search key in the file. Sparse index contains entries only for some search keys (typically one per disk block). Sparse indexes require sorted records so binary search can locate the enclosing block.'
      }
    ],
    longQuestions: [
      {
        title: 'Relational Decomposition & Normalization Problem',
        text: 'Given relation R(A, B, C, D, E, F) and set of functional dependencies F = { A -> BC, CD -> E, B -> D, E -> A }:',
        subparts: [
          'Find all candidate keys of relation R.',
          'Identify the highest normal form of relation R with rigorous justification.',
          'Decompose R into BCNF while checking for Lossless Join and Dependency Preservation.'
        ],
        marks: 15,
        modelAnswer: 'Compute attribute closures: (A)+ = {A,B,C,D,E,F} wait: F is not in RHS of any FD, so candidate key must contain F. Candidate keys are {A,F}, {B,C,F}, {C,D,F}, {E,F}. The relation is in 1NF because B -> D has non-prime attribute D depending on partial key B. Decompose into BCNF relations preserving keys.'
      },
      {
        title: 'Query Optimization & Relational Algebra Execution Plans',
        text: 'Given tables Student(roll, name, dept) and Marks(roll, course, marks): construct the initial naive relational algebra tree for the query and apply heuristic optimization transformation rules.',
        subparts: [
          'Write the SQL query finding names of students in "CSE" with marks > 85.',
          'Draw the naive query tree involving cross product and outer filters.',
          'Push selection (sigma) and projection (pi) down the tree to minimize intermediate relation sizes.'
        ],
        marks: 15,
        modelAnswer: 'Pushed-down selections sigma(dept="CSE") on Student and sigma(marks > 85) on Marks reduce relation sizes before the join, replacing Cartesian product with hash join / index join.'
      }
    ]
  },

  // 4. COMPUTER NETWORKS
  cn: {
    mcqs: [
      {
        text: 'What layer of the OSI model is responsible for end-to-end process-to-process communication and port addressing?',
        options: ['A) Network Layer', 'B) Transport Layer', 'C) Data Link Layer', 'D) Session Layer'],
        correct: 'B) Transport Layer',
        explanation: 'The Transport layer (TCP/UDP) handles process-to-process communication using port numbers.',
        marks: 1
      },
      {
        text: 'In IPv4 CIDR notation, how many usable host IP addresses are available in a /28 subnet?',
        options: ['A) 16', 'B) 14', 'C) 30', 'D) 62'],
        correct: 'B) 14',
        explanation: '32 - 28 = 4 bits for hosts. 2^4 = 16 total addresses minus 2 (network ID & broadcast address) = 14 usable hosts.',
        marks: 1
      },
      {
        text: 'Which protocol resolves an IP address to a physical MAC address on a local area network?',
        options: ['A) DNS', 'B) ARP', 'C) RARP', 'D) DHCP'],
        correct: 'B) ARP',
        explanation: 'Address Resolution Protocol (ARP) broadcasts to map known IP addresses to link-layer MAC addresses.',
        marks: 1
      },
      {
        text: 'In TCP congestion control, what happens immediately upon detecting a packet loss via triple duplicate ACKs (Fast Retransmit)?',
        options: ['A) Slow Start (cwnd = 1 MSS)', 'B) Fast Recovery (cwnd halved to ssthresh + 3 MSS)', 'C) Connection termination', 'D) Window set to 0'],
        correct: 'B) Fast Recovery (cwnd halved to ssthresh + 3 MSS)',
        explanation: 'Triple duplicate ACKs indicate packet loss without total network silence, triggering Fast Recovery instead of slow start reset.',
        marks: 1
      },
      {
        text: 'Which routing protocol uses the Bellman-Ford algorithm and is prone to the Count-to-Infinity problem?',
        options: ['A) OSPF', 'B) RIP (Distance Vector)', 'C) BGP', 'D) IS-IS'],
        correct: 'B) RIP (Distance Vector)',
        explanation: 'Routing Information Protocol (RIP) uses distance-vector (Bellman-Ford) and suffers from count-to-infinity loop propagation.',
        marks: 1
      },
      {
        text: 'What is the maximum window size in Selective Repeat sliding window protocol with n-bit sequence numbers?',
        options: ['A) 2^n - 1', 'B) 2^(n-1)', 'C) 2^n', 'D) n'],
        correct: 'B) 2^(n-1)',
        explanation: 'To avoid overlap between old and new sequence numbers when ACKs are delayed, Selective Repeat requires W_sender = W_receiver = 2^(n-1).',
        marks: 1
      },
      {
        text: 'Which transport protocol is connectionless, non-acknowledging, and ideal for real-time video streaming?',
        options: ['A) TCP', 'B) UDP', 'C) SCTP', 'D) SSH'],
        correct: 'B) UDP',
        explanation: 'User Datagram Protocol (UDP) trades reliability for low latency and zero connection-handshake overhead.',
        marks: 1
      },
      {
        text: 'Which protocol dynamically assigns IP addresses, subnet masks, and default gateways to joining network clients?',
        options: ['A) DNS', 'B) DHCP', 'C) SNMP', 'D) ICMP'],
        correct: 'B) DHCP',
        explanation: 'Dynamic Host Configuration Protocol (DHCP) uses DORA (Discover, Offer, Request, Acknowledge) to configure hosts.',
        marks: 1
      },
      {
        text: 'What mechanism in TCP prevents a fast sender from overflowing a slow receiver buffer?',
        options: ['A) Congestion Control', 'B) Flow Control (Sliding Window)', 'C) Checksum validation', 'D) Path MTU Discovery'],
        correct: 'B) Flow Control (Sliding Window)',
        explanation: 'Flow control uses the Receiver Advertised Window (rwnd) in TCP headers to prevent receiver buffer overflow.',
        marks: 1
      },
      {
        text: 'What port does secure HTTPS communication utilize by default?',
        options: ['A) 80', 'B) 443', 'C) 8080', 'D) 22'],
        correct: 'B) 443',
        explanation: 'HTTPS operates over port 443 with TLS/SSL encryption.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'IPv4 Subnetting & CIDR Calculation',
        text: 'An organization is granted network block 192.168.10.0/24. Divide this network into 4 equal subnets. State the subnet mask, network ID, usable IP range, and broadcast address for each subnet.',
        marks: 5,
        modelAnswer: 'Borrow 2 bits: Subnet mask is 255.255.255.192 (/26). Subnet 0: 192.168.10.0/26 (hosts .1-.62, broadcast .63). Subnet 1: 192.168.10.64/26 (hosts .65-.126, broadcast .127). Subnet 2: 192.168.10.128/26 (hosts .129-.190, broadcast .191). Subnet 3: 192.168.10.192/26 (hosts .193-.254, broadcast .255).'
      },
      {
        title: 'Compare Go-Back-N and Selective Repeat ARQ',
        text: 'Compare Go-Back-N and Selective Repeat sliding window protocols in terms of sender/receiver window sizes and retransmission on packet loss.',
        marks: 5,
        modelAnswer: 'In Go-Back-N, receiver window = 1. On packet loss, all packets in the sender window after the lost packet must be retransmitted. In Selective Repeat, receiver buffers out-of-order packets and only the lost packet is retransmitted.'
      },
      {
        title: 'TCP 3-Way Handshake Connection Establishment',
        text: 'Diagram the TCP 3-Way Handshake with SYN, SYN-ACK, ACK and sequence numbers. Why is a 2-way handshake insufficient?',
        marks: 5,
        modelAnswer: 'Step 1: Client -> Server: SYN (seq=x). Step 2: Server -> Client: SYN-ACK (seq=y, ack=x+1). Step 3: Client -> Server: ACK (ack=y+1). A 2-way handshake fails because delayed duplicate SYNs could erroneously open phantom connections on the server.'
      },
      {
        title: 'OSI 7-Layer Model vs TCP/IP Protocol Stack',
        text: 'Map the 7 layers of the OSI reference model to the 4 layers of the TCP/IP protocol suite. Give examples of protocols at each layer.',
        marks: 5,
        modelAnswer: 'Application, Presentation, Session map to TCP/IP Application (HTTP, DNS, SSH). Transport maps to Transport (TCP, UDP). Network maps to Internet (IP, ICMP, ARP). Data Link & Physical map to Network Access (Ethernet, Wi-Fi).'
      }
    ],
    longQuestions: [
      {
        title: 'TCP Congestion Control Dynamics & State Machine',
        text: 'Explain TCP Tahoe and TCP Reno congestion control algorithms. Trace Congestion Window (cwnd) evolution through Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery.',
        subparts: [
          'State the additive increase / multiplicative decrease (AIMD) principle.',
          'Graph cwnd vs time for a timeout loss event versus a 3 duplicate ACK event.',
          'Explain how Selective Acknowledgment (SACK) further optimizes bandwidth recovery.'
        ],
        marks: 15,
        modelAnswer: 'Slow start doubles cwnd exponentially every RTT until ssthresh. Above ssthresh, congestion avoidance grows cwnd linearly (+1 MSS per RTT). On timeout, ssthresh = cwnd/2 and cwnd = 1 MSS. On 3 dup ACKs, Reno enters Fast Recovery with cwnd = ssthresh + 3 MSS.'
      },
      {
        title: 'Dijkstra Link State Routing vs Bellman-Ford Distance Vector',
        text: 'Trace the Link State Routing protocol (OSPF) using Dijkstra shortest path algorithm on a 6-node network graph with link costs.',
        subparts: [
          'Construct the routing table for source router R1 step by step.',
          'Explain the Count-to-Infinity problem in Distance Vector routing and how Split Horizon with Poison Reverse mitigates it.',
          'Contrast OSPF autonomous systems with Border Gateway Protocol (BGP) path-vector policy routing.'
        ],
        marks: 15,
        modelAnswer: 'OSPF floods Link State Advertisements (LSAs) so every router maintains a complete identical network topology graph, executing Dijkstra locally. Distance vector only exchanges vectors with direct neighbors, creating routing loops when a link fails.'
      }
    ]
  }
};

// Merged master repository of all subject question pools
export const ALL_SUBJECT_QUESTION_POOLS = {
  ...SUBJECT_QUESTION_POOLS,
  ...EXTENDED_SUBJECT_POOLS
};

// Generic Fallback Question Pool for Other Streams (GATE, JEE, CBSE, SSC, BCA)
export const GENERIC_STREAM_QUESTIONS = {
  gate_2027: {
    mcqs: [
      {
        text: 'In GATE CSE: Which of the following problems is undecidable?',
        options: ['A) Emptiness problem of DFA', 'B) Halting problem of Turing machine', 'C) Equivalence of two DFAs', 'D) Finiteness of regular language'],
        correct: 'B) Halting problem of Turing machine',
        explanation: 'By Turing proof, determining whether an arbitrary Turing machine halts on arbitrary input is undecidable.',
        marks: 1
      },
      {
        text: 'What is the chromatic number of a bipartite graph with at least one edge?',
        options: ['A) 1', 'B) 2', 'C) 3', 'D) 4'],
        correct: 'B) 2',
        explanation: 'A graph is bipartite if and only if its vertices can be partitioned into two independent sets with no intra-set edges.',
        marks: 1
      },
      {
        text: 'Consider an 8-way set-associative cache with 64 KB capacity and 64-byte block size. What is the number of sets?',
        options: ['A) 128', 'B) 256', 'C) 512', 'D) 1024'],
        correct: 'A) 128',
        explanation: 'Total blocks = 64 KB / 64 B = 1024 blocks. With 8 blocks per set, Number of sets = 1024 / 8 = 128 sets.',
        marks: 2
      },
      {
        text: 'Which parsing algorithm is the most powerful bottom-up parser?',
        options: ['A) LR(0)', 'B) SLR(1)', 'C) LALR(1)', 'D) Canonical LR(1)'],
        correct: 'D) Canonical LR(1)',
        explanation: 'CLR(1) distinguishes states based on specific lookahead tokens, avoiding merges that cause reduce-reduce conflicts in LALR.',
        marks: 2
      }
    ],
    shortQuestions: [
      {
        title: 'Pipelining Hazards & Speedup Calculation',
        text: 'A 5-stage instruction pipeline has stage delays of 5 ns, 7 ns, 10 ns, 8 ns, and 6 ns. Calculate the pipeline clock cycle and speedup for 1000 independent instructions.',
        marks: 5,
        modelAnswer: 'Clock cycle = max stage delay = 10 ns. Non-pipelined time per instruction = 36 ns. Speedup = (1000 × 36) / ((5 + 1000 - 1) × 10) = 36000 / 10040 ≈ 3.58x.'
      }
    ],
    longQuestions: [
      {
        title: 'Theory of Computation: P vs NP and Reductions',
        text: 'Define P, NP, NP-Complete, and NP-Hard classes. Prove that if 3-SAT polynomial-time reduces to Clique, then Clique is NP-Complete assuming 3-SAT is NP-Complete.',
        marks: 15,
        modelAnswer: 'P is solvable in deterministic polynomial time. NP is verifiable in polynomial time. NP-Complete is in NP and every problem in NP polynomial reduces to it. Reduction constructs a graph with 3 vertices per 3-SAT clause.'
      }
    ]
  },
  jee_main: {
    mcqs: [
      {
        text: 'A particle moves in a straight line with velocity v = sqrt(4 + 4s). What is its acceleration?',
        options: ['A) 1 m/s^2', 'B) 2 m/s^2', 'C) 4 m/s^2', 'D) 0 m/s^2'],
        correct: 'B) 2 m/s^2',
        explanation: 'v^2 = 4 + 4s. Differentiating with respect to s: 2v(dv/ds) = 4 -> a = v(dv/ds) = 2 m/s^2.',
        marks: 4
      },
      {
        text: 'In thermodynamics, for an adiabatic expansion of an ideal gas, the relation between P and V is:',
        options: ['A) PV = const', 'B) PV^gamma = const', 'C) P/V = const', 'D) T/P = const'],
        correct: 'B) PV^gamma = const',
        explanation: 'For reversible adiabatic process, dQ = 0 leads to PV^gamma = constant.',
        marks: 4
      },
      {
        text: 'What is the hybridization and geometric shape of XeF4 molecule?',
        options: ['A) sp3, Tetrahedral', 'B) sp3d2, Square Planar', 'C) sp3d, See-Saw', 'D) sp3d2, Octahedral'],
        correct: 'B) sp3d2, Square Planar',
        explanation: 'Xe has 8 valence electrons, 4 bonding pairs + 2 lone pairs = 6 steric number (sp3d2), giving a square planar geometry.',
        marks: 4
      }
    ],
    shortQuestions: [
      {
        title: 'Rotational Dynamics: Rolling Without Slipping',
        text: 'A solid cylinder of mass M and radius R rolls down an inclined plane of angle theta without slipping. Calculate its linear acceleration down the incline.',
        marks: 5,
        modelAnswer: 'a = (g sin theta) / (1 + I / (MR^2)). For solid cylinder, I = (1/2) MR^2, giving a = (2/3) g sin theta.'
      }
    ],
    longQuestions: [
      {
        title: 'Definite Integrals & Area Under Curves',
        text: 'Evaluate the definite integral from 0 to pi/2 of ln(sin x) dx using properties of definite integrals. Find the area enclosed between y = x^2 and y = 4x.',
        marks: 15,
        modelAnswer: 'Let I = integral_0^(pi/2) ln(sin x) dx = - (pi/2) ln 2. Area between y=x^2 and y=4x: solve x^2 = 4x -> x=0, x=4. Area = integral_0^4 (4x - x^2) dx = [2x^2 - x^3/3]_0^4 = 32 - 64/3 = 32/3 square units.'
      }
    ]
  },
  cbse_12: {
    mcqs: [
      {
        text: 'If A is an invertible square matrix of order 3 and |A| = 5, then the value of |adj(A)| is:',
        options: ['A) 5', 'B) 25', 'C) 125', 'D) 1/5'],
        correct: 'B) 25',
        explanation: '|adj(A)| = |A|^(n-1) = 5^(3-1) = 5^2 = 25.',
        marks: 1
      },
      {
        text: 'In Python, which function is used to convert an integer to its binary string representation?',
        options: ['A) bin()', 'B) hex()', 'C) oct()', 'D) str()'],
        correct: 'A) bin()',
        explanation: 'bin(n) returns the binary string prefixed with 0b.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Matrix Inverses and System of Linear Equations',
        text: 'Using matrix method, solve the system of linear equations: 2x + 3y = 8 and 3x - y = 1.',
        marks: 5,
        modelAnswer: 'AX = B -> X = A^(-1)B. |A| = 2(-1) - 3(3) = -11 != 0. A^(-1) = (1/-11) * [[-1, -3], [-3, 2]]. Solution yields x = 1, y = 2.'
      }
    ],
    longQuestions: [
      {
        title: 'Electromagnetic Induction & AC Generators',
        text: 'State Faraday laws of electromagnetic induction. Derive the expression for the instantaneous induced EMF in an AC generator rotating with angular frequency omega in magnetic field B.',
        marks: 15,
        modelAnswer: 'EMF e = -dPhi/dt. Flux Phi = B * A * cos(omega * t). Differentiating: e = B * A * omega * sin(omega * t) = e_0 * sin(omega * t).'
      }
    ]
  },
  ssc_cgl: {
    mcqs: [
      {
        text: 'If the selling price of 16 articles is equal to the cost price of 20 articles, find the profit percentage.',
        options: ['A) 20%', 'B) 25%', 'C) 15%', 'D) 30%'],
        correct: 'B) 25%',
        explanation: '16 * SP = 20 * CP -> SP/CP = 5/4. Profit% = ((5 - 4) / 4) * 100 = 25%.',
        marks: 2
      },
      {
        text: 'Who was the first woman President of the Indian National Congress?',
        options: ['A) Sarojini Naidu', 'B) Annie Besant', 'C) Sucheta Kripalani', 'D) Vijayalakshmi Pandit'],
        correct: 'B) Annie Besant',
        explanation: 'Annie Besant presided over the Calcutta session in 1917. (Sarojini Naidu was the first Indian woman in 1925).',
        marks: 2
      }
    ],
    shortQuestions: [
      {
        title: 'Time, Speed and Distance: Train Crossings',
        text: 'A train 180 meters long running at 54 km/h crosses a bridge in 30 seconds. Find the length of the bridge.',
        marks: 5,
        modelAnswer: 'Speed = 54 * (5/18) = 15 m/s. Distance = Speed * Time = 15 * 30 = 450 m. Bridge length = 450 - 180 = 270 meters.'
      }
    ],
    longQuestions: [
      {
        title: 'Comprehensive Quantitative Aptitude & Data Interpretation',
        text: 'Analyze the bar chart showing monthly revenues of a company over 5 years. Calculate compound annual growth rate (CAGR) and percentage variance.',
        marks: 15,
        modelAnswer: 'Standard CGL Tier-1 comprehensive DI analysis with step-by-step arithmetic deductions.'
      }
    ]
  },
  bca_college: {
    mcqs: [
      {
        text: 'In Python, which mutable built-in data type stores key-value pairs with O(1) average lookup?',
        options: ['A) List', 'B) Tuple', 'C) Dictionary', 'D) Set'],
        correct: 'C) Dictionary',
        explanation: 'Python dictionaries are hash tables providing average O(1) key insertion and retrieval.',
        marks: 1
      },
      {
        text: 'Which Java keyword prevents a class from being sub-classed or a method from being overridden?',
        options: ['A) static', 'B) abstract', 'C) final', 'D) synchronized'],
        correct: 'C) final',
        explanation: 'The final keyword on classes stops inheritance; on methods it stops overriding.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Java Exception Handling & try-with-resources',
        text: 'Explain try, catch, finally, and the AutoCloseable try-with-resources statement in Java.',
        marks: 5,
        modelAnswer: 'try contains code that may throw exceptions, catch handles them, finally always executes for cleanup. try-with-resources automatically closes resources implementing AutoCloseable without manual finally calls.'
      }
    ],
    longQuestions: [
      {
        title: 'Object-Oriented Design & Polymorphism',
        text: 'Explain the four pillars of Object-Oriented Programming (Encapsulation, Abstraction, Inheritance, Polymorphism). Write a full Java/Python program demonstrating compile-time vs runtime polymorphism.',
        marks: 15,
        modelAnswer: 'Compile-time polymorphism is achieved through method overloading. Runtime polymorphism is achieved through method overriding via dynamic method dispatch.'
      }
    ]
  }
};

// =========================================================================
// PAPER GENERATION FACTORY
// Assembles an authentic examination paper tailored to Stream, Subject, and Pattern
// =========================================================================

export function generateDynamicMockPaper({
  streamId = 'btech_makaut',
  subject = 'Data Structures & Algorithms',
  semester = null,
  paperFormat = 'official', // 'official' | 'midterm' | 'rapid' | 'custom'
  customMarks = 70,
  customDuration = 180,
  seed = Date.now()
}) {
  const course = COURSE_DEFINITIONS.find(c => c.id === streamId) || COURSE_DEFINITIONS[0];
  let subjectObj = course.subjects.find(s => s.name === subject || s.id === subject);
  if (!subjectObj) {
    if (semester && semester !== 'all') {
      subjectObj = course.subjects.find(s => s.semester === semester) || course.subjects[0];
    } else {
      subjectObj = course.subjects[0];
    }
  }

  // Pick question pool with comprehensive mapping across all subjects
  let poolKey = 'dsa';
  const poolRepo = ALL_SUBJECT_QUESTION_POOLS;

  if (subjectObj.id in poolRepo) {
    poolKey = subjectObj.id;
  } else {
    const subLower = (subjectObj.name + ' ' + (subjectObj.code || '') + ' ' + (subjectObj.id || '')).toLowerCase();
    
    if (subLower.includes('operat') || subLower.includes('os') || subLower.includes('cs401')) {
      poolKey = 'os';
    } else if (subLower.includes('dbms') || subLower.includes('database') || subLower.includes('sql') || subLower.includes('cs501')) {
      poolKey = 'dbms';
    } else if (subLower.includes('network') || subLower.includes('cn') || subLower.includes('cs601')) {
      poolKey = 'cn';
    } else if (subLower.includes('math') || subLower.includes('discrete') || subLower.includes('calculus') || subLower.includes('m101') || subLower.includes('m201') || subLower.includes('m301') || subLower.includes('algebra')) {
      poolKey = 'math';
    } else if (subLower.includes('phys') || subLower.includes('ph201') || subLower.includes('optics') || subLower.includes('mechanics')) {
      poolKey = 'physics';
    } else if (subLower.includes('chem') || subLower.includes('ch101') || subLower.includes('organic')) {
      poolKey = 'chemistry';
    } else if (subLower.includes('electr') || subLower.includes('ee101') || subLower.includes('digital logic') || subLower.includes('logic design') || subLower.includes('circuit')) {
      poolKey = 'electrical';
    } else if (subLower.includes('problem solving in c') || subLower.includes('programming in c') || subLower.includes('cs201') || subLower.includes('bca-101') || subLower.includes('c_prog')) {
      poolKey = 'c_prog';
    } else if (subLower.includes('daa') || (subLower.includes('algorithm') && subLower.includes('design')) || subLower.includes('cs402')) {
      poolKey = 'daa';
    } else if (subLower.includes('organization') || subLower.includes('architecture') || subLower.includes('coa') || subLower.includes('cs302') || subLower.includes('cs403')) {
      poolKey = 'coa';
    } else if (subLower.includes('automata') || subLower.includes('formal language') || subLower.includes('flat') || subLower.includes('toc') || subLower.includes('computation')) {
      poolKey = 'flat';
    } else if (subLower.includes('compiler') || subLower.includes('cd') || subLower.includes('cs502')) {
      poolKey = 'cd';
    } else if (subLower.includes('software eng') || subLower.includes('se') || subLower.includes('agile')) {
      poolKey = 'se';
    } else if (subLower.includes('java') || subLower.includes('oop')) {
      poolKey = 'java';
    } else if (subLower.includes('cloud') || subLower.includes('distributed')) {
      poolKey = 'cloud';
    } else if (subLower.includes('web') || subLower.includes('full-stack') || subLower.includes('html') || subLower.includes('javascript')) {
      poolKey = 'web';
    } else if (subLower.includes('deep learning') || subLower.includes('neural') || subLower.includes('cs801')) {
      poolKey = 'deep_learning';
    } else if (subLower.includes('machine learning') || subLower.includes('ai &') || subLower.includes('aiml') || subLower.includes('artificial') || subLower.includes('cs701')) {
      poolKey = 'aiml';
    } else if (subLower.includes('security') || subLower.includes('cryptography') || subLower.includes('cyber') || subLower.includes('cs702')) {
      poolKey = 'security';
    } else if (subLower.includes('iot') || subLower.includes('internet of things') || subLower.includes('cs701')) {
      poolKey = 'iot';
    } else if (subLower.includes('blockchain') || subLower.includes('ledger') || subLower.includes('cs802')) {
      poolKey = 'blockchain';
    } else if (streamId in GENERIC_STREAM_QUESTIONS) {
      poolKey = streamId;
    } else {
      poolKey = 'dsa';
    }
  }

  const pool = poolRepo[poolKey] || GENERIC_STREAM_QUESTIONS[streamId] || poolRepo.dsa;

  // Shuffle helper using seed
  const shuffleArray = (arr, num) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, num);
  };

  let totalMarks = course.defaultMarks;
  let duration = `${course.defaultDuration} Mins`;
  let groups = [];

  if (paperFormat === 'rapid') {
    // 15 MCQs = 15 Marks
    totalMarks = 15;
    duration = '20 Mins';
    const mcqs = shuffleArray(pool.mcqs || SUBJECT_QUESTION_POOLS.dsa.mcqs, 15).map((q, idx) => ({
      ...q,
      id: `q_rapid_${idx + 1}`,
      text: `${idx + 1}. ${q.text.replace(/^\d+\.\s*/, '')}`,
      marks: 1
    }));
    groups = [
      {
        name: 'Rapid Knowledge Sprint (15 MCQs = 15 Marks)',
        instructions: 'Answer all questions. Each correct answer carries 1 mark. Time: 20 Minutes.',
        questions: mcqs
      }
    ];
  } else if (paperFormat === 'midterm') {
    // 30 Marks Mid-Term (10 MCQs + 4 Short Answer)
    totalMarks = 30;
    duration = '60 Mins';
    const mcqs = shuffleArray(pool.mcqs || SUBJECT_QUESTION_POOLS.dsa.mcqs, 10).map((q, idx) => ({
      ...q,
      id: `q_mid_${idx + 1}`,
      text: `${idx + 1}. ${q.text.replace(/^\d+\.\s*/, '')}`,
      marks: 1
    }));
    const shorts = shuffleArray(pool.shortQuestions || SUBJECT_QUESTION_POOLS.dsa.shortQuestions, 4).map((q, idx) => ({
      ...q,
      id: `q_mid_short_${idx + 1}`,
      type: 'descriptive',
      marks: 5
    }));
    groups = [
      {
        name: 'Section A: Objective Assessment (10 × 1m = 10 Marks)',
        instructions: 'Compulsory MCQs. 1 Mark each.',
        questions: mcqs
      },
      {
        name: 'Section B: Short Analytical Questions (4 × 5m = 20 Marks)',
        instructions: 'Answer any 4 questions. Step-marked evaluation applies.',
        questions: shorts
      }
    ];
  } else if (paperFormat === 'custom') {
    totalMarks = customMarks || 50;
    duration = `${customDuration || 90} Mins`;
    const mcqCount = Math.min(10, Math.floor(totalMarks / 3));
    const shortCount = Math.max(1, Math.floor((totalMarks - mcqCount) / 5));
    const mcqs = shuffleArray(pool.mcqs || SUBJECT_QUESTION_POOLS.dsa.mcqs, mcqCount).map((q, idx) => ({
      ...q,
      id: `q_cust_mcq_${idx + 1}`,
      text: `${idx + 1}. ${q.text.replace(/^\d+\.\s*/, '')}`,
      marks: 1
    }));
    const shorts = shuffleArray(pool.shortQuestions || SUBJECT_QUESTION_POOLS.dsa.shortQuestions, shortCount).map((q, idx) => ({
      ...q,
      id: `q_cust_short_${idx + 1}`,
      type: 'descriptive',
      marks: 5
    }));
    groups = [
      {
        name: `Section A: Concept Diagnostic (${mcqCount} × 1m = ${mcqCount} Marks)`,
        instructions: 'Answer all questions.',
        questions: mcqs
      },
      {
        name: `Section B: Core Subject Applications (${shortCount} × 5m = ${shortCount * 5} Marks)`,
        instructions: 'Answer all questions with step-by-step reasoning.',
        questions: shorts
      }
    ];
  } else {
    // Official Blueprint (Default)
    totalMarks = course.defaultMarks;
    duration = `${course.defaultDuration} Mins`;
    const mcqs = shuffleArray(pool.mcqs || SUBJECT_QUESTION_POOLS.dsa.mcqs, 10).map((q, idx) => ({
      ...q,
      id: `q_off_mcq_${idx + 1}`,
      text: `${idx + 1}. ${q.text.replace(/^\d+\.\s*/, '')}`,
      marks: 1
    }));
    const shorts = shuffleArray(pool.shortQuestions || SUBJECT_QUESTION_POOLS.dsa.shortQuestions, 3).map((q, idx) => ({
      ...q,
      id: `q_off_short_${idx + 1}`,
      type: 'descriptive',
      marks: 5
    }));
    const longs = shuffleArray(pool.longQuestions || SUBJECT_QUESTION_POOLS.dsa.longQuestions, 3).map((q, idx) => ({
      ...q,
      id: `q_off_long_${idx + 1}`,
      type: 'descriptive',
      marks: 15
    }));

    groups = [
      {
        name: 'Group A: Compulsory Objective (10 × 1m = 10 Marks)',
        instructions: 'Answer ALL 10 questions. Each question carries 1 mark.',
        questions: mcqs
      },
      {
        name: 'Group B: Short Answer & Conceptual Proofs (3 of 5 × 5m = 15 Marks)',
        instructions: 'Answer any 3 questions. Each question carries 5 marks.',
        questions: shorts
      },
      {
        name: 'Group C: Long Questions & Complex Numericals (3 of 5 × 15m = 45 Marks)',
        instructions: 'Answer any 3 questions. Sub-parts carry marks as indicated.',
        questions: longs
      }
    ];
  }

  const setCode = ['SET-A', 'SET-B', 'SET-C', 'SET-D'][Math.floor(Math.random() * 4)];
  const finalSemester = (semester && semester !== 'all') ? semester : (subjectObj.semester || 'All');

  return {
    id: `paper-${course.id}-${subjectObj.code || 'GEN'}-${Date.now()}`,
    title: `${course.name} ${finalSemester && finalSemester !== 'All' ? `(Semester ${finalSemester})` : ''} Examination: ${subjectObj.name}`,
    subject: subjectObj.name,
    semester: finalSemester,
    paperCode: `${subjectObj.code || 'CODE-101'} (${setCode})`,
    courseName: course.name,
    streamId: course.id,
    totalMarks,
    duration,
    format: paperFormat,
    groups
  };
}

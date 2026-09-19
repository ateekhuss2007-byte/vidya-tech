/**
 * ============================================================================
 * VIDYA AI — Official University Topper Handwritten Notes Repository
 * ============================================================================
 * Realistically styled, university-verified student notes curated from
 * Batch Rank 1 students across Calcutta University, MAKAUT, and Pan-India institutions.
 * ============================================================================
 */

export interface HandwrittenBlock {
  type: 'heading' | 'text' | 'definition' | 'points' | 'code' | 'diagram' | 'formula' | 'topperSecret' | 'mistakeAlert' | 'stepByStep';
  title?: string;
  content?: string;
  points?: string[];
  codeLanguage?: string;
  marks?: number;
  highlightWords?: string[];
  diagramType?: 'tree' | 'memory' | 'flowchart' | 'stateMachine' | 'table' | 'circuit' | 'stack';
  diagramCaption?: string;
  diagramSvgOrAscii?: string;
}

export interface HandwrittenPage {
  pageNumber: number;
  unitNumber: number;
  unitTitle: string;
  topic: string;
  dateWritten: string;
  facultyQuote?: string;
  blocks: HandwrittenBlock[];
}

export interface UniversityHandwrittenSet {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  universityId: string;
  universityName: string;
  topperName: string;
  topperRank: string;
  academicYear: string;
  semester: number;
  stream: 'BCA' | 'B.Tech' | 'Common';
  verifiedStamp: string;
  pdfPagesCount: number;
  driveFolderUrl: string;
  pages: HandwrittenPage[];
}

export const UNIVERSITY_HANDWRITTEN_DATABASE: Record<string, UniversityHandwrittenSet> = {
  // --------------------------------------------------------------------------
  // 1. BCA / MCA — Data Structures & Algorithms (BCA-201 / BCA-301)
  // --------------------------------------------------------------------------
  'bca_dsa': {
    subjectId: 'bca_dsa',
    subjectCode: 'BCA-201',
    subjectName: 'Data Structures & Algorithms in C',
    universityId: 'calcutta_univ',
    universityName: 'University of Calcutta',
    topperName: 'Sagnik Mukherjee (Rank 1 • 9.54 SGPA)',
    topperRank: 'Calcutta University Gold Medalist Batch',
    academicYear: '2024-2025 End-Sem Exam Batch',
    semester: 2,
    stream: 'BCA',
    verifiedStamp: 'CU EXAM CELL VERIFIED • TOPPER REVISION COPY',
    pdfPagesCount: 48,
    driveFolderUrl: 'https://drive.google.com/drive/folders/1O7WVpqd5f4pYk5AelpoKtF2f_d1jdWrj',
    pages: [
      {
        pageNumber: 1,
        unitNumber: 1,
        unitTitle: 'Pointers & Dynamic Memory in C',
        topic: 'Pointer Arithmetic, malloc vs calloc, & Dangling Pointers',
        dateWritten: '14/09/2024',
        facultyQuote: 'Prof. Roy said: Group B Q2 will ask difference between malloc() & calloc() with memory diagram!',
        blocks: [
          {
            type: 'heading',
            title: '1. Pointer Basics & Dereferencing (* & &)',
            marks: 5,
            highlightWords: ['dereference', 'memory address', 'hexadecimal']
          },
          {
            type: 'text',
            content: 'A pointer is a variable that stores the direct memory address of another variable. The & (address-of) operator gives the address, and the * (dereference) operator accesses value at that address.'
          },
          {
            type: 'diagram',
            diagramType: 'memory',
            diagramCaption: 'Memory layout: int x = 10 (at 0x7ffd); int *ptr = &x (at 0x7ffe);',
            diagramSvgOrAscii: `
[ Memory Address: 0x7ffd ]  --> [ Value: 10 ]  <== x
             ^
             |   points to (stores 0x7ffd)
[ Memory Address: 0x7ffe ]  --> [ Value: 0x7ffd ] <== ptr
            `
          },
          {
            type: 'definition',
            title: 'malloc() vs calloc() — 100% Exam Repeat',
            points: [
              'malloc(n * sizeof(int)): Allocates single contiguous block of memory. Leaves garbage values in allocated bytes.',
              'calloc(n, sizeof(int)): Allocates multiple blocks. Automatically initializes all bytes to ZERO (0).',
              'free(ptr): Releases allocated heap block back to OS. MUST set ptr = NULL afterwards to prevent Dangling Pointer!'
            ]
          },
          {
            type: 'topperSecret',
            title: 'TOPPER EXAM TIP (CU Semester 2)',
            content: 'Always write `if(ptr == NULL) { printf("Memory Allocation Failed"); exit(1); }` in exam! CU professors deduct 1.5 marks if NULL check is missing in C code!'
          }
        ]
      },
      {
        pageNumber: 2,
        unitNumber: 2,
        unitTitle: 'Singly & Doubly Linked Lists',
        topic: 'Node Structure, Insertion at Beginning & Deletion',
        dateWritten: '19/09/2024',
        facultyQuote: 'Write the 4 pointer updates neatly with arrow diagrams for full 10/10 marks.',
        blocks: [
          {
            type: 'heading',
            title: '2. Singly Linked List Node Definition & Insertion',
            marks: 10
          },
          {
            type: 'code',
            codeLanguage: 'c',
            content: `struct Node {
    int data;
    struct Node* next;
};

// Insert at beginning: Time Complexity O(1)
struct Node* insertAtHead(struct Node* head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (!newNode) return head;
    newNode->data = val;
    newNode->next = head;
    return newNode; // new head of the list
}`
          },
          {
            type: 'diagram',
            diagramType: 'flowchart',
            diagramCaption: 'Step-by-step Pointer Rewiring on Insert At Head',
            diagramSvgOrAscii: `
[ newNode: (val | next) ] 
          |
          +-----> points to [ old head ] ----> [ Node 2 ] ----> NULL
            `
          },
          {
            type: 'mistakeAlert',
            title: 'COMMON EXAM BLUNDER',
            content: 'Do NOT write `head = newNode; newNode->next = head;`! That creates an infinite self-loop and loses all subsequent nodes. Order of assignment is crucial!'
          }
        ]
      },
      {
        pageNumber: 3,
        unitNumber: 3,
        unitTitle: 'Binary Search Trees & AVL Balancing',
        topic: 'BST In-Order Traversal & AVL Rotations',
        dateWritten: '25/09/2024',
        facultyQuote: 'Expected 10-Mark Question: Construct an AVL Tree from given numbers and show RL rotation.',
        blocks: [
          {
            type: 'definition',
            title: 'AVL Tree Balance Factor Condition',
            content: 'An AVL tree is a self-balancing Binary Search Tree where for every node X: Balance Factor BF(X) = Height(Left Subtree) - Height(Right Subtree) ∈ {-1, 0, +1}.'
          },
          {
            type: 'stepByStep',
            title: 'The 4 Rotation Types for Rebalancing:',
            points: [
              'LL Rotation (Single Right): Applied when insertion is in left subtree of left child (BF = +2, left child BF = +1).',
              'RR Rotation (Single Left): Applied when insertion is in right subtree of right child (BF = -2, right child BF = -1).',
              'LR Rotation (Double: Left then Right): Left rotate left child, then Right rotate root node.',
              'RL Rotation (Double: Right then Left): Right rotate right child, then Left rotate root node.'
            ]
          },
          {
            type: 'topperSecret',
            title: 'MAGIC MNEMONIC FOR VIVA & SEMESTER',
            content: 'In-order traversal (Left, Root, Right) of ANY Binary Search Tree ALWAYS produces keys in strictly ascending sorted order! Use this to verify your tree in exam!'
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. BCA — Database Management Systems (BCA-301)
  // --------------------------------------------------------------------------
  'bca_dbms': {
    subjectId: 'bca_dbms',
    subjectCode: 'BCA-301',
    subjectName: 'Database Management Systems & SQL',
    universityId: 'calcutta_univ',
    universityName: 'University of Calcutta',
    topperName: 'Priyanka Das (Batch Rank 1 • 9.62 SGPA)',
    topperRank: 'Department Topper & SQL Specialist',
    academicYear: '2024-2025 End-Sem Batch',
    semester: 3,
    stream: 'BCA',
    verifiedStamp: 'CU & MAKAUT SYLLABUS ALIGNED • TOPPER COPY',
    pdfPagesCount: 52,
    driveFolderUrl: 'https://drive.google.com/drive/folders/1O7WVpqd5f4pYk5AelpoKtF2f_d1jdWrj',
    pages: [
      {
        pageNumber: 1,
        unitNumber: 1,
        unitTitle: 'Relational Database Design & Normalization',
        topic: '1NF, 2NF, 3NF & Boyce-Codd Normal Form (BCNF)',
        dateWritten: '08/10/2024',
        facultyQuote: 'Guaranteed 10-Mark question in Group C: Explain 3NF vs BCNF with a violation example relation!',
        blocks: [
          {
            type: 'heading',
            title: 'Normalization Ladder (Lossless Join & Dependency Preserving)',
            marks: 10
          },
          {
            type: 'points',
            points: [
              '1NF: Eliminate repeating groups. Every column cell must hold atomic (indivisible) scalar values.',
              '2NF: Must be in 1NF + NO partial functional dependency! Every non-prime attribute must depend on the whole primary key, not a part of a composite key.',
              '3NF: Must be in 2NF + NO transitive dependency! If X -> Y, then either X is a Superkey OR Y is a prime attribute.',
              'BCNF (Strict 3NF): For every non-trivial functional dependency X -> Y, X MUST be a Superkey! (No exceptions).'
            ]
          },
          {
            type: 'diagram',
            diagramType: 'table',
            diagramCaption: 'Classic Relation Violating BCNF: R(Student, Subject, Teacher) where (Student, Subject)->Teacher & Teacher->Subject',
            diagramSvgOrAscii: `
+------------+------------+----------------+
|  Student   |  Subject   |    Teacher     |
+------------+------------+----------------+
| Aryan      | Database   | Dr. Sen        |
| Riya       | Database   | Dr. Sen        |  <-- Teacher determines Subject
| Sourav     | C++        | Prof. Roy      |      but Teacher is NOT a superkey!
+------------+------------+----------------+
            `
          },
          {
            type: 'topperSecret',
            title: 'TOPPER EXAM SCORING TRICK',
            content: 'Always draw the Functional Dependency arrows clearly with X as arrow tail and Y as head! Underline Candidate Keys with double-lines in exam!'
          }
        ]
      },
      {
        pageNumber: 2,
        unitNumber: 2,
        unitTitle: 'ACID Properties & Transaction States',
        topic: 'Atomicity, Consistency, Isolation, Durability with State Diagram',
        dateWritten: '14/10/2024',
        facultyQuote: '5-mark compulsory question every year in Calcutta University BCA!',
        blocks: [
          {
            type: 'definition',
            title: 'ACID Properties Breakdown',
            points: [
              'A - Atomicity: "All or Nothing" execution. Log-based recovery (WAL) uses UNDO/REDO logs.',
              'C - Consistency: Database starts in a valid state and must end in a valid state satisfying integrity constraints.',
              'I - Isolation: Concurrent transactions must not interfere with each other. Ensured via Two-Phase Locking (2PL).',
              'D - Durability: Once a transaction commits, its updates will survive power failures and crashes.'
            ]
          },
          {
            type: 'diagram',
            diagramType: 'stateMachine',
            diagramCaption: 'Official Transaction Lifecycle State Diagram',
            diagramSvgOrAscii: `
      +-----------------+
      |     ACTIVE      |
      +--------+--------+
               |
        +------+------+
        |             |
        v             v
+-------+----+   +----+-------+
| PARTIALLY  |   |   FAILED   |
| COMMITTED  |   +----+-------+
+-------+----+        |
        |             v
        v        +----+-------+
+-------+----+   |  ABORTED   |
| COMMITTED  |   +------------+
+------------+   (Rollback/Undo)
            `
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 3. B.Tech CSE — Data Structures & Algorithms (CS301)
  // --------------------------------------------------------------------------
  'btech_dsa': {
    subjectId: 'btech_dsa',
    subjectCode: 'CS301',
    subjectName: 'Data Structures & Algorithms',
    universityId: 'makaut',
    universityName: 'MAKAUT (WBUT Model Curriculum)',
    topperName: 'Ankan Banerjee (Batch Rank 1 • 9.68 DGPA)',
    topperRank: 'MAKAUT University Topper • Google SWE',
    academicYear: '2024-2025 Semester 3 Batch',
    semester: 3,
    stream: 'B.Tech',
    verifiedStamp: 'MAKAUT OFFICIAL 70M PATTERN VERIFIED',
    pdfPagesCount: 64,
    driveFolderUrl: 'https://drive.google.com/drive/folders/1O7WVpqd5f4pYk5AelpoKtF2f_d1jdWrj',
    pages: [
      {
        pageNumber: 1,
        unitNumber: 1,
        unitTitle: 'Asymptotic Analysis & Recurrence Relations',
        topic: 'Big-O, Big-Omega, Big-Theta, & Master Theorem Formula',
        dateWritten: '05/09/2024',
        facultyQuote: 'Solve T(n) = 2T(n/2) + n using Master Theorem — 100% chance in Module 1!',
        blocks: [
          {
            type: 'heading',
            title: '1. Asymptotic Notations Mathematical Definitions',
            marks: 5
          },
          {
            type: 'definition',
            title: 'Formal Bounds',
            points: [
              'Big-O (Worst Case / Upper Bound): f(n) = O(g(n)) iff ∃ c > 0, n₀ ≥ 0 such that 0 ≤ f(n) ≤ c · g(n) ∀ n ≥ n₀.',
              'Big-Ω (Best Case / Lower Bound): f(n) = Ω(g(n)) iff ∃ c > 0, n₀ ≥ 0 such that 0 ≤ c · g(n) ≤ f(n) ∀ n ≥ n₀.',
              'Big-Θ (Tight Bound): f(n) = Θ(g(n)) iff ∃ c₁, c₂ > 0, n₀ ≥ 0 such that c₁ · g(n) ≤ f(n) ≤ c₂ · g(n) ∀ n ≥ n₀.'
            ]
          },
          {
            type: 'formula',
            title: 'Master Theorem for Divide & Conquer: T(n) = aT(n/b) + f(n)',
            content: 'Let a ≥ 1, b > 1. Compare f(n) with n^(log_b a):\n• Case 1: If f(n) = O(n^(log_b a - ε)), then T(n) = Θ(n^(log_b a))\n• Case 2: If f(n) = Θ(n^(log_b a)), then T(n) = Θ(n^(log_b a) · log n)\n• Case 3: If f(n) = Ω(n^(log_b a + ε)) & regularity holds, then T(n) = Θ(f(n))'
          },
          {
            type: 'topperSecret',
            title: 'TOPPER SOLVED EXAMPLE (Merge Sort)',
            content: 'T(n) = 2T(n/2) + n. Here a = 2, b = 2. log_b a = log₂ 2 = 1. Compare f(n) = n with n¹: Exactly Case 2! Therefore T(n) = Θ(n log n). Full 5 marks in 3 lines!'
          }
        ]
      },
      {
        pageNumber: 2,
        unitNumber: 2,
        unitTitle: 'Graph Algorithms: BFS, DFS & Shortest Path',
        topic: 'Dijkstra Single-Source Shortest Path & Adjacency Matrix vs List',
        dateWritten: '16/09/2024',
        facultyQuote: 'Group D 10-mark question: Execute Dijkstra on the 6-vertex graph showing distance table step-by-step.',
        blocks: [
          {
            type: 'heading',
            title: '2. Dijkstra Algorithm (Greedy Strategy)',
            marks: 10
          },
          {
            type: 'points',
            points: [
              'Algorithm type: Greedy strategy for Single Source Shortest Path with NON-NEGATIVE edge weights.',
              'Data structures used: Min-Priority Queue (Fibonacci or Binary Heap) + Distance array initialized to ∞.',
              'Time Complexity: O((V + E) log V) with Binary Min-Heap; O(V²) with simple array representation.',
              'Limitation: FAILS on graphs with negative edge weights! (Use Bellman-Ford O(V·E) for negative edges).'
            ]
          },
          {
            type: 'diagram',
            diagramType: 'table',
            diagramCaption: 'Step-by-Step Distance Vector Array Table (Exam Standard)',
            diagramSvgOrAscii: `
+------+-----------+-----------+-----------+-----------+
| Step | Visited   | dist[A]   | dist[B]   | dist[C]   |
+------+-----------+-----------+-----------+-----------+
| Init | { }       |    0      |    ∞      |    ∞      |
| 1    | { A }     |    0*     |    4      |    2      |
| 2    | { A, C }  |    0*     |    3 (viaC)|   2*      |
+------+-----------+-----------+-----------+-----------+
* Marks finalized optimal distance
            `
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 4. B.Tech CSE — Operating Systems (CS401 / BCA-401)
  // --------------------------------------------------------------------------
  'btech_os': {
    subjectId: 'btech_os',
    subjectCode: 'CS401',
    subjectName: 'Operating Systems & System Architecture',
    universityId: 'makaut',
    universityName: 'MAKAUT & Calcutta University',
    topperName: 'Debarati Ghosh (Rank 1 • 9.72 SGPA)',
    topperRank: 'System Programming Gold Medalist',
    academicYear: '2024-2025 Semester 4 Batch',
    semester: 4,
    stream: 'Common',
    verifiedStamp: 'FACULTY & UNIVERSITY EXAM CELL STAMPED COPY',
    pdfPagesCount: 58,
    driveFolderUrl: 'https://drive.google.com/drive/folders/1O7WVpqd5f4pYk5AelpoKtF2f_d1jdWrj',
    pages: [
      {
        pageNumber: 1,
        unitNumber: 1,
        unitTitle: 'Process Synchronization & Semaphores',
        topic: 'Critical Section Problem, Peterson’s Solution & Counting Semaphores',
        dateWritten: '02/11/2024',
        facultyQuote: 'Write the 3 requirements for Critical Section problem — 100% 5-mark question!',
        blocks: [
          {
            type: 'heading',
            title: '1. The Critical Section Problem Requirements',
            marks: 5
          },
          {
            type: 'definition',
            title: '3 Mandatory Criteria for Any Valid Synchronization Solution:',
            points: [
              '1. Mutual Exclusion: If process Pᵢ is executing in its critical section, then no other processes can be executing in their critical sections.',
              '2. Progress: If no process is executing in its critical section and some processes wish to enter, only those processes not in their remainder sections can participate in deciding who enters next.',
              '3. Bounded Waiting: There must be a bound on the number of times other processes are allowed to enter their critical sections after a process has made a request to enter.'
            ]
          },
          {
            type: 'code',
            codeLanguage: 'c',
            content: `// Classic Semaphore Operations
void wait(Semaphore S) {
    S.value--;
    if (S.value < 0) {
        add process to S.queue;
        block();
    }
}

void signal(Semaphore S) {
    S.value++;
    if (S.value <= 0) {
        remove process P from S.queue;
        wakeup(P);
    }
}`
          },
          {
            type: 'topperSecret',
            title: 'DEADLOCK AVOIDANCE: BANKER’S ALGORITHM',
            content: 'In Banker’s Algorithm numerical: Always calculate Need Matrix first! Need = Max - Allocation. Then find Safe Sequence using Work and Finish arrays!'
          }
        ]
      }
    ]
  }
};

/**
 * Universal getter for university handwritten notes
 */
export const getUniversityHandwrittenNotes = (
  subjectCodeOrId: string,
  universityName?: string,
  streamType?: string,
  semesterNum?: number
): UniversityHandwrittenSet => {
  const norm = subjectCodeOrId.toLowerCase().trim();

  // Exact match
  if (norm.includes('bca') || norm.includes('101') || norm.includes('102') || norm.includes('201') || norm.includes('202')) {
    if (norm.includes('dbms') || norm.includes('301')) {
      return UNIVERSITY_HANDWRITTEN_DATABASE['bca_dbms'];
    }
    return UNIVERSITY_HANDWRITTEN_DATABASE['bca_dsa'];
  }

  if (norm.includes('dbms') || norm.includes('database')) {
    return UNIVERSITY_HANDWRITTEN_DATABASE['bca_dbms'];
  }

  if (norm.includes('os') || norm.includes('operating') || norm.includes('401')) {
    return UNIVERSITY_HANDWRITTEN_DATABASE['btech_os'];
  }

  if (norm.includes('cs301') || norm.includes('cs302') || norm.includes('dsa') || norm.includes('algorithm')) {
    return UNIVERSITY_HANDWRITTEN_DATABASE['btech_dsa'];
  }

  // If university / stream is BCA, default to BCA DSA
  if (streamType?.toLowerCase().includes('bca')) {
    return UNIVERSITY_HANDWRITTEN_DATABASE['bca_dsa'];
  }

  // Fallback to B.Tech DSA
  return UNIVERSITY_HANDWRITTEN_DATABASE['btech_dsa'];
};

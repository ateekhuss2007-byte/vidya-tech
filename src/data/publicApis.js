export const publicApiResources = [
  {
    id: 'res-arxiv-1',
    source: 'arXiv',
    title: 'A Geometric Intuition for Eigenvalues and SVD in Modern High-Dimensional Data',
    description: 'A pedagogical review paper breaking down spectral decomposition, singular values, and dimensionality reduction for computer science students.',
    author: 'Prof. J. Strang et al. (MIT / Stanford)',
    date: '2024-03-15',
    relevance: '98% Match to Blocker #BLK-01',
    category: 'Research Paper',
    url: 'https://arxiv.org/abs/2308.0123',
    tags: ['Linear Algebra', 'Dimensionality Reduction', 'SVD', 'PCA']
  },
  {
    id: 'res-github-1',
    source: 'GitHub',
    title: 'Interactive-Linear-Algebra / Eigenvector-Transformations-Python',
    description: 'Open-source interactive Matplotlib & Manim visualizer for 2D/3D matrix rotations, eigenvalues, and determinant areas.',
    author: '3Blue1Brown Community & Contributors',
    date: 'Updated 4 days ago • 14.2k ★',
    relevance: '95% Match',
    category: 'Code Example',
    url: 'https://github.com/vidya-ai-samples/eigen-visualizer',
    tags: ['Python', 'Manim', 'Visual Learning', 'Interactive']
  },
  {
    id: 'res-wiki-1',
    source: 'Wikipedia',
    title: 'Ebbinghaus Forgetting Curve and Spaced Repetition Algorithms',
    description: 'Formal mathematical formulation of the exponential memory retention decay function R = e^(-t/S) and optimal review schedules.',
    author: 'Wikipedia Scientific Corpus (Peer-Reviewed)',
    date: '2024 Revision',
    relevance: '92% Match to Digital Twin',
    category: 'Encyclopedia Reference',
    url: 'https://en.wikipedia.org/wiki/Forgetting_curve',
    tags: ['Cognitive Science', 'Memory Retention', 'Algorithms']
  },
  {
    id: 'res-openlib-1',
    source: 'Open Library',
    title: 'Introduction to Algorithms (4th Edition) — CLRS Knowledge Chapter',
    description: 'Free open academic index reference for Graph Algorithms, Topological Sorting, and Dynamic Programming invariants.',
    author: 'Cormen, Leiserson, Rivest, Stein',
    date: 'MIT Press Open Academic Index',
    relevance: '89% Match',
    category: 'Academic Book',
    url: 'https://openlibrary.org/books/OL2634351M',
    tags: ['Algorithms', 'DAG', 'Graph Theory', 'Textbook']
  },
  {
    id: 'res-arxiv-2',
    source: 'arXiv',
    title: 'Adaptive Learning Systems and Multi-Agent Knowledge Graph Topological Mapping',
    description: 'Research outlining how multi-agent cognitive swarms outperform static LMS platforms by predicting prerequisite decay in STEM domains.',
    author: 'Cognitive Computing Lab • Deep Learning Institute',
    date: '2025-01-20',
    relevance: '96% Match',
    category: 'Research Paper',
    url: 'https://arxiv.org/abs/2501.0984',
    tags: ['AI in Education', 'Knowledge Graphs', 'Cognitive Swarm']
  }
];

export const educatorStudentsMock = [
  {
    id: 'stu-101',
    name: 'Rohit Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    week1: 92,
    week2: 88,
    week3: 87,
    predictedFailureRisk: 8, // 8% risk (very healthy)
    status: 'healthy',
    mastery: 89,
    blockersCount: 1,
    engagementDecline: '-2%',
    recommendedIntervention: 'Reinforce Eigenvalues (Self-guided micro-task active)'
  },
  {
    id: 'stu-102',
    name: 'Priya Mukherjee',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    week1: 85,
    week2: 71,
    week3: 54,
    predictedFailureRisk: 74, // 74% risk (High risk)
    status: 'critical',
    mastery: 52,
    blockersCount: 4,
    engagementDecline: '-32%',
    recommendedIntervention: 'Dispatch 1-on-1 Viva & Calculus bridge module immediately.'
  },
  {
    id: 'stu-103',
    name: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    week1: 78,
    week2: 74,
    week3: 68,
    predictedFailureRisk: 42, // Moderate at risk
    status: 'at_risk',
    mastery: 69,
    blockersCount: 2,
    engagementDecline: '-12%',
    recommendedIntervention: 'Automate Dynamic Programming visual recursion tree assignment.'
  },
  {
    id: 'stu-104',
    name: 'Ananya Sen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    week1: 94,
    week2: 96,
    week3: 95,
    predictedFailureRisk: 4,
    status: 'healthy',
    mastery: 96,
    blockersCount: 0,
    engagementDecline: '+4%',
    recommendedIntervention: 'Fast-track to Advanced Quantum Computation Research track.'
  }
];

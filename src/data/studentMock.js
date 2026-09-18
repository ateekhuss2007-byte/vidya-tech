export const studentData = {
  id: 'stu_vidya_9921',
  name: 'Scholar Student',
  cohort: 'Computer Science & AI • Year 3',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  metrics: {
    cognitiveReadiness: { value: 87, trend: '+8.4%', status: 'optimal', description: 'Real-time assessment of mental energy, focus, and conceptual absorption capacity.' },
    knowledgeCoverage: { value: 74, trend: '+12.0%', status: 'improving', description: 'Percentage of the verified prerequisite knowledge graph covered.' },
    retentionProbability: { value: 92, trend: '+4.1%', status: 'stable', description: 'Calculated using Ebbinghaus memory stability model across 143 tested concepts.' },
    learningVelocity: { value: 1.8, trend: '+18.0%', unit: 'x', status: 'accelerating', description: 'Ratio of concept mastery speed compared to standardized cohort baseline.' }
  },
  cognitiveState: {
    memoryStrength: 88,
    attentionStability: 84,
    cognitiveLoad: 42, // low/optimal
    activeStreak: 12,
    hoursLearnedThisWeek: 16.5,
    recommendedDailyMinutes: 45
  },
  forgettingSimulator: {
    baseHalfLifeDays: 4.2,
    currentDayOffset: 3,
    revisionsDone: 2,
    predictedRecall: 76,
    withReinforcementRecall: 94
  },
  activeBlockers: [
    {
      id: 'blk-01',
      concept: 'Eigenvalues & Diagonalization',
      domain: 'Linear Algebra',
      severity: 'High (Blocks 4 Advanced Topics)',
      blockedConcepts: ['Principal Component Analysis (PCA)', 'Singular Value Decomposition (SVD)', 'Graph Spectral Clustering', 'Quantum Gate Transformations'],
      forgettingRisk: 'High (68% decay risk in 48h)',
      recommendedAction: 'Trigger 15-minute Interactive Vector Transformation drill.'
    },
    {
      id: 'blk-02',
      concept: 'Dynamic Programming Subproblem Overlap',
      domain: 'Algorithms',
      severity: 'Medium (Blocks 2 Advanced Topics)',
      blockedConcepts: ['Matrix Chain Multiplication', 'Floyd-Warshall Shortest Path'],
      forgettingRisk: 'Moderate',
      recommendedAction: 'Review state-transition recurrence DAG visualization.'
    }
  ],
  recentActivity: [
    { id: 'act-1', time: '12m ago', type: 'mastery', title: 'Mastered "AVL Tree Rotations"', score: '95%', domain: 'Data Structures' },
    { id: 'act-2', time: '1h ago', type: 'reinforce', title: 'Reinforced "Bayes Theorem Conditional Probability"', score: '88%', domain: 'Probability' },
    { id: 'act-3', time: 'Yesterday', type: 'agent', title: 'Adaptive Curriculum Agent recalibrated Study Matrix', score: 'Optimized', domain: 'System' }
  ]
};

export const conceptNodes = [
  { id: 'c1', name: 'Vector Spaces & Subspaces', domain: 'Linear Algebra', status: 'mastered', mastery: 95, forgettingRisk: 'Low', prereqs: [], dependents: ['c2', 'c3'] },
  { id: 'c2', name: 'Matrix Transformations', domain: 'Linear Algebra', status: 'mastered', mastery: 91, forgettingRisk: 'Low', prereqs: ['c1'], dependents: ['c3', 'c4'] },
  { id: 'c3', name: 'Determinants & Inverses', domain: 'Linear Algebra', status: 'mastered', mastery: 89, forgettingRisk: 'Low', prereqs: ['c1', 'c2'], dependents: ['c5'] },
  { id: 'c4', name: 'Eigenvalues & Diagonalization', domain: 'Linear Algebra', status: 'blocking', mastery: 52, forgettingRisk: 'High', prereqs: ['c2'], dependents: ['c6', 'c7', 'c8'] },
  { id: 'c5', name: 'System of Linear Equations', domain: 'Linear Algebra', status: 'learning', mastery: 78, forgettingRisk: 'Moderate', prereqs: ['c3'], dependents: ['c6'] },
  { id: 'c6', name: 'Principal Component Analysis (PCA)', domain: 'Machine Learning', status: 'at_risk', mastery: 40, forgettingRisk: 'High', prereqs: ['c4', 'c5'], dependents: ['c9'] },
  { id: 'c7', name: 'Singular Value Decomposition (SVD)', domain: 'Machine Learning', status: 'at_risk', mastery: 35, forgettingRisk: 'High', prereqs: ['c4'], dependents: ['c10'] },
  { id: 'c8', name: 'Graph Spectral Clustering', domain: 'Machine Learning', status: 'at_risk', mastery: 30, forgettingRisk: 'High', prereqs: ['c4'], dependents: ['c11'] },
  { id: 'c9', name: 'Dimensionality Reduction Pipeline', domain: 'Applied AI', status: 'recommended', mastery: 0, forgettingRisk: 'None', prereqs: ['c6'], dependents: [] },
  { id: 'c10', name: 'Latent Semantic Analysis (NLP)', domain: 'Applied AI', status: 'recommended', mastery: 0, forgettingRisk: 'None', prereqs: ['c7'], dependents: [] },
  { id: 'c11', name: 'Graph Convolutional Networks (GCN)', domain: 'Deep Learning', status: 'recommended', mastery: 0, forgettingRisk: 'None', prereqs: ['c8'], dependents: [] },
  { id: 'c12', name: 'Gradient Descent Optimization', domain: 'Calculus & ML', status: 'mastered', mastery: 94, forgettingRisk: 'Low', prereqs: [], dependents: ['c13'] },
  { id: 'c13', name: 'Backpropagation in Neural Nets', domain: 'Deep Learning', status: 'learning', mastery: 72, forgettingRisk: 'Moderate', prereqs: ['c12'], dependents: ['c11'] }
];

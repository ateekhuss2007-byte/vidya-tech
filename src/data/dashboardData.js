/**
 * VIDYA AI - Centralized Robust Dashboard Data Model
 * 
 * Provides structured, typed, and resilient data with safe fallbacks
 * for the student cognitive dashboard and learning intelligence engine.
 */

export const defaultDashboardData = {
  user: {
    name: 'Scholar Student',
    firstName: 'Scholar',
    greeting: 'Good morning',
    streak: 12,
    level: 'Cognitive Learner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'scholar@vidya.ai',
    examTarget: 'B.Tech 3rd Year CSE & GATE 2027'
  },
  aiStatus: {
    state: 'synced',
    label: 'Session Synced',
    lastSyncTime: 'Just now',
    latencyMs: 14,
    modelVersion: 'Cognitive-Twin-v2.4'
  },
  learningMetrics: {
    prerequisiteReadiness: {
      value: 87,
      growth: '+4.2% this week',
      isPositive: true,
      subtext: 'High focus window (42m remaining)'
    },
    predictedRank: {
      value: 'AIR 1,420',
      target: 'Top 500',
      percentile: '99.12 %ile',
      growth: '+210 Ranks this week',
      isPositive: true,
      subtext: 'Target: Top 500 in GATE 2027'
    },
    memoryRetention: {
      value: 92.4,
      halfLifeDays: 18,
      growth: '+4.1% stability',
      isPositive: true,
      subtext: '18-day half-life (0 backlogs at velocity)'
    },
    studyVelocity: {
      value: '1.8x',
      growth: '+18% acceleration',
      isPositive: true,
      subtext: 'Ahead of typical cohort preparation speed'
    },
    knowledgeCoverage: {
      value: 74,
      conceptsMastered: 143,
      totalConcepts: 192,
      subtext: '143 of 192 core curriculum concepts mastered'
    }
  },
  nextBestAction: {
    id: 'nba-01',
    category: 'AI RECOMMENDATION',
    badge: 'High-Impact Fix',
    title: 'Your highest-impact improvement: Boolean Algebra',
    topic: 'Boolean Algebra',
    subject: 'Digital Electronics',
    currentMastery: 58,
    estimatedGain: '+8.4%',
    actionLabel: 'Launch 10-Q Fix Drill',
    targetTab: 'mockTests',
    description: 'Resolving prerequisite Node #c4 (Boolean Simplification) immediately unblocks Combinational Circuits and Karnaugh Map derivations.'
  },
  weakTopics: [
    {
      id: 'wt-1',
      subject: 'Digital Electronics',
      topic: 'Combinational Circuits',
      mastery: 58,
      status: 'critical', // below 60%
      unblocks: 'Multiplexers & Decoders',
      targetTab: 'conceptGraph'
    },
    {
      id: 'wt-2',
      subject: 'Mathematics',
      topic: 'Boolean Algebra',
      mastery: 61,
      status: 'moderate', // 60-79%
      unblocks: 'Logic Gate Minimization',
      targetTab: 'conceptGraph'
    },
    {
      id: 'wt-3',
      subject: 'Computer Science',
      topic: 'Data Structures (AVL Rotations)',
      mastery: 89,
      status: 'strong', // 80-100%
      unblocks: 'B-Trees & Indexing',
      targetTab: 'studyHub'
    },
    {
      id: 'wt-4',
      subject: 'Computer Networks',
      topic: 'Subnetting & CIDR',
      mastery: 72,
      status: 'moderate',
      unblocks: 'Routing Protocols (OSPF/BGP)',
      targetTab: 'mockTests'
    }
  ],
  todayStudyPlan: {
    totalTime: '1 hr 45 min',
    totalItems: 4,
    items: [
      {
        id: 'sp-1',
        step: 1,
        title: 'Boolean Algebra Revision',
        duration: '25 min',
        type: 'Revision',
        description: 'Fixes the gap identified by Diagnostic Agent before moving ahead.',
        targetTab: 'conceptGraph'
      },
      {
        id: 'sp-2',
        step: 2,
        title: 'Combinational Circuits',
        duration: '45 min',
        type: 'Concept Study',
        description: 'Learn adder/subtractor logic and multiplexer trees with interactive diagrams.',
        targetTab: 'studyHub'
      },
      {
        id: 'sp-3',
        step: 3,
        title: '10 Question Fix Drill',
        duration: '20 min',
        type: 'Practice Drill',
        description: 'Targeted high-yield numericals with intermediate step-marking rubric.',
        targetTab: 'mockTests'
      },
      {
        id: 'sp-4',
        step: 4,
        title: 'Active Recall Review',
        duration: '15 min',
        type: 'Recall Interval',
        description: 'Scheduled by Memory Twin to prevent forgetting (Ebbinghaus curve).',
        targetTab: 'digitalTwin'
      }
    ]
  },
  learningActivity: [
    { day: 'Mon', hours: 2.5, accuracy: 84, concepts: 6 },
    { day: 'Tue', hours: 3.2, accuracy: 89, concepts: 8 },
    { day: 'Wed', hours: 1.8, accuracy: 82, concepts: 4 },
    { day: 'Thu', hours: 4.0, accuracy: 91, concepts: 10 },
    { day: 'Fri', hours: 2.8, accuracy: 88, concepts: 7 },
    { day: 'Sat', hours: 3.5, accuracy: 94, concepts: 9 },
    { day: 'Sun', hours: 2.0, accuracy: 86, concepts: 5 }
  ],
  upcomingExams: [
    {
      id: 'ue-1',
      name: 'MAKAUT Semester Exam',
      daysRemaining: 21,
      targetScore: '85%+',
      pattern: '70-Mark End Semester'
    },
    {
      id: 'ue-2',
      name: 'GATE 2027 CSE Mock Series',
      daysRemaining: 48,
      targetScore: 'Top 500 AIR',
      pattern: '100-Mark IIT Madras Pattern'
    }
  ],
  recentActivity: [
    {
      id: 'act-1',
      type: 'mock',
      title: 'Mock Test Completed',
      subtitle: 'MAKAUT 70-Mark End Semester Paper',
      score: '88/100',
      time: '2 hours ago',
      status: 'Passed'
    },
    {
      id: 'act-2',
      type: 'flashcards',
      title: 'Flashcards Reviewed',
      subtitle: 'Digital Electronics & Discrete Math SM-2',
      score: '96% Recall',
      time: '4 hours ago',
      status: 'Synced'
    },
    {
      id: 'act-3',
      type: 'doubt',
      title: 'Doubt Solved',
      subtitle: '5-Variable K-Map Minimization via OCR',
      score: 'Step Verified',
      time: 'Yesterday',
      status: 'Resolved'
    },
    {
      id: 'act-4',
      type: 'focus',
      title: 'Focus Session Completed',
      subtitle: '25-Min Alpha Waves (100% On-Task)',
      score: '100% Focus',
      time: 'Yesterday',
      status: 'Logged'
    }
  ],
  aiInsight: {
    quote: 'Your accuracy drops after approximately 42 minutes of continuous problem solving. A 5-minute reset before starting quantitative sections may improve your expected accuracy by up to +6.8%.',
    recommendation: 'Take a 5-minute alpha wave break between Algebra and Circuits.',
    actionLabel: 'View Analysis',
    targetTab: 'focusRoom'
  }
};

/**
 * Fetches dashboard data safely with optional async simulated loading
 * and graceful fallback.
 */
export const fetchDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(defaultDashboardData);
    }, 150);
  });
};

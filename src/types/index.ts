export * from './verification';

export type ExamStream = 'btech' | 'cbse12' | 'ssc';

export type PlanStatus = 'completed' | 'in_progress' | 'upcoming' | 'missed' | 'revision';

export type TaskType = 'theory' | 'numerical' | 'practice' | 'revision' | 'mock_test' | 'viva_prep';

export type AppTab = 'landing' | 'roadmap' | 'testEngine' | 'doubtSolver' | 'collegeHub' | 'analytics' | 'visualBuilder';

export interface ExamGoal {
  id: string;
  stream: ExamStream;
  title: string;
  subtitle: string;
  targetExamDate: string;
  daysRemaining: number;
  totalChapters: number;
  syllabusCoveredPercentage: number;
  currentStreak: number;
  dailyHoursTarget: number;
  iconName: string;
  streamBadge: string;
}

export interface TopicItem {
  id: string;
  name: string;
  completed: boolean;
}

export interface DayPlan {
  dayNumber: number;
  dateStr: string;
  status: PlanStatus;
  title: string;
  subject: string;
  chapterId: string;
  chapterName: string;
  topics: TopicItem[];
  durationMinutes: number;
  type: TaskType;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  weightageScore: number; // e.g. 18% weightage
  isAutoInsertedRevision?: boolean;
  notes?: string;
}

export interface Chapter {
  id: string;
  name: string;
  subject: string;
  stream: ExamStream;
  weightagePercentage: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estHours: number;
  subtopics: string[];
  pyqOccurrenceCount: number;
  passingImpactScore: number; // 1-100
}

export interface TestQuestion {
  id: string;
  stream: ExamStream;
  subject: string;
  topic: string;
  question: string;
  codeSnippet?: string;
  diagramSvg?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  stepByStepSolution?: string[];
  marks: number;
  negativeMarks: number; // e.g. 0.25 or 0.33
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pyqTag?: string; // e.g. "MAKAUT 2023" or "CBSE 2022" or "SSC CGL 2024 Tier 1"
}

export interface TestSubmission {
  testId: string;
  stream: ExamStream;
  title: string;
  timestamp: string;
  totalQuestions: number;
  score: number;
  maxMarks: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  accuracy: number;
  timeSpentSeconds: number;
  userAnswers: { [questionId: string]: number }; // questionId -> optionIndex
  weakTopicsIdentified: string[];
}

export interface DoubtCase {
  id: string;
  stream: ExamStream;
  subject: string;
  title: string;
  problemStatement: string;
  tag: string;
  codeOrMath?: string;
  aiExplanation: {
    coreConcept: string;
    keyFormulaOrRule: string;
    stepByStep: { stepNumber: number; label: string; text: string; subDetail?: string }[];
    commonMistakeToAvoid: string;
    proExamTip: string;
  };
}

export interface LabVivaItem {
  id: string;
  subject: string;
  topic: string;
  question: string;
  modelAnswer: string;
  keywordsExpected: string[];
  examinerFollowUp: string;
  difficulty: 'Basic Viva' | 'Standard Viva' | 'Tough / Distinction';
}

export interface PyqHeatmapItem {
  topic: string;
  subject: string;
  stream: ExamStream;
  frequency: number; // e.g. 92% of past 5 years
  averageMarks: number;
  recurrenceTag: 'Repeated Every Year' | 'High Frequency' | 'Moderate' | 'Low Yield';
  expectedQuestionTypes: string[];
}

export interface EmergencyCramItem {
  id: string;
  subject: string;
  topic: string;
  hoursNeeded: number;
  assuredMarks: number;
  summaryCheatSheet: string;
  top3Pyqs: string[];
}

/**
 * VIDYA AI — Pan-India University Data Accuracy & Source Verification Framework
 * Problem Statement: SIH26043 | Ministry of Education
 * 
 * Strict, auditable, source-verified type definitions to guarantee:
 * NO FABRICATED DATA. NO GUESSED DATA. NO UNSOURCED DATA. NO FAKE PYQs.
 */

export type VerificationStatus =
  | 'VERIFIED'
  | 'PARTIALLY_VERIFIED'
  | 'UNVERIFIED'
  | 'NOT_AVAILABLE'
  | 'DEMO'
  | 'AI_DERIVED';

export type SourceType =
  | 'OFFICIAL_UNIVERSITY'
  | 'OFFICIAL_GOVERNMENT'
  | 'OFFICIAL_DEPARTMENT'
  | 'OFFICIAL_EXAM_PORTAL'
  | 'OFFICIAL_PDF'
  | 'TRUSTED_SECONDARY'
  | 'COMMUNITY'
  | 'USER_UPLOADED'
  | 'DEMO'
  | 'AI_DERIVED';

export interface SourceMetadata {
  sourceType: SourceType;
  sourceName?: string;
  sourceUrl?: string;
  sourceDocument?: string;
  documentTitle?: string;
  academicYear?: string;
  regulation?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  isAiDerived?: boolean;
}

/**
 * Mandatory Academic Version Identifier:
 * University + Regulation/Scheme + Academic Year + Semester + Branch + Course Code
 */
export interface AcademicVersionIdentifier {
  universityId: string;
  regulationOrScheme: string;
  academicYear?: string;
  semester?: number | string;
  branch?: string;
  courseCode?: string;
}

/**
 * Strict Previous Year Question Model with Source Verification
 */
export interface VerifiedPreviousYearQuestion {
  id: string;
  universityId: string;
  courseId?: string;
  courseCode?: string;
  examYear: string;
  examSession?: 'Winter' | 'Summer' | 'Odd Sem' | 'Even Sem' | 'Annual' | 'Supplementary';
  questionNumber?: string;
  questionText: string;
  marks?: number;
  section?: string;
  moduleId?: string;
  topicId?: string;
  microTopicId?: string;
  source: SourceMetadata;
  isVerbatimArchiveScan: boolean;
}

/**
 * Faculty Verification & Metric Authenticity Metadata
 */
export interface FacultyVerificationMetadata {
  isSimulatedMetrics: boolean;
  institutionVerificationSource?: string;
  profileUrl?: string;
  verificationStatus: VerificationStatus;
  notes?: string;
}

/**
 * Visual metadata config for UI indicators
 */
export interface VerificationBadgeConfig {
  label: string;
  shortLabel: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  description: string;
}

export const VERIFICATION_BADGE_CONFIGS: Record<VerificationStatus, VerificationBadgeConfig> = {
  VERIFIED: {
    label: 'Officially Verified',
    shortLabel: 'Verified',
    icon: '✓',
    colorClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/30',
    description: 'Directly sourced and validated against official university publications, gazettes, or curriculum PDFs.'
  },
  PARTIALLY_VERIFIED: {
    label: 'Partially Verified',
    shortLabel: 'Partial',
    icon: '◐',
    colorClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10',
    borderClass: 'border-amber-500/30',
    description: 'Basic metadata confirmed via institutional portals; specific section details or metrics awaiting final audit.'
  },
  UNVERIFIED: {
    label: 'Unverified / Community',
    shortLabel: 'Unverified',
    icon: '?',
    colorClass: 'text-orange-400',
    bgClass: 'bg-orange-500/10',
    borderClass: 'border-orange-500/30',
    description: 'Sourced from secondary educational repositories or community archives; not yet cross-verified with official gazettes.'
  },
  NOT_AVAILABLE: {
    label: 'Data Not Available',
    shortLabel: 'N/A',
    icon: '—',
    colorClass: 'text-slate-400',
    bgClass: 'bg-slate-800/40',
    borderClass: 'border-slate-700/40',
    description: 'No verified official documentation exists yet. Not guessed or hallucinated.'
  },
  DEMO: {
    label: 'Simulated Demo Data',
    shortLabel: 'Demo Data',
    icon: '⚠',
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-500/10',
    borderClass: 'border-purple-500/30',
    description: 'Simulated UI demonstration data. Does not represent certified real-world student outcome figures.'
  },
  AI_DERIVED: {
    label: 'AI-Derived Pedagogical Decomposition',
    shortLabel: 'AI-Derived',
    icon: '⚡',
    colorClass: 'text-purple-300',
    bgClass: 'bg-purple-500/10',
    borderClass: 'border-purple-500/30',
    description: 'Logically decomposed from official university syllabus topics for micro-remediation (SIH26043). Not claimed as verbatim university text.'
  }
};

/**
 * Field-level provenance reference to guarantee every factual property
 * is traceable to an official document or portal.
 */
export interface FieldProvenance<T = any> {
  value: T;
  sourceUrl: string;
  sourceName: string;
  verifiedAt: string;
  verificationStatus: VerificationStatus;
  notes?: string;
}

/**
 * Pan-India University Master Registry Schema (Prompt 2 Compliant)
 */
export interface VerifiedUniversityRecord {
  id: string;
  officialName: string;
  name: string; // Compatibility alias
  shortName: string;
  state: string;
  city: string;
  headquarters?: string;
  authorityType: 'state_technical' | 'national_importance' | 'private_deemed' | 'state_autonomous';
  authorityLabel: string;
  institutionalStatus: string;
  officialWebsite: string;
  establishedYear: number;
  autonomous: boolean;
  affiliatedCollegesCount: number | null;
  affiliatingCollegesCount?: number | null; // Compatibility alias
  affiliatedCollegesCountAsOf?: string | null;
  gradingSystem: string | null;
  semesterSystem: string | null;
  regulationCode: string | null;
  blueprintPattern: string | null;
  icon: string;
  popularBranches: string[];
  description: string;
  isPopular?: boolean;
  source: SourceMetadata;
  fieldSources?: Record<string, FieldProvenance>;
  isDemo?: boolean;
}

/**
 * ---------------------------------------------------------------------------
 * OFFICIAL SYLLABUS & CURRICULUM EXTRACTION SCHEMA (PROMPT 3)
 * ---------------------------------------------------------------------------
 */

/**
 * Micro-topic decomposition strictly separating official wording from AI breakdown
 */
export interface VerifiedMicroTopic {
  id: string;
  name: string;
  sourceType: 'OFFICIAL' | 'AI_DERIVED';
  derivedFromOfficialTopic: string;
  verificationStatus: VerificationStatus;
}

/**
 * Atomic topic extracted directly from official syllabus module/unit
 */
export interface VerifiedSyllabusTopic {
  topicId: string;
  officialTopic: string;
  normalizedTopic?: string;
  microTopics: VerifiedMicroTopic[];
}

/**
 * Official syllabus module or unit (preserves original terminology: Unit, Module, Section)
 */
export interface VerifiedSyllabusModule {
  moduleNumber: number;
  officialTitle: string; // e.g. "Unit I: Linear Data Structures" or "Module 1: Pointers"
  normalizedTitle?: string;
  hours?: number | null;
  weightagePercent?: number | null;
  topics: VerifiedSyllabusTopic[];
  keyFormulasOrDerivations?: string[];
  sourcePage?: number | null;
}

/**
 * Course objective directly extracted from official syllabus
 */
export interface VerifiedCourseObjective {
  id?: string;
  text: string;
  sourceType: 'OFFICIAL' | 'AI_DERIVED';
}

/**
 * Official Course Outcome (CO1, CO2, etc.)
 */
export interface VerifiedCourseOutcome {
  code: string; // e.g. "CO1", "CO2"
  text: string;
  sourceType: 'OFFICIAL' | 'AI_DERIVED';
}

/**
 * Authoritative textbook or reference citation from official syllabus
 */
export interface VerifiedBookReference {
  title: string;
  author?: string;
  publisher?: string;
  editionYear?: string;
  sourceType: 'OFFICIAL';
}

/**
 * Course-level verified syllabus record with complete academic identity & provenance
 */
export interface VerifiedSyllabusCourse {
  id: string; // Composite unique key: `${universityId}-${regulationId}-${branch}-${semester}-${courseCode}`
  universityId: string;
  regulationId: string;
  regulationName: string;
  academicYear: string;
  degree: string; // e.g. "B.Tech" or "B.E."
  branch: string; // e.g. "Computer Science and Engineering"
  branchCode?: string; // "CSE"
  semester: number;

  courseCode: string;
  courseTitle: string;
  normalizedTitle?: string;

  courseType: 'Theory' | 'Practical' | 'Laboratory' | 'Project' | 'Professional Elective' | 'Open Elective' | 'Mandatory Non-Credit';
  category?: string;

  credits: number | null;
  contactHours?: {
    lecture: number | null;
    tutorial: number | null;
    practical: number | null;
    total?: number | null;
  };

  evaluationScheme?: {
    internalMarks: number | null;
    externalMarks: number | null;
    totalMarks: number | null;
  };

  courseObjectives: VerifiedCourseObjective[];
  courseOutcomes: VerifiedCourseOutcome[];
  modules: VerifiedSyllabusModule[];
  prerequisites: string[];
  textbooks: VerifiedBookReference[];
  referenceBooks?: VerifiedBookReference[];

  source: SourceMetadata;
  extractionConfidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  verificationStatus: VerificationStatus;
}

/**
 * Complete verified curriculum collection for a university & regulation
 */
export interface VerifiedUniversityCurriculum {
  universityId: string;
  universityName: string;
  regulationId: string;
  regulationName: string;
  academicYear: string;
  degree: string;
  branch: string;
  status: 'CURRENT' | 'HISTORICAL' | 'TRANSITIONAL' | 'UNKNOWN';
  courses: VerifiedSyllabusCourse[];
  source: SourceMetadata;
  verificationStatus: VerificationStatus;
}


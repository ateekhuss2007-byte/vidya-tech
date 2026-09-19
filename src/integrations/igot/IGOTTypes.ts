/**
 * ============================================================================
 * VIDYA AI — SIH26101: iGOT Karmayogi Integration Types
 * ============================================================================
 * Architectural boundary for Mission Karmayogi / iGOT competency-based learning.
 * Problem Statement: SIH26101 | Ministry of Statistics & Programme Implementation (MoSPI)
 * Target Cadre: Indian Statistical Service (ISS) & Subordinate Statistical Service (SSS)
 * ============================================================================
 */

import { VerificationStatus } from '../../types/verification';

export type CompetencyLevel = 1 | 2 | 3 | 4 | 5; // Level 1 (Basic) to Level 5 (Expert)

export type IGOTIntegrationMode = 'LIVE' | 'SANDBOX' | 'MOCK' | 'NOT_CONFIGURED';

export interface IGOTCompetency {
  id: string;
  code: string;
  name: string;
  domain: 'Statistical Methods' | 'Public Administration' | 'Data Analytics' | 'Governance' | 'Domain Economics';
  description: string;
  targetLevel: CompetencyLevel;
  currentLevel: CompetencyLevel;
  verificationStatus: VerificationStatus;
}

export interface IGOTCompetencyGap {
  competencyId: string;
  code: string;
  name: string;
  domain: string;
  currentLevel: CompetencyLevel;
  targetLevel: CompetencyLevel;
  gapLevels: number; // targetLevel - currentLevel
  severity: 'CRITICAL' | 'MODERATE' | 'MINOR';
}

export interface IGOTLearnerProfile {
  id: string;
  karmayogiId: string;
  fullName: string;
  cadreOrService: string; // e.g. 'Indian Statistical Service (ISS)', 'Subordinate Statistical Service (SSS)'
  designation: string;
  ministry: string; // 'Ministry of Statistics and Programme Implementation (MoSPI)'
  department: string;
  competencyProfile: {
    competencies: IGOTCompetency[];
    lastAssessedDate?: string;
  };
  isMockData: boolean;
  verificationStatus: VerificationStatus;
}

export interface IGOTCourse {
  id: string;
  externalId: string;
  courseCode: string;
  title: string;
  description: string;
  competenciesCovered: string[]; // Competency IDs or names
  topicIds?: string[];
  targetCadre?: string[];
  duration: string; // e.g. '3 Hours'
  durationMinutes: number;
  language: string; // 'English' | 'Hindi'
  provider: string; // e.g. 'National Statistical Systems Training Academy (NSSTA)', 'iGOT Official'
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  url: string;
  source: 'IGOT_OFFICIAL' | 'VIDYA_RECOMMENDED';
  isPublishedOnIGOT: boolean;
  verificationStatus: VerificationStatus;

  // Explainability Metadata (Mandatory SIH26101 Requirement)
  whyThisCourse?: string;
  competencyGap?: string;
  mappingSource?: 'AI_DERIVED' | 'OFFICIAL_CURRICULUM';
}

export interface IGOTEnrollment {
  id: string;
  learnerId: string;
  courseId: string;
  enrolledAt: string;
  status: 'enrolled' | 'in_progress' | 'completed';
  progressPercentage: number;
  completedAt?: string;
  certificateId?: string;
  verificationStatus: VerificationStatus;
}

export interface IGOTAssessmentResult {
  assessmentId: string;
  learnerId: string;
  courseId?: string;
  competencyId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  evaluatedAt: string;
  newCompetencyLevel?: CompetencyLevel;
  verificationStatus: VerificationStatus;
}

export interface IGOTCourseSearchParams {
  competencyIds?: string[];
  keyword?: string;
  domain?: string;
  level?: 'Foundational' | 'Intermediate' | 'Advanced';
}

export interface IGOTIntegrationStatus {
  mode: IGOTIntegrationMode;
  isConnected: boolean;
  provenanceMessage: string;
  lastSyncTimestamp?: string;
}

export interface IGOTHealthCheck {
  configuration: boolean;
  authentication: boolean;
  courseApi: 'OK' | 'FAILED' | 'NOT_AVAILABLE';
  progressApi: 'OK' | 'FAILED' | 'NOT_AVAILABLE';
  completionApi: 'OK' | 'FAILED' | 'NOT_AVAILABLE';
  lastSyncTimestamp?: string;
  mode: IGOTIntegrationMode;
}

export interface IGOTIntegrationAuditLog {
  id: string;
  timestamp: string;
  operation: string;
  status: 'SUCCESS' | 'ERROR' | 'FALLBACK';
  provider: 'IGOT_KARMAYOGI';
  externalResourceId?: string;
  requestId: string;
  latencyMs: number;
  errorCode?: string | null;
}

export interface IGOTQuizQuestion {
  id: string;
  competencyId: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

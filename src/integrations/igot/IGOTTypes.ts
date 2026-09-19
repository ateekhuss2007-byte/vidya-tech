/**
 * ============================================================================
 * iGOT Karmayogi Integration Types
 * ============================================================================
 * Architectural boundary for Mission Karmayogi / iGOT competency-based learning.
 * Problem Statement: SIH26101 | Ministry of Statistics & Programme Implementation (MoSPI)
 * ============================================================================
 */

import { VerificationStatus } from '../../types/verification';

export type CompetencyLevel = 1 | 2 | 3 | 4 | 5; // Level 1 (Basic) to Level 5 (Expert)

export interface IGOTCompetency {
  id: string;
  code: string;
  name: string;
  domain: 'Statistical Methods' | 'Public Administration' | 'Data Analytics' | 'Governance' | 'Domain Economics';
  description: string;
  targetLevel: CompetencyLevel;
  currentLevel?: CompetencyLevel;
  verificationStatus: VerificationStatus;
}

export interface IGOTLearnerProfile {
  id: string;
  karmayogiId: string;
  fullName: string;
  cadreOrService: string; // e.g., 'Indian Statistical Service (ISS)', 'Subordinate Statistical Service (SSS)'
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
  courseCode: string;
  title: string;
  description: string;
  competenciesCovered: string[]; // Competency IDs or names
  targetCadre?: string[];
  durationMinutes: number;
  provider: string; // e.g., 'National Statistical Systems Training Academy (NSSTA)', 'iGOT Official'
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  courseUrl: string;
  isPublishedOnIGOT: boolean;
  verificationStatus: VerificationStatus;
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
  verificationStatus: VerificationStatus;
}

export interface IGOTCourseSearchParams {
  competencyIds?: string[];
  keyword?: string;
  domain?: string;
  level?: 'Foundational' | 'Intermediate' | 'Advanced';
}

export interface IGOTIntegrationStatus {
  mode: 'MOCK' | 'SANDBOX' | 'LIVE' | 'NOT_CONFIGURED';
  isConnected: boolean;
  provenanceMessage: string;
  lastSyncTimestamp?: string;
}

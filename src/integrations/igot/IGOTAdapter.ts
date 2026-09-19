/**
 * ============================================================================
 * VIDYA AI — SIH26101: iGOT Karmayogi Adapter Interface
 * ============================================================================
 * Provider-agnostic abstraction for iGOT Karmayogi / Sunbird interactions.
 * ============================================================================
 */

import {
  IGOTLearnerProfile,
  IGOTCourse,
  IGOTEnrollment,
  IGOTAssessmentResult,
  IGOTCourseSearchParams,
  IGOTIntegrationStatus,
  IGOTHealthCheck,
  IGOTIntegrationAuditLog
} from './IGOTTypes';

export interface IIGOTAdapter {
  /**
   * Retrieves the learner profile, cadre metadata, and FRAC competency map
   */
  getLearnerProfile(learnerId: string): Promise<IGOTLearnerProfile | null>;

  /**
   * Searches available iGOT courses mapped to specific competencies or filters
   */
  searchCourses(params: IGOTCourseSearchParams): Promise<IGOTCourse[]>;

  /**
   * Retrieves full details for a specific iGOT course
   */
  getCourseDetails(courseId: string): Promise<IGOTCourse | null>;

  /**
   * Retrieves all course enrollments and progress for a learner
   */
  getLearnerEnrollments(learnerId: string): Promise<IGOTEnrollment[]>;

  /**
   * Enrolls the learner into a recommended iGOT course
   */
  enrollInCourse(learnerId: string, courseId: string): Promise<IGOTEnrollment>;

  /**
   * Syncs competency assessment completion back to the iGOT system
   */
  syncAssessmentResult(result: IGOTAssessmentResult): Promise<boolean>;

  /**
   * Checks current integration status and returns provenance badge
   */
  getIntegrationStatus(): Promise<IGOTIntegrationStatus>;

  /**
   * Performs an internal health check across integration boundaries
   */
  checkHealth(): Promise<IGOTHealthCheck>;

  /**
   * Returns recorded integration audit events
   */
  getAuditLogs(): Promise<IGOTIntegrationAuditLog[]>;
}

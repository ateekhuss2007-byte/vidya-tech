/**
 * ============================================================================
 * iGOT Karmayogi Adapter Interface
 * ============================================================================
 * Provider-agnostic abstraction for iGOT Karmayogi interactions.
 * ============================================================================
 */

import {
  IGOTLearnerProfile,
  IGOTCourse,
  IGOTEnrollment,
  IGOTAssessmentResult,
  IGOTCourseSearchParams,
  IGOTIntegrationStatus
} from './IGOTTypes';

export interface IIGOTAdapter {
  /**
   * Retrieves the learner profile and competency map from iGOT
   */
  getLearnerProfile(learnerId: string): Promise<IGOTLearnerProfile | null>;

  /**
   * Searches available iGOT courses mapped to specific competencies
   */
  searchCourses(params: IGOTCourseSearchParams): Promise<IGOTCourse[]>;

  /**
   * Retrieves details for a specific iGOT course
   */
  getCourseDetails(courseId: string): Promise<IGOTCourse | null>;

  /**
   * Retrieves all course enrollments for a learner
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
   * Checks current integration health and status
   */
  getIntegrationStatus(): Promise<IGOTIntegrationStatus>;
}

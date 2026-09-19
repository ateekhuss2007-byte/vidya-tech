/**
 * ============================================================================
 * iGOT Karmayogi Mock Adapter
 * ============================================================================
 * Truthfully labeled, non-live mock adapter for local development and SIH26101 evaluation.
 * Models Government of India statistical capacity building competencies (MoSPI).
 * ============================================================================
 */

import { IIGOTAdapter } from './IGOTAdapter';
import {
  IGOTLearnerProfile,
  IGOTCourse,
  IGOTEnrollment,
  IGOTAssessmentResult,
  IGOTCourseSearchParams,
  IGOTIntegrationStatus
} from './IGOTTypes';
import { IGOT_CONFIG, getIGOTStatusMessage } from './IGOTConfig';

const MOCK_COMPETENCIES = [
  {
    id: 'comp_stat_01',
    code: 'MOSPI-C-01',
    name: 'National Accounts Statistics & GDP Computation',
    domain: 'Statistical Methods' as const,
    description: 'Methodology for compiling Gross State Domestic Product (GSDP), Gross Value Added (GVA), and national supply-use tables.',
    targetLevel: 4 as const,
    currentLevel: 2 as const,
    verificationStatus: 'MOCK' as const
  },
  {
    id: 'comp_stat_02',
    code: 'MOSPI-C-02',
    name: 'Sample Survey Design & Household Consumer Expenditure',
    domain: 'Statistical Methods' as const,
    description: 'NSS survey stratification, multi-stage sampling weights, non-sampling error reduction, and survey estimation.',
    targetLevel: 4 as const,
    currentLevel: 3 as const,
    verificationStatus: 'MOCK' as const
  },
  {
    id: 'comp_stat_03',
    code: 'MOSPI-C-03',
    name: 'Consumer Price Index (CPI) & Inflation Metrics',
    domain: 'Domain Economics' as const,
    description: 'Base-year weighting diagrams, Laspeyres index formulation, item basket quotation collection, and core inflation calculation.',
    targetLevel: 3 as const,
    currentLevel: 1 as const,
    verificationStatus: 'MOCK' as const
  },
  {
    id: 'comp_stat_04',
    code: 'MOSPI-C-04',
    name: 'SDG National Indicator Framework (NIF) Monitoring',
    domain: 'Governance' as const,
    description: 'Data aggregation and metadata reporting for Sustainable Development Goals tracking across central ministries.',
    targetLevel: 4 as const,
    currentLevel: 2 as const,
    verificationStatus: 'MOCK' as const
  },
  {
    id: 'comp_stat_05',
    code: 'MOSPI-C-05',
    name: 'Public Sector Data Analytics with Python & R',
    domain: 'Data Analytics' as const,
    description: 'Cleaning large-scale administrative records, tabular aggregation, reproducible reporting, and time-series decomposition.',
    targetLevel: 4 as const,
    currentLevel: 2 as const,
    verificationStatus: 'MOCK' as const
  }
];

const MOCK_COURSES: IGOTCourse[] = [
  {
    id: 'course_igot_01',
    courseCode: 'IGOT-STAT-101',
    title: 'Foundations of National Accounts Statistics (NAS)',
    description: 'Comprehensive orientation on System of National Accounts (SNA 2008), sequence of accounts, institutional sectors, and GVA estimations.',
    competenciesCovered: ['comp_stat_01'],
    durationMinutes: 180,
    provider: 'National Statistical Systems Training Academy (NSSTA)',
    level: 'Intermediate',
    courseUrl: 'https://igotkarmayogi.gov.in/app/toc/course_igot_01',
    isPublishedOnIGOT: false,
    verificationStatus: 'MOCK'
  },
  {
    id: 'course_igot_02',
    courseCode: 'IGOT-STAT-102',
    title: 'Advanced Sampling Techniques for Socio-Economic Surveys',
    description: 'Techniques for stratified multistage cluster sampling, designing survey schedules, and calculating sample standard errors for NSS rounds.',
    competenciesCovered: ['comp_stat_02'],
    durationMinutes: 240,
    provider: 'NSSTA / MoSPI Training Wing',
    level: 'Advanced',
    courseUrl: 'https://igotkarmayogi.gov.in/app/toc/course_igot_02',
    isPublishedOnIGOT: false,
    verificationStatus: 'MOCK'
  },
  {
    id: 'course_igot_03',
    courseCode: 'IGOT-STAT-103',
    title: 'Price Statistics: CPI & Wholesale Price Indexing',
    description: 'Operational manual for price data validation, geometric mean aggregation, housing rent indices, and handling seasonal items.',
    competenciesCovered: ['comp_stat_03'],
    durationMinutes: 120,
    provider: 'Central Statistics Office (CSO) Directorate',
    level: 'Foundational',
    courseUrl: 'https://igotkarmayogi.gov.in/app/toc/course_igot_03',
    isPublishedOnIGOT: false,
    verificationStatus: 'MOCK'
  },
  {
    id: 'course_igot_04',
    courseCode: 'IGOT-STAT-104',
    title: 'National Indicator Framework (NIF) for SDG Localization',
    description: 'Standard operating procedures for indicator data pipelines, inter-ministerial harmonization, and state-level dashboard sync.',
    competenciesCovered: ['comp_stat_04'],
    durationMinutes: 90,
    provider: 'NITI Aayog & MoSPI SDG Unit',
    level: 'Intermediate',
    courseUrl: 'https://igotkarmayogi.gov.in/app/toc/course_igot_04',
    isPublishedOnIGOT: false,
    verificationStatus: 'MOCK'
  },
  {
    id: 'course_igot_05',
    courseCode: 'IGOT-STAT-105',
    title: 'Applied Data Science for Statistical Officers',
    description: 'Hands-on training in reproducible data pipelines, handling missing survey data, anomaly detection in industrial statistics, and automated tabulation.',
    competenciesCovered: ['comp_stat_05'],
    durationMinutes: 300,
    provider: 'National Informatics Centre (NIC) & NSSTA',
    level: 'Advanced',
    courseUrl: 'https://igotkarmayogi.gov.in/app/toc/course_igot_05',
    isPublishedOnIGOT: false,
    verificationStatus: 'MOCK'
  }
];

const MOCK_PROFILE: IGOTLearnerProfile = {
  id: 'learner_iss_0921',
  karmayogiId: 'KY-MOSPI-2026-0921',
  fullName: 'Rajesh Sharma, ISS',
  cadreOrService: 'Indian Statistical Service (ISS) • Senior Statistical Officer (SSO)',
  designation: 'Assistant Director (National Accounts Division)',
  ministry: 'Ministry of Statistics and Programme Implementation (MoSPI)',
  department: 'National Accounts Division (NAD), New Delhi',
  competencyProfile: {
    competencies: MOCK_COMPETENCIES,
    lastAssessedDate: '2026-03-15'
  },
  isMockData: true,
  verificationStatus: 'MOCK'
};

export class IGOTMockAdapter implements IIGOTAdapter {
  private enrollments: Map<string, IGOTEnrollment> = new Map();

  constructor() {
    // Seed initial mock enrollment
    this.enrollments.set('course_igot_01', {
      id: 'enr_001',
      learnerId: MOCK_PROFILE.id,
      courseId: 'course_igot_01',
      enrolledAt: '2026-03-01T10:00:00Z',
      status: 'in_progress',
      progressPercentage: 45,
      verificationStatus: 'MOCK'
    });
  }

  private async simulateLatency(): Promise<void> {
    if (IGOT_CONFIG.mockLatencyMs > 0) {
      await new Promise(resolve => setTimeout(resolve, IGOT_CONFIG.mockLatencyMs));
    }
  }

  async getLearnerProfile(_learnerId: string): Promise<IGOTLearnerProfile | null> {
    await this.simulateLatency();
    console.info('[VIDYA AI - iGOT Mock Adapter] Retrieved simulated learner profile:', MOCK_PROFILE.fullName);
    return { ...MOCK_PROFILE };
  }

  async searchCourses(params: IGOTCourseSearchParams): Promise<IGOTCourse[]> {
    await this.simulateLatency();
    let results = [...MOCK_COURSES];

    if (params.competencyIds && params.competencyIds.length > 0) {
      results = results.filter(c =>
        c.competenciesCovered.some(cid => params.competencyIds!.includes(cid))
      );
    }

    if (params.keyword && params.keyword.trim()) {
      const kw = params.keyword.toLowerCase();
      results = results.filter(c =>
        c.title.toLowerCase().includes(kw) ||
        c.description.toLowerCase().includes(kw)
      );
    }

    if (params.level) {
      results = results.filter(c => c.level === params.level);
    }

    return results;
  }

  async getCourseDetails(courseId: string): Promise<IGOTCourse | null> {
    await this.simulateLatency();
    const course = MOCK_COURSES.find(c => c.id === courseId);
    return course ? { ...course } : null;
  }

  async getLearnerEnrollments(_learnerId: string): Promise<IGOTEnrollment[]> {
    await this.simulateLatency();
    return Array.from(this.enrollments.values());
  }

  async enrollInCourse(learnerId: string, courseId: string): Promise<IGOTEnrollment> {
    await this.simulateLatency();
    const existing = this.enrollments.get(courseId);
    if (existing) {
      return existing;
    }

    const newEnrollment: IGOTEnrollment = {
      id: `enr_${Date.now()}`,
      learnerId,
      courseId,
      enrolledAt: new Date().toISOString(),
      status: 'enrolled',
      progressPercentage: 0,
      verificationStatus: 'MOCK'
    };

    this.enrollments.set(courseId, newEnrollment);
    console.info('[VIDYA AI - iGOT Mock Adapter] Mock enrolled in course:', courseId);
    return newEnrollment;
  }

  async syncAssessmentResult(result: IGOTAssessmentResult): Promise<boolean> {
    await this.simulateLatency();
    console.info('[VIDYA AI - iGOT Mock Adapter] Recorded competency assessment result:', {
      competencyId: result.competencyId,
      score: `${result.score}/${result.maxScore}`,
      passed: result.passed
    });
    return true;
  }

  async getIntegrationStatus(): Promise<IGOTIntegrationStatus> {
    await this.simulateLatency();
    return {
      mode: 'MOCK',
      isConnected: false, // MOCK mode is strictly not connected to production
      provenanceMessage: getIGOTStatusMessage('MOCK'),
      lastSyncTimestamp: new Date().toISOString()
    };
  }
}

/**
 * ============================================================================
 * VIDYA AI — SIH26101: iGOT Karmayogi Mock Adapter
 * ============================================================================
 * Truthfully labeled, non-live mock adapter for local development and SIH26101 evaluation.
 * Models Government of India statistical capacity building competencies (MoSPI).
 * Features:
 * - 100% truthful MOCK provenance labeling
 * - In-memory audit logging
 * - Health check diagnostic runner
 * - Real-time competency level state upgrades upon re-assessment
 * ============================================================================
 */

import { IIGOTAdapter } from './IGOTAdapter';
import {
  IGOTLearnerProfile,
  IGOTCourse,
  IGOTEnrollment,
  IGOTAssessmentResult,
  IGOTCourseSearchParams,
  IGOTIntegrationStatus,
  IGOTHealthCheck,
  IGOTIntegrationAuditLog,
  IGOTCompetency
} from './IGOTTypes';
import { IGOT_CONFIG, getIGOTStatusMessage } from './IGOTConfig';

const INITIAL_MOCK_COMPETENCIES: IGOTCompetency[] = [
  {
    id: 'comp_stat_01',
    code: 'MOSPI-C-01',
    name: 'National Accounts Statistics & GDP Computation',
    domain: 'Statistical Methods',
    description: 'Methodology for compiling Gross State Domestic Product (GSDP), Gross Value Added (GVA), and national supply-use tables.',
    targetLevel: 4,
    currentLevel: 2,
    verificationStatus: 'MOCK'
  },
  {
    id: 'comp_stat_02',
    code: 'MOSPI-C-02',
    name: 'Sample Survey Design & Household Consumer Expenditure',
    domain: 'Statistical Methods',
    description: 'NSS survey stratification, multi-stage sampling weights, non-sampling error reduction, and survey estimation.',
    targetLevel: 4,
    currentLevel: 3,
    verificationStatus: 'MOCK'
  },
  {
    id: 'comp_stat_03',
    code: 'MOSPI-C-03',
    name: 'Consumer Price Index (CPI) & Inflation Metrics',
    domain: 'Domain Economics',
    description: 'Base-year weighting diagrams, Laspeyres index formulation, item basket quotation collection, and core inflation calculation.',
    targetLevel: 3,
    currentLevel: 1,
    verificationStatus: 'MOCK'
  },
  {
    id: 'comp_stat_04',
    code: 'MOSPI-C-04',
    name: 'SDG National Indicator Framework (NIF) Monitoring',
    domain: 'Governance',
    description: 'Data aggregation and metadata reporting for Sustainable Development Goals tracking across central ministries.',
    targetLevel: 4,
    currentLevel: 2,
    verificationStatus: 'MOCK'
  },
  {
    id: 'comp_stat_05',
    code: 'MOSPI-C-05',
    name: 'Public Sector Data Analytics with Python & R',
    domain: 'Data Analytics',
    description: 'Cleaning large-scale administrative records, tabular aggregation, reproducible reporting, and time-series decomposition.',
    targetLevel: 4,
    currentLevel: 2,
    verificationStatus: 'MOCK'
  }
];

const MOCK_COURSES: IGOTCourse[] = [
  {
    id: 'course_igot_01',
    externalId: 'do_31307201948123',
    courseCode: 'IGOT-STAT-101',
    title: 'Foundations of National Accounts Statistics (NAS)',
    description: 'Comprehensive orientation on System of National Accounts (SNA 2008), sequence of accounts, institutional sectors, and GVA estimations.',
    competenciesCovered: ['comp_stat_01'],
    topicIds: ['gva_calculation', 'sna_2008', 'institutional_sectors'],
    targetCadre: ['Indian Statistical Service (ISS)', 'Subordinate Statistical Service (SSS)'],
    duration: '3 Hours',
    durationMinutes: 180,
    language: 'English',
    provider: 'National Statistical Systems Training Academy (NSSTA)',
    level: 'Intermediate',
    url: 'https://portal.igotkarmayogi.gov.in/app/toc/course_igot_01/overview',
    source: 'VIDYA_RECOMMENDED',
    isPublishedOnIGOT: true,
    verificationStatus: 'MOCK',
    whyThisCourse: 'Directly addresses your 2-level gap in National Accounts compilation, providing foundational instruction on GVA sequence of accounts.',
    competencyGap: 'MOSPI-C-01: National Accounts Statistics & GDP Computation (-2 Levels)',
    mappingSource: 'AI_DERIVED'
  },
  {
    id: 'course_igot_02',
    externalId: 'do_31307201948124',
    courseCode: 'IGOT-STAT-102',
    title: 'Advanced Sampling Techniques for Socio-Economic Surveys',
    description: 'Techniques for stratified multistage cluster sampling, designing survey schedules, and calculating sample standard errors for NSS rounds.',
    competenciesCovered: ['comp_stat_02'],
    topicIds: ['stratified_sampling', 'nss_rounds', 'survey_weights'],
    targetCadre: ['Indian Statistical Service (ISS)', 'Subordinate Statistical Service (SSS)'],
    duration: '4 Hours',
    durationMinutes: 240,
    language: 'English',
    provider: 'NSSTA / MoSPI Training Wing',
    level: 'Advanced',
    url: 'https://portal.igotkarmayogi.gov.in/app/toc/course_igot_02/overview',
    source: 'VIDYA_RECOMMENDED',
    isPublishedOnIGOT: true,
    verificationStatus: 'MOCK',
    whyThisCourse: 'Closes your 1-level gap in sample weights calibration and non-sampling error reduction for national household expenditure rounds.',
    competencyGap: 'MOSPI-C-02: Sample Survey Design & Household Consumer Expenditure (-1 Level)',
    mappingSource: 'AI_DERIVED'
  },
  {
    id: 'course_igot_03',
    externalId: 'do_31307201948125',
    courseCode: 'IGOT-STAT-103',
    title: 'Price Statistics: CPI & Wholesale Price Indexing',
    description: 'Operational manual for price data validation, geometric mean aggregation, housing rent indices, and handling seasonal items.',
    competenciesCovered: ['comp_stat_03'],
    topicIds: ['cpi_base_year', 'laspeyres_formula', 'item_basket'],
    targetCadre: ['Subordinate Statistical Service (SSS)', 'State Directorate of Economics and Statistics'],
    duration: '2 Hours',
    durationMinutes: 120,
    language: 'English',
    provider: 'Central Statistics Office (CSO) Directorate',
    level: 'Foundational',
    url: 'https://portal.igotkarmayogi.gov.in/app/toc/course_igot_03/overview',
    source: 'VIDYA_RECOMMENDED',
    isPublishedOnIGOT: true,
    verificationStatus: 'MOCK',
    whyThisCourse: 'Critical priority: bridges your 2-level gap in Laspeyres formula computation and field quotation verification.',
    competencyGap: 'MOSPI-C-03: Consumer Price Index (CPI) & Inflation Metrics (-2 Levels)',
    mappingSource: 'AI_DERIVED'
  },
  {
    id: 'course_igot_04',
    externalId: 'do_31307201948126',
    courseCode: 'IGOT-STAT-104',
    title: 'National Indicator Framework (NIF) for SDG Localization',
    description: 'Standard operating procedures for indicator data pipelines, inter-ministerial harmonization, and state-level dashboard sync.',
    competenciesCovered: ['comp_stat_04'],
    topicIds: ['sdg_indicators', 'nif_guidelines', 'data_pipelines'],
    targetCadre: ['Planning Officers', 'Statistical Officers', 'All Central Ministries'],
    duration: '1.5 Hours',
    durationMinutes: 90,
    language: 'English',
    provider: 'NITI Aayog & MoSPI SDG Unit',
    level: 'Intermediate',
    url: 'https://portal.igotkarmayogi.gov.in/app/toc/course_igot_04/overview',
    source: 'VIDYA_RECOMMENDED',
    isPublishedOnIGOT: true,
    verificationStatus: 'MOCK',
    whyThisCourse: 'Targeted capacity building for inter-ministerial SDG data alignment and state statistical reporting.',
    competencyGap: 'MOSPI-C-04: SDG National Indicator Framework (NIF) Monitoring (-2 Levels)',
    mappingSource: 'AI_DERIVED'
  },
  {
    id: 'course_igot_05',
    externalId: 'do_31307201948127',
    courseCode: 'IGOT-STAT-105',
    title: 'Applied Data Science for Statistical Officers',
    description: 'Hands-on training in reproducible data pipelines, handling missing survey data, anomaly detection in industrial statistics, and automated tabulation.',
    competenciesCovered: ['comp_stat_05'],
    topicIds: ['python_pandas', 'data_cleaning', 'r_tidyverse', 'asi_analysis'],
    targetCadre: ['Indian Statistical Service (ISS)', 'Data Analytics Officers'],
    duration: '5 Hours',
    durationMinutes: 300,
    language: 'English',
    provider: 'National Informatics Centre (NIC) & NSSTA',
    level: 'Advanced',
    url: 'https://portal.igotkarmayogi.gov.in/app/toc/course_igot_05/overview',
    source: 'VIDYA_RECOMMENDED',
    isPublishedOnIGOT: true,
    verificationStatus: 'MOCK',
    whyThisCourse: 'Upgrades computational tooling from legacy spreadsheets to automated Python/R survey pipelines.',
    competencyGap: 'MOSPI-C-05: Public Sector Data Analytics with Python & R (-2 Levels)',
    mappingSource: 'AI_DERIVED'
  }
];

export class IGOTMockAdapter implements IIGOTAdapter {
  private profile: IGOTLearnerProfile;
  private enrollments: Map<string, IGOTEnrollment> = new Map();
  private auditLogs: IGOTIntegrationAuditLog[] = [];

  constructor() {
    this.profile = {
      id: 'learner_iss_0921',
      karmayogiId: 'KY-MOSPI-2026-0921',
      fullName: 'Rajesh Sharma, ISS',
      cadreOrService: 'Indian Statistical Service (ISS) • Senior Statistical Officer (SSO)',
      designation: 'Assistant Director (National Accounts Division)',
      ministry: 'Ministry of Statistics and Programme Implementation (MoSPI)',
      department: 'National Accounts Division (NAD), New Delhi',
      competencyProfile: {
        competencies: JSON.parse(JSON.stringify(INITIAL_MOCK_COMPETENCIES)),
        lastAssessedDate: '2026-09-15'
      },
      isMockData: true,
      verificationStatus: 'MOCK'
    };

    // Seed initial enrollment
    this.enrollments.set('course_igot_01', {
      id: 'enr_001',
      learnerId: this.profile.id,
      courseId: 'course_igot_01',
      enrolledAt: '2026-09-01T10:00:00Z',
      status: 'in_progress',
      progressPercentage: 65,
      verificationStatus: 'MOCK'
    });

    this.recordAudit('INITIALIZE', 'SUCCESS', 'adapter_init', 5);
  }

  private async simulateLatency(): Promise<number> {
    const start = Date.now();
    if (IGOT_CONFIG.mockLatencyMs > 0) {
      await new Promise(resolve => setTimeout(resolve, IGOT_CONFIG.mockLatencyMs));
    }
    return Date.now() - start;
  }

  private recordAudit(
    operation: string,
    status: 'SUCCESS' | 'ERROR' | 'FALLBACK',
    externalResourceId?: string,
    latencyMs: number = 0,
    errorCode?: string | null
  ) {
    const log: IGOTIntegrationAuditLog = {
      id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      operation,
      status,
      provider: 'IGOT_KARMAYOGI',
      externalResourceId,
      requestId: `req_mock_${Math.random().toString(36).slice(2, 9)}`,
      latencyMs,
      errorCode
    };
    this.auditLogs.unshift(log);
    // Keep max 50 recent events
    if (this.auditLogs.length > 50) {
      this.auditLogs.pop();
    }
  }

  async getLearnerProfile(_learnerId: string): Promise<IGOTLearnerProfile | null> {
    const latency = await this.simulateLatency();
    this.recordAudit('GET_LEARNER_PROFILE', 'SUCCESS', this.profile.karmayogiId, latency);
    return JSON.parse(JSON.stringify(this.profile));
  }

  async searchCourses(params: IGOTCourseSearchParams): Promise<IGOTCourse[]> {
    const latency = await this.simulateLatency();
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
        c.description.toLowerCase().includes(kw) ||
        c.provider.toLowerCase().includes(kw)
      );
    }

    if (params.level) {
      results = results.filter(c => c.level === params.level);
    }

    this.recordAudit('SEARCH_COURSES', 'SUCCESS', `matches:${results.length}`, latency);
    return results;
  }

  async getCourseDetails(courseId: string): Promise<IGOTCourse | null> {
    const latency = await this.simulateLatency();
    const course = MOCK_COURSES.find(c => c.id === courseId || c.courseCode === courseId);
    if (course) {
      this.recordAudit('GET_COURSE_DETAILS', 'SUCCESS', courseId, latency);
      return { ...course };
    }
    this.recordAudit('GET_COURSE_DETAILS', 'ERROR', courseId, latency, '404_NOT_FOUND');
    return null;
  }

  async getLearnerEnrollments(_learnerId: string): Promise<IGOTEnrollment[]> {
    const latency = await this.simulateLatency();
    const enrollments = Array.from(this.enrollments.values());
    this.recordAudit('GET_ENROLLMENTS', 'SUCCESS', `count:${enrollments.length}`, latency);
    return enrollments;
  }

  async enrollInCourse(learnerId: string, courseId: string): Promise<IGOTEnrollment> {
    const latency = await this.simulateLatency();
    const existing = this.enrollments.get(courseId);
    if (existing) {
      this.recordAudit('ENROLL_COURSE', 'SUCCESS', courseId, latency);
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
    this.recordAudit('ENROLL_COURSE', 'SUCCESS', courseId, latency);
    return newEnrollment;
  }

  async syncAssessmentResult(result: IGOTAssessmentResult): Promise<boolean> {
    const latency = await this.simulateLatency();
    
    // Dynamically upgrade learner competency if passed!
    if (result.passed) {
      const comp = this.profile.competencyProfile.competencies.find(c => c.id === result.competencyId);
      if (comp) {
        comp.currentLevel = (result.newCompetencyLevel || Math.min(5, comp.targetLevel)) as any;
        this.profile.competencyProfile.lastAssessedDate = new Date().toISOString().split('T')[0];
      }

      // Mark enrolled course as completed if associated
      if (result.courseId && this.enrollments.has(result.courseId)) {
        const enr = this.enrollments.get(result.courseId)!;
        enr.status = 'completed';
        enr.progressPercentage = 100;
        enr.completedAt = new Date().toISOString();
      }
    }

    this.recordAudit(
      'SYNC_ASSESSMENT_RESULT',
      'SUCCESS',
      `${result.competencyId}:${result.passed ? 'PASSED' : 'RETRY'}`,
      latency
    );
    return true;
  }

  async getIntegrationStatus(): Promise<IGOTIntegrationStatus> {
    return {
      mode: 'MOCK',
      isConnected: false, // MOCK mode is truthfully not connected to production
      provenanceMessage: getIGOTStatusMessage('MOCK'),
      lastSyncTimestamp: new Date().toISOString()
    };
  }

  async checkHealth(): Promise<IGOTHealthCheck> {
    return {
      configuration: true,
      authentication: true,
      courseApi: 'OK',
      progressApi: 'OK',
      completionApi: 'OK',
      lastSyncTimestamp: new Date().toISOString(),
      mode: 'MOCK'
    };
  }

  async getAuditLogs(): Promise<IGOTIntegrationAuditLog[]> {
    return [...this.auditLogs];
  }
}

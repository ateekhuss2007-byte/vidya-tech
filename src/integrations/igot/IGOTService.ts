/**
 * ============================================================================
 * VIDYA AI — SIH26101: iGOT Karmayogi Adaptive Integration Service
 * ============================================================================
 * High-level orchestration service managing the complete SIH26101 loop:
 *
 * Government Learner Profile
 *          ↓
 * Competency Gap Analysis (FRAC)
 *          ↓
 * Explainable iGOT Course Recommendation
 *          ↓
 * Direct Portal Deep-Link ("Open in iGOT")
 *          ↓
 * Post-Learning Re-Assessment Quiz
 *          ↓
 * Competency Level Upgrade & Dynamic Path Update
 * ============================================================================
 */

import { IIGOTAdapter } from './IGOTAdapter';
import {
  IGOTLearnerProfile,
  IGOTCompetencyGap,
  IGOTCourse,
  IGOTAssessmentResult,
  IGOTIntegrationStatus,
  IGOTHealthCheck,
  IGOTIntegrationAuditLog,
  IGOTQuizQuestion
} from './IGOTTypes';

// Authoritative MoSPI Assessment Question Bank for Post-Learning Verification
const STATISTICAL_QUIZ_BANK: Record<string, IGOTQuizQuestion[]> = {
  comp_stat_01: [
    {
      id: 'q_nas_01',
      competencyId: 'comp_stat_01',
      question: 'Under SNA 2008 and current Indian National Accounts methodology, how is Gross Value Added (GVA) at basic prices computed from Gross Output?',
      options: [
        'GVA at basic prices = Gross Output at basic prices - Intermediate Consumption',
        'GVA at basic prices = GDP at market prices + Product Subsidies - Product Taxes',
        'GVA at basic prices = Net Domestic Product + Consumption of Fixed Capital (CFC)',
        'GVA at basic prices = Gross Value Added at factor cost + Net Indirect Taxes'
      ],
      correctOptionIndex: 0,
      explanation: 'In the System of National Accounts (SNA 2008), GVA at basic prices is defined strictly as Output (valued at basic prices) minus Intermediate Consumption (valued at purchasers prices).'
    },
    {
      id: 'q_nas_02',
      competencyId: 'comp_stat_01',
      question: 'Which institutional sector classification is used in National Accounts to capture unorganized household enterprises?',
      options: [
        'Non-Financial Corporations (S.11)',
        'Financial Corporations (S.12)',
        'Household Sector including NPISH (S.14 / S.15)',
        'General Government Sector (S.13)'
      ],
      correctOptionIndex: 2,
      explanation: 'Unincorporated proprietary and partnership enterprises in India are classified under the Household Sector (S.14) in National Accounts compilation.'
    },
    {
      id: 'q_nas_03',
      competencyId: 'comp_stat_01',
      question: 'How are Product Taxes and Product Subsidies treated when transitioning from GVA at basic prices to GDP at market prices?',
      options: [
        'GDP at market prices = GVA at basic prices + Product Taxes - Product Subsidies',
        'GDP at market prices = GVA at basic prices - Product Taxes + Product Subsidies',
        'GDP at market prices = GVA at factor cost + Non-Product Subsidies',
        'GDP at market prices = GVA at basic prices without any tax adjustment'
      ],
      correctOptionIndex: 0,
      explanation: 'GDP at market prices equals the sum of GVA at basic prices of all institutional sectors plus Product Taxes (GST, customs, excise) minus Product Subsidies (food, fertilizer).'
    }
  ],
  comp_stat_02: [
    {
      id: 'q_sample_01',
      competencyId: 'comp_stat_02',
      question: 'In NSS Household Surveys, what sampling scheme is typically employed for First Stage Units (FSUs)?',
      options: [
        'Simple Random Sampling without Replacement (SRSWOR)',
        'Stratified Multi-Stage Sampling with Probability Proportional to Size (PPSWR)',
        'Snowball Non-Probability Convenience Sampling',
        'Systematic Fixed-Interval Cluster Sampling only'
      ],
      correctOptionIndex: 1,
      explanation: 'NSS surveys use census villages (rural) and urban frame survey (UFS) blocks (urban) as First Stage Units selected with Probability Proportional to Size (PPS) with replacement.'
    },
    {
      id: 'q_sample_02',
      competencyId: 'comp_stat_02',
      question: 'Why are multiplier weights (design weights) calibrated in socio-economic survey estimation?',
      options: [
        'To artificially inflate the sample count to match census figures',
        'To account for unequal selection probabilities and non-response adjustment across sub-strata',
        'To reduce computation time during data entry',
        'To eliminate standard errors from regression estimates'
      ],
      correctOptionIndex: 1,
      explanation: 'Multiplier weights represent the inverse probability of selection at each stage, adjusted for non-response and stratum population totals.'
    }
  ],
  comp_stat_03: [
    {
      id: 'q_cpi_01',
      competencyId: 'comp_stat_03',
      question: 'Which index formula serves as the primary mathematical foundation for the All-India Consumer Price Index (CPI)?',
      options: [
        'Base-weighted Laspeyres Price Index Formula',
        'Current-weighted Paasche Price Index Formula',
        'Fisher Ideal Geometric Mean Index',
        'Simple Unweighted Marshall-Edgeworth Ratio'
      ],
      correctOptionIndex: 0,
      explanation: 'All-India CPI compiled by MoSPI utilizes a modified Laspeyres formula using fixed base-year expenditure shares derived from the Consumer Expenditure Survey.'
    },
    {
      id: 'q_cpi_02',
      competencyId: 'comp_stat_03',
      question: 'What constitutes "Core Inflation" as monitored by statistical and monetary authorities in India?',
      options: [
        'Headline CPI including all food and fuel items',
        'Headline CPI excluding volatile Food and Beverages and Fuel and Light categories',
        'Wholesale Price Index for Primary Articles only',
        'Industrial Workers CPI only'
      ],
      correctOptionIndex: 1,
      explanation: 'Core inflation isolates underlying persistent inflationary pressures by stripping out volatile components, primarily food and energy.'
    }
  ],
  comp_stat_04: [
    {
      id: 'q_sdg_01',
      competencyId: 'comp_stat_04',
      question: 'What is the role of MoSPI regarding the National Indicator Framework (NIF) for SDGs?',
      options: [
        'Executing infrastructure projects across all states',
        'Institutional custodian responsible for developing, harmonizing, and reporting data for 300+ national indicators',
        'Direct monetary disbursement to state welfare boards',
        'Conducting general elections for local governing bodies'
      ],
      correctOptionIndex: 1,
      explanation: 'MoSPI serves as the nodal central authority for developing the National Indicator Framework (NIF) and coordinating periodic metadata and progress reports with NITI Aayog.'
    }
  ],
  comp_stat_05: [
    {
      id: 'q_data_01',
      competencyId: 'comp_stat_05',
      question: 'In automated statistical data pipelines, which method is considered sound for detecting outliers in industrial survey returns (ASI)?',
      options: [
        'Deleting all records that have values above the mean',
        'Computing interquartile range (IQR) fences or robust Mahalanobis distance on normalized ratios',
        'Replacing zero responses with arbitrary constants',
        'Ignoring variance discrepancies across industry codes'
      ],
      correctOptionIndex: 1,
      explanation: 'Robust multivariate outlier detection (such as IQR bounds or Mahalanobis distance) prevents extreme reporting anomalies from distorting sector aggregates without biasing data distributions.'
    }
  ]
};

export class IGOTService {
  private adapter: IIGOTAdapter;

  constructor(adapter: IIGOTAdapter) {
    this.adapter = adapter;
  }

  setAdapter(newAdapter: IIGOTAdapter) {
    this.adapter = newAdapter;
  }

  getAdapter(): IIGOTAdapter {
    return this.adapter;
  }

  async getLearnerProfile(learnerId: string = 'learner_iss_0921'): Promise<IGOTLearnerProfile | null> {
    return this.adapter.getLearnerProfile(learnerId);
  }

  async getCompetencyGaps(learnerId: string = 'learner_iss_0921'): Promise<IGOTCompetencyGap[]> {
    const profile = await this.adapter.getLearnerProfile(learnerId);
    if (!profile || !profile.competencyProfile?.competencies) {
      return [];
    }

    const gaps: IGOTCompetencyGap[] = [];

    for (const comp of profile.competencyProfile.competencies) {
      const diff = comp.targetLevel - comp.currentLevel;
      if (diff > 0) {
        gaps.push({
          competencyId: comp.id,
          code: comp.code,
          name: comp.name,
          domain: comp.domain,
          currentLevel: comp.currentLevel,
          targetLevel: comp.targetLevel,
          gapLevels: diff,
          severity: diff >= 2 ? 'CRITICAL' : diff === 1 ? 'MODERATE' : 'MINOR'
        });
      }
    }

    // Sort by severity (largest gap first)
    return gaps.sort((a, b) => b.gapLevels - a.gapLevels);
  }

  async getPersonalizedRecommendations(learnerId: string = 'learner_iss_0921'): Promise<IGOTCourse[]> {
    const gaps = await this.getCompetencyGaps(learnerId);
    if (gaps.length === 0) {
      // If no gaps, return advanced enrichment modules
      return this.adapter.searchCourses({ level: 'Advanced' });
    }

    const gapIds = gaps.map(g => g.competencyId);
    const courses = await this.adapter.searchCourses({ competencyIds: gapIds });

    // Decorate courses with explainable AI metadata linking them to the learner's specific gap
    return courses.map(course => {
      const matchedGap = gaps.find(g => course.competenciesCovered.includes(g.competencyId));
      return {
        ...course,
        whyThisCourse: matchedGap
          ? `Recommended to close your ${matchedGap.gapLevels}-level gap in ${matchedGap.name}. Curriculum authored by ${course.provider}.`
          : course.whyThisCourse || 'Curated high-yield public administration module.',
        competencyGap: matchedGap
          ? `${matchedGap.code}: ${matchedGap.name} (Requires Level ${matchedGap.targetLevel}, Current Level ${matchedGap.currentLevel})`
          : 'Enrichment Curriculum',
        mappingSource: 'AI_DERIVED' as const
      };
    });
  }

  getQuizQuestionsForCompetency(competencyId: string): IGOTQuizQuestion[] {
    const questions = STATISTICAL_QUIZ_BANK[competencyId];
    if (questions && questions.length > 0) {
      return questions;
    }
    // Fallback generalized evaluation question
    return [
      {
        id: `q_gen_${competencyId}`,
        competencyId,
        question: 'Which institutional principle governs capacity building validation under Mission Karmayogi (FRAC)?',
        options: [
          'Transitioning public administration from Rule-based to Role-based competency frameworks',
          'Eliminating all offline documentation regardless of legal requirements',
          'Restricting training exclusively to senior executive services',
          'Replacing standard operating procedures with unreviewed AI models'
        ],
        correctOptionIndex: 0,
        explanation: 'Mission Karmayogi is explicitly founded on transitioning civil service capacity from a rule-based bureaucracy to a role-based competency model.'
      }
    ];
  }

  async submitReAssessment(
    learnerId: string,
    competencyId: string,
    correctCount: number,
    totalCount: number,
    courseId?: string
  ): Promise<IGOTAssessmentResult> {
    const percentage = Math.round((correctCount / totalCount) * 100);
    const passed = percentage >= 70;

    // Fetch existing profile to compute upgraded level
    const profile = await this.adapter.getLearnerProfile(learnerId);
    const comp = profile?.competencyProfile.competencies.find(c => c.id === competencyId);
    
    // Upgrade level if passed
    const newLevel = passed
      ? ((comp ? Math.min(5, comp.targetLevel) : 4) as any)
      : comp?.currentLevel;

    const result: IGOTAssessmentResult = {
      assessmentId: `asmt_${competencyId}_${Date.now()}`,
      learnerId,
      courseId,
      competencyId,
      score: correctCount,
      maxScore: totalCount,
      percentage,
      passed,
      evaluatedAt: new Date().toISOString(),
      newCompetencyLevel: newLevel,
      verificationStatus: 'MOCK'
    };

    await this.adapter.syncAssessmentResult(result);
    return result;
  }

  async getIntegrationStatus(): Promise<IGOTIntegrationStatus> {
    return this.adapter.getIntegrationStatus();
  }

  async checkHealth(): Promise<IGOTHealthCheck> {
    return this.adapter.checkHealth();
  }

  async getAuditLogs(): Promise<IGOTIntegrationAuditLog[]> {
    return this.adapter.getAuditLogs();
  }
}

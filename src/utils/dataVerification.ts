/**
 * VIDYA AI — Data Accuracy & Source Verification Validator
 * SIH26043 Data Integrity Enforcement Suite
 * 
 * Reusable validation functions to check academic records, source metadata,
 * course codes, PYQ structures, and faculty metrics.
 */

import { 
  SourceMetadata, 
  VerificationStatus, 
  AcademicVersionIdentifier, 
  VerifiedPreviousYearQuestion,
  VerifiedUniversityRecord,
  VerifiedSyllabusCourse,
  VerifiedUniversityCurriculum
} from '../types/verification';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface DatasetAuditSummary {
  datasetName: string;
  totalRecords: number;
  verifiedCount: number;
  partiallyVerifiedCount: number;
  unverifiedCount: number;
  notAvailableCount: number;
  demoCount: number;
  recordsWithErrors: number;
  integrityScorePercent: number;
}

/**
 * Validates whether a URL is syntactically sound and uses http/https
 */
export const isValidHttpUrl = (urlString?: string): boolean => {
  if (!urlString) return false;
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Validates SourceMetadata completeness and consistency
 */
export const validateSourceMetadata = (source?: SourceMetadata): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!source) {
    return {
      isValid: false,
      errors: ['Missing mandatory source metadata block'],
      warnings: []
    };
  }

  const validStatuses: VerificationStatus[] = ['VERIFIED', 'PARTIALLY_VERIFIED', 'UNVERIFIED', 'NOT_AVAILABLE', 'DEMO'];
  if (!validStatuses.includes(source.verificationStatus)) {
    errors.push(`Invalid verification status: '${source.verificationStatus}'`);
  }

  // Official source requires a valid source name or URL
  if (source.sourceType === 'OFFICIAL_UNIVERSITY' || source.sourceType === 'OFFICIAL_GOVERNMENT') {
    if (!source.sourceName && !source.sourceUrl && !source.sourceDocument) {
      errors.push('Official source must state sourceName, sourceUrl, or sourceDocument citation');
    }
    if (source.sourceUrl && !isValidHttpUrl(source.sourceUrl)) {
      errors.push(`Malformed official source URL: '${source.sourceUrl}'`);
    }
  }

  // Verified status must have verifiedAt timestamp and source citation
  if (source.verificationStatus === 'VERIFIED') {
    if (!source.verifiedAt) {
      warnings.push('Record is marked VERIFIED but lacks a verifiedAt timestamp');
    }
    if (source.sourceType === 'DEMO' || source.sourceType === 'COMMUNITY') {
      errors.push(`Contradiction: verificationStatus is VERIFIED but sourceType is '${source.sourceType}'`);
    }
  }

  // Demo status must not be represented as official university
  if (source.verificationStatus === 'DEMO') {
    if (source.sourceType === 'OFFICIAL_UNIVERSITY') {
      warnings.push('Record has sourceType OFFICIAL_UNIVERSITY but verificationStatus is DEMO (simulated sample)');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validates Academic Versioning identity
 */
export const validateAcademicVersion = (version: AcademicVersionIdentifier): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!version.universityId || version.universityId.trim() === '') {
    errors.push('Mandatory universityId is missing or empty');
  }

  if (!version.regulationOrScheme || version.regulationOrScheme.trim() === '') {
    errors.push('Mandatory regulationOrScheme is missing or empty (e.g. R-25, KCS Scheme, 21CS)');
  }

  if (!version.courseCode || version.courseCode.trim() === '') {
    warnings.push('Course code is not specified in version identifier');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validates a Previous Year Question (PYQ) record
 */
export const validatePYQRecord = (pyq: Partial<VerifiedPreviousYearQuestion>): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!pyq.id) errors.push('PYQ id is missing');
  if (!pyq.universityId) errors.push('PYQ universityId is missing');
  if (!pyq.questionText || pyq.questionText.trim().length < 5) {
    errors.push('PYQ questionText is missing or too short to be authentic');
  }
  if (!pyq.examYear) {
    errors.push('PYQ examYear is missing');
  } else {
    const yearNum = parseInt(pyq.examYear, 10);
    if (isNaN(yearNum) || yearNum < 1990 || yearNum > 2030) {
      errors.push(`Impossible examYear: '${pyq.examYear}'`);
    }
  }

  if (pyq.marks !== undefined) {
    if (pyq.marks <= 0 || pyq.marks > 100) {
      errors.push(`Invalid marks allocation: ${pyq.marks}`);
    }
  }

  // Source metadata validation
  const sourceValidation = validateSourceMetadata(pyq.source);
  errors.push(...sourceValidation.errors);
  warnings.push(...sourceValidation.warnings);

  // If marked VERIFIED, it must be supported by an authentic paper
  if (pyq.source?.verificationStatus === 'VERIFIED' && !pyq.isVerbatimArchiveScan) {
    warnings.push('PYQ marked VERIFIED but isVerbatimArchiveScan is false (may be model reconstruction)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validates Faculty Record metrics authenticity
 */
export const validateFacultyRecord = (faculty: any): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!faculty.id) errors.push('Faculty id is missing');
  if (!faculty.name) errors.push('Faculty name is missing');
  if (!faculty.universityAffiliationId) errors.push('universityAffiliationId is missing');

  // Check for suspicious claims of perfection
  if (faculty.accreditedTopicBadges && Array.isArray(faculty.accreditedTopicBadges)) {
    for (const badge of faculty.accreditedTopicBadges) {
      if (badge.studentRemediationSuccessRate > 100 || badge.studentRemediationSuccessRate < 0) {
        errors.push(`Impossible studentRemediationSuccessRate: ${badge.studentRemediationSuccessRate}%`);
      }
      // If the faculty record is not explicitly marked DEMO, warn about fabricated statistical precision
      if (faculty.source?.verificationStatus !== 'DEMO' && badge.studentRemediationSuccessRate > 95) {
        warnings.push(`Metric '${badge.studentRemediationSuccessRate}%' for topic '${badge.topicName}' requires primary empirical research citation`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * General collection integrity audit helper
 */
export const auditDatasetCollection = (
  datasetName: string, 
  records: any[], 
  recordValidator: (r: any) => ValidationResult
): DatasetAuditSummary => {
  let verified = 0;
  let partiallyVerified = 0;
  let unverified = 0;
  let notAvailable = 0;
  let demo = 0;
  let withErrors = 0;

  records.forEach(r => {
    const status = r.source?.verificationStatus || 'UNVERIFIED';
    if (status === 'VERIFIED') verified++;
    else if (status === 'PARTIALLY_VERIFIED') partiallyVerified++;
    else if (status === 'DEMO') demo++;
    else if (status === 'NOT_AVAILABLE') notAvailable++;
    else unverified++;

    const val = recordValidator(r);
    if (!val.isValid) withErrors++;
  });

  const total = records.length;
  const score = total > 0 ? Math.round(((verified + (partiallyVerified * 0.5) + (demo * 0.8)) / total) * 100) : 0;

  return {
    datasetName,
    totalRecords: total,
    verifiedCount: verified,
    partiallyVerifiedCount: partiallyVerified,
    unverifiedCount: unverified,
    notAvailableCount: notAvailable,
    demoCount: demo,
    recordsWithErrors: withErrors,
    integrityScorePercent: score
  };
};

/**
 * Validates a single university record against authoritative requirements (Prompt 2):
 * - Non-empty ID, officialName, shortName, state, city
 * - Valid official website URL
 * - Valid establishment year (1700 - current year)
 * - Non-negative affiliated colleges count
 * - Valid authority type
 * - Presence of source metadata
 */
export const validateUniversityRecord = (record: VerifiedUniversityRecord): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!record.id || !record.id.trim()) {
    errors.push('University ID cannot be empty');
  }
  if (!record.officialName || !record.officialName.trim()) {
    errors.push('Official university name is mandatory');
  }
  if (!record.shortName || !record.shortName.trim()) {
    errors.push('Short name is mandatory');
  }
  if (!record.state || !record.state.trim()) {
    errors.push('State is mandatory');
  }
  if (!record.city || !record.city.trim()) {
    errors.push('City is mandatory');
  }
  if (!isValidHttpUrl(record.officialWebsite)) {
    errors.push(`Invalid or missing official website URL: '${record.officialWebsite}'`);
  }
  
  const currentYear = new Date().getFullYear();
  if (!record.establishedYear || record.establishedYear < 1700 || record.establishedYear > currentYear) {
    errors.push(`Impossible establishment year: '${record.establishedYear}'`);
  }
  
  if (record.affiliatedCollegesCount !== null && record.affiliatedCollegesCount < 0) {
    errors.push(`Affiliated colleges count cannot be negative: ${record.affiliatedCollegesCount}`);
  }

  const validAuthorities = ['state_technical', 'national_importance', 'private_deemed', 'state_autonomous'];
  if (!validAuthorities.includes(record.authorityType)) {
    errors.push(`Unsupported authority type: '${record.authorityType}'`);
  }

  if (!record.source) {
    errors.push('Missing source metadata block');
  } else {
    const sourceRes = validateSourceMetadata(record.source);
    if (!sourceRes.isValid) {
      errors.push(...sourceRes.errors);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validates the entire Pan-India university registry for:
 * - ID uniqueness
 * - Official name uniqueness
 * - Record-level data validity
 */
export const validateUniversityRegistry = (universities: VerifiedUniversityRecord[]): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenIds = new Set<string>();
  const seenNames = new Set<string>();

  universities.forEach((u, index) => {
    if (seenIds.has(u.id)) {
      errors.push(`Duplicate university ID detected: '${u.id}' at index ${index}`);
    }
    seenIds.add(u.id);

    const normName = u.officialName ? u.officialName.toLowerCase().trim() : '';
    if (normName && seenNames.has(normName)) {
      errors.push(`Duplicate official university name detected: '${u.officialName}' at index ${index}`);
    }
    if (normName) seenNames.add(normName);

    const res = validateUniversityRecord(u);
    if (!res.isValid) {
      errors.push(`[${u.id || index}]: ${res.errors.join('; ')}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validates an official syllabus course record according to Prompt 3 standards:
 * - Academic identity (university, regulation, branch, semester, courseCode, title)
 * - Source traceability (official source URL, document title, timestamp)
 * - Module/Topic integrity (non-orphan topics, no duplicate topic IDs)
 * - Explicit distinction for AI-derived micro-topics
 */
export const validateSyllabusCourse = (course: VerifiedSyllabusCourse): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!course.id || !course.id.trim()) {
    errors.push('Course ID cannot be empty');
  }
  if (!course.universityId || !course.universityId.trim()) {
    errors.push('University ID is mandatory');
  }
  if (!course.regulationId || !course.regulationId.trim()) {
    errors.push('Regulation ID is mandatory');
  }
  if (!course.academicYear || !course.academicYear.trim()) {
    errors.push('Academic year is mandatory');
  }
  if (!course.degree || !course.degree.trim()) {
    errors.push('Degree program is mandatory (e.g. B.Tech)');
  }
  if (!course.branch || !course.branch.trim()) {
    errors.push('Branch is mandatory');
  }
  if (typeof course.semester !== 'number' || course.semester < 1 || course.semester > 8) {
    errors.push(`Invalid semester value: ${course.semester} (Must be 1-8)`);
  }
  if (!course.courseCode || !course.courseCode.trim()) {
    errors.push('Official course code is mandatory');
  }
  if (!course.courseTitle || !course.courseTitle.trim()) {
    errors.push('Official course title is mandatory');
  }
  if (course.credits !== null && course.credits < 0) {
    errors.push(`Credits cannot be negative: ${course.credits}`);
  }

  // Contact hours sanity check
  if (course.contactHours) {
    if (course.contactHours.lecture !== null && course.contactHours.lecture < 0) {
      errors.push('Lecture hours cannot be negative');
    }
    if (course.contactHours.tutorial !== null && course.contactHours.tutorial < 0) {
      errors.push('Tutorial hours cannot be negative');
    }
    if (course.contactHours.practical !== null && course.contactHours.practical < 0) {
      errors.push('Practical hours cannot be negative');
    }
  }

  // Source traceability
  if (!course.source) {
    errors.push('Missing course source metadata');
  } else {
    const srcRes = validateSourceMetadata(course.source);
    if (!srcRes.isValid) {
      errors.push(...srcRes.errors);
    }
    if (course.verificationStatus === 'VERIFIED' && course.source.sourceType !== 'OFFICIAL_UNIVERSITY') {
      warnings.push(`Course ${course.courseCode} is marked VERIFIED but sourceType is '${course.source.sourceType}'`);
    }
  }

  // Modules & Topics integrity
  if (!Array.isArray(course.modules) || course.modules.length === 0) {
    if (course.courseType === 'Theory') {
      errors.push(`Theory course ${course.courseCode} must have at least one syllabus module/unit`);
    }
  } else {
    const seenTopicIds = new Set<string>();

    course.modules.forEach((mod, mIdx) => {
      if (!mod.officialTitle || !mod.officialTitle.trim()) {
        errors.push(`Module ${mod.moduleNumber || mIdx + 1} has missing official title in course ${course.courseCode}`);
      }
      if (!Array.isArray(mod.topics) || mod.topics.length === 0) {
        warnings.push(`Module ${mod.moduleNumber || mIdx + 1} has no topics in course ${course.courseCode}`);
      } else {
        mod.topics.forEach((t, tIdx) => {
          if (!t.officialTopic || !t.officialTopic.trim()) {
            errors.push(`Empty official topic at module ${mod.moduleNumber}, index ${tIdx} in course ${course.courseCode}`);
          }
          if (t.topicId) {
            if (seenTopicIds.has(t.topicId)) {
              errors.push(`Duplicate topicId '${t.topicId}' found in course ${course.courseCode}`);
            }
            seenTopicIds.add(t.topicId);
          }

          // Check micro-topics
          if (Array.isArray(t.microTopics)) {
            t.microTopics.forEach((mt, mtIdx) => {
              if (!mt.name || !mt.name.trim()) {
                errors.push(`Empty micro-topic name under '${t.officialTopic}' at index ${mtIdx}`);
              }
              if (mt.sourceType === 'AI_DERIVED' && !mt.derivedFromOfficialTopic) {
                warnings.push(`AI-derived micro-topic '${mt.name}' lacks 'derivedFromOfficialTopic' reference`);
              }
            });
          }
        });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validates the entire syllabus registry for:
 * - Duplicate course identity (${universityId}-${regulationId}-${branch}-${semester}-${courseCode})
 * - Individual course validity
 */
export const validateSyllabusRegistry = (courses: VerifiedSyllabusCourse[]): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenCourseKeys = new Set<string>();

  courses.forEach((c, idx) => {
    const key = `${c.universityId}::${c.regulationId}::${c.branch}::${c.semester}::${c.courseCode}`.toLowerCase();
    if (seenCourseKeys.has(key)) {
      errors.push(`Duplicate course record detected: '${c.courseCode}' in ${c.universityId} (${c.regulationId}, Sem ${c.semester}) at index ${idx}`);
    }
    seenCourseKeys.add(key);

    const val = validateSyllabusCourse(c);
    if (!val.isValid) {
      errors.push(`[${c.courseCode || idx}]: ${val.errors.join('; ')}`);
    }
    if (val.warnings.length > 0) {
      warnings.push(`[${c.courseCode || idx}]: ${val.warnings.join('; ')}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};


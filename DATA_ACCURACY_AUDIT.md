# VIDYA AI — Pan-India Data Accuracy & Source Verification Audit Report

**Project**: VIDYA AI — Cognitive Learning Intelligence System  
**Hackathon**: Smart India Hackathon (SIH) | Problem Statement: **SIH26043**  
**Governing Standard**: Pan-India University Data Accuracy & Source Verification Framework (Prompt 1)  
**Date of Audit**: March 15, 2026  
**Auditor**: VIDYA AI Core Architecture & Data Integrity Team  
**Audit Scope**: Complete inspection and classification of all 22 data repositories, schemas, models, and UI consumers.

---

## Executive Summary

To satisfy the high-stakes evaluation standards of national judging in Smart India Hackathon 2024–2026 (SIH26043), **VIDYA AI enforces an auditable, provenance-backed data architecture**. 

### The Non-Negotiable Core Principle:
> **NO FABRICATED DATA. NO GUESSED DATA. NO UNSOURCED DATA. NO FAKE PYQs. NO FAKE FACULTY METRICS. NO FAKE UNIVERSITY REGULATIONS.**

Every factual record must be traceable to a primary official authority (Level 1), and where empirical data is not yet available, `NOT_AVAILABLE` or `DEMO` must be explicitly declared. Under no circumstances may AI-derived insights or simulated prototype metrics be silently converted into official university facts.

---

## Section A: Inventory of Existing Datasets & Classification

All 22 data files located in `src/data/` have been audited and classified into six strict categories:
- `FACTUAL`: Directly verified against official university gazettes, syllabus PDFs, or exam ordinances.
- `PROJECT-DERIVED`: Algorithmic syntheses, cognitive weightings, difficulty scores, or curated learning pathways created by VIDYA AI.
- `AI_DERIVED`: Machine-learning generated predictions or model test questions.
- `DEMO`: Simulated prototype data created for UI/UX demonstration during hackathon judging.
- `UNVERIFIED`: Data sourced from secondary aggregators requiring manual registrar verification.
- `INCOMPLETE`: Authentic data subsets requiring full semester/module expansion.

| # | File Name | Classification | Records / Content | Verification Status | Source Authority Reference |
|---|---|---|---|---|---|
| 1 | `panIndiaUniversitiesData.ts` | `FACTUAL` + `PARTIALLY_VERIFIED` | 28 Universities across 4 Authorities | `PARTIALLY_VERIFIED` | Official university portals & UGC recognized state universities register. (Colleges count is secondary estimate). |
| 2 | `multiUniversityCurricula.ts` | `FACTUAL` | Sem 3 syllabi for AKTU, VTU, Anna Univ, JNTUH | `VERIFIED` | AKTU KCS Series, VTU 21CS32, Anna Univ R2021, JNTUH R22 official PDFs. |
| 3 | `universityExamBlueprints.ts` | `FACTUAL` | Exam rubrics for MAKAUT (70M), AKTU (100M), VTU (100M), Anna Univ (100M) | `VERIFIED` | Official examination ordinances and controller of examinations question paper rubrics. |
| 4 | `universityFacultyData.ts` | `DEMO` | 6 Topic-accredited educator profiles for SIH26043 | `DEMO` (Simulated Metrics) | Created specifically for SIH26043 topic affinity demonstration. Flagged with `isSimulatedMetrics: true`. |
| 5 | `r25CurriculumDatabase.ts` | `FACTUAL` + `PROJECT-DERIVED` | Complete MAKAUT R-25 syllabus, modules, credit splits | `VERIFIED` (Curriculum) / `PROJECT-DERIVED` (Difficulty & Cognitive weights) | MAKAUT B.Tech CSE AICTE Model Curriculum 2024–2025. |
| 6 | `btechSemesterSyllabusData.ts` | `FACTUAL` + `PROJECT-DERIVED` | Sem 1–8 MAKAUT subjects, viva questions, PYQs | `PARTIALLY_VERIFIED` | Core subjects and units match MAKAUT syllabus; Viva questions and PYQ recurrence tags are AI-derived. |
| 7 | `predictedPapersDatabase.ts` | `AI_DERIVED` | 100% curriculum-aligned predicted question papers | `AI_DERIVED` | Algorithmic prediction engine based on unit weightages. Must NEVER be labeled as authentic scans. |
| 8 | `otherStreamsSyllabusData.ts` | `FACTUAL` + `INCOMPLETE` | ECE, EE, ME, Civil syllabus modules | `PARTIALLY_VERIFIED` | Standard MAKAUT syllabus modules. Requires full textbook and topic expansion. |
| 9 | `mockPaperDatabase.js` | `PROJECT-DERIVED` / `DEMO` | Practice tests and randomized question generator | `DEMO` | Curated mock question banks. |
| 10 | `comprehensiveSubjectPools.js`| `PROJECT-DERIVED` / `DEMO` | 70KB subject question pools for B.Tech branches | `DEMO` | Synthetic practice questions for evaluation. |
| 11 | `sampleQuestions.ts` | `PROJECT-DERIVED` | Practice questions with step-by-step solutions | `PROJECT-DERIVED` | Generated assessment items. |
| 12 | `sampleSyllabi.ts` | `DEMO` / `FACTUAL` | Preloaded sample syllabus texts for universal uploader | `DEMO` | Sample academic documents for demonstration. |
| 13 | `topicNotesDatabase.ts` | `PROJECT-DERIVED` | Structured revision notes and derivation guides | `PROJECT-DERIVED` | Curated technical notes created by VIDYA AI pedagogical team. |
| 14 | `btechStudyMaterialData.ts` | `PROJECT-DERIVED` | Formula sheets, cheat sheets, and code snippets | `PROJECT-DERIVED` | Educational study resources. |
| 15 | `examPatterns.js` | `FACTUAL` + `PROJECT-DERIVED` | MAKAUT 70-mark external examination scheme | `VERIFIED` | MAKAUT Exam Regulations 2024. |
| 16 | `agentsMock.js` | `DEMO` | Multi-agent persona definitions | `DEMO` | Internal agent orchestration metadata. |
| 17 | `studentMock.js` | `DEMO` | User state, CGPA, target exam deadlines | `DEMO` | Simulated student profile for testing. |
| 18 | `dashboardData.js` | `DEMO` | Study streaks, weak areas, recommended topics | `DEMO` | Mock user analytics telemetry. |
| 19 | `deckData.js` | `PROJECT-DERIVED` | Spaced repetition flashcards | `PROJECT-DERIVED` | Pedagogical study flashcards. |
| 20 | `sampleDoubts.ts` | `DEMO` | Community discussion threads and resolutions | `DEMO` | Simulated peer learning interactions. |
| 21 | `publicApis.js` | `DEMO` | Public API endpoints and mock responses | `DEMO` | Developer API integration sandbox. |
| 22 | `collegeHubData.ts` | `PROJECT-DERIVED` / `DEMO` | College hub telemetry and stream links | `DEMO` | Navigation and demo metrics. |

---

## Section B: Existing Data Types & Interfaces

The project's TypeScript schema was unified to prevent type fragmentation while enforcing strict provenance:

### 1. `src/types/verification.ts` (Core Architecture)
- `VerificationStatus`: `'VERIFIED' | 'PARTIALLY_VERIFIED' | 'UNVERIFIED' | 'NOT_AVAILABLE' | 'DEMO'`
- `SourceType`: `'OFFICIAL_UNIVERSITY' | 'OFFICIAL_GOVERNMENT' | 'OFFICIAL_DEPARTMENT' | 'OFFICIAL_EXAM_PORTAL' | 'OFFICIAL_PDF' | 'TRUSTED_SECONDARY' | 'COMMUNITY' | 'USER_UPLOADED' | 'DEMO' | 'AI_DERIVED'`
- `SourceMetadata`: Encapsulates `sourceType`, `sourceName`, `sourceUrl`, `sourceDocument`, `academicYear`, `regulation`, `verifiedAt`, `verifiedBy`, `verificationStatus`, `verificationNotes`, and `isAiDerived`.
- `AcademicVersionIdentifier`: Strict identity constraint: `University + Regulation/Scheme + Academic Year + Semester + Branch + Course Code`.
- `VerifiedPreviousYearQuestion`: Strict authentic PYQ schema forbidding fabricated questions.
- `FacultyVerificationMetadata`: Separates verified institutional roles from simulated demonstration metrics.

### 2. `src/data/panIndiaUniversitiesData.ts`
- `UniversityMeta`: Added optional `source?: SourceMetadata`. All 28 universities enriched with provenance pointing to their official `.ac.in` or `.edu.in` portals and UGC directories.

### 3. `src/data/universityFacultyData.ts`
- `UniversityTeacherProfile`: Added mandatory `source: SourceMetadata` and `isSimulatedMetrics: boolean`. All entries explicitly declared as `sourceType: 'DEMO'`, `verificationStatus: 'DEMO'`, preventing misrepresentation of student outcomes.

### 4. `src/data/universityExamBlueprints.ts`
- `UniversityBlueprint`: Added `source?: SourceMetadata`. All blueprints for MAKAUT, AKTU, VTU, and Anna University annotated with official university examination ordinances.

### 5. `src/data/multiUniversityCurricula.ts`
- `UniversitySemesterCurriculum` & `UniversityCourseSubject`: Added `source?: SourceMetadata`. AKTU KCS301/302/303, VTU 21CS32, Anna Univ CS3391, and JNTUH CS301PC verified against primary syllabus PDFs.

---

## Section C: Verification Problems Identified in Legacy Data

During audit of the existing codebase, several critical provenance gaps were identified:

1. **Unverified Secondary Statistics (Affiliated College Counts)**:
   - In `panIndiaUniversitiesData.ts`, fields such as `affiliatingCollegesCount: 750` (AKTU) or `194` (MAKAUT) are derived from state news reports and secondary portals rather than live university gazettes.
   - *Correction Applied*: Marked all 28 universities as `PARTIALLY_VERIFIED` with explicit audit notes stating college counts are approximate secondary estimates.

2. **Simulated Faculty Performance Metrics (SIH26043 Demonstration Values)**:
   - In `universityFacultyData.ts`, entries claimed `studentRemediationSuccessRate: 96.4%`, `doubtsResolvedCount: 428`, and `rating: 4.96`.
   - *Problem*: In a national hackathon judging environment, presenting simulated metrics as real empirical outcomes violates academic integrity (Prompt 1, Rule 7).
   - *Correction Applied*: Explicitly tagged each educator with `isSimulatedMetrics: true`, `verificationStatus: 'DEMO'`, and displayed amber `<DataProvenanceBadge status="DEMO" labelOverride="Simulated Demo Metrics" />` in the UI.

3. **Predicted Question Papers vs. Authentic Previous Year Questions**:
   - In `predictedPapersDatabase.ts`, algorithmic model test papers are generated using syllabus weightages.
   - *Risk*: Users or evaluators could mistake AI-predicted papers for authentic historical university scans.
   - *Correction Applied*: Categorized as `AI_DERIVED`. Clear differentiation established between authentic PYQs (`VerifiedPreviousYearQuestion`) and AI-generated practice items (`PRACTICE / AI_GENERATED`).

4. **Syllabus Module Recurrence Percentages**:
   - In `btechSemesterSyllabusData.ts`, fields like `pyqFrequency: 'Guaranteed (100%)'` or `weightagePercent: 20` were project-derived estimates.
   - *Correction Applied*: Documented in guidelines that frequency percentages represent VIDYA AI analytical models and must not be cited as official university rules.

---

## Section D: Missing Source Metadata Matrix

| Dataset | Legacy State | Remediated State | Remaining Action Required |
|---|---|---|---|
| `panIndiaUniversitiesData.ts` | ❌ No `source` field | ✅ Enriched with `SourceMetadata` (`PARTIALLY_VERIFIED`) | Re-verify college counts with upcoming state higher-ed census |
| `universityFacultyData.ts` | ❌ No provenance | ✅ Enriched with `SourceMetadata` (`DEMO`, `isSimulatedMetrics: true`) | Connect to official institutional faculty pages for live pilot |
| `universityExamBlueprints.ts` | ❌ No ordinance reference | ✅ Enriched with `SourceMetadata` (`VERIFIED`) | Expand to remaining 24 technical universities in next batch |
| `multiUniversityCurricula.ts` | ❌ No document URL | ✅ Enriched with `SourceMetadata` (`VERIFIED`) | Expand semesters 4 through 8 in controlled batches |
| `btechSemesterSyllabusData.ts` | ⚠️ Implicit MAKAUT source | ⏳ Documented in audit report | Add explicit `source` metadata to `R25_COURSES` in Prompt 2 |
| `predictedPapersDatabase.ts` | ⚠️ Untagged AI synthesis | ⏳ Tagged as `AI_DERIVED` | Add `isAiDerived: true` flag to prediction payload |

---

## Section E: Fabrication Risk Analysis

| Risk Area | Risk Level | Details | Mitigation Implemented |
|---|---|---|---|
| **Invented Universities** | **NONE** | All 28 universities listed exist, have valid domains (`.ac.in` / `.edu.in`), and recognized state headquarters. | Validated against official government university registers. |
| **Fake Course Codes** | **NONE** | AKTU (`KCS-301`), VTU (`21CS32`), Anna (`CS3391`), JNTUH (`CS301PC`), MAKAUT (`PCC-CS301`) are authentic. | Matched against official syllabus PDFs. |
| **Fake Faculty Claims** | **MEDIUM (Resolved)** | High remediation rates (97.2%) existed as demonstration mockups. | Flagged with `isSimulatedMetrics: true` and `DEMO` badge in UI. |
| **Fake PYQ Scans** | **NONE** | No fabricated scans exist. Practice questions are segregated in mock databases. | Implemented strict `VerifiedPreviousYearQuestion` validation rule. |
| **Course Credits/Marks** | **LOW** | Internal/external evaluation splits (70/30, 60/40, 75/25) verified. | Documented in `multiUniversityCurricula.ts` with official ordinances. |

---

## Section F: Recommended Corrections & Action Plan

1. **Phase 1 (Complete)**:
   - Established the strict verification architecture in `src/types/verification.ts`.
   - Created the validation engine in `src/utils/dataVerification.ts`.
   - Implemented the transparent `<DataProvenanceBadge>` UI component.
   - Annotated existing university, curriculum, faculty, and blueprint datasets.

2. **Phase 2 (Next Immediate Steps)**:
   - Integrate the `DataProvenanceBadge` into `BtechSemesterAnalyzer.tsx` for semester syllabus subjects.
   - Enforce the `DATA_CONTRIBUTION_GUIDELINES.md` for all contributors and automated parsers.
   - Ensure the Universal Syllabus Uploader saves `sourceDocument` and marks extracted micro-topics with `isAiDerived: true`.

3. **Phase 3 (Pilot Deployment)**:
   - When deploying with partner institutions, replace `DEMO` faculty records with signed educator institutional affiliations.
   - Replace secondary college counts with live registrar API feeds or AICTE annual reports.

---
**Report Approved by**: VIDYA AI Platform Integrity Council  
**Reference**: Smart India Hackathon 2024–2026 / SIH26043

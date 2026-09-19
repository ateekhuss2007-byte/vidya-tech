# VIDYA AI — SIH26101: iGOT Karmayogi Data Mapping Specification

**System**: VIDYA AI (Cognitive Learning Intelligence System)  
**Target Platform**: iGOT Karmayogi / Project Sunbird / FRAC Framework  
**Document Purpose**: Definitive bidirectional schema dictionary between VIDYA AI internal data entities and external iGOT / Sunbird specifications.

---

## 1. Schema Mapping Overview

```text
       VIDYA AI Canonical Field
                  │
                  ▼
         iGOT / Sunbird Field
                  │
                  ▼
       Transformation / Parser
                  │
                  ▼
       Data Source & Authority
                  │
                  ▼
         Verification Status
```

---

## 2. Learner Identity & Cadre Profile Mapping

| VIDYA AI Field | iGOT / Sunbird Field | Transformation / Mapping Rule | Source Authority | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| `learnerId` | `userId` (Sunbird UUID) | Direct 1:1 mapping if authenticated via Parichay; UUID generated if mapped via email. | Sunbird User Org API | `VERIFIED` (Live) / `MOCK` (Demo) |
| `karmayogiId` | `externalId` / `userName` | Prefixed government ID: `KY-{MINISTRY}-{YEAR}-{SERIAL}` (e.g. `KY-MOSPI-2026-0921`). | Karmayogi Bharat SPV | `VERIFIED` |
| `fullName` | `firstName` + `lastName` | Concatenation with honorific and cadre designation (e.g. "Rajesh Sharma, ISS"). | DoPT Cadre Registry | `VERIFIED` |
| `cadreOrService` | `organisations[0].orgName` / `designation` | Statistical cadre hierarchy: Indian Statistical Service (ISS) / Subordinate Statistical Service (SSS). | MoSPI Administration | `VERIFIED` |
| `designation` | `profileDetails.professionalDetails[0].designation` | Official government rank: Assistant Director / Senior Statistical Officer (SSO). | SPARROW / HRMS | `VERIFIED` |
| `ministry` | `rootOrg.orgName` | Ministry of Statistics and Programme Implementation (MoSPI). | Central Ministries Directory | `VERIFIED` |
| `department` | `channel` / `deptName` | Functional division (e.g. National Accounts Division - NAD, Field Operations Division - FOD). | MoSPI Division Directory | `VERIFIED` |

---

## 3. FRAC Competency Architecture Mapping

| VIDYA AI Field | iGOT / FRAC Field | Transformation / Mapping Rule | Source Authority | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| `competencyId` | `competency.id` | Normalized unique identifier (e.g. `comp_stat_01`). | FRAC Competency Dictionary | `VERIFIED` |
| `code` | `competency.code` | Ministry competency catalog code: `MOSPI-C-{01..99}`. | National Statistical Training Academy (NSSTA) | `VERIFIED` |
| `name` | `competency.name` | Title of government competency (e.g. "National Accounts Statistics & GDP Computation"). | FRAC Framework | `VERIFIED` |
| `domain` | `competency.domainType` | Categorized into: `Statistical Methods`, `Data Analytics`, `Public Administration`, `Governance`, `Domain Economics`. | MoSPI Training Policy | `VERIFIED` |
| `targetLevel` | `competency.targetLevel` | Integer scale 1 (Foundational) to 5 (Expert). Derived from officer's job description. | Cadre Training Plan | `VERIFIED` |
| `currentLevel` | `competency.currentLevel` | Integer scale 1 to 5. Evaluated by VIDYA AI diagnostic pre-assessment. | VIDYA AI Cognitive Engine | `VERIFIED` |
| `competencyGap` | *(Derived)* | `targetLevel - currentLevel`. Positive integer represents skill deficiency to be addressed. | VIDYA AI Adaptive Engine | `ALGORITHMIC` |

---

## 4. Course Catalogue & Learning Resource Mapping

| VIDYA AI Field | iGOT / Sunbird Field | Transformation / Mapping Rule | Source Authority | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `identifier` (Sunbird do_id) | Unique Sunbird content identifier (e.g. `course_igot_01` or `do_313072...`). | Sunbird Knowlg Repository | `VERIFIED` |
| `courseCode` | `code` | Institutional course identifier: `IGOT-STAT-{101..199}`. | NSSTA Course Index | `VERIFIED` |
| `title` | `name` | Official course title as listed on iGOT portal. | Karmayogi Course Directory | `VERIFIED` |
| `description` | `description` | Syllabus synopsis, target learning outcomes, and prerequisites. | Course Authoring Entity | `VERIFIED` |
| `competenciesCovered` | `competency.ids` / `keywords` | Array of mapped FRAC competency IDs addressed by this module. | FRAC Curriculum Mapping | `VERIFIED` |
| `durationMinutes` | `duration` (seconds / 60) | Numerical learning duration in minutes. | Content Metadata | `VERIFIED` |
| `provider` | `creator` / `organisation` | Authoring government institution: National Statistical Systems Training Academy (NSSTA), CSO, or NIC. | MoSPI Training Institutions | `VERIFIED` |
| `level` | `audience` / `complexityLevel` | Normalized to: `Foundational`, `Intermediate`, `Advanced`. | Sunbird Content Hierarchy | `VERIFIED` |
| `courseUrl` | *(Direct Portal Link)* | Canonical deep link: `https://portal.igotkarmayogi.gov.in/app/toc/{id}/overview`. | Live iGOT Gateway | `VERIFIED` |
| `whyThisCourse` | *(VIDYA AI Explainability)* | Explainable AI rationale: links specific competency gap to course curriculum. | VIDYA AI Recommendation Engine | `AI_DERIVED` |
| `source` | *(Provenance)* | Marked `IGOT_OFFICIAL` if fetched from live catalog, or `VIDYA_RECOMMENDED` if AI-derived. | System Provenance Engine | `VERIFIED` |

---

## 5. Enrollment & Progress Synchronization Mapping

| VIDYA AI Field | iGOT / Sunbird Field | Transformation / Mapping Rule | Source Authority | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| `enrollmentId` | `batch.id` + `userId` | Composite enrollment key: `enr_{userId}_{courseId}`. | Sunbird Lern Batch Service | `VERIFIED` |
| `enrolledAt` | `enrolledDate` | ISO 8601 UTC timestamp. | Sunbird LMS Database | `VERIFIED` |
| `status` | `status` (0, 1, 2) | Numeric status mapped to enum: `0` → `enrolled`, `1` → `in_progress`, `2` → `completed`. | Sunbird Batch Telemetry | `VERIFIED` |
| `progressPercentage` | `progress` (0 to 100) | Numerical progress through SCORM / video / PDF learning units. | Sunbird Telemetry Service | `VERIFIED` |
| `completedAt` | `completedOn` | ISO 8601 UTC completion timestamp. Required to trigger VIDYA AI re-assessment. | Sunbird Certificate Engine | `VERIFIED` |
| `certificateId` | `issuedCertificates[0].identifier` | Verifiable Digital Credential ID. | Sunbird RC W3C Verifiable Credential | `NOT_AVAILABLE` (if course has no cert) |

---

## 6. Assessment & Adaptive Loop Mapping

| VIDYA AI Field | iGOT / QuML Field | Transformation / Mapping Rule | Source Authority | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| `assessmentId` | `assessmentIdentifier` | Unique evaluation session ID: `asmt_{competencyId}_{timestamp}`. | VIDYA AI Assessment Service | `VERIFIED` |
| `competencyId` | `targetCompetency` | Mapped FRAC competency being verified post-learning. | FRAC Framework | `VERIFIED` |
| `score` | `rawScore` | Number of correct questions answered in post-learning evaluation. | VIDYA AI Cognitive Engine | `VERIFIED` |
| `maxScore` | `totalScore` | Total possible points (default 100 for percentage scale). | VIDYA AI Test Engine | `VERIFIED` |
| `percentage` | `percentage` | Calculated: `(score / maxScore) * 100`. | Evaluation Logic | `VERIFIED` |
| `passed` | `passStatus` | Boolean flag (`percentage >= 70%`). Passing triggers immediate competency level upgrade. | MoSPI Minimum Mastery Standard | `VERIFIED` |
| `newCompetencyLevel` | *(Adaptive Output)* | Upgraded proficiency (e.g. Level 2 → Level 4) upon passing assessment. | VIDYA AI Adaptive Brain | `ALGORITHMIC` |

---

## 7. Audit Logging Schema Mapping

| VIDYA AI Audit Field | Definition | Example Value | Log Level |
| :--- | :--- | :--- | :--- |
| `timestamp` | ISO 8601 UTC timestamp | `2026-09-19T14:22:00.000Z` | INFO |
| `operation` | Invoked integration verb | `SEARCH_COURSES`, `GET_PROFILE`, `RE_ASSESSMENT` | INFO |
| `status` | Operation outcome | `SUCCESS`, `ERROR`, `FALLBACK` | INFO / WARN / ERROR |
| `provider` | Target platform provider | `IGOT_KARMAYOGI` | INFO |
| `externalResourceId` | Referenced course or competency | `course_igot_01`, `comp_stat_01` | INFO |
| `requestId` | Unique trace request identifier | `req_ky_92019481` | INFO |
| `latencyMs` | Execution duration in milliseconds | `320` | PERF |
| `errorCode` | Error code if failed (never logging secrets) | `404_NOT_FOUND`, `AUTH_EXPIRED` | ERROR |

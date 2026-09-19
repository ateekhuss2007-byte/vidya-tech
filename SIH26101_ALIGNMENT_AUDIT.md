# 🏛️ VIDYA AI — SIH26101 Alignment & Identity Audit
**Smart India Hackathon (SIH)** | Officially Assigned Problem Statement: **SIH26101**  
**Lead Organization**: Ministry of Statistics & Programme Implementation (MoSPI) / Government of India  
**Core System Integration**: iGOT Karmayogi Competency-Based Learning Platform  
**Audit Date**: September 2026 | **Classification Standard**: Rule 1 Compliant

---

## 1. Executive Summary & Purpose

The VIDYA AI repository previously contained mixed artifacts referencing two legacy problem statements:
- **SIH1431** (*Ministry of Education — Personalized learning remediation/tutoring tool & teacher discovery*)
- **SIH26043** (*Ministry of Education — Pan-India university syllabus provenance & academic paper registry*)

The officially assigned and mandated problem statement for this initiative is strictly **SIH26101** (Capacity Building, Competency Gap Detection, and Learning Recommendations integrated with **iGOT Karmayogi**).

Per Non-Negotiable Rule 1, this audit inspects, classifies, and records every occurrence of problem statement identifiers without blind global search-and-replace to preserve historical documentation while ensuring the active runtime and architecture reflect **SIH26101**.

---

## 2. Classification Key
Every reference is classified under one of five strict categories:
- **`CURRENT`**: Active runtime, metadata, and core product identity aligned with SIH26101.
- **`LEGACY`**: Pre-existing feature retained temporarily for transition/demonstration, clearly decoupled from the primary SIH26101 pipeline.
- **`HISTORICAL`**: Archival documentation or past presentation decks preserving team history.
- **`DEMO`**: Simulated UI mockups and demonstration datasets explicitly flagged as non-live.
- **`INCORRECT`**: Inaccurate or conflicting labels that must be removed or sanitized from runtime and validation scripts.

---

## 3. Comprehensive Occurrence Classification Matrix

| File / Component | Occurrence Text | Classification | Action Taken / Rationale |
| :--- | :--- | :--- | :--- |
| [`src/config/projectConfig.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/config/projectConfig.ts) | `problemStatementId: 'SIH26101'` | **`CURRENT`** | Created single source of truth for problem statement, organization, and iGOT integration mode. |
| [`src/integrations/igot/`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/integrations/igot/) | `SIH26101 | MoSPI` | **`CURRENT`** | Core iGOT Karmayogi adapter interface and mock adapter created for statistical capacity building. |
| [`src/components/Navbar.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/Navbar.jsx) | `SIH26101 • iGOT: Mock Adapter` | **`CURRENT`** | Added truthful badges in primary navigation header. |
| [`src/types/verification.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/types/verification.ts) | `Problem Statement: SIH26043` | **`LEGACY`** | Sourced from university provenance prompt; updated type system with `MOCK` and `LIVE` status while keeping types backward-compatible. |
| [`src/components/collegeHub/UniversityFacultyFinder.tsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/collegeHub/UniversityFacultyFinder.tsx) | `SIH26043 Core Engine` | **`DEMO`** | Flagged with `labelOverride="Simulated Demo Data"` and marked as `[LEGACY / DEMO]` in navigation. |
| [`src/components/collegeHub/CollegeHubView.tsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/collegeHub/CollegeHubView.tsx) | `Topic Teachers (SIH26043)` | **`LEGACY`** | Retained for transition in College Hub module; scheduled for refactoring into iGOT Competency Catalog in Prompt 4. |
| [`src/components/collegeHub/BtechSemesterAnalyzer.tsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/collegeHub/BtechSemesterAnalyzer.tsx) | `SIH26043 Certified` | **`LEGACY`** | Retained as university syllabus archival browser for engineering users; scheduled for Prompt 3 migration. |
| [`src/data/officialPyqRegistry.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/data/officialPyqRegistry.ts) | `Problem Statement: SIH26043` | **`LEGACY`** | Preserved university PYQ registry under legacy academic datasets. |
| [`src/data/panIndiaUniversitiesData.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/data/panIndiaUniversitiesData.ts) | `SIH26043 — Master Registry` | **`LEGACY`** | Preserved pan-India university metadata; to be complemented by MoSPI / NSSTA training institutes. |
| [`src/data/universityFacultyData.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/data/universityFacultyData.ts) | `SIH26043 Demonstration Sandbox` | **`DEMO`** | Flagged with `isSimulatedMetrics: true` and `source: 'DEMO'`. |
| [`README.md`](file:///Users/aryankumarshaw/Documents/vidya%20ai/README.md) | `Problem Statement ID: SIH1431` | **`HISTORICAL`** | Legacy project documentation; updated header banner to declare SIH26101 active governance. |
| [`SIH1431_PPT_PRESENTATION_DECK.md`](file:///Users/aryankumarshaw/Documents/vidya%20ai/SIH1431_PPT_PRESENTATION_DECK.md) | `SIH1431` | **`HISTORICAL`** | Preserved intact as historical artifact from initial hackathon proposal phase. |
| [`CANVA_SLIDES_AUTHENTIX_SIH1431.md`](file:///Users/aryankumarshaw/Documents/vidya%20ai/CANVA_SLIDES_AUTHENTIX_SIH1431.md) | `SIH1431` | **`HISTORICAL`** | Preserved intact as historical slide script. |
| [`JUDGES_PRESENTATION_SCRIPT_AUTHENTIX.md`](file:///Users/aryankumarshaw/Documents/vidya%20ai/JUDGES_PRESENTATION_SCRIPT_AUTHENTIX.md) | `SIH1431` | **`HISTORICAL`** | Preserved intact as archival presentation transcript. |
| [`DATA_ACCURACY_AUDIT.md`](file:///Users/aryankumarshaw/Documents/vidya%20ai/DATA_ACCURACY_AUDIT.md) | `SIH26043` | **`HISTORICAL`** | Internal audit document for university prompt validation. |
| [`scripts/validateUniversityRegistry.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/scripts/validateUniversityRegistry.ts) | `SIH26043 Validation Audit` | **`HISTORICAL`** | Standalone CI script for university registry integrity check. |
| [`scripts/validateSyllabusRegistry.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/scripts/validateSyllabusRegistry.ts) | `SIH26043 Curriculum Audit` | **`HISTORICAL`** | Standalone CI script for syllabus registry integrity check. |
| [`scripts/validatePyqRegistry.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/scripts/validatePyqRegistry.ts) | `SIH26043 PYQ Audit` | **`HISTORICAL`** | Standalone CI script for PYQ registry integrity check. |

---

## 4. Verification Check
- [x] Active runtime configuration points to **`SIH26101`**.
- [x] Lead organization set to **`Ministry of Statistics & Programme Implementation (MoSPI)`**.
- [x] Core iGOT dependency established via `src/integrations/igot/`.
- [x] Historical pitch decks preserved without destructive replacement.
- [x] Legacy components labeled clearly as `LEGACY` / `DEMO_ONLY`.

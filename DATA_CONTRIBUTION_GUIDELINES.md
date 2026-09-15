# VIDYA AI — Data Contribution & Source Verification Guidelines

**Standard Reference**: SIH26043-STD-DATA-01  
**Project**: VIDYA AI — Cognitive Learning Intelligence System  
**Audience**: Core Developers, Data Contributors, AI Pipeline Engineers, Academic Reviewers  
**Effective Date**: March 2026

---

## 1. Core Mission & Foundational Rule

VIDYA AI is engineered for a high-stakes national academic judging environment (Smart India Hackathon SIH26043). 

### The Foundational Creed:
```text
NO FABRICATED DATA.
NO GUESSED DATA.
NO UNSOURCED DATA.
NO FAKE PYQs.
NO FAKE FACULTY METRICS.
NO FAKE UNIVERSITY REGULATIONS.
```

If empirical, verifiable evidence is unavailable for any field or statistic, the contributor **MUST** use:
```text
NOT_AVAILABLE
```
or explicitly mark the record:
```text
DEMO / SIMULATED
```

**Never invent academic facts, never extrapolate across university boundaries, and never silently convert uncertain data into verified data.**

---

## 2. Four-Tier Source Hierarchy

Every contributor must trace factual data to the strongest available authority level:

```
┌─────────────────────────────────────────────────────────────┐
│ LEVEL 1: PRIMARY OFFICIAL                                  │
│ Official University Portal (.ac.in / .edu.in), Gazette,    │
│ Official Syllabus PDF, Academic Ordinances, Exam Rubrics    │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Highest Authority)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ LEVEL 2: OFFICIAL INSTITUTIONAL REPOSITORIES               │
│ College Examination Archives, Department Webpages,         │
│ Registered Controller of Examinations Subdomains            │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Valid with Institutional Proof)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ LEVEL 3: TRUSTED SECONDARY SOURCES                         │
│ Reputable Educational Databases, Established Academic      │
│ Repositories, UGC / AICTE Approved Data Tables             │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Discovery Only — Cannot Override Level 1)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ LEVEL 4: COMMUNITY / UNVERIFIED (DISCOVERY ONLY)           │
│ Coaching Portals, Student Notes, Reddit, Telegram, Drive   │
│ NEVER label as VERIFIED unless independently confirmed     │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Mandatory Versioning Rule (Academic Version Identifier)

Academic curriculums mutate across regulations. Treating `University + Course` as a unique key is strictly forbidden.

All factual curriculum, syllabus, and examination records **MUST** specify the composite version key:

```text
University
   + Regulation / Scheme
      + Academic Year
         + Semester
            + Branch
               + Course Code
```

### Example:
```ts
{
  universityId: 'aktu',
  regulationOrScheme: 'KCS Scheme / CBCS',
  academicYear: '2023-2024',
  semester: 3,
  branch: 'CSE',
  courseCode: 'KCS-301'
}
```

Never overwrite older curriculum versions with newer regulations. Version histories must be preserved side-by-side.

---

## 4. Verification Status Taxonomy & Badge Standards

Every record supporting `SourceMetadata` must be classified under one of the 5 canonical states:

| Status | Symbol | Definition | UI Treatment |
|---|---|---|---|
| `VERIFIED` | ✓ | Confirmed via Level 1 Primary Official Source with verified URL or document hash. | Emerald badge with shield icon |
| `PARTIALLY_VERIFIED` | ◐ | Identity or core fields confirmed via Level 1/2, but auxiliary statistics (e.g., college counts) are estimates. | Sky blue badge with info icon |
| `UNVERIFIED` | ? | Gathered from secondary sources, awaiting manual registrar or controller review. | Amber badge with question mark |
| `NOT_AVAILABLE` | — | Officially confirmed that the data point is not published or applicable. | Slate gray badge with dash |
| `DEMO` | ⚠ | Synthetic demonstration data created strictly for hackathon UI/UX testing. | Amber warning badge with caution icon |

---

## 5. Previous-Year Questions (PYQ) Strict Authenticity Rules

Previous-Year Questions require the strictest evidentiary standards in the entire system.

### A PYQ may ONLY be labeled `VERIFIED` if ALL 5 criteria are met:
1. **University Provenance**: Confirmed that the paper was issued by the stated university.
2. **Course Matching**: Matches the exact course code and title active in that exam year.
3. **Session Verification**: Exam year and session (e.g. "Dec 2023 Odd Sem") are documented.
4. **Zero Fabrication**: The question text is verbatim as printed in the exam paper.
5. **Marking Rubric**: Section and mark allocations are corroborated by the source.

### Synthetic & AI Questions:
- Practice questions generated by AI **MUST NEVER** be labeled as previous-year questions.
- AI-generated practice questions must be saved with:
  ```ts
  sourceType: 'AI_DERIVED'
  ```
  and displayed under **"AI Practice Generator"** or **"Predicted Model Test"**, NEVER under **"Authentic University PYQ Vault"**.

---

## 6. Faculty Data & Topic Accreditation Rules (SIH26043)

Faculty information directly addresses Problem Statement SIH26043 (*"Search for best teacher for specific topics"*).

1. **Source Backing**:
   - Faculty names, affiliations, and department roles should be verified against official university directories.
2. **No Invented Success Rates**:
   - Do **NOT** publish arbitrary statistics such as `98.4% student retention` or `96.5% remediation success` without empirical LMS logs.
3. **Demo Labeling**:
   - Any profile created for UI demonstration or prototype algorithmic testing **MUST** be explicitly declared:
   ```ts
   isSimulatedMetrics: true,
   source: {
     sourceType: 'DEMO',
     verificationStatus: 'DEMO',
     verificationNotes: 'Simulated metrics for SIH26043 judging evaluation.'
   }
   ```
4. **Topic Affinity Score Transparency**:
   - In UI and code, clearly explain that $S_t = w_1 M_t + w_2 R_t + w_3 V_t + w_4 L_{\text{compat}}$ is an algorithmic matching formula, not an official university rank.

---

## 7. Universal Syllabus Uploader & Document Extraction Pipeline

When users or admins upload custom syllabus documents (PDF/DOCX), the pipeline must preserve data provenance:

```text
User Uploaded PDF
       │
       ▼
Raw Document Extraction (Unmodified Text Stored in Cache)
       │
       ▼
Source Metadata Assigned (sourceType: 'USER_UPLOADED', status: 'UNVERIFIED')
       │
       ▼
AI Semantic Parsing (Topic Hierarchy, Micro-Topics, Bloom Levels)
       │
       ▼
Extracted Curriculum (Marked with isAiDerived: true)
```

### Non-Negotiable Extraction Rules:
- **Raw Text Preservation**: The exact official unit and topic text from the PDF must be retained under `rawExtractedText`.
- **AI-Derived Interpretation**: Sub-topics, difficulty levels, and prerequisites generated by AI must have `isAiDerived: true`.
- **No Hallucinated Modules**: The AI parser must never insert extra syllabus units not present in the uploaded document.

---

## 8. Source Metadata Schema Implementation

All new data entries must conform to `SourceMetadata` defined in `src/types/verification.ts`:

```ts
import type { SourceMetadata } from '../types/verification';

export interface YourDataRecord {
  id: string;
  name: string;
  // ... other functional fields
  source: SourceMetadata;
}
```

### Complete SourceMetadata Reference:
```ts
interface SourceMetadata {
  sourceType: SourceType;           // 'OFFICIAL_UNIVERSITY', 'DEMO', etc.
  sourceName?: string;              // e.g. "MAKAUT R-25 Official Syllabus PDF"
  sourceUrl?: string;               // e.g. "https://makautwb.ac.in"
  sourceDocument?: string;          // e.g. "MAKAUT_CSE_R25_Syllabus_Vol1.pdf"
  academicYear?: string;            // e.g. "2024-2025"
  regulation?: string;              // e.g. "R-25 / AICTE Model"
  verifiedAt?: string;              // e.g. "2026-03-15"
  verifiedBy?: string;              // e.g. "VIDYA AI Academic Audit Team"
  verificationStatus: VerificationStatus; // 'VERIFIED' | 'PARTIALLY_VERIFIED' | 'DEMO'
  verificationNotes?: string;       // Context notes for auditors and judges
  isAiDerived?: boolean;            // True if synthesized by AI model
}
```

---

## 9. Automated Validation Prior to Merge

Before committing or adding any dataset to `src/data/`, run the automated validation utilities in `src/utils/dataVerification.ts`:

```ts
import { 
  validateSourceMetadata, 
  validateAcademicVersion, 
  validatePYQRecord, 
  validateFacultyRecord 
} from '../utils/dataVerification';

// Validate source metadata
const sourceResult = validateSourceMetadata(myRecord.source);
if (!sourceResult.isValid) {
  console.error(sourceResult.errors);
}

// Validate PYQ authenticity
const pyqResult = validatePYQRecord(myPYQ);
if (!pyqResult.isValid) {
  throw new Error(`PYQ rejected: ${pyqResult.errors.join(', ')}`);
}
```

### Mandatory CI/CD Verification Gates:
1. `npm run build`: Zero TypeScript errors (`tsc -b && vite build`).
2. `npm run lint`: Zero ESLint / Oxlint errors.
3. No duplicate IDs across university or course records.
4. No empty course codes or malformed URLs.

---

## 10. Summary Checklist for Contributors

- [ ] Is every factual claim supported by a Level 1 or Level 2 source?
- [ ] Is the composite academic version identifier specified (`Univ + Reg + Year + Sem + Branch + Code`)?
- [ ] Are prototype or mock values labeled `DEMO` with `isSimulatedMetrics: true`?
- [ ] Are AI-derived topics or predicted papers labeled with `isAiDerived: true`?
- [ ] Has the record been verified with `src/utils/dataVerification.ts`?
- [ ] Does `npm run build` pass with zero compiler warnings or errors?

---
*VIDYA AI Academic Integrity Standards — Built for SIH26043*

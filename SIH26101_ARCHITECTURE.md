# 🏗️ VIDYA AI — System Architecture Specification (SIH26101)
**Smart India Hackathon 2026** | Problem Statement: **SIH26101**  
**Core Initiative**: Ministry of Statistics & Programme Implementation (MoSPI) & iGOT Karmayogi  
**Document Status**: Baseline Foundation (Prompt 1 Complete)

---

## 1. High-Level Closed-Loop Architecture

The VIDYA AI system architecture is engineered around the **Closed-Loop Competency Remediation Cycle** for public administration and statistical officers:

```
┌────────────────────────────────────────────────────────────────────────┐
│               GOVERNMENT / STATISTICAL-SYSTEM LEARNER                   │
│         (Indian Statistical Service / Subordinate Statistical Service)  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        USER & ROLE PROFILER                            │
│           • Cadre & Designation     • Ministry & Department            │
│           • Current Assigned Role   • Mandatory Service Competencies   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    COMPETENCY PROFILE & MATRIX                         │
│           • National Accounts       • Price Indices (CPI / IIP)        │
│           • Survey Sampling (NSS)   • SDG National Indicators (NIF)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  DIAGNOSTIC SKILL ASSESSMENT ENGINE                    │
│           • Pre-Test Rubrics        • Procedural Formula Check         │
│           • Prerequisite DAG Search • Misconception Root Isolation     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    COMPETENCY GAP DETECTION ENGINE                     │
│           • Target vs Current Level Delta (ΔL = Level_req - Level_curr)│
│           • Upstream Prerequisite Bottlenecks                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                PERSONALIZED LEARNING RECOMMENDATION                    │
│           • Micro-Remediation Drills • High-Yield Official Readings    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│            iGOT KARMAYOGI INTEGRATION ADAPTER (BOUNDARY)               │
│           • Course Search & Catalog  • 1-Click Course Enrollment       │
│           • Competency Mapping       • Verified Module Progress        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   LEARNING & AI COGNITIVE RECALL                       │
│           • Grounded Socratic Study  • Ebbinghaus SM-2 Memory Twin     │
│           • Source PDF Annotations   • Verbal Viva Examiner            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                AI POST-ASSESSMENT & RE-EVALUATION                      │
│           • Scenario MCQs & Numericals • Step-Marking Derivations      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   UPDATED LEARNING PATH & AUDIT                        │
│           • Competency Progression   • iGOT Assessment Sync            │
│           • Retest & Stability Shift • Long-term Retention Lock        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Layer Breakdown

### A. Frontend Layer
- **Framework**: React 19 + Vite 8 + TypeScript.
- **Styling**: Tailwind CSS + Custom Design System tokens.
- **Micro-Interactions**: Framer Motion, Radix UI Dialog & Dropdowns, Sonner Toaster, Canvas Confetti.
- **Audio Synthesizer**: Web Audio API oscillator for 432Hz binaural focus beats.

### B. Backend & API Layer
- **Architecture**: Decoupled Serverless / Reverse Proxy ready.
- **Secret Isolation**: Sensitive keys (`GEMINI_API_KEY`) stay in server environment variables; client receives structured AI responses without direct access to cloud provider master credentials.
- **BYOK Support**: Client-side Bring-Your-Own-Key allowed with zero centralized logging for offline privacy.

### C. iGOT Karmayogi Integration Boundary
- **Location**: [`src/integrations/igot/`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/integrations/igot/).
- **Supported Operational Modes**:
  - `MOCK` (Default for local development & SIH offline evaluation): Realistic statistical competencies & courses with clear provenance labels.
  - `SANDBOX`: Connects to government staging environment with test bearer tokens.
  - `LIVE`: Production gateway integration (scheduled for Prompt 4).
  - `NOT_CONFIGURED`: Graceful fallback state with clear UI warning.
- **Contract**: [`IIGOTAdapter`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/integrations/igot/IGOTAdapter.ts) providing `getLearnerProfile()`, `searchCourses()`, `enrollInCourse()`, `syncAssessmentResult()`.

### D. Document Processing Pipeline
- **Validation**:
  - Strict MIME validation: `application/pdf`, `text/plain`, `text/markdown`.
  - File size cap: 15 MB enforced at browser and storage level.
  - Filename sanitization to prevent directory traversal and injection.
- **Text Extraction**:
  - Plain text streams extracted cleanly.
  - PDF files processed with page-level reference indexing rather than raw binary UTF-8 decoding.

### E. Database & Security Layer
- **Provider**: Google Cloud Firestore & Firebase Storage.
- **Access Control**: Enforced via root [`firestore.rules`](file:///Users/aryankumarshaw/Documents/vidya%20ai/firestore.rules) and [`storage.rules`](file:///Users/aryankumarshaw/Documents/vidya%20ai/storage.rules):
  - Owner-isolated: Learners can only read and write their own profile and memory twins.
  - Immutable audit logs: Assessment submissions cannot be overwritten or deleted.
  - Public writes unconditionally blocked.

---

## 3. External Dependency Status Matrix

| External Dependency | Current Status | Security Model | Fallback Mechanism |
| :--- | :--- | :--- | :--- |
| **iGOT Karmayogi API** | **`MOCK`** | Provider-agnostic adapter boundary | Mock adapter with MoSPI statistical competencies |
| **Google Gemini AI** | **`BYOK / PROXY`** | Server proxy ready; zero secret in client bundle | Honest `AI_UNAVAILABLE` message + verified question bank |
| **Cloud Firestore** | **`CONFIGURED`** | Owner-only security rules (`firestore.rules`) | Local storage memory twin sync |
| **Web Speech API** | **`BROWSER_NATIVE`** | Native browser sandbox | Clean manual typing prompt if unsupported |
| **Web Audio API** | **`BROWSER_NATIVE`** | Synthesizer in client memory | Silent focus timer |

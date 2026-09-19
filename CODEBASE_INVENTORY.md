# 📦 VIDYA AI — Existing Codebase Inventory
**SIH26101 Architectural Foundation Audit**  
**Classification Standard**: `KEEP` | `REFACTOR` | `REPLACE` | `DEPRECATE` | `DEMO_ONLY` | `REMOVE`

---

## 1. Core Architecture & Infrastructure Modules

| File / Module | Purpose | Current Implementation | SIH26101 Relevance | Real / Mock / Hardcoded | Security Risk | Recommended Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [`src/config/projectConfig.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/config/projectConfig.ts) | Central System Configuration | Single source of truth for problem ID, org, iGOT mode | **Direct (Core)** | Real | None | **`KEEP`** — Master config for SIH26101. |
| [`src/integrations/igot/`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/integrations/igot/) | iGOT Karmayogi Integration Adapter | Provider-agnostic adapter interface + Mock adapter | **Direct (Core)** | Real Interface + Truthful Mock | None | **`KEEP`** — Foundation for Prompt 4 iGOT integration. |
| [`src/services/geminiService.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/services/geminiService.ts) | Central AI Service | Gemini 1.5 Flash caller with proxy support & timeout | High | Real (Proxy/BYOK) + Rubric | Previously high (key exposure) → Now hardened | **`REFACTOR`** — Enhance in Prompt 2 with source grounding. |
| [`src/lib/firebase.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/lib/firebase.ts) | Firebase Client Auth & Firestore | Auth provider + Firestore sync helpers | Moderate | Real Client SDK | Low with new `firestore.rules` | **`KEEP`** — Maintain user auth and cloud synchronization. |
| [`firestore.rules`](file:///Users/aryankumarshaw/Documents/vidya%20ai/firestore.rules) | Database Security Rules | Enforces user-isolated read/write rules | **Critical** | Real | None | **`KEEP`** — Essential for data security. |
| [`storage.rules`](file:///Users/aryankumarshaw/Documents/vidya%20ai/storage.rules) | Document Storage Security Rules | Restricts file uploads to owner & 15MB safe types | **Critical** | Real | None | **`KEEP`** — Protects file uploads. |
| [`src/types/verification.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/types/verification.ts) | Data Provenance & Verification Types | Strict status types (VERIFIED, DEMO, MOCK, LIVE) | High | Real | None | **`KEEP`** — Enforces zero-hallucination data standard. |

---

## 2. Interactive Feature Components

| Component | Purpose | Current Implementation | SIH26101 Relevance | Real / Mock / Hardcoded | Security Risk | Recommended Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [`DoubtSolver.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/DoubtSolver.jsx) | AI Doubt Resolution & Derivations | Interactive math solver with sample bank & live AI | Moderate | Real AI / Sample Bank | Low | **`REFACTOR`** — Align with statistical concepts in Prompt 2. |
| [`SmartPDFViewer.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/SmartPDFViewer.jsx) | Document Reader & AI Annotation | Document viewer with safe MIME check and excerpt explanation | High | Real Text + Structured PDF | Low | **`REFACTOR`** — Integrate with official gazettes & training manuals in Prompt 3. |
| [`VivaExaminer.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/VivaExaminer.jsx) | Verbal Voice / Viva Examination | Speech synthesis + Web Speech API + keyword rubric | Moderate | Real Web Speech + Rubric | Low | **`REFACTOR`** — Transition to competency oral assessment in Prompt 5. |
| [`MockTestEngine.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/MockTestEngine.jsx) | Examination & CBT Simulator | Multi-stream CBT engine (MCQ scoring + subjective rubrics) | Moderate | Real Engine + Static Pools | Low | **`KEEP`** — Retain as standardized assessment engine for testing competencies. |
| [`AgentSwarm.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/AgentSwarm.jsx) | Cognitive Pipeline Execution | Visual animated 5-step cognitive pipeline | Low | Simulated UI Animation | Low | **`DEMO_ONLY`** — Rebuild with real autonomous workflow in Prompt 5. |
| [`ConceptGraph.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/ConceptGraph.jsx) | Prerequisite Knowledge DAG | Interactive 13-node Linear Algebra graph | High (Graph concept) | Hardcoded Nodes | Low | **`REFACTOR`** — Map to MoSPI competency graph in Prompt 3. |
| [`DigitalTwin.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/DigitalTwin.jsx) | Ebbinghaus Memory Retention Twin | SM-2 half-life retention calculator | High | Real Math (SM-2) | Low | **`KEEP`** — Essential for learner decay tracking. |
| [`FocusRoom.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/FocusRoom.jsx) | 432Hz Pomodoro Focus Room | Web Audio API binaural synthesizer + timer | Low | Real Web Audio | None | **`KEEP`** — Universal productivity utility. |
| [`FlashcardStudio.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/FlashcardStudio.jsx) | Spaced Repetition 3D Cards | 3D Flip flashcards with SuperMemo SM-2 | Moderate | Real Math / Local State | None | **`KEEP`** — Active recall learning tool. |
| [`WeaknessHeatmap.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/WeaknessHeatmap.jsx) | Syllabus Mastery Diagnostic | Visual bar charts of chapter confidence | High | Static Data Array | Low | **`REFACTOR`** — Connect to real competency diagnostic in Prompt 2. |
| [`PublicApiHub.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/PublicApiHub.jsx) | Academic Paper / Book Catalog | Filterable resource library | Moderate | Static Data Array | Low | **`REFACTOR`** — Connect to live Open Alex / arXiv / MoSPI publications. |
| [`DeckStudio.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/DeckStudio.jsx) | Hackathon Pitch Deck Viewer | 10-slide interactive presentation viewer | Low (Demo) | Static Deck Data | None | **`DEMO_ONLY`** — Retain for pitch presentation. |

---

## 3. Legacy University Hub Modules

| Component | Purpose | Current Implementation | SIH26101 Relevance | Real / Mock / Hardcoded | Security Risk | Recommended Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [`CollegeHubView.tsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/collegeHub/CollegeHubView.tsx) | Pan-India University Hub | Master hub for university syllabi & blueprints | Low | Real Registry + Demo Faculty | Low | **`LEGACY`** — Preserve for engineering transition; isolate from core MoSPI flow. |
| [`UniversityFacultyFinder.tsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/collegeHub/UniversityFacultyFinder.tsx) | Topic-Accredited Faculty Discovery | Topic search matching mock professors | Low | Simulated Faculty Directory | Low | **`DEMO_ONLY`** — Retained with explicit demo provenance badge. |
| [`PyqPredictorVault.tsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/collegeHub/PyqPredictorVault.tsx) | PYQ Predictor & Paper Vault | 4 predicted university exam papers | Low | Static Database Array | Low | **`LEGACY`** — Retain under legacy tab. |
| [`BtechSemesterAnalyzer.tsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/collegeHub/BtechSemesterAnalyzer.tsx) | University Syllabus & PYQ Browser | Comprehensive semester curriculum viewer | Low | Real Curricula Dataset | Low | **`LEGACY`** — Retained for academic review. |

---

## 4. Summary of Decisions
- **Total Modules Audited**: 24
- **KEEP**: 9 modules
- **REFACTOR**: 8 modules (Scheduled across Prompts 2–5)
- **LEGACY**: 4 modules (Maintained for backward compatibility and demonstration)
- **DEMO_ONLY**: 3 modules (Explicitly labeled in UI with provenance badges)
- **REPLACE / REMOVE**: 0 (No premature deletion of useful code)

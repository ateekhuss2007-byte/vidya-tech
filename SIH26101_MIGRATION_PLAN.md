# 🗺️ VIDYA AI — SIH26101 Phased Migration Plan
**Roadmap for Prompts 2 through 7**  
**Foundation Phase**: Prompt 1 Completed

---

## 1. Phased Migration Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│ PROMPT 1: Foundation Reset, Security Hardening & iGOT Adapter Boundary  │  [COMPLETED]
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ PROMPT 2: MoSPI Learner Profiling & Competency Gap Diagnostic Engine    │
│ • User / Role profile with Indian Statistical Service (ISS) cadres      │
│ • Baseline diagnostic assessments with gap detection formula (ΔL)       │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ PROMPT 3: Source-Grounded Document Engine & Statistical Knowledge Graph │
│ • Ingestion of MoSPI official manuals, NSSTA guidelines, SDG frameworks │
│ • Dynamic prerequisite DAG for statistical methods                      │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ PROMPT 4: Full iGOT Karmayogi Course Recommendation & Enrollment Engine │
│ • Implementation of live iGOT API contracts and course catalogue sync   │
│ • 1-Click course dispatch and enrollment tracking                       │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ PROMPT 5: Post-Learning Assessment, Verbal Viva & Adaptive Re-Testing   │
│ • Competency-aligned MCQ and numerical scenario generation              │
│ • Oral viva voice examiner tuned to public statistical standards        │
│ • SM-2 Memory Twin calibrated to official training half-lives           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ PROMPT 6: Enterprise Analytics, NAAC/OBE/Civil Service Capacity Reports │
│ • Institutional dashboards for Ministry leadership and Deans            │
│ • Exportable PDF capacity building audit trails                         │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ PROMPT 7: Final Polish, Security Audit & Jury Presentation Mode         │
│ • High-impact demonstration flows for SIH national jury                 │
│ • Final performance optimization and edge-case regression tests         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Granular Module Migration Schedule

### Phase 1: KEEP NOW (Active in Prompt 1)
- [`src/config/projectConfig.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/config/projectConfig.ts) — Master SIH26101 config.
- [`src/integrations/igot/`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/integrations/igot/) — Core iGOT adapter boundary (`IIGOTAdapter`, `IGOTMockAdapter`, types, config).
- [`firestore.rules`](file:///Users/aryankumarshaw/Documents/vidya%20ai/firestore.rules) & [`storage.rules`](file:///Users/aryankumarshaw/Documents/vidya%20ai/storage.rules) — Access control security.
- [`src/services/geminiService.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/services/geminiService.ts) — Hardened AI service with zero misleading fallbacks.
- [`src/components/FocusRoom.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/FocusRoom.jsx) — Pomodoro focus audio utility.
- [`src/components/FlashcardStudio.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/FlashcardStudio.jsx) — SM-2 flashcard recall studio.
- [`src/components/DigitalTwin.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/DigitalTwin.jsx) — Ebbinghaus memory twin retention model.

### Phase 2: REFACTOR IN PROMPT 2 (Competency Profiling & Gap Detection)
- [`src/components/WeaknessHeatmap.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/WeaknessHeatmap.jsx) — Transform chapter mastery heatmap into MoSPI Officer Competency Gap Matrix.
- [`src/components/Dashboard.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/Dashboard.jsx) — Add statistical cadre profiles, assigned ministry roles, and competency target progress.

### Phase 3: REFACTOR IN PROMPT 3 (Grounded Ingestion & Knowledge DAG)
- [`src/components/SmartPDFViewer.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/SmartPDFViewer.jsx) — Connect to official statistical manuals (NAS, CPI, NSS) with page-level quote citations.
- [`src/components/ConceptGraph.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/ConceptGraph.jsx) — Expand 13-node graph into dynamic MoSPI Statistical Methodology DAG.

### Phase 4: REBUILD IN PROMPT 4 (Official iGOT Integration)
- [`src/integrations/igot/IGOTAdapter.ts`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/integrations/igot/IGOTAdapter.ts) — Implement live sandbox gateway calls, OAuth2 / API key negotiation.
- [`src/components/collegeHub/UniversityFacultyFinder.tsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/collegeHub/UniversityFacultyFinder.tsx) — Transform legacy faculty finder into **iGOT Course & Faculty Mentor Directory**.

### Phase 5: REBUILD IN PROMPT 5 (AI Assessment & Oral Viva)
- [`src/components/VivaExaminer.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/VivaExaminer.jsx) — Transition from academic CS viva to Public Administration & Statistical Assessment Viva.
- [`src/components/AgentSwarm.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/AgentSwarm.jsx) — Replace mock simulation animation with real multi-agent evaluation orchestrator.

### Phase 6: REBUILD IN PROMPT 6 (Analytics & Reporting)
- [`src/components/analytics/AnalyticsView.tsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/analytics/AnalyticsView.tsx) — Executive ministry reports, cohort gap tracking, and training audit trails.

### Phase 7: FINALIZE IN PROMPT 7 (Jury Presentation)
- [`src/components/DeckStudio.jsx`](file:///Users/aryankumarshaw/Documents/vidya%20ai/src/components/DeckStudio.jsx) — Update pitch deck slides to reflect SIH26101, MoSPI metrics, and live demo steps.

### Legacy Transition: DEPRECATE (Post-Hackathon)
- Pure university PYQ predictor (`PyqPredictorVault.tsx`) and university semester selector (`BtechSemesterAnalyzer.tsx`) will be phased into an optional academic archive module.

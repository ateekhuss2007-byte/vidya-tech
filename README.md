# 🎓 VIDYA AI — Cognitive Learning, Remediation & Semantic Teacher Discovery Engine

<p align="center">
  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80" alt="VIDYA AI Banner" width="100%" style="border-radius: 12px;" />
</p>

<p align="center">
  <strong>Smart India Hackathon (SIH) | Problem Statement ID: SIH1431</strong><br/>
  <em>"Online personalized learning remediation/tutoring tool. Search for best teacher for specific topics."</em><br/>
  <strong>Ministry of Education, Government of India</strong>
</p>

<p align="center">
  <a href="#-problem-understanding--real-world-need"><img src="https://img.shields.io/badge/SIH_Problem_ID-SIH1431-blue?style=for-the-badge&logo=gov" alt="SIH 1431" /></a>
  <a href="#-core-pillars--feature-suite"><img src="https://img.shields.io/badge/Exam_Simulators-32%2B_Official_Patterns-0055FE?style=for-the-badge" alt="32+ Exam Patterns" /></a>
  <a href="#-mathematical-formulation--core-algorithms"><img src="https://img.shields.io/badge/Retention_Engine-SuperMemo_SM--2-00C853?style=for-the-badge" alt="SuperMemo SM-2" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Stack-React_19_%7C_Vite_8_%7C_Tailwind-61DAFB?style=for-the-badge&logo=react" alt="React 19" /></a>
  <a href="#-license"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" /></a>
</p>

---

## 📖 Table of Contents
1. [🎯 Executive Summary & Mission](#-executive-summary--mission)
2. [🚨 Problem Understanding & Real-World Need (SIH1431)](#-problem-understanding--real-world-need-sih1431)
3. [💡 The VIDYA AI Solution (Closed-Loop Cognitive Remediation)](#-the-vidya-ai-solution-closed-loop-cognitive-remediation)
4. [🌟 Core Pillars & Comprehensive Feature Suite](#-core-pillars--comprehensive-feature-suite)
   - [1. Semantic Teacher Discovery Engine (SIH1431 Core)](#1-semantic-teacher-discovery-engine-sih1431-core)
   - [2. 24/7 AI Instant Doubt Solver & Academic Derivations](#2-247-ai-instant-doubt-solver--academic-derivations)
   - [3. Official Pattern Mock Test Engine (32+ Exam Patterns)](#3-official-pattern-mock-test-engine-32-exam-patterns)
   - [4. Concept Graph & Prerequisite Knowledge DAG](#4-concept-graph--prerequisite-knowledge-dag)
   - [5. Digital Memory Twin & Spaced Repetition (SM-2)](#5-digital-memory-twin--spaced-repetition-sm-2)
   - [6. AI Lab Viva Voice Examiner](#6-ai-lab-viva-voice-examiner)
   - [7. University College Hub & PYQ Predictor Vault](#7-university-college-hub--pyq-predictor-vault)
   - [8. Smart PDF Viewer & Socratic Annotator](#8-smart-pdf-viewer--socratic-annotator)
   - [9. AI Weakness Diagnostic Radar & 10-Q Fix Drills](#9-ai-weakness-diagnostic-radar--10-q-fix-drills)
   - [10. 432Hz Pomodoro Focus Room](#10-432hz-pomodoro-focus-room)
   - [11. Multi-Agent Swarm & Public API Playground](#11-multi-agent-swarm--public-api-playground)
5. [📐 Mathematical Formulation & Core Algorithms](#-mathematical-formulation--core-algorithms)
6. [🏗️ System Architecture & Data Flow](#️-system-architecture--data-flow)
7. [📁 Repository Structure](#-repository-structure)
8. [📊 Exam Patterns Supported](#-exam-patterns-supported)
9. [⚡ Getting Started & Local Setup](#-getting-started--local-setup)
10. [🇮🇳 Alignment with NEP 2020 & UN SDGs](#-alignment-with-nep-2020--un-sdgs)
11. [👥 Team & Acknowledgements](#-team--acknowledgements)
12. [📄 License](#-license)

---

## 🎯 Executive Summary & Mission

**VIDYA AI** is an intelligent cognitive learning, personalized remediation, and semantic teacher discovery operating system designed to bridge the fundamental gap between curriculum requirements and student comprehension. 

Developed directly for **Ministry of Education's Smart India Hackathon (Problem Statement SIH1431)**, VIDYA AI eliminates the "one-size-fits-all" model of education. Instead of forcing students through generic 40-minute video searches or expensive ₹50,000 yearly coaching bundles, VIDYA AI isolates learning breakdowns down to the **atomic concept level** (e.g., *Eigenvalue Matrix Diagonalization*, *Recursion Stack Frames*, or *Optical Isomerism*), provides instant grounded step-by-step remediation, and dynamically matches students with the **verified best teacher for that exact micro-topic**.

---

## 🚨 Problem Understanding & Real-World Need (SIH1431)

### The Underlying Educational Crisis
In modern school and higher education across India:
- **Over 26.5 Crore (265 Million) school students** and **4.3 Crore (43 Million) university learners** face conceptual bottlenecks.
- **72% of STEM students** drop out or score poorly not because an entire subject is difficult, but because of **2 or 3 unresolved prerequisite misconceptions** that cascade through later chapters (*Source: National Education Survey / UNESCO*).
- Learners in **Tier-2, Tier-3, and rural institutions** lack access to top-tier coaching institutes and 1-on-1 pedagogical interventions.

### Why Current Solutions Fail

| Existing Approach | Core Deficiency | Why VIDYA AI Wins |
| :--- | :--- | :--- |
| **YouTube / Open Web** | Unfiltered firehose; 35–45 minutes wasted per doubt; zero curriculum tracking; heavy distractions. | **$< 3$s semantic lookup** directly mapped to AICTE/CBSE/University syllabus. |
| **Traditional EdTech** | Sells rigid ₹30,000–₹60,000 yearly packages; tutors indexed by broad subject ("Physics"), not micro-concept specialties. | **Micro-tutoring & atomic topic badges** ($S_t$ affinity algorithm); zero barrier to entry. |
| **Generic Chatbots (ChatGPT)** | Prone to mathematical hallucinations; lacks official university step-marking rubrics; zero human escalation. | **Deterministically grounded derivations** with KaTeX, trap warnings, and 1-click teacher booking. |

---

## 💡 The VIDYA AI Solution (Closed-Loop Cognitive Remediation)

VIDYA AI implements a **Closed-Loop Cognitive Feedback Architecture**:

```
                  ┌────────────────────────────────────────┐
                  │    Student Input / Diagnostic Test     │
                  │   (Doubt Image, Topic, or Mock Paper)  │
                  └──────────────────┬─────────────────────┘
                                     │
                                     ▼
                  ┌────────────────────────────────────────┐
                  │      Prerequisite Knowledge DAG        │
                  │    & Misconception Diagnosis Engine    │
                  └──────────────────┬─────────────────────┘
                                     │
                 ┌───────────────────┴────────────────────┐
                 ▼                                        ▼
    [ Tier 1: Instant AI Remediation ]       [ Tier 2: Topic-Specialist Teacher Match ]
    • Step-by-Step KaTeX Derivations          • Multi-Factor Affinity Formula ($S_t$)
    • Common Trap Warnings                    • Topic-Specific Accreditations
    • Visual Code / Geometrical Intuition     • Curated Video Masterclass Timestamps
    • Deterministic Sanity Checks             • On-Demand 10-Minute Micro-Doubt Sessions
                 │                                        │
                 └───────────────────┬────────────────────┘
                                     │
                                     ▼
                  ┌────────────────────────────────────────┐
                  │  Adaptive Re-Test & Verification Quiz  │
                  └──────────────────┬─────────────────────┘
                                     │
                                     ▼
                  ┌────────────────────────────────────────┐
                  │    Digital Memory Twin & SM-2 Engine   │
                  │  (Spaced Repetition & Decay Tracking)  │
                  └────────────────────────────────────────┘
```

---

## 🌟 Core Pillars & Comprehensive Feature Suite

### 1. 👨‍🏫 Semantic Teacher Discovery Engine (SIH1431 Core)
- **Atomic Topic Accreditations**: Rather than rating teachers broadly across "Computer Science" or "Mathematics", educators are accredited with **Topic Badges** (e.g., *Elite Specialist in Dynamic Programming Tree Rerooting*, *Master of Organic Reaction Mechanisms*).
- **Multi-Factor Topic Affinity Algorithm ($S_t$)**: Ranks educators mathematically based on concept specialty, pedagogical style, student rating in that exact sub-topic, doubt clearance velocity, and vernacular language compatibility.
- **10-Minute Micro-Tutoring Sessions**: Low-friction 1-on-1 booking for stubborn doubts without subscriptions.
- **Curated Educational Video Timestamps**: Integrates high-yield timestamped masterclasses from NPTEL, Swayam, and top YouTube educators.

### 2. 📸 24/7 AI Instant Doubt Solver & Academic Derivations
- **Multimodal OCR & Formula Parser**: Upload textbook snapshots, handwritten problems, or type complex LaTeX equations.
- **Academic Derivation Structure**:
  - **Prerequisite Concept Identification**: Clarifies which theorem or axiom governs the problem.
  - **Step-by-Step Proof**: Fully rendered in beautiful KaTeX mathematical typography.
  - **Exam Traps to Avoid**: Highlights the exact calculation errors and sign mistakes where students lose marks.
  - **Sanity Verification Check**: Runs sanity checks (e.g., dimensional analysis or boundary condition tests).
  - **Related PYQs**: Recommends similar questions asked in past university and competitive exams.

### 3. 📝 Official Pattern Mock Test Engine (32+ Exam Patterns)
- **Authentic Computer-Based Test (CBT) Interface**: True-to-life exam screen with question palettes, section switches, timers, mark-for-review, and instant response recording.
- **Rigorous Examination Marking Rules**:
  - **B.Tech (MAKAUT / Autonomous University)**: 70-Mark End-Semester papers with Group A (10×1M MCQs), Group B (3×5M Short Answer), Group C (3×15M Long Derivations).
  - **NTA JEE Main**: 300-Mark official pattern with Physics, Chemistry, Maths; Section A MCQs (+4/-1) and Section B Numerical Integer inputs.
  - **GATE 2027**: 100-Mark IIT pattern with General Aptitude, Engineering Mathematics, and Technical Core with negative marking (-1/3 & -2/3).
  - **SSC CGL (Tier-1)**: 200-Mark CBT simulation (+2 / -0.5) covering Reasoning, GA, Quant, and English.
  - **CBSE Class 10 & 12**: 80-Mark Board model papers with official step-by-step rubrics.
  - **BCA / MCA Semester Papers**: University patterns with programming, data structures, and database schemas.

### 4. 🕸️ Concept Graph & Prerequisite Knowledge DAG
- **Interactive Visual Topology**: Explore topics as a Directed Acyclic Graph (DAG) of prerequisites.
- **Root Cause Isolation**: When a student fails a problem in *Fourier Transforms*, the graph identifies whether the breakdown stems from *Integration by Parts* or *Complex Numbers*.

### 5. 🧠 Digital Memory Twin & Spaced Repetition (SM-2)
- **Ebbinghaus Forgetting Curve Modeling**: Models each student's memory retention mathematically ($R = e^{-t/S}$) and triggers proactive revision before retention drops below 65%.
- **Anki-Style 3D Flip Flashcard Studio**: Spatially animated cards with official SuperMemo SM-2 rating buttons (*Again, Hard, Good, Easy*).

### 6. 🎙️ AI Lab Viva Voice Examiner
- **Speech-Enabled Viva Room**: Simulates real college laboratory oral examinations.
- **Real-Time Academic Grading**: Listens to student explanations via Web Speech API, analyzes technical depth, and poses progressive counter-questions.

### 7. 🏛️ University College Hub & PYQ Predictor Vault
- **MAKAUT / Autonomous University Database**: Complete 8-semester syllabus breakdown across CSE, IT, ECE, EE, ME, and Civil engineering.
- **Previous Years Question (PYQ) Vault**: Year-wise categorized question papers.
- **AI Exam Predictor**: Analyzes historical frequency distributions to forecast high-probability questions for upcoming semester exams.

### 8. 📄 Smart PDF Viewer & Socratic Annotator
- **In-App Document Reader**: Seamlessly displays college study notes, semester modules, and reference books.
- **Highlight-to-Explain**: Highlight any definition, proof, or code snippet to trigger instant Socratic explanations and exam revision tips.

### 9. 🎯 AI Weakness Diagnostic Radar & 10-Q Fix Drills
- **Chapter-Level Health Heatmap**: Color-coded proficiency status:
  - 🟢 **Strong** ($\ge 80\%$)
  - 🟡 **Moderate** ($60\% - 79\%$)
  - 🔴 **Critical Gap** ($< 60\%$)
- **1-Click 10-Q Fix Drill**: Automatically synthesizes a targeted 10-question remedial drill focusing solely on weak prerequisites.

### 10. ⏱️ 432Hz Pomodoro Focus Room
- **Alpha Wave Soundscapes**: Built-in 432Hz binaural audio generator engineered for deep cognitive focus and stress reduction during high-intensity study sprints.

### 11. 🤖 Multi-Agent Swarm & Public API Playground
- **Specialized Collaborative Agents**:
  - *Derivation Specialist Agent*: Generates rigorous mathematical proofs.
  - *Pedagogy Tutor Agent*: Explains intuitive real-world analogies.
  - *Examiner Agent*: Formulates challenging trick questions.
  - *Concept Diagnostician*: Isolates underlying prerequisite gaps.
- **OpenAPI / Public API Hub**: Exposes standardized REST endpoints for colleges, LMS platforms, and educational institutions.

---

## 📐 Mathematical Formulation & Core Algorithms

### 1. Multi-Factor Topic Affinity Score ($S_t$)
Used by the **Semantic Teacher Discovery Engine** to rank teachers for any topic $t$:

$$S_t(\text{Teacher}, \text{Student}) = w_1 \cdot \mathcal{E}_{\text{topic}} + w_2 \cdot \mathcal{P}_{\text{style}} + w_3 \cdot \mathcal{R}_{\text{topic}} + w_4 \cdot \mathcal{V}_{\text{clearance}} + w_5 \cdot \mathcal{L}_{\text{lang}}$$

Where:
- $\mathcal{E}_{\text{topic}}$: **Atomic Concept Specialty** (Teacher's proven student score improvement in that specific sub-topic).
- $\mathcal{P}_{\text{style}}$: **Pedagogical Alignment** (Visual vs. Analytical vs. PYQ-Exam-Oriented match).
- $\mathcal{R}_{\text{topic}}$: **Topic-Specific Rating** (Granular student review for that topic, avoiding broad subject bias).
- $\mathcal{V}_{\text{clearance}}$: **Doubt Clearance Velocity** (Average minutes to resolve a roadblock).
- $\mathcal{L}_{\text{lang}}$: **Linguistic Match** (Vernacular medium alignment: Hindi, English, Bengali, Tamil, etc.).

### 2. SuperMemo SM-2 Spaced Repetition Algorithm
Computes the next review interval $I(n)$ and Easiness Factor ($EF$):

$$EF' = EF + (0.1 - (5 - q) \cdot (0.08 + (5 - q) \cdot 0.02))$$

$$I(1) = 1, \quad I(2) = 6, \quad I(n) = I(n-1) \cdot EF'$$

Where $q \in [0, 5]$ is the student's active recall self-assessment score.

### 3. Ebbinghaus Memory Retention Curve
Used by the **Digital Memory Twin**:

$$R(t) = e^{-\frac{t}{S}}$$

Where $R$ is memory retention, $t$ is elapsed time since last review, and $S$ is memory stability determined by past successful recalls.

---

## 🏗️ System Architecture & Data Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER (Client PWA)                    │
│   React 19  │  Vite 8  │  TypeScript  │  Tailwind CSS  │ Framer Motion │
│   KaTeX Formula Engine  │  Lucide Icons  │  Radix UI  │ Sonner Toasts  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS / REST / WebSockets
┌───────────────────────────────────▼────────────────────────────────────┐
│                    APPLICATION GATEWAY & STATE LAYER                   │
│   Client-side Navigation Engine  │  Speech Recognition Web API         │
│   Theme Management (Dark/Light)  │  LocalStorage Persistence           │
└──────────────────┬────────────────────────────────┬────────────────────┘
                   │                                │
┌──────────────────▼───────────────┐ ┌──────────────▼────────────────────┐
│  REMEDIATION & DIAGNOSTIC CORE   │ │     TOPIC-TEACHER ENGINE          │
│  • Prerequisite DAG Traversal    │ │  • Topic Affinity Calculation     │
│  • Step Derivation Formulator    │ │  • Pedagogical Match Score        │
│  • Common Pitfall Generator      │ │  • Micro-Session Scheduler        │
│  • KaTeX Proof Formatter         │ │  • Curated Timestamp Extractor   │
└──────────────────┬───────────────┘ └──────────────┬────────────────────┘
                   │                                │
┌──────────────────▼────────────────────────────────▼────────────────────┐
│                   CURRICULUM & KNOWLEDGE DATA REPOSITORY               │
│  • AICTE R25 Engineering Taxonomy (8 Semesters, All Branches)          │
│  • 32+ Standardized Examination Rubrics (JEE, GATE, MAKAUT, SSC, CBSE) │
│  • Year-Wise Previous Exam Papers (PYQs) & High-Yield Predictions      │
│  • Teacher Topic Badges, Masterclass Metadata & Student Telemetry      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```
vidya-ai/
├── public/                       # Static public assets, icons, logos
├── src/
│   ├── assets/                   # Vector graphics, illustrations, brand media
│   ├── components/               # Core application modules & screens
│   │   ├── collegeHub/           # MAKAUT/B.Tech syllabus & PYQ predictor vault
│   │   │   ├── BtechSemesterAnalyzer.tsx
│   │   │   ├── BtechStudyMaterialView.tsx
│   │   │   ├── CollegeHubView.tsx
│   │   │   ├── PyqPredictorVault.tsx
│   │   │   ├── TopicDeepDiveSection.tsx
│   │   │   └── TopicNotesModal.tsx
│   │   ├── dashboard/            # Cockpit widgets & skeleton loaders
│   │   ├── doubtSolver/          # 24/7 AI OCR & step-by-step proof engine
│   │   ├── testEngine/           # CBT examination simulation components
│   │   ├── ui/                   # Reusable UI primitives (Radix UI, Dialogs)
│   │   ├── AgentSwarm.jsx        # Multi-agent collaborative reasoning room
│   │   ├── ConceptGraph.jsx      # Prerequisite Knowledge DAG visualization
│   │   ├── Dashboard.jsx         # Main student progress dashboard
│   │   ├── DeckStudio.jsx        # SIH1431 interactive pitch deck studio
│   │   ├── DigitalTwin.jsx       # Ebbinghaus cognitive memory twin
│   │   ├── DoubtSolver.jsx       # Instant academic doubt resolution
│   │   ├── EducatorRadar.jsx     # Semantic teacher discovery (SIH1431)
│   │   ├── FlashcardStudio.jsx   # 3D spatial SM-2 flashcard recall studio
│   │   ├── FocusRoom.jsx         # 432Hz Pomodoro alpha wave study room
│   │   ├── HomePage.jsx          # Luminous hero landing page & value prop
│   │   ├── MockTestEngine.jsx    # Full CBT simulator (32+ exam patterns)
│   │   ├── Navbar.jsx            # Responsive navigation & search palette trigger
│   │   ├── PublicApiHub.jsx      # Developer API playground & documentation
│   │   ├── SmartPDFViewer.jsx    # PDF annotator & highlight-to-explain
│   │   ├── VivaExaminer.jsx      # Voice-enabled lab viva examiner
│   │   └── WeaknessHeatmap.jsx   # Diagnostic health radar & 10-Q fix drill
│   ├── data/                     # Curated academic data repositories
│   │   ├── btechSemesterSyllabusData.ts  # Full 8-semester engineering syllabus
│   │   ├── examPatterns.js              # 32+ official examination patterns
│   │   ├── mockPaperDatabase.js         # Comprehensive mock question bank
│   │   ├── predictedPapersDatabase.ts   # Predicted exam papers & trends
│   │   ├── r25CurriculumDatabase.ts     # AICTE R25 model curriculum
│   │   └── topicNotesDatabase.ts        # Comprehensive topic revision notes
│   ├── lib/                             # Utilities & Tailwind helpers (`cn`)
│   ├── App.jsx                          # Primary router & tab synchronization
│   ├── index.css                        # Glassmorphism design tokens & styles
│   └── main.tsx                         # React entrypoint
├── package.json                         # Project dependencies & npm scripts
├── tailwind.config.js                   # Custom design system configuration
├── tsconfig.json                        # TypeScript configuration
└── vite.config.ts                       # Vite build & bundle configuration
```

---

## 📊 Exam Patterns Supported

| Examination | Total Marks | Duration | Official Marking Pattern | Sectional Composition |
| :--- | :--- | :--- | :--- | :--- |
| **B.Tech End-Sem (MAKAUT / Univ.)** | 70 Marks | 180 Mins | Step-marking rubrics | Group A (10×1M), Group B (3×5M), Group C (3×15M) |
| **GATE (IIT Official)** | 100 Marks | 180 Mins | +1 / -0.33 & +2 / -0.66 | General Aptitude (15M), Engg Maths (13M), Core (72M) |
| **NTA JEE Main** | 300 Marks | 180 Mins | +4 / -1 (MCQ & Int) | Physics (100M), Chemistry (100M), Mathematics (100M) |
| **SSC CGL (Tier-1)** | 200 Marks | 60 Mins | +2.0 / -0.50 | Reasoning (50M), GA (50M), Quant (50M), English (50M) |
| **CBSE Class 12 Board** | 80 Marks | 180 Mins | Step-by-step rubrics | Section A (MCQ), B (VSA), C (SA), D (LA), E (Case) |
| **CBSE Class 10 Board** | 80 Marks | 180 Mins | Step-by-step rubrics | Competency-based MCQs, Short & Long Answers |
| **BCA / MCA Semester** | 70 Marks | 180 Mins | University rubrics | Programming, Data Structures, Database Design |

---

## ⚡ Getting Started & Local Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm`, `yarn`, or `pnpm`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aryanshaw421-alt/VIDYA-AI.git

# 2. Navigate into the project directory
cd VIDYA-AI

# 3. Install project dependencies
npm install

# 4. Start the local development server
npm run dev
```

The application will launch on `http://localhost:5173`.

### Production Build & Preview

```bash
# Compile TypeScript and bundle with Vite
npm run build

# Preview the production bundle locally
npm run preview
```

### Keyboard Shortcuts
- **Open Command Palette / Search**: <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>Cmd</kbd> + <kbd>K</kbd> on macOS)
- **Navigate Views**: Use top navigation bar or quick links from the homepage.

---

## 🇮🇳 Alignment with NEP 2020 & UN SDGs

### National Education Policy (NEP 2020)
- **Section 4.3 (Concept-Based Learning)**: Replaces rote memorization with prerequisite diagnostic tracing and step-by-step derivations.
- **Section 23 & 24 (Technology in Education)**: Democratizes access to high-quality micro-tutoring and AI pedagogy in regional Indian languages.
- **PARAKH Mandate**: Criterion-referenced continuous assessment with All-India percentile prediction.

### United Nations Sustainable Development Goals (SDGs)
- **SDG 4 (Quality Education)**: Bridges educational quality disparity between elite metro colleges and rural/Tier-3 institutions.
- **SDG 10 (Reduced Inequalities)**: Unlocks premier 1-on-1 pedagogical mentorship without expensive tuition barriers.

---

## 👥 Team & Acknowledgements

**Team AUTHENTIX** — Smart India Hackathon (SIH1431)
- **Aryan Kumar Shaw** — Team Lead & Full-Stack Architect
- Built with dedication for the **Ministry of Education, Government of India**.

---

## 📄 License

This project is open source and available under the **[MIT License](LICENSE)**.

<p align="center">
  <strong>VIDYA AI — Transforming Education with Cognitive Precision.</strong><br/>
  Made with ❤️ in India.
</p>

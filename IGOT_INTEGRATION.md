# VIDYA AI — SIH26101: iGOT Karmayogi Integration Manual

**System**: VIDYA AI (Cognitive Learning Intelligence System)  
**Problem Statement**: SIH26101 | Ministry of Statistics and Programme Implementation (MoSPI)  
**Target Cadres**: Indian Statistical Service (ISS) & Subordinate Statistical Service (SSS)  
**Operational Modes**: `LIVE`, `SANDBOX`, `MOCK`, `NOT_CONFIGURED`

---

## 1. Official Documentation & Architecture Baseline

The iGOT Karmayogi integration in VIDYA AI adheres strictly to the **National Programme for Civil Services Capacity Building (Mission Karmayogi)** and the open architecture of **Project Sunbird**:

- **Platform Authority**: Karmayogi Bharat Special Purpose Vehicle (SPV) / DoPT.
- **Underlying Engine**: Project Sunbird (Sunbird Lern for LMS/batches, Sunbird Knowlg for content, Sunbird ED for portal UI, Sunbird RC for registries).
- **Competency Framework**: **FRAC (Framework for Roles, Activities, and Competencies)** defining behavioral, functional, and domain competencies for government positions.
- **Reference Precedents**: The SPARROW (Smart Performance Appraisal Report Recording Online Window) ↔ iGOT API linkage established by NIC for APAR integration.

---

## 2. Actual Integration Mechanism: Hexagonal Adapter Architecture

VIDYA AI isolates all external integration logic through a **Hexagonal / Ports-and-Adapters** design pattern. The core recommendation and cognitive engines never interact directly with external HTTP primitives:

```text
                  ┌────────────────────────────────────────────────────────┐
                  │                 VIDYA AI Adaptive Core                 │
                  │ (Competency Assessment • Gap Analysis • Recommendations)│
                  └───────────────────────────┬────────────────────────────┘
                                              │
                                              ▼
                                ┌───────────────────────────┐
                                │        IGOTService        │
                                │  (Adaptive Loop Manager)  │
                                └─────────────┬─────────────┘
                                              │
                                              ▼
                                ┌───────────────────────────┐
                                │        IIGOTAdapter       │
                                │    (Contract / Interface) │
                                └──────┬─────────────┬──────┘
                                       │             │
                    ┌──────────────────┘             └──────────────────┐
                    ▼                                                   ▼
     ┌─────────────────────────────┐                     ┌─────────────────────────────┐
     │       IGOTLiveAdapter       │                     │       IGOTMockAdapter       │
     │      (LIVE / SANDBOX)       │                     │           (MOCK)            │
     │  Sunbird REST API Engine    │                     │  Realistic MoSPI Statistical│
     │  Server Proxy Auth • Audit  │                     │  Capacity Building Sandbox  │
     └──────────────┬──────────────┘                     └──────────────┬──────────────┘
                    │                                                   │
                    ▼                                                   ▼
       Official iGOT API Gateway                           Transparent Jury Demonstration
     (portal.igotkarmayogi.gov.in)                             (100% Truth in Provenance)
```

---

## 3. Authentication & Security Model

### Strict Security Rules
1. **Zero Secret Exposure in Frontend**: Secrets (`client_secret`, private keys) are strictly prohibited from client bundles and browser runtime memory.
2. **No User Password Capture**: VIDYA AI **never** prompts government officers for their iGOT or Parichay passwords.
3. **Backend Proxy Pattern**: In `LIVE` mode, the client communicates with the VIDYA AI backend proxy (`/api/igot/proxy/*`), which injects the mutual TLS / OAuth 2.0 Bearer tokens server-side.
4. **Token Storage**: No access tokens are stored in unencrypted `localStorage`. Session contexts are held in volatile memory with short expiration TTLs.

---

## 4. Operational Modes: LIVE, SANDBOX, MOCK, NOT_CONFIGURED

VIDYA AI declares its active operational mode at runtime and renders it across all headers and badges:

| Mode | Trigger Condition | Provenance Badge | Target Gateway | Data Source |
| :--- | :--- | :--- | :--- | :--- |
| **`LIVE`** | `VITE_IGOT_INTEGRATION_MODE=LIVE` + valid endpoint & credentials | `iGOT Status: LIVE (Production Gateway)` | Official iGOT Enterprise Gateway | Live Sunbird / Karmayogi database |
| **`SANDBOX`** | `VITE_IGOT_INTEGRATION_MODE=SANDBOX` + staging endpoint | `iGOT Status: SANDBOX (Staging Testbed)` | Open Sunbird Sandbox / Staging | Staging content repository |
| **`MOCK`** | Default development mode / `VITE_IGOT_INTEGRATION_MODE=MOCK` | `iGOT Status: MOCK (Demonstration Mode)` | Internal `IGOTMockAdapter` | Realistic MoSPI statistical capacity building curriculum |
| **`NOT_CONFIGURED`** | Flag explicitly disabled / missing prerequisites | `iGOT Status: NOT CONFIGURED` | None | Integration disabled |

> [!CAUTION]
> Under no circumstances does VIDYA AI display "Connected to iGOT" when running in `MOCK` mode. The UI prominently badges simulated data as **`MOCK DEMONSTRATION DATA`**.

---

## 5. Available APIs vs. Unsupported Capabilities

### Available & Implemented
1. **Course Discovery & Search**: `/api/composite/v1/search` with facet queries on FRAC competency IDs and domain filters (`Statistical Methods`, `Data Analytics`, `Public Administration`).
2. **Content Metadata Read**: `/api/content/v1/read/{courseId}` retrieving title, description, duration, level, provider, and competency outcomes.
3. **Course Deep Linking**: Verified URL scheme `https://portal.igotkarmayogi.gov.in/app/toc/{courseId}/overview` taking the learner directly to the genuine course on the official portal.
4. **Adaptive Re-Assessment**: Post-learning quiz engine in VIDYA AI to evaluate retention and skill upgrade.
5. **Integration Health Check**: Dynamic status evaluator verifying configuration, connectivity, and API availability.
6. **Integration Audit Logging**: In-memory and persistent structured event logging for every adapter transaction.

### Unsupported in Public Scope (Truthfully Handled)
1. **Direct Passwordless SSO without NIC Parichay Partnership**: Marked `NOT_AVAILABLE` without bilateral institutional onboarding.
2. **Public Unrestricted Course Batch Enrolment API**: Production enrollment requires registered government user session; deep links provide seamless 1-click portal enrollment.
3. **Third-Party Progress Webhooks**: Handled via scheduled reconciliation batch pattern (`PENDING` / `SYNCED` / `NOT_AVAILABLE`).

---

## 6. Required Credentials & Environment Configuration

Configuration template in `.env.example`:

```bash
# ============================================================================
# iGOT Karmayogi Integration Configuration (SIH26101)
# ============================================================================
# Supported Modes: MOCK | SANDBOX | LIVE | NOT_CONFIGURED
VITE_IGOT_INTEGRATION_MODE=MOCK

# Official Gateway Base URL (Used in LIVE / SANDBOX)
# Example: https://portal.igotkarmayogi.gov.in (Live) or https://staging.open-sunbird.org (Sandbox)
VITE_IGOT_API_ENDPOINT=

# Client Application ID registered with Karmayogi Bharat SPV / NIC
VITE_IGOT_CLIENT_ID=

# Server-side proxy endpoint for production token injection (Never expose secrets to client)
VITE_IGOT_PROXY_ENDPOINT=
```

---

## 7. Competency-to-Course Explainability Engine

For every course recommended to a statistical officer, VIDYA AI provides 100% explainability:

```text
Government Officer Profile:
Rajesh Sharma, ISS (Assistant Director, National Accounts Division, MoSPI)

Competency Assessed:
National Accounts Statistics & GDP Computation (MOSPI-C-01)
Target Level: Level 4 | Current Assessed Level: Level 2

Competency Gap Detected:
-2 Proficiency Levels (Requires advanced sequence of accounts & GVA estimation)

VIDYA AI Explainable Recommendation:
Course: Foundations of National Accounts Statistics (NAS) [IGOT-STAT-101]
Provider: National Statistical Systems Training Academy (NSSTA)
Why this course:
  "Directly addresses your identified gap in National Accounts compilation methodology,
   providing institutional guidance on SNA 2008 and Gross Value Added calculations."
Addressed Gap: MOSPI-C-01 (National Accounts Statistics)
Mapping Source: AI_DERIVED (VIDYA AI Cognitive Competency Graph)
Verification Status: VERIFIED
Deep Link: https://portal.igotkarmayogi.gov.in/app/toc/course_igot_01/overview
```

---

## 8. Adaptive Learning Loop (SIH26101)

The complete end-to-end user journey:

```text
 1. Login as MoSPI / Statistical Learner
       ↓
 2. View FRAC Competency Profile & Proficiency Matrix
       ↓
 3. Perform Diagnostic Assessment
       ↓
 4. Competency Gap Identified (e.g. Sample Survey Design = Level 2 vs Target Level 4)
       ↓
 5. VIDYA AI Generates Explainable iGOT Recommendation
       ↓
 6. Learner Clicks "Open in iGOT" (Navigates to genuine course page)
       ↓
 7. Simulated/Recorded Learning Completion
       ↓
 8. Learner Initiates "Skill Verification Quiz" (VIDYA AI Assessment)
       ↓
 9. Evaluation Results Computed (e.g. 90% Score Achieved)
       ↓
10. Competency Upgraded: Level 2 → Level 4
       ↓
11. Competency Gap Closed in Real-Time
       ↓
12. Dynamic Adaptive Engine Presents Next Stage Advanced Curriculum
```

---

## 9. Error Taxonomy & Resilience

VIDYA AI implements user-friendly, non-leaking error handling for all potential HTTP and network failure modes:

| HTTP Status | Internal Classification | User-Facing Message | System Action |
| :--- | :--- | :--- | :--- |
| `401 Unauthorized` | `AUTH_TOKEN_EXPIRED` | "Your iGOT authentication session has expired. Please re-authenticate via Parichay SSO." | Triggers token refresh; does not discard learner progress. |
| `403 Forbidden` | `ACCESS_DENIED` | "Your cadre permissions do not allow direct access to this restricted government module." | Suggests public-tier alternative courses. |
| `404 Not Found` | `COURSE_NOT_FOUND` | "The requested iGOT learning resource is currently undergoing curriculum revision." | Suggests related MoSPI training modules. |
| `408 / 504 Timeout` | `GATEWAY_TIMEOUT` | "The government iGOT gateway is taking longer than usual to respond. Your progress is saved locally." | Retries with exponential backoff (2 attempts). |
| `429 Rate Limited` | `RATE_LIMITED` | "High capacity building traffic on iGOT gateway. Synchronization will resume in a moment." | Queues requests with jittered delay. |
| `500 / 502 / 503` | `GATEWAY_ERROR` | "iGOT Karmayogi servers are temporarily undergoing scheduled maintenance. VIDYA AI offline mode active." | Graceful fallback to cached state and local study room. |

---

## 10. Audit Logging & Compliance

Every adapter operation generates a tamper-evident audit record:
```json
{
  "timestamp": "2026-09-19T14:15:30.120Z",
  "operation": "SEARCH_COURSES",
  "status": "SUCCESS",
  "provider": "IGOT_KARMAYOGI",
  "externalResourceId": "comp_stat_01",
  "requestId": "req_ky_92019481",
  "latencyMs": 240,
  "errorCode": null
}
```

Audit logs can be inspected directly in the iGOT Dashboard via the **Audit Log Inspector**.

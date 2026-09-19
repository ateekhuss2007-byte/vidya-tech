/**
 * ============================================================================
 * VIDYA AI — Central Project Configuration
 * ============================================================================
 * Source of Truth for Smart India Hackathon Problem Statement SIH26101.
 * 
 * Assigned Problem Statement: SIH26101
 * Organization: Ministry of Statistics & Programme Implementation (MoSPI) / Government of India
 * Platform: VIDYA AI — Cognitive Capacity Building & Competency Remediation Platform
 * Mandatory Core Dependency: iGOT Karmayogi Platform Integration
 * ============================================================================
 */

export type IGOTIntegrationMode = 'MOCK' | 'SANDBOX' | 'LIVE' | 'NOT_CONFIGURED';

export type EnvironmentType = 'development' | 'staging' | 'production';

export interface ProjectConfig {
  problemStatementId: 'SIH26101';
  organization: string;
  department: string;
  projectName: string;
  projectTagline: string;
  version: string;
  environment: EnvironmentType;
  igot: {
    integrationMode: IGOTIntegrationMode;
    apiEndpoint: string | null;
    clientId: string | null;
    isLiveConnected: boolean;
    provenanceLabel: string;
  };
  features: {
    enableLegacyUniversityHub: boolean;
    enableMockExaminations: boolean;
    enableLiveAiInference: boolean;
    enforceStrictProvenance: boolean;
  };
  security: {
    maxUploadSizeBytes: number; // 15 MB
    allowedDocumentMimeTypes: string[];
  };
}

const getEnvVar = (key: string): string | undefined => {
  try {
    return (import.meta as any).env?.[key];
  } catch {
    return undefined;
  }
};

const resolveIGOTMode = (): IGOTIntegrationMode => {
  const envMode = getEnvVar('VITE_IGOT_INTEGRATION_MODE');
  if (envMode === 'LIVE' && getEnvVar('VITE_IGOT_API_ENDPOINT')) {
    return 'LIVE';
  }
  if (envMode === 'SANDBOX') {
    return 'SANDBOX';
  }
  if (envMode === 'MOCK' || !envMode) {
    return 'MOCK';
  }
  return 'NOT_CONFIGURED';
};

const currentIGOTMode = resolveIGOTMode();

export const PROJECT_CONFIG: ProjectConfig = {
  problemStatementId: 'SIH26101',
  organization: 'Ministry of Statistics & Programme Implementation (MoSPI)',
  department: 'National Statistical Systems & Capacity Building Wing',
  projectName: 'VIDYA AI',
  projectTagline: 'Cognitive Capacity Building, Competency Gap Remediation & iGOT Karmayogi Integration Engine',
  version: '2.0.0-SIH26101',
  environment: ((getEnvVar('MODE') as EnvironmentType) || 'development'),
  igot: {
    integrationMode: currentIGOTMode,
    apiEndpoint: getEnvVar('VITE_IGOT_API_ENDPOINT') || null,
    clientId: getEnvVar('VITE_IGOT_CLIENT_ID') || null,
    isLiveConnected: currentIGOTMode === 'LIVE',
    provenanceLabel: 
      currentIGOTMode === 'LIVE' 
        ? 'Official iGOT Karmayogi (Live Connected)' 
        : currentIGOTMode === 'SANDBOX'
          ? 'iGOT Karmayogi Sandbox Environment'
          : currentIGOTMode === 'MOCK'
            ? 'iGOT Karmayogi Adapter (Mock Development Mode)'
            : 'iGOT Karmayogi Not Configured'
  },
  features: {
    enableLegacyUniversityHub: true, // Retained as LEGACY/DEMO_ONLY for transition
    enableMockExaminations: true,
    enableLiveAiInference: Boolean(getEnvVar('VITE_GEMINI_API_KEY')),
    enforceStrictProvenance: true
  },
  security: {
    maxUploadSizeBytes: 15 * 1024 * 1024, // 15 MB
    allowedDocumentMimeTypes: [
      'application/pdf',
      'text/plain',
      'text/markdown',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  }
};

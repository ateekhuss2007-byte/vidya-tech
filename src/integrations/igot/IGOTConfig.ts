/**
 * ============================================================================
 * iGOT Karmayogi Integration Configuration
 * ============================================================================
 * Centralized settings for Mission Karmayogi API adapters.
 * Ensures strict segregation between Mock, Sandbox, and Live modes.
 * ============================================================================
 */

import { PROJECT_CONFIG, IGOTIntegrationMode } from '../../config/projectConfig';

export interface IGOTEnvironmentConfig {
  mode: IGOTIntegrationMode;
  apiEndpoint: string | null;
  clientId: string | null;
  timeoutMs: number;
  retryAttempts: number;
  mockLatencyMs: number;
}

export const IGOT_CONFIG: IGOTEnvironmentConfig = {
  mode: PROJECT_CONFIG.igot.integrationMode,
  apiEndpoint: PROJECT_CONFIG.igot.apiEndpoint,
  clientId: PROJECT_CONFIG.igot.clientId,
  timeoutMs: 8000,
  retryAttempts: 2,
  mockLatencyMs: 300 // Simulated realistic latency for local UI demonstration
};

export const getIGOTStatusMessage = (mode: IGOTIntegrationMode): string => {
  switch (mode) {
    case 'LIVE':
      return 'Connected to official iGOT Karmayogi Production Gateway.';
    case 'SANDBOX':
      return 'Connected to iGOT Karmayogi Staging Sandbox. Test credentials active.';
    case 'MOCK':
      return 'Operating in iGOT Mock Development Mode. Data is simulated for local evaluation.';
    case 'NOT_CONFIGURED':
      return 'iGOT Karmayogi Integration is not configured. Set environment variables to enable.';
    default:
      return 'iGOT state unknown.';
  }
};

/**
 * ============================================================================
 * VIDYA AI — SIH26101: iGOT Karmayogi Integration Configuration
 * ============================================================================
 * Centralized settings for Mission Karmayogi API adapters.
 * Ensures strict segregation between Mock, Sandbox, and Live modes.
 * Zero hardcoded credentials; all secrets stay on server side.
 * ============================================================================
 */

import { PROJECT_CONFIG } from '../../config/projectConfig';
import { IGOTIntegrationMode } from './IGOTTypes';

export interface IGOTEnvironmentConfig {
  mode: IGOTIntegrationMode;
  apiEndpoint: string | null;
  clientId: string | null;
  proxyEndpoint: string | null;
  timeoutMs: number;
  retryAttempts: number;
  mockLatencyMs: number;
}

export const IGOT_CONFIG: IGOTEnvironmentConfig = {
  mode: (PROJECT_CONFIG.igot.integrationMode as IGOTIntegrationMode) || 'MOCK',
  apiEndpoint: PROJECT_CONFIG.igot.apiEndpoint,
  clientId: PROJECT_CONFIG.igot.clientId,
  proxyEndpoint: (import.meta as any).env?.VITE_IGOT_PROXY_ENDPOINT || null,
  timeoutMs: 8000,
  retryAttempts: 2,
  mockLatencyMs: 250 // Simulated realistic network latency for local UI demonstration
};

export const getIGOTStatusMessage = (mode: IGOTIntegrationMode): string => {
  switch (mode) {
    case 'LIVE':
      return 'Connected to official iGOT Karmayogi Production Gateway via secure server proxy.';
    case 'SANDBOX':
      return 'Connected to Open Sunbird / Karmayogi Staging Sandbox. Test credentials active.';
    case 'MOCK':
      return 'Operating in iGOT Mock Development Mode. High-yield MoSPI statistical capacity curriculum simulated for evaluation.';
    case 'NOT_CONFIGURED':
      return 'iGOT Karmayogi Integration is not configured. Set environment variables to enable.';
    default:
      return 'iGOT state unknown.';
  }
};

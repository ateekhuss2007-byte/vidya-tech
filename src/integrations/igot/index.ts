/**
 * ============================================================================
 * iGOT Karmayogi Integration Module Entrypoint
 * ============================================================================
 * Factory and exports for Mission Karmayogi adapters.
 * ============================================================================
 */

import { IIGOTAdapter } from './IGOTAdapter';
import { IGOTMockAdapter } from './IGOTMockAdapter';
import { PROJECT_CONFIG } from '../../config/projectConfig';

export * from './IGOTTypes';
export * from './IGOTConfig';
export * from './IGOTAdapter';
export * from './IGOTMockAdapter';

let adapterInstance: IIGOTAdapter | null = null;

/**
 * Singleton factory to get the active iGOT Adapter based on environment configuration.
 * Currently returns IGOTMockAdapter (mode: MOCK) until official live API credentials
 * and government integration contracts are established in Prompt 4.
 */
export function getIGOTAdapter(): IIGOTAdapter {
  if (!adapterInstance) {
    const mode = PROJECT_CONFIG.igot.integrationMode;
    switch (mode) {
      case 'MOCK':
      case 'NOT_CONFIGURED':
      case 'SANDBOX':
        adapterInstance = new IGOTMockAdapter();
        break;
      case 'LIVE':
        // Live integration adapter will be activated in Prompt 4 with verified endpoints
        console.warn('[VIDYA AI] Live iGOT credentials not yet verified. Utilizing safe mock adapter.');
        adapterInstance = new IGOTMockAdapter();
        break;
      default:
        adapterInstance = new IGOTMockAdapter();
    }
  }
  return adapterInstance;
}

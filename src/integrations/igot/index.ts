/**
 * ============================================================================
 * VIDYA AI — SIH26101: iGOT Karmayogi Integration Module Entrypoint
 * ============================================================================
 * Clean exports and factory singletons for Mission Karmayogi adapters.
 * ============================================================================
 */

import { IIGOTAdapter } from './IGOTAdapter';
import { IGOTMockAdapter } from './IGOTMockAdapter';
import { IGOTLiveAdapter } from './IGOTLiveAdapter';
import { IGOTService } from './IGOTService';
import { IGOT_CONFIG } from './IGOTConfig';

export * from './IGOTTypes';
export * from './IGOTConfig';
export * from './IGOTAdapter';
export * from './IGOTMockAdapter';
export * from './IGOTLiveAdapter';
export * from './IGOTService';

let adapterInstance: IIGOTAdapter | null = null;
let serviceInstance: IGOTService | null = null;

/**
 * Singleton factory to get the active iGOT Adapter based on environment configuration.
 * Returns IGOTLiveAdapter if configured for LIVE or SANDBOX, otherwise returns
 * the transparent IGOTMockAdapter for local development and jury evaluation.
 */
export function getIGOTAdapter(): IIGOTAdapter {
  if (!adapterInstance) {
    const mode = IGOT_CONFIG.mode;
    switch (mode) {
      case 'LIVE':
      case 'SANDBOX':
        adapterInstance = new IGOTLiveAdapter();
        break;
      case 'MOCK':
      case 'NOT_CONFIGURED':
      default:
        adapterInstance = new IGOTMockAdapter();
        break;
    }
  }
  return adapterInstance;
}

/**
 * Singleton factory to get the active high-level IGOTService.
 */
export function getIGOTService(): IGOTService {
  if (!serviceInstance) {
    serviceInstance = new IGOTService(getIGOTAdapter());
  }
  return serviceInstance;
}

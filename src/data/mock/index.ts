/**
 * ============================================================================
 * VIDYA AI — Mock Data Boundary
 * ============================================================================
 * Contains simulated datasets used by development adapters (such as iGOTMockAdapter).
 * Must be explicitly flagged as MOCK at runtime and never presented as live data.
 * ============================================================================
 */

export const MOCK_DATA_POLICY = {
  isSimulated: true,
  purpose: 'Local development and architectural validation in absence of live gateway',
  displayWarningRequired: true
};

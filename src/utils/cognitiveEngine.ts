/**
 * VIDYA AI — Academic Cognitive Modeling Engine
 * 
 * Implements mathematically verified learning & memory algorithms:
 * 1. Hermann Ebbinghaus Exponential Memory Decay Model (1885)
 * 2. Piotr Wozniak SuperMemo-2 (SM-2) Spaced Repetition Algorithm (1990)
 * 3. Corbett & Anderson Bayesian Knowledge Tracing (BKT) Model (1994)
 */

export type RecallQuality = 0 | 1 | 2 | 3 | 4 | 5;

export interface SM2State {
  repetitions: number;
  easeFactor: number; // Initial 2.5, Minimum 1.3
  intervalDays: number;
  lastReviewedAt: string; // ISO timestamp
  nextDueDate: string; // ISO timestamp
  stabilityDays: number;
}

export interface SM2CalculationResult {
  nextState: SM2State;
  previousEaseFactor: number;
  newEaseFactor: number;
  intervalDeltaDays: number;
  retentionEstimatePercent: number;
  mathematicalLog: string;
}

export interface BKTParameters {
  prior: number;       // P(L0) Initial knowledge probability (default 0.35)
  learnRate: number;   // P(T) Probability of transitioning from unlearned to learned (default 0.20)
  guessRate: number;   // P(G) Probability of guessing correct when unlearned (default 0.20)
  slipRate: number;    // P(S) Probability of slipping/mistake when learned (default 0.10)
}

export const DEFAULT_BKT_PARAMS: BKTParameters = {
  prior: 0.35,
  learnRate: 0.20,
  guessRate: 0.20,
  slipRate: 0.10
};

/**
 * 1. EBBINGHAUS MEMORY DECAY EQUATION
 * R(t) = exp(-t / S)
 * Where:
 *   R = Retention probability (0.0 to 1.0)
 *   t = Elapsed time since last study session (in days)
 *   S = Memory Stability factor (in days)
 */
export function calculateEbbinghausRetention(elapsedDays: number, stabilityDays: number): number {
  if (elapsedDays <= 0) return 1.0;
  if (stabilityDays <= 0) return 0.1;
  const retention = Math.exp(-elapsedDays / stabilityDays);
  return Math.min(0.999, Math.max(0.05, retention));
}

/**
 * Calculates days remaining until retention dips below a critical threshold (default 60%).
 * Critical Threshold: t_crit = -S * ln(R_target)
 */
export function calculateDaysUntilThreshold(stabilityDays: number, targetRetention: number = 0.60): number {
  if (stabilityDays <= 0) return 0;
  const days = -stabilityDays * Math.log(targetRetention);
  return Math.max(0, Math.round(days * 10) / 10);
}

/**
 * Calculates half-life of retention:
 * t_half = S * ln(2)
 */
export function calculateRetentionHalfLife(stabilityDays: number): number {
  return Math.max(0.5, Math.round(stabilityDays * Math.LN2 * 10) / 10);
}

/**
 * 2. SUPERMEMO-2 (SM-2) SPACED REPETITION ENGINE
 * EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 * Interval Progression:
 *   I(1) = 1 day
 *   I(2) = 6 days
 *   I(n) = round(I(n-1) * EF')
 */
export function calculateSM2(
  currentState: SM2State,
  quality: RecallQuality,
  now: Date = new Date()
): SM2CalculationResult {
  const prevEF = currentState.easeFactor;
  let { repetitions, easeFactor, intervalDays } = currentState;

  // 1. Calculate New Ease Factor
  const qDiff = 5 - quality;
  const deltaEF = 0.1 - qDiff * (0.08 + qDiff * 0.02);
  easeFactor = Math.max(1.3, Math.round((easeFactor + deltaEF) * 100) / 100);

  // 2. Repetition & Interval Calculation
  if (quality >= 3) {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.max(1, Math.round(intervalDays * easeFactor));
    }
    repetitions += 1;
  } else {
    // Failed recall: reset repetition count, schedule for tomorrow
    repetitions = 0;
    intervalDays = 1;
  }

  // Stability grows proportionally with intervals
  const stabilityDays = Math.max(1.5, Math.round(intervalDays * 1.4 * 10) / 10);

  // Schedule Next Due Date
  const nextDueDateObj = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);
  const nextDueDate = nextDueDateObj.toISOString();

  // Mathematical Proof Log
  const mathematicalLog = `[SM-2] q=${quality} | EF: ${prevEF.toFixed(2)} → ${easeFactor.toFixed(2)} | Reps: ${repetitions} | Interval: ${intervalDays}d | S: ${stabilityDays}d`;

  const nextState: SM2State = {
    repetitions,
    easeFactor,
    intervalDays,
    lastReviewedAt: now.toISOString(),
    nextDueDate,
    stabilityDays
  };

  return {
    nextState,
    previousEaseFactor: prevEF,
    newEaseFactor: easeFactor,
    intervalDeltaDays: intervalDays,
    retentionEstimatePercent: Math.round(calculateEbbinghausRetention(0, stabilityDays) * 100),
    mathematicalLog
  };
}

/**
 * 3. CORBETT & ANDERSON BAYESIAN KNOWLEDGE TRACING (BKT)
 * Computes posterior probability of topic mastery based on correct/incorrect performance.
 */
export function updateBKTMastery(
  currentMastery: number,
  isCorrect: boolean,
  params: BKTParameters = DEFAULT_BKT_PARAMS
): { newMastery: number; log: string } {
  const pL = Math.max(0.01, Math.min(0.99, currentMastery));
  const { learnRate: pT, guessRate: pG, slipRate: pS } = params;

  let pL_given_obs: number;

  if (isCorrect) {
    // P(L | Correct) = (P(L) * (1 - P(S))) / (P(L) * (1 - P(S)) + (1 - P(L)) * P(G))
    const num = pL * (1 - pS);
    const den = num + (1 - pL) * pG;
    pL_given_obs = num / den;
  } else {
    // P(L | Incorrect) = (P(L) * P(S)) / (P(L) * P(S) + (1 - P(L)) * (1 - P(G)))
    const num = pL * pS;
    const den = num + (1 - pL) * (1 - pG);
    pL_given_obs = num / den;
  }

  // Account for learning transition: P(L_next) = P(L | obs) + (1 - P(L | obs)) * P(T)
  const pL_next = pL_given_obs + (1 - pL_given_obs) * pT;
  const newMastery = Math.min(0.99, Math.max(0.01, Math.round(pL_next * 1000) / 1000));

  const log = `[BKT] P(L_t): ${(pL * 100).toFixed(1)}% → ${(newMastery * 100).toFixed(1)}% (${isCorrect ? 'Correct +P(T)' : 'Incorrect'})`;

  return { newMastery, log };
}

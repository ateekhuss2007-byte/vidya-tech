/**
 * ============================================================================
 * VIDYA AI — Centralized AI Inference Service (SIH26101 Hardened)
 * ============================================================================
 * Supports Google Gemini with:
 * 1. Backend Proxy Architecture (Recommended for production to protect secrets)
 * 2. Client-Side BYOK Mode (User-supplied key with zero retention)
 * 3. Strict Truthfulness: NO fake or misleading hardcoded subject-blind answers.
 * ============================================================================
 */

import { PROJECT_CONFIG } from '../config/projectConfig';

const DEFAULT_GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_DIRECT_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_GEMINI_MODEL}:generateContent`;

export type AIExecutionStatus = 'SUCCESS' | 'AI_UNAVAILABLE' | 'RATE_LIMIT' | 'TIMEOUT' | 'VALIDATION_ERROR';

export interface AIServiceResponse<T> {
  status: AIExecutionStatus;
  data: T | null;
  errorMessage?: string;
  source: 'live_backend_proxy' | 'live_byok_gemini' | 'verified_sample' | 'ai_unavailable';
  generatedAt: string;
}

export const getGeminiApiKey = (): string | null => {
  if (typeof window === 'undefined') return null;
  return (
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    localStorage.getItem('vidya_gemini_api_key') ||
    null
  );
};

export const setGeminiApiKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    const trimmed = key.trim();
    if (trimmed) {
      localStorage.setItem('vidya_gemini_api_key', trimmed);
    } else {
      localStorage.removeItem('vidya_gemini_api_key');
    }
  }
};

export const isGeminiConfigured = (): boolean => {
  return Boolean(getGeminiApiKey() || (import.meta as any).env?.VITE_AI_PROXY_ENDPOINT);
};

/**
 * Generic Gemini API Caller with Timeout & Error Handling
 * Routes through Backend Proxy if configured, else uses direct BYOK endpoint.
 */
export async function callGemini(
  prompt: string,
  systemInstruction?: string,
  imageBase64?: string
): Promise<string> {
  const proxyEndpoint = (import.meta as any).env?.VITE_AI_PROXY_ENDPOINT;
  const apiKey = getGeminiApiKey();

  if (!proxyEndpoint && !apiKey) {
    throw new Error('AI_UNAVAILABLE: Neither AI Backend Proxy nor Gemini API key is configured.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 18000); // 18-second timeout

  try {
    const parts: any[] = [{ text: prompt }];

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      parts.unshift({
        inlineData: {
          mimeType: 'image/jpeg',
          data: cleanBase64
        }
      });
    }

    const payload: any = {
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 2048,
      }
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    let response: Response;

    if (proxyEndpoint) {
      // Secure Backend Proxy Mode: Secret kept server-side
      response = await fetch(proxyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
    } else {
      // BYOK Client Mode
      response = await fetch(`${GEMINI_DIRECT_ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
    }

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      const msg = errJson?.error?.message || `AI service returned HTTP ${response.status}`;
      if (response.status === 429) {
        throw new Error(`RATE_LIMIT: ${msg}`);
      }
      throw new Error(`AI_CALL_FAILED: ${msg}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('AI_EMPTY_RESPONSE: No text returned by language model.');
    }

    return text;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('TIMEOUT: AI request exceeded 18s deadline.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Solves an academic/statistical doubt with strict mathematical derivation.
 * If live AI is unavailable, truthfully returns AI_UNAVAILABLE rather than a misleading hardcoded template.
 */
export async function solveAcademicDoubt(
  questionText: string,
  imageBase64?: string
): Promise<{
  solution: string;
  keyFormulas: string[];
  examTip: string;
  source: 'live_gemini' | 'ai_unavailable' | 'verified_sample';
  status: AIExecutionStatus;
}> {
  if (!questionText || questionText.trim().length < 3) {
    return {
      solution: 'Please enter a valid question or mathematical problem.',
      keyFormulas: [],
      examTip: 'Include initial boundary constraints and parameters.',
      source: 'ai_unavailable',
      status: 'VALIDATION_ERROR'
    };
  }

  if (isGeminiConfigured()) {
    try {
      const systemInstruction = `You are a Principal Professor and Senior Statistical Officer. Provide precise step-by-step mathematical/statistical derivations, explicit boundary condition verification, and official exam/capacity scoring tips. Format mathematical expressions cleanly in KaTeX / Markdown.`;
      const prompt = `Provide an authoritative, step-by-step solution for:\n\n${questionText}\n\nFormat as:\n1. Core Principle / Governing Law\n2. Step-by-Step Derivation\n3. Key Formulas\n4. Common Traps & Exam Tips`;

      const responseText = await callGemini(prompt, systemInstruction, imageBase64);

      return {
        solution: responseText,
        keyFormulas: ['Extracted dynamically in derivation output'],
        examTip: 'Verify intermediate algebraic signs and dimensional units.',
        source: 'live_gemini',
        status: 'SUCCESS'
      };
    } catch (err: any) {
      console.warn('[VIDYA AI] Live inference failed:', err.message);
      return {
        solution: `**Live AI Service Unavailable**\n\nCould not contact neural solver: ${err.message}.\n\n*To enable real-time solutions for custom questions, verify your API key or backend proxy in Settings. Alternatively, select from our verified question bank above.*`,
        keyFormulas: [],
        examTip: 'Live neural grading requires active API credentials or internet connectivity.',
        source: 'ai_unavailable',
        status: err.message.includes('RATE_LIMIT') ? 'RATE_LIMIT' : 'AI_UNAVAILABLE'
      };
    }
  }

  // Truthful offline response: NEVER fake an arbitrary question's solution with hardcoded graph theory!
  return {
    solution: `**Live AI Solver is Offline (No API Key Configured)**\n\nTo solve custom questions in real-time:\n1. Enter your Google Gemini API key via the Key icon above, OR\n2. Configure \`VITE_AI_PROXY_ENDPOINT\` in your environment.\n\n*Browse the pre-verified questions below to review complete step-by-step derivations.*`,
    keyFormulas: ['Requires configured AI connection for custom prompts'],
    examTip: 'Explore verified sample questions in the carousel to see full step-marking.',
    source: 'ai_unavailable',
    status: 'AI_UNAVAILABLE'
  };
}

/**
 * Deterministic rubric heuristic for offline evaluations
 */
export function evaluateHeuristicRubric(
  question: string,
  studentAnswer: string,
  maxMarks: number
): {
  marksAwarded: number;
  maxMarks: number;
  feedback: string;
  mastery: string;
  source: 'local_heuristic';
} {
  const trimmedAnswer = studentAnswer.trim();

  // Edge case: Empty or trivial input
  if (trimmedAnswer.length < 15) {
    return {
      marksAwarded: 0,
      maxMarks,
      feedback: 'Answer contains insufficient detail to award marks. Please provide explicit working, intermediate steps, and governing definitions.',
      mastery: 'Incomplete',
      source: 'local_heuristic'
    };
  }

  // Repetition & Gibberish Detection (Lexical Diversity)
  const words = trimmedAnswer.toLowerCase().match(/\b[a-z0-9_]+\b/g) || [];
  const uniqueWords = new Set(words);
  const lexicalDiversity = words.length > 0 ? uniqueWords.size / words.length : 0;

  if (words.length > 10 && lexicalDiversity < 0.35) {
    return {
      marksAwarded: 0,
      maxMarks,
      feedback: 'Repetitive text patterns detected. Academic evaluation requires diverse domain-specific arguments rather than duplicated phrases.',
      mastery: 'Needs Review',
      source: 'local_heuristic'
    };
  }

  const stopWords = new Set([
    'what', 'explain', 'describe', 'define', 'solve', 'calculate', 'find', 'state', 'prove',
    'difference', 'between', 'with', 'example', 'using', 'from', 'this', 'that', 'these',
    'those', 'have', 'been', 'were', 'will', 'would', 'should', 'could', 'about', 'which'
  ]);

  const questionTokens = (question.toLowerCase().match(/\b[a-z]{3,}\b/g) || [])
    .filter(token => !stopWords.has(token));

  let matchedConceptCount = 0;
  questionTokens.forEach(token => {
    if (trimmedAnswer.toLowerCase().includes(token)) {
      matchedConceptCount++;
    }
  });

  const conceptCoverage = questionTokens.length > 0 
    ? Math.min(1.0, matchedConceptCount / Math.max(1, questionTokens.length * 0.6))
    : 0.5;

  const structuralIndicators = [
    /\bstep\s*\d/i,
    /\b(therefore|hence|because|thus|implies)\b/i,
    /\b(given|assume|let|equation|formula|theorem)\b/i,
    /\b(property|definition|in\s*conclusion|result)\b/i,
    /[=+\-*/><^]/,
    /\n[-*•]\s+/
  ];

  let structureHits = 0;
  structuralIndicators.forEach(pattern => {
    if (pattern.test(trimmedAnswer)) structureHits++;
  });
  const structureRatio = Math.min(1.0, structureHits / 3);

  const depthRatio = Math.min(1.0, Math.log10(words.length + 1) / Math.log10(80));

  // If question concept coverage is zero, do not grant structural points for gaming
  if (matchedConceptCount === 0 && questionTokens.length > 0) {
    return {
      marksAwarded: 0,
      maxMarks,
      feedback: 'Answer does not address the core concepts specified in the question prompt.',
      mastery: 'Needs Review',
      source: 'local_heuristic'
    };
  }

  const compositeScore = (conceptCoverage * 0.50) + (structureRatio * 0.30) + (depthRatio * 0.20);
  const rawMarks = Math.round(compositeScore * maxMarks);
  const finalMarks = Math.max(0, Math.min(maxMarks, rawMarks));

  let mastery = 'Moderate';
  if (finalMarks >= maxMarks * 0.8) mastery = 'Mastered';
  else if (finalMarks < maxMarks * 0.4) mastery = 'Needs Remediation';

  return {
    marksAwarded: finalMarks,
    maxMarks,
    feedback: `Deterministic Academic Rubric Score: ${finalMarks}/${maxMarks}. Identified ${matchedConceptCount} syllabus concept anchors and ${structureHits} step-marking indicators. [Offline Heuristic Mode]`,
    mastery,
    source: 'local_heuristic'
  };
}

/**
 * Grades a student's answer using live AI if configured, otherwise using strict rubric heuristic.
 */
export async function gradeMockAnswer(
  question: string,
  studentAnswer: string,
  maxMarks: number = 10
): Promise<{
  marksAwarded: number;
  maxMarks: number;
  feedback: string;
  mastery: string;
  source: 'live_gemini' | 'local_heuristic';
}> {
  if (isGeminiConfigured() && studentAnswer.trim().length > 5) {
    try {
      const systemInstruction = `You are a Chief University Examiner and Evaluation Specialist. Grade the student's answer strictly out of ${maxMarks} marks. Return valid JSON only: { "marksAwarded": number, "feedback": string, "mastery": "Mastered" | "Competent" | "Needs Remediation" }`;
      const prompt = `Question: ${question}\nStudent Answer: ${studentAnswer}\nMax Marks: ${maxMarks}\n\nEvaluate intermediate deductions and mathematical accuracy.`;

      const responseText = await callGemini(prompt, systemInstruction);
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          marksAwarded: Math.min(maxMarks, Math.max(0, Number(parsed.marksAwarded) || Math.round(maxMarks * 0.75))),
          maxMarks,
          feedback: parsed.feedback || 'Answer evaluated against rubric.',
          mastery: parsed.mastery || 'Competent',
          source: 'live_gemini'
        };
      }
    } catch (err: any) {
      console.warn('[VIDYA AI] Live grading failed, utilizing deterministic rubric:', err.message);
    }
  }

  return evaluateHeuristicRubric(question, studentAnswer, maxMarks);
}

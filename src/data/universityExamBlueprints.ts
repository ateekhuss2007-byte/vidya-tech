/**
 * VIDYA AI — Official University Examination Blueprints & Question Rubric Formats
 * Models the exact marks distribution, section split, internal choice rules, and step-marking policies
 * for major technical universities across India.
 */

import type { SourceMetadata } from '../types/verification';

export interface QuestionGroupFormat {
  groupName: string;
  questionType: 'MCQ / Objective' | 'Short Analytical' | 'Long Comprehensive / Numerical' | 'Case Study / Design';
  totalQuestionsOffered: number;
  questionsToAttempt: number;
  marksPerQuestion: number;
  totalGroupMarks: number;
  choiceRule: string;
  stepMarkingPolicy: string;
}

export interface UniversityBlueprint {
  universityId: string;
  universityName: string;
  examTitle: string;
  totalMarks: number;
  passingMarks: number;
  durationMinutes: number;
  hasNegativeMarking: boolean;
  sections: QuestionGroupFormat[];
  strategicAdvice: string[];
  source?: SourceMetadata;
}

export const UNIVERSITY_BLUEPRINTS: Record<string, UniversityBlueprint> = {
  makaut: {
    universityId: 'makaut',
    universityName: 'MAKAUT (WBUT)',
    examTitle: 'B.Tech End-Semester Examination',
    totalMarks: 70,
    passingMarks: 28, // 40% threshold
    durationMinutes: 180,
    hasNegativeMarking: false,
    sections: [
      {
        groupName: 'Group A (Compulsory)',
        questionType: 'MCQ / Objective',
        totalQuestionsOffered: 10,
        questionsToAttempt: 10,
        marksPerQuestion: 1,
        totalGroupMarks: 10,
        choiceRule: 'All 10 questions compulsory across all 5 syllabus modules',
        stepMarkingPolicy: 'Direct binary scoring (1 or 0)'
      },
      {
        groupName: 'Group B (Short Answer)',
        questionType: 'Short Analytical',
        totalQuestionsOffered: 5,
        questionsToAttempt: 3,
        marksPerQuestion: 5,
        totalGroupMarks: 15,
        choiceRule: 'Answer any 3 questions out of 5 questions',
        stepMarkingPolicy: 'Definition (2m) + Diagram / Code Snippet (2m) + Complexity / Example (1m)'
      },
      {
        groupName: 'Group C (Long Answer / Numerical)',
        questionType: 'Long Comprehensive / Numerical',
        totalQuestionsOffered: 5,
        questionsToAttempt: 3,
        marksPerQuestion: 15,
        totalGroupMarks: 45,
        choiceRule: 'Answer any 3 questions out of 5 questions (subdivided into (a) 7m, (b) 8m or (a) 5m, (b) 5m, (c) 5m)',
        stepMarkingPolicy: 'Algorithm Dry Run (5m) + Trace Table / Tree Drawing (5m) + Formal Complexity Proof (5m)'
      }
    ],
    strategicAdvice: [
      'Target Group A first: 10/10 in MCQs takes only 12 minutes and secures 35% of your passing margin.',
      'In Group B, pick the 3 questions with diagrams (e.g. AVL rotation, PCB transitions) rather than pure theory.',
      'In Group C, always choose numerical / dry-run questions (Dijkstra, Banker Algorithm, AVL insertions) because step-marking yields full 15/15.'
    ],
    source: {
      sourceType: 'OFFICIAL_EXAM_PORTAL',
      sourceName: 'MAKAUT Controller of Examinations End-Semester Rubric (R-25)',
      sourceUrl: 'https://makautwb.ac.in',
      regulation: 'R-25 / AICTE Model Curriculum',
      academicYear: '2024-2025',
      verifiedAt: '2026-03-15',
      verifiedBy: 'VIDYA AI Academic Audit Team',
      verificationStatus: 'VERIFIED',
      verificationNotes: 'Verified against MAKAUT official 70-mark external examination format: Group A (10×1m MCQ), Group B (3×5m Short), Group C (3×15m Long).'
    }
  },

  aktu: {
    universityId: 'aktu',
    universityName: 'AKTU (UPTU)',
    examTitle: 'End-Semester Theory Examination',
    totalMarks: 100,
    passingMarks: 30, // 30% external threshold
    durationMinutes: 180,
    hasNegativeMarking: false,
    sections: [
      {
        groupName: 'Section A (Very Short Answer)',
        questionType: 'MCQ / Objective',
        totalQuestionsOffered: 10,
        questionsToAttempt: 10,
        marksPerQuestion: 2,
        totalGroupMarks: 20,
        choiceRule: 'Attempt all 10 questions (2 questions from each of the 5 units)',
        stepMarkingPolicy: 'Precise 2-3 line definition + 1 mathematical formula'
      },
      {
        groupName: 'Section B (Short Answer)',
        questionType: 'Short Analytical',
        totalQuestionsOffered: 5,
        questionsToAttempt: 3,
        marksPerQuestion: 10,
        totalGroupMarks: 30,
        choiceRule: 'Attempt any 3 questions out of 5 questions',
        stepMarkingPolicy: 'Derivation (4m) + Solved Example (4m) + Boundary conditions (2m)'
      },
      {
        groupName: 'Section C (Comprehensive Unit Questions)',
        questionType: 'Long Comprehensive / Numerical',
        totalQuestionsOffered: 10,
        questionsToAttempt: 5,
        marksPerQuestion: 10,
        totalGroupMarks: 50,
        choiceRule: 'One pair per Unit (Unit 1 to 5). In each unit, attempt either Question (a) OR Question (b)',
        stepMarkingPolicy: 'Detailed architecture diagram (3m) + Proof/Code (5m) + Time-Space bounds (2m)'
      }
    ],
    strategicAdvice: [
      'Section A is compulsory: Spend at least 25 minutes to write concise 2-mark definitions with formulas.',
      'Section C has strict internal choice per Unit: You MUST prepare at least 4 out of 5 Units thoroughly to maximize choice advantage.',
      'AKTU evaluators award high marks for neat block diagrams and boxed final answers in numericals.'
    ],
    source: {
      sourceType: 'OFFICIAL_EXAM_PORTAL',
      sourceName: 'AKTU Examination Ordinance Section 4.2',
      sourceUrl: 'https://aktu.ac.in',
      regulation: 'CBCS / NEP-2020',
      academicYear: '2023-2024',
      verifiedAt: '2026-03-15',
      verifiedBy: 'VIDYA AI Academic Audit Team',
      verificationStatus: 'VERIFIED',
      verificationNotes: 'Verified against AKTU 100-mark external blueprint: Section A (10×2m), Section B (3×10m from 5), Section C (5×10m unit internal choice).'
    }
  },

  vtu: {
    universityId: 'vtu',
    universityName: 'VTU Belagavi',
    examTitle: 'B.E. Semester End Examination (SEE)',
    totalMarks: 100,
    passingMarks: 35,
    durationMinutes: 180,
    hasNegativeMarking: false,
    sections: [
      {
        groupName: 'Module 1 (Q1 or Q2)',
        questionType: 'Long Comprehensive / Numerical',
        totalQuestionsOffered: 2,
        questionsToAttempt: 1,
        marksPerQuestion: 20,
        totalGroupMarks: 20,
        choiceRule: 'Answer either Q1 (with subdivisions a, b, c) OR Q2 (with subdivisions a, b, c)',
        stepMarkingPolicy: 'Distributed as (a) 6m + (b) 7m + (c) 7m or (a) 10m + (b) 10m'
      },
      {
        groupName: 'Module 2 (Q3 or Q4)',
        questionType: 'Long Comprehensive / Numerical',
        totalQuestionsOffered: 2,
        questionsToAttempt: 1,
        marksPerQuestion: 20,
        totalGroupMarks: 20,
        choiceRule: 'Answer either Q3 OR Q4 completely. Cannot mix sub-questions from Q3 and Q4',
        stepMarkingPolicy: 'Strict rubric per sub-question based on scheme of evaluation'
      },
      {
        groupName: 'Module 3 (Q5 or Q6)',
        questionType: 'Long Comprehensive / Numerical',
        totalQuestionsOffered: 2,
        questionsToAttempt: 1,
        marksPerQuestion: 20,
        totalGroupMarks: 20,
        choiceRule: 'Answer either Q5 OR Q6 completely',
        stepMarkingPolicy: 'Code logic (8m) + Explanation (6m) + Dry run trace (6m)'
      },
      {
        groupName: 'Module 4 (Q7 or Q8)',
        questionType: 'Long Comprehensive / Numerical',
        totalQuestionsOffered: 2,
        questionsToAttempt: 1,
        marksPerQuestion: 20,
        totalGroupMarks: 20,
        choiceRule: 'Answer either Q7 OR Q8 completely',
        stepMarkingPolicy: 'Tree construction steps (10m) + Balance factor proof (10m)'
      },
      {
        groupName: 'Module 5 (Q9 or Q10)',
        questionType: 'Long Comprehensive / Numerical',
        totalQuestionsOffered: 2,
        questionsToAttempt: 1,
        marksPerQuestion: 20,
        totalGroupMarks: 20,
        choiceRule: 'Answer either Q9 OR Q10 completely',
        stepMarkingPolicy: 'Hashing table collision trace (10m) + Graph MST algorithm (10m)'
      }
    ],
    strategicAdvice: [
      'CRITICAL: Under VTU rules, you CANNOT answer part (a) of Q1 and part (b) of Q2! You must choose one full question per module.',
      'Check all subdivisions of both questions before choosing. Pick the question where you know ALL parts.',
      'Every module carries equal 20 marks, so zero-skip strategy across modules is vital.'
    ],
    source: {
      sourceType: 'OFFICIAL_EXAM_PORTAL',
      sourceName: 'VTU Belagavi Examination Scheme & Question Paper Pattern (21 Scheme)',
      sourceUrl: 'https://vtu.ac.in',
      regulation: '21 Scheme / 2021 Regulation',
      academicYear: '2023-2024',
      verifiedAt: '2026-03-15',
      verifiedBy: 'VIDYA AI Academic Audit Team',
      verificationStatus: 'VERIFIED',
      verificationNotes: 'Verified against VTU 100-mark SEE format: 5 Modules with either/or full question choice per module (20 marks per module).'
    }
  },

  anna_univ: {
    universityId: 'anna_univ',
    universityName: 'Anna University Chennai',
    examTitle: 'B.E. / B.Tech End-Semester Examination',
    totalMarks: 100,
    passingMarks: 45,
    durationMinutes: 180,
    hasNegativeMarking: false,
    sections: [
      {
        groupName: 'Part A (Short Questions)',
        questionType: 'MCQ / Objective',
        totalQuestionsOffered: 10,
        questionsToAttempt: 10,
        marksPerQuestion: 2,
        totalGroupMarks: 20,
        choiceRule: '10 compulsory questions (2 questions from each unit)',
        stepMarkingPolicy: 'Definition (1m) + Principle / Syntax (1m)'
      },
      {
        groupName: 'Part B (Descriptive / Analytical)',
        questionType: 'Long Comprehensive / Numerical',
        totalQuestionsOffered: 10,
        questionsToAttempt: 5,
        marksPerQuestion: 13,
        totalGroupMarks: 65,
        choiceRule: '5 questions with internal either/or choice (e.g. 11(a) OR 11(b)) corresponding to 5 Units',
        stepMarkingPolicy: 'Architecture / Diagram (4m) + Implementation (5m) + Numerical Solution (4m)'
      },
      {
        groupName: 'Part C (Application / Case Study)',
        questionType: 'Case Study / Design',
        totalQuestionsOffered: 2,
        questionsToAttempt: 1,
        marksPerQuestion: 15,
        totalGroupMarks: 15,
        choiceRule: 'Either Q16(a) OR Q16(b), testing synthesis, real-world system design, or complex problem-solving',
        stepMarkingPolicy: 'System Architecture (5m) + Data Flow & Trade-off Analysis (6m) + Solution Formulation (4m)'
      }
    ],
    strategicAdvice: [
      'Part C (15 Marks) determines the Distinction grade: Focus on end-to-end system design rather than memorized theory.',
      'In Part B, answer with labeled diagrams; Anna University examiners follow a strict key scheme with specific diagram marks.',
      'Maintain clear unit-wise segregation in your answer booklet.'
    ],
    source: {
      sourceType: 'OFFICIAL_EXAM_PORTAL',
      sourceName: 'Anna University Centre for Academic Courses (Regulations 2021 CBCS)',
      sourceUrl: 'https://www.annauniv.edu',
      regulation: 'Regulations 2021 CBCS',
      academicYear: '2023-2024',
      verifiedAt: '2026-03-15',
      verifiedBy: 'VIDYA AI Academic Audit Team',
      verificationStatus: 'VERIFIED',
      verificationNotes: 'Verified against Anna University B.E./B.Tech End-Sem Rubric: Part A (10×2m), Part B (5×13m either/or), Part C (1×15m design/case-study).'
    }
  }
};

export const getBlueprintForUniversity = (uniId: string): UniversityBlueprint => {
  return UNIVERSITY_BLUEPRINTS[uniId] || UNIVERSITY_BLUEPRINTS.makaut;
};

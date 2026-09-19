/**
 * ============================================================================
 * VIDYA AI — SIH26101: iGOT Karmayogi Dedicated Dashboard
 * ============================================================================
 * Interactive capacity building hub for Government / Statistical System learners (MoSPI).
 * Features:
 * 1. Truthful Integration Status & Real-Time Health Check Inspector
 * 2. MoSPI / Indian Statistical Service (ISS) Cadre Profile
 * 3. FRAC Competency Gap Analysis Matrix
 * 4. Explainable iGOT Course Recommendations
 * 5. Genuine Deep Links to portal.igotkarmayogi.gov.in
 * 6. Adaptive Re-Assessment Quiz Modal with Instant Competency Level Upgrades
 * 7. Live Tamper-Evident Audit Log Viewer
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Award,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  HelpCircle,
  BarChart3,
  Layers,
  FileCheck2,
  Flame,
  X,
  Activity,
  Terminal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import {
  getIGOTService,
  IGOTLearnerProfile,
  IGOTCompetencyGap,
  IGOTCourse,
  IGOTHealthCheck,
  IGOTIntegrationAuditLog,
  IGOTQuizQuestion
} from '../../integrations/igot';

export const IGOTDashboard: React.FC = () => {
  const igotService = getIGOTService();

  const [profile, setProfile] = useState<IGOTLearnerProfile | null>(null);
  const [gaps, setGaps] = useState<IGOTCompetencyGap[]>([]);
  const [recommendations, setRecommendations] = useState<IGOTCourse[]>([]);
  const [health, setHealth] = useState<IGOTHealthCheck | null>(null);
  const [auditLogs, setAuditLogs] = useState<IGOTIntegrationAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showHealthModal, setShowHealthModal] = useState<boolean>(false);
  const [showAuditLogs, setShowAuditLogs] = useState<boolean>(false);

  // Re-assessment Quiz Modal State
  const [activeQuizCompetencyId, setActiveQuizCompetencyId] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<IGOTQuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prof, gapList, recs, hlth, logs] = await Promise.all([
        igotService.getLearnerProfile(),
        igotService.getCompetencyGaps(),
        igotService.getPersonalizedRecommendations(),
        igotService.checkHealth(),
        igotService.getAuditLogs()
      ]);

      setProfile(prof);
      setGaps(gapList);
      setRecommendations(recs);
      setHealth(hlth);
      setAuditLogs(logs);
    } catch (err) {
      console.error('Error loading iGOT data:', err);
      toast.error('Failed to load iGOT integration data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartQuiz = (competencyId: string) => {
    const questions = igotService.getQuizQuestionsForCompetency(competencyId);
    setQuizQuestions(questions);
    setActiveQuizCompetencyId(competencyId);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuizCompetencyId) return;

    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correct++;
      }
    });

    const percentage = Math.round((correct / quizQuestions.length) * 100);
    setQuizScore(percentage);
    setQuizSubmitted(true);

    const passed = percentage >= 70;

    await igotService.submitReAssessment(
      profile?.id || 'learner_iss_0921',
      activeQuizCompetencyId,
      correct,
      quizQuestions.length
    );

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success('Competency Assessment Passed!', {
        description: `Your proficiency score has been upgraded in the official MoSPI capacity registry.`
      });
    } else {
      toast.error('Assessment Did Not Meet 70% Threshold', {
        description: 'Review the iGOT learning modules and retake the verification quiz.'
      });
    }

    // Refresh dashboard state
    await loadData();
  };

  const handleCloseQuiz = () => {
    setActiveQuizCompetencyId(null);
    setQuizQuestions([]);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#FBFBFC] dark:bg-[#121214] text-[#1D1D1F] dark:text-[#F5F5F7] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* =======================================================================
            1. TOP HEADER & OFFICIAL PROVENANCE BADGE
            ======================================================================= */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1A1E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl">🏛️</span>
              <h1 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
                iGOT Karmayogi Integration Hub
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/20">
                SIH26101 Mandatory Core
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Civil Services Capacity Building platform for the <strong>Ministry of Statistics and Programme Implementation (MoSPI)</strong>. Powered by the <strong>Framework for Roles, Activities, and Competencies (FRAC)</strong>.
            </p>
          </div>

          {/* Integration Status & Health Button */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Status: MOCK (MoSPI Capacity Demo)</span>
            </div>

            <button
              type="button"
              onClick={() => setShowHealthModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono font-semibold transition-colors cursor-pointer"
              title="Inspect integration health status"
            >
              <Activity className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>Health Check</span>
            </button>

            <button
              type="button"
              onClick={loadData}
              disabled={isLoading}
              className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] text-xs transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh iGOT data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* =======================================================================
            2. MoSPI STATISTICAL LEARNER PROFILE CARD
            ======================================================================= */}
        {profile && (
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white dark:from-[#161B26] dark:via-[#181820] dark:to-[#16161A] border border-[#007AFF]/20 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-display font-extrabold text-xl shadow-md shrink-0">
                {profile.fullName.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-display font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {profile.fullName}
                  </h2>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#007AFF]/15 text-[#007AFF]">
                    {profile.karmayogiId}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {profile.designation} • {profile.department}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 pt-0.5 flex-wrap">
                  <span>🏛️ {profile.ministry}</span>
                  <span>•</span>
                  <span>🎖️ {profile.cadreOrService}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
              <div className="p-3 rounded-2xl bg-white/90 dark:bg-[#1C1C22]/90 border border-black/[0.06] dark:border-white/[0.08] text-center min-w-[110px]">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase font-bold">FRAC Tracked</span>
                <span className="text-xl font-display font-extrabold text-[#007AFF]">
                  {profile.competencyProfile.competencies.length}
                </span>
                <span className="text-[10px] text-neutral-500 block">Competencies</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/90 dark:bg-[#1C1C22]/90 border border-black/[0.06] dark:border-white/[0.08] text-center min-w-[110px]">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase font-bold">Identified Gaps</span>
                <span className="text-xl font-display font-extrabold text-amber-600 dark:text-amber-400">
                  {gaps.length}
                </span>
                <span className="text-[10px] text-neutral-500 block">Actionable</span>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================================
            3. FRAC COMPETENCY GAP MATRIX
            ======================================================================= */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <h3 className="text-base sm:text-lg font-display font-bold">
                FRAC Competency Map & Gap Detection
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-500 font-semibold">
              Scale: Level 1 (Foundational) to Level 5 (Expert)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {profile?.competencyProfile.competencies.map(comp => {
              const gap = comp.targetLevel - comp.currentLevel;
              const hasGap = gap > 0;

              return (
                <div
                  key={comp.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                    hasGap
                      ? 'bg-white dark:bg-[#1A1A1E] border-amber-500/30 dark:border-amber-500/20 hover:border-amber-500/50'
                      : 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300">
                        {comp.code}
                      </span>
                      {hasGap ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25">
                          -{gap} Level Gap
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Mastered</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-display font-bold text-[#1D1D1F] dark:text-[#F5F5F7] line-clamp-1">
                      {comp.name}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-500">
                        Current: <strong>L{comp.currentLevel}</strong>
                      </span>
                      <span className="text-[#007AFF] font-bold">
                        Target: L{comp.targetLevel}
                      </span>
                    </div>

                    {/* Progress Bar Level Visualization */}
                    <div className="w-full h-2 rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden flex">
                      <div
                        className={`h-full transition-all duration-500 ${
                          hasGap ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${(comp.currentLevel / 5) * 100}%` }}
                      />
                    </div>

                    {hasGap && (
                      <button
                        type="button"
                        onClick={() => handleStartQuiz(comp.id)}
                        className="w-full mt-1 py-1.5 px-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] hover:bg-[#007AFF] hover:text-white border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 transition-all cursor-pointer flex items-center justify-center gap-1.5 group"
                      >
                        <span>Take Verification Quiz</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =======================================================================
            4. EXPLAINABLE PERSONALIZED iGOT RECOMMENDATIONS
            ======================================================================= */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📚</span>
              <h3 className="text-base sm:text-lg font-display font-bold">
                Explainable iGOT Karmayogi Learning Recommendations
              </h3>
            </div>
            <span className="text-xs font-mono text-[#007AFF] font-semibold">
              VIDYA AI Adaptive Match Engine
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recommendations.map(course => (
              <div
                key={course.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#1A1A1E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs hover:border-[#007AFF]/40 transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/20">
                      {course.courseCode}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.2 rounded bg-black/[0.04] dark:bg-white/[0.06]">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base font-display font-bold text-[#1D1D1F] dark:text-[#F5F5F7] leading-snug">
                    {course.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="text-[11px] font-mono text-neutral-500">
                    Provider: <strong>{course.provider}</strong>
                  </div>

                  {/* Explainable Rationale Box */}
                  <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/25 border border-blue-200/60 dark:border-blue-800/40 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-[#007AFF] font-mono font-bold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Why This Course? (Explainability Engine)</span>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-[11px]">
                      {course.whyThisCourse}
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1">
                      <span>Gap: {course.competencyGap}</span>
                      <span className="px-1.5 py-0.2 rounded bg-[#007AFF]/10 text-[#007AFF]">
                        {course.mappingSource}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions: Open in iGOT & Quiz */}
                <div className="flex items-center gap-2.5 pt-1">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-mono font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Open in iGOT Karmayogi</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {course.competenciesCovered[0] && (
                    <button
                      type="button"
                      onClick={() => handleStartQuiz(course.competenciesCovered[0])}
                      className="py-2.5 px-3.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                      title="Take skill verification test to upgrade competency"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Verify Skill</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================================================
            5. AUDIT LOG INSPECTOR (COLLAPSIBLE)
            ======================================================================= */}
        <div className="rounded-3xl bg-white dark:bg-[#1A1A1E] border border-black/[0.08] dark:border-white/[0.08] p-5 shadow-xs">
          <button
            type="button"
            onClick={() => setShowAuditLogs(!showAuditLogs)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#007AFF]" />
              <h3 className="text-sm font-mono font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                iGOT Integration Audit Log Inspector ({auditLogs.length} Events)
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>{showAuditLogs ? 'Hide Logs' : 'View Audit Trail'}</span>
              {showAuditLogs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showAuditLogs && (
            <div className="mt-4 space-y-2 pt-3 border-t border-black/[0.06] dark:border-white/[0.08] max-h-64 overflow-y-auto custom-scrollbar pr-1">
              {auditLogs.map(log => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] text-xs font-mono flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-500'
                          : log.status === 'FALLBACK'
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <span className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {log.operation}
                    </span>
                    {log.externalResourceId && (
                      <span className="text-neutral-500 truncate max-w-[200px]">
                        [{log.externalResourceId}]
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-neutral-400 text-[11px]">
                    <span>{log.latencyMs}ms</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =======================================================================
          HEALTH CHECK MODAL
          ======================================================================= */}
      {showHealthModal && health && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-[#1A1A1E] rounded-3xl p-6 shadow-2xl border border-black/[0.08] dark:border-white/[0.08] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#007AFF]" />
                <h3 className="font-display font-extrabold text-lg">iGOT Integration Health Check</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHealthModal(false)}
                className="p-1.5 rounded-xl hover:bg-black/[0.05] dark:hover:bg-white/[0.05] text-neutral-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04]">
                <span>Active Integration Mode:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{health.mode}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04]">
                <span>Configuration Validation:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {health.configuration ? '✓ VERIFIED' : '✗ MISSING'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04]">
                <span>Authentication Gateway:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {health.authentication ? '✓ ACTIVE' : '✗ DISCONNECTED'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04]">
                <span>Course Discovery API:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{health.courseApi}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04]">
                <span>Progress Tracking API:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{health.progressApi}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04]">
                <span>Completion Status API:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{health.completionApi}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04]">
                <span>Last Sync Timestamp:</span>
                <span className="text-neutral-500">{new Date(health.lastSyncTimestamp || '').toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHealthModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#007AFF] text-white text-xs font-mono font-bold cursor-pointer"
            >
              Close Diagnostic Report
            </button>
          </div>
        </div>
      )}

      {/* =======================================================================
          ADAPTIVE RE-ASSESSMENT QUIZ MODAL
          ======================================================================= */}
      {activeQuizCompetencyId && quizQuestions.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white dark:bg-[#1A1A1E] rounded-3xl p-6 sm:p-7 shadow-2xl border border-black/[0.08] dark:border-white/[0.08] space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="space-y-0.5">
                <span className="text-xs font-mono text-[#007AFF] font-bold">
                  VIDYA AI Adaptive Evaluation • Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
                <h3 className="font-display font-bold text-base text-[#1D1D1F] dark:text-[#F5F5F7]">
                  Post-Learning Competency Verification
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseQuiz}
                className="p-1.5 rounded-xl hover:bg-black/[0.05] dark:hover:bg-white/[0.05] text-neutral-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Question */}
            {quizQuestions[currentQuestionIndex] && (
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-medium text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed">
                  {quizQuestions[currentQuestionIndex].question}
                </p>

                <div className="space-y-2.5">
                  {quizQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
                    const isCorrect = quizQuestions[currentQuestionIndex].correctOptionIndex === oIdx;

                    let btnClass = 'bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 hover:border-[#007AFF]/50';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-red-500/15 border-red-500 text-red-800 dark:text-red-300';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-[#007AFF]/15 border-[#007AFF] text-[#007AFF] font-bold ring-2 ring-[#007AFF]/30';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQuestionIndex, oIdx)}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px] font-mono shrink-0 mt-0.5">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Banner after Submit */}
                {quizSubmitted && (
                  <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs space-y-1">
                    <span className="font-mono font-bold text-[#007AFF] block">Methodological Explanation:</span>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {quizQuestions[currentQuestionIndex].explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-300 disabled:opacity-30 cursor-pointer"
              >
                ← Previous
              </button>

              {currentQuestionIndex < quizQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex(i => Math.min(quizQuestions.length - 1, i + 1))}
                  className="px-5 py-2.5 rounded-xl bg-[#007AFF] text-white text-xs font-mono font-bold cursor-pointer"
                >
                  Next Question →
                </button>
              ) : !quizSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  Submit & Verify Competency
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCloseQuiz}
                  className="px-6 py-2.5 rounded-xl bg-[#007AFF] text-white text-xs font-mono font-bold cursor-pointer"
                >
                  Return to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

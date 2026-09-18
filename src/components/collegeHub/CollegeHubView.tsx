import React, { useState } from 'react';
import { useOptionalStudy } from '../../context/StudyContext';
import { LAB_VIVA_QUESTIONS, PYQ_HEATMAPS, EMERGENCY_CRAM_ITEMS } from '../../data/collegeHubData';
import { BtechStudyMaterialView } from './BtechStudyMaterialView';
import { TopicDeepDiveSection } from './TopicDeepDiveSection';
import { BtechSemesterAnalyzer } from './BtechSemesterAnalyzer';
import { PyqPredictorVault } from './PyqPredictorVault';
import { UniversitySelectorBar } from './UniversitySelectorBar';
import { UniversalSyllabusUploaderModal } from './UniversalSyllabusUploaderModal';
import { UniversityFacultyFinder } from './UniversityFacultyFinder';
import { UniversityBlueprintViewer } from './UniversityBlueprintViewer';
import { LabVivaItem, PyqHeatmapItem, EmergencyCramItem } from '../../types';
import { 
  GraduationCap, 
  Flame, 
  HelpCircle, 
  AlertOctagon, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Volume2, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  Library, 
  Search,
  Users,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CollegeHubViewProps {
  setActiveTab?: (tab: any) => void;
  onOpenMockTest?: (subject: string, streamId?: string) => void;
  initialSemester?: number;
}

export const CollegeHubView: React.FC<CollegeHubViewProps> = ({ 
  setActiveTab: propSetActiveTab,
  onOpenMockTest,
  initialSemester = 3
}) => {
  const study = useOptionalStudy();
  const contextSetActiveTab = study?.setActiveTab;

  const setActiveTab = propSetActiveTab || contextSetActiveTab || (() => {});
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>('makaut');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTabLocal] = useState<'semesterAnalyzer' | 'facultyFinder' | 'blueprint' | 'pyqVault' | 'deepDive' | 'materials' | 'viva' | 'pyq' | 'cram'>('semesterAnalyzer');
  const [revealedAnswers, setRevealedAnswers] = useState<{ [id: string]: boolean }>({});

  const toggleReveal = (id: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCramClick = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleCustomSyllabusLoaded = (parsed: any) => {
    // When custom syllabus is ingested, switch to analyzer tab
    setActiveTabLocal('semesterAnalyzer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Pan-India University & Authority Switcher Bar */}
      <UniversitySelectorBar
        selectedUniversityId={selectedUniversityId}
        onSelectUniversity={(uniId) => setSelectedUniversityId(uniId)}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
      />

      {/* Universal AI Syllabus Uploader Modal */}
      <UniversalSyllabusUploaderModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSyllabusLoaded={handleCustomSyllabusLoaded}
      />

      {/* Header Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] mb-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#007AFF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30 text-xs font-bold mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>Pan-India Technical University Academic Intelligence Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-tight">
              B.Tech & Technical University Engine
            </h1>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed font-sans font-medium">
              Curricula across 35 institutions (MAKAUT, AKTU, VTU, Anna Univ, JNTU, IITs, NITs), topic-accredited teachers, official blueprints, and recurring PYQs.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto p-1.5 rounded-2xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08]">
            <button
              onClick={() => setActiveTabLocal('semesterAnalyzer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'semesterAnalyzer'
                  ? 'bg-[#007AFF] text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/[0.08]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>🎯 Sem 1-8 Analyzer</span>
            </button>
            <button
              onClick={() => setActiveTabLocal('facultyFinder')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'facultyFinder'
                  ? 'bg-[#007AFF] text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/[0.08]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>👨‍🏫 Topic Teachers (SIH26043)</span>
            </button>
            <button
              onClick={() => setActiveTabLocal('blueprint')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'blueprint'
                  ? 'bg-[#007AFF] text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/[0.08]'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>🏛️ Exam Blueprints</span>
            </button>
            <button
              onClick={() => setActiveTabLocal('pyqVault')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'pyqVault'
                  ? 'bg-[#007AFF] text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/[0.08]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>📜 Predicted Papers & PYQs</span>
            </button>
            <button
              onClick={() => setActiveTabLocal('deepDive')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'deepDive'
                  ? 'bg-[#007AFF] text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/[0.08]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>🔍 AI Topic Search</span>
            </button>
            <button
              onClick={() => setActiveTabLocal('materials')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'materials'
                  ? 'bg-[#007AFF] text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/[0.08]'
              }`}
            >
              📚 Subject Materials
            </button>
            <button
              onClick={() => setActiveTabLocal('viva')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'viva'
                  ? 'bg-[#007AFF] text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/[0.08]'
              }`}
            >
              🎤 Lab Viva Trainer
            </button>
            <button
              onClick={() => setActiveTabLocal('pyq')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'pyq'
                  ? 'bg-[#007AFF] text-white shadow-sm'
                  : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/[0.08]'
              }`}
            >
              🔥 PYQ Heatmap
            </button>
            <button
              onClick={() => setActiveTabLocal('cram')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'cram'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-[#1D1D1F]/70 dark:text-[#AAAAAA] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/[0.08]'
              }`}
            >
              ⚡ 1-Night Emergency
            </button>
          </div>
        </div>
      </div>

      {/* Tab 0: B.Tech Semester Cognitive Engine */}
      {activeTab === 'semesterAnalyzer' && (
        <BtechSemesterAnalyzer 
          initialSemester={initialSemester}
          selectedUniversityId={selectedUniversityId}
          setActiveTab={setActiveTab} 
          onOpenMockTest={onOpenMockTest} 
        />
      )}

      {/* Tab 0.1: SIH26043 Topic-Accredited Teachers */}
      {activeTab === 'facultyFinder' && (
        <UniversityFacultyFinder selectedUniversityId={selectedUniversityId} />
      )}

      {/* Tab 0.2: Official University Examination Blueprints */}
      {activeTab === 'blueprint' && (
        <UniversityBlueprintViewer selectedUniversityId={selectedUniversityId} />
      )}

      {/* Tab 0.5: Subject-Wise Predicted Semester Question Papers & PYQ Vault */}
      {activeTab === 'pyqVault' && (
        <PyqPredictorVault
          initialSemester={initialSemester}
          setActiveTab={setActiveTab}
          onOpenMockTest={onOpenMockTest}
        />
      )}

      {/* Tab 0: AI Topic Deep Dive Master */}
      {activeTab === 'deepDive' && <TopicDeepDiveSection />}

      {/* Tab 1: Subject Materials */}
      {activeTab === 'materials' && <BtechStudyMaterialView />}

      {/* Tab 1: Lab Viva Trainer */}
      {activeTab === 'viva' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Lab Viva & Technical Interview Simulator</span>
              </h2>
              <p className="text-xs text-slate-400">Master the exact keywords external university examiners listen for.</p>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-500/30">
              {LAB_VIVA_QUESTIONS.length} Viva Modules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LAB_VIVA_QUESTIONS.map((viva) => {
              const isRevealed = revealedAnswers[viva.id];

              return (
                <div
                  key={viva.id}
                  className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-purple-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-purple-300 font-mono">
                        {viva.subject} • {viva.topic}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                        {viva.difficulty}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white mb-4 leading-snug">
                      "{viva.question}"
                    </h3>

                    {/* Reveal Button */}
                    <button
                      onClick={() => toggleReveal(viva.id)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 mb-4 transition-all"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-purple-400" />}
                      <span>{isRevealed ? 'Hide Model Answer' : 'Reveal Model Answer & Keywords'}</span>
                    </button>

                    {/* Model Answer Body */}
                    {isRevealed && (
                      <div className="space-y-3 animate-fade-in">
                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                          <strong>Examiner Model Answer:</strong> {viva.modelAnswer}
                        </div>

                        {/* Keyword Chips */}
                        <div>
                          <div className="text-[11px] font-bold text-emerald-400 mb-1.5">
                            Must-Mention Keywords (Examiner Checklist):
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {viva.keywordsExpected.map((kw, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                              >
                                ✓ {kw}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Examiner Trap / Follow Up */}
                        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                          <strong>Typical Follow-Up Question:</strong> "{viva.examinerFollowUp}"
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Authentix Viva Evaluator</span>
                    <span className="text-purple-400">Score Guarantee</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: PYQ Heatmap */}
      {activeTab === 'pyq' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-400 fill-rose-400" />
              <span>Previous Year Questions (PYQ) Frequency Heatmap</span>
            </h2>
            <p className="text-xs text-slate-400">Historical marks recurrence calculated across 5+ years of university question papers.</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Subject & Topic</th>
                    <th className="py-3 px-4">Recurrence Frequency</th>
                    <th className="py-3 px-4">Avg Marks Yield</th>
                    <th className="py-3 px-4">Recurrence Tag</th>
                    <th className="py-3 px-4">Expected Question Formats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {PYQ_HEATMAPS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-white">{row.topic}</div>
                        <div className="text-[11px] text-slate-400">{row.subject}</div>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold">
                        <span className="text-emerald-400">{row.frequency}%</span> of past papers
                      </td>
                      <td className="py-4 px-4 font-mono text-brand-300 font-bold">
                        {row.averageMarks} Marks
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                          row.frequency > 90
                            ? 'badge-high-yield'
                            : 'badge-core-theory'
                        }`}>
                          {row.recurrenceTag}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[11px] text-slate-300">
                        {row.expectedQuestionTypes.join(' • ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 1-Night-Before Emergency Cramming */}
      {activeTab === 'cram' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-200">
            <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold">1-Night-Before Emergency Passing Checklist</h3>
              <p className="text-xs text-rose-300 mt-0.5">
                Exam is in less than 24 hours? Don't panic. These 3 high-yield modules alone cover 50+ passing marks. Master these cheat sheets immediately.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EMERGENCY_CRAM_ITEMS.map((item) => (
              <div
                key={item.id}
                className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400">{item.subject}</span>
                    <span className="text-emerald-400 font-bold">+{item.assuredMarks} Marks</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{item.topic}</h3>
                  <div className="text-xs text-brand-300 font-mono mb-4 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Est. Time: {item.hoursNeeded} Hours</span>
                  </div>

                  {/* Cheat sheet */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-line leading-relaxed mb-4">
                    {item.summaryCheatSheet}
                  </div>

                  {/* Top 3 PYQs */}
                  <div>
                    <div className="text-[11px] font-bold text-white mb-2">Top 3 Guaranteed PYQs:</div>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {item.top3Pyqs.map((q, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-brand-400 shrink-0 font-bold">#{i+1}</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={handleCramClick}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Mark as Crammed</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

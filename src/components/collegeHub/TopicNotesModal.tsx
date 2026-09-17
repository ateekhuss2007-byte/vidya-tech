import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, BookOpen, HelpCircle, Copy, Download,
  Play, ExternalLink, Award, Lightbulb,
  Star, Brain, CheckCircle2, Loader2, ArrowLeft,
  FileText, GraduationCap, Hash, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { generateTopicNote, type TopicNote } from '../../data/topicNotesDatabase';

interface TopicNotesModalProps {
  topicName: string;
  subjectCode: string;
  subjectName: string;
  semesterNum: number;
  onClose: () => void;
}

export const TopicNotesModal: React.FC<TopicNotesModalProps> = ({
  topicName, subjectCode, subjectName, semesterNum, onClose
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'youtube' | 'formulas' | 'viva' | 'pyq'>('notes');
  const [note, setNote] = useState<TopicNote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setNote(null);
    setActiveVideo(null);
    const timer = setTimeout(() => {
      const fetchedNote = generateTopicNote(topicName, subjectCode, subjectName, semesterNum);
      setNote(fetchedNote);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [topicName]);

  const handleCopyNote = () => {
    if (!note) return;
    const text = `# ${note.topicName}\nSubject: ${note.subjectName} | Semester ${note.semester}\n\nOVERVIEW\n${note.overview}\n\nINTUITION\n${note.intuition}\n\nCORE THEORY\n${note.coreTheory.map(ct => ct.heading + '\n' + ct.points.join('\n')).join('\n\n')}\n\nFORMULAS\n${note.formulas.map(f => f.label + ': ' + f.formula).join('\n')}\n\nEXAM TIPS\n${note.examTips.join('\n')}\n\nVIVA Q&A\n${note.vivaQA.map(v => 'Q: ' + v.q + '\nA: ' + v.a).join('\n\n')}`;
    navigator.clipboard.writeText(text);
    toast.success('Full notes copied to clipboard!');
  };

  const handleCopyFormula = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
    toast.success('Formula copied!');
  };

  const TABS = [
    { id: 'notes', label: '📖 Full Notes' },
    { id: 'youtube', label: '▶️ YouTube' },
    { id: 'formulas', label: '🔢 Formulas' },
    { id: 'viva', label: '🎤 Viva Q&A' },
    { id: 'pyq', label: '🔥 PYQ Answers' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
      />
      <motion.div
        key="modal"
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-3xl z-[9999] flex flex-col bg-white dark:bg-[#1D1D1F] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 bg-[#1D1D1F] text-[#F5F5F7] border-b border-[#AAAAAA]/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 transition-all cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="px-2 py-0.5 rounded-md bg-white/20 text-xs font-mono font-bold">{subjectCode}</span>
              <span className="text-xs opacity-80 font-mono">Semester {semesterNum}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleCopyNote} disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold transition-all cursor-pointer disabled:opacity-50">
                <Copy className="w-3.5 h-3.5" /> Copy Notes
              </button>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 transition-all cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <h2 className="text-xl font-bold leading-tight">{topicName}</h2>
          <p className="text-xs opacity-80 mt-0.5 font-mono">{subjectName}</p>
        </div>

        {/* Tab Bar */}
        <div className="flex-shrink-0 flex items-center gap-1 px-4 py-3 bg-[#F5F5F7] dark:bg-[#1D1D1F] border-b border-[#AAAAAA]/30 dark:border-white/[0.08] overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25'
                  : 'text-slate-600 dark:text-[#AAAAAA] hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Loader2 className="w-3 h-3 text-white animate-spin" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7] text-sm">Generating Notes for "{topicName}"...</p>
                <p className="text-xs text-[#1D1D1F]/60 dark:text-[#AAAAAA] mt-1">Collecting from R-25 Syllabus + Internet Databases</p>
              </div>
              <div className="w-48 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  animate={{ width: ['5%', '95%'] }} transition={{ duration: 0.7, ease: 'easeInOut' }} />
              </div>
            </div>
          ) : note ? (
            <div className="p-5 space-y-5">

              {/* NOTES TAB */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider font-mono">Intuitive Understanding First</span>
                    </div>
                    <p className="text-sm text-slate-800 dark:text-amber-100/90 leading-relaxed">{note.intuition}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08]">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-[#007AFF] uppercase tracking-wider font-mono">Formal Definition & Academic Overview</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{note.overview}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" /> Comprehensive Theory & Key Concepts
                    </h4>
                    {note.coreTheory.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-2">
                        <h5 className="text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7] border-b border-[#AAAAAA]/25 dark:border-white/[0.08] pb-1.5">{item.heading}</h5>
                        <ul className="space-y-1.5">
                          {item.points.map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        {item.code && (
                          <pre className="mt-2 p-3 rounded-xl bg-slate-950 text-emerald-400 text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800">{item.code}</pre>
                        )}
                      </div>
                    ))}
                  </div>

                  {note.solvedExample && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                          <Award className="w-4 h-4 text-emerald-600" /> Step-by-Step Solved University Problem
                        </h4>
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold border border-emerald-200/60 dark:border-emerald-800/60">10-MARK MODEL ANSWER</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-3">
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs">
                          <strong className="text-amber-700 dark:text-amber-300">Problem: </strong><span className="text-slate-800 dark:text-amber-100">{note.solvedExample.problem}</span>
                        </div>
                        <div className="space-y-2">
                          {note.solvedExample.steps.map((step, i) => (
                            <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-[#AAAAAA]/30 dark:border-white/[0.08] text-xs font-mono text-slate-800 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{step}</div>
                          ))}
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs">
                          <strong className="text-emerald-700 dark:text-emerald-300">Final Answer: </strong><span className="text-slate-800 dark:text-emerald-100">{note.solvedExample.answer}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase font-mono tracking-wider">Examiner's Scoring Strategy</span>
                    </div>
                    <ul className="space-y-1.5">
                      {note.examTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs">
                    <GraduationCap className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">Prescribed Books: </span>
                      <span className="text-slate-600 dark:text-[#AAAAAA]">{note.books.join(' • ')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* YOUTUBE TAB */}
              {activeTab === 'youtube' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-xs text-red-800 dark:text-red-300 font-mono">
                    🎥 <strong>Curated Top Lectures</strong> for "{topicName}" — Embed or open on YouTube.
                  </div>
                  {activeVideo && (
                    <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-white text-xs">
                        <span className="font-bold flex items-center gap-2"><Play className="w-4 h-4 text-red-500 fill-current" /> Playing Embedded Lecture</span>
                        <button onClick={() => setActiveVideo(null)} className="text-[#AAAAAA] hover:text-white flex items-center gap-1 cursor-pointer"><X className="w-4 h-4" /> Close</button>
                      </div>
                      <div className="w-full aspect-video rounded-xl overflow-hidden">
                        <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} title="Lecture" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full border-0" />
                      </div>
                    </div>
                  )}
                  <div className="space-y-3">
                    {note.youtubeVideos.map((vid, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-red-400 dark:hover:border-red-600 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/40 flex items-center justify-center shrink-0">
                            <Play className="w-4 h-4 text-red-600 fill-current" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200/60">{vid.badge}</span>
                              <span className="text-[10px] text-[#AAAAAA] font-mono">{vid.duration}</span>
                            </div>
                            <h5 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-0.5 leading-tight">{vid.title}</h5>
                            <p className="text-xs text-[#1D1D1F]/60 dark:text-[#AAAAAA] font-mono">📺 {vid.channel}</p>
                            <p className="text-[11px] text-[#1D1D1F]/60 dark:text-[#AAAAAA] mt-1 leading-relaxed">{vid.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#AAAAAA]/30 dark:border-white/[0.08]">
                          {vid.embedId && (
                            <button onClick={() => setActiveVideo(vid.embedId!)}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer">
                              <Play className="w-3.5 h-3.5 fill-current" /> Watch Here
                            </button>
                          )}
                          <a href={vid.url} target="_blank" rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all">
                            <ExternalLink className="w-3.5 h-3.5" /> Open YouTube ↗
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-2">
                    <p className="text-xs font-bold text-slate-600 dark:text-[#AAAAAA] uppercase font-mono">Also Find Notes On:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: 'GeeksForGeeks', url: `https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(topicName)}`, color: 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-900/40' },
                        { name: 'NPTEL', url: `https://nptel.ac.in/search?q=${encodeURIComponent(topicName)}`, color: 'bg-[#007AFF]/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/40' },
                        { name: 'Javatpoint', url: `https://www.javatpoint.com/search?q=${encodeURIComponent(topicName)}`, color: 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-900/40' },
                        { name: 'W3Schools', url: `https://www.w3schools.com/search?q=${encodeURIComponent(topicName)}`, color: 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-900/40' },
                      ].map(site => (
                        <a key={site.name} href={site.url} target="_blank" rel="noreferrer"
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${site.color}`}>
                          <ExternalLink className="w-3 h-3" /> {site.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FORMULAS TAB */}
              {activeTab === 'formulas' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 text-xs text-purple-800 dark:text-purple-300 font-mono">
                    🔢 <strong>Quick-Reference Formula Sheet</strong> — Click any formula to copy instantly.
                  </div>
                  <div className="space-y-3">
                    {note.formulas.map((formula, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-purple-400 dark:hover:border-purple-600 transition-all">
                        <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900/40 flex items-center justify-center shrink-0 text-xs font-mono font-bold text-purple-700 dark:text-purple-300">{idx + 1}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#1D1D1F]/60 dark:text-[#AAAAAA] uppercase font-mono mb-1">{formula.label}</div>
                          <div className="p-3 rounded-xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] font-mono text-sm text-[#1D1D1F] dark:text-[#F5F5F7] select-all break-words leading-relaxed">{formula.formula}</div>
                          {formula.note && <p className="text-[11px] text-[#1D1D1F]/60 dark:text-[#AAAAAA] mt-1.5 leading-relaxed">{formula.note}</p>}
                        </div>
                        <button onClick={() => handleCopyFormula(formula.formula)}
                          className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950/60 text-slate-600 dark:text-[#AAAAAA] hover:text-purple-700 dark:hover:text-purple-300 transition-all cursor-pointer shrink-0">
                          {copiedFormula === formula.formula ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIVA TAB */}
              {activeTab === 'viva' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-xs text-indigo-800 dark:text-indigo-300 font-mono">
                    🎤 <strong>Lab Viva & Oral Exam Q&A</strong> — Most frequently asked by examiners. Memorize these answers.
                  </div>
                  <div className="space-y-3">
                    {note.vivaQA.map((viva, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-2">
                        <div className="flex items-start gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                          <span className="font-mono shrink-0">Q{idx + 1}.</span><span>{viva.q}</span>
                        </div>
                        <div className="pl-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <strong className="text-emerald-600 dark:text-emerald-400">Ans: </strong>{viva.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PYQ TAB */}
              {activeTab === 'pyq' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-800 dark:text-rose-300 font-mono">
                    🔥 <strong>Past Year University Questions</strong> — Appeared in MAKAUT/NIT exams. Study model answers for max marks.
                  </div>
                  <div className="space-y-4">
                    {note.pyqs.map((pyq, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[10px] font-mono font-bold border border-rose-200/60 dark:border-rose-900/40">🔥 {pyq.frequency}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-bold">{pyq.marks} Marks</span>
                        </div>
                        <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed">{pyq.question}</p>
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-1">
                          <div className="text-[10px] font-mono font-bold text-[#AAAAAA] uppercase">Model Answer (Step-Marking Format):</div>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{pyq.modelAnswer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 gap-3 p-8">
              <AlertCircle className="w-12 h-12 text-slate-300" />
              <p className="text-sm text-[#1D1D1F]/60 dark:text-[#AAAAAA] text-center">
                Notes not available for this topic. Please try the Study Hub search.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-3 bg-[#F5F5F7] dark:bg-[#1D1D1F] border-t border-[#AAAAAA]/30 dark:border-white/[0.08] flex items-center justify-between">
          <div className="text-xs text-[#1D1D1F]/60 dark:text-[#AAAAAA] font-mono">R-25 Official Syllabus + Internet Data</div>
          <button onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-bold transition-all cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Print / PDF
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

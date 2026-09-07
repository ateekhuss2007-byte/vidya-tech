import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { 
  Sparkles, 
  Bot, 
  Send, 
  X, 
  Brain, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { studentData } from '../data/studentMock';
import { analyzeSemesterSyllabus, queryR25Syllabus } from '../data/btechSemesterSyllabusData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const AiAssistant = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      text: `Hello ${studentData.name ? studentData.name.split(' ')[0] : 'Aryan'}! I am your VIDYA Cognitive Co-Pilot. I've analyzed your Cognitive Learning Twin: Readiness is at 87% (optimal), but I've detected a high-priority prerequisite gap in Eigenvalues (#BLK-01) that is currently blocking Principal Component Analysis.`
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const suggestedPrompts = [
    'Show R-25 Sem 3 syllabus',
    'What is in CS302 DAA Module 2?',
    'Tell me all labs in 4th Sem',
    'Total credits in B.Tech R-25'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    setConversation(prev => [...prev, { role: 'user', text: query }]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let response = '';
      const q = query.toLowerCase();

      // 1. Check for syllabus / subject / module / lab / credit query in R-25
      const syllabusResult = queryR25Syllabus(query);
      const isSyllabusRelated = 
        q.includes('sem') || 
        q.includes('syllabus') || 
        q.includes('subject') || 
        q.includes('credit') || 
        q.includes('course') || 
        q.includes('module') || 
        q.includes('lab') || 
        q.includes('book') || 
        q.includes('r-25') || 
        q.includes('r25') || 
        q.includes('nit') ||
        syllabusResult.matchedCourses.length > 0 ||
        syllabusResult.matchedModules.length > 0 ||
        syllabusResult.matchedLabs.length > 0;

      if (q.includes('total credit') || q.includes('credits distribution') || q.includes('degree credit')) {
        response = `🎓 **B.Tech CSE Regulation-25 (R-25) Credit Structure (Total: 160 Credits):**\n\n` +
          `• **1st Year (40 Cr):** Sem 1 = 18 Cr | Sem 2 = 22 Cr\n` +
          `• **2nd Year (50.5 Cr):** Sem 3 = 28 Cr | Sem 4 = 22.5 Cr\n` +
          `• **3rd Year (45.5 Cr):** Sem 5 = 22 Cr | Sem 6 = 23.5 Cr\n` +
          `• **4th Year (24 Cr):** Sem 7 = 16 Cr | Sem 8 = 8 Cr\n\n` +
          `📌 **NEP 2020 Category Split:** Major: 85.5 | Minor: 22.5 | Multi-Disciplinary: 11 | AEC: 4 | SEC: 10 | VAC: 5 | Project: 18 | Internship: 2 | Grand Viva: 2.`;
      } else if (isSyllabusRelated && syllabusResult.answerSummary) {
        response = syllabusResult.answerSummary;
      } else if (q.includes('revise') || q.includes('today')) {
        response = `Based on your Ebbinghaus memory decay model, you should spend 15 minutes reinforcing "Eigenvalues & Diagonalization" (M101/M201) and 10 minutes reviewing "Strassen Matrix Multiplication & Master Theorem" (CS302). This will boost your retention from 68% to 94%.`;
      } else if (q.includes('pca') || q.includes('struggling') || q.includes('block')) {
        response = `Root cause identified by Diagnostic Agent: You missed prerequisite Node #c4 (Eigenvalues & Eigenvectors in M101). PCA relies on projecting variance along maximum eigenvectors. Once we stabilize your vector projection math, PCA in CS403 (Machine Learning) and CS603C (Data Analytics) will become intuitive!`;
      } else if (q.includes('plan') || q.includes('7-day')) {
        response = `I have synthesized an optimized 7-day topological study path for B.Tech CSE: \n• Days 1-2: CS302 DAA (Divide & Conquer, Greedy & Dynamic Programming)\n• Days 3-4: CS303 OS (CPU Scheduling, Semaphores & Banker's Algorithm)\n• Days 5-6: CS301 Computer Architecture (Cache Mapping & Pipelining Hazards)\n• Day 7: Speed Mock Exam Drill with negative marking.`;
      } else {
        response = `Analyzing your request against the official R-25 Knowledge Base (Narula Institute of Technology, B.Tech CSE, 160 Credits, Sem 1-8)... Your cognitive load is currently at 42% (low). You can ask me any question about course codes, modules, lab experiments, books, or credit structures!`;
      }

      setConversation(prev => [...prev, { role: 'assistant', text: response }]);
      setIsThinking(false);
    }, 500);
  };

  return (
    <>
      {/* Persistent Floating Bottom-Right Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full liquid-glass text-slate-900 dark:text-sky-100 shadow-[0_8px_30px_rgba(14,165,233,0.3)] hover:shadow-[0_12px_40px_rgba(56,189,248,0.5)] hover:scale-105 transition-all flex items-center gap-2.5 font-medium text-xs cursor-pointer border border-sky-400/40 select-none backdrop-blur-2xl"
        aria-label="Open VIDYA AI Assistant"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
        </span>
        <Sparkles className="w-4 h-4 text-sky-400" />
        <span className="font-semibold text-slate-900 dark:text-sky-100 tracking-wide font-montserrat">Ask VIDYA AI</span>
      </button>

      {/* Radix Dialog for AI Assistant */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md animate-fade-in" />
          <Dialog.Content className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 w-[95vw] sm:w-[440px] max-h-[85vh] rounded-3xl liquid-glass-card border border-white/80 dark:border-sky-500/30 shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in backdrop-blur-2xl">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-black/[0.06] dark:border-sky-500/20 flex items-center justify-between bg-sky-500/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm border border-sky-300/40">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <Dialog.Title className="text-sm font-bold text-slate-900 dark:text-white font-montserrat">
                    VIDYA Cognitive Co-Pilot
                  </Dialog.Title>
                  <p className="text-[10px] text-sky-500 dark:text-sky-300 font-mono font-medium">Grounded in Student State</p>
                </div>
              </div>
              <Dialog.Close asChild>
                <button className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>

            {/* Conversation Log */}
            <div className="p-4 sm:p-5 overflow-y-auto max-h-[380px] space-y-3.5 text-xs">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px] font-mono mt-0.5 shadow-xs">
                      V
                    </div>
                  )}
                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-sky-500 text-white rounded-br-none font-medium shadow-sm'
                        : 'liquid-glass border border-white/60 dark:border-sky-500/20 text-slate-800 dark:text-sky-100 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 text-xs text-sky-500 dark:text-sky-300 font-mono pl-8 animate-pulse">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span>Analyzing your learning pattern...</span>
                </div>
              )}
            </div>

            {/* Quick Suggested Prompt Chips */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-black/[0.04] dark:border-sky-500/20 bg-sky-500/[0.02]">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 text-[11px] font-mono transition-all cursor-pointer truncate max-w-[200px] border border-sky-400/20"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3.5 border-t border-black/[0.06] dark:border-sky-500/20 flex items-center gap-2 bg-white/40 dark:bg-slate-900/40"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about your syllabus, weak nodes, or study plan..."
                className="flex-grow px-3.5 py-2.5 rounded-2xl bg-white/70 dark:bg-slate-950/60 border border-slate-200 dark:border-sky-500/30 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isThinking}
                className="p-2.5 rounded-2xl liquid-glass-button disabled:opacity-40 transition-all cursor-pointer shrink-0 font-bold"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

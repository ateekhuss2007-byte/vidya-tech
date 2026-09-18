import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Trash2, Minimize2, ChevronDown } from 'lucide-react';

const getNow = () =>
  new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

const getSmartResponse = (query) => {
  const q = query.toLowerCase().trim();
  if (/^(hi|hello|hey|namaste|hlo|hii)[\s!]*$/.test(q))
    return `Namaste! Main VIDYA AI hun — aapka personal academic assistant.\n\nMain help kar sakta hun:\n📚 Syllabus & subject questions\n📝 PYQ patterns & exam tips\n🧠 Study plans & revision strategy\n⚡ Quick concept explanations\n\nPucho jo bhi mann mein aaye!`;
  if (q.includes('syllabus') || q.includes('sem') || q.includes('semester'))
    return `📋 B.Tech CSE (R-25) Semester Overview:\n\n• Sem 1 (18 Cr): Mathematics-I, Engineering Physics, BEE, C Programming\n• Sem 2 (22 Cr): Mathematics-II, Engg Chemistry, Basic Electronics, DSA\n• Sem 3 (28 Cr): DSA, Digital Logic, COA, Discrete Math, OS\n• Sem 4 (22.5 Cr): DAA, Operating Systems, DBMS, FLAT\n• Sem 5 (22 Cr): Compiler Design, Computer Networks, SE, OOP\n• Sem 6 (23.5 Cr): ML, Cloud Computing, Web Tech, AI\n\nKis semester ki detail chahiye?`;
  if (q.includes('dsa') || q.includes('data structure') || q.includes('algorithm'))
    return `🔷 Data Structures & Algorithms (DSA):\n\nHigh-Priority Topics:\n• Arrays, Linked Lists, Stacks, Queues\n• Binary Trees & BST — very frequently asked in PYQs\n• Graph Traversal (BFS/DFS) — 10M questions every year\n• Sorting: QuickSort O(n log n), MergeSort, HeapSort\n• Dynamic Programming: 0/1 Knapsack, LCS, Matrix Chain\n\nPYQ Trend: Tree traversal + DP problems = ~40% of exam paper\n\n📌 Tip: Practice 2 graph + 2 DP problems daily for 7 days.`;
  if (q.includes('dbms') || q.includes('database') || q.includes('sql'))
    return `🗄️ Database Management Systems (DBMS):\n\nCore Topics:\n• ER Diagram → Relational Model conversion\n• Normalization: 1NF → 2NF → 3NF → BCNF\n• SQL: SELECT, JOIN (INNER/LEFT/RIGHT), GROUP BY, HAVING\n• Transactions: ACID properties, Serializability\n• Indexing: B+ Tree, Hashing\n\nPYQ Pattern: Normalization + SQL queries = 30% weightage\n\n📌 Quick: 2NF = No partial dependency | 3NF = No transitive dependency`;
  if (q.includes('os') || q.includes('operating system') || q.includes('deadlock') || q.includes('process'))
    return `⚙️ Operating Systems (OS):\n\nMost Asked Topics:\n• CPU Scheduling: FCFS, SJF, Round Robin, Priority\n• Memory Management: Paging, Segmentation, Virtual Memory\n• Deadlock: Conditions, Prevention, Banker's Algorithm\n• Semaphores & Mutex — Producer-Consumer Problem\n• File Systems: FAT, Inode\n\n📌 Banker's Algorithm numerical + Round Robin Gantt chart = guaranteed 10M question.`;
  if (q.includes('math') || q.includes('calculus') || q.includes('matrix') || q.includes('eigen'))
    return `📐 Engineering Mathematics:\n\nSemester Coverage:\n• Sem 1 (M101): Calculus, Matrices, Eigenvalues, Cayley-Hamilton\n• Sem 2 (M201): ODE, Complex Variables, Laplace Transform\n• Sem 3 (M301): Numerical Methods, Fourier Series, PDE\n\nFormula Quick Ref:\n• Eigenvalue: |A − λI| = 0\n• Cayley-Hamilton: Every matrix satisfies its own characteristic equation\n\n📌 At least 1 Eigenvalue numerical appears in every B.Tech exam.`;
  if (q.includes('study plan') || q.includes('plan') || q.includes('schedule') || q.includes('timetable'))
    return `📅 7-Day Smart Study Plan (Exam Mode):\n\nDay 1-2: High-weightage theory — DSA Trees + Graphs\nDay 3: OS — CPU Scheduling + Deadlock numericals\nDay 4: DBMS — Normalization + SQL JOIN practice\nDay 5: Mathematics — Eigenvalues + ODE\nDay 6: Full-length PYQ mock test (3 hours)\nDay 7: Weak topic revision + formula cheat sheet\n\n📌 Golden Rule: Spend 60% time on PYQs, 40% on concept notes.`;
  if (q.includes('pyq') || q.includes('previous year') || q.includes('past paper'))
    return `📄 Previous Year Questions (PYQ) Strategy:\n\nWhy PYQs are crucial:\n• 70-80% of exam questions follow PYQ patterns\n• Examiner repeats similar numericals with different values\n\nSubject-wise PYQ Focus:\n• DSA: Tree traversal + Sorting numericals (last 5 yrs)\n• OS: Banker's Algorithm + Round Robin (every year)\n• DBMS: SQL queries + Normal form proofs\n• Math: Eigenvalue + Laplace transform\n\n📌 Pro Tip: Solve last 3 years papers in timed conditions!`;
  if (q.includes('placement') || q.includes('interview') || q.includes('job'))
    return `💼 Placement Preparation Guide:\n\nTechnical Rounds:\n• DSA: LeetCode Easy-Medium (100+ problems minimum)\n• CS Fundamentals: OS, DBMS, Networks (must-know)\n• OOPs: Polymorphism, Inheritance, Design Patterns\n\nTop Companies:\n• TCS, Infosys, Wipro: Aptitude + Basic Programming\n• Capgemini, Cognizant: Technical MCQs + Coding\n• Amazon, Microsoft: Data Structures + System Design\n\n📌 Start 6 months before placements. Daily: 1hr DSA + 30min aptitude.`;
  if (q.includes('network') || q.includes('osi') || q.includes('tcp'))
    return `🌐 Computer Networks:\n\nOSI Model Layers (top to bottom):\n7. Application → 6. Presentation → 5. Session\n4. Transport → 3. Network → 2. Data Link → 1. Physical\n\nKey Protocols:\n• TCP/IP: Reliable, connection-oriented\n• UDP: Fast, connectionless (video/gaming)\n• DNS: Domain → IP resolution\n• HTTP/HTTPS: Web communication (port 80/443)\n\nSubnetting: Hosts per subnet = 2^(host bits) − 2\n\n📌 OSI identification + Subnetting = common 5M questions.`;
  if (q.includes('ml') || q.includes('machine learning') || q.includes('ai'))
    return `🤖 Machine Learning / AI Overview:\n\nCore Algorithms:\n• Supervised: Linear Regression, Logistic Regression, SVM, Decision Tree\n• Unsupervised: K-Means Clustering, PCA, DBSCAN\n• Deep Learning: CNN (Images), RNN/LSTM (Sequences), Transformer (NLP)\n\nKey Metrics: Accuracy, Precision, Recall, F1-Score, ROC-AUC\n\n📌 Exam Tip: Bias-Variance tradeoff + Overfitting = theory favorite.`;
  if (q.includes('backlog') || q.includes('arrear') || q.includes('fail'))
    return `🆘 Backlog Clearing Strategy:\n\nEmergency Plan (2-3 weeks):\n• Day 1: Get last 5 years PYQs for that subject\n• Day 2-5: Cover only high-weightage chapters\n• Day 6-10: Solve PYQs — identify repetitive questions\n• Day 11-14: Write practice answers, memorize formulas\n\nSmart Shortcuts:\n• Focus on Group A (short) & Group B (medium) = 40% marks guaranteed\n• Group C (long): Attempt any 1 out of 2\n\n📌 Don't panic. With 2 focused weeks, clearing is very achievable! 💪`;
  if (q.includes('credit'))
    return `📊 B.Tech CSE R-25 Credit Structure (Total: 160 Credits):\n\n• 1st Year (40 Cr): Sem 1 = 18 | Sem 2 = 22\n• 2nd Year (50.5 Cr): Sem 3 = 28 | Sem 4 = 22.5\n• 3rd Year (45.5 Cr): Sem 5 = 22 | Sem 6 = 23.5\n• 4th Year (24 Cr): Sem 7 = 16 | Sem 8 = 8\n\nNEP 2020 Split: Major: 85.5 | Minor: 22.5 | Multi-Disciplinary: 11\nAEC: 4 | SEC: 10 | VAC: 5 | Project: 18 | Internship: 2`;
  if (q.includes('who are you') || q.includes('what are you') || q.includes('vidya'))
    return `🎓 Main VIDYA AI hun!\n\nVIDYA = Verbatim Intelligent Dynamic Academic Engine\n\nMain India ka pehla verbatim academic AI platform hun jo:\n✅ Official university syllabus ke saath kaam karta hai\n✅ 500+ universities ko cover karta hai\n✅ 10,000+ authentic PYQ vaults rakhta hai\n✅ Personalized study plans banata hai`;
  return `🔍 Aapka sawaal mila!\n\nMain in topics pe best help kar sakta hun:\n📚 Subjects: DSA, OS, DBMS, CN, ML, Math\n📋 Syllabus & semester queries\n📝 PYQ Strategy & exam tips\n📅 Study Plans & revision schedules\n🎯 CGPA & placement prep\n🆘 Backlog clearing strategy\n\nApna sawaal thoda specific karo ya neeche topic choose karo! 😊`;
};

const QUICK_TOPICS = [
  { label: 'DSA', icon: '🔷', prompt: 'Tell me about DSA important topics' },
  { label: 'DBMS', icon: '🗄️', prompt: 'Explain DBMS key topics for exam' },
  { label: 'OS', icon: '⚙️', prompt: 'What are the most important OS topics?' },
  { label: 'Networks', icon: '🌐', prompt: 'Explain Computer Networks OSI model' },
  { label: 'Math', icon: '📐', prompt: 'Important Engineering Mathematics topics' },
  { label: 'ML/AI', icon: '🤖', prompt: 'Machine learning topics for exam' },
  { label: 'Study Plan', icon: '📅', prompt: 'Give me a 7-day study plan' },
  { label: 'PYQ Tips', icon: '📝', prompt: 'How to use PYQs effectively?' },
];

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    text: `Namaste! Main VIDYA AI hun 👋\n\nMain aapka personal student assistant hun. Syllabus, subjects, PYQs, study plans — kuch bhi pucho!\n\nNeeche topics choose karo ya seedha type karo. 😊`,
    time: getNow(),
  },
];

const MessageBubble = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm text-white ${isUser ? 'bg-[#007AFF]' : 'bg-gradient-to-br from-sky-400 to-blue-600'}`}>
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>
      <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-[13px] leading-[1.65] shadow-sm ${isUser ? 'bg-[#007AFF] text-white rounded-br-[4px]' : 'bg-white/90 dark:bg-[#1C1C2E]/95 border border-black/[0.07] dark:border-white/10 text-[#1D1D1F] dark:text-[#E8E8ED] rounded-bl-[4px]'}`}>
        <p className="whitespace-pre-line">{msg.text}</p>
        <span className={`text-[10px] mt-1.5 block font-mono ${isUser ? 'text-white/60' : 'text-neutral-400'}`}>{msg.time}</span>
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-end gap-2">
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shrink-0">
      <Bot className="w-3.5 h-3.5 text-white" />
    </div>
    <div className="bg-white/90 dark:bg-[#1C1C2E]/95 border border-black/[0.07] dark:border-white/10 px-4 py-3 rounded-2xl rounded-bl-[4px] flex items-center gap-1.5">
      {[0, 0.2, 0.4].map((d, i) => (
        <span key={i} className="w-2 h-2 rounded-full bg-[#007AFF] animate-bounce" style={{ animationDelay: `${d}s` }} />
      ))}
    </div>
  </motion.div>
);

export const StudentChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showTopics, setShowTopics] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen, isMinimized]);

  const handleSend = (text) => {
    const query = (text ?? input).trim();
    if (!query || isTyping) return;
    setMessages(prev => [...prev, { role: 'user', text: query, time: getNow() }]);
    setInput('');
    setIsTyping(true);
    setShowTopics(false);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: getSmartResponse(query), time: getNow() }]);
      setIsTyping(false);
      if (!isOpen) setUnreadCount(c => c + 1);
    }, 800 + Math.random() * 500);
  };

  const handleOpen = () => { setIsOpen(true); setIsMinimized(false); setUnreadCount(0); };
  const handleClear = () => { setMessages(INITIAL_MESSAGES); setShowTopics(true); };
  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="trigger"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={handleOpen}
            aria-label="Open VIDYA Student Chatbot"
            className="fixed bottom-6 right-24 z-50 w-14 h-14 rounded-full bg-[#007AFF] hover:bg-[#005FD8] text-white shadow-[0_8px_32px_rgba(0,122,255,0.50)] hover:shadow-[0_12px_44px_rgba(0,122,255,0.65)] hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            <MessageCircle className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">{unreadCount}</span>
            )}
            <span className="absolute inset-0 rounded-full border-2 border-[#007AFF]/50 animate-ping pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed bottom-6 right-24 z-50 w-[92vw] sm:w-[400px] flex flex-col rounded-[24px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.18)] border border-black/[0.08] dark:border-white/[0.10]"
            style={{ maxHeight: isMinimized ? 'auto' : '590px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-[#007AFF] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-[14px]">VIDYA AI</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-white/75 text-[11px] font-mono">{isTyping ? 'Typing...' : 'Online • Academic AI'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={handleClear} title="Clear chat" className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => setIsMinimized(m => !m)} title="Minimize" className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer">
                  {isMinimized ? <ChevronDown className="w-3.5 h-3.5 rotate-180" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => setIsOpen(false)} title="Close" className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer"><X className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {!isMinimized && (
                <motion.div key="body" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className="flex flex-col overflow-hidden bg-[#F2F2F7] dark:bg-[#0F0F1A]">
                  {/* Messages */}
                  <div className="overflow-y-auto px-4 py-4 space-y-4" style={{ maxHeight: '320px', minHeight: '200px' }}>
                    {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
                    <AnimatePresence>{isTyping && <TypingIndicator key="typing" />}</AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Topic Chips */}
                  <AnimatePresence>
                    {showTopics && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-3 pb-2 overflow-hidden">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2 px-1">Quick Topics</div>
                        <div className="flex flex-wrap gap-1.5">
                          {QUICK_TOPICS.map((t, i) => (
                            <button key={i} onClick={() => handleSend(t.prompt)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/10 text-[12px] font-semibold text-[#1D1D1F] dark:text-[#E8E8ED] hover:bg-[#007AFF]/10 hover:border-[#007AFF]/40 hover:text-[#007AFF] transition-all cursor-pointer shadow-sm">
                              <span>{t.icon}</span><span>{t.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Input */}
                  <div className="px-3 pb-3 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-[#0F0F1A]/80 backdrop-blur-sm shrink-0">
                    <div className="flex items-end gap-2 bg-white dark:bg-[#1C1C2E] border border-black/[0.08] dark:border-white/10 rounded-2xl px-3.5 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-[#007AFF]/40 transition-all">
                      <textarea
                        ref={inputRef}
                        rows={1}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Kuch bhi pucho... subject, PYQ, plan..."
                        className="flex-1 resize-none bg-transparent text-[13px] text-[#1D1D1F] dark:text-[#E8E8ED] placeholder:text-neutral-400 focus:outline-none leading-[1.5] max-h-[80px] font-sans"
                        style={{ scrollbarWidth: 'none' }}
                      />
                      <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                        className="p-2 rounded-xl bg-[#007AFF] disabled:opacity-30 text-white hover:bg-[#005FD8] transition-all cursor-pointer shrink-0 disabled:cursor-not-allowed"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-center text-[10px] text-neutral-400 mt-2 font-mono">Enter to send · Shift+Enter for new line</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentChatbot;

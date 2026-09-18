import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Clock, 
  Users, 
  Award, 
  Play, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Calendar,
  ArrowRight,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const LIVE_TESTS = [
  {
    id: 'lt1',
    title: 'All-India GATE 2027 Grand Open Mock #4',
    stream: 'GATE 2027 (IIT Madras Pattern)',
    date: 'Live Now (Closes at 8:00 PM)',
    duration: '180 Mins',
    totalMarks: '100 Marks',
    participants: 14820,
    status: 'LIVE',
    sections: '15m GA + 13m Engg Math + 72m Technical',
    negativeMarking: '-0.33 & -0.66'
  },
  {
    id: 'lt2',
    title: 'MAKAUT 2024 End-Semester DSA Super Test',
    stream: 'B.Tech CSE / IT 3rd Sem',
    date: 'Live Now (Ends Today)',
    duration: '180 Mins',
    totalMarks: '70 Marks',
    participants: 8420,
    status: 'LIVE',
    sections: 'Group A (10M), Group B (15M), Group C (45M)',
    negativeMarking: 'No Negative (University Standard)'
  },
  {
    id: 'lt3',
    title: 'SSC CGL Tier-1 Super Sunday All-India Championship',
    stream: 'SSC CGL 2024-25',
    date: 'Starts Sunday, 10:00 AM',
    duration: '60 Mins',
    totalMarks: '200 Marks',
    participants: 32400,
    status: 'UPCOMING',
    sections: 'Quant, Reasoning, English, GA (25 Qs each)',
    negativeMarking: '-0.50 Negative'
  }
];

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Ananya Sharma', city: 'Kolkata, WB', score: '98.5/100', percentile: '99.99%', time: '112 mins', accuracy: '98%' },
  { rank: 2, name: 'Rohan Deshmukh', city: 'Pune, MH', score: '96.0/100', percentile: '99.94%', time: '124 mins', accuracy: '96%' },
  { rank: 3, name: 'Karthik Raja', city: 'Chennai, TN', score: '94.5/100', percentile: '99.88%', time: '130 mins', accuracy: '95%' },
  { rank: 4, name: 'You (Scholar Profile)', city: 'West Bengal', score: '91.0/100', percentile: '99.12%', time: '142 mins', accuracy: '89%', isUser: true },
  { rank: 5, name: 'Sneha Patel', city: 'Ahmedabad, GJ', score: '89.5/100', percentile: '98.85%', time: '138 mins', accuracy: '88%' },
  { rank: 6, name: 'Aditya Verma', city: 'Lucknow, UP', score: '88.0/100', percentile: '98.40%', time: '145 mins', accuracy: '87%' },
  { rank: 7, name: 'Pooja Iyer', city: 'Bengaluru, KA', score: '86.5/100', percentile: '97.90%', time: '150 mins', accuracy: '86%' }
];

export const LiveTestSeries = ({ setActiveTab }) => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const handleEnterTest = (test) => {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    toast.success(`Entering ${test.title}!`, {
      description: 'Loading national CBT examination interface.'
    });
    if (setActiveTab) setActiveTab('mockTests');
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-10 animate-fade-in space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>All-India Test Series (AITS) & Live Leaderboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
            Compete with 1.48L+ aspirants across India.
          </h1>
          <p className="text-sm text-blue-100 leading-relaxed">
            Real-time CBT examination simulation, All-India Rank (AIR) calculation, and topper comparison matrix.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <div className="text-[10px] text-blue-200 font-mono">YOUR AIR RANK</div>
            <div className="text-xl font-bold text-amber-300 font-display">AIR 1,420</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <div className="text-[10px] text-blue-200 font-mono">PERCENTILE</div>
            <div className="text-xl font-bold text-white font-display">99.12 %ile</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Tests & Live Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 cols: Live & Upcoming All-India Tests */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>National Championship Tests</span>
            </h2>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">● 2 Tests Live Now</span>
          </div>

          <div className="space-y-4">
            {LIVE_TESTS.map((test) => (
              <div
                key={test.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#0D1326] border border-blue-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        test.status === 'LIVE' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse' : 'bg-blue-50 text-blue-700 dark:bg-blue-950'
                      }`}>
                        ● {test.status}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{test.stream}</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                      {test.title}
                    </h3>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleEnterTest(test)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{test.status === 'LIVE' ? 'Attempt Live' : 'Register'}</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono">MARKS</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">{test.totalMarks}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono">DURATION</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">{test.duration}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono">ASPIRANTS</div>
                    <div className="font-bold text-blue-600 dark:text-blue-400">{test.participants.toLocaleString()}+</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono">MARKING</div>
                    <div className="font-bold text-amber-600 dark:text-amber-400">{test.negativeMarking}</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Pattern: {test.sections}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: National Topper Leaderboard */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>National Leaderboard</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">Live Ranking</span>
          </div>

          <div className="p-4 rounded-3xl bg-white dark:bg-[#0D1326] border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-2">
            {LEADERBOARD_DATA.map((user) => (
              <div
                key={user.rank}
                className={`p-3 rounded-2xl flex items-center justify-between gap-3 transition-all ${
                  user.isUser
                    ? 'bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 shadow-sm'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs font-mono ${
                    user.rank === 1 ? 'bg-amber-400 text-slate-900 shadow-sm' :
                    user.rank === 2 ? 'bg-slate-300 text-slate-900' :
                    user.rank === 3 ? 'bg-amber-600 text-white' :
                    user.isUser ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {user.rank}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {user.isUser && (
                        <span className="px-1.5 py-0.2 rounded bg-blue-600 text-white text-[9px] font-mono">YOU</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400">{user.city}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-xs font-mono text-slate-900 dark:text-white">{user.score}</div>
                  <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">{user.percentile}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

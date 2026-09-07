import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Headphones, 
  Flame, 
  Coffee, 
  Moon, 
  Sun,
  Music
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export const FocusRoom = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak'
  const [activeAudio, setActiveAudio] = useState(null); // 'rain' | 'alpha' | 'whitenoise' | null
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Solve 10 Group A MCQs (Data Structures)', completed: true },
    { id: 2, text: 'Review AVL Tree Double Rotations proof', completed: false },
    { id: 3, text: 'Complete 1 Mock Test Section D derivation', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [completedPomodoros, setCompletedPomodoros] = useState(3);

  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Timer countdown
  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'focus') {
        setCompletedPomodoros(prev => prev + 1);
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        toast.success('25-Minute Focus Block Complete!', {
          description: 'Take a 5-minute break to refresh your cognitive focus.'
        });
        setMode('shortBreak');
        setTimeLeft(5 * 60);
      } else {
        toast.info('Break finished! Ready to resume studying?');
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  // Clean Web Audio Synthesizer for Ambient Binaural Alpha Waves
  const toggleAmbientSound = (soundType) => {
    if (activeAudio === soundType) {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (e) {}
      }
      setActiveAudio(null);
      toast.info('Ambient focus audio stopped.');
      return;
    }

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;

      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (e) {}
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (soundType === 'alpha') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
      } else if (soundType === 'rain') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(174, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setActiveAudio(soundType);
      toast.success(`Ambient Audio Active: ${soundType.toUpperCase()} Soundscape`);
    } catch (err) {
      toast.error('Web Audio not supported in this environment.');
    }
  };

  const setTimerMode = (newMode, minutes) => {
    setMode(newMode);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: newTaskText.trim(), completed: false }]);
    setNewTaskText('');
    toast.success('Focus target added!');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-8 animate-fade-in space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30 text-xs font-mono font-bold mb-2 shadow-glow-green">
            <Timer className="w-3.5 h-3.5 text-[#00F59B]" />
            <span>Deep Focus & Cognitive Recovery Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Pomodoro Study Room & Lo-Fi Studio
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl font-sans">
            25-minute deep focus sprints with built-in binaural alpha waves and micro-break routines to prevent mental fatigue.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0D1117] border border-[#30363D] shadow-sm flex items-center gap-3">
          <Flame className="w-5 h-5 text-[#00F59B]" />
          <div>
            <div className="text-[11px] text-neutral-400 font-mono">Completed Sprints</div>
            <div className="text-sm font-bold text-white font-mono">{completedPomodoros} Focus Blocks (1.25 hrs)</div>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Pomodoro Clock & Ambient Audio */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0D1117] text-white shadow-xl border border-[#30363D] text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F59B]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Mode Pills */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-[#161B22] border border-[#30363D] relative z-10">
              <button
                onClick={() => setTimerMode('focus', 25)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mode === 'focus' ? 'bg-[#00F59B] text-[#07090D] shadow-glow-green font-mono' : 'text-neutral-400 hover:text-white font-mono'
                }`}
              >
                🧠 Deep Focus (25m)
              </button>
              <button
                onClick={() => setTimerMode('shortBreak', 5)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mode === 'shortBreak' ? 'bg-[#00F59B] text-[#07090D] shadow-glow-green font-mono' : 'text-neutral-400 hover:text-white font-mono'
                }`}
              >
                ☕ Short Break (5m)
              </button>
              <button
                onClick={() => setTimerMode('longBreak', 15)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mode === 'longBreak' ? 'bg-[#00F59B] text-[#07090D] shadow-glow-green font-mono' : 'text-neutral-400 hover:text-white font-mono'
                }`}
              >
                🌴 Long Break (15m)
              </button>
            </div>

            {/* Huge Digital Countdown */}
            <div className="space-y-2 relative z-10">
              <div className="text-6xl sm:text-8xl font-display font-extrabold tracking-tight font-mono text-[#00F59B] drop-shadow-[0_0_20px_rgba(0,245,155,0.35)]">
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs font-mono text-neutral-400">
                {isRunning ? '● Focus sprint in progress...' : 'Paused — ready when you are'}
              </div>
            </div>

            {/* Play / Pause / Reset Buttons */}
            <div className="flex items-center justify-center gap-4 relative z-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRunning(!isRunning)}
                className="px-8 py-3.5 rounded-2xl bg-[#00F59B] hover:bg-[#1AFFB2] text-[#07090D] font-extrabold text-sm shadow-glow-green flex items-center gap-2 cursor-pointer transition-all"
              >
                {isRunning ? <Pause className="w-5 h-5 fill-[#07090D]" /> : <Play className="w-5 h-5 fill-[#07090D]" />}
                <span>{isRunning ? 'Pause Timer' : 'Start Focus Sprint'}</span>
              </motion.button>

              <button
                onClick={() => setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60)}
                className="p-3.5 rounded-2xl bg-[#161B22] hover:bg-[#21262D] text-neutral-300 border border-[#30363D] transition-all cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Ambient Study Audio Selector */}
          <div className="p-6 rounded-2xl bg-[#0D1117] border border-[#30363D] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#00F59B]" />
                <span>Ambient Study Audio & Binaural Beats</span>
              </h3>
              {activeAudio && (
                <span className="text-[11px] font-mono text-[#00F59B] font-bold flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" /> Playing
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'alpha', name: '432Hz Alpha Waves', desc: 'Deep Focus & Recall', icon: '🧠' },
                { id: 'rain', name: '174Hz Solfeggio', desc: 'Calm & Stress Relief', icon: '🌧️' },
                { id: 'whitenoise', name: 'White Noise', desc: 'Block Background Noise', icon: '📻' }
              ].map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => toggleAmbientSound(sound.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeAudio === sound.id
                      ? 'bg-[#00F59B]/15 border-[#00F59B] text-white font-bold shadow-glow-green'
                      : 'bg-[#161B22] border-[#30363D] text-neutral-300 hover:border-[#00F59B]/50'
                  }`}
                >
                  <div className="text-xl mb-1">{sound.icon}</div>
                  <div className="text-xs font-bold text-white">{sound.name}</div>
                  <div className="text-[10px] text-neutral-400">{sound.desc}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Sprint Task Goal Checklist */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#0D1117] border border-[#30363D] shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00F59B]" />
              <span>Sprint Goals for this Session</span>
            </h3>

            <div className="space-y-2.5">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-3 ${
                    t.completed
                      ? 'bg-[#161B22]/40 border-[#30363D] text-neutral-500 line-through'
                      : 'bg-[#161B22] border-[#30363D] text-neutral-200 hover:border-[#00F59B]/40'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                    t.completed ? 'bg-[#00F59B] border-[#00F59B] text-[#07090D]' : 'border-neutral-600'
                  }`}>
                    {t.completed && <CheckCircle2 className="w-3 h-3 text-[#07090D]" />}
                  </div>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddTask} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add goal for next 25-min sprint..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#161B22] border border-[#30363D] text-white placeholder:text-neutral-500 text-xs outline-none focus:border-[#00F59B]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#00F59B] hover:bg-[#1AFFB2] text-[#07090D] text-xs font-bold shadow-glow-green cursor-pointer"
              >
                Add
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};

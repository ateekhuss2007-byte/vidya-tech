import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { 
  Brain, 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { 
  isFirebaseConfigured, 
  loginWithGoogle, 
  loginWithEmail, 
  registerWithEmail 
} from '../lib/firebase';

export const AuthModal = ({ 
  isOpen, 
  setIsOpen, 
  onClose, 
  onLoginSuccess, 
  onSuccess 
}) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [examTarget, setExamTarget] = useState('B.Tech 3rd Year CSE');
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    if (typeof setIsOpen === 'function') setIsOpen(false);
    if (typeof onClose === 'function') onClose();
  };

  const notifySuccess = (userData) => {
    if (typeof onLoginSuccess === 'function') onLoginSuccess(userData);
    if (typeof onSuccess === 'function') onSuccess(userData);
    closeModal();
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      if (!isFirebaseConfigured()) {
        const demoGoogleUser = {
          name: 'Demo Statistical Officer',
          email: 'officer.demo@vidya.ai',
          examTarget: 'Public Statistics & Capacity Building (SIH26101)',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          role: 'student',
          isLoggedIn: true,
          isDemoAuth: true
        };
        notifySuccess(demoGoogleUser);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        toast.info('DEMO AUTHENTICATION: Local evaluation session active (Cloud sync offline).');
        return;
      }

      try {
        const user = await loginWithGoogle();
        notifySuccess(user);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        toast.success(`Welcome, ${user.name}! Authenticated with Firebase.`);
      } catch (fbErr) {
        console.warn('Firebase Google Sign-In error:', fbErr?.code || fbErr);
        if (fbErr?.code === 'auth/operation-not-allowed' || fbErr?.code === 'auth/configuration-not-found') {
          toast.error('Firebase Setup Required: Please enable "Google" provider in Firebase Console > Authentication > Sign-in method.', {
            duration: 9000
          });
        } else if (fbErr?.code === 'auth/popup-closed-by-user') {
          toast.info('Google sign-in popup was closed.');
        } else {
          toast.error('Google Sign-In failed: ' + (fbErr?.message || 'Check Firebase settings'));
        }
      }
    } catch (err) {
      console.warn('Google sign-in error:', err?.message || err);
      toast.error('Google Sign-In failed: ' + (err?.message || 'Check settings'));
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      if (!isFirebaseConfigured()) {
        const fallbackUserData = {
          name: name || (authMode === 'login' ? (email.split('@')[0] || 'Demo Scholar') : 'New Learner'),
          email: email,
          examTarget: examTarget,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          role: 'student',
          isLoggedIn: true,
          isDemoAuth: true
        };
        notifySuccess(fallbackUserData);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        toast.info(authMode === 'login' 
          ? `[DEMO AUTHENTICATION] Welcome back, ${fallbackUserData.name} (Offline Session)!` 
          : `[DEMO AUTHENTICATION] Profile initialized locally for testing.`
        );
        return;
      }

      // If Firebase is configured, attempt production Firebase Auth
      try {
        let profile;
        if (authMode === 'login') {
          profile = await loginWithEmail(email, password);
          toast.success(`Welcome back, ${profile.name}! Authenticated with Firebase.`);
        } else {
          profile = await registerWithEmail(name, email, password, examTarget);
          toast.success(`Account registered in Firebase! User: ${profile.email}`);
        }

        notifySuccess(profile);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (cloudErr) {
        console.warn('Firebase Auth error code:', cloudErr?.code || cloudErr);
        if (cloudErr?.code === 'auth/operation-not-allowed') {
          toast.error('Firebase Setup Needed: Enable "Email/Password" in Firebase Console > Authentication > Sign-in method.', {
            duration: 10000
          });
        } else if (cloudErr?.code === 'auth/weak-password') {
          toast.error('Password must be at least 6 characters.');
        } else if (cloudErr?.code === 'auth/email-already-in-use') {
          toast.error('This email is already registered. Please sign in instead.');
        } else if (
          cloudErr?.code === 'auth/invalid-credential' ||
          cloudErr?.code === 'auth/wrong-password' ||
          cloudErr?.code === 'auth/user-not-found'
        ) {
          toast.error('Invalid email or password. Please verify your credentials or register a new account.');
        } else {
          toast.error('Authentication failed: ' + (cloudErr?.message || 'Please check your inputs.'));
        }
      }
    } catch (err) {
      console.warn('Auth error:', err?.message || err);
      toast.error(err?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudentLogin = () => {
    const demoUser = {
      name: 'Demo Scholar',
      email: 'scholar.demo@vidya.ai',
      examTarget: 'B.Tech CSE & GATE 2027',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'student',
      isLoggedIn: true
    };
    notifySuccess(demoUser);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    toast.success('Logged in as Demo Scholar');
  };

  const handleDemoEducatorLogin = () => {
    const demoEducator = {
      name: 'Prof. Debashis Roy',
      email: 'prof.roy@nit.ac.in',
      examTarget: 'Faculty of Computer Science',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      role: 'educator',
      isLoggedIn: true
    };
    notifySuccess(demoEducator);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    toast.success('Logged in as Demo Professor (Prof. Roy)');
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] sm:w-[440px] rounded-3xl bg-white dark:bg-[#0D1326] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl animate-fade-in">
          
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <Dialog.Title className="text-base font-bold text-slate-900 dark:text-white">
                  {authMode === 'login' ? 'Sign in to VIDYA AI' : 'Create Your AI Account'}
                </Dialog.Title>
                <p className="text-[11px] text-slate-500">Autonomous cognitive learning system</p>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 my-5">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authMode === 'login'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authMode === 'signup'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              New Student Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
            
            {authMode === 'signup' && (
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Exam / Syllabus</label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={examTarget}
                    onChange={(e) => setExamTarget(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="B.Tech 3rd Year CSE">B.Tech 3rd Year (CSE/IT)</option>
                    <option value="GATE 2027 CSE">GATE Computer Science 2027</option>
                    <option value="Class 12 CBSE Board">Class 12 CBSE Board</option>
                    <option value="UPSC CSE / Govt Exam">UPSC / Govt Exams</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-60"
            >
              <span>{loading ? 'Authenticating...' : authMode === 'login' ? 'Sign In to Dashboard' : 'Create Student Profile'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Social Sign In (Google) */}
          <div className="mt-4">
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs transition-all flex items-center justify-center gap-2.5 shadow-sm cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Firebase Connection Status Indicator */}
          <div className="mt-3 flex items-center justify-center">
            <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
              isFirebaseConfigured()
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isFirebaseConfigured() ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              {isFirebaseConfigured() ? 'Firebase Cloud Auth & Firestore Active' : 'Local Fallback Mode (Add keys in .env)'}
            </span>
          </div>

          {/* Quick 1-Click Demo Login Options */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Instant 1-Click Demo Login
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoStudentLogin}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-[11px] hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>Demo Student</span>
              </button>

              <button
                type="button"
                onClick={handleDemoEducatorLogin}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-[11px] hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Demo Professor</span>
              </button>
            </div>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

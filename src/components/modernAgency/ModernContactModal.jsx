import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export const ModernContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'enterprise-cloud',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please enter your name and email address.');
      return;
    }

    setSubmitted(true);
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.6 }
    });
    toast.success('Inquiry received! A Vidya AI academic specialist will connect shortly.');

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg bg-[#FFFFFF] rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#E5E5E5] z-10 overflow-hidden"
        >
          {/* Top Decorative bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#45B5E5] via-[#2ba0d4] to-[#168FC4]" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#777777] hover:bg-[#EAF8FD] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold font-display text-[#111111]">
                Thank You, {formData.name}!
              </h3>
              <p className="text-sm text-[#777777] max-w-sm mx-auto">
                We've received your inquiry. A Vidya AI academic advisor will reach out to you directly.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#111111] tracking-tight">
                  Connect with Vidya AI
                </h3>
                <p className="text-xs sm:text-sm text-[#777777] mt-1">
                  Have questions about university syllabus integration, exam preparation, or institutional licensing?
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111111] mb-1 font-sans uppercase">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Aryan Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#E5E5E5] text-sm text-[#111111] focus:ring-2 focus:ring-[#45B5E5] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111111] mb-1 font-sans uppercase">Email Address</label>
                    <input
                      type="email"
                      placeholder="aryan@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#E5E5E5] text-sm text-[#111111] focus:ring-2 focus:ring-[#45B5E5] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111111] mb-1 font-sans uppercase">College / University</label>
                    <input
                      type="text"
                      placeholder="e.g. MAKAUT / VTU / Anna Univ"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#E5E5E5] text-sm text-[#111111] focus:ring-2 focus:ring-[#45B5E5] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111111] mb-1 font-sans uppercase">I am a</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#E5E5E5] text-sm text-[#111111] focus:ring-2 focus:ring-[#45B5E5] focus:outline-none"
                    >
                      <option value="student">Engineering / College Student</option>
                      <option value="educator">Faculty / Professor</option>
                      <option value="institution">College Administrator / HOD</option>
                      <option value="other">GATE / Competitive Aspirant</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1 font-sans uppercase">Message / Query</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what syllabus, semester subjects, or exam prep you need help with..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-[#E5E5E5] text-sm text-[#111111] focus:ring-2 focus:ring-[#45B5E5] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#45B5E5] hover:bg-[#168FC4] text-white font-bold text-sm shadow-md shadow-[#45B5E5]/25 hover:shadow-lg hover:shadow-[#45B5E5]/40 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

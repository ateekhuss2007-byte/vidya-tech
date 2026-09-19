/**
 * ============================================================================
 * VIDYA AI — University Topper Handwritten Notebook Viewer
 * ============================================================================
 * Ultra-realistic, authentic ruled-notebook paper experience with:
 * - Spiral binder rings & margin ruling
 * - Topper ballpoint pen calligraphy & red exam annotations
 * - Direct 1-click Download / Print to PDF
 * - Official University Verification Stamp (CU / MAKAUT / State Univ)
 * - Cloud Drive Archive Access
 * ============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Download,
  Printer,
  ExternalLink,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
  Bookmark,
  Share2,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { 
  UniversityHandwrittenSet, 
  HandwrittenPage, 
  HandwrittenBlock 
} from '../../data/handwrittenNotesData';

interface HandwrittenNotesViewerProps {
  notesData: UniversityHandwrittenSet;
  subjectName: string;
  subjectCode: string;
  universityName: string;
  collegeName?: string;
  activeUnitId?: string | null;
}

export const HandwrittenNotesViewer: React.FC<HandwrittenNotesViewerProps> = ({
  notesData,
  subjectName,
  subjectCode,
  universityName,
  collegeName,
  activeUnitId
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [inkColor, setInkColor] = useState<'blue' | 'black' | 'gel'>('blue');
  const [showStickyNotes, setShowStickyNotes] = useState(true);
  const [copiedText, setCopiedText] = useState(false);

  const currentPage: HandwrittenPage = notesData.pages[currentPageIndex] || notesData.pages[0];

  const handlePrintPdf = () => {
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
    toast.success('Preparing Authentic Handwritten PDF for download/print...', {
      description: `Printing Topper Copy: ${subjectCode} - ${subjectName} (${notesData.topperName})`
    });
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleCopyNotes = () => {
    const text = `# ${subjectCode}: ${subjectName} - Topper Handwritten Copy\n` +
      `University: ${universityName} | Topper: ${notesData.topperName} (${notesData.topperRank})\n` +
      `Topic: ${currentPage.topic} (Page ${currentPage.pageNumber})\n\n` +
      currentPage.blocks.map(b => (b.title ? `## ${b.title}\n` : '') + (b.content || (b.points ? b.points.join('\n') : ''))).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    toast.success('Handwritten page content copied to clipboard!');
    setTimeout(() => setCopiedText(false), 2000);
  };

  const inkStyles = {
    blue: 'text-[#1B365D] selection:bg-blue-200',
    black: 'text-[#1F2937] selection:bg-neutral-200',
    gel: 'text-[#0F172A] selection:bg-indigo-200'
  };

  return (
    <div className="w-full space-y-6 animate-fade-in print:m-0 print:p-0">
      
      {/* 1. TOP CONTROLS & UNIVERSITY VERIFICATION HEADER */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#18181A] border border-black/[0.08] dark:border-white/[0.08] shadow-sm print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{notesData.verifiedStamp}</span>
            </span>
            <span className="text-xs font-mono text-neutral-400">
              {notesData.stream} • Semester {notesData.semester}
            </span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight flex items-center gap-2">
            <span>✍️ Topper's Handwritten Notes</span>
            <span className="text-sm font-mono font-medium text-neutral-400">
              ({notesData.pdfPagesCount} Verified Pages)
            </span>
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Authored by <strong className="text-neutral-800 dark:text-neutral-200">{notesData.topperName}</strong> ({notesData.topperRank}) • {collegeName ? `${collegeName} • ${universityName}` : universityName}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Ink color switch */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono">
            <button
              type="button"
              onClick={() => setInkColor('blue')}
              className={`px-2 py-1 rounded-lg transition-all ${inkColor === 'blue' ? 'bg-white dark:bg-[#252528] text-[#1E3A8A] font-bold shadow-sm' : 'text-neutral-500'}`}
            >
              🔵 Blue Ink
            </button>
            <button
              type="button"
              onClick={() => setInkColor('black')}
              className={`px-2 py-1 rounded-lg transition-all ${inkColor === 'black' ? 'bg-white dark:bg-[#252528] text-neutral-900 dark:text-white font-bold shadow-sm' : 'text-neutral-500'}`}
            >
              ⚫ Black Ink
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyNotes}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all cursor-pointer"
            title="Copy page text to clipboard"
          >
            {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedText ? 'Copied' : 'Copy Page'}</span>
          </button>

          {/* Download / Print to PDF */}
          <button
            type="button"
            onClick={handlePrintPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-mono font-bold shadow-md shadow-[#007AFF]/20 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-white" />
            <span>Print / Save as PDF</span>
          </button>

          {/* Direct Drive Folder */}
          <a
            href={notesData.driveFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            title="Open verified Google Drive archive"
          >
            <ExternalLink className="w-3.5 h-3.5 text-white" />
            <span>Open Google Drive</span>
          </a>
        </div>
      </div>

      {/* 2. PAGE NAVIGATION BAR */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#18181A]/80 backdrop-blur-sm border border-black/[0.06] dark:border-white/[0.06] text-xs font-mono print:hidden">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <span className="text-neutral-400 font-semibold uppercase text-[10px] tracking-wider shrink-0">Pages:</span>
          {notesData.pages.map((p, idx) => (
            <button
              key={p.pageNumber}
              type="button"
              onClick={() => setCurrentPageIndex(idx)}
              className={`px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
                currentPageIndex === idx
                  ? 'bg-[#007AFF] text-white font-bold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
              }`}
            >
              Page {p.pageNumber}: {p.unitTitle.split(':')[0]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            disabled={currentPageIndex === 0}
            onClick={() => setCurrentPageIndex(prev => Math.max(0, prev - 1))}
            className="p-1 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          </button>
          <span className="text-neutral-600 dark:text-neutral-300 font-bold">
            {currentPageIndex + 1} / {notesData.pages.length}
          </span>
          <button
            type="button"
            disabled={currentPageIndex === notesData.pages.length - 1}
            onClick={() => setCurrentPageIndex(prev => Math.min(notesData.pages.length - 1, prev + 1))}
            className="p-1 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>
      </div>

      {/* =======================================================================
          3. REALISTIC RULED NOTEBOOK PAPER SHEET
          ======================================================================= */}
      <div 
        className="relative w-full rounded-2xl shadow-xl overflow-hidden border border-[#E5E0D0] dark:border-[#2C2D30] bg-[#FFFDF7] dark:bg-[#17181A] transition-colors"
        style={{
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Left Spiral Binding Rings (Aesthetic decoration) */}
        <div className="absolute left-2.5 top-0 bottom-0 flex flex-col justify-between py-6 pointer-events-none z-10 print:hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-3.5 h-3.5 rounded-full bg-[#E8E2D2] dark:bg-[#2A2B2E] border border-[#D5CFBF] dark:border-[#383A3E] shadow-inner" />
              <div className="w-4 h-1 bg-neutral-400/50 dark:bg-neutral-600/50 rounded-full" />
            </div>
          ))}
        </div>

        {/* Notebook Page Body with Ruled Margins */}
        <div 
          className="pl-12 sm:pl-16 pr-6 sm:pr-10 py-8 min-h-[850px] relative"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                transparent, 
                transparent 31px, 
                rgba(147, 197, 253, 0.35) 31px, 
                rgba(147, 197, 253, 0.35) 32px
              )
            `,
            backgroundAttachment: 'local'
          }}
        >
          {/* Vertical Double Red Margin Line */}
          <div 
            className="absolute left-10 sm:left-14 top-0 bottom-0 w-1 pointer-events-none"
            style={{
              borderLeft: '1.5px solid rgba(239, 68, 68, 0.45)',
              borderRight: '1.5px solid rgba(239, 68, 68, 0.25)',
              paddingRight: '2px'
            }}
          />

          {/* Ruled Notebook Page Header */}
          <div className="border-b-2 border-red-400/50 pb-4 mb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-500 font-mono">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-bold text-red-600 dark:text-red-400 font-serif">Date: {currentPage.dateWritten}</span>
                <span>•</span>
                <span className="font-bold text-[#1E3A8A] dark:text-sky-400">Page No: {currentPage.pageNumber}</span>
                <span>•</span>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">Unit {currentPage.unitNumber}: {currentPage.unitTitle}</span>
              </div>
              
              {/* Topper Signature & Roll */}
              <div className="text-right">
                <span className="font-handwriting text-sm font-bold text-blue-900 dark:text-blue-300 italic" style={{ fontFamily: 'Caveat, Kalam, cursive' }}>
                  Signed: {notesData.topperName.split(' ')[0]} (Roll 01)
                </span>
              </div>
            </div>

            {/* University Official Stamp in the corner */}
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-red-500/40 bg-red-500/5 text-red-700 dark:text-red-400 text-xs font-mono font-bold rotate-[-1deg]">
              <span>🏛️ {universityName} EXAM PREP</span>
              <span>•</span>
              <span>{subjectCode}</span>
            </div>

            {/* Teacher's quote / alert in red margin ink */}
            {currentPage.facultyQuote && (
              <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-handwriting text-sm" style={{ fontFamily: 'Kalam, cursive' }}>
                  {currentPage.facultyQuote}
                </span>
              </div>
            )}
          </div>

          {/* Main Handwritten Content Blocks */}
          <div className={`space-y-6 ${inkStyles[inkColor]}`} style={{ fontFamily: 'Kalam, Caveat, cursive, sans-serif' }}>
            
            <div className="border-b border-blue-300/40 pb-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#1E3A8A] dark:text-sky-300" style={{ fontFamily: 'Caveat, Kalam, cursive' }}>
                {currentPage.topic}
              </h1>
            </div>

            {currentPage.blocks.map((block, idx) => {
              if (block.type === 'heading') {
                return (
                  <div key={idx} className="pt-2 flex items-center justify-between border-b border-neutral-300/50 pb-1">
                    <h2 className="text-xl sm:text-2xl font-bold underline decoration-red-500/60 decoration-2 underline-offset-4 text-red-700 dark:text-red-400">
                      {block.title}
                    </h2>
                    {block.marks && (
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-300">
                        [{block.marks} Marks Q]
                      </span>
                    )}
                  </div>
                );
              }

              if (block.type === 'text') {
                return (
                  <p key={idx} className="text-lg leading-8 tracking-wide font-medium">
                    {block.content}
                  </p>
                );
              }

              if (block.type === 'definition') {
                return (
                  <div key={idx} className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border-l-4 border-[#007AFF] space-y-2">
                    {block.title && (
                      <h3 className="text-lg font-bold text-[#007AFF] dark:text-sky-400">
                        ⭐ {block.title}
                      </h3>
                    )}
                    {block.content && (
                      <p className="text-base leading-7 text-neutral-800 dark:text-neutral-200">
                        {block.content}
                      </p>
                    )}
                    {block.points && (
                      <ul className="list-disc pl-5 space-y-1.5 text-base leading-7 text-neutral-800 dark:text-neutral-200">
                        {block.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }

              if (block.type === 'points') {
                return (
                  <ul key={idx} className="list-decimal pl-6 space-y-2 text-lg leading-8 font-medium">
                    {block.points?.map((pt, pIdx) => (
                      <li key={pIdx}>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === 'code') {
                return (
                  <div key={idx} className="p-4 rounded-xl bg-neutral-900 text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto shadow-inner border border-neutral-700">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-neutral-400 text-[11px]">
                      <span>{block.codeLanguage?.toUpperCase() || 'C / C++'} SOURCE CODE</span>
                      <span>Topper Exam Implementation</span>
                    </div>
                    <pre className="custom-scrollbar">{block.content}</pre>
                  </div>
                );
              }

              if (block.type === 'diagram') {
                return (
                  <div key={idx} className="p-4 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-black/30 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                      <span>✏️ Hand-Drawn Exam Diagram:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">{block.diagramCaption}</span>
                    </div>
                    {block.diagramSvgOrAscii && (
                      <pre className="font-mono text-xs sm:text-sm p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-neutral-800 dark:text-neutral-200 overflow-x-auto leading-tight custom-scrollbar">
                        {block.diagramSvgOrAscii}
                      </pre>
                    )}
                  </div>
                );
              }

              if (block.type === 'formula') {
                return (
                  <div key={idx} className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border-2 border-amber-400/60 text-amber-950 dark:text-amber-200 space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      📐 Formula / Equation to Write in Exam:
                    </span>
                    <h3 className="text-lg font-bold">{block.title}</h3>
                    <p className="font-mono text-sm leading-relaxed whitespace-pre-line bg-white/70 dark:bg-black/40 p-2.5 rounded-lg border border-amber-300/40">
                      {block.content}
                    </p>
                  </div>
                );
              }

              if (block.type === 'topperSecret') {
                return (
                  <div key={idx} className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/30 text-red-900 dark:text-red-200 space-y-1 rotate-[0.3deg] shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                        ★ {block.title || 'TOPPER SECRET'}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg leading-7 font-handwriting" style={{ fontFamily: 'Kalam, cursive' }}>
                      {block.content}
                    </p>
                  </div>
                );
              }

              if (block.type === 'mistakeAlert') {
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-900 dark:text-orange-200 text-sm flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-xs font-mono uppercase tracking-wider text-orange-700 dark:text-orange-400 mb-0.5">
                        {block.title || 'Common Mistake'}
                      </strong>
                      <p className="text-base leading-6 font-handwriting" style={{ fontFamily: 'Kalam, cursive' }}>
                        {block.content}
                      </p>
                    </div>
                  </div>
                );
              }

              if (block.type === 'stepByStep') {
                return (
                  <div key={idx} className="space-y-2">
                    {block.title && <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">{block.title}</h3>}
                    <div className="space-y-2">
                      {block.points?.map((pt, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-3 p-2.5 rounded-lg bg-neutral-100/60 dark:bg-neutral-800/40">
                          <span className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {sIdx + 1}
                          </span>
                          <span className="text-base leading-7">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return null;
            })}

          </div>

          {/* Bottom Notebook Page Footer */}
          <div className="mt-12 pt-4 border-t-2 border-red-400/40 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>Verified University Archive • VIDYA AI</span>
            <span className="font-bold text-neutral-600 dark:text-neutral-300">
              End of Page {currentPage.pageNumber}
            </span>
          </div>

        </div>
      </div>

      {/* 4. BOTTOM CLOUD REPOSITORY LINK BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl print:hidden">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-mono font-bold text-sky-200">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Complete {universityName} Digital Archive</span>
          </div>
          <h3 className="text-lg font-bold">Want the entire 200+ page spiral notebook set?</h3>
          <p className="text-xs text-blue-200 max-w-xl">
            Access our open cloud drive containing high-resolution 300-DPI scans of original handwritten lecture notebooks, laboratory observation copies, and solved end-sem papers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <a
            href={notesData.driveFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-blue-950 font-bold text-xs font-mono flex items-center justify-center gap-2 hover:bg-neutral-100 transition-all cursor-pointer shadow-md"
          >
            <span>Open Google Drive Cloud Archive</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-950" />
          </a>
        </div>
      </div>

    </div>
  );
};

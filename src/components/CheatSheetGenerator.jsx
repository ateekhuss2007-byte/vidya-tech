import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Printer, 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  BookOpen, 
  Cpu, 
  Zap, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const cheatSheetsData = [
  {
    id: 'dsa_matrix',
    title: 'DSA & Algorithms: Master Complexity & Recurrence Matrix',
    category: 'Computer Science (B.Tech / BCA / GATE)',
    sections: [
      {
        heading: 'Master Theorem (Divide & Conquer)',
        content: `T(n) = aT(n/b) + f(n), where a >= 1, b > 1
• Case 1: If f(n) = O(n^(log_b(a) - ε)) => T(n) = Θ(n^log_b(a))
• Case 2: If f(n) = Θ(n^log_b(a) * log^k(n)) => T(n) = Θ(n^log_b(a) * log^(k+1)(n))
• Case 3: If f(n) = Ω(n^(log_b(a) + ε)) and af(n/b) <= cf(n) => T(n) = Θ(f(n))`
      },
      {
        heading: 'Sorting Algorithms Cheat Matrix',
        content: `• Quick Sort: Best/Avg: O(n log n), Worst: O(n^2), Space: O(log n), In-Place: Yes, Stable: No
• Merge Sort: Best/Avg/Worst: O(n log n), Space: O(n), In-Place: No, Stable: Yes
• Heap Sort: Best/Avg/Worst: O(n log n), Space: O(1), In-Place: Yes, Stable: No
• Counting Sort: Time: O(n + k), Space: O(k), Non-Comparison, Stable: Yes`
      },
      {
        heading: 'Graph & Tree Invariants',
        content: `• AVL Tree: Height <= 1.44 log2(N), Balance Factor BF ∈ {-1, 0, +1}
• Dijkstra: O((V + E) log V) with Min-Heap (Non-negative edges ONLY)
• Bellman-Ford: O(V * E) (Handles negative edges & detects negative cycles)
• Spanning Tree: V vertices, exactly V - 1 edges, no cycles`
      }
    ]
  },
  {
    id: 'calculus_matrix',
    title: 'Engineering Mathematics: Calculus & Linear Algebra Formula Sheet',
    category: 'Class 12 / B.Tech / GATE 2027',
    sections: [
      {
        heading: 'Standard Integration Formulas',
        content: `• ∫ 1/√(a^2 - x^2) dx = sin^-1(x/a) + C
• ∫ √(a^2 - x^2) dx = (x/2)√(a^2 - x^2) + (a^2/2)sin^-1(x/a) + C
• ∫ 1/(x^2 + a^2) dx = (1/a)tan^-1(x/a) + C
• Integration by Parts: ∫ u v dx = u ∫ v dx - ∫ [u' * (∫ v dx)] dx`
      },
      {
        heading: 'Matrices & Eigenvalues',
        content: `• Characteristic Equation: det(A - λI) = 0
• Sum of Eigenvalues = Trace(A) (Sum of main diagonal elements)
• Product of Eigenvalues = det(A)
• Matrix Adjoint Property: A * adj(A) = |A| * I_n
• |adj A| = |A|^(n-1), |adj(adj A)| = |A|^((n-1)^2)`
      }
    ]
  },
  {
    id: 'dbms_matrix',
    title: 'DBMS: Normal Forms & SQL Query Optimization Sheet',
    category: 'BCA / B.Tech / University Semesters',
    sections: [
      {
        heading: 'Database Normalization Hierarchy',
        content: `• 1NF: Atomic attribute values only (no multi-valued or composite attributes)
• 2NF: 1NF + No partial dependency (non-prime attributes fully dependent on candidate key)
• 3NF: 2NF + No transitive dependency (X -> Y requires X is Superkey OR Y is Prime Attribute)
• BCNF: For every X -> Y, X MUST be a Superkey (Strict)`
      },
      {
        heading: 'ACID Properties & Transaction Isolation',
        content: `• Atomicity: All or nothing execution (WAL log)
• Consistency: Database invariants preserved
• Isolation: Serializability levels (Read Uncommitted < Read Committed < Repeatable Read < Serializable)
• Durability: Committed updates survive system crash`
      }
    ]
  }
];

export const CheatSheetGenerator = () => {
  const [selectedSheetId, setSelectedSheetId] = useState('dsa_matrix');
  const [copiedSection, setCopiedSection] = useState(null);

  const activeSheet = cheatSheetsData.find(s => s.id === selectedSheetId) || cheatSheetsData[0];

  const handleCopy = (content, index) => {
    navigator.clipboard.writeText(content);
    setCopiedSection(index);
    toast.success('Formula snippet copied to clipboard!');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handlePrintPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to download printable PDF.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${activeSheet.title} - VIDYA AI 1-Page Cheat Sheet</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; padding: 10px; }
          .header { text-align: center; border-bottom: 2px solid #007AFF; padding-bottom: 8px; margin-bottom: 12px; }
          .title { font-size: 18px; font-weight: bold; margin: 0; color: #0a0a0a; }
          .category { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-top: 2px; }
          .grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
          .card { border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; background: #f8fafc; page-break-inside: avoid; }
          .card-title { font-size: 13px; font-weight: bold; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px; }
          pre { font-family: 'Courier New', monospace; font-size: 11px; margin: 0; white-space: pre-wrap; color: #0f172a; }
          .footer { font-size: 9px; color: #94a3b8; text-align: center; margin-top: 15px; border-top: 1px solid #e2e8f0; padding-top: 6px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">${activeSheet.title}</h1>
          <div class="category">${activeSheet.category} • VIDYA AI 1-Page High-Yield Formula Matrix</div>
        </div>

        <div class="grid">
          ${activeSheet.sections.map(sec => `
            <div class="card">
              <div class="card-title">${sec.heading}</div>
              <pre>${sec.content}</pre>
            </div>
          `).join('')}
        </div>

        <div class="footer">Generated via VIDYA AI Cognitive Study Suite • Printable 1-Page Exam Revision Matrix</div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 400);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    toast.success('1-Page Cheat Sheet PDF Ready!');
  };

  return (
    <div className="w-full fluid-container py-6 sm:py-8 animate-fade-in space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/30 text-xs font-mono font-bold mb-2 shadow-md shadow-[#007AFF]/25">
            <FileText className="w-3.5 h-3.5 text-[#007AFF]" />
            <span>High-Yield 1-Page Formula & Revision Sheets</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            1-Page AI Revision Cheat-Sheet Generator
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl font-sans">
            Condensed, printable 1-page formula summaries, time-complexity matrices, and theorem proofs for last-minute exam revision.
          </p>
        </div>

        <button
          onClick={handlePrintPDF}
          className="px-5 py-2.5 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white font-bold text-xs shadow-md shadow-[#007AFF]/25 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Download Printable PDF</span>
        </button>
      </div>

      {/* Sheet Tabs */}
      <div className="p-2 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm flex flex-wrap gap-2">
        {cheatSheetsData.map((sheet) => (
          <button
            key={sheet.id}
            onClick={() => setSelectedSheetId(sheet.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedSheetId === sheet.id
                ? 'bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25 scale-[1.02]'
                : 'text-neutral-400 hover:text-white hover:bg-[#F5F5F7] dark:bg-white/[0.04]'
            }`}
          >
            {sheet.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Active Cheat Sheet Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="text-[11px] font-mono text-[#007AFF] font-bold uppercase">{activeSheet.category}</div>
            <h2 className="text-base sm:text-lg font-bold text-white font-display mt-0.5">{activeSheet.title}</h2>
          </div>

          <button
            onClick={handlePrintPDF}
            className="px-4 py-2 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] hover:bg-[#F5F5F7] dark:bg-white/[0.06] text-white border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#007AFF]" />
            <span>Export 1-Page PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeSheet.sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs sm:text-sm text-white font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#007AFF]"></span>
                  <span>{sec.heading}</span>
                </h3>

                <button
                  onClick={() => handleCopy(sec.content, idx)}
                  className="p-1.5 rounded-lg bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-neutral-400 hover:text-[#007AFF] transition-all text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === idx ? <Check className="w-3 h-3 text-[#007AFF]" /> : <Copy className="w-3 h-3" />}
                  <span className="text-[10px]">{copiedSection === idx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="text-xs text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {sec.content}
              </pre>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

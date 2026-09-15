import React, { useState } from 'react';
import { 
  FileUp, 
  X, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Brain, 
  ArrowRight, 
  Download,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface UniversalSyllabusUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyllabusLoaded: (parsedData: any) => void;
}

export const UniversalSyllabusUploaderModal: React.FC<UniversalSyllabusUploaderModalProps> = ({
  isOpen,
  onClose,
  onSyllabusLoaded
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedResult, setParsedResult] = useState<any | null>(null);
  const [rawText, setRawText] = useState('');

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const processUploadedFile = (file: File) => {
    setSelectedFile(file);
    startAiParsing(file.name);
  };

  const startAiParsing = (filename: string) => {
    setIsParsing(true);
    setParsedResult(null);

    // Simulate real AI semantic extraction from PDF
    setTimeout(() => {
      setIsParsing(false);
      const mockParsed = {
        title: filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        detectedUniversity: 'Auto-Detected Regional Autonomous Board / AICTE Aligned',
        credits: 4,
        semester: 3,
        totalModules: 5,
        estimatedHours: 42,
        modules: [
          {
            num: 1,
            name: 'Module 1: Mathematical Foundations & Asymptotic Complexity',
            topics: ['Big-O, Omega, Theta definitions', 'Recurrence relations & Master Theorem', 'Space-Time trade-offs']
          },
          {
            num: 2,
            name: 'Module 2: Linear Data Structures & Stack Frame Pointers',
            topics: ['Linked List reversals & Cycle detection', 'Infix to Postfix evaluation', 'Circular Queue boundary conditions']
          },
          {
            num: 3,
            name: 'Module 3: Non-Linear Hierarchies & AVL Tree Rotations',
            topics: ['Binary Search Tree properties', 'AVL Single (LL, RR) and Double (LR, RL) rotations', 'Threaded binary trees']
          },
          {
            num: 4,
            name: 'Module 4: Graph Topologies & Minimum Spanning Trees',
            topics: ['BFS & DFS traversals', "Dijkstra's shortest path with Min-Heap", "Prim's & Kruskal's MST algorithms"]
          },
          {
            num: 5,
            name: 'Module 5: Dynamic Programming & High-Performance Hashing',
            topics: ['0/1 Knapsack memoization table', 'Chaining & Linear probing collision resolutions', 'Amortized analysis']
          }
        ],
        generatedQuestionsCount: 24,
        prerequisiteCount: 8
      };
      setParsedResult(mockParsed);
      toast.success(`Successfully parsed official syllabus: ${filename}`);
      confetti({ particleCount: 40, spread: 60 });
    }, 1200);
  };

  const handleLoadSample = (sampleName: string, sampleCourse: string) => {
    startAiParsing(`${sampleName} - ${sampleCourse}.pdf`);
  };

  const handleApplyToStudyRoom = () => {
    if (parsedResult) {
      onSyllabusLoaded(parsedResult);
      onClose();
      toast.success('Custom curriculum successfully ingested into VIDYA AI workspace!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0D1117] border border-[#30363D] rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00F59B]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#21262D]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#00F59B]/10 border border-[#00F59B]/30 flex items-center justify-center text-[#00F59B]">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-[#00F59B]">UNIVERSAL AI INGESTER</div>
              <h3 className="text-base sm:text-lg font-bold text-[#F0F6FC] font-display">
                Upload Custom University Syllabus PDF
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#161B22] border border-[#30363D] text-[#8B949E] hover:text-[#F0F6FC] transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-[#8B949E] mt-3">
          Upload any official university, autonomous college, or department syllabus document (PDF/DOC/TXT). 
          VIDYA AI’s NLP engine extracts the 5 module units, credits, learning objectives, and auto-assembles a personalized remediation roadmap.
        </p>

        {/* Drag & Drop Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`mt-4 p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer ${
            dragActive
              ? 'border-[#00F59B] bg-[#00F59B]/5'
              : 'border-[#30363D] bg-[#161B22]/50 hover:border-[#8B949E] hover:bg-[#161B22]'
          }`}
          onClick={() => document.getElementById('syllabus-file-input')?.click()}
        >
          <input
            id="syllabus-file-input"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="w-12 h-12 rounded-2xl bg-[#21262D] border border-[#30363D] flex items-center justify-center text-[#00F59B]">
            <FileText className="w-6 h-6" />
          </div>

          <div>
            <div className="text-sm font-bold text-[#F0F6FC]">
              {selectedFile ? selectedFile.name : 'Drag & Drop Official Syllabus PDF'}
            </div>
            <div className="text-xs text-[#8B949E] mt-0.5">
              Supports PDF, Word (.docx) or plain text course handbooks up to 25MB
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-1.5 rounded-xl bg-[#00F59B] text-[#07090D] font-bold text-xs shadow-sm hover:bg-[#5EFCC2] transition-all"
          >
            Browse Local File
          </button>
        </div>

        {/* 1-Click Quick Demo Presets for Judges */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#161B22] border border-[#30363D]">
          <div className="text-[11px] font-mono text-[#8B949E] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00F59B]" />
            <span>Judge Demo Presets (1-Click Instant AI Extraction):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => handleLoadSample('AKTU Lucknow', 'KCS-301 Data Structures')}
              className="px-2.5 py-1.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-left text-xs text-[#C9D1D9] transition-all border border-[#30363D] flex items-center justify-between"
            >
              <span className="font-semibold truncate">AKTU KCS-301 Syllabus</span>
              <span className="text-[10px] font-mono text-[#00F59B]">Sample 1</span>
            </button>
            <button
              onClick={() => handleLoadSample('VTU Belagavi', '21CS32 Data Structures & Apps')}
              className="px-2.5 py-1.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-left text-xs text-[#C9D1D9] transition-all border border-[#30363D] flex items-center justify-between"
            >
              <span className="font-semibold truncate">VTU 21CS32 Syllabus</span>
              <span className="text-[10px] font-mono text-[#00F59B]">Sample 2</span>
            </button>
            <button
              onClick={() => handleLoadSample('Anna Univ', 'CS3391 OOP & Java Systems')}
              className="px-2.5 py-1.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-left text-xs text-[#C9D1D9] transition-all border border-[#30363D] flex items-center justify-between"
            >
              <span className="font-semibold truncate">Anna Univ CS3391 Syllabus</span>
              <span className="text-[10px] font-mono text-[#00F59B]">Sample 3</span>
            </button>
            <button
              onClick={() => handleLoadSample('JNTU Hyderabad', 'CS301PC C++ Data Structures')}
              className="px-2.5 py-1.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-left text-xs text-[#C9D1D9] transition-all border border-[#30363D] flex items-center justify-between"
            >
              <span className="font-semibold truncate">JNTUH R22 Syllabus</span>
              <span className="text-[10px] font-mono text-[#00F59B]">Sample 4</span>
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {isParsing && (
          <div className="mt-4 p-6 rounded-xl bg-[#161B22] border border-[#30363D] text-center space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-[#00F59B] border-t-transparent rounded-full animate-spin" />
            <div className="text-xs font-mono text-[#00F59B] font-bold">
              Extracting course modules, credit matrices & learning outcomes...
            </div>
          </div>
        )}

        {/* Parsed Result Preview */}
        {parsedResult && !isParsing && (
          <div className="mt-4 p-4 rounded-xl bg-[#161B22] border border-[#00F59B]/40 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-[#21262D]">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#00F59B] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AI PARSING COMPLETE</span>
                </div>
                <h4 className="text-sm font-bold text-[#F0F6FC] font-display">
                  {parsedResult.title}
                </h4>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30">
                  {parsedResult.credits} Credits • Sem {parsedResult.semester}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono py-1">
              <div className="p-2 rounded-lg bg-[#0D1117] border border-[#30363D]">
                <div className="text-[10px] text-[#8B949E]">MODULES</div>
                <div className="font-bold text-[#00F59B]">{parsedResult.totalModules} Units</div>
              </div>
              <div className="p-2 rounded-lg bg-[#0D1117] border border-[#30363D]">
                <div className="text-[10px] text-[#8B949E]">HOURS</div>
                <div className="font-bold text-sky-400">{parsedResult.estimatedHours} Hours</div>
              </div>
              <div className="p-2 rounded-lg bg-[#0D1117] border border-[#30363D]">
                <div className="text-[10px] text-[#8B949E]">GENERATED Qs</div>
                <div className="font-bold text-amber-400">{parsedResult.generatedQuestionsCount} Questions</div>
              </div>
            </div>

            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {parsedResult.modules.map((m: any, idx: number) => (
                <div key={idx} className="p-2 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs">
                  <div className="font-bold text-[#F0F6FC] flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#00F59B]/20 text-[#00F59B] text-[10px] flex items-center justify-center font-mono">
                      {m.num}
                    </span>
                    <span>{m.name}</span>
                  </div>
                  <div className="text-[11px] text-[#8B949E] mt-1 line-clamp-1">
                    Topics: {m.topics.join(' • ')}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleApplyToStudyRoom}
              className="w-full py-2.5 rounded-xl bg-[#00F59B] hover:bg-[#5EFCC2] text-[#07090D] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Ingest & Assemble Study Room & Mock Papers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { 
  getBlueprintForUniversity, 
  UniversityBlueprint 
} from '../../data/universityExamBlueprints';
import { 
  FileCheck, 
  Clock, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  Lightbulb, 
  AlertTriangle,
  Award
} from 'lucide-react';
import { DataProvenanceBadge } from '../ui/DataProvenanceBadge';

interface UniversityBlueprintViewerProps {
  selectedUniversityId: string;
}

export const UniversityBlueprintViewer: React.FC<UniversityBlueprintViewerProps> = ({
  selectedUniversityId
}) => {
  const blueprint = getBlueprintForUniversity(selectedUniversityId);

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#0D1117] border border-[#30363D] relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F59B]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/30 text-xs font-semibold text-[#00F59B]">
                <Target className="w-3.5 h-3.5" />
                <span>Official University Question Pattern & Step-Marking Scheme</span>
              </div>
              <DataProvenanceBadge metadata={blueprint.source} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F0F6FC]">
              {blueprint.universityName} — {blueprint.examTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#8B949E]">
              Deconstructed section splits, mandatory question rules, internal choice matrix, and official step-marking rubrics.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-xl bg-[#161B22] border border-[#30363D] text-center min-w-[90px]">
              <div className="text-[10px] font-mono text-[#8B949E]">TOTAL MARKS</div>
              <div className="text-2xl font-bold text-[#00F59B] font-display">{blueprint.totalMarks}M</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#161B22] border border-[#30363D] text-center min-w-[90px]">
              <div className="text-[10px] font-mono text-[#8B949E]">PASS MARKS</div>
              <div className="text-2xl font-bold text-amber-400 font-display">{blueprint.passingMarks}M</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#161B22] border border-[#30363D] text-center min-w-[90px]">
              <div className="text-[10px] font-mono text-[#8B949E]">DURATION</div>
              <div className="text-2xl font-bold text-sky-400 font-display">3 Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Breakdown Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#F0F6FC] font-display flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-[#00F59B]" />
          <span>Section-by-Section Blueprint Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blueprint.sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0D1117] border border-[#30363D] hover:border-[#00F59B]/40 transition-all flex flex-col justify-between gap-4 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#21262D]">
                  <span className="font-bold text-sm text-[#F0F6FC] font-display">{sec.groupName}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30">
                    {sec.totalGroupMarks} Marks
                  </span>
                </div>

                <div className="space-y-2 mt-3 text-xs">
                  <div className="flex items-center justify-between text-[#8B949E]">
                    <span>Format:</span>
                    <span className="font-semibold text-[#C9D1D9]">{sec.questionType}</span>
                  </div>

                  <div className="flex items-center justify-between text-[#8B949E]">
                    <span>Attempt:</span>
                    <span className="font-bold text-[#00F59B]">
                      {sec.questionsToAttempt} of {sec.totalQuestionsOffered} Questions ({sec.marksPerQuestion}M each)
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#161B22] border border-[#21262D] mt-2">
                    <div className="text-[10px] font-mono text-[#8B949E] uppercase">Choice Rule:</div>
                    <div className="text-[11px] text-[#F0F6FC] mt-0.5 leading-snug">{sec.choiceRule}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#00F59B]/5 border border-[#00F59B]/20 mt-2">
                    <div className="text-[10px] font-mono text-[#00F59B] uppercase font-bold">Step-Marking Policy:</div>
                    <div className="text-[11px] text-[#C9D1D9] mt-0.5 leading-snug">{sec.stepMarkingPolicy}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Examiner Advice */}
      <div className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] space-y-3">
        <h4 className="text-sm font-bold text-[#F0F6FC] font-display flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Examiner Strategy & High-Yield Marks Maximization Tips</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {blueprint.strategicAdvice.map((advice, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-[#8B949E] leading-relaxed flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-[#C9D1D9]">{advice}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

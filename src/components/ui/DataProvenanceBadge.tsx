import React, { useState } from 'react';
import { 
  SourceMetadata, 
  VerificationStatus, 
  VERIFICATION_BADGE_CONFIGS 
} from '../../types/verification';
import { 
  Info, 
  ExternalLink, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  X,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface DataProvenanceBadgeProps {
  source?: SourceMetadata;
  metadata?: SourceMetadata;
  status?: VerificationStatus;
  labelOverride?: string;
  size?: 'sm' | 'md';
  showDetailsOnClick?: boolean;
  className?: string;
}

export const DataProvenanceBadge: React.FC<DataProvenanceBadgeProps> = ({
  source: propSource,
  metadata,
  status: propStatus,
  labelOverride,
  size = 'sm',
  showDetailsOnClick = true,
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const source = propSource || metadata;

  const status: VerificationStatus = source?.verificationStatus || propStatus || 'UNVERIFIED';
  const config = VERIFICATION_BADGE_CONFIGS[status] || VERIFICATION_BADGE_CONFIGS.UNVERIFIED;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (showDetailsOnClick) setIsModalOpen(true);
        }}
        className={`inline-flex items-center gap-1.5 rounded-full font-mono font-semibold border transition-all cursor-pointer ${config.bgClass} ${config.colorClass} ${config.borderClass} ${
          size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
        } ${className}`}
        title={`Verification: ${config.label}. Click to inspect source audit trace.`}
      >
        <span>{config.icon}</span>
        <span>{labelOverride || config.shortLabel}</span>
        {showDetailsOnClick && (
          <Info className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} opacity-70 hover:opacity-100 ml-0.5`} />
        )}
      </button>

      {/* Source Inspection Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          <div 
            className="relative w-full max-w-md bg-[#0D1117] border border-[#30363D] rounded-2xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#21262D]">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${config.bgClass} ${config.colorClass} border ${config.borderClass}`}>
                  {config.icon}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8B949E] uppercase">ACADEMIC DATA PROVENANCE</div>
                  <h4 className="text-sm font-bold text-[#F0F6FC] font-display flex items-center gap-1.5">
                    <span>{config.label}</span>
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-[#8B949E] hover:text-white bg-[#161B22] border border-[#30363D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-[#8B949E] leading-relaxed">
              {config.description}
            </p>

            {/* Detailed Audit Table */}
            <div className="p-3 rounded-xl bg-[#161B22] border border-[#21262D] space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-[#8B949E]">
                <span>Source Type:</span>
                <span className="text-[#F0F6FC] font-bold">{source?.sourceType || 'OFFICIAL_UNIVERSITY'}</span>
              </div>

              {source?.sourceName && (
                <div className="flex items-center justify-between text-[#8B949E]">
                  <span>Source Name:</span>
                  <span className="text-[#F0F6FC] line-clamp-1 max-w-[200px] text-right font-sans font-medium">{source.sourceName}</span>
                </div>
              )}

              {source?.sourceDocument && (
                <div className="flex items-center justify-between text-[#8B949E]">
                  <span>Document / PDF:</span>
                  <span className="text-sky-400 font-medium line-clamp-1 max-w-[200px] text-right">{source.sourceDocument}</span>
                </div>
              )}

              {source?.regulation && (
                <div className="flex items-center justify-between text-[#8B949E]">
                  <span>Regulation Scheme:</span>
                  <span className="text-emerald-400 font-bold">{source.regulation}</span>
                </div>
              )}

              {source?.academicYear && (
                <div className="flex items-center justify-between text-[#8B949E]">
                  <span>Academic Session:</span>
                  <span className="text-[#F0F6FC]">{source.academicYear}</span>
                </div>
              )}

              {source?.verifiedAt && (
                <div className="flex items-center justify-between text-[#8B949E]">
                  <span>Verified Timestamp:</span>
                  <span className="text-[#8B949E]">{source.verifiedAt}</span>
                </div>
              )}

              {source?.isAiDerived && (
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-sans">
                  ℹ️ <strong>AI-Derived Structuring</strong>: Prerequisite DAG edges or pedagogical rankings were computed via model inference based on official syllabus text.
                </div>
              )}

              {source?.verificationNotes && (
                <div className="pt-2 border-t border-[#30363D] text-[11px] text-[#8B949E] font-sans">
                  <strong>Auditor Notes:</strong> {source.verificationNotes}
                </div>
              )}
            </div>

            {/* External URL link if present */}
            {source?.sourceUrl && (
              <a
                href={source.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-xl bg-[#21262D] hover:bg-[#30363D] text-xs font-mono text-sky-400 flex items-center justify-center gap-1.5 transition-all border border-[#30363D]"
              >
                <span>Inspect Primary Source Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

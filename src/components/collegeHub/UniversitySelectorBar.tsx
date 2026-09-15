import React, { useState } from 'react';
import { 
  PAN_INDIA_UNIVERSITIES, 
  AUTHORITY_CATEGORIES, 
  AuthorityType, 
  UniversityMeta, 
  getUniversitiesByAuthority 
} from '../../data/panIndiaUniversitiesData';
import { 
  GraduationCap, 
  Search, 
  Check, 
  ChevronDown, 
  FileUp, 
  Building2, 
  MapPin, 
  BookOpen, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DataProvenanceBadge } from '../ui/DataProvenanceBadge';

interface UniversitySelectorBarProps {
  selectedUniversityId: string;
  onSelectUniversity: (uniId: string) => void;
  onOpenUploadModal: () => void;
}

export const UniversitySelectorBar: React.FC<UniversitySelectorBarProps> = ({
  selectedUniversityId,
  onSelectUniversity,
  onOpenUploadModal
}) => {
  const [activeAuthorityFilter, setActiveAuthorityFilter] = useState<AuthorityType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeUniversity = PAN_INDIA_UNIVERSITIES.find(u => u.id === selectedUniversityId) || PAN_INDIA_UNIVERSITIES[0];

  // Filtered universities based on category and search query
  const filteredUniversities = getUniversitiesByAuthority(activeAuthorityFilter).filter(u => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.shortName.toLowerCase().includes(q) ||
      u.state.toLowerCase().includes(q) ||
      (u.headquarters && u.headquarters.toLowerCase().includes(q)) ||
      (u.city && u.city.toLowerCase().includes(q))
    );
  });

  const handlePickUniversity = (uni: UniversityMeta) => {
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.3 } });
    onSelectUniversity(uni.id);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full bg-[#0D1117] border border-[#30363D] rounded-2xl p-4 sm:p-5 shadow-lg mb-8 space-y-4">
      {/* Top Row: Authority Tiers & Quick Action */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pb-3 border-b border-[#21262D]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00F59B]/10 border border-[#00F59B]/30 flex items-center justify-center text-base">
            🏛️
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-[#00F59B] uppercase tracking-wider">
              Pan-India Higher Education Authority Grid (35 Institutions • Source-backed)
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#F0F6FC] font-display flex items-center gap-2">
              Select Your State Board, National Institute, or University
            </h3>
          </div>
        </div>

        {/* Upload Custom Syllabus PDF Button */}
        <button
          onClick={onOpenUploadModal}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-[#00F59B]/40 hover:border-[#00F59B] text-[#00F59B] text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm hover:shadow-glow-green"
        >
          <FileUp className="w-3.5 h-3.5" />
          <span>Upload Custom Syllabus PDF</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#00F59B]/20 font-mono">AI Parser</span>
        </button>
      </div>

      {/* Authority Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {AUTHORITY_CATEGORIES.map(cat => {
          const isActive = activeAuthorityFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveAuthorityFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#00F59B] text-[#07090D] shadow-sm'
                  : 'bg-[#161B22] text-[#8B949E] hover:text-[#F0F6FC] border border-[#30363D]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-[#07090D]/20 text-[#07090D]' : 'bg-[#21262D] text-[#8B949E]'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Pick Popular Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-mono text-[#8B949E] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#00F59B]" />
          <span>Quick Select:</span>
        </span>
        {PAN_INDIA_UNIVERSITIES.filter(u => u.isPopular).map(u => (
          <button
            key={u.id}
            onClick={() => handlePickUniversity(u)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedUniversityId === u.id
                ? 'bg-[#00F59B]/20 text-[#00F59B] border border-[#00F59B]/50 font-bold'
                : 'bg-[#161B22] text-[#C9D1D9] border border-[#30363D] hover:border-[#8B949E]'
            }`}
          >
            <span>{u.icon}</span>
            <span>{u.shortName}</span>
            <span className="text-[9px] text-[#8B949E] font-mono">({u.state})</span>
          </button>
        ))}

        {/* Dropdown Opener for Full 35 List */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#21262D] text-[#58A6FF] border border-[#30363D] hover:bg-[#30363D] flex items-center gap-1.5 cursor-pointer"
          >
            <span>Browse All ({PAN_INDIA_UNIVERSITIES.length})</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Searchable Dropdown Popup */}
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-80 sm:w-96 max-h-96 overflow-y-auto bg-[#161B22] border border-[#30363D] rounded-xl shadow-2xl p-2 z-50 animate-scale-in">
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8B949E]" />
                <input
                  type="text"
                  placeholder="Search state, university name, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs text-[#F0F6FC] placeholder-[#8B949E] focus:outline-none focus:border-[#00F59B]"
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                {filteredUniversities.map(u => (
                  <div
                    key={u.id}
                    onClick={() => handlePickUniversity(u)}
                    className={`p-2 rounded-lg cursor-pointer transition-all flex items-start justify-between gap-2 ${
                      selectedUniversityId === u.id
                        ? 'bg-[#00F59B]/10 border border-[#00F59B]/40 text-[#F0F6FC]'
                        : 'hover:bg-[#21262D] text-[#C9D1D9]'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-base">{u.icon}</span>
                      <div>
                        <div className="font-bold text-xs flex items-center gap-1.5">
                          <span>{u.shortName}</span>
                          {selectedUniversityId === u.id && <Check className="w-3 h-3 text-[#00F59B]" />}
                        </div>
                        <div className="text-[10px] text-[#8B949E] line-clamp-1">{u.name}</div>
                        <div className="text-[9px] font-mono text-[#58A6FF] flex items-center gap-2 mt-0.5">
                          <span>📍 {u.state}</span>
                          {u.affiliatingCollegesCount != null && u.affiliatingCollegesCount > 0 ? (
                            <span>• {u.affiliatingCollegesCount} Affiliated Colleges</span>
                          ) : (
                            <span className="text-[#8B949E]">• Unitary / Direct Campus</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#0D1117] border border-[#30363D] text-[#8B949E] shrink-0">
                      {u.authorityLabel.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected University Context Card */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-[#161B22]/70 border border-[#30363D] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#21262D] border border-[#30363D] flex items-center justify-center text-xl shrink-0">
            {activeUniversity.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm sm:text-base font-extrabold text-[#F0F6FC] font-display">
                {activeUniversity.name}
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30">
                {activeUniversity.authorityLabel}
              </span>
              <span className="text-xs text-[#8B949E] font-mono flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {activeUniversity.headquarters}
              </span>
            </div>

            <div className="text-xs text-[#8B949E] mt-1 line-clamp-1">
              {activeUniversity.description}
            </div>

            <div className="flex items-center gap-3 mt-2 text-[11px] font-mono flex-wrap">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Active Regulation: {activeUniversity.regulationCode}</span>
              </span>
              <span className="text-[#8B949E]">•</span>
              <span className="text-sky-400">
                Blueprint: {activeUniversity.blueprintPattern?.split('(')[0] || 'Official Blueprint'}
              </span>
              {activeUniversity.affiliatingCollegesCount != null && activeUniversity.affiliatingCollegesCount > 0 && (
                <>
                  <span className="text-[#8B949E]">•</span>
                  <span className="text-amber-400 font-bold">
                    🏛️ {activeUniversity.affiliatingCollegesCount} Affiliated Colleges
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <DataProvenanceBadge metadata={activeUniversity.source} />
          <a
            href={activeUniversity.officialWebsite}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#21262D] hover:bg-[#30363D] text-[#8B949E] hover:text-[#F0F6FC] text-xs font-mono transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>View Official Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

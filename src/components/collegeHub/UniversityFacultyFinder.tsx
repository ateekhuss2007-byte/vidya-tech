import React, { useState, useMemo } from 'react';
import { 
  UNIVERSITY_FACULTY_DIRECTORY, 
  UniversityTeacherProfile, 
  searchFacultyByTopic 
} from '../../data/universityFacultyData';
import { 
  PAN_INDIA_UNIVERSITIES 
} from '../../data/panIndiaUniversitiesData';
import { 
  Search, 
  Sparkles, 
  Award, 
  Star, 
  Calendar, 
  Clock, 
  Video, 
  Languages, 
  CheckCircle2, 
  Play, 
  ExternalLink,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { DataProvenanceBadge } from '../ui/DataProvenanceBadge';

interface UniversityFacultyFinderProps {
  selectedUniversityId: string;
}

export const UniversityFacultyFinder: React.FC<UniversityFacultyFinderProps> = ({
  selectedUniversityId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicBadge, setSelectedTopicBadge] = useState<string | null>(null);
  const [selectedFacultyForBooking, setSelectedFacultyForBooking] = useState<UniversityTeacherProfile | null>(null);

  const matchedFaculty = useMemo(() => {
    // If a specific topic badge pill is clicked, search that
    const query = selectedTopicBadge || searchQuery;
    return searchFacultyByTopic(query, selectedUniversityId === 'all' ? undefined : selectedUniversityId);
  }, [searchQuery, selectedTopicBadge, selectedUniversityId]);

  const handleBookMicroSession = (faculty: UniversityTeacherProfile) => {
    confetti({ particleCount: 50, spread: 60 });
    toast.success(`Micro-Doubt Session Booked with ${faculty.name}!`, {
      description: `Free under ${faculty.microDoubtSlotFee}. Video meeting room link generated.`
    });
    setSelectedFacultyForBooking(null);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#007AFF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 text-xs font-semibold text-[#007AFF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH26043 Core Engine: Atomic Topic Faculty Match</span>
            </div>
            <DataProvenanceBadge 
              status="DEMO"
              labelOverride="Simulated Demo Data (SIH26043)"
              metadata={matchedFaculty[0]?.source}
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7]">
            Semantic Teacher Discovery for Specific Topics
          </h2>

          <p className="text-xs sm:text-sm text-[#1D1D1F]/70 dark:text-[#AAAAAA] leading-relaxed">
            Stop wasting hours digging through 45-minute YouTube search results. VIDYA AI accredits educators with 
            <strong> Atomic Topic Badges</strong> and calculates the <strong>Topic Affinity Score ($S_t$)</strong> based on student score improvements and vernacular language compatibility.
          </p>
        </div>

        {/* Micro-Topic Search Input */}
        <div className="relative mt-5 max-w-2xl">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#1D1D1F]/70 dark:text-[#AAAAAA]" />
          <input
            type="text"
            placeholder="Search micro-topic (e.g. 'AVL Tree Double Rotations', 'Booth Multiplication', 'Paging TLB', 'Java Multithreading')..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedTopicBadge(null);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#AAAAAA]/30 dark:border-white/[0.08] text-xs sm:text-sm text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#8B949E] focus:outline-none focus:border-[#007AFF] transition-all shadow-inner"
          />
        </div>

        {/* Quick Topic Badges Filter */}
        <div className="flex items-center gap-2 flex-wrap mt-3 pt-2">
          <span className="text-[11px] font-mono text-[#1D1D1F]/70 dark:text-[#AAAAAA]">High-Yield Concept Badges:</span>
          {[
            'AVL Tree Double Rotations',
            'Booth Multiplication',
            'Banker Algorithm',
            'Virtual Memory Paging',
            'Java Multithreading',
            'Pumping Lemma'
          ].map((topic, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedTopicBadge(topic === selectedTopicBadge ? null : topic);
                setSearchQuery('');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedTopicBadge === topic
                  ? 'bg-[#007AFF] text-white shadow-sm font-bold'
                  : 'bg-[#F5F5F7] dark:bg-white/[0.04] text-[#1D1D1F] dark:text-[#F5F5F7] border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#8B949E]'
              }`}
            >
              🎯 {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {matchedFaculty.map((faculty) => (
          <div
            key={faculty.id}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] hover:border-[#007AFF]/50 transition-all shadow-md flex flex-col justify-between gap-4 group relative overflow-hidden"
          >
            <div>
              {/* Top Row: Avatar + Rating + Affiliation */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={faculty.avatarUrl}
                    alt={faculty.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#AAAAAA]/30 dark:border-white/[0.08] group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="font-bold text-base text-[#1D1D1F] dark:text-[#F5F5F7] font-display flex items-center gap-1.5">
                      <span>{faculty.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-[#007AFF]" />
                    </h3>
                    <div className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] line-clamp-1">{faculty.title}</div>
                    <div className="text-[11px] text-[#58A6FF] font-mono mt-0.5">
                      🏛️ {faculty.collegeOrInstitute}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-1">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs font-mono">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>{faculty.rating}</span>
                  </div>
                  <span className="text-[9px] text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-mono">{faculty.totalReviews} reviews</span>
                  <DataProvenanceBadge metadata={faculty.source} />
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] mt-3 line-clamp-2 leading-relaxed">
                {faculty.bio}
              </p>

              {/* Languages Supported */}
              <div className="flex items-center gap-2 mt-3 text-xs text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Languages className="w-3.5 h-3.5 text-[#007AFF]" />
                <span className="text-[11px] font-mono text-[#1D1D1F]/70 dark:text-[#AAAAAA]">Vernacular Languages:</span>
                <span className="text-[11px] font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {faculty.languages.join(', ')}
                </span>
              </div>

              {/* Accredited Micro-Topic Badges */}
              <div className="mt-4 space-y-2">
                <div className="text-[10px] font-mono font-bold text-[#007AFF] uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Topic Accreditation Badges (Formula S_t Match):</span>
                </div>

                <div className="space-y-1.5">
                  {faculty.accreditedTopicBadges.map((badge, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-2.5 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.04] border border-[#21262D] flex items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <div className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{badge.topicName}</div>
                        <div className="text-[10px] text-[#1D1D1F]/70 dark:text-[#AAAAAA]">{badge.subject}</div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {badge.studentRemediationSuccessRate}% Retention
                        </span>
                        <div className="text-[9px] text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-mono mt-0.5">
                          {badge.doubtsResolvedCount} doubts resolved
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Micro-Lecture Video Snippet */}
              {faculty.curatedMicroLectureSnippet && (
                <div className="mt-3.5 p-2.5 rounded-xl bg-[#007AFF]/5 border border-[#007AFF]/20 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#007AFF] text-white flex items-center justify-center shrink-0">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1D1D1F] dark:text-[#F5F5F7] line-clamp-1">
                        {faculty.curatedMicroLectureSnippet.videoTitle}
                      </div>
                      <div className="text-[10px] text-[#1D1D1F]/70 dark:text-[#AAAAAA] font-mono">
                        {faculty.curatedMicroLectureSnippet.timestampHighlight}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#007AFF] px-1.5 py-0.5 rounded bg-[#007AFF]/10 shrink-0">
                    {faculty.curatedMicroLectureSnippet.videoDuration}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#21262D] flex items-center justify-between gap-3 mt-2">
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                🟢 {faculty.microDoubtSlotFee}
              </span>

              <button
                onClick={() => handleBookMicroSession(faculty)}
                className="px-3.5 py-1.5 rounded-xl bg-[#007AFF] hover:bg-[#5EFCC2] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Book 10-Min Micro Doubt</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {matchedFaculty.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#1D1D1F] border border-[#AAAAAA]/30 dark:border-white/[0.08] space-y-3">
          <div className="text-3xl">🔍</div>
          <h4 className="text-base font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">No faculty found for this exact query</h4>
          <p className="text-xs text-[#1D1D1F]/70 dark:text-[#AAAAAA] max-w-md mx-auto">
            Try searching for another topic like 'AVL', 'Booth', 'Paging', or 'Multithreading', or switch to 'All Authorities'.
          </p>
        </div>
      )}
    </div>
  );
};

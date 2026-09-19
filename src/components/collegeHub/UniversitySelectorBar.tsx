import React, { useState } from 'react';
import { 
  PAN_INDIA_UNIVERSITIES, 
  AUTHORITY_CATEGORIES, 
  AuthorityType, 
  UniversityMeta, 
  getUniversitiesByAuthority 
} from '../../data/panIndiaUniversitiesData';
import { 
  Upload, 
  Globe, 
  Search, 
  Check, 
  FileText, 
  X,
  LayoutGrid,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UniversitySelectorBarProps {
  selectedUniversityId: string;
  onSelectUniversity: (uniId: string) => void;
  onOpenUploadModal: () => void;
}

// Highly Detailed Authentic Vector Insignias
const UniversityInsignia: React.FC<{ 
  type: string;
  className?: string;
}> = ({ type, className = "w-11 h-11" }) => {
  switch (type) {
    case 'makaut':
      // Maulana Abul Kalam Azad University of Technology (Official Blue Shield & Bengal Insignia)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#F0F7FF" stroke="#2563EB" strokeWidth="1.5" />
          {/* Outer gear rim */}
          <circle cx="26" cy="26" r="21" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 2" />
          {/* Main Royal Blue Shield */}
          <path d="M16 14 H36 V28 C36 36 26 41 26 41 C26 41 16 36 16 28 Z" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1" />
          {/* Golden Torch & Flame */}
          <path d="M26 18 C24 21 23 23 26 27 C29 23 28 21 26 18 Z" fill="#F59E0B" />
          <path d="M25 27 H27 V30 H25 Z" fill="#D97706" />
          {/* Open Book of Knowledge */}
          <path d="M19 28 C22 27 24 28 26 29 C28 28 30 27 33 28 V33 C30 32 28 33 26 34 C24 33 22 32 19 33 Z" fill="#FFFFFF" stroke="#1E40AF" strokeWidth="0.8" />
          {/* Text banner */}
          <rect x="18" y="34" width="16" height="5" rx="1.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.6" />
          <text x="26" y="38" textAnchor="middle" fill="#854D0E" fontSize="3.8" fontWeight="bold" fontFamily="sans-serif">MAKAUT</text>
        </svg>
      );

    case 'aktu':
      // Dr. A.P.J. Abdul Kalam Technical University (Official Golden Gear & Sun Emblem)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
          {/* Gear teeth border */}
          <circle cx="26" cy="26" r="21" fill="none" stroke="#B45309" strokeWidth="2.5" strokeDasharray="4 2.5" />
          {/* Inner ring */}
          <circle cx="26" cy="26" r="16" fill="#FEF3C7" stroke="#92400E" strokeWidth="1" />
          {/* Radiant Rising Sun */}
          <circle cx="26" cy="26" r="7" fill="#D97706" />
          <path d="M26 15 V19 M26 33 V37 M15 26 H19 M33 26 H37 M18 18 L21 21 M31 31 L34 34 M18 34 L21 31 M31 21 L34 18" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
          {/* Open Book */}
          <path d="M21 28 C23 27 25 28 26 29 C27 28 29 27 31 28 V32 C29 31 27 32 26 33 C25 32 23 31 21 32 Z" fill="#FFFFFF" stroke="#92400E" strokeWidth="0.8" />
        </svg>
      );

    case 'vtu':
      // Visvesvaraya Technological University (Official Bronze Cogwheel & Torch)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#FFF7ED" stroke="#9A3412" strokeWidth="1.5" />
          {/* Industrial Cogwheel 24 Teeth */}
          <circle cx="26" cy="26" r="20" fill="none" stroke="#C2410C" strokeWidth="3" strokeDasharray="3 2" />
          <circle cx="26" cy="26" r="14" fill="#9A3412" />
          {/* Inner Medallion & Torch */}
          <circle cx="26" cy="26" r="11" fill="#EA580C" stroke="#FED7AA" strokeWidth="1" />
          <path d="M26 18 L28 23 H24 Z" fill="#FEF08A" />
          <rect x="25" y="23" width="2" height="7" fill="#FFFFFF" />
          <circle cx="26" cy="26" r="2.5" fill="#7C2D12" />
        </svg>
      );

    case 'vit':
      // Vellore Institute of Technology (Official Royal Blue Shield & Star)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#EFF6FF" stroke="#1E40AF" strokeWidth="1.5" />
          {/* Classic Shield */}
          <path d="M17 14 H35 V28 C35 35 26 40 26 40 C26 40 17 35 17 28 Z" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="1" />
          {/* Five-pointed star */}
          <polygon points="26,17 27.5,21 32,21 28.5,23.5 30,28 26,25.5 22,28 23.5,23.5 20,21 24.5,21" fill="#FFFFFF" />
          {/* Open Book */}
          <path d="M20 28 C23 27 25 28 26 29 C27 28 29 27 32 28 V33 C29 32 27 33 26 34 C25 33 23 32 20 33 Z" fill="#FFFFFF" />
          <text x="26" y="38" textAnchor="middle" fill="#93C5FD" fontSize="4.5" fontWeight="black" fontFamily="sans-serif">VIT</text>
        </svg>
      );

    case 'bits_pilani':
      // BITS Pilani (Official Turquoise Knowledge Wheel & Torch)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#F0FDF4" stroke="#047857" strokeWidth="1.5" />
          <circle cx="26" cy="26" r="21" fill="none" stroke="#059669" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle cx="26" cy="26" r="16" fill="#047857" />
          {/* Flaming Torch & Knowledge Ring */}
          <path d="M26 16 C24 19 23 21 26 25 C29 21 28 19 26 16 Z" fill="#FBBF24" />
          <rect x="25" y="24" width="2" height="8" fill="#FFFFFF" />
          <circle cx="26" cy="28" r="6" fill="none" stroke="#A7F3D0" strokeWidth="1.2" strokeDasharray="2 1.5" />
          <path d="M19 33 C22 31.5 24 32.5 26 33.5 C28 32.5 30 31.5 33 33" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'anna_univ':
      // Anna University Chennai (Official Golden Temple & Wheel Emblem)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="26" cy="26" r="21" fill="none" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Historic South Indian Temple Gopuram */}
          <path d="M22 36 H30 V28 H32 L26 16 L20 28 H22 Z" fill="#D97706" stroke="#92400E" strokeWidth="0.8" />
          <rect x="24" y="30" width="4" height="6" fill="#78350F" />
          <circle cx="26" cy="14" r="1.8" fill="#B45309" />
          <circle cx="26" cy="24" r="2.5" fill="#FEF3C7" stroke="#92400E" strokeWidth="0.8" />
          <path d="M18 36 H34" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'iit_delhi':
      // IIT Delhi (Official Maroon Circular Gear & Purna Kalasha Seal)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#FEF2F2" stroke="#991B1B" strokeWidth="1.5" />
          {/* 16-toothed outer cogwheel */}
          <circle cx="26" cy="26" r="20" fill="none" stroke="#B91C1C" strokeWidth="2.8" strokeDasharray="4 2.5" />
          <circle cx="26" cy="26" r="14" fill="#991B1B" />
          {/* Central Purna Kalasha & Eternal Flame */}
          <ellipse cx="26" cy="29" rx="6" ry="4" fill="#FFFFFF" />
          <path d="M23 29 H29 V33 H23 Z" fill="#FFFFFF" />
          <path d="M26 19 C24 22 23 24 26 28 C29 24 28 22 26 19 Z" fill="#FBBF24" />
          <circle cx="26" cy="29" r="2" fill="#991B1B" />
        </svg>
      );

    case 'jntuh':
      // JNTU Hyderabad (Official Blue & Red Seal with Gear)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
          <circle cx="26" cy="26" r="21" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="26" cy="26" r="16" fill="#1D4ED8" />
          {/* Gear teeth and center disc */}
          <circle cx="26" cy="26" r="12" fill="#DC2626" />
          <circle cx="26" cy="26" r="7" fill="#FFFFFF" />
          <path d="M26 19 L28 24 H24 Z" fill="#F59E0B" />
          <rect x="25" y="24" width="2" height="5" fill="#1D4ED8" />
        </svg>
      );

    case 'iit_bombay':
      // IIT Bombay (Official Gold & Black Cogwheel Seal)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
          {/* Cogwheel Teeth */}
          <circle cx="26" cy="26" r="20" fill="none" stroke="#78350F" strokeWidth="2.8" strokeDasharray="4 2.5" />
          <circle cx="26" cy="26" r="14" fill="#D97706" />
          {/* Inner Sacred Sun & Flame */}
          <circle cx="26" cy="26" r="9" fill="#78350F" />
          <polygon points="26,19 28.5,27 23.5,27" fill="#FDE68A" />
          <circle cx="26" cy="28" r="3" fill="#F59E0B" />
        </svg>
      );

    case 'dtu':
      // Delhi Technological University (Official Red Shield & Gear Emblem)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.5" />
          {/* Red Heritage Shield */}
          <path d="M16 14 H36 V28 C36 36 26 41 26 41 C26 41 16 36 16 28 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
          {/* Torch & Book */}
          <path d="M26 18 L28 23 H24 Z" fill="#FEF08A" />
          <rect x="25" y="23" width="2" height="6" fill="#FFFFFF" />
          <text x="26" y="35" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="900" fontFamily="sans-serif">DTU</text>
        </svg>
      );

    case 'calcutta_univ':
      // University of Calcutta (Official Blue Heritage Seal)
      return (
        <svg viewBox="0 0 52 52" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="1.5" />
          <circle cx="26" cy="26" r="21" fill="none" stroke="#1E40AF" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="26" cy="26" r="15" fill="#1E3A8A" />
          {/* Eight-pointed knowledge star */}
          <polygon points="26,16 28,22 34,20 30,25 35,28 29,30 30,36 26,32 22,36 23,30 17,28 22,25 18,20 24,22" fill="#FFFFFF" />
          <circle cx="26" cy="26" r="3.5" fill="#1E3A8A" />
        </svg>
      );

    case 'browse_all':
      return (
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-700/80 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <LayoutGrid className="w-6 h-6" />
        </div>
      );

    default:
      return (
        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-xl">
          🏛️
        </div>
      );
  }
};

// Component that renders the authentic real image logo with seamless vector SVG fallback
const AuthenticUniversityLogo: React.FC<{
  id: string;
  name: string;
  className?: string;
}> = ({ id, name, className = "w-12 h-12" }) => {
  const [imgError, setImgError] = useState(false);

  // Official high-resolution logo links
  const officialLogoUrls: Record<string, string> = {
    makaut: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Maulana_Abul_Kalam_Azad_University_of_Technology_logo.png',
    aktu: 'https://upload.wikimedia.org/wikipedia/en/9/98/Dr._A.P.J._Abdul_Kalam_Technical_University_logo.png',
    vtu: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Visvesvaraya_Technological_University_logo.png',
    vit: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/300px-Vellore_Institute_of_Technology_seal_2017.svg.png',
    bits_pilani: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/300px-BITS_Pilani-Logo.svg.png',
    anna_univ: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/300px-Anna_University_Logo.svg.png',
    iit_delhi: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Indian_Institute_of_Technology_Delhi_Logo.svg/300px-Indian_Institute_of_Technology_Delhi_Logo.svg.png',
    jntuh: 'https://upload.wikimedia.org/wikipedia/en/2/2f/JNTU_Hyderabad_logo.png',
    iit_bombay: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/300px-Indian_Institute_of_Technology_Bombay_Logo.svg.png',
    dtu: 'https://upload.wikimedia.org/wikipedia/en/b/b5/DTU%2C_Delhi_official_logo.png',
    calcutta_univ: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/University_of_Calcutta_logo.svg/300px-University_of_Calcutta_logo.svg.png'
  };

  const imgUrl = officialLogoUrls[id];

  if (imgUrl && !imgError) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <img
          src={imgUrl}
          alt={`${name} Official Logo`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
          className="max-w-full max-h-full object-contain drop-shadow-xs"
        />
      </div>
    );
  }

  return <UniversityInsignia type={id} className={className} />;
};

// 11 Core Featured Universities + Browse All Card (6x2 grid)
interface GridItem {
  id: string;
  name: string;
  isAction?: boolean;
}

const FEATURED_GRID_ITEMS: GridItem[] = [
  { id: 'makaut', name: 'MAKAUT (WBUT)' },
  { id: 'aktu', name: 'AKTU (UPTU)' },
  { id: 'vtu', name: 'VTU Belagavi' },
  { id: 'vit', name: 'VIT Vellore' },
  { id: 'bits_pilani', name: 'BITS Pilani' },
  { id: 'anna_univ', name: 'Anna University' },
  { id: 'iit_delhi', name: 'IIT Delhi' },
  { id: 'jntuh', name: 'JNTU Hyderabad' },
  { id: 'iit_bombay', name: 'IIT Bombay' },
  { id: 'dtu', name: 'DTU Delhi' },
  { id: 'calcutta_univ', name: 'Calcutta University' },
  { id: 'browse_all', name: 'Browse All', isAction: true }
];

export const UniversitySelectorBar: React.FC<UniversitySelectorBarProps> = ({
  selectedUniversityId,
  onSelectUniversity,
  onOpenUploadModal
}) => {
  const [activeAuthorityFilter, setActiveAuthorityFilter] = useState<AuthorityType | 'all'>('all');
  const [isAuthorityDropdownOpen, setIsAuthorityDropdownOpen] = useState<boolean>(false);
  const [isBrowseModalOpen, setIsBrowseModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeUniversity: UniversityMeta = 
    PAN_INDIA_UNIVERSITIES.find(u => u.id === selectedUniversityId) || 
    PAN_INDIA_UNIVERSITIES[0];

  const handlePickUniversity = (uniId: string) => {
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.3 } });
    onSelectUniversity(uniId);
  };

  // Find label of currently selected authority filter
  const currentAuthorityObj = AUTHORITY_CATEGORIES.find(c => c.id === activeAuthorityFilter) || AUTHORITY_CATEGORIES[0];
  const currentAuthorityLabel = currentAuthorityObj.id === 'all' 
    ? 'All Authorities' 
    : currentAuthorityObj.label.split('(')[0].trim();

  // Dynamic grid: when activeAuthorityFilter is 'all', show the 12 featured cards.
  // When a specific authority is selected, show universities of that authority!
  const displayGridItems: GridItem[] = activeAuthorityFilter === 'all'
    ? FEATURED_GRID_ITEMS
    : [
        ...getUniversitiesByAuthority(activeAuthorityFilter).slice(0, 11).map(u => ({
          id: u.id,
          name: u.shortName || u.name
        })),
        { id: 'browse_all', name: 'Browse All', isAction: true }
      ];

  const filteredModalUniversities = getUniversitiesByAuthority(activeAuthorityFilter).filter(u => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.shortName.toLowerCase().includes(q) ||
      u.state.toLowerCase().includes(q) ||
      (u.city && u.city.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full mb-8 font-sans">
      
      {/* 1. SINGLE CONSOLIDATED AUTHORITY SELECTOR PILL (Dropdown Menu) */}
      <div className="relative inline-block mb-5">
        <button
          onClick={() => setIsAuthorityDropdownOpen(!isAuthorityDropdownOpen)}
          className="px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 bg-[#DFECF7] dark:bg-blue-950/60 border border-[#3880C8] dark:border-blue-500 text-[#1C4E80] dark:text-blue-300 shadow-2xs hover:bg-[#D3E5F3]"
        >
          <span>{currentAuthorityLabel}</span>
          {currentAuthorityObj.id === 'state_technical' && <span className="text-[11px] opacity-80">(Affiliating)</span>}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAuthorityDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu when clicked */}
        {isAuthorityDropdownOpen && (
          <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
            <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1.5">
              Select Authority Category
            </div>
            {AUTHORITY_CATEGORIES.map((cat) => {
              const isSelected = activeAuthorityFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveAuthorityFilter(cat.id);
                    setIsAuthorityDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1C4E80] dark:text-blue-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.label.split('(')[0].trim()}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. UNIVERSITY GRID (6 COLUMNS × 2 ROWS = 12 ROUNDED CARDS WITH AUTHENTIC LOGOS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 mb-6">
        {displayGridItems.map((item) => {
          const isSelected = selectedUniversityId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                if (item.isAction) {
                  setIsBrowseModalOpen(true);
                } else {
                  handlePickUniversity(item.id);
                }
              }}
              className={`rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2.5 transition-all duration-200 cursor-pointer select-none bg-white dark:bg-slate-800/90 border ${
                isSelected
                  ? 'border-blue-400 ring-2 ring-blue-500/80 bg-blue-50/30 dark:bg-blue-950/30 shadow-sm'
                  : 'border-slate-200/90 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="shrink-0 h-12 flex items-center justify-center">
                {item.isAction ? (
                  <UniversityInsignia type="browse_all" className="w-12 h-12" />
                ) : (
                  <AuthenticUniversityLogo id={item.id} name={item.name} className="w-12 h-12" />
                )}
              </div>
              <div className={`text-xs sm:text-[13px] tracking-tight leading-tight line-clamp-1 ${
                isSelected 
                  ? 'font-black text-[#1C4E80] dark:text-blue-300' 
                  : 'font-semibold text-slate-800 dark:text-slate-200'
              }`}>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. TWO-COLUMN DETAILS SECTION (LEFT: CURRICULUM DETAILS, RIGHT: QUICK TOOLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        
        {/* Left Column: University Name & Curriculum Details (~68% width) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-sm">
          
          {/* University Header Row */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 rounded-xl bg-[#E8F1FA] dark:bg-slate-700 p-1 flex items-center justify-center shrink-0">
              <AuthenticUniversityLogo id={activeUniversity.id} name={activeUniversity.name} className="w-10 h-10" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate">
                {activeUniversity.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {activeUniversity.headquarters || `${activeUniversity.city}, ${activeUniversity.state}`}
              </p>
            </div>
          </div>

          {/* Curriculum Details Content */}
          <div className="pt-4 space-y-3">
            <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Curriculum Details
            </h4>
            
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Syllabus Breakdown
            </div>

            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 pt-1">
              Key Regulations
            </div>

            {/* Bottom Badges Row */}
            <div className="flex items-center gap-3 pt-2 flex-wrap text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400">◎</span>
                <span className="font-medium">Active Regulation: {activeUniversity.regulationCode?.split('(')[0] || 'R-23'}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium">AICTE Model Curriculum</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400">▤</span>
                <span className="font-medium">Blueprint: {activeUniversity.blueprintPattern?.split('(')[0] || '70-Mark End-Sem'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Quick Tools (~32% width) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Quick Tools
            </h4>

            <div className="space-y-3">
              {/* Tool 1: Upload Custom Syllabus PDF */}
              <button
                onClick={onOpenUploadModal}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-800 dark:text-slate-200 transition-colors text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:border-blue-400 group-hover:text-blue-600 transition-colors shrink-0">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-medium leading-tight">
                  Upload Custom Syllabus PDF
                </div>
              </button>

              {/* Tool 2: View Official Source */}
              <a
                href={activeUniversity.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-800 dark:text-slate-200 transition-colors text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:border-blue-400 group-hover:text-blue-600 transition-colors shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-medium leading-tight">
                  View Official Source
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 4. FOOTER AT BOTTOM */}
      <div className="text-center pt-6 pb-2 text-xs text-slate-400 space-y-1">
        <div className="flex items-center justify-center gap-4">
          <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">About</a>
          <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Contact</a>
        </div>
        <p>Copyright 2026. All rights reserved.</p>
      </div>

      {/* Searchable Modal for Full Pan-India Directory when "Browse All" is clicked */}
      {isBrowseModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">All Pan-India Technical Institutions</h3>
                <p className="text-xs text-slate-500">Official-Source Backed Master Registry (35+ Authorities)</p>
              </div>
              <button
                onClick={() => setIsBrowseModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search university name, state, abbreviation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="p-3 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredModalUniversities.map((u) => (
                <div
                  key={u.id}
                  onClick={() => {
                    handlePickUniversity(u.id);
                    setIsBrowseModalOpen(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    selectedUniversityId === u.id
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                      <AuthenticUniversityLogo id={u.id} name={u.name} className="w-9 h-9" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-900 dark:text-white truncate">{u.shortName}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{u.name}</div>
                      <div className="text-[9px] text-[#2D7BD8] font-mono">📍 {u.state} • {u.authorityLabel}</div>
                    </div>
                  </div>
                  {selectedUniversityId === u.id && (
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

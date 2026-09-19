/**
 * ============================================================================
 * VIDYA AI — Pan-India Education Boards & Examination Authorities Database
 * ============================================================================
 * Verified national and state education boards, blueprints, and evaluation
 * rubrics across Central, State Secondary/Higher Secondary, and Competitive boards.
 * ============================================================================
 */

export interface EducationBoardMeta {
  id: string;
  name: string;
  shortName: string;
  category: 'national_board' | 'state_board' | 'entrance_commission';
  categoryLabel: string;
  state: string;
  headquarters: string;
  officialWebsite: string;
  icon: string;
  isPopular: boolean;
  standards: string[];
  blueprintPattern: string;
  evaluationScheme: string;
  description: string;
}

export const EDUCATION_BOARDS_CATEGORIES = [
  { id: 'all', label: 'All Boards (14 Authorities)', badge: 'ALL-BOARDS' },
  { id: 'national_board', label: 'National School Boards (CBSE / CISCE)', badge: 'NATIONAL' },
  { id: 'state_board', label: 'State School Education Boards', badge: 'STATE' },
  { id: 'entrance_commission', label: 'National Entrance & Commissions', badge: 'COMPETITIVE' }
];

export const POPULAR_BOARD_IDS = [
  'cbse',
  'icse',
  'wbchse',
  'upmsp',
  'msbshse',
  'kseab',
  'bseb',
  'nta',
  'gate_iit',
  'ssc'
];

export const ALL_EDUCATION_BOARDS: EducationBoardMeta[] = [
  // =========================================================================
  // 1. NATIONAL SCHOOL BOARDS
  // =========================================================================
  {
    id: 'cbse',
    name: 'Central Board of Secondary Education',
    shortName: 'CBSE',
    category: 'national_board',
    categoryLabel: 'National Board of India',
    state: 'Pan-India / Delhi',
    headquarters: 'Shiksha Kendra, 2 Community Centre, Preet Vihar, Delhi 110092',
    officialWebsite: 'https://cbse.gov.in',
    icon: '🏫',
    isPopular: true,
    standards: ['Class 10 (Secondary)', 'Class 12 (Senior Secondary)'],
    blueprintPattern: '80-Mark Board Exam (20 MCQs + 5 VSA [2M] + 6 SA [3M] + 4 LA [5M] + 3 Case Studies [4M])',
    evaluationScheme: '80% Board Written Paper + 20% Internal Assessment / Practical (33% mandatory passing threshold)',
    description: 'Premier national curriculum board of India under Ministry of Education, setting NCERT benchmarks for Class 10 & 12 board examinations.'
  },
  {
    id: 'icse',
    name: 'Council for the Indian School Certificate Examinations (CISCE)',
    shortName: 'CISCE / ISC',
    category: 'national_board',
    categoryLabel: 'National Board of India',
    state: 'Pan-India / New Delhi',
    headquarters: 'Pragati House, 3rd Floor, 47-48 Nehru Place, New Delhi 110019',
    officialWebsite: 'https://cisce.org',
    icon: '🏫',
    isPopular: true,
    standards: ['Class 10 (ICSE)', 'Class 12 (ISC)'],
    blueprintPattern: '80-Mark Theory (Section A Compulsory Short Questions + Section B/C Extended Analytical Questions)',
    evaluationScheme: '80% Theory Examination + 20% Internal Assessment & Practical Evaluation (35% pass rule)',
    description: 'Renowned national private board conducting ICSE (Class 10) and ISC (Class 12) examinations with deep literature & comprehensive science rigor.'
  },
  {
    id: 'wbchse',
    name: 'West Bengal Council of Higher Secondary Education',
    shortName: 'WBCHSE (Uchha Madhyamik)',
    category: 'state_board',
    categoryLabel: 'State Higher Secondary Board',
    state: 'West Bengal',
    headquarters: 'Vidyasagar Bhavan, 9/2 Block DJ, Sector II, Salt Lake, Kolkata 700091',
    officialWebsite: 'https://wbchse.wb.gov.in',
    icon: '🏛️',
    isPopular: true,
    standards: ['Class 11', 'Class 12 (Higher Secondary)'],
    blueprintPattern: '70-Mark Theory (Science) / 80-Mark Theory (Arts/Commerce) with dedicated Part A & Part B',
    evaluationScheme: '70% Theory + 30% Laboratory Practical (Science) / 80% Theory + 20% Project Work (30% per-subject pass rule)',
    description: 'Official statutory authority for Class 11 and 12 Higher Secondary education across West Bengal (NEP semester system introduced).'
  },
  {
    id: 'wbbse',
    name: 'West Bengal Board of Secondary Education',
    shortName: 'WBBSE (Madhyamik)',
    category: 'state_board',
    categoryLabel: 'State Secondary Board',
    state: 'West Bengal',
    headquarters: 'Nivedita Bhavan, Block DJ-8, Sector II, Salt Lake, Kolkata 700091',
    officialWebsite: 'https://wbbse.wb.gov.in',
    icon: '🏛️',
    isPopular: true,
    standards: ['Class 10 (Madhyamik Pariksha)'],
    blueprintPattern: '90-Mark Written Examination (Group A MCQs + Group B VSA + Group C SA + Group D LA)',
    evaluationScheme: '90 Marks Written Examination + 10 Marks Internal Formative Evaluation (Overall 25% passing)',
    description: 'Statutory board administering the state-wide Madhyamik Pariksha (Secondary Examination) across schools in West Bengal.'
  },
  {
    id: 'upmsp',
    name: 'Uttar Pradesh Madhyamik Shiksha Parishad',
    shortName: 'UP Board (UPMSP)',
    category: 'state_board',
    categoryLabel: 'State Board of Uttar Pradesh',
    state: 'Uttar Pradesh',
    headquarters: '9, Sarojini Naidu Marg, Civil Lines, Prayagraj, Uttar Pradesh 211001',
    officialWebsite: 'https://upmsp.edu.in',
    icon: '🏛️',
    isPopular: true,
    standards: ['Class 10 (High School)', 'Class 12 (Intermediate)'],
    blueprintPattern: '70-Mark Written (20 OMR MCQs + 50 Descriptive) for 10th; 100-Mark Theory/Practical for 12th',
    evaluationScheme: '70% Written + 30% Internal Assessment (Class 10) / 70% Theory + 30% Practical (Class 12)',
    description: 'One of the world’s largest educational examining bodies, conducting High School and Intermediate examinations for millions of students.'
  },
  {
    id: 'msbshse',
    name: 'Maharashtra State Board of Secondary and Higher Secondary Education',
    shortName: 'Maharashtra Board (MSBSHSE)',
    category: 'state_board',
    categoryLabel: 'State Board of Maharashtra',
    state: 'Maharashtra',
    headquarters: 'Survey No. 83, Shaniwar Peth, Pune, Maharashtra 411030',
    officialWebsite: 'https://mahahsscboard.in',
    icon: '🏛️',
    isPopular: true,
    standards: ['Class 10 (SSC)', 'Class 12 (HSC)'],
    blueprintPattern: '80-Mark (Class 10) / 70-Mark (Class 12 Science) with Section A (Objective), B (Short), C (Short II), D (Long)',
    evaluationScheme: '80 Theory + 20 Internal / 70 Theory + 30 Practical (35% minimum passing threshold)',
    description: 'Autonomous body established under Maharashtra Act No. 41 of 1965 conducting SSC and HSC examinations across 9 divisional boards.'
  },
  {
    id: 'kseab',
    name: 'Karnataka School Examination and Assessment Board',
    shortName: 'Karnataka KSEAB (SSLC & 2nd PUC)',
    category: 'state_board',
    categoryLabel: 'State Board of Karnataka',
    state: 'Karnataka',
    headquarters: '6th Cross, Malleshwaram, Bengaluru, Karnataka 560003',
    officialWebsite: 'https://kseab.karnataka.gov.in',
    icon: '🏛️',
    isPopular: true,
    standards: ['Class 10 (SSLC)', 'Class 12 (2nd PUC)'],
    blueprintPattern: '80-Mark Theory (20 Multiple Choice Questions + 60 Descriptive Answer Marks)',
    evaluationScheme: '80% Board Examination + 20% Continuous Comprehensive Internal Assessment (35% pass marks)',
    description: 'Premier assessment board of Karnataka conducting 3 annual examinations for SSLC and 2nd PUC with standardized student evaluation.'
  },
  {
    id: 'bseb',
    name: 'Bihar School Examination Board',
    shortName: 'Bihar Board (BSEB)',
    category: 'state_board',
    categoryLabel: 'State Board of Bihar',
    state: 'Bihar',
    headquarters: 'Sinha Library Road, Patna, Bihar 800017',
    officialWebsite: 'https://biharboardonline.bihar.gov.in',
    icon: '🏛️',
    isPopular: true,
    standards: ['Class 10 (Matric)', 'Class 12 (Inter)'],
    blueprintPattern: '50% OMR Objective Questions (100 MCQs to attempt 50) + 50% Short & Long Descriptive Questions',
    evaluationScheme: '50% OMR Scoring + 50% Subjective Written Evaluation (30% Minimum Passing Criteria)',
    description: 'Statutory board under Section 3 of Bihar School Examination Board Act 1952, pioneer of the 50% OMR objective examination pattern.'
  },
  {
    id: 'tnbse',
    name: 'Tamil Nadu Directorate of Government Examinations',
    shortName: 'Tamil Nadu State Board (SSLC & HSE)',
    category: 'state_board',
    categoryLabel: 'State Board of Tamil Nadu',
    state: 'Tamil Nadu',
    headquarters: 'DPI Complex, College Road, Nungambakkam, Chennai 600006',
    officialWebsite: 'https://dge.tn.gov.in',
    icon: '🏛️',
    isPopular: false,
    standards: ['Class 10 (SSLC)', 'Class 12 (HSE +2)'],
    blueprintPattern: '90-Mark Written (Class 12) / 100-Mark (Class 10) with 1M, 2M, 3M, and 5M Questions',
    evaluationScheme: '70 Theory + 20 Practical + 10 Internal (Science) / 90 Theory + 10 Internal (Pass marks 35/100)',
    description: 'Administers the high-enrollment Secondary School Leaving Certificate (SSLC) and Higher Secondary (+2) examinations in Tamil Nadu.'
  },
  {
    id: 'rbse',
    name: 'Board of Secondary Education, Rajasthan',
    shortName: 'Rajasthan Board (RBSE / BSER)',
    category: 'state_board',
    categoryLabel: 'State Board of Rajasthan',
    state: 'Rajasthan',
    headquarters: 'Jaipur Road, Civil Lines, Ajmer, Rajasthan 305001',
    officialWebsite: 'https://rajeduboard.rajasthan.gov.in',
    icon: '🏛️',
    isPopular: false,
    standards: ['Class 10 (Secondary)', 'Class 12 (Senior Secondary)'],
    blueprintPattern: '80-Mark Theory (Section A Objective + Section B Short + Section C Long + Section D Essay)',
    evaluationScheme: '80 Marks External Written Exam + 20 Sessional Marks (33% mandatory passing in each subject)',
    description: 'Conducted under Rajasthan Secondary Education Act 1957, overseeing school curriculum and annual examinations in Rajasthan.'
  },
  {
    id: 'gseb',
    name: 'Gujarat Secondary and Higher Secondary Education Board',
    shortName: 'Gujarat Board (GSEB)',
    category: 'state_board',
    categoryLabel: 'State Board of Gujarat',
    state: 'Gujarat',
    headquarters: 'Sector 10B, Near Old Sachivalaya, Gandhinagar, Gujarat 382010',
    officialWebsite: 'https://gseb.org',
    icon: '🏛️',
    isPopular: false,
    standards: ['Class 10 (SSC)', 'Class 12 (HSC General & Science)'],
    blueprintPattern: 'Part A (50 MCQs on OMR sheet) + Part B (50 Marks Descriptive Written Exam)',
    evaluationScheme: '50% OMR Objective + 50% Descriptive Written (33% passing rule with grace provisions)',
    description: 'Administers SSC and HSC examinations across Gujarat with bipartite objective OMR and subjective evaluation.'
  },

  // =========================================================================
  // 2. NATIONAL ENTRANCE COMMISSIONS & TESTING BODIES
  // =========================================================================
  {
    id: 'nta',
    name: 'National Testing Agency',
    shortName: 'NTA (JEE Main / NEET)',
    category: 'entrance_commission',
    categoryLabel: 'National Testing Agency',
    state: 'Pan-India',
    headquarters: 'First Floor, NSIC-MDBP Building, Okhla Industrial Estate, New Delhi 110020',
    officialWebsite: 'https://nta.ac.in',
    icon: '⚡',
    isPopular: true,
    standards: ['JEE Main (Engineering)', 'NEET-UG (Medical)'],
    blueprintPattern: '300-Mark Computer Based Test (20 MCQs + 5 Numerical Answer Type per subject with +4 / -1)',
    evaluationScheme: 'Percentile Normalization across Multi-Shift CBT Sessions',
    description: 'Premier autonomous testing organization under Dept of Higher Education, conducting national admission tests for IITs/NITs and medical colleges.'
  },
  {
    id: 'gate_iit',
    name: 'GATE Organising Institute (IIT Madras / IIT Consortium)',
    shortName: 'GATE 2027 (IIT Madras)',
    category: 'entrance_commission',
    categoryLabel: 'National Postgraduate Entrance',
    state: 'Pan-India',
    headquarters: 'GATE Office, Indian Institute of Technology Madras, Chennai 600036',
    officialWebsite: 'https://gate2027.iitm.ac.in',
    icon: '🎓',
    isPopular: true,
    standards: ['GATE CS & IT', 'GATE Data Science & AI'],
    blueprintPattern: '100-Mark 3-Hour CBT (15M General Aptitude + 13M Engineering Maths + 72M Technical Subject)',
    evaluationScheme: 'MCQ (Negative 1/3, 2/3), MSQ (No negative), NAT (Numerical entry) with raw score normalization',
    description: 'Administered jointly by IISc Bengaluru and 7 IITs on behalf of National Coordination Board (NCB)-GATE, Ministry of Education.'
  },
  {
    id: 'ssc',
    name: 'Staff Selection Commission',
    shortName: 'SSC (CGL / CHSL)',
    category: 'entrance_commission',
    categoryLabel: 'Central Recruitment Commission',
    state: 'Pan-India',
    headquarters: 'Block No-12, CGO Complex, Lodhi Road, New Delhi 110003',
    officialWebsite: 'https://ssc.gov.in',
    icon: '🎯',
    isPopular: true,
    standards: ['Tier-1 (Combined Graduate Level)', 'Tier-2 (Specialized Paper)'],
    blueprintPattern: '200-Mark Tier-1 CBT (100 Questions: Quant, Reasoning, English, General Awareness with +2 / -0.50)',
    evaluationScheme: 'Equi-percentile score equating and sectional cutoff ranking',
    description: 'Recruitment body under Dept of Personnel and Training (DoPT) selecting officers for Ministries and Departments of Government of India.'
  }
];

export const getBoardById = (id: string): EducationBoardMeta => {
  return ALL_EDUCATION_BOARDS.find(b => b.id === id) || ALL_EDUCATION_BOARDS[0];
};

export const getBoardsByCategory = (category: string): EducationBoardMeta[] => {
  if (category === 'all') return ALL_EDUCATION_BOARDS;
  return ALL_EDUCATION_BOARDS.filter(b => b.category === category);
};

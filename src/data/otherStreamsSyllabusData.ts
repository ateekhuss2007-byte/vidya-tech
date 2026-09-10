/**
 * VIDYA AI - Multi-Stream Syllabus, PYQ & Exam Intelligence Master Database
 * Full Coverage for CBSE Class 10, CBSE Class 12, SSC CGL, NTA JEE Main, GATE 2027, and BCA/MCA.
 */

export interface StreamSubject {
  id: string;
  name: string;
  code?: string;
  category: string;
  weightage: string;
  modules: string[];
  hardestModule: string;
  passTips: string;
}

export interface StreamPYQ {
  id: string;
  subject: string;
  question: string;
  marks: number;
  frequency: string;
  expectedAnswerFormat: string;
}

export interface StreamFormula {
  topic: string;
  formula: string;
}

export interface StreamStrategy {
  week: string;
  focus: string;
}

export interface StreamExamData {
  id: string;
  title: string;
  boardOrAuthority: string;
  standard: string;
  patternName: string;
  totalMarks: number;
  durationMinutes: number;
  difficultyRating: string;
  passingThreshold: string;
  summary: string;
  subjects: StreamSubject[];
  topRepeatedPYQs: StreamPYQ[];
  formulaMatrix: StreamFormula[];
  thirtyDayPassStrategy: StreamStrategy[];
}

export const OTHER_STREAMS_DATA: Record<string, StreamExamData> = {
  // =========================================================================
  // 1. CBSE CLASS 10 BOARD
  // =========================================================================
  cbse_10: {
    id: 'cbse_10',
    title: 'CBSE Class 10 Board Examination',
    boardOrAuthority: 'Central Board of Secondary Education (CBSE)',
    standard: 'Class 10th Secondary',
    patternName: 'CBSE 80-Mark Board Pattern (20 MCQs + VSA + SA + LA + Case Studies)',
    totalMarks: 80,
    durationMinutes: 180,
    difficultyRating: 'Moderate (High Competency Focus)',
    passingThreshold: '33% (27/80 in Theory + Internal Assessment)',
    summary: 'Complete official Class 10 syllabus covering Standard & Basic Mathematics, Integrated Science (Physics, Chemistry, Biology), Social Science, and English with step-marking rubrics.',
    subjects: [
      {
        id: 'math10',
        name: 'Mathematics (Standard / Basic)',
        code: 'CBSE-041 / 241',
        category: 'Core Numerical',
        weightage: '80 Marks Theory + 20 Marks Internal',
        modules: [
          'Real Numbers: Fundamental Theorem of Arithmetic, Proof of Irrationality (√2, √3, √5)',
          'Polynomials: Relationship between Zeroes and Coefficients of Quadratic Polynomials',
          'Linear Equations in Two Variables: Graphical Method, Substitution & Elimination',
          'Quadratic Equations: Factorization & Quadratic Formula (D = b² - 4ac, Nature of Roots)',
          'Arithmetic Progressions (AP): nth term (a_n = a + (n-1)d) & Sum of first n terms (S_n)',
          'Triangles: Basic Proportionality Theorem (Thales Theorem) Proof & Applications',
          'Coordinate Geometry: Distance Formula, Section Formula & Coordinates of Centroid',
          'Introduction to Trigonometry: Values at 0°, 30°, 45°, 60°, 90° & Identity sin²θ + cos²θ = 1',
          'Applications of Trigonometry: Heights & Distances (Angles of Elevation & Depression)',
          'Circles: Tangent at any point is perpendicular to radius, Length of tangents from external point',
          'Surface Areas & Volumes: Combination of Solids (Cone, Cylinder, Sphere, Hemisphere)',
          'Statistics & Probability: Mean (Direct & Step-Deviation), Median, Mode & Single Event Probability'
        ],
        hardestModule: 'Triangles (Thales Theorem Rider Proofs) & Trigonometry Heights/Distances',
        passTips: 'Thales Theorem proof comes almost every year for 5 marks. Master Quadratic Formula, AP sum formula, and Statistics Mean/Median formulas to easily secure 45+ marks.'
      },
      {
        id: 'sci10',
        name: 'Science (Physics, Chemistry & Biology)',
        code: 'CBSE-086',
        category: 'Core Science',
        weightage: '80 Marks Theory + 20 Marks Practical',
        modules: [
          'Chemical Reactions & Equations: Balancing, Types of Reactions (Combination, Decomposition, Redox)',
          'Acids, Bases and Salts: pH scale applications in daily life, Bleaching Powder, Baking Soda, Plaster of Paris',
          'Metals and Non-metals: Reactivity series, Ionic bond properties, Metallurgy basics',
          'Carbon and Its Compounds: Covalent bonding, Homologous series, Saponification & Esterification',
          'Life Processes: Nutrition in human beings, Aerobic vs Anaerobic Respiration, Double Circulation in Heart, Excretion in Nephron',
          'Control and Coordination: Reflex Arc, Human Brain parts, Plant Hormones (Auxin, Cytokinin)',
          'How do Organisms Reproduce?: Asexual modes, Structure of Flower, Male & Female Human Reproductive System',
          'Heredity and Evolution: Mendel Monohybrid (3:1) & Dihybrid Cross (9:3:3:1), Sex determination in humans',
          'Light: Reflection & Refraction: Mirror formula, Lens formula, Ray diagrams of Concave Mirror & Convex Lens, Power of Lens',
          'The Human Eye and Colourful World: Defects of Vision (Myopia & Hypermetropia correction), Dispersion, Atmospheric Refraction',
          'Electricity: Ohm’s Law (V = IR), Series & Parallel resistors, Joule’s Law of Heating, Electric Power',
          'Magnetic Effects of Electric Current: Right-Hand Thumb Rule, Fleming’s Left-Hand Rule, Solenoid magnetic field'
        ],
        hardestModule: 'Carbon and its Compounds (Isomerism & Reactions) & Light Ray Diagrams',
        passTips: 'Practice labeled diagrams of Human Heart, Nephron, Human Eye, and Convex Lens ray diagrams. Balancing chemical equations and Ohm’s law numericals guarantee 30+ marks.'
      },
      {
        id: 'sst10',
        name: 'Social Science',
        code: 'CBSE-087',
        category: 'Humanities & Social Studies',
        weightage: '80 Marks Theory + 20 Marks Project',
        modules: [
          'History: The Rise of Nationalism in Europe & Nationalism in India (Non-Cooperation & Civil Disobedience)',
          'History: The Making of a Global World & Print Culture and Modern World',
          'Geography: Resources and Development, Forest & Wildlife Resources, Water Resources (Dams)',
          'Geography: Agriculture (Cropping Seasons, Rice/Wheat conditions) & Minerals and Energy Resources',
          'Political Science: Power Sharing (Belgium vs Sri Lanka model) & Federalism in India',
          'Political Science: Gender, Religion and Caste & Political Parties (Functions & National Parties)',
          'Economics: Development (Per Capita Income, HDI) & Sectors of the Indian Economy (Primary, Secondary, Tertiary)',
          'Economics: Money and Credit (Formal vs Informal credit) & Globalization and the Indian Economy'
        ],
        hardestModule: 'Nationalism in Europe timeline & Geography Map Pointing',
        passTips: 'Focus on 5-mark recurring questions: Power sharing benefits in Belgium, Non-Cooperation movement causes, and Formal credit advantages over informal sources.'
      },
      {
        id: 'eng10',
        name: 'English Language & Literature',
        code: 'CBSE-184',
        category: 'Language & Communication',
        weightage: '80 Marks Theory + 20 Marks ASL',
        modules: [
          'Section A: Reading Skills (Discursive & Factual Unseen Passages - 20 Marks)',
          'Section B: Writing Skills (Formal Letter to Editor/Complaint & Analytical Paragraph - 10 Marks)',
          'Section B: Grammar (Tenses, Modals, Subject-Verb Concord, Reported Speech - 10 Marks)',
          'Section C: Literature (First Flight: Letter to God, Nelson Mandela, Two Stories about Flying, From the Diary of Anne Frank)',
          'Section C: Literature (First Flight: Glimpses of India, Madam Rides the Bus, The Sermon at Benares, The Proposal)',
          'Section C: Poems (Dust of Snow, Fire and Ice, A Tiger in the Zoo, The Ball Poem, Amanda!, Fog, The Trees)',
          'Section C: Footprints without Feet (A Triumph of Surgery, The Thief’s Story, The Midnight Visitor, A Question of Trust, Footprints without Feet, The Making of a Scientist, The Necklace, Bholi)'
        ],
        hardestModule: 'Reported Speech conversions & Analytical Paragraph structuring',
        passTips: 'Maintain neat handwriting and stick to the 100-120 word limit in writing sections. Quote exact character traits for Nelson Mandela, Lencho, and Bholi.'
      }
    ],
    topRepeatedPYQs: [
      {
        id: 'c10_pyq_1',
        subject: 'Mathematics',
        question: 'State and prove Basic Proportionality Theorem (Thales Theorem). If a line is drawn parallel to one side of a triangle intersecting other two sides, prove that it divides the two sides in the same ratio.',
        marks: 5,
        frequency: 'Asked in CBSE 2024, 2023, 2022, 2020, 2019',
        expectedAnswerFormat: 'Given, To Prove, Construction (draw perpendiculars and join vertices), Area ratio equations, Final ratio equality.'
      },
      {
        id: 'c10_pyq_2',
        subject: 'Science (Physics)',
        question: 'An object 4 cm in size is placed at 25 cm in front of a concave mirror of focal length 15 cm. At what distance from the mirror should a screen be placed in order to obtain a sharp image? Find the nature and the size of the image.',
        marks: 5,
        frequency: 'Asked in CBSE 2024, 2023, 2021',
        expectedAnswerFormat: 'Mirror formula 1/f = 1/v + 1/u with sign convention (u = -25cm, f = -15cm), v = -37.5 cm, magnification m = -v/u = h\'/h, image height = -6 cm (Real & Inverted).'
      },
      {
        id: 'c10_pyq_3',
        subject: 'Science (Biology)',
        question: 'Draw a neat diagram of the Human Alimentary Canal and label: (i) Gall Bladder, (ii) Pancreas, (iii) Small Intestine. Explain the role of Bile juice and Pancreatic enzymes in digestion.',
        marks: 5,
        frequency: 'Asked in CBSE 2023, 2022, 2020',
        expectedAnswerFormat: 'Neat labeled diagram, Emulsification of fats by bile salts, Action of Trypsin (proteins) and Lipase (emulsified fats).'
      },
      {
        id: 'c10_pyq_4',
        subject: 'Science (Chemistry)',
        question: 'What happens when Plaster of Paris is mixed with water? Write the chemical equation. Why is it stored in a moisture-proof container?',
        marks: 3,
        frequency: 'Asked in CBSE 2024, 2022, 2019',
        expectedAnswerFormat: 'CaSO4·1/2H2O + 1.5 H2O -> CaSO4·2H2O (Gypsum hard solid mass). Moisture turns it into hard gypsum.'
      }
    ],
    formulaMatrix: [
      { topic: 'Quadratic Equations', formula: 'x = (-b ± √(b² - 4ac)) / (2a); Discriminant D = b² - 4ac (D > 0: Real & Distinct, D = 0: Real & Equal, D < 0: No Real Roots)' },
      { topic: 'Arithmetic Progression', formula: 'a_n = a + (n - 1)d; S_n = (n / 2) [2a + (n - 1)d] = (n / 2) [a + l]' },
      { topic: 'Coordinate Geometry', formula: 'Distance = √((x₂ - x₁)² + (y₂ - y₁)²); Section Formula: ((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂))' },
      { topic: 'Trigonometry', formula: 'sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ; 1 + cot²θ = cosec²θ; tanθ = sinθ / cosθ' },
      { topic: 'Light Reflection & Refraction', formula: 'Mirror: 1/f = 1/v + 1/u; Lens: 1/f = 1/v - 1/u; Power P = 1 / f(in meters) Dioptres; Magnification m = -v/u (mirror) = +v/u (lens)' },
      { topic: 'Electricity & Ohm’s Law', formula: 'V = I · R; R = ρ(L / A); Series: R_eq = R₁ + R₂ + R₃; Parallel: 1/R_eq = 1/R₁ + 1/R₂; H = I²Rt = VIt' }
    ],
    thirtyDayPassStrategy: [
      { week: 'Week 1 (Foundations)', focus: 'Complete Real Numbers, Polynomials, Chemical Reactions, and Life Processes diagrams. Lock 20 marks.' },
      { week: 'Week 2 (High-Yield Theorems)', focus: 'Master Thales Theorem, Quadratic formula, Light ray diagrams, and Ohm’s law numericals. Lock 45 marks.' },
      { week: 'Week 3 (Board Numericals)', focus: 'Solve Electricity numericals, Trigonometry heights & distances, and Carbon compounds reactions. Reach 65+ marks.' },
      { week: 'Week 4 (Full Model Papers)', focus: 'Solve 3 complete CBSE 80-mark sample papers within 3 hours timer with step-by-step marking rubrics.' }
    ]
  },

  // =========================================================================
  // 2. CBSE CLASS 12 BOARD
  // =========================================================================
  cbse_12: {
    id: 'cbse_12',
    title: 'CBSE Class 12 Senior Secondary Board',
    boardOrAuthority: 'Central Board of Secondary Education (CBSE / ISC / State)',
    standard: 'Class 12th Senior Secondary',
    patternName: 'CBSE Official 80/70-Mark Pattern (MCQ, VSA, SA, LA & Case-Based Rubrics)',
    totalMarks: 80,
    durationMinutes: 180,
    difficultyRating: 'Rigorous (Derivation & Conceptual Reasoning)',
    passingThreshold: '33% in Theory & Practical Individually',
    summary: 'Comprehensive curriculum for Class 12 Science (PCM/B) & Computer Science, aligned with official step-by-step CBSE marking schemes.',
    subjects: [
      {
        id: 'math12',
        name: 'Mathematics',
        code: 'CBSE-041',
        category: 'Core Mathematics',
        weightage: '80 Marks Theory + 20 Marks Internal',
        modules: [
          'Relations and Functions: Reflexive, Symmetric, Transitive, Equivalence & Invertible Functions',
          'Inverse Trigonometric Functions: Domain, Range & Principal Value Branches',
          'Matrices & Determinants: Inverse by Adjoint, Solving Linear Systems via Matrix Method (AX = B)',
          'Continuity and Differentiability: Chain Rule, Logarithmic Differentiation, Parametric Equations',
          'Applications of Derivatives: Rate of Change, Increasing/Decreasing, Maxima and Minima (First & Second Derivative Tests)',
          'Integrals: Integration by Substitution, Partial Fractions, Parts (ILATE), Properties of Definite Integrals',
          'Applications of the Integrals: Area under Simple Curves (Parabolas, Ellipses, Lines)',
          'Differential Equations: Order & Degree, Variable Separable, Homogeneous, Linear Differential Equations (dy/dx + Py = Q)',
          'Vectors: Dot Product (a · b = |a||b|cosθ), Cross Product, Projection of a Vector on a Line',
          'Three-Dimensional Geometry: Direction Cosines & Ratios, Equation of Line, Shortest Distance between Skew Lines',
          'Linear Programming: Graphical Method for Feasible Region, Corner Point Method for Max/Min Z',
          'Probability: Conditional Probability, Multiplication Theorem, Bayes’ Theorem & Total Probability'
        ],
        hardestModule: 'Calculus Definite Integrals Properties & 3D Geometry Skew Lines',
        passTips: 'Matrix Inversion Method (AX=B) gives an assured 5-mark question. Bayes Theorem (5M) and Shortest Distance between Skew Lines (5M) are guaranteed scoring opportunities.'
      },
      {
        id: 'phys12',
        name: 'Physics',
        code: 'CBSE-042',
        category: 'Core Science',
        weightage: '70 Marks Theory + 30 Marks Practical',
        modules: [
          'Electrostatics: Coulomb’s Law, Electric Field Dipole on Axial & Equatorial lines, Gauss’s Law & 3 Applications',
          'Electrostatic Potential & Capacitance: Potential due to Dipole, Parallel Plate Capacitor with Dielectric slab',
          'Current Electricity: Drift velocity derivation (I = n e A v_d), Kirchhoff’s Rules, Wheatstone Bridge condition',
          'Moving Charges and Magnetism: Biot-Savart Law, Ampere’s Circuital Law, Force between two parallel current-carrying wires',
          'Magnetism and Matter: Magnetic dipole moment, Earth’s magnetism, Dia/Para/Ferromagnetic properties',
          'Electromagnetic Induction (EMI): Faraday’s Laws, Lenz’s Law, Mutual and Self-Inductance derivations',
          'Alternating Current: LCR Series Circuit Phasor diagram, Resonance frequency, Power factor, Transformer working & losses',
          'Electromagnetic Waves: Displacement current, Electromagnetic Spectrum order & applications',
          'Ray Optics: Refraction at spherical surfaces, Lens Maker’s Formula derivation, Astronomical Telescope & Compound Microscope',
          'Wave Optics: Huygens’ Principle proof of Reflection & Refraction, Young’s Double Slit Experiment (YDSE) fringe width',
          'Dual Nature of Radiation and Matter: Photoelectric effect Einstein’s equation, de-Broglie wavelength',
          'Atoms & Nuclei: Rutherford model, Bohr’s hydrogen postulates & energy levels, Nuclear binding energy curve & mass defect',
          'Semiconductor Electronics: Energy bands, p-n junction diode forward/reverse bias, Half-Wave & Full-Wave Rectifiers'
        ],
        hardestModule: 'Ray Optics (Lens Maker’s Derivation) & AC LCR Resonance Phasors',
        passTips: 'Derivations carry 25+ marks in CBSE Class 12 Physics. Master Gauss Law applications, Lens Maker’s Formula, LCR resonance, and Rectifier working diagrams.'
      },
      {
        id: 'chem12',
        name: 'Chemistry',
        code: 'CBSE-043',
        category: 'Core Science',
        weightage: '70 Marks Theory + 30 Marks Practical',
        modules: [
          'Solutions: Raoult’s Law, Colligative properties (Elevation in Boiling Point, Depression in Freezing Point, Osmotic Pressure), Van’t Hoff Factor',
          'Electrochemistry: Nernst Equation & EMF calculation, Kohlrausch’s Law, Fuel Cells & Lead Storage Battery, Corrosion',
          'Chemical Kinetics: Rate law, Order vs Molecularity, Integrated Rate equation for Zero and First order reactions, Arrhenius Equation',
          'd- and f-Block Elements: Electronic configuration, Variable oxidation states, Lanthanoid contraction causes & consequences, K2Cr2O7 & KMnO4 preparations',
          'Coordination Compounds: Werner’s theory, IUPAC nomenclature, Valence Bond Theory (inner/outer orbital complexes), Crystal Field Theory (CFT) splitting in octahedral/tetrahedral',
          'Haloalkanes and Haloarenes: SN1 vs SN2 mechanism comparison, Optical rotation, Electrophilic substitution reactions of Chlorobenzene',
          'Alcohols, Phenols and Ethers: Hydroboration-oxidation, Kolbe’s Reaction, Reimer-Tiemann Reaction, Williamson Ether Synthesis',
          'Aldehydes, Ketones and Carboxylic Acids: Nucleophilic addition mechanism, Aldol Condensation, Cannizzaro Reaction, Tollens & Fehling Tests',
          'Amines: Gabriel Phthalimide synthesis, Hoffmann Bromamide degradation, Carbylamine test, Diazonium salt reactions',
          'Biomolecules: Monosaccharides (Glucose structures, D/L configuration), Peptide bond, Protein denaturation, DNA vs RNA structure'
        ],
        hardestModule: 'Organic Reaction Mechanisms (Aldol, Cannizzaro, Reimer-Tiemann) & Coordination CFT Splitting',
        passTips: 'Named organic reactions (Aldol, Cannizzaro, Hoffmann Bromamide) and conversions appear in every paper. Physical chemistry numericals on Nernst equation and First-order kinetics give full marks.'
      },
      {
        id: 'cs12',
        name: 'Computer Science (Python & SQL)',
        code: 'CBSE-083',
        category: 'Information & Tech',
        weightage: '70 Marks Theory + 30 Marks Practical',
        modules: [
          'Computational Thinking & Programming: Functions (scope, parameters), Exception Handling (try-except-finally)',
          'File Handling in Python: Text files (.read, .readline, .write), Binary files (pickle.dump, pickle.load), CSV files (csv.reader, csv.writer)',
          'Data Structures: Stack implementation using Python list (Push, Pop, Peek, Display operations)',
          'Computer Networks: Evolution of networking, Transmission media, Topologies (Star, Bus, Ring), IP vs MAC addresses, Network devices (Hub, Switch, Router, Gateway), Cyber Safety',
          'Database Management (SQL): DDL & DML commands, Aggregate functions (COUNT, SUM, AVG, MIN, MAX), GROUP BY & HAVING clause, Joins (Equi Join & Natural Join)'
        ],
        hardestModule: 'Binary & CSV File Handling using pickle/csv & SQL Group By with Joins',
        passTips: 'Stack push/pop algorithm in Python is an assured 3-mark question. Practice 5 SQL query questions with aggregate functions and joins.'
      }
    ],
    topRepeatedPYQs: [
      {
        id: 'c12_pyq_1',
        subject: 'Mathematics',
        question: 'Solve the system of linear equations using matrix method:\n2x + 3y + 3z = 5\nx - 2y + z = -4\n3x - y - 2z = 3',
        marks: 5,
        frequency: 'Asked in CBSE 2024, 2023, 2022, 2020, 2018',
        expectedAnswerFormat: 'AX = B format, calculate |A| (non-zero test), find cofactor matrix, Adj(A), A⁻¹ = (1/|A|)Adj(A), X = A⁻¹B, final values x=1, y=2, z=-1.'
      },
      {
        id: 'c12_pyq_2',
        subject: 'Physics',
        question: 'Derive the Lens Maker’s formula (1/f = (μ - 1)(1/R₁ - 1/R₂)) for a thin double convex lens having radii of curvature R₁ and R₂.',
        marks: 5,
        frequency: 'Asked in CBSE 2024, 2023, 2021, 2019',
        expectedAnswerFormat: 'Ray diagram showing refraction at first and second spherical surfaces, surface refraction formulas μ₂/v - μ₁/u = (μ₂ - μ₁)/R, adding two equations for thin lens.'
      },
      {
        id: 'c12_pyq_3',
        subject: 'Chemistry',
        question: 'An organic compound (A) with molecular formula C8H8O forms an orange-red precipitate with 2,4-DNP reagent and gives yellow precipitate on heating with iodine in the presence of sodium hydroxide. It neither reduces Tollens’ nor Fehling’s reagent, nor does it decolourise bromine water or Baeyer’s reagent. On drastic oxidation with chromic acid, it gives a carboxylic acid (B) having molecular formula C7H6O2. Identify (A) and (B) and write the reactions involved.',
        marks: 5,
        frequency: 'Asked in CBSE 2023, 2022, 2020',
        expectedAnswerFormat: '(A) is Acetophenone (C6H5COCH3), (B) is Benzoic acid (C6H5COOH). Reactions: 2,4-DNP test, Iodoform reaction producing CHI3 yellow ppt, Oxidation reaction.'
      }
    ],
    formulaMatrix: [
      { topic: 'Electrostatics', formula: 'F = (1 / 4πε₀) (q₁q₂ / r²); Gauss Law: ∮ E · dA = q_enclosed / ε₀; E_axial = 2kp / r³; E_equatorial = kp / r³; C = ε₀A / d' },
      { topic: 'Current & Magnetism', formula: 'I = n e A v_d; Biot-Savart: dB = (μ₀ / 4π) (I dl sinθ / r²); Force: F / L = (μ₀ / 2π) (I₁I₂ / d)' },
      { topic: 'Optics & AC', formula: 'Lens Maker: 1/f = (μ - 1)(1/R₁ - 1/R₂); YDSE Fringe Width: β = λD / d; AC Resonance: ω₀ = 1 / √(LC); Impedance: Z = √(R² + (X_L - X_C)²)' },
      { topic: 'Calculus', formula: '∫ u v dx = u ∫ v dx - ∫ [u\' ∫ v dx] dx; ∫ 1/(x² + a²) dx = (1/a) tan⁻¹(x/a); Area = ∫ |y₁ - y₂| dx' },
      { topic: '3D Geometry', formula: 'Shortest Distance d = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂|; Angle cosθ = (a₁a₂ + b₁b₂ + c₁c₂) / (√(a₁² + b₁² + c₁²) √(a₂² + b₂² + c₂²))' },
      { topic: 'Physical Chemistry', formula: 'Nernst: E_cell = E°_cell - (0.0591 / n) log Q; Raoult’s: (P° - P) / P° = i · x_solute; First Order: k = (2.303 / t) log([A]₀ / [A]); t₁/₂ = 0.693 / k' }
    ],
    thirtyDayPassStrategy: [
      { week: 'Week 1 (Derivations & Matrices)', focus: 'Complete Matrix Inversion method, Gauss law proofs, and Nernst equation numericals. Score baseline: 25M.' },
      { week: 'Week 2 (Calculus & Named Reactions)', focus: 'Master Definite Integral properties, Shortest distance in 3D, and Organic named reactions (Aldol, Cannizzaro). Score: 50M.' },
      { week: 'Week 3 (Optics, AC & Coordination)', focus: 'Practice Lens Maker derivation, YDSE proofs, LCR circuits, and CFT splitting. Score: 70M+.' },
      { week: 'Week 4 (CBSE Official Sample Papers)', focus: 'Write 3 timed CBSE official sample papers following step-marking rubrics.' }
    ]
  },

  // =========================================================================
  // 3. SSC CGL (TIER-1 & TIER-2)
  // =========================================================================
  ssc_cgl: {
    id: 'ssc_cgl',
    title: 'SSC CGL (Staff Selection Commission Combined Graduate Level)',
    boardOrAuthority: 'Staff Selection Commission (Govt. of India)',
    standard: 'Central Govt Group B & C Gazetted/Non-Gazetted Posts',
    patternName: 'SSC CGL Official Tier-1 (100 Questions, 200 Marks, 60 Minutes, -0.50 Negative)',
    totalMarks: 200,
    durationMinutes: 60,
    difficultyRating: 'Speed & Accuracy Intensive',
    passingThreshold: 'Tier-1 Cutoff typically 135-155 / 200 depending on category',
    summary: 'Master blueprint for SSC CGL Tier-1 covering Quantitative Aptitude, General Intelligence & Reasoning, English Comprehension, and General Awareness with speed shortcuts.',
    subjects: [
      {
        id: 'ssc_quant',
        name: 'Quantitative Aptitude',
        category: 'Mathematical Ability',
        weightage: '25 Questions = 50 Marks (+2 / -0.50)',
        modules: [
          'Arithmetic: Percentage (Successive percentages, Fraction to % values), Profit & Loss, Discount, Dishonest Shopkeeper',
          'Simple Interest & Compound Interest: 2-year & 3-year CI-SI difference shortcuts, Installments',
          'Ratio, Proportion & Partnership: Cross-multiplication method, Age problems, Mixtures & Alligation',
          'Time and Work: Unit efficiency method, Pipes and Cisterns, Alternate day work',
          'Speed, Time and Distance: Relative speed, Train crossing problems, Boats and Streams, Circular tracks',
          'Number System: Divisibility rules (7, 11, 13, 72, 88), Unit digit, Remainder theorem, LCM & HCF',
          'Algebra: Identities (a³ + b³ + c³ - 3abc = 0 when a+b+c=0), x + 1/x value shifting',
          'Geometry: Triangle centers (Incenter, Circumcenter, Orthocenter), Similar triangles, Circles (Chords & Secants theorem)',
          'Mensuration 2D & 3D: Area, Perimeter, Volume, TSA/CSA of Cylinder, Cone, Sphere, Frustum',
          'Trigonometry: Standard values, Maximum & Minimum values of a sinθ + b cosθ, Heights and Distances',
          'Data Interpretation: Bar graph, Pie chart, Line graph, Histogram tables'
        ],
        hardestModule: 'Geometry (Circle Tangent Theorems) & Algebra (x + 1/x advanced forms)',
        passTips: 'Master arithmetic speed tricks: percentage fractions (1/6 = 16.66%, 1/7 = 14.28%, 1/8 = 12.5%) and unit-digit methods to solve questions in under 35 seconds each.'
      },
      {
        id: 'ssc_reasoning',
        name: 'General Intelligence & Reasoning',
        category: 'Logical Reasoning',
        weightage: '25 Questions = 50 Marks (+2 / -0.50)',
        modules: [
          'Analogy & Classification: Number, Letter, and Word-based analogies',
          'Series Completion: Number series (difference of difference), Alphabet series, Mixed patterns',
          'Coding-Decoding: Letter shifting, Opposite letter pairs (A-Z, B-Y, C-X), Matrix coding',
          'Syllogism: Venn diagram method (All, Some, No, Only a few condition rules)',
          'Blood Relations: Coded blood relations (A + B means A is father of B), Family tree drawing',
          'Direction and Distance: Shadow problems at sunrise/sunset, Angular rotations',
          'Order and Ranking: Total persons = Left + Right - 1, Overlapping cases',
          'Non-Verbal Reasoning: Paper folding & cutting, Mirror images, Embedded figures, Cube & Dice rotation rules'
        ],
        hardestModule: 'Only a few Syllogism cases & Missing number matrix puzzles',
        passTips: 'Reasoning is the highest scoring section. Target 45+ marks out of 50 in under 15 minutes by mastering opposite letter pairs and dice rules.'
      },
      {
        id: 'ssc_english',
        name: 'English Comprehension',
        category: 'Verbal & Language',
        weightage: '25 Questions = 50 Marks (+2 / -0.50)',
        modules: [
          'Grammar: Subject-Verb Agreement, Tenses, Prepositions, Conjunctions, Parallelism',
          'Error Spotting & Sentence Improvement: Identifying grammatical violations in 4 sentence parts',
          'Voice & Narration: Active to Passive voice transformations, Direct to Indirect speech reporting rules',
          'Vocabulary: Synonyms, Antonyms, One-Word Substitutions (OWS), 100 Most Repeated SSC Idioms & Phrases',
          'Spelling Test: Spotting correctly/incorrectly spelt words',
          'Comprehension: Cloze Test (5-blank contextual passage) & Reading Comprehension passage'
        ],
        hardestModule: 'Cloze Test preposition usage & Subject-Verb Agreement inverted sentences',
        passTips: 'Revise Golden 120 Grammar Rules (Neetu Singh / SP Bakshi). Active-Passive and Direct-Indirect give guaranteed 100% accuracy in Tier-1 & Tier-2.'
      },
      {
        id: 'ssc_gk',
        name: 'General Awareness (GK & Current Affairs)',
        category: 'General Knowledge',
        weightage: '25 Questions = 50 Marks (+2 / -0.50)',
        modules: [
          'Indian Polity & Constitution: Fundamental Rights (Art 12-35), DPSP, Preamble, Amendments (42nd, 44th, 86th, 105th), President & CAG',
          'History: Ancient (Indus Valley, Buddhism/Jainism, Mauryan, Gupta), Medieval (Delhi Sultanate, Mughals), Modern (Freedom Movement 1857-1947)',
          'Geography: Rivers and Tributaries, Mountain Passes, National Parks, Solar System, Soil types in India',
          'Economics: National Income (GDP, GNP), Inflation, RBI Monetary Policy tools (Repo, Reverse Repo), Five Year Plans',
          'General Science: Physics units & discoveries, Chemistry common names & chemical formulas, Biology human diseases & vitamins',
          'Static GK & Culture: Classical dances & artists, Festivals, Folk dances, First in India, Books & Authors, UNESCO Heritage sites',
          'Current Affairs: Last 6 months appointments, Sports tournaments, Government welfare schemes, Military exercises'
        ],
        hardestModule: 'Static GK Classical dance gharanas & Ancient History dynasties',
        passTips: 'Polity articles, Classical dances of India, and Census 2011 statistics appear in 90% of SSC shifts. Spend no more than 7 minutes on GA in the exam.'
      }
    ],
    topRepeatedPYQs: [
      {
        id: 'ssc_pyq_1',
        subject: 'Quantitative Aptitude',
        question: 'If x + 1/x = 3, find the value of x⁵ + 1/x⁵.',
        marks: 2,
        frequency: 'Repeated in SSC CGL 2024, 2023, 2022, 2020',
        expectedAnswerFormat: 'x² + 1/x² = 3² - 2 = 7; x³ + 1/x³ = 3³ - 3(3) = 18; (x² + 1/x²)(x³ + 1/x³) = x⁵ + 1/x⁵ + (x + 1/x); 7 × 18 = x⁵ + 1/x⁵ + 3; x⁵ + 1/x⁵ = 126 - 3 = 123.'
      },
      {
        id: 'ssc_pyq_2',
        subject: 'Quantitative Aptitude',
        question: 'The difference between Compound Interest and Simple Interest on a sum of money at 10% per annum for 3 years is ₹155. Find the principal sum.',
        marks: 2,
        frequency: 'Repeated in SSC CGL 2023, 2021, 2019',
        expectedAnswerFormat: 'Formula for 3-year CI - SI: Diff = P (R / 100)² [(300 + R) / 100]; 155 = P (10/100)² [310/100] = P (1/100) (31/10); P = (155 × 1000) / 31 = ₹5,000.'
      },
      {
        id: 'ssc_pyq_3',
        subject: 'General Awareness',
        question: 'Which Article of the Indian Constitution empowers the Supreme Court to issue Writs for the enforcement of Fundamental Rights?',
        marks: 2,
        frequency: 'Repeated in SSC CGL 2024, 2023, 2022, 2021',
        expectedAnswerFormat: 'Article 32 (Right to Constitutional Remedies, called "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar). High Court writ power is under Article 226.'
      }
    ],
    formulaMatrix: [
      { topic: 'Arithmetic (CI-SI Difference)', formula: '2-Year: Diff = P (R / 100)²; 3-Year: Diff = P (R / 100)² [(300 + R) / 100]' },
      { topic: 'Algebra (x + 1/x values)', formula: 'If x + 1/x = k -> x² + 1/x² = k² - 2; x³ + 1/x³ = k³ - 3k; x⁴ + 1/x⁴ = (k² - 2)² - 2; x⁵ + 1/x⁵ = (x² + 1/x²)(x³ + 1/x³) - (x + 1/x)' },
      { topic: 'Time & Work', formula: 'Total Work = LCM of days; Efficiency = Total Work / Days; M₁D₁H₁/W₁ = M₂D₂H₂/W₂' },
      { topic: 'Geometry (Circles & Tangents)', formula: 'Direct Common Tangent = √(d² - (r₁ - r₂)²); Transverse Common Tangent = √(d² - (r₁ + r₂)²); Tangent-Secant: PT² = PA × PB' },
      { topic: 'Trigonometry Max/Min', formula: 'Max value of a sinθ + b cosθ = +√(a² + b²); Min value = -√(a² + b²)' }
    ],
    thirtyDayPassStrategy: [
      { week: 'Week 1 (Quant Arithmetic & Reasoning Basics)', focus: 'Finish Percentage, Ratio, Time & Work, and Syllogism. Build speed to 25 Qs in 20 mins.' },
      { week: 'Week 2 (Advance Maths & Grammar Rules)', focus: 'Master Algebra x+1/x, Geometry circles, 120 Grammar rules, and Polity Articles 1-51A.' },
      { week: 'Week 3 (Full Sectional Sprints)', focus: 'Daily 2 Sectional Tests each of Quant and English with strict timer.' },
      { week: 'Week 4 (Full 60-Minute Mocks)', focus: 'Take 1 Full Mock Test daily at actual exam shift time. Target 150+ raw score.' }
    ]
  },

  // =========================================================================
  // 4. NTA JEE MAIN
  // =========================================================================
  jee_main: {
    id: 'jee_main',
    title: 'NTA JEE Main (National Engineering Entrance)',
    boardOrAuthority: 'National Testing Agency (NTA)',
    standard: 'All India Engineering Entrance (NITs, IIITs, GFTIs)',
    patternName: 'NTA Official 300-Mark CBT Pattern (Physics, Chem, Maths with Sec A MCQ & Sec B NAT)',
    totalMarks: 300,
    durationMinutes: 180,
    difficultyRating: 'High (Analytical Problem Solving)',
    passingThreshold: '90+ Percentile for General Category Qualifying',
    summary: 'Master blueprint for JEE Main covering 11th & 12th Physics, Chemistry, and Mathematics with high-weightage chapters and derivation links.',
    subjects: [
      {
        id: 'jee_phys',
        name: 'Physics',
        category: 'Core Physical Sciences',
        weightage: '25 Questions = 100 Marks (+4 / -1)',
        modules: [
          'Mechanics: Kinematics, Laws of Motion, Work Power Energy, Center of Mass & Collisions',
          'Rotational Motion: Moment of Inertia, Torque, Angular Momentum conservation, Rolling without slipping',
          'Thermodynamics & Kinetic Theory: First & Second Laws, Carnot Engine efficiency, PV diagrams',
          'Oscillations & Waves: Simple Harmonic Motion (SHM), Damped oscillations, Doppler Effect',
          'Electrodynamics: Gauss Law, Capacitance with dielectrics, Current Electricity (Kirchhoff & Meter bridge)',
          'Magnetism & EMI: Biot-Savart, Ampere’s Law, Faraday’s Law, AC Series LCR resonance',
          'Optics: Wave Optics (YDSE with slab), Ray optics prism formula (A + δ = i + e)',
          'Modern Physics: Photoelectric effect, de Broglie wavelength, Bohr model, Nuclear radius & binding energy',
          'Semiconductors & Experimental Physics: Logic gates, Zener diode as voltage regulator, Vernier caliper & Screw gauge errors'
        ],
        hardestModule: 'Rotational Motion (Combined Translation & Rotation) & Wave Optics YDSE',
        passTips: 'Modern Physics, Semiconductors, Current Electricity, and Thermodynamics contribute 40+ easy marks. Secure them before attempting heavy mechanics.'
      },
      {
        id: 'jee_chem',
        name: 'Chemistry',
        category: 'Chemical Sciences',
        weightage: '25 Questions = 100 Marks (+4 / -1)',
        modules: [
          'Physical Chemistry: Mole concept, Atomic structure (Quantum numbers & Bohr radius), Thermodynamics (ΔG = ΔH - TΔS), Chemical & Ionic Equilibrium (pH, Buffer, Ksp)',
          'Physical Chemistry: Electrochemistry (Nernst equation & Faraday laws), Chemical Kinetics (Arrhenius equation & first order kinetics)',
          'Inorganic Chemistry: Periodic Table & periodicity, Chemical Bonding (VSEPR, Hybridization, Molecular Orbital Theory bond order)',
          'Inorganic Chemistry: Coordination Chemistry (IUPAC, Isomerism, CFT crystal field splitting, magnetic moments), d- and f-block elements',
          'Organic Chemistry: General Organic Chemistry (GOC: Inductive, Mesomeric, Hyperconjugation stability, Acidity/Basicity)',
          'Organic Chemistry: Hydrocarbons, Haloalkanes & Haloarenes, Alcohols & Phenols, Aldehydes & Ketones (Aldol, Cannizzaro), Amines & Biomolecules'
        ],
        hardestModule: 'Ionic Equilibrium (Solubility Product & Buffer Solutions) & Organic Synthesis Mechanisms',
        passTips: 'NCERT is bible for JEE Main Chemistry! 80% of inorganic and biomolecules questions are picked directly line-by-line from NCERT.'
      },
      {
        id: 'jee_math',
        name: 'Mathematics',
        category: 'Analytical Mathematics',
        weightage: '25 Questions = 100 Marks (+4 / -1)',
        modules: [
          'Algebra: Quadratic Equations, Complex Numbers (Modulus, Argument, Euler form), Sequences & Series (AP, GP, AGP), Binomial Theorem',
          'Matrices & Determinants: System of Linear Equations (Cramer’s rule & Matrix inverse), Properties of determinants',
          'Coordinate Geometry: Straight Lines, Circles (Tangents, Orthogonality), Conic Sections (Parabola, Ellipse, Hyperbola tangent equations)',
          'Calculus: Functions, Limits, Continuity & Differentiability, Applications of Derivatives (Tangent/Normal, Maxima/Minima)',
          'Integral Calculus: Definite Integrals (King’s property, Leibniz rule), Differential Equations (Linear differential equations)',
          'Vectors & 3D Geometry: Dot & Cross product, Shortest distance between skew lines, Vector triple product',
          'Statistics & Probability: Mean, Variance & Standard Deviation calculation, Bayes Theorem'
        ],
        hardestModule: 'Conic Sections (Hyperbola & Ellipse tangents) & Definite Integrals Leibniz Rule',
        passTips: 'Vectors & 3D Geometry, Matrices & Determinants, and Differential Equations give 35+ marks with predictable formula application.'
      }
    ],
    topRepeatedPYQs: [
      {
        id: 'jee_pyq_1',
        subject: 'Mathematics',
        question: 'Find the shortest distance between the lines:\n(x - 1)/2 = (y + 1)/3 = (z - 1)/4 and (x - 3)/1 = (y - k)/2 = z/1. If the lines intersect, find k.',
        marks: 4,
        frequency: 'Repeated pattern in JEE Main 2024, 2023, 2022',
        expectedAnswerFormat: 'Lines intersect when shortest distance = 0; Determinant |x₂-x₁ y₂-y₁ z₂-z₁; a₁ b₁ c₁; a₂ b₂ c₂| = 0; |2 k+1 -1; 2 3 4; 1 2 1| = 0; evaluate determinant to solve for k.'
      },
      {
        id: 'jee_pyq_2',
        subject: 'Physics',
        question: 'A proton and an alpha particle are accelerated through the same potential difference V. Find the ratio of their de-Broglie wavelengths (λ_p / λ_α).',
        marks: 4,
        frequency: 'Repeated in JEE Main 2023, 2021, 2020',
        expectedAnswerFormat: 'λ = h / √(2mqV); λ_p / λ_α = √((m_α · q_α) / (m_p · q_p)); Since m_α = 4m_p and q_α = 2q_p: ratio = √(4 × 2) = √8 = 2√2.'
      }
    ],
    formulaMatrix: [
      { topic: 'Modern Physics', formula: 'E = hν = hc/λ; Photoelectric: hν = Φ + KE_max; Bohr Radius: r_n = 0.529 (n² / Z) Å; Energy: E_n = -13.6 (Z² / n²) eV; de-Broglie: λ = h / √(2mqV)' },
      { topic: 'Chemical Bonding & MOT', formula: 'Bond Order = 1/2 (N_b - N_a); Paramagnetic if unpaired electrons exist in MO diagram' },
      { topic: 'Calculus Leibniz Rule', formula: 'd/dx [∫_{u(x)}^{v(x)} f(t) dt] = f(v(x)) · v\'(x) - f(u(x)) · u\'(x)' }
    ],
    thirtyDayPassStrategy: [
      { week: 'Week 1', focus: 'Modern Physics, Semiconductors, NCERT Inorganic Coordination Compounds & GOC.' },
      { week: 'Week 2', focus: 'Vectors & 3D, Matrices & Determinants, Thermodynamics (Physics & Chem).' },
      { week: 'Week 3', focus: 'Definite Integrals King Property, Electrochemistry, Current Electricity.' },
      { week: 'Week 4', focus: 'Full length 3-hour CBT mock tests with time management (40m Chem, 60m Phys, 80m Maths).' }
    ]
  },

  // =========================================================================
  // 5. GATE 2027 (IIT MADRAS)
  // =========================================================================
  gate_2027: {
    id: 'gate_2027',
    title: 'GATE 2027 (Graduate Aptitude Test in Engineering)',
    boardOrAuthority: 'IIT Madras / GATE Organising Committee',
    standard: 'National Level Postgraduate & PSU Selection',
    patternName: 'GATE Official 100-Mark Pattern (15M General Aptitude + 13M Engg Maths + 72M Technical)',
    totalMarks: 100,
    durationMinutes: 180,
    difficultyRating: 'Extremely Rigorous (Conceptual Proofs & Numericals)',
    passingThreshold: '25-30 Marks Qualifying; 65+ for PSU / Top IITs M.Tech',
    summary: 'Comprehensive curriculum for GATE Computer Science (CS/IT) and Data Science & AI (DA) aligned with official IIT Madras examination standards.',
    subjects: [
      {
        id: 'gate_apt_math',
        name: 'General Aptitude & Engineering Mathematics',
        category: 'Aptitude & Math Foundation',
        weightage: '28 Marks Total (GA 15M + Math 13M)',
        modules: [
          'General Aptitude: Verbal Ability (Grammar, Analogies), Numerical Ability (Permutations, Probability), Spatial Aptitude',
          'Linear Algebra: Vector Spaces, Rank-Nullity Theorem, Eigenvalues & Eigenvectors, Cayley-Hamilton Theorem, SVD basics',
          'Calculus: Mean Value Theorems, Maxima & Minima for multivariable functions, Multiple Integrals, Vector Calculus (Green, Gauss, Stokes)',
          'Probability & Statistics: Conditional Probability, Bayes Theorem, Random Variables, Poisson & Normal distributions',
          'Discrete Mathematics: Propositional & First Order Logic, Sets, Relations, Posets & Lattices, Groups, Graph Theory (Coloring, Planarity)'
        ],
        hardestModule: 'Multivariable Calculus & Combinatorics Generating Functions',
        passTips: 'Aptitude + Engineering Math accounts for 28 marks! Scoring 24+ marks here makes qualifying almost effortless.'
      },
      {
        id: 'gate_cs_core',
        name: 'Computer Science Core (CS/IT)',
        category: 'Technical Engineering Core',
        weightage: '72 Marks (MCQ, MSQ, NAT)',
        modules: [
          'Data Structures & Algorithms: Asymptotic notations, AVL trees, B/B+ trees, Dynamic Programming, Greedy, Graph traversals, NP-Completeness',
          'Theory of Computation: Regular Expressions, DFA/NFA minimization, Pumping Lemma, CFLs, Pushdown Automata, Turing Machines, Undecidability',
          'Compiler Design: Lexical Analysis, LL(1), SLR(1), LR(1), LALR(1) Parsing, Syntax-Directed Translation, Intermediate Code (Three-Address Code)',
          'Operating Systems: CPU Scheduling, Semaphores & Classical IPC, Deadlocks, Paging, Virtual Memory, File Systems',
          'Database Management Systems: ER Model, Relational Algebra, SQL, Normal Forms (up to BCNF), Conflict & View Serializability, Concurrency (2PL)',
          'Computer Networks: OSI & TCP/IP layers, Sliding Window protocols (Go-Back-N, Selective Repeat), IPv4 Subnetting & CIDR, Routing algorithms, TCP Congestion Control'
        ],
        hardestModule: 'TOC Decidability/Pumping Lemma & Computer Architecture Pipelining Hazards',
        passTips: 'Pay intense attention to MSQs (Multiple Select Questions) and NAT (Numerical Answer Type) which carry no negative marking.'
      }
    ],
    topRepeatedPYQs: [
      {
        id: 'gate_pyq_1',
        subject: 'Linear Algebra',
        question: 'Let A be a 3 × 3 matrix with eigenvalues 1, -1, and 0. Find the determinant and trace of matrix (A³ + 2I).',
        marks: 2,
        frequency: 'GATE standard pattern repeated in 2024, 2022, 2019',
        expectedAnswerFormat: 'Eigenvalues of A³ + 2I are λ³ + 2 for each eigenvalue of A: λ₁ = 1³ + 2 = 3; λ₂ = (-1)³ + 2 = 1; λ₃ = 0³ + 2 = 2. Trace = 3 + 1 + 2 = 6; Det = 3 × 1 × 2 = 6.'
      },
      {
        id: 'gate_pyq_2',
        subject: 'Algorithms',
        question: 'Consider a min-heap with 1023 elements. What is the maximum number of comparisons needed to find the maximum element in this min-heap?',
        marks: 2,
        frequency: 'GATE standard question',
        expectedAnswerFormat: 'In a min-heap, the maximum element must reside in one of the leaf nodes. Number of leaf nodes in 1023-node binary heap is ceil(1023 / 2) = 512. Finding the maximum among 512 elements takes 511 comparisons.'
      }
    ],
    formulaMatrix: [
      { topic: 'Linear Algebra', formula: 'Trace(A) = Sum of Eigenvalues; Det(A) = Product of Eigenvalues; Rank(A) + Nullity(A) = Number of Columns' },
      { topic: 'Computer Networks', formula: 'Throughput = Frame Size / (Transmission Time + 2 × Propagation Delay); Efficiency η = 1 / (1 + 2a) where a = T_prop / T_trans' },
      { topic: 'Operating Systems', formula: 'Effective Memory Access Time (EMAT) = h · (t_TLB + t_mem) + (1 - h) · (t_TLB + 2 · t_mem)' }
    ],
    thirtyDayPassStrategy: [
      { week: 'Week 1', focus: 'Linear Algebra, Probability, Aptitude, and Data Structures.' },
      { week: 'Week 2', focus: 'Operating Systems, DBMS, and Theory of Computation.' },
      { week: 'Week 3', focus: 'Computer Networks, Compiler Design, and Algorithms.' },
      { week: 'Week 4', focus: 'Full-length 65-question official mock simulations on virtual calculator.' }
    ]
  },

  // =========================================================================
  // 6. BCA / MCA SEMESTER
  // =========================================================================
  bca_college: {
    id: 'bca_college',
    title: 'BCA / MCA University Semester',
    boardOrAuthority: 'State Technical University & College Autonomous',
    standard: 'BCA / MCA / BSc Computer Science',
    patternName: 'University 70-Mark Pattern (Part A: 10 MCQs, Part B: 4×5M Logic, Part C: 4×10M Code & Schema)',
    totalMarks: 70,
    durationMinutes: 180,
    difficultyRating: 'Practical & Programming Oriented',
    passingThreshold: '40% (28 / 70 Theory)',
    summary: 'Core syllabus for Computer Applications degrees covering C, C++, Java, Python, Web Development, DBMS, and Software Engineering.',
    subjects: [
      {
        id: 'bca_dsa',
        name: 'Data Structures using C / C++',
        code: 'BCA-201',
        category: 'Core Programming',
        weightage: '70 Marks',
        modules: [
          'Arrays & Pointers: Dynamic Memory Allocation (malloc, calloc, free), Pointer arithmetic',
          'Linked Lists: Singly, Doubly, and Circular Linked Lists with insert, delete, search functions in C',
          'Stacks & Queues: Array and Linked representation, Infix to Postfix conversion, Circular Queue',
          'Trees & Graphs: Binary Search Tree creation, Inorder traversal, BFS & DFS algorithms',
          'Sorting & Searching: Bubble, Insertion, Quick Sort, Merge Sort, Binary Search complexity'
        ],
        hardestModule: 'Pointer manipulation in Doubly Linked List & Quick Sort Partitioning',
        passTips: 'Practice writing clean C syntax for Stack Push/Pop and Singly Linked List insertion. They carry 20+ assured marks.'
      },
      {
        id: 'bca_dbms',
        name: 'Database Management Systems & SQL',
        code: 'BCA-302',
        category: 'Database Technology',
        weightage: '70 Marks',
        modules: [
          'Introduction: Database vs File System, 3-tier Architecture, Data Independence',
          'ER Modeling: Entity, Attributes, Relationships, Strong vs Weak Entity sets',
          'Relational Model: Keys (Primary, Foreign, Candidate, Super), Relational Integrity constraints',
          'SQL Queries: DDL, DML, DCL, Aggregate functions, Subqueries, Joins (Inner, Left, Right)',
          'Normalization: 1NF, 2NF, 3NF with real student/library table decomposition examples'
        ],
        hardestModule: 'Normalization decomposition proofs & Complex nested SQL queries',
        passTips: 'Learn ER diagram symbols and practice writing SQL queries with GROUP BY and joins.'
      },
      {
        id: 'bca_python',
        name: 'Python Programming',
        code: 'BCA-301',
        category: 'Modern Programming',
        weightage: '70 Marks',
        modules: [
          'Python Basics: Data types, Operators, Control flow (if-else, loops), List comprehensions',
          'Functions & Modules: Parameter passing, Lambda functions, math and random modules',
          'Data Structures in Python: Lists, Tuples, Dictionaries, Sets with common operations',
          'OOPs in Python: Classes, Objects, __init__ constructor, Inheritance, Polymorphism',
          'File Handling & Exception Handling: open(), read(), write(), try-except-finally blocks'
        ],
        hardestModule: 'Object-Oriented Programming (Multiple inheritance & MRO) in Python',
        passTips: 'List comprehensions, dictionary operations, and class definitions are the most frequent exam questions.'
      }
    ],
    topRepeatedPYQs: [
      {
        id: 'bca_pyq_1',
        subject: 'Data Structures',
        question: 'Write a C program to implement a Stack using an array with PUSH, POP, and DISPLAY operations. Handle stack overflow and underflow conditions.',
        marks: 10,
        frequency: 'Repeated in 2024, 2023, 2022 university end-sem papers',
        expectedAnswerFormat: 'Complete C code with #define MAX, top = -1, push() function, pop() function, display() function, and main() menu-driven switch-case.'
      },
      {
        id: 'bca_pyq_2',
        subject: 'DBMS',
        question: 'What is Normalization? Explain 1NF, 2NF, and 3NF with suitable table examples. What is the difference between 3NF and BCNF?',
        marks: 10,
        frequency: 'Repeated in 2024, 2023, 2022 papers',
        expectedAnswerFormat: 'Definition of normalization, atomic values for 1NF, removing partial dependency for 2NF, removing transitive dependency for 3NF, determinant key rule for BCNF.'
      }
    ],
    formulaMatrix: [
      { topic: 'Linked List Address Calculation', formula: 'Address of A[i] (1D Array) = Base + (i - LowerBound) × Size' },
      { topic: 'Stack Top Index', formula: 'IsFull = (top == MAX - 1); IsEmpty = (top == -1)' },
      { topic: 'Circular Queue', formula: 'rear = (rear + 1) % MAX; front = (front + 1) % MAX' }
    ],
    thirtyDayPassStrategy: [
      { week: 'Week 1', focus: 'C Data structures code: Stack, Queue, Linked List basics.' },
      { week: 'Week 2', focus: 'DBMS ER diagrams, Relational Algebra, and 1NF to 3NF normalization.' },
      { week: 'Week 3', focus: 'Python OOPs, File handling, and SQL Join queries.' },
      { week: 'Week 4', focus: 'Solve past 3 years university question papers.' }
    ]
  }
};

export const TARGET_TRACK_OPTIONS = [
  {
    id: 'btech',
    title: 'B.Tech Engineering (All 8 Semesters)',
    subtitle: 'MAKAUT / Autonomous / AICTE R-25 Model Curriculum',
    category: 'Engineering & College',
    icon: '🎓',
    badge: 'Sem 1 to 8 • 70M Pattern',
    color: 'from-blue-600 to-indigo-600',
    description: 'Complete 8-semester curriculum for CSE, IT, ECE, EE, ME, Civil with 10-mark PYQs, derivation proofs, and lab viva banks.'
  },
  {
    id: 'cbse_12',
    title: 'CBSE Class 12 Board',
    subtitle: 'Science (PCM / Biology / CS) Senior Secondary',
    category: 'Class 12th Board',
    icon: '🏫',
    badge: '80M Official Pattern • Derivations',
    color: 'from-emerald-600 to-teal-600',
    description: 'Physics (Optics & Electromagnetism), Mathematics (Calculus & 3D), Chemistry (Organic Mechanisms), and Python CS.'
  },
  {
    id: 'cbse_10',
    title: 'CBSE Class 10 Board',
    subtitle: 'Standard & Basic Mathematics, Science, SST & English',
    category: 'Secondary School',
    icon: '🎒',
    badge: '80M Board Pattern • NCERT Step Rubrics',
    color: 'from-amber-600 to-orange-600',
    description: 'High school board examination blueprint with Thales theorem, Ohm’s law, life processes, and formula sheets.'
  },
  {
    id: 'ssc_cgl',
    title: 'SSC CGL (Tier-1 & Tier-2)',
    subtitle: 'Staff Selection Commission - Central Govt. Administrative',
    category: 'Govt & Administrative Exam',
    icon: '🎯',
    badge: '200M CBT Pattern • Speed Shortcuts',
    color: 'from-purple-600 to-pink-600',
    description: 'Quantitative Aptitude, General Intelligence, English Comprehension, and General Awareness (Polity & History).'
  },
  {
    id: 'jee_main',
    title: 'NTA JEE Main',
    subtitle: 'National Engineering Entrance (Physics, Chem, Maths)',
    category: 'National Entrance',
    icon: '⚡',
    badge: '300M CBT Pattern • +4 / -1 Marking',
    color: 'from-cyan-600 to-blue-600',
    description: '11th & 12th high-weightage topics, formula sheets, NCERT inorganic breakdowns, and CBT mock exam simulations.'
  },
  {
    id: 'gate_2027',
    title: 'GATE 2027 (IIT Madras Official)',
    subtitle: 'M.Tech, PSU & PhD Entrance (CS / DA / EC / EE)',
    category: 'PSU & Postgraduate Entrance',
    icon: '🏛️',
    badge: '100M Pattern • Virtual Calculator',
    color: 'from-rose-600 to-red-600',
    description: 'General Aptitude, Engineering Mathematics, and core CS/DA subjects with NAT, MSQ, and MCQ patterns.'
  },
  {
    id: 'bca_college',
    title: 'BCA / MCA (College Semester)',
    subtitle: 'Computer Applications University Examination',
    category: 'Computer Applications',
    icon: '💻',
    badge: '70M Pattern • Full Programs & Schemas',
    color: 'from-sky-600 to-teal-600',
    description: 'Programming in C, Python, Java, Data Structures, Relational DBMS & SQL, and Web Technologies.'
  }
];

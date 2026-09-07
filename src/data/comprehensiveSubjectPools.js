// =========================================================================
// VIDYA AI — Comprehensive Subject-Grounded Question Bank Repository
// Complete university-grade question pools for all semesters and subjects:
// Mathematics, Physics, Chemistry, Electrical, C, DAA, COA, Automata (FLAT),
// Compilers, Software Eng, Java, Cloud, Web, AI/ML, Security, IoT, Deep Learning,
// Blockchain, Python, JEE, CBSE, GATE, and SSC.
// =========================================================================

export const EXTENDED_SUBJECT_POOLS = {
  // =======================================================================
  // 1. ENGINEERING MATHEMATICS (Math I, II, Discrete Math, Calculus, Algebra)
  // =======================================================================
  math: {
    mcqs: [
      {
        text: 'If A is an n x n non-singular matrix, then the eigenvalues of A^(-1) are:',
        options: ['A) Negative of eigenvalues of A', 'B) Reciprocals of eigenvalues of A', 'C) Square of eigenvalues of A', 'D) Same as eigenvalues of A'],
        correct: 'B) Reciprocals of eigenvalues of A',
        explanation: 'If Ax = λx, multiplying by A^(-1) gives x = λ A^(-1)x => A^(-1)x = (1/λ)x. Thus eigenvalues are 1/λ.',
        marks: 1
      },
      {
        text: 'What is the Laplace transform of the function f(t) = e^(at) * sin(bt)?',
        options: ['A) b / ((s - a)^2 + b^2)', 'B) (s - a) / ((s - a)^2 + b^2)', 'C) b / (s^2 + b^2)', 'D) a / ((s - b)^2 + a^2)'],
        correct: 'A) b / ((s - a)^2 + b^2)',
        explanation: 'By the first shifting theorem, L{e^(at) f(t)} = F(s - a). Since L{sin(bt)} = b / (s^2 + b^2), the result is b / ((s - a)^2 + b^2).',
        marks: 1
      },
      {
        text: 'According to Cayley-Hamilton theorem, every square matrix satisfies its own:',
        options: ['A) Eigenvector equation', 'B) Characteristic equation', 'C) Trace identity', 'D) Determinant identity'],
        correct: 'B) Characteristic equation',
        explanation: 'Cayley-Hamilton states that if p(λ) = det(A - λI) = 0 is the characteristic polynomial, then p(A) = O.',
        marks: 1
      },
      {
        text: 'What is the order and degree of the differential equation: (d^2y/dx^2)^3 + (dy/dx)^4 + y = 0?',
        options: ['A) Order 2, Degree 3', 'B) Order 3, Degree 2', 'C) Order 2, Degree 4', 'D) Order 4, Degree 3'],
        correct: 'A) Order 2, Degree 3',
        explanation: 'Order is the highest derivative present (d^2y/dx^2 => order 2). Degree is the power of the highest order derivative => power 3.',
        marks: 1
      },
      {
        text: 'In discrete mathematics, a simple connected planar graph with V vertices and E edges divides the plane into R regions. Euler formula states:',
        options: ['A) V - E + R = 2', 'B) V + E - R = 2', 'C) V - E - R = 1', 'D) V + E + R = 0'],
        correct: 'A) V - E + R = 2',
        explanation: 'Euler formula for connected planar graphs is V - E + R = 2.',
        marks: 1
      },
      {
        text: 'What is the value of the limit: lim (x -> 0) [sin(3x) / tan(5x)]?',
        options: ['A) 1', 'B) 3/5', 'C) 5/3', 'D) 0'],
        correct: 'B) 3/5',
        explanation: 'Divide both by x: [sin(3x)/(3x) * 3] / [tan(5x)/(5x) * 5] = (1 * 3) / (1 * 5) = 3/5.',
        marks: 1
      },
      {
        text: 'The rank of a 3x3 identity matrix I_3 is:',
        options: ['A) 0', 'B) 1', 'C) 2', 'D) 3'],
        correct: 'D) 3',
        explanation: 'The determinant of I_3 is 1 != 0, so all 3 rows are linearly independent; rank is 3.',
        marks: 1
      },
      {
        text: 'Which of the following propositions is a tautology?',
        options: ['A) p ∧ ¬p', 'B) p ∨ ¬p', 'C) p -> ¬p', 'D) ¬p ∧ q'],
        correct: 'B) p ∨ ¬p',
        explanation: 'p ∨ ¬p is the law of excluded middle, always evaluating to True regardless of the truth value of p.',
        marks: 1
      },
      {
        text: 'The solution of the differential equation dy/dx + P(x)y = Q(x) has integrating factor (I.F.):',
        options: ['A) e^(integral P dx)', 'B) e^(integral Q dx)', 'C) integral e^P dx', 'D) e^(-integral P dx)'],
        correct: 'A) e^(integral P dx)',
        explanation: 'For a first-order linear differential equation, the integrating factor is I.F. = e^(integral P(x) dx).',
        marks: 1
      },
      {
        text: 'How many edges are in a complete graph K_n with n vertices?',
        options: ['A) n', 'B) n(n - 1)', 'C) n(n - 1) / 2', 'D) 2^n'],
        correct: 'C) n(n - 1) / 2',
        explanation: 'Every pair of vertices has an edge, giving C(n, 2) = n(n - 1) / 2 edges.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Cayley-Hamilton Theorem & Matrix Inverse',
        text: 'State the Cayley-Hamilton theorem. Find the characteristic equation of matrix A = [[2, 1], [1, 2]] and use it to compute A^(-1).',
        marks: 5,
        modelAnswer: 'Cayley-Hamilton Theorem states that every square matrix satisfies its own characteristic equation det(A - λI) = 0.\nStep 1: det([[2-λ, 1], [1, 2-λ]]) = (2-λ)^2 - 1 = λ^2 - 4λ + 3 = 0.\nStep 2: By theorem, A^2 - 4A + 3I = O.\nStep 3: Multiply by A^(-1): A - 4I + 3A^(-1) = O => 3A^(-1) = 4I - A.\nStep 4: A^(-1) = (1/3) * (4[[1, 0], [0, 1]] - [[2, 1], [1, 2]]) = (1/3) * [[2, -1], [-1, 2]].'
      },
      {
        title: 'Laplace Transform of Periodic Functions',
        text: 'Derive the formula for the Laplace transform of a periodic function f(t) with period T. Hence find L{f(t)} for a square wave.',
        marks: 5,
        modelAnswer: 'For periodic f(t) with f(t+T) = f(t):\nL{f(t)} = [1 / (1 - e^(-sT))] * integral_0^T e^(-st) f(t) dt.\nFor unit square wave with period 2a where f(t) = 1 for 0 < t < a and 0 for a < t < 2a:\nIntegral = integral_0^a e^(-st) dt = (1 - e^(-as))/s.\nTherefore L{f(t)} = (1 - e^(-as)) / [s(1 - e^(-2as))] = 1 / [s(1 + e^(-as))].'
      },
      {
        title: 'Propositional Logic & Equivalence Proofs',
        text: 'Prove using truth tables and logical equivalences that p -> (q ∨ r) is logically equivalent to (p ∧ ¬q) -> r.',
        marks: 5,
        modelAnswer: 'Step 1: p -> (q ∨ r) ≡ ¬p ∨ (q ∨ r) (Material implication).\nStep 2: By associativity: (¬p ∨ q) ∨ r.\nStep 3: Consider (p ∧ ¬q) -> r ≡ ¬(p ∧ ¬q) ∨ r.\nStep 4: Applying De Morgan laws: (¬p ∨ ¬¬q) ∨ r ≡ (¬p ∨ q) ∨ r.\nStep 5: Both expressions simplify to the identical disjunctive form, proving logical equivalence.'
      },
      {
        title: 'Exact Differential Equations',
        text: 'Find the general solution of the differential equation (2xy + y^2) dx + (x^2 + 2xy) dy = 0 and test for exactness.',
        marks: 5,
        modelAnswer: 'Let M = 2xy + y^2, N = x^2 + 2xy.\nStep 1: dM/dy = 2x + 2y. dN/dx = 2x + 2y. Since dM/dy = dN/dx, the equation is exact.\nStep 2: Integrate M wrt x treating y as constant: integral (2xy + y^2) dx = x^2 y + x y^2.\nStep 3: Terms in N free from x: None.\nStep 4: Solution is x^2 y + x y^2 = C.'
      }
    ],
    longQuestions: [
      {
        title: 'Diagonalization & Quadratic Forms',
        text: 'Given the real symmetric matrix A = [[3, 1, 1], [1, 3, 1], [1, 1, 3]]:\n(a) Determine all eigenvalues and orthogonal eigenvectors of matrix A.\n(b) Construct the modal matrix P and normalize it to obtain the orthogonal matrix N.\n(c) Compute N^T A N to obtain the diagonal canonical form.',
        marks: 15,
        subparts: [
          '(a) Find characteristic equation and eigenvalues [5 Marks]',
          '(b) Determine linearly independent orthogonal eigenvectors [5 Marks]',
          '(c) Form orthogonal matrix N and show diagonal form [5 Marks]'
        ],
        modelAnswer: '(a) Characteristic equation: det(A - λI) = 0 => (λ - 5)(λ - 2)^2 = 0. Eigenvalues: λ1 = 5, λ2 = 2, λ3 = 2.\n(b) For λ = 5: (A - 5I)x = 0 => x1 = x2 = x3 => X1 = [1, 1, 1]^T / sqrt(3).\nFor λ = 2: (A - 2I)x = 0 => x1 + x2 + x3 = 0. Choose orthogonal vectors: X2 = [1, -1, 0]^T / sqrt(2), X3 = [1, 1, -2]^T / sqrt(6).\n(c) N = [[1/√3, 1/√2, 1/√6], [1/√3, -1/√2, 1/√6], [1/√3, 0, -2/√6]]. Since N is orthogonal, N^T A N = diag(5, 2, 2).'
      },
      {
        title: 'Fourier Series & Partial Differential Equations',
        text: 'A uniform string of length L stretched between fixed ends x = 0 and x = L is released from rest from initial displacement f(x) = k*x*(L - x).\n(a) Formulate the one-dimensional wave equation boundary value problem.\n(b) Apply separation of variables to derive the general harmonic solution.\n(c) Compute the Fourier coefficients to express displacement y(x, t) at any future time t.',
        marks: 15,
        subparts: [
          '(a) Formulate PDE and boundary/initial conditions [4 Marks]',
          '(b) Separation of variables derivation [5 Marks]',
          '(c) Fourier sine series coefficient evaluation [6 Marks]'
        ],
        modelAnswer: '(a) Wave equation: d^2y/dt^2 = c^2 (d^2y/dx^2). Boundary conditions: y(0,t)=0, y(L,t)=0. Initial conditions: y(x,0)=kx(L-x), dy/dt(x,0)=0.\n(b) Let y(x,t) = X(x)T(t). X\'\'/X = T\'\'/(c^2 T) = -p^2. X(x) = C1 cos(px) + C2 sin(px). Using boundary conditions, p = n*pi/L, giving X_n(x) = sin(n*pi*x/L) and T_n(t) = cos(n*pi*c*t/L).\n(c) Fourier coefficients: B_n = (2/L) integral_0^L kx(L-x) sin(n*pi*x/L) dx = (8kL^2)/(n^3 pi^3) for odd n, and 0 for even n.\nFinal solution: y(x,t) = sum_{n=odd} (8kL^2)/(n^3 pi^3) sin(n*pi*x/L) cos(n*pi*c*t/L).'
      }
    ]
  },

  // =======================================================================
  // 2. ENGINEERING PHYSICS & OPTICS (Physics, Applied Optics, Quantum)
  // =======================================================================
  physics: {
    mcqs: [
      {
        text: 'In quantum mechanics, the time-independent Schrödinger wave equation in one dimension is:',
        options: ['A) (d^2ψ/dx^2) + (2m/ℏ^2)(E - V)ψ = 0', 'B) (d^2ψ/dx^2) - (2m/ℏ^2)(E - V)ψ = 0', 'C) (d^2ψ/dx^2) + (ℏ^2/2m)(E - V)ψ = 0', 'D) (dψ/dx) + (2m/ℏ^2)Eψ = 0'],
        correct: 'A) (d^2ψ/dx^2) + (2m/ℏ^2)(E - V)ψ = 0',
        explanation: 'The standard 1D time-independent Schrödinger equation equates kinetic and potential energy to total energy E: (-ℏ^2/2m)(d^2ψ/dx^2) + Vψ = Eψ.',
        marks: 1
      },
      {
        text: 'The numerical aperture (NA) of an optical fiber having core refractive index n1 and cladding refractive index n2 is given by:',
        options: ['A) sqrt(n1^2 + n2^2)', 'B) sqrt(n1^2 - n2^2)', 'C) n1 / n2', 'D) (n1 - n2) / n1'],
        correct: 'B) sqrt(n1^2 - n2^2)',
        explanation: 'Numerical aperture defines light-gathering capacity: NA = sin(θ_max) = sqrt(n1^2 - n2^2).',
        marks: 1
      },
      {
        text: 'In a Ruby laser, the active lasing medium consists of:',
        options: ['A) He-Ne gas mixture', 'B) Al2O3 doped with Cr3+ ions', 'C) Nd:YAG crystal', 'D) Semiconductor GaAs'],
        correct: 'B) Al2O3 doped with Cr3+ ions',
        explanation: 'Ruby laser consists of a sapphire crystal (Al2O3) doped with approximately 0.05% chromium (Cr3+) ions.',
        marks: 1
      },
      {
        text: 'According to Heisenberg uncertainty principle, the product of uncertainties in position and momentum satisfies:',
        options: ['A) Δx * Δp >= ℏ/2', 'B) Δx * Δp <= ℏ/2', 'C) Δx * Δp = 0', 'D) Δx / Δp >= ℏ'],
        correct: 'A) Δx * Δp >= ℏ/2',
        explanation: 'The fundamental quantum limit is Δx * Δp >= ℏ/2 where ℏ = h / (2π).',
        marks: 1
      },
      {
        text: 'In Compton scattering, the maximum shift in wavelength occurs when the scattering angle is:',
        options: ['A) 0 degrees', 'B) 45 degrees', 'C) 90 degrees', 'D) 180 degrees'],
        correct: 'D) 180 degrees',
        explanation: 'Compton shift Δλ = (h/mc)(1 - cos θ). Maximum occurs at θ = 180° where 1 - cos(180°) = 2, giving Δλ_max = 2h/mc = 0.0485 Å.',
        marks: 1
      },
      {
        text: 'Which Maxwell equation represents the non-existence of isolated magnetic monopoles?',
        options: ['A) ∇ · E = ρ/ε0', 'B) ∇ · B = 0', 'C) ∇ × E = -∂B/∂t', 'D) ∇ × B = μ0 J'],
        correct: 'B) ∇ · B = 0',
        explanation: 'Gauss law for magnetism ∇ · B = 0 states that the net magnetic flux through any closed surface is zero, confirming no isolated magnetic charges exist.',
        marks: 1
      },
      {
        text: 'In Newton rings experiment, the central spot observed in reflected light is:',
        options: ['A) Always bright', 'B) Always dark', 'C) Coloured', 'D) Discontinuous'],
        correct: 'B) Always dark',
        explanation: 'At the point of contact, film thickness t = 0. Reflection at the denser glass boundary introduces an additional phase change of π (path diff λ/2), causing destructive interference.',
        marks: 1
      },
      {
        text: 'The de Broglie wavelength of a particle of mass m moving with kinetic energy E is:',
        options: ['A) h / sqrt(2mE)', 'B) h * sqrt(2mE)', 'C) sqrt(2mE) / h', 'D) h / (2mE)'],
        correct: 'A) h / sqrt(2mE)',
        explanation: 'p = sqrt(2mE), so de Broglie wavelength λ = h / p = h / sqrt(2mE).',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Optical Fiber Acceptance Angle & Numerical Aperture',
        text: 'Define Acceptance Angle and Numerical Aperture (NA) for a step-index optical fiber. A fiber has core index n1 = 1.55 and cladding index n2 = 1.50. Calculate NA and acceptance angle in air.',
        marks: 5,
        modelAnswer: 'Numerical aperture measures light-gathering ability: NA = sqrt(n1^2 - n2^2).\nStep 1: NA = sqrt(1.55^2 - 1.50^2) = sqrt(2.4025 - 2.25) = sqrt(0.1525) ≈ 0.3905.\nStep 2: Acceptance angle θ_max = arcsin(NA) = arcsin(0.3905) ≈ 23.0°.\nLight entering within this cone undergoes Total Internal Reflection (TIR) along the core.'
      },
      {
        title: 'He-Ne Laser Population Inversion Mechanism',
        text: 'Explain how population inversion is achieved in a Helium-Neon (He-Ne) gas laser. Describe the role of Helium atoms in pumping Neon.',
        marks: 5,
        modelAnswer: '1. Electric discharge excites ground-state Helium atoms to metastable states (2^1S and 2^3S) by electron collision.\n2. Because these metastable levels closely match the 3s and 2s excited states of Neon, resonant energy transfer occurs during He-Ne collisions.\n3. This excites Neon atoms to 3s and 2s levels, establishing population inversion with respect to lower 3p and 2p states.\n4. Spontaneous emission initiates lasing transition at 632.8 nm (red light) as Neon drops from 3s to 2p.'
      }
    ],
    longQuestions: [
      {
        title: 'Quantum Particle in a 1D Infinite Potential Well',
        text: 'Consider a quantum particle of mass m confined in an infinitely deep one-dimensional potential well of width L (V=0 for 0 < x < L, V=infinity elsewhere).\n(a) Solve the time-independent Schrödinger wave equation to find the normalized stationary wave functions ψ_n(x).\n(b) Derive the discrete energy eigenvalues E_n.\n(c) Sketch the probability density |ψ_n(x)|^2 for the first three states (n = 1, 2, 3) and explain zero-point energy.',
        marks: 15,
        subparts: [
          '(a) Formulation of boundary conditions and wave function solution [5 Marks]',
          '(b) Energy eigenvalue derivation [5 Marks]',
          '(c) Probability density sketches and zero-point energy explanation [5 Marks]'
        ],
        modelAnswer: '(a) In region 0 < x < L, d^2ψ/dx^2 + k^2 ψ = 0 where k = sqrt(2mE)/ℏ. General solution: ψ(x) = A sin(kx) + B cos(kx).\nBoundary condition ψ(0) = 0 => B = 0. ψ(L) = 0 => A sin(kL) = 0 => kL = nπ => k = nπ/L for n = 1, 2, 3...\nNormalization: integral_0^L A^2 sin^2(nπx/L) dx = 1 => A = sqrt(2/L).\nNormalized wave function: ψ_n(x) = sqrt(2/L) sin(nπx/L).\n(b) Since k = sqrt(2mE)/ℏ = nπ/L => E_n = (n^2 π^2 ℏ^2) / (2m L^2) = (n^2 h^2) / (8m L^2).\n(c) Zero-point energy E_1 = h^2 / (8mL^2) > 0 because if E=0, p=0, violating Heisenberg uncertainty principle Δx Δp >= ℏ/2.'
      }
    ]
  },

  // =======================================================================
  // 3. ENGINEERING CHEMISTRY (Polymers, Electrochemistry, Spectroscopy)
  // =======================================================================
  chemistry: {
    mcqs: [
      {
        text: 'The relationship between cell potential and standard potential is given by the Nernst equation:',
        options: ['A) E = E° - (RT/nF) ln Q', 'B) E = E° + (RT/nF) ln Q', 'C) E = E° * (RT/nF)', 'D) E = (RT/nF) ln K'],
        correct: 'A) E = E° - (RT/nF) ln Q',
        explanation: 'The Nernst equation E = E° - (2.303 RT / nF) log10 Q calculates electromotive force under non-standard concentration conditions.',
        marks: 1
      },
      {
        text: 'Which polymer is synthesized via condensation polymerization between hexamethylenediamine and adipic acid?',
        options: ['A) Bakelite', 'B) Nylon 6,6', 'C) Teflon', 'D) Polyethylene'],
        correct: 'B) Nylon 6,6',
        explanation: 'Hexamethylenediamine (6 carbons) and adipic acid (6 carbons) condense with elimination of water to form Nylon 6,6 polyamide.',
        marks: 1
      },
      {
        text: 'Temporary hardness in water is caused by dissolved bicarbonates of:',
        options: ['A) Sodium and Potassium', 'B) Calcium and Magnesium', 'C) Iron and Copper', 'D) Chloride and Sulfate'],
        correct: 'B) Calcium and Magnesium',
        explanation: 'Temporary hardness is due to Ca(HCO3)2 and Mg(HCO3)2 which precipitate as carbonates upon boiling.',
        marks: 1
      },
      {
        text: 'In sacrificial anodic protection against corrosion, the metal attached to an iron structure is typically:',
        options: ['A) Copper (Cu)', 'B) Zinc (Zn) or Magnesium (Mg)', 'C) Nickel (Ni)', 'D) Platinum (Pt)'],
        correct: 'B) Zinc (Zn) or Magnesium (Mg)',
        explanation: 'Metals with more negative reduction potential than iron (such as Zn or Mg) act as sacrificial anodes, oxidizing preferentially.',
        marks: 1
      },
      {
        text: 'According to Beer-Lambert law, absorbance A is directly proportional to:',
        options: ['A) Wavelength and frequency', 'B) Concentration and optical path length', 'C) Temperature and pressure', 'D) Refractive index'],
        correct: 'B) Concentration and optical path length',
        explanation: 'A = ε * c * l, where ε is molar absorptivity, c is concentration, and l is path length.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Electrochemical Corrosion Mechanisms',
        text: 'Explain the mechanism of electrochemical (wet) corrosion of iron in an acidic and neutral aerated medium. Write the cathodic reactions.',
        marks: 5,
        modelAnswer: 'Anodic reaction (always oxidation): Fe -> Fe^(2+) + 2e^-.\nCathodic reactions depending on environment:\n1. Acidic medium (Hydrogen evolution): 2H^+ + 2e^- -> H2 (g).\n2. Neutral or alkaline aerated medium (Oxygen absorption): O2 + 2H2O + 4e^- -> 4OH^-.\nFe^(2+) and OH^- combine to form Fe(OH)2 which oxidizes to rust Fe2O3 · xH2O.'
      }
    ],
    longQuestions: [
      {
        title: 'Water Technology: Hardness & EDTA Titration',
        text: 'Explain the EDTA complexometric titration method for estimation of total, permanent, and temporary hardness of water.\n(a) Describe the role of Eriochrome Black-T (EBT) indicator and buffer solution (pH 10).\n(b) Write the titration reactions and calculation formulas.\n(c) A 100 mL water sample required 18 mL of 0.01 M EDTA solution for titration. Calculate total hardness in ppm of CaCO3 equivalent.',
        marks: 15,
        subparts: [
          '(a) Principles of buffer (pH 10) and EBT wine-red to blue transition [5 Marks]',
          '(b) Titration equations and complex stability constants [5 Marks]',
          '(c) Numerical calculation of hardness in ppm [5 Marks]'
        ],
        modelAnswer: '(a) EBT forms unstable wine-red complex with Ca^(2+)/Mg^(2+) at pH 10 (NH4Cl-NH4OH buffer). During titration, EDTA displaces EBT because the Metal-EDTA complex is far more stable, releasing free EBT which turns steel blue.\n(b) M^(2+) + EBT -> [M-EBT] (wine red). [M-EBT] + EDTA -> [M-EDTA] (colorless stable) + EBT (blue).\n(c) 1 mL of 0.01 M EDTA = 1 mg of CaCO3 equivalent.\n18 mL of 0.01 M EDTA = 18 mg of CaCO3.\nTotal Hardness in 100 mL = 18 mg => In 1000 mL (1 L) = 180 mg/L = 180 ppm.'
      }
    ]
  },

  // =======================================================================
  // 4. BASIC ELECTRICAL & DIGITAL ELECTRONICS (Circuits, K-Maps, Flip-Flops)
  // =======================================================================
  electrical: {
    mcqs: [
      {
        text: 'According to Thevenin theorem, any linear bilateral two-terminal network can be replaced by:',
        options: ['A) Current source in parallel with resistance', 'B) Voltage source in series with equivalent resistance', 'C) Ideal voltage source only', 'D) Resistor in parallel with capacitor'],
        correct: 'B) Voltage source in series with equivalent resistance',
        explanation: 'Thevenin theorem replaces the active network with an open-circuit voltage V_th in series with Thevenin resistance R_th.',
        marks: 1
      },
      {
        text: 'How many select lines are required for a 16-to-1 Multiplexer?',
        options: ['A) 2', 'B) 4', 'C) 8', 'D) 16'],
        correct: 'B) 4',
        explanation: 'Number of select lines s satisfies 2^s = 16 => s = 4 lines.',
        marks: 1
      },
      {
        text: 'In a JK Flip-Flop, the race-around condition occurs when:',
        options: ['A) J = 0, K = 0', 'B) J = 1, K = 0', 'C) J = 1, K = 1 and clock pulse width tp > propagation delay td', 'D) J = 0, K = 1'],
        correct: 'C) J = 1, K = 1 and clock pulse width tp > propagation delay td',
        explanation: 'When J=K=1, the output toggles repeatedly within a single clock pulse if the pulse duration is greater than the flip-flop propagation delay.',
        marks: 1
      },
      {
        text: 'The boolean expression Y = A ⊕ B (XOR) evaluates to 1 when:',
        options: ['A) Both A and B are 1', 'B) Both A and B are 0', 'C) Exactly one of A or B is 1', 'D) Neither A nor B is 1'],
        correct: 'C) Exactly one of A or B is 1',
        explanation: 'XOR yields true (1) if inputs are dissimilar: A¬B + ¬AB.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'K-Map Minimization (4-Variable)',
        text: 'Minimize the boolean function F(A, B, C, D) = sum_m(0, 2, 5, 7, 8, 10, 13, 15) using Karnaugh Map. Write the simplified SOP expression.',
        marks: 5,
        modelAnswer: 'Step 1: Plot minterms into 4x4 K-map.\nStep 2: Group four corners (0, 2, 8, 10): yields B\' D\'.\nStep 3: Group quad (5, 7, 13, 15): yields B D.\nStep 4: Combine groups: F = B\' D\' + B D = (B ⊙ D) (XNOR expression).'
      }
    ],
    longQuestions: [
      {
        title: '3-Bit Synchronous Up/Down Counter Design',
        text: 'Design a 3-bit Synchronous Up/Down Counter using JK Flip-Flops and external control signal M (M=1 Up, M=0 Down).\n(a) Draw state transition diagram and excitation table.\n(b) Derive simplified logic expressions for J and K inputs of each flip-flop using K-maps.\n(c) Draw complete logic circuit diagram with clock and control line.',
        marks: 15,
        subparts: [
          '(a) State transition table & excitation mapping [5 Marks]',
          '(b) K-map minimization for J0, K0, J1, K1, J2, K2 [5 Marks]',
          '(c) Complete circuit schematic [5 Marks]'
        ],
        modelAnswer: '(a) For 3 bits Q2 Q1 Q0: When M=1, counts 000->001->010->...->111->000. When M=0, counts down.\n(b) JK excitation rules: J0=1, K0=1 (toggles every cycle).\nFor FF1: J1 = K1 = (M Q0) + (M\' Q0\').\nFor FF2: J2 = K2 = (M Q1 Q0) + (M\' Q1\' Q0\').\n(c) The circuit connects clock synchronously to all 3 flip-flops, gating J1/K1 and J2/K2 using AND/OR gates fed by M and prior outputs.'
      }
    ]
  },

  // =======================================================================
  // 5. C PROGRAMMING & PROBLEM SOLVING
  // =======================================================================
  c_prog: {
    mcqs: [
      {
        text: 'What is the output of: int a = 5; printf("%d %d", a++, ++a); in standard C?',
        options: ['A) 5 7', 'B) 6 7', 'C) Undefined behavior due to sequence point violation', 'D) 5 6'],
        correct: 'C) Undefined behavior due to sequence point violation',
        explanation: 'Modifying a variable more than once between two sequence points without an intervening sequence point invokes Undefined Behavior in ANSI C.',
        marks: 1
      },
      {
        text: 'In C, which storage class allocates variables in heap memory?',
        options: ['A) auto', 'B) static', 'C) Dynamic memory allocation (malloc/calloc)', 'D) register'],
        correct: 'C) Dynamic memory allocation (malloc/calloc)',
        explanation: 'auto variables reside on the runtime call stack, static in data segment, while malloc/calloc allocate on the heap.',
        marks: 1
      },
      {
        text: 'What does the declaration "int (*ptr)[10];" signify?',
        options: ['A) Array of 10 integer pointers', 'B) Pointer to an array of 10 integers', 'C) Function returning array pointer', 'D) 2D array of size 10'],
        correct: 'B) Pointer to an array of 10 integers',
        explanation: 'Parentheses bind * to ptr first: ptr is a pointer to an array of 10 integers.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Pointers & Dynamic Memory Management',
        text: 'Differentiate between malloc() and calloc(). Write a C snippet to dynamically allocate memory for an integer array of size N and check for NULL.',
        marks: 5,
        modelAnswer: 'malloc(size) allocates uninitialized raw bytes (containing garbage values). calloc(num, size) allocates memory and zero-initializes all bytes.\n```c\nint *arr = (int *)malloc(n * sizeof(int));\nif (arr == NULL) {\n    fprintf(stderr, "Memory allocation failed\\n");\n    exit(1);\n}\n```'
      }
    ],
    longQuestions: [
      {
        title: 'Singly Linked List Implementation in C',
        text: 'Write complete, bug-free C functions for:\n(a) Inserting a node in a sorted linked list maintaining ascending order.\n(b) Reversing the linked list in-place in O(N) time and O(1) auxiliary space.\n(c) Detecting and removing a cycle (Floyd cycle-finding algorithm).',
        marks: 15,
        subparts: [
          '(a) Sorted insertion with head pointer handling [5 Marks]',
          '(b) In-place iterative reversal (prev, curr, next) [5 Marks]',
          '(c) Floyd cycle detection and loop removal [5 Marks]'
        ],
        modelAnswer: 'Standard C implementation with struct Node { int data; struct Node *next; }. In-place reversal updates 3 pointers: while(curr){ next=curr->next; curr->next=prev; prev=curr; curr=next; } *head=prev. Floyd uses slow and fast pointers to detect collision, then resets slow to head to find loop start.'
      }
    ]
  },

  // =======================================================================
  // 6. COMPUTER ORGANIZATION & ARCHITECTURE (COA)
  // =======================================================================
  coa: {
    mcqs: [
      {
        text: 'Which hazard in pipelined processors occurs when instructions depend on the result of a previous instruction that is still in the pipeline?',
        options: ['A) Structural Hazard', 'B) Data Hazard (RAW)', 'C) Control Hazard', 'D) Memory Hazard'],
        correct: 'B) Data Hazard (RAW)',
        explanation: 'Read-After-Write (RAW) data hazard occurs when an instruction needs data before a preceding instruction has written it back.',
        marks: 1
      },
      {
        text: 'In Booth multiplication algorithm, when the multiplier bits (Q0, Q-1) are "10", what operation is performed?',
        options: ['A) No operation', 'B) Add multiplicand to accumulator (A = A + M)', 'C) Subtract multiplicand from accumulator (A = A - M)', 'D) Shift left only'],
        correct: 'C) Subtract multiplicand from accumulator (A = A - M)',
        explanation: 'Booth algorithm subtracts M when transitioning from 0 to 1 (bits 10), and adds M when transitioning from 1 to 0 (bits 01).',
        marks: 1
      },
      {
        text: 'How does Direct Memory Access (DMA) transfer data between I/O devices and memory?',
        options: ['A) Entirely through CPU ALU', 'B) Directly bypassing CPU after bus grant', 'C) Using software interrupts only', 'D) Over the serial console'],
        correct: 'B) Directly bypassing CPU after bus grant',
        explanation: 'DMA controller takes master control of the system bus to transfer blocks of data directly between peripheral devices and RAM without routing through CPU registers.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Instruction Pipelining Speedup Calculation',
        text: 'A 5-stage pipeline has stage delays of 120 ps, 150 ps, 190 ps, 130 ps, and 160 ps with a pipeline register delay of 20 ps. Compute the clock cycle time and speedup over non-pipelined execution for 1000 instructions.',
        marks: 5,
        modelAnswer: 'Clock cycle time = max stage delay + register delay = 190 ps + 20 ps = 210 ps.\nNon-pipelined execution time per instruction = 120 + 150 + 190 + 130 + 160 = 750 ps.\nFor 1000 instructions:\nNon-pipelined time = 1000 * 750 ps = 750,000 ps.\nPipelined time = (5 + 1000 - 1) * 210 ps = 1004 * 210 ps = 210,840 ps.\nSpeedup = 750,000 / 210,840 ≈ 3.56x.'
      }
    ],
    longQuestions: [
      {
        title: 'Cache Memory Mapping Architectures',
        text: 'A computer system has a 32-bit byte-addressable physical address space and a 64 KB cache with 16-byte cache lines.\n(a) Calculate Tag, Index, and Offset bits for Direct Mapping.\n(b) Calculate Tag, Set Index, and Offset bits for 4-Way Set-Associative Mapping.\n(c) Compare Direct, Set-Associative, and Fully-Associative caches in terms of hit latency, hardware complexity, and conflict misses.',
        marks: 15,
        subparts: [
          '(a) Direct Mapping bit partition [5 Marks]',
          '(b) 4-Way Set-Associative bit partition [5 Marks]',
          '(c) In-depth architectural trade-off comparison [5 Marks]'
        ],
        modelAnswer: '(a) Line size = 16 B = 2^4 B => Offset = 4 bits.\nTotal lines = 64 KB / 16 B = 4096 = 2^12 lines => Index = 12 bits.\nTag = 32 - 12 - 4 = 16 bits.\n(b) In 4-way set associative: Sets = 4096 / 4 = 1024 = 2^10 sets => Set Index = 10 bits.\nOffset = 4 bits. Tag = 32 - 10 - 4 = 18 bits.\n(c) Direct mapped has fastest hit latency and lowest hardware cost (no comparator tree) but suffers from severe conflict misses. Fully associative eliminates conflict misses entirely but requires expensive content-addressable memory (CAM). Set-associative balances miss rate and clock timing.'
      }
    ]
  },

  // =======================================================================
  // 7. DESIGN & ANALYSIS OF ALGORITHMS (DAA)
  // =======================================================================
  daa: {
    mcqs: [
      {
        text: 'What is the asymptotic solution of the recurrence T(N) = 4T(N/2) + O(N^2) using Master Theorem?',
        options: ['A) O(N^2)', 'B) O(N^2 log N)', 'C) O(N^3)', 'D) O(N log N)'],
        correct: 'B) O(N^2 log N)',
        explanation: 'a = 4, b = 2 => N^(log_b a) = N^(log_2 4) = N^2. Since f(N) = O(N^2), Case 2 of Master Theorem applies: T(N) = O(N^2 log N).',
        marks: 1
      },
      {
        text: 'Which algorithm design paradigm is used by the 0/1 Knapsack problem?',
        options: ['A) Greedy Strategy', 'B) Dynamic Programming', 'C) Divide and Conquer', 'D) Randomization'],
        correct: 'B) Dynamic Programming',
        explanation: '0/1 Knapsack exhibits optimal substructure and overlapping subproblems requiring Dynamic Programming (Greedy fails because items cannot be divided).',
        marks: 1
      },
      {
        text: 'What is the time complexity of Dijkstra shortest path algorithm using a Fibonacci Heap for graph G(V, E)?',
        options: ['A) O(V^2)', 'B) O(E + V log V)', 'C) O(E log V)', 'D) O(V E)'],
        correct: 'B) O(E + V log V)',
        explanation: 'With Fibonacci Heaps, decrease-key is amortized O(1) and extract-min is O(log V), yielding O(E + V log V).',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Greedy vs Dynamic Programming: Fractional Knapsack',
        text: 'Explain why the Greedy choice property yields an optimal solution for Fractional Knapsack but fails for 0/1 Knapsack. Provide a counterexample.',
        marks: 5,
        modelAnswer: 'Fractional knapsack sorts items by value-to-weight ratio (v_i/w_i) and greedily takes full items then fractions, maximizing density.\nCounterexample for 0/1 Knapsack: Capacity W = 50. Item 1: (v=60, w=10, ratio=6), Item 2: (v=100, w=20, ratio=5), Item 3: (v=120, w=30, ratio=4).\nGreedy picks Item 1 & 2 (weight 30, value 160) leaving 20 capacity unused. Optimal picks Item 2 & 3 (weight 50, value 220).'
      }
    ],
    longQuestions: [
      {
        title: 'Dynamic Programming: Longest Common Subsequence (LCS)',
        text: 'Given two sequences X = "BACDB" and Y = "BDCB":\n(a) Formulate the dynamic programming recurrence relation for LCS.\n(b) Construct the DP cost matrix and arrow tracking table.\n(c) Trace the optimal path to print all Longest Common Subsequences and state its length.',
        marks: 15,
        subparts: [
          '(a) Recurrence relation definition [4 Marks]',
          '(b) DP table computation [6 Marks]',
          '(c) Backtracking path extraction and output string [5 Marks]'
        ],
        modelAnswer: '(a) Let c[i,j] be LCS length of X[1..i] and Y[1..j]. If X[i]==Y[j], c[i,j] = c[i-1,j-1] + 1. Else c[i,j] = max(c[i-1,j], c[i,j-1]).\n(b) Complete 6x5 matrix constructed showing optimal sub-lengths.\n(c) Optimal LCS length = 3. Backtracking yields "BCB".'
      }
    ]
  },

  // =======================================================================
  // 8. FORMAL LANGUAGE & AUTOMATA THEORY (FLAT / TOC)
  // =======================================================================
  flat: {
    mcqs: [
      {
        text: 'Which of the following languages is NOT regular?',
        options: ['A) L = {w | w has even number of 0s}', 'B) L = {0^n 1^n | n >= 1}', 'C) L = {w | w ends with 01}', 'D) L = {0^m 1^n | m, n >= 0}'],
        correct: 'B) L = {0^n 1^n | n >= 1}',
        explanation: '0^n 1^n requires counting arbitrary n, requiring infinite states which cannot be recognized by a Finite Automaton (proven via Pumping Lemma).',
        marks: 1
      },
      {
        text: 'A Pushdown Automaton (PDA) with one stack recognized which class of languages?',
        options: ['A) Regular Languages', 'B) Context-Free Languages', 'C) Context-Sensitive Languages', 'D) Recursively Enumerable'],
        correct: 'B) Context-Free Languages',
        explanation: 'PDAs augment finite automata with a LIFO stack, recognizing exactly Context-Free Languages (Type 2 in Chomsky hierarchy).',
        marks: 1
      },
      {
        text: 'According to Chomsky hierarchy, which grammar type corresponds to Turing Machines?',
        options: ['A) Type 0 (Unrestricted)', 'B) Type 1 (Context-Sensitive)', 'C) Type 2 (Context-Free)', 'D) Type 3 (Regular)'],
        correct: 'A) Type 0 (Unrestricted)',
        explanation: 'Type 0 unrestricted grammars are recognized by Turing Machines and generate recursively enumerable languages.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Pumping Lemma for Regular Languages',
        text: 'State the Pumping Lemma for regular languages. Use it to prove that L = {a^p | p is a prime number} is not regular.',
        marks: 5,
        modelAnswer: 'Pumping Lemma: If L is regular, there exists pumping length p such that any string w in L with |w| >= p can be split as w = xyz with |y| > 0, |xy| <= p, and x y^i z in L for all i >= 0.\nProof for primes: Let s = a^p where p >= n is prime. Let s = xyz with |y| = k (1 <= k <= n). Then |x y^(p+1) z| = p + p*k = p(1 + k), which is composite (not prime), contradicting regularity.'
      }
    ],
    longQuestions: [
      {
        title: 'DFA Minimization & Equivalence',
        text: 'Given an NFA with states {q0, q1, q2} over alphabet {0, 1} where q0 is start and q2 is accept:\n(a) Convert the NFA to an equivalent DFA using subset construction algorithm.\n(b) Minimize the resulting DFA using the Table Filling (Myhill-Nerode) algorithm.\n(c) Construct the minimal state transition table and write the accepted regular expression.',
        marks: 15,
        subparts: [
          '(a) Powerset / subset construction mapping [5 Marks]',
          '(b) Table filling minimization steps [5 Marks]',
          '(c) Minimal DFA transition table and RE [5 Marks]'
        ],
        modelAnswer: '(a) Powerset construction creates composite states like [q0, q1].\n(b) Table filling marks distinguishable pairs based on transitions leading to accepting vs non-accepting states.\n(c) Merging indistinguishable states yields minimal DFA with guaranteed minimum state count.'
      }
    ]
  },

  // =======================================================================
  // 9. COMPILER DESIGN
  // =======================================================================
  cd: {
    mcqs: [
      {
        text: 'Which compiler phase verifies whether the arrangement of tokens obeys grammatical rules of the source language?',
        options: ['A) Lexical Analysis', 'B) Syntax Analysis', 'C) Semantic Analysis', 'D) Intermediate Code Generation'],
        correct: 'B) Syntax Analysis',
        explanation: 'Syntax analysis (parsing) checks token streams against Context-Free Grammar rules to construct Parse Trees.',
        marks: 1
      },
      {
        text: 'An LL(1) parser is called LL(1) because it parses:',
        options: ['A) Left-to-right, Leftmost derivation with 1 lookahead token', 'B) Left-to-right, Rightmost derivation', 'C) Linear Lookahead', 'D) Bottom-up with 1 state'],
        correct: 'A) Left-to-right, Leftmost derivation with 1 lookahead token',
        explanation: 'First L: scans input from Left to right. Second L: generates Leftmost derivation. (1): uses 1 lookahead symbol.',
        marks: 1
      },
      {
        text: 'Which intermediate representation uses at most one operator on the right-hand side of each instruction?',
        options: ['A) Abstract Syntax Tree', 'B) Postfix Notation', 'C) Three-Address Code (3AC)', 'D) Quadruples'],
        correct: 'C) Three-Address Code (3AC)',
        explanation: 'Three-Address Code linearizes expressions in the form x = y op z with at most three memory references per instruction.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Left Recursion Elimination',
        text: 'Eliminate immediate left recursion from the grammar: E -> E + T | T, T -> T * F | F.',
        marks: 5,
        modelAnswer: 'For rule A -> Aα | β, eliminate left recursion by replacing with A -> β A\' and A\' -> α A\' | ε.\nApplying to E: E -> T E\', E\' -> + T E\' | ε.\nApplying to T: T -> F T\', T\' -> * F T\' | ε.'
      }
    ],
    longQuestions: [
      {
        title: 'LR(0) and SLR(1) Parsing Table Construction',
        text: 'Given the augmented grammar:\nS\' -> S\nS -> C C\nC -> c C | d\n(a) Compute the canonical collection of LR(0) items.\n(b) Compute FIRST and FOLLOW sets for non-terminals S and C.\n(c) Construct the SLR(1) parsing table and check for shift-reduce or reduce-reduce conflicts.',
        marks: 15,
        subparts: [
          '(a) LR(0) item set closure and goto transitions [6 Marks]',
          '(b) FIRST and FOLLOW computation [4 Marks]',
          '(c) Action and Goto table construction [5 Marks]'
        ],
        modelAnswer: '(a) Canonical LR(0) collection contains I0 through I6 constructed via closure and goto.\n(b) FIRST(C) = {c, d}, FIRST(S) = {c, d}. FOLLOW(S) = {$}, FOLLOW(C) = {c, d, $}.\n(c) Table filled with shift (s_i), reduce (r_j) based on FOLLOW sets. No cell has multiple entries, confirming grammar is SLR(1).'
      }
    ]
  },

  // =======================================================================
  // 10. SOFTWARE ENGINEERING
  // =======================================================================
  se: {
    mcqs: [
      {
        text: 'In Agile Scrum framework, what is the maximum recommended duration for a Daily Standup meeting?',
        options: ['A) 15 Minutes', 'B) 30 Minutes', 'C) 45 Minutes', 'D) 1 Hour'],
        correct: 'A) 15 Minutes',
        explanation: 'Scrum specifies daily standups must be time-boxed to strictly 15 minutes to keep status updates concise.',
        marks: 1
      },
      {
        text: 'Which software testing method tests individual units with knowledge of internal source code logic?',
        options: ['A) Black Box Testing', 'B) White Box Testing', 'C) Alpha Testing', 'D) Acceptance Testing'],
        correct: 'B) White Box Testing',
        explanation: 'White box testing (structural testing) examines internal control flow, branches, paths, and conditions in code.',
        marks: 1
      },
      {
        text: 'McCabe Cyclomatic Complexity M for a control flow graph with E edges, N nodes, and P connected components is:',
        options: ['A) M = E - N + 2P', 'B) M = E + N - P', 'C) M = N - E + P', 'D) M = 2E - N'],
        correct: 'A) M = E - N + 2P',
        explanation: 'McCabe cyclomatic complexity formula is M = E - N + 2P, or number of predicate nodes + 1.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'COCOMO Software Cost Estimation Model',
        text: 'Explain the Basic COCOMO model. A project is estimated at 50 KLOC for an Organic mode system (a=2.4, b=1.05). Calculate Effort in Person-Months.',
        marks: 5,
        modelAnswer: 'Basic COCOMO estimates Effort = a * (KLOC)^b Person-Months.\nEffort = 2.4 * (50)^1.05 ≈ 2.4 * 60.75 ≈ 145.8 Person-Months.'
      }
    ],
    longQuestions: [
      {
        title: 'Software Development Life Cycle & Agile Engineering',
        text: 'Compare and contrast Waterfall, Spiral, and Agile Scrum SDLC methodologies.\n(a) Analyze risk management in Spiral model versus Scrum sprints.\n(b) Detail the components of an IEEE 830 compliant Software Requirement Specification (SRS).\n(c) Describe CI/CD pipeline integration and automated regression testing.',
        marks: 15,
        subparts: [
          '(a) Comparative analysis of SDLC models [5 Marks]',
          '(b) IEEE 830 SRS anatomy [5 Marks]',
          '(c) CI/CD DevSecOps automation [5 Marks]'
        ],
        modelAnswer: '(a) Waterfall is rigid and sequential. Spiral prioritizes explicit risk assessment cycles. Agile Scrum enables iterative, sprint-based customer feedback loops.\n(b) IEEE 830 defines Functional Requirements, Non-Functional (performance, security, usability), Design Constraints, and Acceptance Criteria.\n(c) Continuous Integration merges code daily with automated linting and unit testing, while Continuous Deployment pushes verified artifacts to staging/production.'
      }
    ]
  },

  // =======================================================================
  // 11. OBJECT-ORIENTED PROGRAMMING (JAVA / OOPS)
  // =======================================================================
  java: {
    mcqs: [
      {
        text: 'In Java, which memory area stores class metadata, static variables, and method bytecode?',
        options: ['A) Java Virtual Machine Stack', 'B) Metaspace (Method Area)', 'C) Young Generation Heap', 'D) Native Stack'],
        correct: 'B) Metaspace (Method Area)',
        explanation: 'In Java 8+, Metaspace (replacing PermGen) stores class definitions, runtime constant pool, and static fields in native memory.',
        marks: 1
      },
      {
        text: 'What happens when a thread calls wait() on an object in Java?',
        options: ['A) Thread terminates immediately', 'B) Thread releases the object monitor lock and enters waiting state', 'C) Thread keeps running while holding lock', 'D) Causes runtime exception'],
        correct: 'B) Thread releases the object monitor lock and enters waiting state',
        explanation: 'wait() releases the synchronized monitor lock and suspends the thread until another thread invokes notify() or notifyAll().',
        marks: 1
      },
      {
        text: 'Which Java collection permits null values and maintains key insertion order?',
        options: ['A) TreeMap', 'B) LinkedHashMap', 'C) Hashtable', 'D) ConcurrentHashMap'],
        correct: 'B) LinkedHashMap',
        explanation: 'LinkedHashMap maintains a doubly-linked list running through its entries, preserving insertion order while allowing null keys and values.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Java Exception Hierarchy & Checked vs Unchecked',
        text: 'Explain the difference between Checked and Unchecked exceptions in Java with class hierarchy and code examples.',
        marks: 5,
        modelAnswer: 'All exceptions extend Throwable. Checked exceptions extend Exception (excluding RuntimeException) and must be caught or declared (e.g. IOException, SQLException). Unchecked exceptions extend RuntimeException (e.g. NullPointerException, ArithmeticException) and occur at runtime due to programmer bugs.'
      }
    ],
    longQuestions: [
      {
        title: 'Java Concurrency, Thread Pools & Synchronization',
        text: 'Explain multi-threaded programming in Java:\n(a) Differentiate between synchronized methods, synchronized blocks, and ReentrantLock.\n(b) Write a Producer-Consumer pattern using BlockingQueue or wait()/notify().\n(c) Describe the Java ExecutorService framework and differences between FixedThreadPool and CachedThreadPool.',
        marks: 15,
        subparts: [
          '(a) Synchronization primitives comparison [5 Marks]',
          '(b) Producer-Consumer implementation [5 Marks]',
          '(c) ExecutorService architecture [5 Marks]'
        ],
        modelAnswer: '(a) synchronized keyword uses intrinsic monitor locks. ReentrantLock offers advanced features like timed lock acquisition, fair locking, and interruptible locks.\n(b) Producer inserts items, calling wait() when buffer full. Consumer removes items, calling notify() to awake producer.\n(c) FixedThreadPool maintains constant worker threads, queuing tasks. CachedThreadPool creates new threads as needed and reclaims idle threads.'
      }
    ]
  },

  // =======================================================================
  // 12. CLOUD COMPUTING & DISTRIBUTED SYSTEMS
  // =======================================================================
  cloud: {
    mcqs: [
      {
        text: 'According to the CAP Theorem, in a distributed asynchronous network that suffers network partitions (P), a system can guarantee at most:',
        options: ['A) Both Consistency (C) and Availability (A)', 'B) Either Consistency (C) or Availability (A), but not both', 'C) High throughput only', 'D) Zero latency'],
        correct: 'B) Either Consistency (C) or Availability (A), but not both',
        explanation: 'When network partitions inevitably occur, a distributed database must choose between remaining consistent (rejecting writes) or available (accepting stale writes).',
        marks: 1
      },
      {
        text: 'Which Kubernetes component schedules pods onto worker nodes based on resource constraints?',
        options: ['A) kube-proxy', 'B) kube-scheduler', 'C) kubelet', 'D) etcd'],
        correct: 'B) kube-scheduler',
        explanation: 'kube-scheduler monitors unscheduled pods and assigns them to optimal nodes based on CPU/RAM requirements and affinity rules.',
        marks: 1
      },
      {
        text: 'In cloud virtualization, what is the role of a Type-1 Hypervisor (Bare-Metal)?',
        options: ['A) Runs as an application inside Windows/macOS', 'B) Runs directly on host hardware without an underlying OS', 'C) Translates SQL queries', 'D) Compiles Java bytecode'],
        correct: 'B) Runs directly on host hardware without an underlying OS',
        explanation: 'Type-1 hypervisors (e.g. VMware ESXi, KVM) execute directly on physical server hardware for maximum performance and security.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'IaaS, PaaS, and SaaS Shared Responsibility Model',
        text: 'Contrast Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Detail who manages OS, runtime, and data.',
        marks: 5,
        modelAnswer: 'IaaS (e.g. AWS EC2): Provider manages hardware, user manages OS, runtime, and app. PaaS (e.g. Google App Engine): Provider manages OS and runtime, user deploys code and data. SaaS (e.g. Google Docs): Provider manages full stack, user only consumes software.'
      }
    ],
    longQuestions: [
      {
        title: 'Distributed Systems & MapReduce Paradigm',
        text: 'Explain distributed data processing:\n(a) Detail the Map, Shuffle/Sort, and Reduce phases of the MapReduce algorithm.\n(b) Write pseudocode for a distributed Word Count application.\n(c) Explain how distributed consensus algorithms (Paxos / Raft) achieve fault-tolerant state machine replication.',
        marks: 15,
        subparts: [
          '(a) MapReduce architecture and phase execution [5 Marks]',
          '(b) Word count Map and Reduce pseudocode [5 Marks]',
          '(c) Raft consensus leader election and log replication [5 Marks]'
        ],
        modelAnswer: '(a) Map takes raw input splits and emits (key, value) pairs. Shuffle groups all values by key across cluster nodes. Reduce aggregates values per key.\n(b) Map(k, text): for each word in text emit(word, 1). Reduce(word, counts): emit(word, sum(counts)).\n(c) Raft elects a leader via randomized election timeouts, replicates log entries sequentially, and commits entries only after majority quorum confirmation.'
      }
    ]
  },

  // =======================================================================
  // 13. FULL-STACK WEB TECHNOLOGIES
  // =======================================================================
  web: {
    mcqs: [
      {
        text: 'In JavaScript, which task queue executes microtasks (such as Promise.then callbacks and queueMicrotask)?',
        options: ['A) Macrotask Queue (Callback Queue)', 'B) Microtask Queue', 'C) Render Queue', 'D) Call Stack directly'],
        correct: 'B) Microtask Queue',
        explanation: 'The event loop empties the entire Microtask Queue immediately after the current call stack clears, before processing macrotasks (like setTimeout).',
        marks: 1
      },
      {
        text: 'What is the primary benefit of React Virtual DOM reconciliation algorithm (Fiber)?',
        options: ['A) Eliminates JavaScript execution', 'B) Minimizes expensive real DOM mutations via diffing and batched updates', 'C) Directly compiles to WebAssembly', 'D) Replaces CSS stylesheets'],
        correct: 'B) Minimizes expensive real DOM mutations via diffing and batched updates',
        explanation: 'React compares virtual trees and calculates minimal batch mutations to the real browser DOM, avoiding reflow penalties.',
        marks: 1
      },
      {
        text: 'In JWT (JSON Web Token) authentication, where is the cryptographic signature generated?',
        options: ['A) Encrypting header with public key', 'B) Hashing (Header + "." + Payload) using secret key (HMAC) or private key', 'C) Client browser cookies', 'D) DNS records'],
        correct: 'B) Hashing (Header + "." + Payload) using secret key (HMAC) or private key',
        explanation: 'Signature = HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret).',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'RESTful API Principles and HTTP Status Codes',
        text: 'Explain the 5 core constraints of REST architecture. Differentiate between HTTP 200, 201, 400, 401, 403, and 500 status codes.',
        marks: 5,
        modelAnswer: 'REST constraints: Stateless, Client-Server, Cacheable, Uniform Interface, Layered System.\nStatus Codes: 200 OK (Success), 201 Created (Resource made), 400 Bad Request (Client syntax error), 401 Unauthorized (Missing auth), 403 Forbidden (Insufficient permissions), 500 Internal Server Error (Backend crash).'
      }
    ],
    longQuestions: [
      {
        title: 'Modern Front-End State Management & Web Security',
        text: 'Discuss modern full-stack web architecture:\n(a) Explain React component lifecycle and custom Hooks (useEffect, useMemo, useCallback).\n(b) Detail Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) vulnerabilities and their standard defense mitigations.\n(c) Compare WebSockets and Server-Sent Events (SSE) for real-time bidirectional communication.',
        marks: 15,
        subparts: [
          '(a) React Hook performance optimization [5 Marks]',
          '(b) XSS and CSRF attack vectors and mitigation [5 Marks]',
          '(c) WebSockets vs SSE protocol comparison [5 Marks]'
        ],
        modelAnswer: '(a) useEffect manages side effects, useMemo caches expensive computation values, useCallback memoizes function callbacks to prevent child re-renders.\n(b) XSS: Attackers inject malicious scripts; mitigate with Content Security Policy (CSP), HTML escaping, HttpOnly cookies. CSRF: Tricks authenticated users into executing unauthorized requests; mitigate using anti-CSRF SameSite cookies and verification tokens.\n(c) WebSockets provide full-duplex TCP communication. SSE provides lightweight server-to-client unidirectional streaming over standard HTTP.'
      }
    ]
  },

  // =======================================================================
  // 14. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING (AI/ML)
  // =======================================================================
  aiml: {
    mcqs: [
      {
        text: 'In the A* heuristic search algorithm, which condition guarantees that the algorithm finds the optimal path?',
        options: ['A) Heuristic h(n) = 0 always', 'B) Heuristic h(n) is admissible (never overestimates true cost to goal)', 'C) Depth-first traversal', 'D) Negative edge weights'],
        correct: 'B) Heuristic h(n) is admissible (never overestimates true cost to goal)',
        explanation: 'Admissibility h(n) <= h*(n) guarantees that A* tree search will never overlook an optimal goal.',
        marks: 1
      },
      {
        text: 'In Logistic Regression, which activation function maps any real-valued number into a probability between 0 and 1?',
        options: ['A) ReLU', 'B) Sigmoid (Logistic Function)', 'C) Softplus', 'D) Linear'],
        correct: 'B) Sigmoid (Logistic Function)',
        explanation: 'Sigmoid σ(z) = 1 / (1 + e^(-z)) squashes real outputs into the range (0, 1) representing probability.',
        marks: 1
      },
      {
        text: 'Which classification metric is the Harmonic Mean of Precision and Recall?',
        options: ['A) Accuracy', 'B) F1-Score', 'C) ROC-AUC', 'D) Specificity'],
        correct: 'B) F1-Score',
        explanation: 'F1 = 2 * (Precision * Recall) / (Precision + Recall).',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Bias-Variance Tradeoff & Regularization',
        text: 'Explain underfitting and overfitting in terms of the Bias-Variance tradeoff. How do L1 (Lasso) and L2 (Ridge) regularization help mitigate overfitting?',
        marks: 5,
        modelAnswer: 'High bias causes underfitting (model too simplistic). High variance causes overfitting (model memorizes noise).\nL1 (Lasso) adds λ * sum(|w_i|) penalty, driving coefficients to zero for feature selection.\nL2 (Ridge) adds λ * sum(w_i^2) penalty, shrinking weights continuously to prevent runaway sensitivity.'
      }
    ],
    longQuestions: [
      {
        title: 'Multilayer Perceptron & Backpropagation Mathematics',
        text: 'Consider a feedforward neural network with input layer x, hidden layer h with sigmoid activation, and output layer y with Mean Squared Error loss L:\n(a) Write forward propagation equations for activations and loss.\n(b) Apply the calculus chain rule to derive weight gradient updates ∂L/∂W2 and ∂L/∂W1.\n(c) Explain vanishing gradient problem and how ReLU activation solves it.',
        marks: 15,
        subparts: [
          '(a) Forward propagation equations [4 Marks]',
          '(b) Gradient derivation using chain rule [6 Marks]',
          '(c) Vanishing gradient analysis and modern activations [5 Marks]'
        ],
        modelAnswer: '(a) z1 = W1 x + b1, a1 = σ(z1). z2 = W2 a1 + b2, y_hat = σ(z2). Loss L = (1/2)(y - y_hat)^2.\n(b) ∂L/∂W2 = (∂L/∂y_hat) * (∂y_hat/∂z2) * (∂z2/∂W2) = -(y - y_hat) * σ\'(z2) * a1^T.\n∂L/∂W1 propagates error delta backwards: δ1 = (W2^T δ2) ⊙ σ\'(z1), ∂L/∂W1 = δ1 x^T.\n(c) Sigmoid derivative max is 0.25. In deep networks, multiplying numbers < 0.25 decays gradients exponentially. ReLU f(x)=max(0,x) has derivative 1 for x>0, maintaining robust gradient flow.'
      }
    ]
  },

  // =======================================================================
  // 15. CYBER SECURITY & CRYPTOGRAPHY
  // =======================================================================
  security: {
    mcqs: [
      {
        text: 'In the RSA public-key cryptographic algorithm, what mathematical problem ensures security against private key derivation?',
        options: ['A) Discrete Logarithm problem', 'B) Prime factorization of large composite integers n = p * q', 'C) Shortest vector problem', 'D) Knapsack problem'],
        correct: 'B) Prime factorization of large composite integers n = p * q',
        explanation: 'RSA security relies on the hardness of factoring the modulus n into its constituent prime factors p and q.',
        marks: 1
      },
      {
        text: 'Which cryptographic hash algorithm produces a 256-bit fixed-length message digest?',
        options: ['A) MD5', 'B) SHA-1', 'C) SHA-256', 'D) DES'],
        correct: 'C) SHA-256',
        explanation: 'SHA-256 (part of SHA-2 family) outputs a 256-bit (32-byte) cryptographic digest.',
        marks: 1
      },
      {
        text: 'What type of cyber attack inserts unauthorized database queries through unsanitized user web form input?',
        options: ['A) Buffer Overflow', 'B) SQL Injection (SQLi)', 'C) Man-In-The-Middle (MITM)', 'D) DNS Poisoning'],
        correct: 'B) SQL Injection (SQLi)',
        explanation: 'SQL Injection manipulates SQL syntax via malicious input (e.g. \' OR 1=1 --) to bypass authentication or extract table data.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Diffie-Hellman Key Exchange Protocol',
        text: 'Explain Diffie-Hellman key exchange over public parameters: prime p = 23 and primitive root g = 5. If Alice picks private a = 6 and Bob picks private b = 15, compute the shared secret key.',
        marks: 5,
        modelAnswer: 'Step 1: Alice computes public A = g^a mod p = 5^6 mod 23 = 15625 mod 23 = 8.\nStep 2: Bob computes public B = g^b mod p = 5^15 mod 23 = 19.\nStep 3: Shared key K = B^a mod p = 19^6 mod 23 = 2.\nBob computes K = A^b mod p = 8^15 mod 23 = 2.\nBoth share secret key 2 without transmitting it over the wire.'
      }
    ],
    longQuestions: [
      {
        title: 'Symmetric vs Asymmetric Cryptography & Digital Signatures',
        text: 'Explain public-key infrastructure:\n(a) Compare AES (Symmetric) and RSA (Asymmetric) in terms of key length, speed, and use cases.\n(b) Detail how Digital Signatures achieve Authentication, Integrity, and Non-Repudiation.\n(c) Explain SSL/TLS handshake protocol and certificate validation.',
        marks: 15,
        subparts: [
          '(a) AES vs RSA comparison table [5 Marks]',
          '(b) Digital signature creation and verification [5 Marks]',
          '(c) TLS 1.3 cryptographic handshake [5 Marks]'
        ],
        modelAnswer: '(a) AES uses identical secret key for encryption/decryption, high throughput. RSA uses public/private keypair, computationally heavy.\n(b) Sender hashes document, encrypts digest with private key to make signature. Receiver decrypts signature with sender public key and verifies hash.\n(c) Client Hello -> Server Hello (with Certificate) -> Key Exchange (ECDHE) -> Handshake Finish -> Encrypted Application Traffic.'
      }
    ]
  },

  // =======================================================================
  // 16. INTERNET OF THINGS (IoT)
  // =======================================================================
  iot: {
    mcqs: [
      {
        text: 'Which lightweight publish/subscribe protocol is designed specifically for constrained IoT devices over TCP?',
        options: ['A) HTTP/1.1', 'B) MQTT', 'C) SNMP', 'D) FTP'],
        correct: 'B) MQTT',
        explanation: 'MQTT (Message Queuing Telemetry Transport) uses a lightweight 2-byte fixed header and publish-subscribe broker architecture.',
        marks: 1
      },
      {
        text: 'In IoT systems, what is the role of an Analog-to-Digital Converter (ADC)?',
        options: ['A) Converts analog physical sensor voltages into discrete digital values', 'B) Powers microcontrollers', 'C) Encrypts Wi-Fi signals', 'D) Boosts motor current'],
        correct: 'A) Converts analog physical sensor voltages into discrete digital values',
        explanation: 'ADCs sample continuous analog voltages from sensors (temperature, light) into digital binary words for CPU processing.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'MQTT Quality of Service (QoS) Levels',
        text: 'Explain the three MQTT QoS delivery levels: QoS 0 (At most once), QoS 1 (At least once), and QoS 2 (Exactly once).',
        marks: 5,
        modelAnswer: 'QoS 0: Fire and forget without acknowledgment; packet may be lost. QoS 1: Guarantees delivery via PUBACK, but may deliver duplicates if ack lost. QoS 2: Four-step handshake (PUBLISH -> PUBREC -> PUBREL -> PUBCOMP) guaranteeing message is delivered exactly once.'
      }
    ],
    longQuestions: [
      {
        title: 'IoT 4-Layer Architecture & Edge Computing',
        text: 'Explain IoT engineering design:\n(a) Describe the 4-layer IoT architecture (Perception, Network, Edge/Middleware, Application).\n(b) Compare LoRaWAN, Zigbee, and Wi-Fi for sensor deployment in smart agriculture.\n(c) Describe Edge Computing and explain how local inference reduces cloud bandwidth and latency.',
        marks: 15,
        subparts: [
          '(a) 4-Layer IoT architecture details [5 Marks]',
          '(b) Wireless communication standards trade-offs [5 Marks]',
          '(c) Edge computing AI processing [5 Marks]'
        ],
        modelAnswer: '(a) Perception Layer gathers physical data via sensors. Network Layer transmits data. Middleware handles processing, device registry, and storage. Application delivers dashboards.\n(b) LoRaWAN: Low power, long range (10 km), low data rate. Zigbee: Short range mesh network (10-100 m). Wi-Fi: High bandwidth, high power consumption.\n(c) Edge computing processes sensor telemetry locally on edge gateways (e.g. Raspberry Pi), executing machine learning filtering to eliminate continuous high-bandwidth cloud transmissions.'
      }
    ]
  },

  // =======================================================================
  // 17. DEEP LEARNING & NEURAL ARCHITECTURES
  // =======================================================================
  deep_learning: {
    mcqs: [
      {
        text: 'In a Convolutional Neural Network (CNN), what is the primary role of a Max Pooling layer?',
        options: ['A) Increase the number of channels', 'B) Downsample feature maps and achieve translational invariance', 'C) Add non-linearity through activation', 'D) Calculate cross-entropy loss'],
        correct: 'B) Downsample feature maps and achieve translational invariance',
        explanation: 'Max pooling reduces spatial dimensions (height and width), reducing computational parameters while preserving dominant features.',
        marks: 1
      },
      {
        text: 'In the Transformer architecture, what formula computes Scaled Dot-Product Attention?',
        options: ['A) Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V', 'B) Attention(Q, K, V) = Q * K * V', 'C) Attention(Q, K, V) = tanh(W * [Q, K]) * V', 'D) Attention(Q, K, V) = ReLU(Q * K^T)'],
        correct: 'A) Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V',
        explanation: 'Standard Transformer attention scales dot products of Query and Key by sqrt(d_k) to prevent gradients from vanishing into extreme softmax saturation regions.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'LSTM Architecture & Vanishing Gradients',
        text: 'Explain how Long Short-Term Memory (LSTM) networks solve the vanishing gradient problem in standard RNNs using forget, input, and output gates.',
        marks: 5,
        modelAnswer: 'Standard RNNs suffer from vanishing gradients when backpropagating through long time steps. LSTMs introduce a linear Cell State path where gradients can flow unhindered. Gates regulate information: Forget Gate f_t decides what to discard from cell state, Input Gate i_t updates new candidate values, and Output Gate o_t controls what portion of cell state is emitted to hidden state.'
      }
    ],
    longQuestions: [
      {
        title: 'Convolutional & Transformer Deep Learning Architectures',
        text: 'Analyze modern deep learning systems:\n(a) Calculate output dimensions and parameter count for a conv layer with input 32x32x3, 16 filters of size 5x5, stride 1, padding 2.\n(b) Detail Multi-Head Self-Attention in Transformers and explain positional encodings.\n(c) Compare SGD with Momentum, RMSProp, and Adam optimizers.',
        marks: 15,
        subparts: [
          '(a) Conv layer arithmetic and parameter counts [5 Marks]',
          '(b) Transformer Multi-Head attention mechanism [5 Marks]',
          '(c) Gradient descent optimization algorithms comparison [5 Marks]'
        ],
        modelAnswer: '(a) Output size = ((W - K + 2P)/S) + 1 = ((32 - 5 + 4)/1) + 1 = 32x32. Channels = 16. Output: 32x32x16. Parameters = (5 * 5 * 3 + 1) * 16 = 76 * 16 = 1216 parameters.\n(b) Multi-Head Attention projects Q, K, V into h different subspaces, running attention in parallel to capture diverse syntactic relationships. Positional encodings provide order awareness since Transformers lack recurrence.\n(c) Adam combines Momentum (first moment of gradients) and RMSProp (second moment of squared gradients), adaptively scaling learning rates for each parameter.'
      }
    ]
  },

  // =======================================================================
  // 18. BLOCKCHAIN TECHNOLOGY & DISTRIBUTED LEDGERS
  // =======================================================================
  blockchain: {
    mcqs: [
      {
        text: 'In Bitcoin and Ethereum, what data structure efficiently verifies that a transaction is included in a block with logarithmic O(log N) proofs?',
        options: ['A) Linked List', 'B) Merkle Tree', 'C) B+ Tree', 'D) Skip List'],
        correct: 'B) Merkle Tree',
        explanation: 'Merkle trees hash transaction pairs recursively up to a single Merkle Root, allowing lightweight clients to verify transactions via Merkle Paths in O(log N).',
        marks: 1
      },
      {
        text: 'What consensus mechanism relies on validator nodes locking up cryptocurrency as collateral rather than performing intensive computational work?',
        options: ['A) Proof of Work (PoW)', 'B) Proof of Stake (PoS)', 'C) Proof of Authority (PoA)', 'D) Practical Byzantine Fault Tolerance'],
        correct: 'B) Proof of Stake (PoS)',
        explanation: 'PoS selects validators proportionally to their economic stake, slashing their deposit if malicious activity is detected.',
        marks: 1
      }
    ],
    shortQuestions: [
      {
        title: 'Smart Contracts & Ethereum Gas Mechanics',
        text: 'What is a Smart Contract in Ethereum? Explain the concept of Gas, Gas Limit, and Gas Price, and how they prevent infinite loops.',
        marks: 5,
        modelAnswer: 'A smart contract is self-executing code stored at an address on the blockchain. Every EVM instruction costs a deterministic unit of "Gas". Gas Limit is maximum gas the user authorizes. Gas Price is amount of Ether per unit gas. If computation exhausts the gas limit, execution halts with Out of Gas, reverting state and preventing infinite loop denial-of-service.'
      }
    ],
    longQuestions: [
      {
        title: 'Consensus Protocols & Blockchain Security',
        text: 'Explain blockchain fundamentals:\n(a) Describe the Byzantine Generals Problem and how Satoshi Nakamoto solved it using Proof of Work and longest-chain rule.\n(b) Explain a 51% attack and double-spending vulnerabilities.\n(c) Detail how Zero-Knowledge Proofs (zk-SNARKs) provide privacy in decentralized ledgers.',
        marks: 15,
        subparts: [
          '(a) Byzantine Generals problem and PoW solution [5 Marks]',
          '(b) 51% double-spending attack mechanics [5 Marks]',
          '(c) Zero-Knowledge cryptography [5 Marks]'
        ],
        modelAnswer: '(a) Byzantine Generals problem addresses reaching consensus over an unreliable network with malicious actors. Nakamoto consensus ties voting power to computational work (hash power), enforcing that the longest chain with accumulated proof of work represents ground truth.\n(b) If an attacker controls >50% of network hash rate, they can privately mine an alternative longer chain, spending coins on the public chain, then broadcasting their longer chain to orphan the public blocks and double-spend.\n(c) zk-SNARKs allow a prover to mathematically prove to a verifier that a statement is true (e.g. valid transaction balance) without disclosing the transaction amount or sender/receiver identity.'
      }
    ]
  }
};

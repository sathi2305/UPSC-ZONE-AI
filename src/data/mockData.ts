import {
  PrelimsQuestion,
  PYQuestion,
  CurrentAffairArticle,
  Flashcard,
  SyllabusItem,
  KnowledgeNode,
  ResourceItem,
  AspirantProfile
} from '../types';

export const initialAspirantProfile: AspirantProfile = {
  name: 'Aspirant',
  targetYear: '2026',
  optionalSubject: 'Public Administration',
  dailyStudyHours: 8,
  preparationStage: 'Consolidation',
  totalDaysStreak: 19,
  syllabusProgressPct: 68,
};

export const samplePrelimsQuestions: PrelimsQuestion[] = [
  {
    id: 'pq-1',
    subject: 'Indian Polity',
    subtopic: 'Writs & Fundamental Rights',
    year: '2024 Pattern',
    difficulty: 'UPSC Tough',
    question: `With reference to Writs in the Indian Constitution, consider the following statements:
1. The writ of Mandamus can be issued against both private and public bodies when performing a public duty.
2. The writ of Quo-Warranto can be sought only by an aggrieved person who has personal interest in the office.
3. The writ of Habeas Corpus can be issued against both public authorities and private individuals.

Which of the statements given above is/are correct?`,
    options: [
      '1 and 2 only',
      '3 only',
      '1 and 3 only',
      '1, 2 and 3'
    ],
    correctOptionIndex: 1,
    explanation: `Statement 1 is incorrect: Mandamus cannot be issued against a private individual or body, unless they are entrusted with a statutory public duty. Generally, Mandamus is issued against public officials, inferior courts, or governments to perform an obligatory public duty.
Statement 2 is incorrect: Quo-Warranto is an exception to the principle of locus standi; any interested citizen can file it, not just the aggrieved person.
Statement 3 is correct: Habeas Corpus ('to have the body of') can be issued against both public authorities (illegal executive detention) and private individuals (illegal private confinement).`,
    keyTakeaway: `Article 32 allows the Supreme Court and Article 226 allows High Courts to issue 5 distinct constitutional writs. Habeas Corpus alone is enforceable against private persons.`,
    syllabusTag: 'GS 2: Constitution & Fundamental Rights (Art 32 & 226)'
  },
  {
    id: 'pq-2',
    subject: 'Indian Economy',
    subtopic: 'Monetary Policy & Inflation',
    year: '2023 Pattern',
    difficulty: 'Moderate',
    question: `Consider the following statements regarding the Monetary Policy Committee (MPC) of India:
1. It is a statutory body constituted under the Reserve Bank of India Act, 1934.
2. The Governor of the RBI acts as the ex-officio Chairperson of the MPC and holds a casting vote in case of a tie.
3. The inflation target under the Flexible Inflation Targeting framework is determined independently by the MPC members without government consultation.

Which of the statements given above is/are correct?`,
    options: [
      '1 and 2 only',
      '2 only',
      '2 and 3 only',
      '1, 2 and 3'
    ],
    correctOptionIndex: 0,
    explanation: `Statement 1 is correct: The MPC is a statutory and institutionalized framework under Section 45ZB of the amended RBI Act, 1934.
Statement 2 is correct: The RBI Governor is the ex-officio Chairperson and enjoys a second or casting vote in case of equality of votes (3-3 tie).
Statement 3 is incorrect: Under Section 45ZA, the inflation target (4% +/- 2%) is set by the Central Government in consultation with the Reserve Bank once every five years, not independently by the MPC.`,
    keyTakeaway: `The MPC has 6 members: 3 from RBI and 3 external appointed by the Union Government. It meets at least 4 times a year to decide the repo rate.`,
    syllabusTag: 'GS 3: Indian Economy & Issues Relating to Planning, Mobilization of Resources'
  },
  {
    id: 'pq-3',
    subject: 'Environment & Ecology',
    subtopic: 'Wildlife Protection & Wetlands',
    year: '2024 Pattern',
    difficulty: 'UPSC Tough',
    question: `With reference to the Wildlife (Protection) Amendment Act, 2022, consider the following statements:
1. It rationalized the number of Schedules from six to four.
2. It created a specific schedule for specimen species listed in the Appendices of CITES.
3. It completely abolished the power of the Chief Wildlife Warden to permit control or management of wild animals.

Which of the statements given above is/are correct?`,
    options: [
      '1 and 2 only',
      '2 and 3 only',
      '1 only',
      '1, 2 and 3'
    ],
    correctOptionIndex: 0,
    explanation: `Statement 1 is correct: The 2022 amendment reduced the number of schedules from 6 to 4 (Schedule I: highest protection; Schedule II: lesser protection; Schedule III: protected plants; Schedule IV: specimens listed in the Appendices under CITES). Vermin schedule was eliminated.
Statement 2 is correct: Schedule IV was specially designated for species regulated under CITES.
Statement 3 is incorrect: The Chief Wildlife Warden still retains powers under Section 11 to permit hunting/capturing of animals that have become dangerous to human life or disabled beyond recovery.`,
    keyTakeaway: `The 2022 amendment aligns Indian domestic wildlife law directly with CITES international obligations and streamlines invasive species management.`,
    syllabusTag: 'GS 3: Biodiversity, Environmental Legislation'
  },
  {
    id: 'pq-4',
    subject: 'Modern Indian History',
    subtopic: 'Freedom Struggle & Peasant Movements',
    year: '2022 Pattern',
    difficulty: 'Moderate',
    question: `Consider the following historical events during the Indian National Movement:
1. Champaran Satyagraha
2. Kheda Satyagraha
3. Ahmedabad Mill Strike
4. Rowlatt Satyagraha

What is the correct chronological sequence of the above events from earliest to latest?`,
    options: [
      '1 — 2 — 3 — 4',
      '1 — 3 — 2 — 4',
      '3 — 1 — 2 — 4',
      '1 — 2 — 4 — 3'
    ],
    correctOptionIndex: 1,
    explanation: `Chronology of Gandhi's early movements:
1. Champaran Satyagraha (April 1917) - First Civil Disobedience in Bihar against Tinkathia system.
2. Ahmedabad Mill Strike (February-March 1918) - First Hunger Strike over plague bonus dispute.
3. Kheda Satyagraha (March 1918) - First Non-Cooperation due to crop failure and revenue remission denial.
4. Rowlatt Satyagraha (April 1919) - First all-India mass strike against the Anarchical and Revolutionary Crimes Act.
Hence, 1 -> 3 -> 2 -> 4 is correct.`,
    keyTakeaway: `Mnemonic: C-A-K-E (Champaran, Ahmedabad, Kheda) followed by Rowlatt & Khilafat/NCM.`,
    syllabusTag: 'GS 1: Modern Indian History - Freedom Struggle'
  },
  {
    id: 'pq-5',
    subject: 'Geography',
    subtopic: 'Indian Physical Geography & Drainage',
    year: '2023 Pattern',
    difficulty: 'UPSC Tough',
    question: `Consider the following pairs of Rivers and their Tributaries:
1. Godavari: Pranhita, Manjira, Indravati
2. Krishna: Tungabhadra, Ghataprabha, Koyna
3. Cauvery: Kabini, Bhavani, Amaravati
4. Mahanadi: Tel, Ib, Hasdeo

Which of the pairs given above are correctly matched?`,
    options: [
      '1, 2 and 3 only',
      '2 and 4 only',
      '1, 3 and 4 only',
      '1, 2, 3 and 4'
    ],
    correctOptionIndex: 3,
    explanation: `All pairs are correctly matched:
1. Godavari tributaries: Pranhita (Penganga + Wainganga + Wardha), Manjira (right bank), Indravati, Sabari.
2. Krishna tributaries: Koyna, Tungabhadra, Ghataprabha, Malaprabha, Bhima, Musi.
3. Cauvery tributaries: Kabini, Bhavani, Amaravati, Hemavati, Arkavathi.
4. Mahanadi tributaries: Seonath, Hasdeo, Mand, Ib (left bank); Ong, Tel, Jonk (right bank).`,
    keyTakeaway: `Peninsular river drainage patterns and left/right bank tributaries are perennial UPSC Prelims favorites.`,
    syllabusTag: 'GS 1: Indian Drainage Systems & Physical Geography'
  }
];

export const samplePYQs: PYQuestion[] = [
  {
    id: 'pyq-2023-1',
    year: 2023,
    stage: 'Prelims',
    paper: 'General Studies 1',
    subject: 'Polity',
    topic: 'Due Process of Law',
    question: `In India, which one of the following constitutional interpretations best describes 'Due Process of Law'?`,
    options: [
      'The principle of natural justice',
      'The procedure established by law',
      'Fair application of law',
      'Equality before law'
    ],
    correctOption: 2,
    officialRationale: `In the landmark Maneka Gandhi case (1978), the Supreme Court interpreted Article 21 to mean that a law depriving a person of personal liberty must not merely follow legislative procedure, but must be 'just, fair, and reasonable', which represents the substantive essence of 'fair application of law' and natural justice.`,
    relatedConcepts: ['Article 21', 'Maneka Gandhi Case 1978', 'A.K. Gopalan Case 1950', 'Substantive Due Process']
  },
  {
    id: 'pyq-2022-2',
    year: 2022,
    stage: 'Prelims',
    paper: 'General Studies 1',
    subject: 'Environment',
    topic: 'Miyawaki Method',
    question: `The 'Miyawaki method' is well known for the:`,
    options: [
      'Promotion of commercial farming in arid and semi-arid areas',
      'Development of urban forests using native species in small spaces',
      'Development of genetically modified crops using gene editing',
      'Extraction of wind energy in coastal zones'
    ],
    correctOption: 1,
    officialRationale: `Pioneered by Japanese botanist Akira Miyawaki, this technique creates dense, multi-layered urban micro-forests with native trees that grow 10 times faster and 30 times denser than traditional plantations.`,
    relatedConcepts: ['Afforestation', 'Urban Heat Islands', 'Biodiversity Hotspots']
  },
  {
    id: 'pyq-2021-3',
    year: 2021,
    stage: 'Prelims',
    paper: 'General Studies 1',
    subject: 'Economy',
    topic: 'Money Multiplier',
    question: `The money multiplier in an economy increases with which one of the following?`,
    options: [
      'Increase in the Cash Reserve Ratio in the banks',
      'Increase in the Statutory Liquidity Ratio in the banks',
      'Increase in the banking habit of the people',
      'Increase in the population of the country'
    ],
    correctOption: 2,
    officialRationale: `Money multiplier is inversely related to reserve ratios (CRR, SLR) and the currency-deposit ratio. When people deposit more cash into commercial banks (increase in banking habit), banks have more loanable funds to create credit, expanding the overall money supply.`,
    relatedConcepts: ['High Powered Money (M0)', 'Broad Money (M3)', 'Credit Creation', 'CRR & SLR']
  },
  {
    id: 'pyq-2020-4',
    year: 2020,
    stage: 'Mains',
    paper: 'GS Paper 2',
    subject: 'Governance & Constitution',
    topic: 'Judicial Independence & Collegium',
    question: `Critically examine the procedures involved in the appointment of judges to the Supreme Court of India. Has the Collegium system succeeded in ensuring judicial independence while maintaining accountability? (15 Marks, 250 Words)`,
    officialRationale: `Key dimensions required: Three Judges Cases (1981, 1993, 1998), 99th Constitutional Amendment (NJAC) struck down in 2015, lack of transparency in memorandum of procedure, nepotism concerns versus executive interference, and proposed reforms such as judicial appointments commission with institutional safeguards.`,
    relatedConcepts: ['Article 124 & 217', 'NJAC Act 2014', 'Memorandum of Procedure (MoP)', '2nd ARC Recommendations'],
    marks: 15
  }
];

export const sampleCurrentAffairs: CurrentAffairArticle[] = [
  {
    id: 'ca-1',
    category: 'Polity & Governance',
    headline: 'Supreme Court on Sub-Classification of Scheduled Castes under Article 341',
    date: 'October 2024',
    source: 'The Hindu & LiveLaw Editorial',
    summary: 'A 7-judge Constitution bench affirmed state legislatures power to create sub-quotas within SC/ST categories to uplift the most marginalized subgroups, with specific criteria to prevent arbitrary exclusion.',
    upscRelevance: 'Directly linked to GS Paper 2 (Indian Constitution, Fundamental Rights, Federalism & Social Justice).',
    gsPaper: 'GS 2',
    keyTakeaways: [
      'Article 14 & 16 allow reasonable classification within backward classes to achieve substantive equality.',
      'Overruled E.V. Chinnaiah (2004) judgement.',
      'States must possess empirical data demonstrating backwardness before sub-categorization.'
    ],
    syllabusTopic: 'Indian Constitution: Articles 14, 15, 16, 341, 342; Social Justice'
  },
  {
    id: 'ca-2',
    category: 'Economy',
    headline: 'Unified Lending Interface (ULI) and Its Impact on Rural Credit Architecture',
    date: 'November 2024',
    source: 'Reserve Bank of India Bulletin / PIB',
    summary: 'RBI introduced the Unified Lending Interface (ULI) to facilitate friction-free credit delivery, particularly for agricultural MSMEs and small landholders, by aggregating disparate digital data points.',
    upscRelevance: 'GS Paper 3: Financial Inclusion, Digital Public Infrastructure (DPI), Agricultural Credit.',
    gsPaper: 'GS 3',
    keyTakeaways: [
      'Reduces turnaround time from days to minutes through plug-and-play APIs.',
      'Part of India Stack alongside UPI and Account Aggregator (AA) framework.',
      'Addresses credit rationing faced by tenant farmers lacking clear land titles.'
    ],
    syllabusTopic: 'GS 3: Mobilization of Resources, Financial Inclusion & Digital Public Infrastructure'
  },
  {
    id: 'ca-3',
    category: 'Environment',
    headline: 'COP29 Baku Climate Summit: New Collective Quantified Goal (NCQG) on Climate Finance',
    date: 'December 2024',
    source: 'Down to Earth & UNFCCC Press',
    summary: 'Global deliberations center on replacing the outdated $100 billion annual climate finance target with a predictable, grants-based mechanism tailored for vulnerable developing countries and the Global South.',
    upscRelevance: 'GS Paper 3: Environmental Conservation, Climate Change Conventions, Common But Differentiated Responsibilities (CBDR).',
    gsPaper: 'GS 3',
    keyTakeaways: [
      'NCQG seeks higher accountability and clear definition of climate finance versus commercial loans.',
      'India stresses CBDR-RC principle and historical emissions responsibility of Annex-I nations.',
      'Focus on adaptation funding vs mitigation debt traps.'
    ],
    syllabusTopic: 'GS 3: Environmental Pollution & Degradation, International Environmental Agreements'
  },
  {
    id: 'ca-4',
    category: 'International Relations',
    headline: 'India-Middle East-Europe Economic Corridor (IMEC) Strategic Significance',
    date: 'September 2024',
    source: 'Ministry of External Affairs / ORF',
    summary: 'IMEC aims to bolster economic development by fostering connectivity and economic integration between Asia, the Arabian Gulf, and Europe across maritime and railway transport grids.',
    upscRelevance: 'GS Paper 2: Bilateral, regional and global groupings and agreements involving India and affecting Indias interests.',
    gsPaper: 'GS 2',
    keyTakeaways: [
      'Counterbalance to Chinas Belt and Road Initiative (BRI) using rules-based green infrastructure.',
      'Two corridors: Eastern corridor connecting India to Gulf, Northern corridor connecting Gulf to Europe.',
      'Incorporate hydrogen pipelines, digital data cables, and electricity grids.'
    ],
    syllabusTopic: 'GS 2: Foreign Policy, Regional Trade Corridors, West Asia Geopolitics'
  }
];

export const sampleFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    subject: 'Polity',
    topic: 'Constitutional Amendments',
    front: 'Which Constitutional Amendment Acts introduced the Tenth Schedule (Anti-Defection Law) and limited council of ministers to 15%?',
    back: '1. 52nd Amendment Act (1985) introduced the 10th Schedule.\n2. 91st Amendment Act (2003) capped Council of Ministers to 15% of total Lok Sabha/Assembly strength and disqualified defectors from ministerial posts.',
    keyArticlesOrDates: 'Art. 75(1A), Art. 164(1A), 10th Schedule',
    confidence: 'medium'
  },
  {
    id: 'fc-2',
    subject: 'Economy',
    topic: 'Balance of Payments',
    front: 'What constitutes the Capital Account in India’s Balance of Payments (BoP)?',
    back: 'Foreign Direct Investment (FDI), Foreign Portfolio Investment (FPI), External Commercial Borrowings (ECB), NRI Deposits, Banking Capital, External Assistance (loans), and Short-term Trade Credits.',
    keyArticlesOrDates: 'Foreign Exchange Management Act (FEMA 1999)',
    confidence: 'high'
  },
  {
    id: 'fc-3',
    subject: 'History',
    topic: 'Modern History Acts',
    front: 'What were the key provisions of the Government of India Act, 1919 (Montagu-Chelmsford Reforms)?',
    back: '1. Introduced Dyarchy in the provinces (Transferred and Reserved subjects).\n2. Introduced Bicameralism at the Centre (Council of State & Legislative Assembly).\n3. Established Public Service Commission (implemented in 1926).\n4. Separated provincial budgets from Central budget.',
    keyArticlesOrDates: 'GoI Act 1919 (Mont-Ford)',
    confidence: 'low'
  },
  {
    id: 'fc-4',
    subject: 'Environment',
    topic: 'Biosphere Reserves in India',
    front: 'How many Biosphere Reserves are there in India and how many are recognized under UNESCO’s MAB Programme?',
    back: 'There are 18 Biosphere Reserves in India. Out of these, 12 are included in the World Network of Biosphere Reserves under UNESCO’s Man and the Biosphere (MAB) Programme (e.g. Nilgiri, Gulf of Mannar, Sundarbans, Panna).',
    keyArticlesOrDates: 'UNESCO MAB Programme (1971)',
    confidence: 'medium'
  },
  {
    id: 'fc-5',
    subject: 'Geography',
    topic: 'Atmospheric Circulation',
    front: 'Explain the difference between El Niño and La Niña and their typical impact on the Indian Summer Monsoon.',
    back: 'El Niño: Abnormal warming of sea surface temperatures in the Central/Eastern equatorial Pacific; often leads to deficient or drought conditions in Indian monsoon.\nLa Niña: Abnormal cooling of the equatorial Pacific; generally correlates with normal to above-normal Indian monsoon rainfall.',
    keyArticlesOrDates: 'ENSO (El Niño Southern Oscillation)',
    confidence: 'high'
  }
];

export const sampleKnowledgeNodes: KnowledgeNode[] = [
  {
    id: 'node-const',
    label: 'Constitution of India',
    category: 'Core Foundation',
    x: 400,
    y: 100,
    summary: 'The supreme organic law of India adopted on 26 Nov 1949 and enacted on 26 Jan 1950. Blends rigidity and flexibility.',
    articlesOrFacts: ['Preamble: Sovereign, Socialist, Secular, Democratic, Republic', '395 Articles, 22 Parts, 12 Schedules at inception', 'Lengthiest written constitution'],
    landmarkCasesOrEvents: ['Constituent Assembly (1946-1949)', 'Drafting Committee chaired by Dr. B.R. Ambedkar'],
    sampleQuestion: 'Discuss the philosophical foundations enshrined in the Preamble and their judicial enforceability.',
    connectedTo: ['node-fr', 'node-dpsp', 'node-parl', 'node-jud', 'node-fed']
  },
  {
    id: 'node-fr',
    label: 'Fundamental Rights (Part III)',
    category: 'Civil Liberties',
    x: 180,
    y: 260,
    summary: 'Enforceable rights against the State (Articles 12 to 35). Considered the Magna Carta of India.',
    articlesOrFacts: ['Art. 14-18: Equality', 'Art. 19-22: Freedom', 'Art. 23-24: Exploitation', 'Art. 25-28: Religion', 'Art. 32: Constitutional Remedies'],
    landmarkCasesOrEvents: ['A.K. Gopalan (1950)', 'Golaknath (1967)', 'Kesavananda Bharati (1973)', 'Maneka Gandhi (1978)', 'Puttaswamy (Right to Privacy 2017)'],
    sampleQuestion: 'How has the interpretation of Article 21 transformed from procedural due process to substantive justice?',
    connectedTo: ['node-const', 'node-dpsp', 'node-jud']
  },
  {
    id: 'node-dpsp',
    label: 'Directive Principles (Part IV)',
    category: 'Socio-Economic Welfare',
    x: 350,
    y: 340,
    summary: 'Non-justiciable ideals guiding state policy to establish a welfare state (Articles 36 to 51).',
    articlesOrFacts: ['Socialistic: Art. 38, 39, 41', 'Gandhian: Art. 40 (Panchayats), 43, 47, 48', 'Liberal-Intellectual: Art. 44 (UCC), 45, 48A, 50, 51'],
    landmarkCasesOrEvents: ['Champakam Dorairajan (1951)', 'Minerva Mills (1980 - Balance between FR & DPSP)'],
    sampleQuestion: 'Examine the constitutional tension and harmonious construction between Fundamental Rights and Directive Principles.',
    connectedTo: ['node-const', 'node-fr']
  },
  {
    id: 'node-parl',
    label: 'Union Parliament & Executive',
    category: 'Institutions',
    x: 620,
    y: 260,
    summary: 'Westminster parliamentary democracy with President as nominal head and Cabinet headed by Prime Minister as real executive.',
    articlesOrFacts: ['Art. 52-78: Union Executive', 'Art. 79-122: Parliament (Lok Sabha & Rajya Sabha)', 'Art. 110: Money Bills', 'Art. 112: Annual Financial Statement'],
    landmarkCasesOrEvents: ['R.C. Cooper (Bank Nationalization Ordinance 1970)', 'S.R. Bommai (Art. 356 review 1994)'],
    sampleQuestion: 'Assess the declining role of Parliamentary Standing Committees in legislative scrutiny in recent years.',
    connectedTo: ['node-const', 'node-jud', 'node-fed']
  },
  {
    id: 'node-jud',
    label: 'Union Judiciary (Supreme Court)',
    category: 'Judicial Oversight',
    x: 520,
    y: 430,
    summary: 'Integrated judicial hierarchy with Supreme Court as guarantor of Fundamental Rights and guardian of Constitution.',
    articlesOrFacts: ['Art. 124: Establishment', 'Art. 131: Original Jurisdiction', 'Art. 136: Special Leave Petition', 'Art. 142: Complete Justice', 'Art. 143: Advisory'],
    landmarkCasesOrEvents: ['First, Second, Third Judges Cases (1981, 1993, 1998)', 'NJAC Judgement (2015)', 'Sub-Classification (2024)'],
    sampleQuestion: 'Critically analyze the scope of Article 142 in doing complete justice versus the doctrine of judicial overreach.',
    connectedTo: ['node-const', 'node-fr', 'node-parl']
  },
  {
    id: 'node-fed',
    label: 'Federalism & Centre-State Relations',
    category: 'Constitutional Architecture',
    x: 240,
    y: 450,
    summary: 'Quasi-federal polity with unitary bias. Seventh Schedule demarcates legislative competence across Union, State, and Concurrent Lists.',
    articlesOrFacts: ['Part XI: Legislative & Administrative Relations', 'Part XII: Fiscal Relations', 'Art. 280: Finance Commission', 'Art. 279A: GST Council'],
    landmarkCasesOrEvents: ['Sarkaria Commission (1988)', 'Punchhi Commission (2010)', 'S.R. Bommai case (1994)'],
    sampleQuestion: 'Evaluate the cooperative federalism mechanisms in India with special reference to the GST Council.',
    connectedTo: ['node-const', 'node-parl']
  }
];

export const sampleSyllabusData: SyllabusItem[] = [
  {
    id: 'syl-1',
    paper: 'General Studies I',
    category: 'Indian Heritage & Culture',
    title: 'Indian culture: salient aspects of Art Forms, Literature and Architecture',
    subtopics: [
      'Visual Arts: Mauryan, Post-Mauryan, Gupta, Temple Architecture (Nagara, Dravida, Vesara)',
      'Performing Arts: Classical Dances of India, Folk Dances, Hindustani & Carnatic Music',
      'Literature: Vedic literature, Sangam literature, Bhakti-Sufi literature'
    ],
    completed: true,
    revisionStatus: 'Mastered'
  },
  {
    id: 'syl-2',
    paper: 'General Studies I',
    category: 'Modern History',
    title: 'Modern Indian history from the middle of the eighteenth century until the present',
    subtopics: [
      'Decline of Mughals, Carnatic Wars, Battle of Plassey & Buxar',
      'Revolt of 1857: causes, character, suppression, administrative changes',
      'Socio-Religious Reform Movements: Brahmo Samaj, Arya Samaj, Aligarh Movement',
      'Freedom Struggle: Moderate, Extremist, Gandhian phase, Partition & Integration'
    ],
    completed: true,
    revisionStatus: 'Mastered'
  },
  {
    id: 'syl-3',
    paper: 'General Studies II',
    category: 'Indian Constitution & Polity',
    title: 'Historical underpinnings, evolution, features, amendments, significant provisions and basic structure',
    subtopics: [
      'Acts of 1773 to 1947 and Constituent Assembly Debates',
      'Preamble, Fundamental Rights, DPSP, Fundamental Duties',
      'Basic Structure Doctrine evolution (Shankari Prasad to Kesavananda Bharati)',
      'Emergency provisions (National, State, Financial) and constitutional impact'
    ],
    completed: true,
    revisionStatus: 'In Progress'
  },
  {
    id: 'syl-4',
    paper: 'General Studies II',
    category: 'Governance & Public Administration',
    title: 'Role of civil services in a democracy, Citizen Charters, transparency & accountability',
    subtopics: [
      'Evolution of Civil Services in India and post-independence challenges',
      'RTI Act, Whistleblower Protection, Citizens Charters and Sevottam model',
      'Social Audit and grievance redressal mechanisms',
      'E-Governance: applications, models, successes, limitations and potential'
    ],
    completed: false,
    revisionStatus: 'In Progress'
  },
  {
    id: 'syl-5',
    paper: 'General Studies III',
    category: 'Indian Economy',
    title: 'Issues relating to planning, mobilization of resources, growth, development and employment',
    subtopics: [
      'Inclusive growth and issues arising from it; Fiscal Policy and FRBM Act',
      'Monetary Policy framework, Banking sector reforms, NPAs and IBC code',
      'Government Budgeting and Taxation reforms (Direct Tax Code, GST)',
      'Agriculture: minimum support price, PDS, food processing supply chains'
    ],
    completed: false,
    revisionStatus: 'Not Started'
  },
  {
    id: 'syl-6',
    paper: 'General Studies III',
    category: 'Environment & Disaster Management',
    title: 'Conservation, environmental pollution and degradation, environmental impact assessment',
    subtopics: [
      'Climate change treaties: UNFCCC, Paris Agreement, COP meetings',
      'Biodiversity Act 2002, Wildlife Protection Act 1972 (2022 Amendment)',
      'Disaster Management Act 2005, NDMA guidelines and Sendai Framework',
      'Renewable Energy targets: National Green Hydrogen Mission, ISA'
    ],
    completed: false,
    revisionStatus: 'Not Started'
  },
  {
    id: 'syl-7',
    paper: 'General Studies IV',
    category: 'Ethics & Integrity',
    title: 'Ethics and Human Interface; Attitude; Aptitude and Foundational Values for Civil Service',
    subtopics: [
      'Essence, determinants and consequences of Ethics in human actions',
      'Integrity, impartiality and non-partisanship, objectivity, empathy towards weaker sections',
      'Emotional Intelligence: concepts, utilities and application in administration',
      'Case Studies on ethical dilemmas in public governance'
    ],
    completed: false,
    revisionStatus: 'Not Started'
  }
];

export const sampleResources: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Official UPSC Civil Services Examination Syllabus Document (Gazette Notification)',
    category: 'Syllabus & Scheme',
    type: 'Official Syllabus',
    sourceName: 'Union Public Service Commission (Govt. of India)',
    description: 'The definitive notification detailing Prelims GS Paper 1, CSAT Paper 2, Mains GS 1 to 4, Essay, and Optional syllabi with qualifying criteria.',
    badge: 'Verified Official',
    readTime: '45 mins review'
  },
  {
    id: 'res-2',
    title: 'Economic Survey of India — High-Yield Executive Summaries & Statistical Appendix',
    category: 'Indian Economy',
    type: 'Report / Survey',
    sourceName: 'Ministry of Finance, Government of India',
    description: 'Macro-economic trends, capital expenditure growth, agriculture, external sector resilience, and digital public infrastructure data points.',
    badge: 'Govt Publication',
    readTime: '30 mins per chapter'
  },
  {
    id: 'res-3',
    title: 'Second Administrative Reforms Commission (2nd ARC) — Report 1 to 15 Summaries',
    category: 'Governance & Ethics',
    type: 'Report / Survey',
    sourceName: 'Department of Administrative Reforms and Public Grievances',
    description: 'Key recommendations on Ethics in Governance (Report 4), Public Order (Report 5), Local Governance (Report 6), and Citizen-Centric Administration (Report 12).',
    badge: 'Essential for GS 2 & 4',
    readTime: '20 mins summary'
  },
  {
    id: 'res-4',
    title: 'The Constitution of India — Bare Act with Constitutional Amendments',
    category: 'Polity & Law',
    type: 'Act / Constitution',
    sourceName: 'Legislative Department, Ministry of Law & Justice',
    description: 'Authentic text of Articles 1 to 395, Schedules 1 to 12, with recent Constitutional amendments (103rd, 104th, 105th, 106th Nari Shakti Vandan).',
    badge: 'Primary Source',
    readTime: 'Reference Document'
  },
  {
    id: 'res-5',
    title: 'PRS Legislative Research — Monthly Policy Review & Key Bills Analysis',
    category: 'Current Affairs & Bills',
    type: 'Standard Reference',
    sourceName: 'PRS Legislative Research',
    description: 'Independent objective analysis of parliamentary committee reports, legislative bills introduced, and parliamentary performance statistics.',
    badge: 'Academic Standard',
    readTime: '15 mins per bill'
  }
];

// Offline AI Copilot curated responses for supported queries
export const curatedCopilotResponses: Record<string, string> = {
  'explain fundamental rights in simple terms': `### Fundamental Rights (Part III, Articles 12–35)

Fundamental Rights are guaranteed by the Constitution of India to every citizen (and in some cases non-citizens) to protect individual liberty against arbitrary state action. They are called **Fundamental** because they are indispensable for human dignity and are guaranteed and defended by the Supreme Court (under Article 32).

#### The Six Broad Categories:
1. **Right to Equality (Articles 14–18):** Equality before law, prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth, equality of opportunity in public employment, and abolition of untouchability & titles.
2. **Right to Freedom (Articles 19–22):** Six democratic freedoms (speech, assembly, association, movement, residence, profession) under Art. 19; protection against arbitrary arrest (Art. 22); and the bedrock **Right to Life and Personal Liberty (Art. 21)**.
3. **Right against Exploitation (Articles 23–24):** Prohibition of human trafficking, forced labor (*begar*), and child employment in hazardous industries.
4. **Right to Freedom of Religion (Articles 25–28):** Freedom of conscience, profession, practice, and propagation of religion, subject to public order, morality, and health.
5. **Cultural and Educational Rights (Articles 29–30):** Protection of language, script, and culture of minorities, and their right to establish educational institutions.
6. **Right to Constitutional Remedies (Article 32):** Dr. Ambedkar described this as the *"very soul and the heart of the Constitution"*. Without Article 32, other rights would be mere paper declarations.

> **Key UPSC Insight:** Fundamental rights are **not absolute**; they are subject to **reasonable restrictions**. They are justiciable, meaning one can approach the Supreme Court directly if they are infringed.`,

  'summarize the directive principles of state policy': `### Directive Principles of State Policy (DPSP) — Part IV (Articles 36–51)

Borrowed from the **Irish Constitution of 1937**, DPSPs represent the socio-economic goals of the Indian Republic to establish a **Welfare State** rather than a mere police state.

#### Classification by Ideology:
- **Socialistic Principles:**
  - *Article 38:* Promote welfare of people by securing a social order permeated by justice (social, economic, political).
  - *Article 39:* Equitable distribution of material resources; prevention of concentration of wealth; equal pay for equal work.
  - *Article 39A:* Equal justice and free legal aid to the poor.
  - *Article 41, 42, 43:* Right to work, maternity relief, living wage for workers.

- **Gandhian Principles:**
  - *Article 40:* Organization of Village Panchayats as units of self-government.
  - *Article 43:* Promotion of cottage industries in rural areas.
  - *Article 46:* Promotion of educational and economic interests of SCs, STs, and weaker sections.
  - *Article 47:* Prohibition of intoxicating drinks and drugs.
  - *Article 48:* Prohibition of slaughter of cows, calves, and other milch cattle.

- **Liberal-Intellectual Principles:**
  - *Article 44:* Secure a **Uniform Civil Code (UCC)** for citizens throughout India.
  - *Article 45:* Early childhood care and education.
  - *Article 48A:* Protection and improvement of environment, forests, and wildlife.
  - *Article 50:* Separation of judiciary from executive in public services.
  - *Article 51:* Promotion of international peace and security.

> **UPSC Landmark Case:** In *Minerva Mills v. Union of India (1980)*, the Supreme Court held that the Indian Constitution is founded on the bedrock of the balance between Fundamental Rights (Part III) and DPSPs (Part IV).`,

  'explain inflation with an example': `### Understanding Inflation for UPSC (GS Paper 3)

**Inflation** is the persistent and general increase in the price level of goods and services over an extended period, leading to a fall in the purchasing power of money.

#### Concrete Example:
Suppose in 2020, ₹100 bought you 2.5 kg of pulses. If the general inflation rate is 6% per annum, the same basket of pulses costs ₹106 the following year. Your ₹100 currency note now purchases less real food—this erosion of purchasing power is inflation.

#### Core Types of Inflation:
1. **Demand-Pull Inflation ("Too much money chasing too few goods"):**
   - Triggered by rapid GDP growth, high government capex, or excessive money supply.
   - *Example:* Post-pandemic surge in travel and electronics when supply chains were constrained.
2. **Cost-Push Inflation (Supply-side shocks):**
   - Triggered by spike in input costs: crude oil shocks, fertilizer price rise, or crop failure due to El Niño.
   - *Example:* Ukraine war disrupting sunflower oil and global wheat supplies in 2022.
3. **Built-in / Wage-Price Spiral:**
   - Workers demand higher wages to compensate for higher living costs, causing manufacturers to increase prices further.

#### How India Measures Inflation:
- **Consumer Price Index (CPI - Combined):** Measures retail inflation faced by consumers (Base Year 2012). Used by the RBI Monetary Policy Committee (target: 4% with +/- 2% band).
- **Wholesale Price Index (WPI):** Measures factory-gate bulk transactions (Base Year 2011-12, excludes services). Released by DPIIT.`,

  'create a seven-day revision plan': `### High-Yield 7-Day UPSC Revision Plan (Sprint Schedule)

Designed for serious aspirants consolidating GS and CSAT:

| Day | Primary Subject (Morning 4h) | Secondary Subject (Afternoon 2.5h) | Practice & Revision (Evening 2h) |
|---|---|---|---|
| **Day 1** | **Indian Polity:** Fundamental Rights, DPSP, Basic Structure & Preamble | Current Affairs: Last 3 Months National Issues | Solve 30 MCQs on Articles 12-51 + 1 Mains Answer |
| **Day 2** | **Indian Polity:** Parliament, Supreme Court, High Courts, Ordinances | Modern History: 1857 to 1919 (Congress & Moderates/Extremists) | 25 MCQs on Parliamentary Procedures + Review Flashcards |
| **Day 3** | **Indian Economy:** National Income, Inflation, Monetary Policy, RBI Act | Modern History: 1920 to 1947 (NCM, CDM, Quit India) | 30 MCQs on Repo Rate, Inflation indices, Banking |
| **Day 4** | **Indian Economy:** Fiscal Policy, Budget terms, Balance of Payments, Foreign Trade | Physical Geography: Geomorphology & Climatology | Solve 20 PYQs on Balance of Payments & Exchange Rates |
| **Day 5** | **Environment & Ecology:** Protected Area Network, Wildlife Act, COP29 | Indian Geography: River Basins, Peninsular Drainage | Map Practice: Biosphere Reserves, Ramsar Wetlands |
| **Day 6** | **Science & Tech + Ethics:** Biotechnology, Space Missions, Ethical Dilemmas | CSAT Sprint: Reading Comprehension & Number System | Full CSAT 40 Questions practice test under 60-min timer |
| **Day 7** | **Full Length Simulation:** 100 MCQs Prelims GS Paper 1 Mock | Comprehensive Error Analysis & Weak Topic Note-Taking | Rest & Mental Rejuvenation for Next Cycle |

> **Pro-Tip:** Follow the **Active Recall** technique: test yourself with closed notes before reading summaries.`,

  'generate five upsc-level practice questions': `### Five UPSC Prelims Standard Practice Questions

**Q1 (Polity):** Under Article 368, an amendment to the Constitution of India regarding the representation of States in Parliament requires:
(a) Special majority of Parliament only
(b) Special majority of Parliament and ratification by not less than half of the State legislatures by simple majority
(c) Simple majority of Parliament
(d) Absolute majority of both Houses with unanimous Cabinet approval
*Answer: (b)*

**Q2 (Economy):** If the Reserve Bank of India decides to adopt an expansionary monetary policy, which of the following would it NOT do?
1. Cut and optimize the Statutory Liquidity Ratio (SLR)
2. Increase the Marginal Standing Facility (MSF) rate
3. Cut the Bank Rate and Repo Rate
*Answer: 2 only (Raising MSF contracts liquidity, hence counter to expansionary stance).*

**Q3 (Environment):** In India, if a species of tortoise is declared protected under Schedule I of the Wildlife (Protection) Act, 1972, what does it signify?
(a) It enjoys the same level of protection as the tiger.
(b) It is endemic to a particular region of India.
(c) It is declared vermin and can be culled.
(d) It is extinct in the wild.
*Answer: (a)*

**Q4 (History):** Who among the following founded the 'Radhasoami Satsang' in Agra in 1861?
(a) Shiv Dayal Saheb
(b) Tulsi Ram
(c) Swami Sahajanand Saraswati
(d) Debendranath Tagore
*Answer: (a)*

**Q5 (Geography):** Which of the following straits connects the Red Sea to the Gulf of Aden?
(a) Strait of Hormuz
(b) Bab-el-Mandeb
(c) Malacca Strait
(d) Bosphorus Strait
*Answer: (b)*`,

  'explain federalism with a concept map': `### Concept Map: Indian Federalism ("Quasi-Federal with Unitary Spirit")

The Indian Constitution establishes a unique federal structure termed by **K.C. Wheare** as *"Quasi-Federal"* and by **Granville Austin** as *"Cooperative Federalism"*.

\`\`\`
                 INDIAN FEDERAL SYSTEM
                         |
      ----------------------------------------
      |                                      |
  FEDERAL FEATURES                      UNITARY / INTEGRATIVE FEATURES
  - Dual Polity (Centre & States)       - Strong Centre (Residual powers with Union)
  - Written Constitution                - Single Constitution & Single Citizenship
  - Division of Powers (7th Schedule)   - Integrated Single Judiciary
  - Supremacy of Constitution           - All India Services (IAS, IPS, IFS - Art. 312)
  - Independent Judiciary (Art. 131)    - Governor appointed by the President
  - Bicameralism (Rajya Sabha)          - Emergency Provisions (Articles 352, 356, 360)
                                        - Financial Dependence (Art. 280 Finance Comm.)
\`\`\`

#### Key Constitutional Articles:
- **Article 1:** "India, that is Bharat, shall be a **Union of States**" (Indestructible Union of destructible States).
- **Article 246 (7th Schedule):** Union List (100 subjects), State List (61 subjects), Concurrent List (52 subjects).
- **Article 263:** Inter-State Council to promote coordination between States and Centre.
- **Article 279A:** GST Council as the prime example of Fiscal Cooperative Federalism.`
};

export type SubjectCategory = 
  | 'Indian Polity & Governance'
  | 'Modern & Ancient History'
  | 'Geography & Environment'
  | 'Indian Economy & Social Development'
  | 'Science, Technology & Security'
  | 'Ethics, Integrity & Aptitude'
  | 'Current Affairs';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  modelUsed?: string;
}

export interface PrelimsQuestion {
  id: string;
  subject: string;
  subtopic: string;
  year?: string;
  difficulty: 'Easy' | 'Moderate' | 'UPSC Tough';
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  keyTakeaway: string;
  syllabusTag: string;
}

export interface PYQuestion {
  id: string;
  year: number;
  stage: 'Prelims' | 'Mains';
  paper: string;
  subject: string;
  topic: string;
  question: string;
  options?: string[];
  correctOption?: number;
  officialRationale: string;
  relatedConcepts: string[];
  marks?: number;
}

export interface CurrentAffairArticle {
  id: string;
  category: string;
  headline: string;
  date: string;
  source: string;
  summary: string;
  upscRelevance: string;
  gsPaper: 'GS 1' | 'GS 2' | 'GS 3' | 'GS 4' | 'Prelims';
  keyTakeaways: string[];
  syllabusTopic: string;
  isBookmarked?: boolean;
}

export interface Flashcard {
  id: string;
  subject: string;
  topic: string;
  front: string;
  back: string;
  keyArticlesOrDates?: string;
  confidence?: 'low' | 'medium' | 'high';
  isBookmarked?: boolean;
}

export interface SyllabusItem {
  id: string;
  paper: string;
  category: string;
  title: string;
  subtopics: string[];
  completed: boolean;
  revisionStatus: 'Not Started' | 'In Progress' | 'Mastered';
}

export interface StudyPlanDay {
  dayNumber: number;
  dayName: string;
  focusArea: string;
  sessions: {
    timeSlot: string;
    activity: string;
    subject: string;
    durationMinutes: number;
    completed: boolean;
  }[];
}

export interface KnowledgeNode {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  summary: string;
  articlesOrFacts: string[];
  landmarkCasesOrEvents: string[];
  sampleQuestion: string;
  connectedTo: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  type: 'Official Syllabus' | 'Report / Survey' | 'Act / Constitution' | 'Standard Reference';
  sourceName: string;
  description: string;
  badge: string;
  readTime: string;
  externalUrl?: string;
}

export interface AspirantProfile {
  name: string;
  targetYear: string;
  optionalSubject: string;
  dailyStudyHours: number;
  preparationStage: 'Foundation' | 'Consolidation' | 'Revision & Test Sprint';
  totalDaysStreak: number;
  syllabusProgressPct: number;
}

export type ModuleType = 'capability' | 'markets';

export type JourneyTabType = 'supplier' | 'buyer';

export interface InterventionItem {
  key: string;
  title: string;
  category?: string;
  iconType: string;
  overview: string;
  items?: string[];
  customType?: 'mentormatching' | 'lms';
  deliverables?: string | string[];
  lmsTracks?: { trackTitle: string; duration: string; modules: string[] }[];
  mentorDirectory?: { name: string; role: string; experience: string }[];
  cohortTimeline?: string;
  esdAdvantage?: string;
}

export interface QuizState {
  q1: 'yes' | 'no';
  q2: 'early' | 'active';
  q3: 'yes' | 'no';
}

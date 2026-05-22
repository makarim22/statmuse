export interface SeasonRecord {
  season: string;
  winner: string;
  runnerUp: string;
  topScorer?: string;
  coach?: string;
  note?: string;
  isCancelled?: boolean;
}

export interface ClubSummary {
  name: string;
  titles: number;           // Profesional era (1994-95 onwards) - MAIN ranking metric
  runnerUps: number;        // Profesional era runner-ups
  seasonsWon: string[];     // Profesional era seasons won
  historicalNames: string[];
  amatirTitles?: number;     // Perserikatan/amatir era (1930-1994) titles - supplementary info
  amatirSeasonsWon?: string[]; // Perserikatan/amatir era seasons won
}

export interface SearchQueryResponse {
  answer: string;
  suggestedPrompts?: string[];
  autoQueryStats?: {
    type: 'list' | 'club-comparison' | 'timeline' | 'champions-ranking';
    title: string;
    data: any;
  };
}

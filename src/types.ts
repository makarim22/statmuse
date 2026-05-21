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
  titles: number;
  runnerUps: number;
  seasonsWon: string[];
  historicalNames: string[];
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

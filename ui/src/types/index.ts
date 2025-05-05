export type ResearchStatusType = {
  step: string;
  message: string;
};

export type ResearchOutput = {
  summary: string;
  details: {
    report: string;
  };
};

export type DocCount = {
  initial: number;
  kept: number;
};

export type DocCounts = {
  [key: string]: DocCount;
};

export type EnrichmentCounts = {
  company: { total: number; enriched: number };
  industry: { total: number; enriched: number };
  financial: { total: number; enriched: number };
  news: { total: number; enriched: number };
};

export type ResearchState = {
  status: string;
  message: string;
  queries: Array<{
    text: string;
    number: number;
    category: string;
  }>;
  streamingQueries: {
    [key: string]: {
      text: string;
      number: number;
      category: string;
      isComplete: boolean;
    };
  };
  briefingStatus: {
    company: boolean;
    industry: boolean;
    financial: boolean;
    news: boolean;
  };
  enrichmentCounts?: EnrichmentCounts;
  docCounts?: DocCounts;
};

export type GlassStyle = {
  base: string;
  card: string;
  input: string;
};

export type AnimationStyle = {
  fadeIn: string;
  writing: string;
  colorTransition: string;
};

export type ResearchStatusProps = {
  status: ResearchStatusType | null;
  error: string | null;
  isComplete: boolean;
  currentPhase: 'search' | 'enrichment' | 'briefing' | 'complete' | null;
  isResetting: boolean;
  glassStyle: GlassStyle;
  loaderColor: string;
  statusRef: React.RefObject<HTMLDivElement>;
}; 
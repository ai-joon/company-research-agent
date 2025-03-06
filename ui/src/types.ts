// Research Status Types
export type ResearchStatus = {
  step: string;
  message: string;
};

// Research Output Types
export type ResearchOutput = {
  summary: string;
  details: Record<string, any>;
};

// Query Types
export type Query = {
  text: string;
  number: number;
  category: string;
};

export type StreamingQuery = {
  text: string;
  number: number;
  category: string;
  isComplete: boolean;
};

// Document Count Types
export type DocCount = {
  initial: number;
  kept: number;
};

export type DocCounts = {
  company: DocCount;
  industry: DocCount;
  financial: DocCount;
  news: DocCount;
};

// Briefing Types
export type BriefingStatus = {
  company: boolean;
  industry: boolean;
  financial: boolean;
  news: boolean;
};

// Enrichment Types
export type EnrichmentCounts = {
  company: { total: number; enriched: number };
  industry: { total: number; enriched: number };
  financial: { total: number; enriched: number };
  news: { total: number; enriched: number };
};

// Research State Types
export type ResearchState = {
  status: string;
  message: string;
  queries: Query[];
  streamingQueries: Record<string, StreamingQuery>;
  docCounts?: DocCounts;
  enrichmentCounts?: EnrichmentCounts;
  briefingStatus: BriefingStatus;
};

// Style Types
export type GlassStyle = {
  base: string;
  card: string;
  input: string;
};

// Component Props Types
export type ResearchStatusProps = {
  status: ResearchStatus | null;
  error: string | null;
  isComplete: boolean;
  currentPhase: 'search' | 'enrichment' | 'briefing' | 'complete' | null;
  isResetting: boolean;
  glassStyle: GlassStyle;
  loaderColor: string;
  statusRef: React.RefObject<HTMLDivElement>;
};

export type ResearchQueriesProps = {
  queries: Query[];
  streamingQueries: Record<string, StreamingQuery>;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isResetting: boolean;
  glassStyle: string;
};

export type ResearchBriefingsProps = {
  briefingStatus: BriefingStatus;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isResetting: boolean;
};

export type CurationExtractionProps = {
  enrichmentCounts?: EnrichmentCounts;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isResetting: boolean;
  loaderColor: string;
};

// Form Types
export type FormData = {
  companyName: string;
  companyUrl: string;
  companyHq: string;
  companyIndustry: string;
};

// Animation Types
export type AnimationStyle = {
  fadeIn: string;
  writing: string;
  colorTransition: string;
}; 
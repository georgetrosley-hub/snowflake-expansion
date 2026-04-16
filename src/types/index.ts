export interface DemoRecipe {
  title: string;
  data: string;
  build: string;
  showMoment: string;
  seRole: string;
  aeRole: string;
}

export interface Persona {
  id: string;
  title: string;
  dept: string;
  level: "VP" | "C-Suite" | "Director";
  trigger: string;
  unconsumedSurface: string[];
  loomLead: "AE" | "SE";
  loomReason: string;
  anchorDemo: string;
  demoRecipe: DemoRecipe;
  loomScript: string;
}

/** Industry / sector icon used in the territory console */
export type TerritoryIconKey = "pharma" | "financial" | "healthcare" | "manufacturing";

export type PlaybookKey = TerritoryIconKey;

export interface TerritoryPlaybook {
  color: string;
  iconKey: TerritoryIconKey;
  personas: Persona[];
  useCases: string[];
  execTriggers: string[];
}

export type AccountTier = 1 | 2 | 3;

export interface DealPath {
  stakeholders: string[];
  expansionFlow: string[];
}

/** Named enterprise account with playbook content (personas, use cases, exec triggers). */
export interface AccountConfig extends TerritoryPlaybook {
  id: string;
  name: string;
  tier: AccountTier;
  industry: string;
  why_now: string;
  whats_broken: string;
  hypothesis: string;
  first_workload: string;
  proof_point: string;
  economic_impact: string;
  deal_path: DealPath;
}

export type MotionKey =
  | "Mix of all three"
  | "New persona outreach"
  | "Exec escalation"
  | "Use case mapping";

export type TabKey =
  | "territory"
  | "personas"
  | "usecases"
  | "demo"
  | "outreach"
  | "exec-triggers";

export interface EmailDraft {
  subject: string;
  body: string;
}

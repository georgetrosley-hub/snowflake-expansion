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

/** Shared library: personas + exec trigger ideas by industry (no generic use-case list). */
export interface IndustryPlaybook {
  color: string;
  iconKey: TerritoryIconKey;
  personas: Persona[];
  execTriggers: string[];
}

/**
 * Account-scoped wedge: business problem, initial workload, and the persona demo that proves it.
 */
export interface AccountUseCase {
  id: string;
  title: string;
  /** Short account-specific problem statement (not generic vertical copy). */
  summary: string;
  /** Initial workload to land for this wedge. */
  first_workload: string;
  /** Persona id on this account whose demo recipe proves the wedge / proof point. */
  demoPersonaId: string;
}

export type AccountTier = 1 | 2 | 3;

export interface DealPath {
  stakeholders: string[];
  expansionFlow: string[];
}

/** Named enterprise account: its own personas, use cases, and exec triggers. */
export interface AccountConfig {
  id: string;
  name: string;
  tier: AccountTier;
  color: string;
  iconKey: TerritoryIconKey;
  /** Industry label shown with the account (e.g. “Pharma / Life Sciences”). */
  industry: string;
  /** One-line context under industry (executive briefing). */
  briefDescriptor: string;
  why_now: string;
  whats_broken: string;
  hypothesis: string;
  first_workload: string;
  proof_point: string;
  economic_impact: string;
  deal_path: DealPath;
  personas: Persona[];
  useCases: AccountUseCase[];
  execTriggers: string[];
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

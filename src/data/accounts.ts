import type { AccountConfig, AccountTier, DealPath, PlaybookKey } from "@/types";
import { TERRITORY_PLAYBOOKS } from "@/data/territoryPlaybooks";

function makeAccount(
  playbook: PlaybookKey,
  fields: {
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
): AccountConfig {
  return {
    ...TERRITORY_PLAYBOOKS[playbook],
    ...fields
  };
}

export const ACCOUNTS: AccountConfig[] = [
  makeAccount("pharma", {
    id: "acc-vertex",
    name: "Vertex Pharmaceuticals",
    tier: 1,
    industry: "Pharma / Life Sciences",
    why_now:
      "Major trial readouts this year; commercial analytics is being asked to move at drug-development speed.",
    whats_broken:
      "Snowflake consumption is concentrated in IT-led pipelines while R&D and commercial teams still export to SAS and spreadsheets.",
    hypothesis:
      "If we land Snowpark ML + governed sharing with R&D first, commercial and manufacturing will follow without a second platform sale.",
    first_workload:
      "Clinical trial cohort scoring in Snowpark ML with OMOP-aligned synthetic data — prove sub-minute iteration vs overnight SAS.",
    proof_point:
      "Peer accounts replaced SAS scoring loops with Snowpark ML and cut model refresh from weeks to hours.",
    economic_impact:
      "Faster trial analytics cycles → earlier portfolio decisions; commercial targeting apps reduce agency and BI ticket load.",
    deal_path: {
      stakeholders: [
        "VP Data Science (R&D)",
        "Chief Data Officer",
        "Head of Commercial Analytics",
        "Enterprise procurement / cloud COE"
      ],
      expansionFlow: [
        "Technical win on cohort ML in Snowflake",
        "Add governance + Cortex for regulatory lineage",
        "Expand Streamlit apps to commercial ops",
        "Multi-year expansion aligned to launches"
      ]
    }
  }),
  makeAccount("financial", {
    id: "acc-jpm",
    name: "JPMorgan Chase",
    tier: 1,
    industry: "Financial Services",
    why_now:
      "Basel timelines and exam prep are forcing faster risk aggregation without new data movement projects.",
    whats_broken:
      "Snowflake exists for analytics, but front-office and risk still treat it as a warehouse — not a compute layer for models and narratives.",
    hypothesis:
      "A risk + compliance wedge (Cortex Analyst + lineage) opens the door to quant and AML teams already blocked on export policies.",
    first_workload:
      "Risk aggregation + plain-English regulatory query on synthetic counterparty exposure with full lineage in one environment.",
    proof_point:
      "Similar banks cut time-to-answer for regulatory questions from days to minutes without new infrastructure.",
    economic_impact:
      "Fewer parallel platforms (Spark/SAS), faster exams, reduced operational risk from manual reporting.",
    deal_path: {
      stakeholders: ["CRO", "CCO", "Head of Quant Research", "VP Data Engineering", "IT security / data governance"],
      expansionFlow: [
        "Prove governed risk Q&A in Snowflake",
        "Snowpark quant path on tick data (no export)",
        "AML narrative generation for ops scale",
        "Enterprise standard for new analytics workloads"
      ]
    }
  }),
  makeAccount("healthcare", {
    id: "acc-kaiser",
    name: "Kaiser Permanente",
    tier: 2,
    industry: "Healthcare",
    why_now:
      "VBC contract expansion requires daily attribution — weekly batch risk scores are now a quality and revenue problem.",
    whats_broken:
      "Epic remains the system of record; analysts wait on extracts while Snowflake is underused for member-level intelligence.",
    hypothesis:
      "Bulk FHIR + Streamlit analyst apps win clinical informatics; revenue cycle ML funds the next tranche.",
    first_workload:
      "Population health plain-language query (Cortex Analyst) on attributed member data — care managers self-serve without tickets.",
    proof_point:
      "Integrated systems cut BI backlog for care gaps by giving governed self-service on live data.",
    economic_impact:
      "Fewer readmissions and admin cost; faster revenue cycle resolution from denial prediction.",
    deal_path: {
      stakeholders: ["Chief Analytics Officer", "VP Revenue Cycle", "Director Clinical Informatics", "CIO / CISO"],
      expansionFlow: [
        "Win on pop health query + governance story",
        "Add denial ML + Dynamic Tables feeds",
        "FHIR pipeline for analyst self-service",
        "Enterprise agreement across regions"
      ]
    }
  }),
  makeAccount("manufacturing", {
    id: "acc-siemens",
    name: "Siemens Digital Industries",
    tier: 2,
    industry: "Manufacturing / Industrial",
    why_now:
      "Plant consolidation and Industry 4.0 mandates require OT data in one place — board is watching downtime minutes.",
    whats_broken:
      "Historians and MES hold the truth; Snowflake is a sidecar instead of the real-time operational layer.",
    hypothesis:
      "Historian → Dynamic Tables → Streamlit proves predictive maintenance ROI faster than another point solution.",
    first_workload:
      "Multi-line sensor dashboard with anomaly flags from streaming historian feeds into Snowflake.",
    proof_point:
      "Manufacturers reduced unplanned downtime by surfacing anomalies hours before failure on unified OT data.",
    economic_impact:
      "Downtime avoidance + supplier risk visibility; FP&A variance reporting at close without Excel marathons.",
    deal_path: {
      stakeholders: [
        "VP Operations Technology",
        "Chief Supply Chain Officer",
        "Head of Quality Engineering",
        "Plant IT / OT security"
      ],
      expansionFlow: [
        "Land OT streaming + dashboard",
        "Supplier risk intel with Marketplace feeds",
        "Quality traceability ML across sites",
        "Digital twin data foundation for enterprise rollout"
      ]
    }
  }),
  makeAccount("healthcare", {
    id: "acc-unitedhealth",
    name: "UnitedHealth Group",
    tier: 2,
    industry: "Healthcare",
    why_now:
      "Stars and HEDIS pressure is visible in executive OKRs; analytics teams are being asked for daily intervention lists.",
    whats_broken:
      "Snowflake spend is growing but persona coverage is uneven — payer analytics and clinical still siloed.",
    hypothesis:
      "Tie Snowflake activation to Stars/HEDIS automation and denial prevention to align payer and provider stakeholders.",
    first_workload:
      "Daily risk stratification refresh (Dynamic Tables + Snowpark ML) replacing weekly batch scoring.",
    proof_point:
      "Health plans improved gap closure rates when risk scores refreshed daily vs weekly.",
    economic_impact:
      "Quality bonus preservation + revenue integrity; lower cost of care through earlier interventions.",
    deal_path: {
      stakeholders: ["Chief Analytics Officer", "Head of Population Health", "VP Medicare Advantage", "Enterprise data office"],
      expansionFlow: [
        "Daily scoring pilot on one market",
        "Expand to additional lines of business",
        "PHI masking + clean rooms for research use cases",
        "Corporate standard for new analytics products"
      ]
    }
  }),
  makeAccount("pharma", {
    id: "acc-novartis",
    name: "Novartis",
    tier: 3,
    industry: "Pharma / Life Sciences",
    why_now:
      "Pipeline and launch calendar is active but expansion is opportunistic — monitor for regulatory or M&A signals.",
    whats_broken:
      "Same pattern as peers: platform present, personas under-mapped, Snowpark and governance under-activated.",
    hypothesis:
      "A narrow clinical or R&D win can resurface when trial or compliance triggers hit.",
    first_workload:
      "RWE clean room join demo (claims + EHR) when data-sharing pain resurfaces in vendor discussions.",
    proof_point:
      "Clean room wins shortened vendor negotiations from months to weeks at comparable pharmas.",
    economic_impact:
      "Faster RWE studies; reduced vendor duplicative spend.",
    deal_path: {
      stakeholders: ["Director RWE", "VP Data Science", "Procurement", "IT alliance"],
      expansionFlow: [
        "Monitor exec triggers",
        "Re-engage with specific demo tied to event",
        "Pilot workload",
        "Expand on success"
      ]
    }
  }),
  makeAccount("financial", {
    id: "acc-wells",
    name: "Wells Fargo",
    tier: 3,
    industry: "Financial Services",
    why_now:
      "Transformation milestones are episodic — best entry is aligned to exam, integration, or digital initiative news.",
    whats_broken:
      "Snowflake footprint without full front-office and compliance adoption — expansion is motion-dependent.",
    hypothesis:
      "Use case mapping motions work when tied to a named initiative rather than generic platform upsell.",
    first_workload:
      "Advisor next-best-action Streamlit when wealth leadership prioritizes advisor tooling.",
    proof_point:
      "Wealth units increased advisor actions per model when scoring was surfaced in-workflow.",
    economic_impact:
      "AUM and cross-sell lift; reduced time spent on manual client prioritization.",
    deal_path: {
      stakeholders: ["Head of Client Analytics", "Wealth platform owner", "AE coverage", "SE specialist"],
      expansionFlow: [
        "Signal on initiative",
        "Align demo to initiative owner",
        "Pilot",
        "Scale to regions"
      ]
    }
  }),
  makeAccount("healthcare", {
    id: "acc-mayo",
    name: "Mayo Clinic",
    tier: 3,
    industry: "Healthcare",
    why_now:
      "Research and clinical operations compete for attention — opportunistic entry on IRB or Epic-adjacent projects.",
    whats_broken:
      "Strong IT governance can slow activation; Snowflake wins require clear PHI posture and research alignment.",
    hypothesis:
      "PHI masking + clean room demo resonates when research expansion is on the roadmap.",
    first_workload:
      "De-identification + clean room for research cohorts when IRB pushes on data access boundaries.",
    proof_point:
      "Academic medical centers accelerated trial recruitment with governed research sandboxes.",
    economic_impact:
      "Research throughput; reduced compliance review cycles per study.",
    deal_path: {
      stakeholders: ["CIO / CISO", "Research IT", "IRB office", "Clinical informatics"],
      expansionFlow: [
        "Monitor triggers",
        "Security-first briefing",
        "Pilot with narrow cohort",
        "Expand research footprint"
      ]
    }
  })
];

export const ACCOUNTS_BY_ID: Record<string, AccountConfig> = Object.fromEntries(
  ACCOUNTS.map((a) => [a.id, a])
);

export const DEFAULT_ACCOUNT_ID = ACCOUNTS[0]?.id ?? "";

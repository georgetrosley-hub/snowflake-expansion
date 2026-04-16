import type { AccountConfig, AccountTier, DealPath, PlaybookKey } from "@/types";
import { INDUSTRY_PLAYBOOKS } from "@/data/territoryPlaybooks";
import {
  clonePlaybookPersonas,
  resolveUseCases,
  type AccountUseCaseInput
} from "@/data/accountPersonaFactory";

function assembleAccount(
  playbook: PlaybookKey,
  spec: {
    id: string;
    name: string;
    tier: AccountTier;
    industry: string;
    briefDescriptor: string;
    why_now: string;
    whats_broken: string;
    hypothesis: string;
    first_workload: string;
    proof_point: string;
    economic_impact: string;
    deal_path: DealPath;
    personaIndices: number[];
    useCases: AccountUseCaseInput[];
    execTriggers?: string[];
  }
): AccountConfig {
  const lib = INDUSTRY_PLAYBOOKS[playbook];
  const personas = clonePlaybookPersonas(spec.id, spec.name, playbook, spec.personaIndices);
  const useCases = resolveUseCases(spec.id, spec.useCases);
  return {
    color: lib.color,
    iconKey: lib.iconKey,
    id: spec.id,
    name: spec.name,
    tier: spec.tier,
    industry: spec.industry,
    briefDescriptor: spec.briefDescriptor,
    why_now: spec.why_now,
    whats_broken: spec.whats_broken,
    hypothesis: spec.hypothesis,
    first_workload: spec.first_workload,
    proof_point: spec.proof_point,
    economic_impact: spec.economic_impact,
    deal_path: spec.deal_path,
    personas,
    useCases,
    execTriggers: spec.execTriggers ?? lib.execTriggers
  };
}

export const ACCOUNTS: AccountConfig[] = [
  assembleAccount("pharma", {
    id: "acc-vertex",
    name: "Vertex Pharmaceuticals",
    tier: 1,
    industry: "Pharma / Life Sciences",
    briefDescriptor:
      "Global biotech; Snowflake live for enterprise workloads, while R&D and commercial still default to SAS and exports.",
    why_now:
      "Major trial readouts this year; commercial analytics is being asked to move at drug-development speed.",
    whats_broken:
      "Snowflake consumption is concentrated in IT-led pipelines while R&D and commercial teams still export to SAS and spreadsheets.",
    hypothesis:
      "The risk is not Snowflake capacity; it’s that R&D and commercial still treat SAS and exports as the only “real” modeling surface.",
    first_workload:
      "Clinical trial cohort scoring in Snowpark ML with OMOP-aligned synthetic data — prove sub-minute iteration vs overnight SAS.",
    proof_point:
      "In 48 hours: working cohort score in Snowflake + timed run vs the SAS job — numbers on the wall, not a slide.",
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
    },
    personaIndices: [0, 1, 2, 3, 4],
    useCases: [
      {
        id: "vertex-wedge-rnd-cohort",
        title: "Win R&D: replace overnight SAS cohort scoring for trial readout prep",
        summary:
          "Vertex trial teams still wait on SAS batch jobs before key readout decisions; Snowpark ML is the wedge to prove same-day iteration.",
        first_workload:
          "Snowpark ML cohort eligibility score on OMOP-aligned enrollment + trial criteria — side-by-side timing vs the SAS job.",
        demoPersonaTemplateId: "pharma-vp-data-science"
      },
      {
        id: "vertex-wedge-regulatory-lineage",
        title: "Defend FDA posture: regulatory lineage + plain-English audit queries",
        summary:
          "Submission and quality leaders need defensible lineage without another ticket to data engineering for every audit question.",
        first_workload:
          "Horizon lineage to Cortex Analyst: one compliance question answered with full path in a single Snowflake session.",
        demoPersonaTemplateId: "pharma-cdo"
      },
      {
        id: "vertex-wedge-hcp-targeting",
        title: "Commercial: HCP targeting without BI exports before the next launch wave",
        summary:
          "Vertex commercial ops still consolidates HCP lists offline; launch velocity is capped by spreadsheet cycle time.",
        first_workload:
          "Streamlit in Snowflake: reps filter HCPs by specialty and engagement with Marketplace joins — no export.",
        demoPersonaTemplateId: "pharma-head-commercial-analytics"
      },
      {
        id: "vertex-wedge-batch-release",
        title: "Manufacturing: multi-site batch visibility before QA holds pile up",
        summary:
          "Batch release data is fragmented by plant; leadership lacks one real-time view across Vertex manufacturing footprint.",
        first_workload:
          "Streamlit batch release dashboard across plants with held-batch drill-down in Snowflake.",
        demoPersonaTemplateId: "pharma-vp-manufacturing-ops"
      },
      {
        id: "vertex-wedge-rwe-clean-room",
        title: "RWE: claims + EHR linkage without vendor raw-data exposure",
        summary:
          "RWE is blocked by legal on sharing raw vendor feeds; Vertex needs a governed join that passes vendor and IRB review.",
        first_workload:
          "Data Clean Room join on synthetic claims + EHR with provable non-exposure per side.",
        demoPersonaTemplateId: "pharma-dir-rwe"
      }
    ],
    execTriggers: [
      "Vertex pipeline readout or PDUFA milestone (public calendar)",
      "FDA data integrity or clinical site letter tied to Vertex trials",
      "Vertex manufacturing expansion or plant consolidation news",
      ...INDUSTRY_PLAYBOOKS.pharma.execTriggers.slice(1)
    ]
  }),

  assembleAccount("financial", {
    id: "acc-jpm",
    name: "JPMorgan Chase",
    tier: 1,
    industry: "Financial Services",
    briefDescriptor:
      "Global bank; Snowflake in production for analytics, while desk and risk workflows still split across tools and exports.",
    why_now:
      "Basel timelines and exam prep are forcing faster risk aggregation without new data movement projects.",
    whats_broken:
      "Snowflake exists for analytics, but front-office and risk still treat it as a warehouse — not a compute layer for models and narratives.",
    hypothesis:
      "The risk is not missing a warehouse; it’s that risk and compliance can’t ask and defend a regulatory answer in one governed hop.",
    first_workload:
      "Risk aggregation + plain-English regulatory query on synthetic counterparty exposure with full lineage in one environment.",
    proof_point:
      "In 24–48 hours: Cortex Analyst on aggregated risk tables — one live question answered with lineage in the session.",
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
    },
    personaIndices: [0, 1, 2, 3, 4],
    useCases: [
      {
        id: "jpm-wedge-risk-cortex",
        title: "Basel / exam defense: CRO asks a risk question and gets lineage in one hop",
        summary:
          "JPM risk leadership needs sub-hour answers for regulatory stress — not a deck assembled from five systems.",
        first_workload:
          "Cortex Analyst on aggregated exposure with Horizon lineage — live query in the risk forum.",
        demoPersonaTemplateId: "fs-cro"
      },
      {
        id: "jpm-wedge-quant-snowpark",
        title: "Front office: quant backtests without tick data leaving Snowflake",
        summary:
          "JPM quants still export to local Python; IT blocks exports under policy — models stall.",
        first_workload:
          "Snowpark parallel backtest on tick history entirely inside Snowflake — show wall-clock vs export path.",
        demoPersonaTemplateId: "fs-head-quant-research"
      },
      {
        id: "jpm-wedge-aml-narrative",
        title: "Compliance: SAR narrative draft speed for AML ops backlog",
        summary:
          "FinCEN timelines compress; JPM ops still drafts SAR text manually from fragmented alert context.",
        first_workload:
          "Cortex LLM SAR narrative from flagged transactions in Snowflake — draft in minutes, human review before file.",
        demoPersonaTemplateId: "fs-cco"
      },
      {
        id: "jpm-wedge-dynamic-tables",
        title: "Data engineering: Spark pipeline cost and failure rate on risk feeds",
        summary:
          "JPM DE owns four Spark jobs for the same risk aggregates Snowflake Dynamic Tables could replace.",
        first_workload:
          "Dynamic Tables DAG replacing one Spark chain — latency and cost in the same week.",
        demoPersonaTemplateId: "fs-vp-data-engineering"
      },
      {
        id: "jpm-wedge-wealth-nba",
        title: "Wealth: advisor next-best-action without another BI tool",
        summary:
          "Models exist; JPM wealth can’t get propensity into advisor workflow without exports.",
        first_workload:
          "Streamlit advisor book with propensity + talk track — in-Snowflake only.",
        demoPersonaTemplateId: "fs-head-client-analytics"
      }
    ],
    execTriggers: [
      "JPM regulatory exam, MRA, or consent order in the news",
      "JPM digital or cloud transformation milestone",
      ...INDUSTRY_PLAYBOOKS.financial.execTriggers.slice(1)
    ]
  }),

  assembleAccount("healthcare", {
    id: "acc-kaiser",
    name: "Kaiser Permanente",
    tier: 2,
    industry: "Healthcare",
    briefDescriptor:
      "Integrated delivery network; Epic is the system of record, Snowflake underused for member intelligence at the edge.",
    why_now:
      "VBC contract expansion requires daily attribution — weekly batch risk scores are now a quality and revenue problem.",
    whats_broken:
      "Epic remains the system of record; analysts wait on extracts while Snowflake is underused for member-level intelligence.",
    hypothesis:
      "The risk is not Epic data; it’s that care and analytics teams can’t act on governed member intelligence without ticket queues.",
    first_workload:
      "Population health plain-language query (Cortex Analyst) on attributed member data — care managers self-serve without tickets.",
    proof_point:
      "In 48 hours: one governed Cortex Analyst question on live attributed data — list in hand, no BI ticket.",
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
    },
    personaIndices: [0, 1, 2, 3, 4],
    useCases: [
      {
        id: "kaiser-wedge-pop-query",
        title: "VBC: care managers ask population questions without BI tickets",
        summary:
          "Kaiser gap closure is capped by weekly reports; contracts need daily intervention lists.",
        first_workload:
          "Cortex Analyst on attributed members — one plain-English cohort question answered live.",
        demoPersonaTemplateId: "hc-cao"
      },
      {
        id: "kaiser-wedge-denial-ml",
        title: "Revenue cycle: denial prediction before claims leave Epic",
        summary:
          "Kaiser still sees denials 30 days later; billers need score at submission time.",
        first_workload:
          "Snowpark ML denial probability at claim submission — feature importance on payer + CPT.",
        demoPersonaTemplateId: "hc-vp-revenue-cycle"
      },
      {
        id: "kaiser-wedge-fhir-analyst",
        title: "Clinical informatics: Bulk FHIR to governed analyst access",
        summary:
          "Analysts queue for Epic extracts; Kaiser needs cohort queries without touching Epic directly.",
        first_workload:
          "Bulk FHIR landing + Streamlit cohort app for diagnosis-based lists in Snowflake.",
        demoPersonaTemplateId: "hc-dir-clinical-informatics"
      },
      {
        id: "kaiser-wedge-daily-risk",
        title: "Population health: daily risk refresh vs weekly batch scoring",
        summary:
          "Weekly risk scores miss same-week utilization; care management can’t prioritize in time.",
        first_workload:
          "Dynamic Tables + Snowpark ML daily risk refresh with care manager view.",
        demoPersonaTemplateId: "hc-head-pop-health"
      },
      {
        id: "kaiser-wedge-phi-research",
        title: "Security: PHI masking + clean room for research cohorts",
        summary:
          "Kaiser research needs aggregate outcomes without exposing PHI to analysts who shouldn’t see it.",
        first_workload:
          "Masked role views + clean room aggregate query — IRB-ready walkthrough.",
        demoPersonaTemplateId: "hc-cio-ciso"
      }
    ],
    execTriggers: [
      "Kaiser VBC contract expansion or Medicare Advantage pressure",
      "Kaiser Epic migration or major IT initiative",
      ...INDUSTRY_PLAYBOOKS.healthcare.execTriggers.slice(1)
    ]
  }),

  assembleAccount("manufacturing", {
    id: "acc-siemens",
    name: "Siemens Digital Industries",
    tier: 2,
    industry: "Manufacturing / Industrial",
    briefDescriptor:
      "Industrial automation leader; OT historians and MES hold truth, Snowflake not yet the operational nervous system.",
    why_now:
      "Plant consolidation and Industry 4.0 mandates require OT data in one place — board is watching downtime minutes.",
    whats_broken:
      "Historians and MES hold the truth; Snowflake is a sidecar instead of the real-time operational layer.",
    hypothesis:
      "The risk is not more sensors; it’s that OT truth never reaches the layer where maintenance and finance actually decide.",
    first_workload:
      "Multi-line sensor dashboard with anomaly flags from streaming historian feeds into Snowflake.",
    proof_point:
      "In 48 hours: streaming historian slice → Snowflake dashboard with one anomaly drill — time-to-flag in the room.",
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
    },
    personaIndices: [0, 1, 2, 3, 4],
    useCases: [
      {
        id: "siemens-wedge-ot-dashboard",
        title: "OT: historian → Snowflake real-time line health before unplanned downtime",
        summary:
          "Siemens plants still discover failures after the line stops; maintenance needs hours-early signal.",
        first_workload:
          "Dynamic Tables from historian + Streamlit multi-line anomaly dashboard.",
        demoPersonaTemplateId: "mfg-vp-ops-technology"
      },
      {
        id: "siemens-wedge-supplier-risk",
        title: "Supply chain: tier-1 supplier risk with external signals",
        summary:
          "Post-disruption, Siemens procurement rebuilt spreadsheets; exec wants live supplier concentration.",
        first_workload:
          "Cortex Analyst on supplier master + Marketplace risk feeds — one question, one list.",
        demoPersonaTemplateId: "mfg-csco"
      },
      {
        id: "siemens-wedge-quality-trace",
        title: "Quality: lot-level trace + ML root cause across Siemens plants",
        summary:
          "Defect investigations still span four systems; quality needs one lot search.",
        first_workload:
          "Cortex Search + Snowpark ML root cause on serialized lot + machine variables.",
        demoPersonaTemplateId: "mfg-head-quality-engineering"
      },
      {
        id: "siemens-wedge-digital-twin",
        title: "Digital manufacturing: twin data foundation from live feeds",
        summary:
          "Digital twin program stalled because process parameters weren’t current in one place.",
        first_workload:
          "Dynamic Tables state + Streamlit what-if on CNC parameters.",
        demoPersonaTemplateId: "mfg-dir-digital-manufacturing"
      },
      {
        id: "siemens-wedge-fpa-close",
        title: "Plant FP&A: close variance in hours, not Excel marathons",
        summary:
          "Siemens finance still consolidates plant P&L in Excel for days after month-end.",
        first_workload:
          "Cortex Analyst on plant COGS variance — plain English question, drill-down table.",
        demoPersonaTemplateId: "mfg-vp-fpa"
      }
    ],
    execTriggers: [
      "Siemens plant consolidation or Industry 4.0 board mandate",
      "Major supply disruption affecting Siemens tier-1 suppliers",
      ...INDUSTRY_PLAYBOOKS.manufacturing.execTriggers.slice(1)
    ]
  }),

  assembleAccount("healthcare", {
    id: "acc-unitedhealth",
    name: "UnitedHealth Group",
    tier: 2,
    industry: "Healthcare",
    briefDescriptor:
      "National payer; heavy Snowflake spend, uneven activation across payer and clinical analytics teams.",
    why_now:
      "Stars and HEDIS pressure is visible in executive OKRs; analytics teams are being asked for daily intervention lists.",
    whats_broken:
      "Snowflake spend is growing but persona coverage is uneven — payer analytics and clinical still siloed.",
    hypothesis:
      "The risk is not weekly batch scoring; it’s that Stars and HEDIS incentives require daily intervention lists nobody can produce on demand.",
    first_workload:
      "Daily risk stratification refresh (Dynamic Tables + Snowpark ML) replacing weekly batch scoring.",
    proof_point:
      "In 48 hours: daily refresh DAG + before/after score freshness on one market — gap closure list in the meeting.",
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
    },
    personaIndices: [0, 1, 2, 3, 4],
    useCases: [
      {
        id: "uhg-wedge-stars-daily",
        title: "Medicare Advantage: daily Stars/HEDIS intervention lists",
        summary:
          "UnitedHealth MA plans need same-day gap lists; weekly batch misses mid-year CMS shifts.",
        first_workload:
          "Daily Dynamic Tables refresh into pop health Cortex Analyst app for one region.",
        demoPersonaTemplateId: "hc-cao"
      },
      {
        id: "uhg-wedge-denial",
        title: "OptumInsight: denial prediction tied to Optum payment workflows",
        summary:
          "UnitedHealth still loses margin to denials discovered after submission at scale.",
        first_workload:
          "Snowpark ML at submission on Optum-coded claims — score before leave workflow.",
        demoPersonaTemplateId: "hc-vp-revenue-cycle"
      },
      {
        id: "uhg-wedge-fhir",
        title: "Clinical integration: FHIR access for UM without Epic tickets",
        summary:
          "Utilization management waits on extracts; UnitedHealth needs governed cohorts faster.",
        first_workload:
          "Bulk FHIR + Streamlit UM cohort filters in Snowflake.",
        demoPersonaTemplateId: "hc-dir-clinical-informatics"
      },
      {
        id: "uhg-wedge-risk-daily",
        title: "Population health: replace weekly UM risk batch with daily scoring",
        summary:
          "UnitedHealth care management targets weekly lists; ED visits happen between batches.",
        first_workload:
          "Daily Snowpark risk + Dynamic Tables to care manager app.",
        demoPersonaTemplateId: "hc-head-pop-health"
      },
      {
        id: "uhg-wedge-phi",
        title: "Enterprise: PHI governance for research and payer analytics together",
        summary:
          "UnitedHealth needs one PHI policy for research sandboxes and payer models.",
        first_workload:
          "Masking policies + clean room aggregate for research query.",
        demoPersonaTemplateId: "hc-cio-ciso"
      }
    ],
    execTriggers: [
      "UnitedHealth Stars or MA margin pressure in earnings narrative",
      "CMS rule change affecting UnitedHealth reporting timelines",
      ...INDUSTRY_PLAYBOOKS.healthcare.execTriggers.slice(2)
    ]
  }),

  assembleAccount("pharma", {
    id: "acc-novartis",
    name: "Novartis",
    tier: 3,
    industry: "Pharma / Life Sciences",
    briefDescriptor:
      "Top-tier pharma; platform present, expansion opportunistic until a regulatory or trial trigger creates urgency.",
    why_now:
      "Pipeline and launch calendar is active but expansion is opportunistic — monitor for regulatory or M&A signals.",
    whats_broken:
      "Same pattern as peers: platform present, personas under-mapped, Snowpark and governance under-activated.",
    hypothesis:
      "The risk is not Snowflake capacity; it’s that activation waits for a trigger instead of a named wedge and owner.",
    first_workload:
      "RWE clean room join demo (claims + EHR) when data-sharing pain resurfaces in vendor discussions.",
    proof_point:
      "In 48 hours: working clean room join + “what neither party sees” walkthrough — legal posture in one session.",
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
    },
    personaIndices: [0, 3, 4],
    useCases: [
      {
        id: "novartis-wedge-rwe-trigger",
        title: "RWE: vendor data-sharing wall — clean room as the unlock",
        summary:
          "Novartis RWE studies stall when second vendor won’t share raw; legal needs provable non-exposure.",
        first_workload:
          "Clean room join demo with claims + EHR synthetic — query output both sides can approve.",
        demoPersonaTemplateId: "pharma-dir-rwe"
      },
      {
        id: "novartis-wedge-commercial",
        title: "Launch: HCP targeting velocity for upcoming brand push",
        summary:
          "Novartis commercial needs faster targeting iterations than BI cycle allows pre-launch.",
        first_workload:
          "Streamlit HCP filter with Marketplace joins — one session build.",
        demoPersonaTemplateId: "pharma-head-commercial-analytics"
      },
      {
        id: "novartis-wedge-rnd-cohort",
        title: "R&D: Snowpark cohort when trial program hits enrollment stress",
        summary:
          "When Novartis trial hits recruitment issues, SAS latency blocks scenario modeling.",
        first_workload:
          "Snowpark cohort scoring notebook in Snowflake vs overnight SAS — timed comparison.",
        demoPersonaTemplateId: "pharma-vp-data-science"
      }
    ]
  }),

  assembleAccount("financial", {
    id: "acc-wells",
    name: "Wells Fargo",
    tier: 3,
    industry: "Financial Services",
    briefDescriptor:
      "National bank; Snowflake in place, front-office and compliance adoption still initiative-by-initiative.",
    why_now:
      "Transformation milestones are episodic — best entry is aligned to exam, integration, or digital initiative news.",
    whats_broken:
      "Snowflake footprint without full front-office and compliance adoption — expansion is motion-dependent.",
    hypothesis:
      "The risk is not footprint; it’s that expansion only lands when tied to a named initiative with a single owner.",
    first_workload:
      "Advisor next-best-action Streamlit when wealth leadership prioritizes advisor tooling.",
    proof_point:
      "In 48 hours: Streamlit slice of advisor book + propensity — one rep workflow, no BI export.",
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
    },
    personaIndices: [4, 3, 2],
    useCases: [
      {
        id: "wells-wedge-wealth-nba",
        title: "Wealth: advisor next-best-action tied to Wells transformation initiative",
        summary:
          "Wells advisors still prioritize in spreadsheets; leadership wants in-workflow propensity when the initiative lands.",
        first_workload:
          "Streamlit advisor book with propensity + talk track — pilot branch.",
        demoPersonaTemplateId: "fs-head-client-analytics"
      },
      {
        id: "wells-wedge-de-spark",
        title: "Data engineering: retire one Spark chain on risk aggregates",
        summary:
          "Wells DE maintains parallel Spark for aggregates Snowflake could refresh natively.",
        first_workload:
          "Dynamic Tables proof on one risk aggregate — cost and latency vs Spark.",
        demoPersonaTemplateId: "fs-vp-data-engineering"
      },
      {
        id: "wells-wedge-aml",
        title: "Compliance: SAR draft acceleration under consent-order scrutiny",
        summary:
          "When exam pressure returns, AML narrative backlog becomes executive-visible.",
        first_workload:
          "Cortex LLM SAR draft from flagged transactions — human-in-loop.",
        demoPersonaTemplateId: "fs-cco"
      }
    ]
  }),

  assembleAccount("healthcare", {
    id: "acc-mayo",
    name: "Mayo Clinic",
    tier: 3,
    industry: "Healthcare",
    briefDescriptor:
      "Academic medical center; strong governance; Snowflake wins require PHI posture and research alignment.",
    why_now:
      "Research and clinical operations compete for attention — opportunistic entry on IRB or Epic-adjacent projects.",
    whats_broken:
      "Strong IT governance can slow activation; Snowflake wins require clear PHI posture and research alignment.",
    hypothesis:
      "The risk is not governance; it’s that research and ops can’t share a PHI story without a provable clean room path.",
    first_workload:
      "De-identification + clean room for research cohorts when IRB pushes on data access boundaries.",
    proof_point:
      "In 48 hours: masked PHI view + clean room aggregate query — IRB-ready story in one walkthrough.",
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
    },
    personaIndices: [4, 2, 3],
    useCases: [
      {
        id: "mayo-wedge-phi-research",
        title: "Research: IRB-ready PHI masking + clean room for cohort outcomes",
        summary:
          "Mayo research needs outcomes queries without exposing identifiers to the wrong teams.",
        first_workload:
          "Role-based masking + clean room aggregate — same dataset, two proofs.",
        demoPersonaTemplateId: "hc-cio-ciso"
      },
      {
        id: "mayo-wedge-fhir",
        title: "Clinical informatics: Epic FHIR to analyst self-service for trials",
        summary:
          "Mayo trial coordinators wait on IT for cohort pulls; IRB wants auditability.",
        first_workload:
          "Bulk FHIR landing + Streamlit trial cohort app in Snowflake.",
        demoPersonaTemplateId: "hc-dir-clinical-informatics"
      },
      {
        id: "mayo-wedge-pop",
        title: "Population health: plain-language queries for care teams on Mayo attributed panels",
        summary:
          "Mayo care teams need lists without SQL; governance requires Cortex path.",
        first_workload:
          "Cortex Analyst on attributed members — one question, one list.",
        demoPersonaTemplateId: "hc-head-pop-health"
      }
    ]
  })
];

export const ACCOUNTS_BY_ID: Record<string, AccountConfig> = Object.fromEntries(
  ACCOUNTS.map((a) => [a.id, a])
);

export const DEFAULT_ACCOUNT_ID = ACCOUNTS[0]?.id ?? "";

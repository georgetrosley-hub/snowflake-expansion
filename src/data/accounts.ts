import type {
  AccountConfig,
  AccountTier,
  DealIntelligence,
  DealPath,
  PipelineSnapshot,
  PlaybookKey
} from "@/types";
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
    dealIntelligence: DealIntelligence;
    pipelineSnapshot: PipelineSnapshot;
    whySnowflakeWins: readonly [string, string, string];
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
    dealIntelligence: spec.dealIntelligence,
    pipelineSnapshot: spec.pipelineSnapshot,
    whySnowflakeWins: spec.whySnowflakeWins,
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
    dealIntelligence: {
      entryPoint: "VP Data Science (R&D) — land on Snowpark ML cohort scoring vs overnight SAS before readout season peaks.",
      expansionPath: [
        "Prove governed cohort + timing win in R&D with a named trial metric.",
        "Pull CDO + regulatory into Horizon / Cortex lineage for FDA posture.",
        "Expand Streamlit apps into commercial with Marketplace joins.",
        "Tie renewal to launch calendar and pipeline milestones."
      ],
      economicBuyer: "Chief Data Officer (platform + governance ROI) with CFO on trial-cycle velocity and commercial launch efficiency.",
      technicalBuyer: "VP Data Science (R&D) owns the Snowpark model; Head of Commercial Analytics validates downstream apps.",
      keyRisk:
        "R&D treats SAS as ‘real’ modeling; if the first win doesn’t hit a readout decision timeline, the wedge stalls before commercial pulls budget.",
      competitorStatusQuo:
        "SAS batch jobs + spreadsheet exports for R&D; legacy BI for commercial; ‘good enough’ warehouse for IT-led pipelines.",
      landStrategy:
        "Anchor a single trial cohort score in Snowflake with a wall-clock comparison to the SAS job, then lock a 30-day success path with R&D leadership.",
      expandStrategy:
        "Sequence governance and Cortex to the regulatory narrative, then fund Streamlit commercial plays off the same governed data products."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$1.5M – $2.8M",
      dealLikelihood: "High",
      timeline: "Q2 FY26 · initial land",
      firstMeetingTarget: "VP Data Science (R&D)"
    },
    whySnowflakeWins: [
      "Snowpark runs cohort scoring on OMOP-aligned enrollment + trial data already in Snowflake for IT-led workloads — R&D proves speed without standing up a parallel science stack.",
      "Side-by-side vs overnight SAS lands in days, not a multi-quarter modeling platform bake-off — readout and enrollment decisions don’t wait on infra.",
      "Governance, Cortex, and ML share one platform — regulatory lineage and commercial Streamlit aren’t separate compliance or BI projects."
    ],
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
    dealIntelligence: {
      entryPoint: "Chief Risk Officer — start with governed risk Q&A + lineage in a Basel / exam prep window.",
      expansionPath: [
        "Prove one regulatory question answered in-session with full lineage.",
        "Snowpark quant path on tick data without export.",
        "AML narrative at ops scale for FinCEN timelines.",
        "Standardize new analytics workloads on Snowflake."
      ],
      economicBuyer: "CRO + CFO (capital / op risk) with CCO on compliance and audit defensibility.",
      technicalBuyer: "VP Data Engineering (platform) + Head of Quant Research (workloads) — security and model governance gates.",
      keyRisk:
        "Exam or initiative timing slips; without a single named regulatory deliverable, the deal stays a platform discussion.",
      competitorStatusQuo:
        "Spark/SAS for risk aggregates; separate BI and narrative tools; export to local Python for front office.",
      landStrategy:
        "Attach to Basel or exam prep with a 48-hour Cortex Analyst proof on aggregated exposure — one live question, one lineage trail.",
      expandStrategy:
        "Use the risk win to unlock Snowpark for quants, then push AML narrative and Dynamic Tables to retire parallel Spark chains."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$2.0M – $4.2M",
      dealLikelihood: "High",
      timeline: "Q2–Q3 FY26 · exam-aligned",
      firstMeetingTarget: "Chief Risk Officer"
    },
    whySnowflakeWins: [
      "Risk aggregates and exposure tables already consolidate in Snowflake — Cortex + Horizon add plain-English answers and lineage without a fifth reporting system for exams.",
      "A defensible regulatory answer with a named lineage path in days — not a 6-month data movement program before the next MRA.",
      "Snowpark keeps tick and quant work inside policy — no new export pipeline that security will block under front-office pressure."
    ],
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
    dealIntelligence: {
      entryPoint: "Chief Analytics Officer — population health plain-language query with governance for VBC.",
      expansionPath: [
        "Win on Cortex Analyst for care managers without BI tickets.",
        "Add denial ML and Dynamic Tables feeds from Epic-adjacent data.",
        "FHIR pipeline for analyst self-service.",
        "Expand enterprise agreement across regions."
      ],
      economicBuyer: "CAO + VP Revenue Cycle (margin / denial dollars) with payer leadership on VBC incentives.",
      technicalBuyer: "Director Clinical Informatics + CIO/CISO for Epic boundaries and PHI posture.",
      keyRisk:
        "Epic extract queues and IT change freezes; if the first win doesn’t hit a contract metric, expansion waits for the next budget cycle.",
      competitorStatusQuo:
        "Weekly batch reports + BI tickets; Epic as the only ‘trusted’ surface; spreadsheets for gap closure.",
      landStrategy:
        "Pick one attributed population and one plain-English question; deliver the intervention list in a live session with care managers.",
      expandStrategy:
        "Tie denial ML and daily refresh to revenue integrity, then sell FHIR landing as the unlock for analyst self-service."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$850K – $1.5M",
      dealLikelihood: "Medium",
      timeline: "Q3 FY26",
      firstMeetingTarget: "Chief Analytics Officer"
    },
    whySnowflakeWins: [
      "Attributed member and claims paths already land for analytics — Cortex and Snowpark extend what’s governed today instead of copying PHI into another warehouse.",
      "Care-manager intervention lists in days — not another BI ticket queue while VBC contracts demand daily gap closure.",
      "Bulk FHIR + masking reuse Snowflake roles and Epic-adjacent feeds — fewer one-off regulated pipes every time analysts need a cohort."
    ],
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
    dealIntelligence: {
      entryPoint: "VP Operations Technology — OT historian streaming into Snowflake for line health before downtime.",
      expansionPath: [
        "Land OT streaming + real-time dashboard.",
        "Supplier risk intel with Marketplace signals.",
        "Quality traceability ML across plants.",
        "Digital twin foundation for enterprise rollout."
      ],
      economicBuyer: "Chief Supply Chain Officer + plant FP&A (downtime and supplier disruption dollars).",
      technicalBuyer: "VP Ops Technology + OT security — connectivity, segmentation, and MES/historian truth.",
      keyRisk:
        "OT security and change control slow connectivity; pilots stall if anomaly signal doesn’t tie to a maintenance action.",
      competitorStatusQuo:
        "Historians and MES per plant; Excel for FP&A close; point BI tools for operations.",
      landStrategy:
        "Anchor on one line or one plant with streaming historian → anomaly drill-down in one executive readout.",
      expandStrategy:
        "Layer supplier risk and quality ML as follow-on modules, then position the twin as the enterprise data foundation."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$1.1M – $1.9M",
      dealLikelihood: "Medium",
      timeline: "Q3 FY26 · OT pilot window",
      firstMeetingTarget: "VP Operations Technology"
    },
    whySnowflakeWins: [
      "Historian and MES truth stream in without replacing plants — Dynamic Tables + Streamlit sit on OT data the team already owns.",
      "Line health and anomaly signal in weeks — not a new cross-plant data lake program before the board sees downtime minutes move.",
      "Supplier risk and plant KPIs join in one environment — no separate “ops hub” science project when disruption is already on the exec agenda."
    ],
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
    dealIntelligence: {
      entryPoint: "Chief Analytics Officer — daily Stars/HEDIS intervention lists vs weekly batch scoring.",
      expansionPath: [
        "Daily scoring pilot on one MA market.",
        "Expand to additional lines of business.",
        "PHI masking + clean rooms for research use cases.",
        "Corporate standard for new analytics products."
      ],
      economicBuyer: "VP Medicare Advantage + CAO — Stars bonus and quality dollars at stake.",
      technicalBuyer: "Enterprise data office + population health leadership — pipeline SLAs and PHI policy.",
      keyRisk:
        "Internal platform fatigue; if daily refresh doesn’t change gap closure actions in-market, the pilot dies as a reporting exercise.",
      competitorStatusQuo:
        "Weekly batch risk scores + legacy BI; fragmented analytics between payer and clinical teams.",
      landStrategy:
        "Pick one region and one daily list tied to a named Stars measure; show before/after freshness in the same forum.",
      expandStrategy:
        "Roll geography by geography with LOB expansion, then sell governance + clean rooms as the enterprise cross-LOB story."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$1.2M – $2.6M",
      dealLikelihood: "Medium",
      timeline: "Q2–Q3 FY26",
      firstMeetingTarget: "Chief Analytics Officer (Medicare Advantage)"
    },
    whySnowflakeWins: [
      "Payer and Optum analytics already run at scale in Snowflake — daily Stars/HEDIS scoring adds DAGs and apps on the same governed member plane, not a second warehouse for ‘real time.’",
      "Intervention lists tied to named measures in days — not another annual BI roadmap while CMS moves mid-year.",
      "PHI masking and clean rooms attach to the same roles and datasets research and MA already fight over — one policy story instead of duplicate consent architectures."
    ],
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
    dealIntelligence: {
      entryPoint: "Director RWE — clean room when vendor data-sharing blocks a study (or VP Data Science if trial stress hits).",
      expansionPath: [
        "Attach to a named RWE or trial trigger event.",
        "Re-engage with a scoped demo tied to legal and procurement.",
        "Pilot workload with success metrics.",
        "Expand on proof; avoid broad platform pitches."
      ],
      economicBuyer: "Procurement + RWE leadership — vendor spend and study throughput.",
      technicalBuyer: "IT alliance + data science — integration and governance acceptance.",
      keyRisk:
        "Opportunistic motion without a calendar trigger; deal stays in ‘monitor’ until a compelling event forces a named owner.",
      competitorStatusQuo:
        "SAS and vendor duplicative feeds; ‘wait for the next initiative’ as default.",
      landStrategy:
        "Lead with a clean room join that proves non-exposure to both sides — legal in the room, not a slide.",
      expandStrategy:
        "After the first proof, attach Snowpark cohort and commercial Streamlit to specific launch or enrollment pressure."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$450K – $950K",
      dealLikelihood: "Low",
      timeline: "Q3–Q4 FY26 · trigger-led",
      firstMeetingTarget: "Director, RWE"
    },
    whySnowflakeWins: [
      "Snowflake is already the contract for enterprise analytics — clean room + Snowpark activate vendor-blocked RWE without a net-new platform evaluation when the trigger hits.",
      "Legal sees non-exposure in a working join in one session — not a 9-month ‘data collaboration’ program before the study moves.",
      "RWE, commercial, and R&D cohort work reuse the same governance and Marketplace paths — not three duplicate spend lines on parallel stacks."
    ],
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
    dealIntelligence: {
      entryPoint: "Head of Client Analytics — advisor next-best-action when a wealth transformation initiative is active.",
      expansionPath: [
        "Align to a named initiative owner with a single success metric.",
        "Pilot Streamlit advisor workflow in a branch or region.",
        "Scale Dynamic Tables to retire parallel Spark on risk aggregates.",
        "Expand compliance narratives under exam pressure."
      ],
      economicBuyer: "Wealth platform owner + CFO — AUM lift and advisor productivity.",
      technicalBuyer: "VP Data Engineering — pipeline and policy compliance for exports.",
      keyRisk:
        "Initiative timing; without a single named program, Wells expands initiative-by-initiative and the deal fragments.",
      competitorStatusQuo:
        "Spreadsheet prioritization for advisors; parallel Spark for aggregates; manual SAR narrative under pressure.",
      landStrategy:
        "Anchor a Streamlit slice of advisor book + propensity to one pilot with a 30-day usage metric.",
      expandStrategy:
        "Use the pilot to win Dynamic Tables for risk feeds, then attach AML/Cortex when exam pressure resurfaces."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$350K – $750K",
      dealLikelihood: "Low",
      timeline: "Q3–Q4 FY26 · initiative gate",
      firstMeetingTarget: "Head of Client Analytics (Wealth)"
    },
    whySnowflakeWins: [
      "Advisor and risk feeds already land in governed Snowflake environments — Streamlit propensity sits on existing data, not a rip-and-replace wealth platform.",
      "A working advisor slice in two sprints — not a year-long initiative queue for ‘digital experience.’",
      "Dynamic Tables retires Spark on risk aggregates already in Snowflake — fewer regulated pipes and fewer jobs that break when the initiative clock is ticking."
    ],
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
    dealIntelligence: {
      entryPoint: "CIO / CISO — PHI masking + clean room when IRB or research pushes on data boundaries.",
      expansionPath: [
        "Security-first briefing with IRB and research IT.",
        "Pilot with a narrow cohort and audit trail.",
        "Bulk FHIR for trial self-service.",
        "Expand governed research footprint."
      ],
      economicBuyer: "Research leadership + finance — study throughput and compliance review cost.",
      technicalBuyer: "CIO/CISO + clinical informatics — Epic boundaries and PHI policy.",
      keyRisk:
        "Governance cycles; if the first session doesn’t satisfy IRB and security jointly, the project stalls in review.",
      competitorStatusQuo:
        "Epic extracts and ticket queues; siloed research sandboxes without a shared PHI story.",
      landStrategy:
        "Deliver masked views + clean room aggregate in one walkthrough — IRB and security in the same room.",
      expandStrategy:
        "After trust, land FHIR + Streamlit for trial cohorts; then widen to population health queries with the same governance spine."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$400K – $900K",
      dealLikelihood: "Low",
      timeline: "Q4 FY26 · IRB / security path",
      firstMeetingTarget: "CIO / CISO (research governance)"
    },
    whySnowflakeWins: [
      "Masking and clean room attach to the research datasets Mayo already routes through Snowflake — IRB and security audit one policy surface, not a new PHI copy per study.",
      "IRB-ready walkthrough in days — not a new research infrastructure program every time access boundaries shift.",
      "FHIR, trial cohorts, and pop health queries share the same governance spine — so research doesn’t fork into another siloed sandbox."
    ],
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

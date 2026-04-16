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
  assembleAccount("healthcare", {
    id: "acc-health-union",
    name: "Health Union",
    tier: 1,
    industry: "Healthcare / Digital health & media",
    briefDescriptor:
      "Patient and HCP engagement plus media monetization; post–Adfire acquisition, audiences and outcomes must unify without breaking revenue or compliance.",
    why_now:
      "Adfire closes the data-integration clock — the next sponsorship and formulary cycles need one governed story for who you reach, what clinicians do, and what you earn.",
    whats_broken:
      "Patient engagement, HCP targeting, and media performance sit in separate stacks — no joinable truth for attribution, audience quality, or regulatory defense.",
    hypothesis:
      "Monetization risk is not ‘more Snowflake’ — it’s that GTM and clinical analytics cannot prove the same cohort in one place when buyers and regulators ask.",
    first_workload:
      "Unified patient + HCP identity and consent graph in Snowflake — first scope: one therapeutic area with overlap, eligibility, and campaign attribution.",
    proof_point:
      "Within 48 hours: one joint attributed cohort (patients + eligible HCPs) with lineage from source systems — no manual spreadsheet reconciliation.",
    economic_impact:
      "Higher sponsor renewal and CPM when audience quality is provable; fewer wasted placements; lower compliance exposure from inconsistent audience claims.",
    deal_path: {
      stakeholders: [
        "Chief Analytics Officer",
        "Chief Revenue Officer",
        "Chief Privacy / Compliance Officer",
        "VP Data Engineering / IT"
      ],
      expansionFlow: [
        "Identity + consent graph in Snowflake for one TA",
        "Attribution and sponsor reporting on governed joins",
        "Cross-brand audience products and Marketplace enrichment",
        "Enterprise standard for monetization and compliance reviews"
      ]
    },
    dealIntelligence: {
      entryPoint:
        "Chief Analytics Officer — own the post-Adfire narrative: one audience layer that Finance and Privacy can defend in the same room.",
      expansionPath: [
        "Prove one TA cohort + attribution with named lineage.",
        "Pull CRO + Privacy into governed reporting for sponsor QBRs.",
        "Expand Streamlit / Cortex surfaces for GTM self-service.",
        "Tie renewal to measurable lift in sponsor NPS and compliance audit pass rate."
      ],
      economicBuyer:
        "CRO + CFO — sponsorship yield and risk-adjusted revenue; CPO on consent and HIPAA posture.",
      technicalBuyer: "VP Data Engineering — pipelines, identity resolution, and Snowflake security model.",
      keyRisk:
        "Identity resolution stalls in legal — if the first workload doesn’t ship with a signed consent model, monetization stays on spreadsheets.",
      competitorStatusQuo:
        "Separate CDPs, media ad stacks, and clinical analytics; exports to spreadsheets for ‘real’ audience numbers.",
      landStrategy:
        "Scope one therapeutic area and one sponsor-facing metric; wall-clock proof vs. current consolidation process.",
      expandStrategy:
        "Sequence Privacy and GTM into the same Snowflake semantic layer, then fund additional TAs off the same patterns."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$1.2M – $2.4M",
      dealLikelihood: "High",
      timeline: "FY26 · post-integration window",
      firstMeetingTarget: "Chief Analytics Officer"
    },
    whySnowflakeWins: [
      "One platform for PHI-adjacent engagement data, HCP attributes, and media outcomes — governance and Cortex share the same objects as monetization.",
      "Native sharing and Marketplace reduce copy/paste between ‘clinical’ and ‘media’ teams when regulators ask who saw what.",
      "Streamlit and Cortex land on governed identity — not a separate visualization tool that drifts from the warehouse."
    ],
    personaIndices: [0, 1, 2, 3],
    useCases: [
      {
        id: "hu-wedge-unified-audience",
        title: "Unified audience: patient + HCP overlap for one therapeutic area",
        summary:
          "Post-Adfire, prove one attributed cohort that both GTM and medical affairs trust for the same launch narrative.",
        first_workload:
          "Identity graph + consent flags in Snowflake; Streamlit slice for eligible HCPs tied to engaged patients.",
        demoPersonaTemplateId: "hc-cao"
      },
      {
        id: "hu-wedge-sponsor-lineage",
        title: "Sponsor defense: lineage from raw engagement to reported reach",
        summary:
          "When a sponsor audits reach, the answer must be one query — not four exports.",
        first_workload:
          "Horizon lineage + Cortex Analyst question on campaign reach with full path.",
        demoPersonaTemplateId: "hc-cio-ciso"
      },
      {
        id: "hu-wedge-hcp-app",
        title: "HCP targeting without BI tickets between brand and analytics",
        summary:
          "Commercial needs same-day lists when creative or formulary shifts — not weekly batches.",
        first_workload:
          "Streamlit HCP filter on governed Snowflake tables with Marketplace enrichment.",
        demoPersonaTemplateId: "hc-head-pop-health"
      },
      {
        id: "hu-wedge-fhir-bridge",
        title: "Clinical informatics: governed Epic/FHIR access for trial and quality cohorts",
        summary:
          "Analysts still ticket IT for cohorts; unify Bulk FHIR landing with media-side identity.",
        first_workload:
          "Bulk FHIR pipeline + analyst app for one quality measure cohort.",
        demoPersonaTemplateId: "hc-dir-clinical-informatics"
      }
    ],
    execTriggers: [
      "Adfire integration milestone or executive town hall on unified data",
      "CMS / FDA communication on DTC or HCP promotion",
      "Major pharma sponsor renewal or RFP for condition-specific audience",
      "Health Union leadership change in analytics or revenue"
    ]
  }),

  assembleAccount("financial", {
    id: "acc-everstage",
    name: "Everstage",
    tier: 1,
    industry: "Revenue operations & incentive compensation (SaaS)",
    briefDescriptor:
      "CPQ, commissions, and sales planning — intelligence fragmented across systems while the category expects a single operating picture.",
    why_now:
      "Board and GTM leadership want one forecast and one payout story at quarter boundary — Finance, RevOps, and Sales still reconcile three spreadsheets.",
    whats_broken:
      "CPQ, commissions, and territory planning do not share a governed semantic model — every planning cycle is a dispute, not a decision.",
    hypothesis:
      "Category risk is not missing a warehouse — it’s that leadership cannot trust one number when quota, attainment, and planning disagree in public.",
    first_workload:
      "Single Snowflake semantic layer for quota, attainment, draws, and payout — one drill path from CRM to commission engine.",
    proof_point:
      "Within one week: region → rep → deal → calculated payout with lineage from source systems — repeatable in a live QBR.",
    economic_impact:
      "Shorter planning cycles; fewer commission corrections and disputes; reduced revenue leakage from timing errors.",
    deal_path: {
      stakeholders: [
        "VP Revenue Operations",
        "VP Data Engineering",
        "CFO / FP&A lead",
        "Chief Revenue Officer"
      ],
      expansionFlow: [
        "Semantic layer for QBR truth in Snowflake",
        "Cortex / Streamlit for self-serve planning what-if",
        "Expand to product usage and consumption metrics for SaaS expansion selling",
        "Enterprise standard for RevOps + Finance reporting"
      ]
    },
    dealIntelligence: {
      entryPoint:
        "VP Revenue Operations — anchor on one quarter-close metric everyone fights over (attainment vs. payout vs. plan).",
      expansionPath: [
        "Land governed slice: region → rep → deal → payout.",
        "Add FP&A and CRO to the same semantic layer for board prep.",
        "Snowpark for predictive attainment and territory planning.",
        "Package customer-facing proof for Everstage’s own GTM (meta motion)."
      ],
      economicBuyer: "CFO + CRO — forecast accuracy and sales efficiency as board-level metrics.",
      technicalBuyer: "VP Data Engineering — CRM, commission engine, and ERP connectors into Snowflake.",
      keyRisk:
        "RevOps owns the process but not IT priority — without a named exec sponsor, the semantic layer becomes a side project.",
      competitorStatusQuo:
        "Everstage UI + exports; Finance models in spreadsheets; planning in a separate planning tool.",
      landStrategy:
        "Pick one region and one payout dispute pattern; eliminate it with lineage in 10 days.",
      expandStrategy:
        "Use QBR credibility to pull FP&A and product analytics into the same warehouse for expansion and NRR storytelling."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$900K – $1.8M",
      dealLikelihood: "High",
      timeline: "FY26 · planning season",
      firstMeetingTarget: "VP Revenue Operations"
    },
    whySnowflakeWins: [
      "Snowflake is the neutral system of record between CRM, CPQ, and commission engines — Everstage benefits when customers trust one drill path.",
      "Dynamic Tables and tasks keep attainment current through month-end without another ETL product.",
      "Cortex and Streamlit turn the same semantic layer into exec answers — not a separate BI stack that diverges."
    ],
    personaIndices: [0, 1, 2, 3, 4],
    useCases: [
      {
        id: "ev-wedge-qbr-truth",
        title: "QBR truth: one drill from region to payout",
        summary:
          "Stop the quarterly argument — prove one path Sales and Finance sign.",
        first_workload:
          "Semantic views joining CRM stages, CPQ quotes, and commission results in Snowflake.",
        demoPersonaTemplateId: "fs-head-client-analytics"
      },
      {
        id: "ev-wedge-data-eng",
        title: "Pipeline freshness: Dynamic Tables from CRM and commission engine",
        summary:
          "Attainment that lags 24 hours loses trust — show always-current numbers.",
        first_workload:
          "Dynamic Tables + task graph for daily attainment vs. payout accrual.",
        demoPersonaTemplateId: "fs-vp-data-engineering"
      },
      {
        id: "ev-wedge-cro-forecast",
        title: "Risk-adjusted forecast: CRO asks one question before the board",
        summary:
          "Cortex Analyst on aggregated pipeline + commission exposure for downside cases.",
        first_workload:
          "Cortex Analyst on Snowflake marts — ‘top deals at risk of slip this quarter.’",
        demoPersonaTemplateId: "fs-cro"
      },
      {
        id: "ev-wedge-cco-policy",
        title: "Policy compliance: trace plan rules to paid outcomes",
        summary:
          "When plans change mid-quarter, prove who was paid under which rule version.",
        first_workload:
          "Versioned plan tables + lineage to payout with Horizon.",
        demoPersonaTemplateId: "fs-cco"
      }
    ],
    execTriggers: [
      "Everstage product launch affecting commissions or planning modules",
      "Customer logo win in enterprise RevOps press",
      "Quarter restatement or commission correction in public customer story",
      "Competitive displacement announcement (Spiff, CaptivateIQ)"
    ]
  }),

  assembleAccount("healthcare", {
    id: "acc-chalice-ai",
    name: "Chalice AI",
    tier: 2,
    industry: "Healthcare AI / clinical intelligence",
    briefDescriptor:
      "Custom AI models per healthcare client — onboarding and data access become the bottleneck to ARR and margin.",
    why_now:
      "Pipeline is growing faster than delivery — every new logo adds bespoke data work that strains professional services and margin.",
    whats_broken:
      "Each client brings its own EHR, claims, and consent posture — model onboarding is a snowflake of pipelines, not a repeatable product layer.",
    hypothesis:
      "Scaling risk is not model quality alone — it’s that Chalice cannot prove time-to-first-insight per client on a standard data plane.",
    first_workload:
      "Templated Snowflake project per client: Bulk FHIR + Snowpark feature store with one deployment playbook — first client in 30-day window.",
    proof_point:
      "Two clients side by side: same notebook pattern, different tenant databases — provision-to-first inference in a named SLA.",
    economic_impact:
      "Higher gross margin per implementation; faster logo-to-production; fewer services dollars per dollar of ARR.",
    deal_path: {
      stakeholders: [
        "VP Engineering / ML Platform",
        "Chief Technology Officer",
        "Head of Customer Success (enterprise)",
        "VP Professional Services"
      ],
      expansionFlow: [
        "Standard Snowflake tenant pattern + FHIR landing",
        "Snowpark model registry and monitoring per client",
        "Self-serve deployment metrics for Customer Success",
        "Multi-tenant expansion and Marketplace data reuse"
      ]
    },
    dealIntelligence: {
      entryPoint:
        "VP Engineering — reduce bespoke onboarding CPU; tie to margin and delivery SLAs the board already watches.",
      expansionPath: [
        "One reference architecture: tenant DB + FHIR + Snowpark.",
        "Operational dashboards for time-to-first model in production.",
        "PS scope reduction sold with every new enterprise deal.",
        "Snowflake credits bundled into Chalice pricing with governance story."
      ],
      economicBuyer: "CTO + CFO — COGS and delivery capacity per new logo.",
      technicalBuyer: "VP Engineering — ML platform, data isolation, and HIPAA posture.",
      keyRisk:
        "Services revenue masks the problem — if KPI isn’t margin per deployment, Snowflake looks like extra cost.",
      competitorStatusQuo:
        "Per-client VPC sprawl, bespoke Python environments, and manual handoffs to customer IT.",
      landStrategy:
        "Pick one enterprise client stuck in onboarding — migrate the critical path to the template in 4 weeks.",
      expandStrategy:
        "Productize monitoring and retraining in Snowflake; sell faster expansion inside existing accounts."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$650K – $1.3M",
      dealLikelihood: "Medium",
      timeline: "FY26 · delivery backlog",
      firstMeetingTarget: "VP Engineering / ML Platform"
    },
    whySnowflakeWins: [
      "Secure data isolation per client with one platform pattern — fewer one-off clouds to secure and audit.",
      "Snowpark keeps training and inference where PHI already landed — no export to external GPU farms for core paths.",
      "Horizon and masking policies scale with each new tenant instead of reinventing compliance per stack."
    ],
    personaIndices: [2, 0, 4, 1],
    useCases: [
      {
        id: "ch-wedge-fhir-template",
        title: "Client onboarding: Bulk FHIR + feature store template",
        summary:
          "Cut weeks off first model in production by standardizing ingestion and features.",
        first_workload:
          "Snowflake tenant + Bulk FHIR + Snowpark features for one pilot hospital system.",
        demoPersonaTemplateId: "hc-dir-clinical-informatics"
      },
      {
        id: "ch-wedge-cao-outcomes",
        title: "Prove outcomes: CAO-facing cohort app on governed data",
        summary:
          "Buyers need to see population outcomes, not notebooks — Streamlit on Snowflake.",
        first_workload:
          "Cortex + Streamlit for one clinical outcome metric tied to model predictions.",
        demoPersonaTemplateId: "hc-cao"
      },
      {
        id: "ch-wedge-phi-governance",
        title: "Tenant expansion: PHI masking and audit for each new client",
        summary:
          "Legal blocks reuse when masking isn’t policy-driven — Dynamic Masking + Horizon.",
        first_workload:
          "Role-based masking demo on shared schema pattern for multi-tenant.",
        demoPersonaTemplateId: "hc-cio-ciso"
      },
      {
        id: "ch-wedge-denials",
        title: "Payer-connected: denial and revenue-cycle signal for model features",
        summary:
          "Claims features without building a separate claims stack per client.",
        first_workload:
          "Snowpark ML on claims extracts co-located with clinical features.",
        demoPersonaTemplateId: "hc-vp-revenue-cycle"
      }
    ],
    execTriggers: [
      "Chalice AI Series B or staffing announcement",
      "Large health system logo with public case study",
      "ONC / HIPAA enforcement headline in AI documentation",
      "Competitor delay or outage in clinical AI delivery"
    ]
  }),

  assembleAccount("manufacturing", {
    id: "acc-ciena",
    name: "Ciena",
    tier: 2,
    industry: "Telecommunications equipment & network systems",
    briefDescriptor:
      "AI and automation backlog growing while operations and finance lack one real-time view of execution and margin.",
    why_now:
      "Product and services leadership are under margin pressure — AI initiatives multiply while plant and supply metrics still close on weekly batches.",
    whats_broken:
      "Engineering and ops AI workstreams are not tied to the same operational and financial truth — backlog, WIP, and margin signals diverge.",
    hypothesis:
      "The gap is not more models — it’s that leadership cannot see execution risk and margin impact in one hop when priorities compete.",
    first_workload:
      "Unified Snowflake layer for order backlog, shipment, and cost actuals — Dynamic Tables from ERP + MES with daily margin bridge.",
    proof_point:
      "Within two weeks: one executive view — backlog aging + projected margin by program with drill to line and supplier — vs. current consolidation time.",
    economic_impact:
      "Faster reallocation of engineering capacity; lower expedite and scrap; better pricing decisions when margin is current.",
    deal_path: {
      stakeholders: [
        "VP Operations Technology",
        "VP FP&A / Manufacturing finance",
        "Chief Supply Chain Officer",
        "Director Digital Manufacturing"
      ],
      expansionFlow: [
        "OT + ERP signals into Snowflake for one product line",
        "Cortex Analyst for exec questions on backlog and margin",
        "AI workstream prioritization tied to margin and ship date",
        "Enterprise standard for program and services P&L"
      ]
    },
    dealIntelligence: {
      entryPoint:
        "VP Operations Technology — align AI backlog to what the line and finance already agree is true.",
      expansionPath: [
        "Prove one program with live backlog + margin drill-down.",
        "Add supplier and services cost into the same semantic layer.",
        "Prioritize AI initiatives where margin impact is measurable.",
        "Expand to global plants with Secure Data Sharing between regions."
      ],
      economicBuyer: "COO + CFO — margin and on-time delivery as board metrics.",
      technicalBuyer: "VP Ops Technology + IT — historian, ERP, and MES integration.",
      keyRisk:
        "Manufacturing IT timeline — if OT integration slips, the deal stays a finance dashboard.",
      competitorStatusQuo:
        "Separate MES, ERP, and planning tools; Excel bridges for margin; AI in isolated sandboxes.",
      landStrategy:
        "Anchor on one high-visibility program with a missed quarter story — show live margin bridge.",
      expandStrategy:
        "Use exec Cortex wins to fund OT pipeline standardization on Snowflake."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$1.8M – $3.2M",
      dealLikelihood: "Medium",
      timeline: "FY26 · margin programs",
      firstMeetingTarget: "VP Operations Technology"
    },
    whySnowflakeWins: [
      "Dynamic Tables and streaming unify fast-changing OT and ERP signals without another proprietary historian cloud.",
      "One place for AI features and financial actuals — Snowpark models consume the same grain Finance trusts.",
      "Cortex closes the gap between the plant floor and the exec question — not a separate BI layer that lags."
    ],
    personaIndices: [0, 3, 4, 1],
    useCases: [
      {
        id: "ci-wedge-ot-dashboard",
        title: "Historian to margin: OT + ERP in one executive layer",
        summary:
          "Backlog and downtime visible next to margin — where AI should focus first.",
        first_workload:
          "Dynamic Tables from historian + ERP into Snowflake; Streamlit exec dashboard.",
        demoPersonaTemplateId: "mfg-vp-ops-technology"
      },
      {
        id: "ci-wedge-fpa-variance",
        title: "FP&A: plant variance in plain English after close",
        summary:
          "When margin moves, leadership asks why — answer in seconds, not three days.",
        first_workload:
          "Cortex Analyst on plant cost and revenue marts.",
        demoPersonaTemplateId: "mfg-vp-fpa"
      },
      {
        id: "ci-wedge-digital-twin",
        title: "Digital manufacturing: current-state twin data for AI prioritization",
        summary:
          "AI backlog tied to line state — Dynamic Tables feeding digital twin metrics.",
        first_workload:
          "Sensor + process parameters to Snowflake for one line with what-if in Streamlit.",
        demoPersonaTemplateId: "mfg-dir-digital-manufacturing"
      },
      {
        id: "ci-wedge-supplier",
        title: "Supply risk: tier-1 concentration with external signals",
        summary:
          "When suppliers slip, backlog and margin move together — join Marketplace risk to internal master.",
        first_workload:
          "Cortex Analyst on supplier master + Marketplace feeds.",
        demoPersonaTemplateId: "mfg-csco"
      }
    ],
    execTriggers: [
      "Ciena earnings call citing margin or supply chain pressure",
      "Large carrier or cloud network build announcement",
      "Plant or regional restructuring news",
      "AI partnership or acquisition in telecom infra"
    ]
  }),

  assembleAccount("financial", {
    id: "acc-sagent",
    name: "Sagent",
    tier: 2,
    industry: "Mortgage servicing technology (SaaS)",
    briefDescriptor:
      "Dara and platform rollout — servicers need proof of deployment success and outcomes across customers, not slide-level milestones.",
    why_now:
      "Dara is in market — every servicer asks whether implementation actually improved operations and compliance, not just whether go-live happened.",
    whats_broken:
      "Deployment telemetry and borrower outcomes are not unified per customer — Customer Success cannot prove value at renewal with one dataset.",
    hypothesis:
      "The risk is not feature parity — it’s that Sagent cannot show cross-customer deployment health and ROI on a governed plane.",
    first_workload:
      "Snowflake customer schemas for implementation events, loan metrics, and support signals — standard package per servicer tenant.",
    proof_point:
      "Within 30 days: one renewal QBR with before/after on delinquency, call volume, or SLA metrics straight from Snowflake — no manual extract.",
    economic_impact:
      "Higher net retention; shorter professional services; fewer at-risk renewals when value is visible early.",
    deal_path: {
      stakeholders: [
        "VP Customer Success (enterprise)",
        "VP Data / Analytics",
        "Chief Product Officer",
        "CTO"
      ],
      expansionFlow: [
        "Tenant telemetry + loan KPIs in Snowflake per customer",
        "Success dashboards and renewal scorecards",
        "Product analytics on feature adoption across tenants",
        "Embedded Snowflake offerings for servicer self-service analytics"
      ]
    },
    dealIntelligence: {
      entryPoint:
        "VP Customer Success — renewal risk tied to unprovable outcomes after Dara go-live.",
      expansionPath: [
        "Land one flagship servicer with full telemetry in Snowflake.",
        "Package QBR template with Snowflake-backed metrics.",
        "Product uses same data for roadmap and adoption.",
        "Sell analytics upsell to servicer buyers."
      ],
      economicBuyer: "CRO + CFO — NRR and services efficiency.",
      technicalBuyer: "CTO + VP Data — multi-tenant isolation and SOC2 evidence.",
      keyRisk:
        "Customers own their data contracts — if legal blocks tenant telemetry, proof stays anecdotal.",
      competitorStatusQuo:
        "Per-customer reporting in their tools; Sagent exports for quarterly business reviews.",
      landStrategy:
        "Co-build with one servicer facing renewal — metrics they already track, automated from Snowflake.",
      expandStrategy:
        "Productize scorecards; reduce PS hours per go-live; upsell Snowflake consumption to end servicers."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$500K – $1.1M",
      dealLikelihood: "Medium",
      timeline: "FY26 · Dara rollouts",
      firstMeetingTarget: "VP Customer Success"
    },
    whySnowflakeWins: [
      "Clean multi-tenant pattern with row access policies — each servicer’s data stays isolated with one ops model.",
      "Snowflake Marketplace can enrich with macro and credit data without copying sensitive files out.",
      "Same warehouse for product analytics and customer-facing proof — one pipeline story."
    ],
    personaIndices: [3, 4, 0, 2],
    useCases: [
      {
        id: "sa-wedge-renewal-scorecard",
        title: "Renewal scorecard: implementation + loan KPIs in one place",
        summary:
          "CS leads QBR with Snowflake-backed before/after — not slides from five systems.",
        first_workload:
          "Implementation milestones + loan performance marts per tenant.",
        demoPersonaTemplateId: "fs-head-client-analytics"
      },
      {
        id: "sa-wedge-data-eng",
        title: "Telemetry pipeline: Dynamic Tables from product and support systems",
        summary:
          "Deployment health when events stream reliably into Snowflake.",
        first_workload:
          "Event streams + tasks into tenant marts for health scoring.",
        demoPersonaTemplateId: "fs-vp-data-engineering"
      },
      {
        id: "sa-wedge-cro-risk",
        title: "Portfolio risk: CRO view of at-risk servicer deployments",
        summary:
          "Which customers are red before renewal — Cortex on aggregated signals.",
        first_workload:
          "Cortex Analyst on cross-tenant aggregates (aggregated only).",
        demoPersonaTemplateId: "fs-cro"
      },
      {
        id: "sa-wedge-cco-audit",
        title: "Compliance: audit trail for servicing rule changes",
        summary:
          "Regulators and buyers ask what changed — Horizon lineage from rule to outcome.",
        first_workload:
          "Governed audit tables + lineage for policy versions.",
        demoPersonaTemplateId: "fs-cco"
      }
    ],
    execTriggers: [
      "Dara rollout milestone or servicer press release",
      "CFPB or servicing enforcement headline",
      "Mortgage rate move affecting portfolio stress",
      "Sagent user conference or major customer logo"
    ]
  }),

  assembleAccount("financial", {
    id: "acc-us-financial-technology",
    name: "U.S. Financial Technology",
    tier: "2B",
    industry: "Asset servicing & portfolio analytics",
    briefDescriptor:
      "Massive assets under administration — portfolio anomalies surface too late for risk and client reporting.",
    why_now:
      "$6.5T on platform — regulators and institutional clients expect intraday awareness when concentration or settlement risk shifts.",
    whats_broken:
      "Anomaly detection and client reporting run on batch windows — issues that could have been caught pre-close are found in reconciliation.",
    hypothesis:
      "Risk exposure is not ‘more reports’ — it’s that anomalies must meet decision speed for the portfolio’s scale.",
    first_workload:
      "Snowflake near–real-time positions and cash + Snowpark anomaly scoring on concentration, settlement fails, and limit breaches.",
    proof_point:
      "In 48 hours: one named anomaly class (e.g., settlement concentration) scored continuously vs. prior batch detection lag — with audit trail.",
    economic_impact:
      "Lower operational loss and regulatory findings; better client retention on reporting timeliness; reduced overnight batch cost.",
    deal_path: {
      stakeholders: [
        "Chief Risk Officer",
        "Head of Portfolio Analytics",
        "Chief Data Officer",
        "COO (operations)"
      ],
      expansionFlow: [
        "Streaming positions + cash into Snowflake",
        "Snowpark anomaly detection with Horizon lineage",
        "Client-facing reporting on same marts",
        "Enterprise risk and regulatory narrative standard"
      ]
    },
    dealIntelligence: {
      entryPoint:
        "Chief Risk Officer — $6.5T scale makes batch lag a board-level operational risk topic.",
      expansionPath: [
        "Prove one anomaly type with wall-clock improvement.",
        "Expand to client reporting SLAs on the same data.",
        "Regulatory exam defense with lineage in-session.",
        "Cross-product expansion to lending and custody data."
      ],
      economicBuyer: "CRO + CFO — operational risk capital and client penalties.",
      technicalBuyer: "CDO + Head of Portfolio Analytics — model governance and data latency.",
      keyRisk:
        "Legacy mainframe and custody feeds block streaming — scope must be incremental or stalls.",
      competitorStatusQuo:
        "Risk on warehouse overnight batches; separate tools for client reporting; spreadsheets for ad hoc concentration.",
      landStrategy:
        "Attach to a near-miss or audit finding — name the anomaly class and the detection SLA.",
      expandStrategy:
        "Layer Cortex for plain-English risk questions after Snowpark scores are trusted."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$2.0M – $4.0M",
      dealLikelihood: "Medium",
      timeline: "FY26 · risk programs",
      firstMeetingTarget: "Chief Risk Officer"
    },
    whySnowflakeWins: [
      "Dynamic Tables and streaming ingest close the gap between custody truth and analytics without another proprietary risk engine.",
      "Snowpark keeps scoring next to positions — no export of sensitive balances to external ML.",
      "Horizon + Cortex for defensible answers under exam pressure — same objects risk and client reporting use."
    ],
    personaIndices: [0, 1, 2, 3],
    useCases: [
      {
        id: "usft-wedge-anomaly",
        title: "Intraday anomaly: concentration and settlement stress",
        summary:
          "Score positions continuously against policy — catch what batch missed.",
        first_workload:
          "Snowpark classification on streaming position snapshots in Snowflake.",
        demoPersonaTemplateId: "fs-cro"
      },
      {
        id: "usft-wedge-quant",
        title: "Quant path: factor risk without leaving Snowflake",
        summary:
          "Research and risk use the same intraday book — Snowpark for scenarios.",
        first_workload:
          "Snowpark notebooks on aggregated risk factors with governance.",
        demoPersonaTemplateId: "fs-head-quant-research"
      },
      {
        id: "usft-wedge-cortex",
        title: "Exam prep: CRO question with lineage in one session",
        summary:
          "When regulators ask, the answer is live — Cortex Analyst on risk marts.",
        first_workload:
          "Cortex Analyst on aggregated exposure tables with Horizon lineage.",
        demoPersonaTemplateId: "fs-cro"
      },
      {
        id: "usft-wedge-data-eng",
        title: "Pipeline: custody and cash feeds into Dynamic Tables",
        summary:
          "Foundation for anomalies — always-current book of record.",
        first_workload:
          "Dynamic Tables + tasks from core banking and custody feeds.",
        demoPersonaTemplateId: "fs-vp-data-engineering"
      }
    ],
    execTriggers: [
      "Fed or OCC stress testing commentary",
      "Institutional client RFP for reporting latency or transparency",
      "Settlement or market stress event in public news",
      "Executive change in risk or operations"
    ]
  }),

  assembleAccount("financial", {
    id: "acc-billtrust",
    name: "Billtrust",
    tier: "2B",
    industry: "Accounts receivable & B2B payments",
    briefDescriptor:
      "AR and payments data span buyers and sellers — no real-time intelligence layer for cash, DSO, and exceptions.",
    why_now:
      "Treasury and AR leadership are measured on cash conversion — batch AR aging and payment status leave money on the table every cycle.",
    whats_broken:
      "Invoices, remittance, and cash application sit in disconnected flows — intelligence arrives after decisions are already made.",
    hypothesis:
      "Cash flow inefficiency is not only DSO dashboards — it’s that exceptions and payer behavior aren’t operationalized at decision speed.",
    first_workload:
      "Snowflake real-time AR subledger + payment events — Dynamic Tables for application status and open AR by buyer.",
    proof_point:
      "Within two weeks: exception queue ranked by predicted delay + recommended action — measured vs. manual triage throughput.",
    economic_impact:
      "Lower DSO; fewer write-offs; reduced manual cash application FTE; better treasury forecasting.",
    deal_path: {
      stakeholders: [
        "VP Product / AR Platform",
        "VP Data",
        "Head of Treasury (buyer-side joint wins)",
        "CFO (mid-market customers)"
      ],
      expansionFlow: [
        "Unified AR + payment events in Snowflake",
        "Snowpark models for exception prediction",
        "Buyer-seller analytics products on shared patterns",
        "Embedded analytics for Billtrust customers"
      ]
    },
    dealIntelligence: {
      entryPoint:
        "VP Product — differentiate with intelligence, not just workflow — tie to customer NRR.",
      expansionPath: [
        "Land internal AR intelligence on Snowflake for Billtrust ops.",
        "Productize payer analytics for shared customers.",
        "Marketplace data for credit and payment behavior enrichment.",
        "Customer-facing Snowflake consumption model."
      ],
      economicBuyer: "CFO + CRO — ARR and margin on value-added analytics.",
      technicalBuyer: "VP Data — multi-tenant AR data and PCI-adjacent boundaries.",
      keyRisk:
        "Buyer data sensitivity — clean contracts for payer-level analytics or scope stays internal-only.",
      competitorStatusQuo:
        "Workflow-first AR; reporting in BI tools; spreadsheets for cash forecasting.",
      landStrategy:
        "One joint customer story — DSO reduction with named before/after.",
      expandStrategy:
        "Sell Snowflake-powered SKUs to Billtrust’s customer base as premium analytics."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$700K – $1.4M",
      dealLikelihood: "Medium",
      timeline: "FY26 · product differentiation",
      firstMeetingTarget: "VP Product or VP Data"
    },
    whySnowflakeWins: [
      "Events and balances in one place — Dynamic Tables match the speed AR exceptions need.",
      "Snowpark for prediction on payment behavior without exporting remittance data externally.",
      "Secure Data Sharing for buyer–seller joint analytics when contracts allow."
    ],
    personaIndices: [3, 4, 2, 0],
    useCases: [
      {
        id: "bt-wedge-dso",
        title: "DSO intelligence: live AR aging + payer behavior",
        summary:
          "Treasury sees risk before close — not Monday’s report.",
        first_workload:
          "AR events + cash application in Snowflake with daily Dynamic Tables refresh.",
        demoPersonaTemplateId: "fs-vp-data-engineering"
      },
      {
        id: "bt-wedge-client-analytics",
        title: "Customer analytics: which merchants bleed cash application time",
        summary:
          "Customer Success uses Snowflake-backed health scores.",
        first_workload:
          "Streamlit health dashboard on tenant metrics.",
        demoPersonaTemplateId: "fs-head-client-analytics"
      },
      {
        id: "bt-wedge-cco-controls",
        title: "Controls: lineage from invoice to cash for audits",
        summary:
          "SOC and customer audits ask for proof — Horizon on AR path.",
        first_workload:
          "Lineage from ingestion to reported AR position.",
        demoPersonaTemplateId: "fs-cco"
      },
      {
        id: "bt-wedge-cro-concentration",
        title: "Concentration: payer and credit risk in one view",
        summary:
          "Which customers concentrate failure risk — Cortex on enriched marts.",
        first_workload:
          "Cortex Analyst on payer concentration questions.",
        demoPersonaTemplateId: "fs-cro"
      }
    ],
    execTriggers: [
      "Interest rate or liquidity stress affecting B2B payment timing",
      "Billtrust product launch in AR intelligence or payments",
      "Large customer bankruptcy or DSO blowout in sector news",
      "Competitive win vs. legacy AR automation"
    ]
  }),

  assembleAccount("financial", {
    id: "acc-the-bancorp",
    name: "The Bancorp",
    tier: "2B",
    industry: "Branchless banking & embedded finance",
    briefDescriptor:
      "Embedded finance and partner programs — partner and program data fragmented across systems drives risk and compliance exposure.",
    why_now:
      "Partner and fintech volumes are growing — regulators and partners expect real-time visibility into program health and BSA/AML signals.",
    whats_broken:
      "Each partner program brings its own data feeds — risk and compliance cannot answer ‘what’s wrong across programs’ in one hop.",
    hypothesis:
      "Exposure is not only point-in-time reports — it’s that partner and transaction truth must be unified for compliance and capital decisions.",
    first_workload:
      "Snowflake program-centric model: partner, account, and transaction with row access policies — BSA/AML features co-located with product analytics.",
    proof_point:
      "Within 45 days: one exam-style question answered across programs with lineage (e.g., high-risk flow by partner) — vs. manual assembly.",
    economic_impact:
      "Lower compliance remediation cost; faster partner onboarding; reduced fraud and regulatory penalty risk.",
    deal_path: {
      stakeholders: [
        "Chief Compliance Officer",
        "Chief Risk Officer",
        "Chief Data Officer",
        "Head of Partner / Fintech programs"
      ],
      expansionFlow: [
        "Unified program and transaction hub in Snowflake",
        "AML and fraud models on shared features",
        "Partner-facing analytics and reporting products",
        "Enterprise governance for embedded finance growth"
      ]
    },
    dealIntelligence: {
      entryPoint:
        "Chief Compliance Officer — embedded finance scale makes manual program reporting untenable.",
      expansionPath: [
        "Prove cross-program query for one regulatory theme.",
        "Add fraud and credit models on same features.",
        "Partner co-branded analytics where permitted.",
        "Board reporting from single marts."
      ],
      economicBuyer: "CCO + CRO + CFO — regulatory, operational risk, and partner revenue.",
      technicalBuyer: "CDO — data mesh across partner feeds with policy enforcement.",
      keyRisk:
        "Partner contracts block consolidation — legal must bless combined analytics.",
      competitorStatusQuo:
        "Siloed databases per program; case management for AML; Excel for partner KPIs.",
      landStrategy:
        "Attach to exam prep or partner incident — named deliverable with timeline.",
      expandStrategy:
        "Use compliance win to unlock revenue analytics for partner managers."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$900K – $1.8M",
      dealLikelihood: "Medium",
      timeline: "FY26 · partner growth",
      firstMeetingTarget: "Chief Compliance Officer"
    },
    whySnowflakeWins: [
      "Row access policies and masking by program — one platform for many partners without blended PII.",
      "Snowflake as system of insight without moving raw partner data to external tools.",
      "Horizon for BSA/AML lineage when auditors trace alerts to source."
    ],
    personaIndices: [2, 3, 0, 4],
    useCases: [
      {
        id: "tb-wedge-aml-features",
        title: "BSA/AML: unified features across partner programs",
        summary:
          "Models see the same truth compliance reviews — Snowpark on unified marts.",
        first_workload:
          "Transaction + party graph in Snowflake; Snowpark risk scoring.",
        demoPersonaTemplateId: "fs-cco"
      },
      {
        id: "tb-wedge-data-platform",
        title: "Partner hub: governed ingestion for every new program",
        summary:
          "Reduce onboarding time with templated Snowflake schemas and tasks.",
        first_workload:
          "Dynamic Tables per program feed into shared dimensions.",
        demoPersonaTemplateId: "fs-vp-data-engineering"
      },
      {
        id: "tb-wedge-cro-program",
        title: "Program risk: CRO view of concentration by partner",
        summary:
          "Which embedded programs drive tail risk — Cortex on aggregated marts.",
        first_workload:
          "Cortex Analyst for concentration and limit questions.",
        demoPersonaTemplateId: "fs-cro"
      },
      {
        id: "tb-wedge-client-insights",
        title: "Partner success: analytics on program health for fintech partners",
        summary:
          "Revenue and risk together for relationship managers.",
        first_workload:
          "Streamlit program scorecard on Snowflake.",
        demoPersonaTemplateId: "fs-head-client-analytics"
      }
    ],
    execTriggers: [
      "FDIC or partner bank enforcement in embedded finance",
      "New fintech partner program launch (public)",
      "BSA/AML lookback or consent order in sector",
      "The Bancorp earnings call on partner or deposit growth"
    ]
  }),

  assembleAccount("financial", {
    id: "acc-sprinklr",
    name: "Sprinklr",
    tier: 3,
    industry: "Enterprise customer experience (CX) software",
    briefDescriptor:
      "CX data across channels and regions — no unified real-time intelligence for execs, CS, or product.",
    why_now:
      "Enterprise buyers ask for outcome-based contracts — Sprinklr needs the same intelligence layer to prove value and steer product.",
    whats_broken:
      "Social, care, ads, and survey data live in channel silos — unified ‘customer moment’ intelligence is batch and brittle.",
    hypothesis:
      "The gap is not another dashboard — it’s that real-time cross-channel context must sit on one governed plane for GTM and R&D.",
    first_workload:
      "Snowflake customer 360 from Sprinklr exports + usage telemetry — Dynamic Tables for freshness; Cortex for exec questions.",
    proof_point:
      "Within 30 days: one enterprise customer health score — sentiment + SLA + revenue risk — with drill to channel — vs. current weekly deck.",
    economic_impact:
      "Higher renewal and expansion; faster product prioritization; lower services cost per enterprise logo.",
    deal_path: {
      stakeholders: [
        "Chief Customer Officer / CS leadership",
        "VP Data & AI",
        "Chief Product Officer",
        "Enterprise sales leadership"
      ],
      expansionFlow: [
        "360 + telemetry in Snowflake for priority accounts",
        "Real-time health scoring and churn signals",
        "Product analytics on feature usage across tenants",
        "Customer-facing advanced analytics SKUs"
      ]
    },
    dealIntelligence: {
      entryPoint:
        "VP Data & AI — unify Sprinklr’s own operational intelligence before selling ‘unified CX’ externally.",
      expansionPath: [
        "Internal customer 360 for top logos.",
        "Snowpark models for expansion and churn.",
        "Package insights for enterprise buyers.",
        "Marketplace enrichment (sales, news) on Snowflake."
      ],
      economicBuyer: "CRO + CPO — NRR and product differentiation.",
      technicalBuyer: "VP Data & AI — multi-region and tenant scale.",
      keyRisk:
        "Sprinklr product roadmap competes for engineering — internal BI must show quick ROI.",
      competitorStatusQuo:
        "Per-channel reporting; warehouse for finance only; spreadsheets for QBRs.",
      landStrategy:
        "Pick one vertical (e.g., retail enterprise) and one churn save.",
      expandStrategy:
        "Turn internal pattern into customer-facing premium analytics."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$600K – $1.2M",
      dealLikelihood: "Low",
      timeline: "FY26 · opportunistic",
      firstMeetingTarget: "VP Data & AI"
    },
    whySnowflakeWins: [
      "Elastic scale for high-volume CX events with separation of hot storage and governance.",
      "Cortex for ‘why is this account red’ without another BI team in the middle.",
      "Snowpark for churn and expansion models on the same grain CS uses."
    ],
    personaIndices: [4, 3, 2, 1],
    useCases: [
      {
        id: "sp-wedge-360",
        title: "Enterprise 360: channels + usage + revenue in Snowflake",
        summary:
          "One health score CS and sales trust — Streamlit + Cortex.",
        first_workload:
          "Consolidated events + CRM tie-in with Dynamic Tables.",
        demoPersonaTemplateId: "fs-head-client-analytics"
      },
      {
        id: "sp-wedge-data-eng",
        title: "Telemetry: product usage streams into Snowflake",
        summary:
          "Feature adoption for roadmap — real-time, not monthly export.",
        first_workload:
          "Event pipeline + tasks into feature usage marts.",
        demoPersonaTemplateId: "fs-vp-data-engineering"
      },
      {
        id: "sp-wedge-cco",
        title: "Trust & safety: lineage for moderation and policy reporting",
        summary:
          "When buyers ask how decisions are made — Horizon on content policy data.",
        first_workload:
          "Governed tables for moderation outcomes + lineage.",
        demoPersonaTemplateId: "fs-cco"
      },
      {
        id: "sp-wedge-cro-churn",
        title: "Churn: Snowpark on signals CS already has",
        summary:
          "Prioritize saves with model transparency — same data as dashboards.",
        first_workload:
          "Snowpark classification on health features.",
        demoPersonaTemplateId: "fs-cro"
      }
    ],
    execTriggers: [
      "Sprinklr earnings or restructuring headline",
      "Major enterprise CX platform consolidation in news",
      "AI feature launch in social or care",
      "Large customer logo churn or win in press"
    ]
  }),

  assembleAccount("healthcare", {
    id: "acc-lyric",
    name: "Lyric",
    tier: 3,
    industry: "Healthcare payments & payer technology",
    briefDescriptor:
      "Pre-pay and post-pay claims intelligence — no closed loop from payment to clinical and financial outcomes.",
    why_now:
      "Payers and providers are squeezed on margin — optimization requires linking payment timing, claims outcome, and utilization in one loop.",
    whats_broken:
      "Pre-pay authorization and post-pay claims run on different timelines and systems — no feedback loop to improve authorization accuracy or payment policy.",
    hypothesis:
      "Missed optimization is not only claims volume — it’s that pre and post data never meet to tune policies and avoid denials.",
    first_workload:
      "Snowflake unified claims journey: authorization → service → payment → adjustment — Snowpark for leakage and policy lift analysis.",
    proof_point:
      "Within 60 days: one policy change recommendation with measured dollar impact (e.g., prior auth criteria) backed by Snowflake analysis — vs. static rules review.",
    economic_impact:
      "Lower denial and rework; faster payment; better MLR and provider satisfaction; fewer manual appeals.",
    deal_path: {
      stakeholders: [
        "VP Revenue Cycle / Payments",
        "Chief Analytics Officer",
        "Chief Medical Officer (utilization)",
        "CFO"
      ],
      expansionFlow: [
        "Unified claims journey in Snowflake",
        "Snowpark models for authorization and denial prediction",
        "Closed-loop tuning of payment policies",
        "Partner analytics for providers and employers"
      ]
    },
    dealIntelligence: {
      entryPoint:
        "VP Revenue Cycle — denial and delay dollars are visible; link pre-pay to post-pay to fix root cause.",
      expansionPath: [
        "Prove one loop metric with dollar tag.",
        "Add clinical features for utilization alignment.",
        "CMO and CFO join value story.",
        "Sell network analytics back to partners."
      ],
      economicBuyer: "CFO + CMO — MLR, cash, and member experience.",
      technicalBuyer: "CAO + VP Rev Cycle — claims data and model ops.",
      keyRisk:
        "Payer contracts limit data use — scope legal early for combined analytics.",
      competitorStatusQuo:
        "Pre-pay in one system, post-pay in another; appeals in case tools; Excel for ‘what if.’",
      landStrategy:
        "Anchor on one denial category with highest rework cost — show loop closure.",
      expandStrategy:
        "Use savings proof to fund enterprise Snowflake and partner data products."
    },
    pipelineSnapshot: {
      estimatedAcvRange: "$400K – $900K",
      dealLikelihood: "Low",
      timeline: "FY26 · opportunistic",
      firstMeetingTarget: "VP Revenue Cycle"
    },
    whySnowflakeWins: [
      "One place for claims, auth, and payment events — Snowpark closes the loop without exporting PHI.",
      "Dynamic Tables keep post-pay adjustments current for model retraining.",
      "Cortex for business questions on complex journeys without SQL for every stakeholder."
    ],
    personaIndices: [1, 0, 3, 2],
    useCases: [
      {
        id: "ly-wedge-loop",
        title: "Closed loop: pre-auth to payment outcome in one graph",
        summary:
          "See where policy leaks money — unified journey in Snowflake.",
        first_workload:
          "Claims + auth tables linked with Snowpark leakage analysis.",
        demoPersonaTemplateId: "hc-vp-revenue-cycle"
      },
      {
        id: "ly-wedge-denial-ml",
        title: "Denial prediction before submit — same data as post-pay",
        summary:
          "Train on outcomes that include post-pay — not siloed pre-pay only.",
        first_workload:
          "Snowpark ML on unified features from journey model.",
        demoPersonaTemplateId: "hc-vp-revenue-cycle"
      },
      {
        id: "ly-wedge-cao",
        title: "Population view: utilization tied to payment policy",
        summary:
          "CAO asks which members are harmed by policy friction.",
        first_workload:
          "Cortex Analyst on attributed member + claims journey.",
        demoPersonaTemplateId: "hc-cao"
      },
      {
        id: "ly-wedge-pop",
        title: "Care gap: when payment delay drives medical risk",
        summary:
          "Pop health sees financial and clinical together — Streamlit cohorts.",
        first_workload:
          "Risk stratification + payment delay flags in Snowflake.",
        demoPersonaTemplateId: "hc-head-pop-health"
      }
    ],
    execTriggers: [
      "CMS or state policy change on prior authorization",
      "Lyric customer or payer partnership announcement",
      "Healthcare payment reform headline (No Surprises, etc.)",
      "Denial rate spike in sector news"
    ]
  })
];

export const ACCOUNTS_BY_ID: Record<string, AccountConfig> = Object.fromEntries(
  ACCOUNTS.map((a) => [a.id, a])
);

export const DEFAULT_ACCOUNT_ID = ACCOUNTS[0]?.id ?? "";

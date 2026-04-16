import type { VerticalConfig, VerticalKey } from "@/types";

export const VERTICALS: Record<VerticalKey, VerticalConfig> = {
  "Pharma / Life Sciences": {
    color: "#0EA5E9",
    iconKey: "pharma",
    personas: [
      {
        id: "pharma-vp-data-science",
        title: "VP of Data Science",
        dept: "R&D",
        level: "VP",
        trigger: "Clinical trial data volume scaling",
        unconsumedSurface: ["Snowpark ML", "Data Sharing", "Cortex LLM"],
        loomLead: "SE",
        loomReason: "Technical buyer -- wants to see the model, not hear about it",
        anchorDemo: "Snowpark ML",
        demoRecipe: {
          title: "Clinical Trial Cohort Prediction",
          data: "Synthetic patient cohort dataset (OMOP CDM schema) + trial enrollment CSVs",
          build:
            "Snowpark ML pipeline that scores patient eligibility across 3 trial criteria. Show feature engineering in Python, model training, and inference -- all inside Snowflake, no data leaving.",
          showMoment:
            "Run a cohort filter live. Watch it score 50k synthetic patients in under 4 seconds. Say: 'Your SAS job does this overnight.'",
          seRole: "Drives the demo -- Python notebook live in Snowflake",
          aeRole: "Frames the business context before demo, handles ROI and next steps after"
        },
        loomScript:
          "Hi [Name] -- I'm [AE], I work with [Account] on the Snowflake side. I wanted to share something my SE built specifically for R&D teams in pharma before we connect. [SE name] put together a working cohort scoring model running entirely inside Snowflake -- no Python environment to manage, no data movement. I'll let them walk you through it. We think there's a direct parallel to what your team is doing with [trial/program]. Would love 20 minutes to show it live."
      },
      {
        id: "pharma-cdo",
        title: "Chief Data Officer",
        dept: "Enterprise",
        level: "C-Suite",
        trigger: "Regulatory data lineage gaps (FDA 21 CFR Part 11)",
        unconsumedSurface: ["Data Governance", "Cortex Analyst", "Dynamic Data Masking"],
        loomLead: "AE",
        loomReason: "Executive -- relationship and business framing matters more than the build",
        anchorDemo: "Cortex Analyst",
        demoRecipe: {
          title: "Regulatory Lineage + Natural Language Audit Query",
          data: "Synthetic audit trail data with timestamped data modifications, user IDs, and approval workflows",
          build:
            "Horizon Governance lineage graph showing data flow from ingestion to report. Layer Cortex Analyst on top -- exec types a plain English question ('Show me all records modified after submission date') and gets an answer with full lineage.",
          showMoment:
            "Type a compliance question in plain English. Get the answer and the audit trail in one shot. Say: 'Your compliance team can do this without opening a ticket to data engineering.'",
          seRole: "Sets up and operates the demo environment, handles technical Q&A",
          aeRole: "Records the Loom intro, drives the meeting, owns the regulatory framing"
        },
        loomScript:
          "Hi [Name] -- [AE] here from Snowflake. I know your team is navigating [regulatory context] right now and I didn't want to just send a calendar invite without showing you something first. We built a working demo of what automated lineage and plain-English audit querying looks like on Snowflake -- specifically for pharma data environments. It's 3 minutes. If it's relevant I'd love to walk through it live with you and your team."
      },
      {
        id: "pharma-head-commercial-analytics",
        title: "Head of Commercial Analytics",
        dept: "Commercial",
        level: "Director",
        trigger: "HCP targeting model refresh cycles too slow",
        unconsumedSurface: ["Snowpark", "Marketplace", "Streamlit in Snowflake"],
        loomLead: "SE",
        loomReason: "Analytics director -- wants to see speed and self-service, not strategy",
        anchorDemo: "Streamlit in Snowflake",
        demoRecipe: {
          title: "HCP 360 Self-Service Targeting App",
          data: "Synthetic HCP dataset (NPI, specialty, call history, script volume) + Snowflake Marketplace prescriber data",
          build:
            "Streamlit app inside Snowflake that lets a commercial ops user filter HCPs by specialty, territory, engagement score, and script trend -- no SQL required. Show Marketplace data joining live.",
          showMoment:
            "Filter from 200k HCPs to a targeted call list in 10 seconds. Say: 'Your field team can run this themselves. No BI ticket, no data export.'",
          seRole: "Builds and demos the Streamlit app live",
          aeRole: "Frames the field productivity angle, handles stakeholder mapping after"
        },
        loomScript:
          "Hi [Name] -- wanted to send this before we connect. My SE built a working HCP targeting app that runs inside Snowflake -- field reps filter by specialty, territory, and engagement score with no SQL and no data export. I think there's a direct application to how [Account] is managing targeting today. 90 seconds to watch, 20 minutes to see it live if it's relevant."
      },
      {
        id: "pharma-vp-manufacturing-ops",
        title: "VP Manufacturing Operations",
        dept: "Supply Chain",
        level: "VP",
        trigger: "Batch release and QC data siloed by plant",
        unconsumedSurface: ["Data Sharing", "Snowpark", "Cortex LLM"],
        loomLead: "AE",
        loomReason: "Ops VP -- cares about plant visibility and speed, not the tech stack",
        anchorDemo: "Streamlit in Snowflake",
        demoRecipe: {
          title: "Multi-Site Batch Release Dashboard",
          data: "Synthetic batch manufacturing records across 4 plant locations with QC pass/fail, deviation flags, and release timestamps",
          build:
            "Streamlit dashboard aggregating batch status across all plants in real time. Filter by site, product, batch age. Flag batches approaching expiry or held for review.",
          showMoment:
            "Show all 4 plants in one view. Drill into a held batch. Say: 'Right now, how long does it take your QA team to get this view across all sites?'",
          seRole: "Builds multi-site dashboard, handles data architecture questions",
          aeRole: "Leads with the operational pain, frames Snowflake Secure Data Sharing as the unlock"
        },
        loomScript:
          "Hi [Name] -- [AE] from Snowflake. Before we connect I wanted to show you something we built for supply chain teams in pharma manufacturing. It's a real-time batch release dashboard pulling from multiple plant systems into one view -- no manual consolidation. I'll keep the video short. If the use case is relevant I'd love to show it live with my SE."
      },
      {
        id: "pharma-dir-rwe",
        title: "Director, Real World Evidence",
        dept: "Medical Affairs",
        level: "Director",
        trigger: "Claims + EHR data joining across vendors",
        unconsumedSurface: ["Data Marketplace", "Data Clean Rooms", "Cortex Search"],
        loomLead: "SE",
        loomReason:
          "RWE director -- highly technical, will ask about data privacy architecture immediately",
        anchorDemo: "Data Clean Rooms",
        demoRecipe: {
          title: "Claims + EHR Linkage via Clean Room",
          data: "Synthetic claims dataset + synthetic EHR encounter data from two simulated vendors",
          build:
            "Snowflake Data Clean Room where two providers share data without either seeing the other's raw records. Run a join on synthetic patient IDs and surface matched outcomes. Show the query, show what neither party can see.",
          showMoment:
            "Run the clean room join. Show the output -- matched cohort, outcome rates. Then show what the other party cannot query. Say: 'No PHI leaves either environment. Your legal team signs off on this.'",
          seRole: "Drives the clean room setup and live query demo",
          aeRole: "Handles vendor relationship framing and procurement path after the demo"
        },
        loomScript:
          "Hi [Name] -- wanted to send something concrete before we connect. My SE set up a working Snowflake Clean Room demo that joins claims and EHR data across two simulated vendors -- neither side sees the other's raw records, full HIPAA posture preserved. It's the architecture most RWE teams we work with move to once they hit the vendor data sharing wall. Quick video, happy to go deeper live."
      }
    ],
    useCases: [
      "Clinical trial data lakehouse (replace SAS/Veeva Vault exports)",
      "HCP 360 on Snowflake (unify CRM + claims + call activity)",
      "Supply chain batch traceability (serialized lot data)",
      "Real-world evidence analytics (claims + EHR joins via clean room)",
      "Regulatory submission data lineage (audit trail automation)",
      "Drug interaction signal detection (Cortex LLM on adverse events)"
    ],
    execTriggers: [
      "FDA data integrity warning letter",
      "Pipeline readout + commercial launch prep",
      "M&A integration (data harmonization)",
      "Biosimilar launch pressure on commercial ops"
    ]
  },

  "Financial Services": {
    color: "#8B5CF6",
    iconKey: "financial",
    personas: [
      {
        id: "fs-cro",
        title: "Chief Risk Officer",
        dept: "Risk",
        level: "C-Suite",
        trigger: "Basel IV / DORA compliance data latency",
        unconsumedSurface: ["Dynamic Data Masking", "Cortex LLM", "Data Governance"],
        loomLead: "AE",
        loomReason: "CRO is a relationship and business framing conversation -- SE joins live",
        anchorDemo: "Cortex Analyst",
        demoRecipe: {
          title: "Risk Aggregation + Plain English Regulatory Query",
          data: "Synthetic counterparty exposure data, limit breaches, and VaR outputs across asset classes",
          build:
            "Cortex Analyst on top of aggregated risk data. CRO types 'Show me top 10 counterparty exposures breaching Basel IV thresholds as of yesterday' and gets a table with lineage.",
          showMoment:
            "Type the question. Get the answer in under 3 seconds with source lineage. Say: 'Your risk team gets this in a morning report 4 hours late. This is live.'",
          seRole: "Builds the Cortex Analyst layer, drives the technical demo",
          aeRole: "Records Loom intro, owns regulatory framing and executive conversation"
        },
        loomScript:
          "Hi [Name] -- [AE] from Snowflake. I work with [Account] on the data side. I wanted to share a 2-minute demo before we connect -- it's a working example of plain-English querying on top of aggregated risk data, with full lineage for regulatory audit. Given where Basel IV timelines are, I thought it was worth sending directly. Happy to go deeper with my SE live."
      },
      {
        id: "fs-head-quant-research",
        title: "Head of Quantitative Research",
        dept: "Front Office",
        level: "Director",
        trigger: "Model backtesting on fragmented tick data",
        unconsumedSurface: ["Snowpark", "Snowpark ML", "Cortex Analyst"],
        loomLead: "SE",
        loomReason: "Quant -- will tune out anything that isn't code and performance numbers",
        anchorDemo: "Snowpark ML",
        demoRecipe: {
          title: "Backtesting Pipeline on Tick Data",
          data: "Synthetic tick data for 50 equity instruments across 2 years, with corporate actions and dividends",
          build:
            "Snowpark Python backtesting framework running inside Snowflake. No data export to local Python. Show parallel execution across instruments, results written back to a table, Cortex Analyst querying results.",
          showMoment:
            "Run a backtest on 50 instruments live. Show the parallel execution. Show query time vs. what a local Python environment would take. Say: 'No data leaves Snowflake. Your IT team loves you.'",
          seRole: "Drives the entire demo -- Python notebook, live execution, performance stats",
          aeRole: "Silent during demo, re-engages on procurement and rollout path"
        },
        loomScript:
          "Hi [Name] -- my SE wanted to send this directly because I think it'll resonate more coming from them. We built a backtesting framework running entirely inside Snowflake -- Snowpark Python, no local environment, no data movement. Ran 50 instruments in parallel. Worth 90 seconds of your time if your team is still exporting to local Python to run backtests."
      },
      {
        id: "fs-cco",
        title: "Chief Compliance Officer",
        dept: "Compliance",
        level: "C-Suite",
        trigger: "SAR filing and transaction monitoring lag",
        unconsumedSurface: ["Data Sharing", "Cortex LLM", "Horizon Governance"],
        loomLead: "AE",
        loomReason: "CCO is an executive conversation about risk and liability, not a technical demo",
        anchorDemo: "Cortex LLM",
        demoRecipe: {
          title: "AML Transaction Narrative Generation",
          data: "Synthetic flagged transaction records with counterparty metadata, amounts, and alert codes",
          build:
            "Cortex LLM pipeline that reads flagged transaction data and generates a draft SAR narrative in FinCEN format. Show the input, show the generated narrative, show the analyst review step.",
          showMoment:
            "Feed in a flagged transaction. Get a FinCEN-formatted SAR narrative draft in 4 seconds. Say: 'Your analysts spend 45 minutes writing this. This is the first draft in 4 seconds -- they review and file.'",
          seRole: "Builds the Cortex LLM pipeline, handles technical compliance Q&A",
          aeRole: "Frames the regulatory liability angle, drives executive conversation"
        },
        loomScript:
          "Hi [Name] -- [AE] from Snowflake. Wanted to send something specific before we connect. We built a working demo that generates SAR narrative drafts directly from flagged transaction data -- Cortex LLM inside Snowflake, no third-party AI vendor, no data leaving your environment. Given where FinCEN timelines are, I thought this was worth a direct send. Short video, happy to show it live."
      },
      {
        id: "fs-vp-data-engineering",
        title: "VP Data Engineering",
        dept: "Technology",
        level: "VP",
        trigger: "dbt + Spark pipelines breaking at scale",
        unconsumedSurface: ["Snowpark", "Dynamic Tables", "Cortex"],
        loomLead: "SE",
        loomReason: "Data engineering leader -- will only engage if they see working code",
        anchorDemo: "Snowpark ML",
        demoRecipe: {
          title: "Dynamic Tables Replacing Spark Pipeline",
          data: "Synthetic streaming transaction data with 10M+ row simulation",
          build:
            "Side-by-side: a Spark pipeline architecture diagram vs. the same logic rebuilt as Snowflake Dynamic Tables. Show the Dynamic Tables DAG, show refresh latency, show compute cost comparison.",
          showMoment:
            "Trigger a Dynamic Tables refresh on 10M rows. Show latency. Show the DAG. Say: 'This replaced 4 Spark jobs. No cluster to manage. Cost went down 60%.'",
          seRole: "Drives the full demo -- this is a technical buyer conversation",
          aeRole: "Frames the platform consolidation story, handles budget and procurement after"
        },
        loomScript:
          "Hi [Name] -- my SE is sending this one because it's worth seeing before we talk. We rebuilt a Spark pipeline equivalent using Snowflake Dynamic Tables -- same logic, no cluster management, 60% lower compute cost in the simulation. If your team is still managing Spark at scale I think it's worth 2 minutes. Happy to go deeper live."
      },
      {
        id: "fs-head-client-analytics",
        title: "Head of Client Analytics",
        dept: "Wealth / Retail",
        level: "Director",
        trigger: "Next-best-action models not reaching advisors",
        unconsumedSurface: ["Streamlit in Snowflake", "Cortex Analyst", "Snowpark ML"],
        loomLead: "AE",
        loomReason:
          "Analytics director -- cares about advisor adoption and business outcome, not infra",
        anchorDemo: "Streamlit in Snowflake",
        demoRecipe: {
          title: "Advisor Next-Best-Action App",
          data: "Synthetic client portfolio data, life event flags, product holdings, and ML-scored propensity outputs",
          build:
            "Streamlit app inside Snowflake showing each advisor their book -- clients ranked by propensity score with next-best-action recommendation, product gap, and suggested talk track. No BI tool, no export.",
          showMoment:
            "Open the app as a simulated advisor. See top 5 clients to call today, why, and what to say. Say: 'Your model exists. It just isn't reaching your advisors in this format.'",
          seRole: "Builds the Streamlit app, handles data pipeline questions",
          aeRole: "Frames advisor productivity and AUM impact, drives exec alignment"
        },
        loomScript:
          "Hi [Name] -- [AE] from Snowflake. Before we connect I wanted to show you something we built for wealth and retail analytics teams. It's a working advisor app -- propensity scores, next-best-action, and talk tracks surfaced directly to the advisor inside Snowflake. No BI exports, no separate tool. If your team has the model but advisors aren't acting on it, this is usually why. Short video, worth a look."
      }
    ],
    useCases: [
      "Risk data aggregation (BCBS 239 / Basel IV compliance)",
      "Real-time fraud signal sharing via clean rooms",
      "Quant research lakehouse (tick data + alternative data)",
      "Advisor next-best-action app (Streamlit on Snowflake)",
      "AML transaction monitoring pipeline (replace SAS AML)",
      "Regulatory reporting automation (CCAR, DFAST, FINREP)"
    ],
    execTriggers: [
      "Regulatory exam or MRA",
      "Acquisition / data integration project",
      "Digital transformation initiative announcement",
      "New product launch requiring data infrastructure"
    ]
  },

  Healthcare: {
    color: "#10B981",
    iconKey: "healthcare",
    personas: [
      {
        id: "hc-cao",
        title: "Chief Analytics Officer",
        dept: "Enterprise",
        level: "C-Suite",
        trigger: "Value-based care contracts requiring pop health data",
        unconsumedSurface: ["Cortex Analyst", "Data Sharing", "Streamlit in Snowflake"],
        loomLead: "AE",
        loomReason: "CAO is a strategy conversation -- relationship and outcomes first",
        anchorDemo: "Cortex Analyst",
        demoRecipe: {
          title: "Population Health Plain-Language Query",
          data: "Synthetic attributed member dataset with chronic conditions, utilization, and risk scores",
          build:
            "Cortex Analyst on top of pop health data. CAO types 'Which high-risk diabetic members in our ACO had no PCP visit in the last 90 days?' and gets an actionable list with risk scores.",
          showMoment:
            "Type the question. Get the list. Say: 'Your care management team currently gets this from a report that runs weekly. This is live, on demand, no ticket.'",
          seRole: "Builds Cortex Analyst layer, handles Epic/Cerner integration questions",
          aeRole: "Records Loom, frames value-based care contract context, owns exec relationship"
        },
        loomScript:
          "Hi [Name] -- [AE] from Snowflake. I work with [Account] on the analytics side. I wanted to send something before we connect -- it's a live demo of plain-English querying on top of population health data. Your care management team asks the question, they get the answer, no BI request. Given where your VBC contracts are heading I thought it was worth a direct look before we get on a call."
      },
      {
        id: "hc-vp-revenue-cycle",
        title: "VP Revenue Cycle",
        dept: "Finance",
        level: "VP",
        trigger: "Claim denial rates and underpayment detection",
        unconsumedSurface: ["Snowpark ML", "Cortex LLM", "Dynamic Tables"],
        loomLead: "SE",
        loomReason:
          "Revenue cycle VP -- wants to see the prediction model and dollar impact, not strategy",
        anchorDemo: "Snowpark ML",
        demoRecipe: {
          title: "Denial Prediction Model",
          data: "Synthetic claims data with payer, CPT code, diagnosis, modifier, and denial outcome labels",
          build:
            "Snowpark ML classification model predicting denial probability at claim submission. Show feature importance (payer + CPT combination most predictive). Show how billers see the score before submission.",
          showMoment:
            "Score a batch of synthetic claims. Show denial probability per claim. Say: 'Your billers currently find out 30 days after submission. This flags it before it leaves your system.'",
          seRole: "Drives the ML demo, handles technical payer data questions",
          aeRole: "Frames the revenue recovery dollar impact, handles ROI conversation"
        },
        loomScript:
          "Hi [Name] -- my SE built something I think is worth seeing before we connect. It's a working denial prediction model running inside Snowflake -- scores claims before submission, flags high-risk ones for biller review. We ran it on synthetic data to show the approach. If denial rate is on your radar right now, worth 2 minutes. Happy to show it live with the full build."
      },
      {
        id: "hc-dir-clinical-informatics",
        title: "Director, Clinical Informatics",
        dept: "Clinical",
        level: "Director",
        trigger: "EHR data in Epic/Cerner not accessible to analysts",
        unconsumedSurface: ["Snowflake for Healthcare", "Data Clean Rooms", "Cortex Search"],
        loomLead: "SE",
        loomReason:
          "Clinical informatics director -- deeply technical, will ask about FHIR schema immediately",
        anchorDemo: "Streamlit in Snowflake",
        demoRecipe: {
          title: "Epic Bulk FHIR Ingestion + Analyst App",
          data: "Synthetic FHIR R4 bundle (Patient, Encounter, Observation, Condition resources)",
          build:
            "Show Bulk FHIR ingestion pipeline landing in Snowflake. Layer a Streamlit analyst app on top -- clinical informatics team queries patient cohorts without touching Epic directly.",
          showMoment:
            "Pull a synthetic patient cohort by diagnosis code. Show the FHIR resource structure. Say: 'Your analysts currently submit a ticket to Epic. This gives them direct access to the same data in a governed environment.'",
          seRole: "Drives the full demo -- FHIR schema, ingestion pipeline, Streamlit layer",
          aeRole: "Frames the Epic relationship and IT governance angle, handles procurement"
        },
        loomScript:
          "Hi [Name] -- my SE is sending this one because the build is worth seeing directly. We stood up a Bulk FHIR ingestion pipeline from a synthetic Epic environment into Snowflake and layered a self-service analyst app on top. Clinical informatics teams get direct access to EHR data in a governed environment -- no Epic tickets, no data exports. Worth 2 minutes if your team is still waiting on IT to pull EHR data."
      },
      {
        id: "hc-head-pop-health",
        title: "Head of Population Health",
        dept: "Clinical",
        level: "Director",
        trigger: "Risk stratification models running weekly instead of daily",
        unconsumedSurface: ["Snowpark ML", "Dynamic Tables", "Cortex"],
        loomLead: "SE",
        loomReason: "Pop health director -- will engage on model freshness and attribution logic",
        anchorDemo: "Snowpark ML",
        demoRecipe: {
          title: "Daily Risk Stratification Refresh",
          data: "Synthetic attributed member data with claims, lab results, Rx fills, and prior risk scores",
          build:
            "Dynamic Tables pipeline refreshing risk scores daily from incoming claims + labs. Snowpark ML model scoring members. Show the DAG, show refresh latency, show how scores land in a care manager app.",
          showMoment:
            "Trigger a refresh. Show updated risk scores in under 60 seconds. Say: 'Your current batch runs Sunday night. A member could have an ED visit Monday and your care managers won't see the risk flag until next week.'",
          seRole: "Builds Dynamic Tables pipeline and ML scoring layer",
          aeRole: "Frames care gap and quality measure impact, handles VBC contract alignment"
        },
        loomScript:
          "Hi [Name] -- wanted to send something concrete before we connect. We built a working risk stratification pipeline that refreshes daily using Snowflake Dynamic Tables and Snowpark ML -- not weekly, not overnight batch. Care managers see updated scores the same day. Short demo, direct application to how most pop health teams are operating today. Worth a look."
      },
      {
        id: "hc-cio-ciso",
        title: "CIO / CISO",
        dept: "IT / Security",
        level: "C-Suite",
        trigger: "HIPAA de-identification at scale for analytics",
        unconsumedSurface: ["Dynamic Data Masking", "Horizon Governance", "Data Clean Rooms"],
        loomLead: "AE",
        loomReason:
          "CIO/CISO is a governance and risk conversation -- AE leads, SE handles architecture Q&A",
        anchorDemo: "Data Clean Rooms",
        demoRecipe: {
          title: "PHI Masking + Clean Room for Research",
          data: "Synthetic patient dataset with PHI fields (name, DOB, MRN, ZIP) and clinical data",
          build:
            "Dynamic Data Masking policies on PHI fields -- show analyst role seeing de-identified view, admin seeing full record. Layer Clean Room showing a researcher querying aggregate outcomes without accessing individual records.",
          showMoment:
            "Log in as analyst. Show masked PHI. Log in as admin. Show full record. Run clean room query. Say: 'One dataset, three different views, zero PHI exposure to the research team. Your IRB office can audit the policy.'",
          seRole: "Builds masking policies and clean room, handles security architecture Q&A",
          aeRole: "Frames IRB and HIPAA compliance angle, owns CIO/CISO relationship"
        },
        loomScript:
          "Hi [Name] -- [AE] from Snowflake. Before we connect I wanted to show you something we built specifically for health system security and governance teams. It's a working demo of dynamic PHI masking plus a research clean room -- one dataset, three governed views, zero PHI exposure to the research team. If de-identification at scale is on your radar I think it's worth 3 minutes before we talk."
      }
    ],
    useCases: [
      "Population health analytics (replace fragmented BI tools)",
      "Revenue cycle intelligence (denial prediction, underpayment ML)",
      "Clinical data lakehouse (Epic/Cerner Bulk FHIR into Snowflake)",
      "HEDIS / Stars measure automation",
      "PHI de-identification pipeline for research (clean rooms)",
      "Payer-provider data sharing (value-based care contracts)"
    ],
    execTriggers: [
      "Value-based care contract expansion",
      "Epic upgrade or migration",
      "Health system M&A",
      "CMS Stars rating drop requiring intervention data"
    ]
  },

  "Manufacturing / Industrial": {
    color: "#F59E0B",
    iconKey: "manufacturing",
    personas: [
      {
        id: "mfg-vp-ops-technology",
        title: "VP of Operations Technology",
        dept: "OT/IT",
        level: "VP",
        trigger: "OT/IT convergence -- sensor data not reaching analysts",
        unconsumedSurface: ["Snowflake for IoT", "Dynamic Tables", "Cortex LLM"],
        loomLead: "SE",
        loomReason:
          "OT/IT VP will immediately ask about protocol bridging and historian integration",
        anchorDemo: "Streamlit in Snowflake",
        demoRecipe: {
          title: "Historian to Snowflake OT Dashboard",
          data: "Synthetic time-series sensor data (temperature, pressure, vibration) from 3 simulated production lines",
          build:
            "Streaming pipeline from synthetic OSIsoft PI / InfluxDB historian into Snowflake Dynamic Tables. Streamlit dashboard showing real-time sensor readings, anomaly flags, and maintenance alerts across lines.",
          showMoment:
            "Show all 3 lines live. Trigger a synthetic anomaly. Watch the flag appear on the dashboard. Say: 'Your maintenance team currently finds out after the line goes down. This flags it 4 hours before.'",
          seRole: "Drives full OT demo -- pipeline architecture, Dynamic Tables, Streamlit",
          aeRole: "Frames predictive maintenance ROI and IT/OT governance story"
        },
        loomScript:
          "Hi [Name] -- my SE built something I think is directly relevant before we connect. It's a working pipeline from a simulated historian environment into Snowflake -- sensor data from 3 production lines landing in real time, anomaly detection, maintenance alerts surfaced in a live dashboard. No more waiting for the line to go down. Worth 2 minutes if OT/IT convergence is on your roadmap."
      },
      {
        id: "mfg-csco",
        title: "Chief Supply Chain Officer",
        dept: "Supply Chain",
        level: "C-Suite",
        trigger: "Supplier risk visibility after recent disruption",
        unconsumedSurface: ["Data Sharing", "Marketplace", "Cortex Analyst"],
        loomLead: "AE",
        loomReason: "CSCO is a business continuity conversation -- AE leads with the risk framing",
        anchorDemo: "Cortex Analyst",
        demoRecipe: {
          title: "Supplier Risk Intelligence Dashboard",
          data: "Synthetic supplier master data + Snowflake Marketplace financial health and geopolitical risk feeds",
          build:
            "Cortex Analyst on top of supplier risk data joined with Marketplace feeds. CSCO asks 'Which tier-1 suppliers in Southeast Asia have a financial health score below 60 and single-source dependency?' and gets an answer.",
          showMoment:
            "Type the question. Get the at-risk supplier list with scores. Say: 'Your procurement team built a spreadsheet for this after the last disruption. This is live, always current, and connected to external signals.'",
          seRole: "Builds Marketplace data joins and Cortex Analyst layer",
          aeRole: "Records Loom, frames supply chain risk and board-level visibility angle"
        },
        loomScript:
          "Hi [Name] -- [AE] from Snowflake. I work with [Account] on the data side. Before we connect I wanted to send a quick demo of what supplier risk intelligence looks like when it's live -- not a spreadsheet updated after the disruption, but external financial health signals joined to your supplier master data and queryable in plain English. Given what the industry has been navigating on supply chain I thought it was worth a direct look."
      },
      {
        id: "mfg-head-quality-engineering",
        title: "Head of Quality Engineering",
        dept: "Quality",
        level: "Director",
        trigger: "Defect traceability across multi-site manufacturing",
        unconsumedSurface: ["Snowpark", "Data Governance", "Cortex Search"],
        loomLead: "SE",
        loomReason:
          "Quality engineering director -- wants to see the data lineage and traceability architecture",
        anchorDemo: "Snowpark ML",
        demoRecipe: {
          title: "Defect Traceability + Root Cause ML",
          data: "Synthetic serialized production records with lot numbers, machine IDs, operator shifts, inspection results, and field return data",
          build:
            "Snowpark ML model identifying root cause features for defect clusters. Cortex Search on quality records -- quality engineer types a lot number and gets full traceability from raw material to customer shipment.",
          showMoment:
            "Search a lot number. Get the full chain. Run the ML root cause analysis. Say: 'Your quality team currently traces this manually across 4 systems. This is one query.'",
          seRole: "Drives traceability demo and ML root cause model",
          aeRole: "Frames cost of recall and regulatory compliance angle, handles procurement"
        },
        loomScript:
          "Hi [Name] -- my SE put this together because I think it lands better as a demo than a conversation. It's a working defect traceability system -- lot number search with full chain from raw material to shipment, plus an ML model flagging root cause features across production variables. If your team is still tracing across multiple systems manually, worth 2 minutes."
      },
      {
        id: "mfg-dir-digital-manufacturing",
        title: "Director, Digital Manufacturing",
        dept: "Operations",
        level: "Director",
        trigger: "Digital twin initiatives stalled on data access",
        unconsumedSurface: ["Snowpark ML", "Dynamic Tables", "Streamlit in Snowflake"],
        loomLead: "SE",
        loomReason:
          "Digital manufacturing director -- will engage on architecture and simulation fidelity",
        anchorDemo: "Streamlit in Snowflake",
        demoRecipe: {
          title: "Digital Twin Data Foundation Demo",
          data: "Synthetic process parameters, maintenance history, and production output data from a simulated CNC line",
          build:
            "Dynamic Tables pipeline keeping digital twin state current from sensor feeds. Streamlit app showing live process parameter visualization and what-if simulation (change feed rate to see predicted output quality change).",
          showMoment:
            "Adjust a process parameter in the what-if simulator. Watch the predicted output change. Say: 'Your digital twin initiative stalled because the data wasn't accessible. This is the data foundation that makes it run.'",
          seRole: "Builds Dynamic Tables feed and Streamlit what-if simulator",
          aeRole: "Frames digital twin program alignment and IT architecture conversation"
        },
        loomScript:
          "Hi [Name] -- wanted to send something before we connect. We built a working digital twin data foundation demo -- Dynamic Tables keeping process state current from sensor feeds, with a what-if simulator on top. Most digital twin programs stall at the data access layer. This is what it looks like when that layer is solved. Worth 2 minutes if your initiative is still in planning."
      },
      {
        id: "mfg-vp-fpa",
        title: "VP Finance / FP&A",
        dept: "Finance",
        level: "VP",
        trigger: "Plant-level P&L variance reporting taking 3 days",
        unconsumedSurface: ["Cortex Analyst", "Streamlit in Snowflake", "Dynamic Tables"],
        loomLead: "AE",
        loomReason: "FP&A VP -- business outcome conversation, not a technical demo",
        anchorDemo: "Cortex Analyst",
        demoRecipe: {
          title: "Plant P&L Variance -- Plain English Query",
          data: "Synthetic plant-level cost, revenue, volume, and variance data across 6 facilities and 12 months",
          build:
            "Cortex Analyst on top of plant financial data. FP&A analyst types 'Which plants had COGS variance greater than 8% in Q1 and what drove it?' and gets an answer with drill-down.",
          showMoment:
            "Type the question. Get the variance analysis with plant breakdown. Say: 'Your team currently builds this in Excel over 3 days after month-end close. This runs in 4 seconds on live data.'",
          seRole: "Builds Cortex Analyst layer and financial data model",
          aeRole: "Frames month-end close acceleration and CFO visibility story, records Loom"
        },
        loomScript:
          "Hi [Name] -- [AE] from Snowflake. Before we connect I wanted to show you something built specifically for manufacturing FP&A teams. It's a working demo where an analyst types a plain-English question -- 'which plants had COGS variance over 8% in Q1' -- and gets the answer in 4 seconds with drill-down, on live data. If your team is still building that in Excel after close, worth a quick look."
      }
    ],
    useCases: [
      "OT data lakehouse (SCADA/historian to Snowflake real-time)",
      "Supplier risk intelligence (multi-tier supply chain visibility)",
      "Predictive quality / defect traceability (ML on sensor data)",
      "Digital twin data foundation (replace OSIsoft/InfluxDB silos)",
      "Plant P&L analytics (replace Excel-based finance ops)",
      "ESG / carbon accounting data platform"
    ],
    execTriggers: [
      "Supply chain disruption event",
      "New plant opening or acquisition",
      "ESG reporting mandate (SEC climate disclosure)",
      "Industry 4.0 initiative kickoff"
    ]
  }
};


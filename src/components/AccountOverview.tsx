"use client";

import { Fragment, type ReactNode } from "react";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import type { AccountConfig } from "@/types";
import { PipelineSnapshotCard } from "@/components/PipelineSnapshotCard";

const TIER_LABEL: Record<AccountConfig["tier"], string> = {
  1: "Tier 1 · Primary focus",
  2: "Tier 2 · Active expansion",
  "2B": "Tier 2B · Expansion (sequence)",
  3: "Tier 3 · Monitor / opportunistic"
};

const eyebrow = "text-sf-eyebrow font-semibold uppercase text-sf-foreground-muted";

function dealPathPhases(stakeholders: string[]) {
  if (stakeholders.length === 0) return [];
  if (stakeholders.length === 1) {
    return [{ label: "Stakeholders", text: stakeholders[0] }];
  }
  const entry = stakeholders[0];
  const exec = stakeholders[stakeholders.length - 1];
  const expansion = stakeholders.slice(1, -1);
  const phases: { label: string; text: string }[] = [{ label: "Entry", text: entry }];
  if (expansion.length > 0) {
    phases.push({ label: "Expansion", text: expansion.join(" · ") });
  }
  phases.push({ label: "Exec", text: exec });
  return phases;
}

function BriefBlock({
  num,
  heading,
  children
}: {
  num: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[11px] font-semibold tabular-nums text-sf-foreground-muted/80">
          {num}
        </span>
        <h2 className={eyebrow}>{heading}</h2>
      </div>
      <div className="mt-3 text-base leading-relaxed text-sf-foreground">{children}</div>
    </div>
  );
}

export function AccountOverview({ account }: { account: AccountConfig }) {
  const phases = dealPathPhases(account.deal_path.stakeholders);

  return (
    <section className="animate-fade-in" aria-labelledby="account-overview-title">
      <div className="rounded-t-xl border-b border-sf-border bg-sf-surface px-6 py-6 md:px-8 md:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 flex-1">
            <p className={eyebrow}>Account overview</p>
            <h1
              id="account-overview-title"
              className="mt-2 text-2xl font-semibold tracking-tight text-sf-foreground md:text-3xl md:leading-tight"
            >
              {account.name}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-sf-foreground">
              <span className="font-semibold">{account.industry}</span>
              <span className="text-sf-foreground-muted"> · </span>
              <span className="text-sf-foreground-muted">{account.briefDescriptor}</span>
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-start lg:flex-col">
            <div
              className="shrink-0 self-start rounded-lg border px-3 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-sf-foreground"
              style={{
                borderColor: `${account.color}55`,
                backgroundColor: `${account.color}14`
              }}
            >
              {TIER_LABEL[account.tier]}
            </div>
            <PipelineSnapshotCard account={account} />
          </div>
        </div>
      </div>

      <div
        className="border-b border-sf-border px-6 py-5 md:px-8"
        style={{ backgroundColor: `${account.color}0d` }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <p className={eyebrow}>Why Snowflake wins</p>
            <p className="mt-1 text-xs text-sf-foreground-muted">
              Here — not another warehouse project, not another point tool.
            </p>
          </div>
          <ul className="mt-1 max-w-2xl shrink-0 space-y-2 sm:mt-0">
            {account.whySnowflakeWins.map((line, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-snug text-sf-foreground">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: account.color }}
                  strokeWidth={2.5}
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-sf-surface px-6 py-8 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
          <BriefBlock num="01" heading="Why now">
            {account.why_now}
          </BriefBlock>

          <BriefBlock num="02" heading="What’s broken">
            {account.whats_broken}
          </BriefBlock>

          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[11px] font-semibold tabular-nums text-sf-foreground-muted/80">
                03
              </span>
              <h2 className={eyebrow}>Hypothesis</h2>
            </div>
            <p className="mt-2 text-xs text-sf-foreground-muted md:pl-8">The risk is not X, it’s Y.</p>
            <p
              className="mt-4 border-l-4 pl-5 text-lg font-semibold leading-snug text-sf-foreground md:pl-6 md:text-xl md:leading-snug"
              style={{ borderColor: account.color }}
            >
              {account.hypothesis}
            </p>
          </div>

          <BriefBlock num="04" heading="First workload">
            {account.first_workload}
          </BriefBlock>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[11px] font-semibold tabular-nums text-sf-foreground-muted/80">
                05
              </span>
              <h2 className={eyebrow}>Proof point</h2>
            </div>
            <p className="mt-2 text-xs font-medium text-sf-foreground-muted">
              Deliver in 24–48 hours to prove value.
            </p>
            <div className="mt-3 text-base leading-relaxed text-sf-foreground">{account.proof_point}</div>
          </div>
        </div>

        <div className="mt-12 border-t border-sf-border pt-12">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-sf-foreground-muted/80">
              06
            </span>
            <h2 className={eyebrow}>Economic impact</h2>
          </div>
          <div className="mt-4 rounded-xl border border-sf-border bg-sf-foreground px-5 py-5 shadow-panel md:px-6 md:py-6">
            <p className="text-lg font-semibold leading-snug text-white md:text-xl">Quantified value</p>
            <p className="mt-1 text-xs text-white/70">
              {"Revenue, cost avoidance, and risk — tie the platform to P&L and exposure."}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-200">{account.economic_impact}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-sf-border pt-12">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-sf-foreground-muted/80">
              07
            </span>
            <h2 className={eyebrow}>Deal path</h2>
          </div>
          <p className="mt-2 text-sm text-sf-foreground-muted">
            Stakeholder sequence: entry → expansion → exec.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {phases.map((phase, i) => (
              <Fragment key={`${phase.label}-${i}`}>
                {i > 0 && (
                  <>
                    <ChevronDown
                      className="h-5 w-5 shrink-0 self-center text-sf-foreground-muted sm:hidden"
                      aria-hidden
                    />
                    <ChevronRight
                      className="mx-0 hidden h-5 w-5 shrink-0 text-sf-foreground-muted sm:block"
                      aria-hidden
                    />
                  </>
                )}
                <div className="min-w-0 flex-1 rounded-xl border border-sf-border bg-sf-surface px-4 py-3 shadow-panel sm:max-w-[280px]">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
                    {phase.label}
                  </div>
                  <div className="mt-1.5 text-sm font-medium leading-snug text-sf-foreground">{phase.text}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

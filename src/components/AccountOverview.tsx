"use client";

import { Fragment, type ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { AccountConfig } from "@/types";
import { PipelineSnapshotCard } from "@/components/PipelineSnapshotCard";

const TIER_LABEL: Record<AccountConfig["tier"], string> = {
  1: "Tier 1 · Primary focus",
  2: "Tier 2 · Active expansion",
  3: "Tier 3 · Monitor / opportunistic"
};

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
        <span className="font-mono text-[11px] font-semibold tabular-nums text-slate-400">{num}</span>
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">{heading}</h2>
      </div>
      <div className="mt-3 text-[15px] leading-relaxed text-slate-800">{children}</div>
    </div>
  );
}

export function AccountOverview({ account }: { account: AccountConfig }) {
  const phases = dealPathPhases(account.deal_path.stakeholders);

  return (
    <section
      className="animate-fade-in border border-stone-200 bg-[#fbf9f6] shadow-[0_2px_24px_-4px_rgba(15,23,42,0.08)]"
      style={{ borderLeftWidth: 4, borderLeftColor: account.color }}
      aria-labelledby="account-overview-title"
    >
      <div className="border-b border-stone-200/80 bg-[#f7f4ef] px-6 py-6 md:px-8 md:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">Account overview</p>
            <h1 id="account-overview-title" className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-950 md:text-[2.15rem] md:leading-tight">
              {account.name}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-800">
              <span className="font-semibold text-slate-900">{account.industry}</span>
              <span className="text-slate-400"> · </span>
              <span className="text-slate-700">{account.briefDescriptor}</span>
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-start lg:flex-col">
            <div
              className="shrink-0 self-start rounded-md border px-3 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-800"
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

      <div className="px-6 py-6 md:px-8 md:py-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
          <BriefBlock num="01" heading="Why now">
            {account.why_now}
          </BriefBlock>

          <BriefBlock num="02" heading="What’s broken">
            {account.whats_broken}
          </BriefBlock>

          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[11px] font-semibold tabular-nums text-slate-400">03</span>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">Hypothesis</h2>
            </div>
            <p className="mt-2 pl-0 text-xs italic text-slate-500 md:pl-8">The risk is not X, it’s Y.</p>
            <blockquote className="mt-4 border-l-2 border-slate-800 pl-5 font-serif text-xl font-semibold leading-snug text-slate-900 md:pl-6 md:text-2xl md:leading-snug">
              {account.hypothesis}
            </blockquote>
          </div>

          <BriefBlock num="04" heading="First workload">
            {account.first_workload}
          </BriefBlock>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[11px] font-semibold tabular-nums text-slate-400">05</span>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">Proof point</h2>
            </div>
            <p className="mt-2 text-xs font-medium text-slate-600">Deliver in 24–48 hours to prove value.</p>
            <div className="mt-3 text-[15px] leading-relaxed text-slate-800">{account.proof_point}</div>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-12">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-slate-400">06</span>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">Economic impact</h2>
          </div>
          <div className="mt-4 rounded-sm border-2 border-slate-800/90 bg-slate-900 px-5 py-5 text-slate-50 shadow-inner md:px-6 md:py-6">
            <p className="font-serif text-lg font-semibold leading-snug md:text-xl">Quantified value</p>
            <p className="mt-1 text-xs text-slate-400">Revenue, cost avoidance, and risk — tie the platform to P&L and exposure.</p>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-200">{account.economic_impact}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-12">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] font-semibold tabular-nums text-slate-400">07</span>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">Deal path</h2>
          </div>
          <p className="mt-2 text-sm text-slate-600">Stakeholder sequence: entry → expansion → exec.</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {phases.map((phase, i) => (
              <Fragment key={`${phase.label}-${i}`}>
                {i > 0 && (
                  <>
                    <ChevronDown className="h-5 w-5 shrink-0 self-center text-slate-400 sm:hidden" aria-hidden />
                    <ChevronRight className="mx-0 hidden h-5 w-5 shrink-0 text-slate-400 sm:block" aria-hidden />
                  </>
                )}
                <div className="min-w-0 flex-1 rounded-md border border-stone-300 bg-white px-4 py-3 shadow-sm sm:max-w-[280px]">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{phase.label}</div>
                  <div className="mt-1.5 text-sm font-medium leading-snug text-slate-900">{phase.text}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

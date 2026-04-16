"use client";

import type { AccountConfig } from "@/types";
import { Check } from "lucide-react";
import { PipelineSnapshotCard } from "@/components/PipelineSnapshotCard";
import { ExecHooksSection } from "@/components/ExecHooksSection";

const TIER_LABEL: Record<AccountConfig["tier"], string> = {
  1: "Tier 1 · Primary focus",
  2: "Tier 2 · Active expansion",
  "2B": "Tier 2B · Expansion (sequence)",
  3: "Tier 3 · Monitor / opportunistic"
};

const eyebrow = "text-sf-eyebrow font-semibold uppercase text-sf-foreground-muted";

export function AccountOverview({ account }: { account: AccountConfig }) {
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
            <p className="mt-4 text-sm text-sf-foreground-muted">
              Full operating narrative, deal path, and buyers live in the{" "}
              <span className="font-medium text-sf-foreground">Territory</span> tab.
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

      <ExecHooksSection account={account} />
    </section>
  );
}

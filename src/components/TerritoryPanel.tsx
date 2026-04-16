"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CircleDollarSign,
  FlaskConical,
  GitBranch,
  Lightbulb,
  Target,
  Users,
  Wrench
} from "lucide-react";
import type { AccountConfig } from "@/types";

function Field({
  label,
  value,
  Icon,
  accent
}: {
  label: string;
  value: string;
  Icon: LucideIcon;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-sf-border bg-white p-4 shadow-panel">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
        <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        {label}
      </div>
      <p className={`mt-2 text-sm leading-relaxed text-sf-foreground ${accent ?? ""}`}>{value}</p>
    </div>
  );
}

export function TerritoryPanel({ account }: { account: AccountConfig }) {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <div className="text-sm font-semibold text-sf-foreground">Territory operating picture</div>
        <div className="mt-1 text-xs text-sf-foreground-muted">
          Why this account, what to fix first, and how expansion should flow. Personas and plays load below.
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Why now (compelling event)" value={account.why_now} Icon={Target} accent="font-medium" />
        <Field label="What's broken" value={account.whats_broken} Icon={Wrench} />
        <Field label="Hypothesis" value={account.hypothesis} Icon={Lightbulb} />
        <Field label="First workload" value={account.first_workload} Icon={FlaskConical} accent="font-medium" />
        <Field label="Proof point" value={account.proof_point} Icon={GitBranch} />
        <Field label="Economic impact" value={account.economic_impact} Icon={CircleDollarSign} />
      </div>

      <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
        <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
          <Users className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
          Deal path — stakeholders
        </div>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-sf-foreground">
          {account.deal_path.stakeholders.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
        <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
          <ArrowRight className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
          Expansion flow
        </div>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-sf-foreground">
          {account.deal_path.expansionFlow.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

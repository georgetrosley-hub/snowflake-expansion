"use client";

import {
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  CircleDollarSign,
  Cpu,
  FlaskConical,
  GitBranch,
  Landmark,
  Lightbulb,
  ShieldQuestion,
  Target,
  UserCircle2,
  Users,
  Wrench
} from "lucide-react";
import type { AccountConfig } from "@/types";
import { PanelField, PanelListSection } from "@/components/ui/panelPrimitives";

const detailsSummary =
  "flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg border border-sf-border bg-sf-surface-muted/80 px-4 py-3 text-sm font-semibold text-sf-foreground [&::-webkit-details-marker]:hidden";

export function TerritoryPanel({ account }: { account: AccountConfig }) {
  const d = account.dealIntelligence;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <div className="text-sm font-semibold text-sf-foreground">Territory &amp; deal</div>
        <div className="mt-1 text-xs text-sf-foreground-muted">
          Operating picture, stakeholder path, and how the deal closes — buyers, risk, land and expand.
        </div>
      </div>

      <details open className="group rounded-xl border border-sf-border bg-white shadow-panel">
        <summary className={detailsSummary}>
          <span>Operating picture</span>
          <span className="text-xs font-normal text-sf-foreground-muted group-open:hidden">Show</span>
          <span className="hidden text-xs font-normal text-sf-foreground-muted group-open:inline">Hide</span>
        </summary>
        <div className="space-y-6 border-t border-sf-border p-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <PanelField label="Why now (compelling event)" value={account.why_now} Icon={Target} accent="font-medium" />
            <PanelField label="What's broken" value={account.whats_broken} Icon={Wrench} />
            <PanelField label="Hypothesis" value={account.hypothesis} Icon={Lightbulb} />
            <PanelField label="First workload" value={account.first_workload} Icon={FlaskConical} accent="font-medium" />
            <PanelField label="Proof point" value={account.proof_point} Icon={GitBranch} />
            <PanelField label="Economic impact" value={account.economic_impact} Icon={CircleDollarSign} />
          </div>

          <PanelListSection
            title="Deal path — stakeholders"
            titleIcon={Users}
            ordered
            items={account.deal_path.stakeholders}
          />

          <PanelListSection
            title="Expansion flow"
            titleIcon={ArrowRight}
            ordered
            items={account.deal_path.expansionFlow}
          />
        </div>
      </details>

      <details className="group rounded-xl border border-sf-border bg-white shadow-panel">
        <summary className={detailsSummary}>
          <span>Buyers, risk &amp; strategy</span>
          <span className="text-xs font-normal text-sf-foreground-muted group-open:hidden">Show</span>
          <span className="hidden text-xs font-normal text-sf-foreground-muted group-open:inline">Hide</span>
        </summary>
        <div className="space-y-6 border-t border-sf-border p-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <PanelField label="Entry point (first stakeholder)" value={d.entryPoint} Icon={UserCircle2} accent="font-medium" />
            <PanelField label="Economic buyer" value={d.economicBuyer} Icon={BadgeDollarSign} />
            <PanelField label="Technical buyer" value={d.technicalBuyer} Icon={Cpu} />
            <PanelField label="Key risk" value={d.keyRisk} Icon={AlertTriangle} />
            <PanelField label="Competitor / status quo" value={d.competitorStatusQuo} Icon={ShieldQuestion} />
          </div>

          <PanelListSection
            title="Expansion path"
            titleIcon={GitBranch}
            subtitle="— after the initial win"
            ordered
            items={d.expansionPath}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
                <Landmark className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                Land strategy
              </div>
              <div className="mt-2 text-sm leading-relaxed text-sf-foreground">{d.landStrategy}</div>
            </div>
            <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
                <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                Expand strategy
              </div>
              <div className="mt-2 text-sm leading-relaxed text-sf-foreground">{d.expandStrategy}</div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}

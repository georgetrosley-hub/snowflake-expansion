"use client";

import { CalendarRange, Crosshair, DollarSign, Gauge } from "lucide-react";
import type { ReactNode } from "react";
import type { AccountConfig, DealLikelihood } from "@/types";

const LIKELIHOOD_STYLE: Record<
  DealLikelihood,
  { label: string; className: string }
> = {
  High: {
    label: "High",
    className: "border-emerald-200 bg-emerald-50 text-emerald-900"
  },
  Medium: {
    label: "Medium",
    className: "border-amber-200 bg-amber-50 text-amber-950"
  },
  Low: {
    label: "Low",
    className: "border-slate-200 bg-slate-100 text-slate-800"
  }
};

function Row({
  icon: Icon,
  label,
  children
}: {
  icon: typeof DollarSign;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-2.5">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={2} aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</div>
        <div className="mt-0.5 text-xs font-medium leading-snug text-slate-900">{children}</div>
      </div>
    </div>
  );
}

export function PipelineSnapshotCard({ account }: { account: AccountConfig }) {
  const p = account.pipelineSnapshot;
  const lh = LIKELIHOOD_STYLE[p.dealLikelihood];

  return (
    <aside
      className="w-full max-w-sm rounded-md border border-stone-300 bg-white px-4 py-3 shadow-sm md:max-w-[17.5rem]"
      style={{ borderLeftWidth: 3, borderLeftColor: account.color }}
      aria-label="Pipeline snapshot"
    >
      <div className="border-b border-stone-200/90 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">Pipeline snapshot</span>
      </div>
      <div className="mt-3 space-y-3">
        <Row icon={DollarSign} label="Est. ACV">
          {p.estimatedAcvRange}
        </Row>
        <Row icon={Gauge} label="Deal likelihood">
          <span className={`inline-flex rounded border px-1.5 py-0.5 text-[11px] font-semibold ${lh.className}`}>
            {lh.label}
          </span>
        </Row>
        <Row icon={CalendarRange} label="Timeline">
          {p.timeline}
        </Row>
        <Row icon={Crosshair} label="First meeting target">
          {p.firstMeetingTarget}
        </Row>
      </div>
    </aside>
  );
}

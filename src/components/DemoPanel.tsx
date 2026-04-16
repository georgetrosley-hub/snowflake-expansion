"use client";

import type { LucideIcon } from "lucide-react";
import { Anchor, Database, Video, Wrench, Zap } from "lucide-react";
import type { AccountConfig, Persona } from "@/types";

function LoomLeadBadge({ lead }: { lead: Persona["loomLead"] }) {
  const isSe = lead === "SE";
  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold",
        isSe
          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
          : "border-sky-200 bg-sky-50 text-sky-900"
      ].join(" ")}
    >
      <Video className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
      Loom lead: {lead}
    </div>
  );
}

function Section({ label, value, Icon }: { label: string; value: string; Icon: LucideIcon }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
        <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        {label}
      </div>
      <div className="mt-2 rounded-lg border border-sf-border bg-sf-surface-muted px-4 py-3 text-sm leading-relaxed text-sf-foreground">
        {value}
      </div>
    </div>
  );
}

export function DemoPanel({
  account,
  selectedPersona,
  onPickPersona,
  onCopy
}: {
  account: AccountConfig;
  selectedPersona: Persona | null;
  onPickPersona: () => void;
  onCopy: (text: string, label: string) => Promise<void>;
}) {
  if (!selectedPersona) {
    return (
      <div className="animate-fade-in rounded-xl border border-sf-border bg-white p-8 text-center shadow-panel">
        <div className="text-sm font-semibold text-sf-foreground">Select a persona first</div>
        <div className="mt-1 text-sm text-sf-foreground-muted">
          The demo recipe and Loom script are persona-specific.
        </div>
        <button
          type="button"
          onClick={onPickPersona}
          className="mt-5 inline-flex items-center justify-center rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
        >
          Pick persona
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold text-sf-foreground">Demo recipe</div>
          <div className="text-xs text-sf-foreground-muted">
            Optimized for fast “show moment” delivery and clean AE/SE handoff.
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LoomLeadBadge lead={selectedPersona.loomLead} />
        </div>
      </div>

      <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: account.color }}>
              Demo
            </div>
            <div className="mt-1 truncate text-lg font-semibold text-sf-foreground">
              {selectedPersona.demoRecipe.title}
            </div>
          </div>
          <div
            className="hidden shrink-0 rounded-lg border px-3 py-2 text-xs font-semibold md:block"
            style={{ borderColor: `${account.color}44`, backgroundColor: `${account.color}12`, color: account.color }}
          >
            Anchor: {selectedPersona.anchorDemo}
          </div>
        </div>

        <div className="mt-5 grid gap-5">
          <Section label="Anchor capability" value={selectedPersona.anchorDemo} Icon={Anchor} />
          <Section label="Data to use" value={selectedPersona.demoRecipe.data} Icon={Database} />
          <Section label="What to build" value={selectedPersona.demoRecipe.build} Icon={Wrench} />
          <Section label="The show moment" value={selectedPersona.demoRecipe.showMoment} Icon={Zap} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-sf-border bg-white p-4 shadow-panel">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-800">
            Your role (AE)
          </div>
          <div className="mt-2 text-sm leading-relaxed text-sf-foreground">
            {selectedPersona.demoRecipe.aeRole}
          </div>
        </div>
        <div className="rounded-xl border border-sf-border bg-white p-4 shadow-panel">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
            SE role
          </div>
          <div className="mt-2 text-sm leading-relaxed text-sf-foreground">
            {selectedPersona.demoRecipe.seRole}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-sf-foreground">
              Loom script <span className="text-sf-foreground-muted">({selectedPersona.loomLead} records)</span>
            </div>
            <div className="text-xs text-sf-foreground-muted">
              Copy, paste, personalize. Keep it short and concrete.
            </div>
          </div>
          <button
            type="button"
            onClick={() => onCopy(selectedPersona.loomScript, "Loom script")}
            className="inline-flex items-center justify-center rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
          >
            Copy
          </button>
        </div>
        <div className="mt-4 whitespace-pre-wrap rounded-lg border border-sf-border bg-sf-surface-muted p-4 text-sm leading-relaxed text-sf-foreground">
          {selectedPersona.loomScript}
        </div>
      </div>
    </div>
  );
}

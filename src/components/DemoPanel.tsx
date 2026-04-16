"use client";

import type { LucideIcon } from "lucide-react";
import { Anchor, Database, Flag, MessageSquareQuote, Target, TrendingUp, Video, Wrench, Zap } from "lucide-react";
import type { AccountConfig, AccountUseCase, Persona } from "@/types";

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
  selectedUseCase,
  onPickPersona,
  onCopy
}: {
  account: AccountConfig;
  selectedPersona: Persona | null;
  selectedUseCase: AccountUseCase | null;
  onPickPersona: () => void;
  onCopy: (text: string, label: string) => Promise<void>;
}) {
  if (!selectedPersona) {
    return (
      <div className="animate-fade-in rounded-xl border border-sf-border bg-white p-8 text-center shadow-panel">
        <div className="text-sm font-semibold text-sf-foreground">Name a stakeholder first</div>
        <div className="mt-1 text-sm text-sf-foreground-muted">
          Demos follow the person in the room. Lead with a wedge on the Wedges tab to load the proving stakeholder, or
          open Stakeholders.
        </div>
        <button
          type="button"
          onClick={onPickPersona}
          className="mt-5 inline-flex items-center justify-center rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-semibold text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
        >
          Target stakeholder
        </button>
      </div>
    );
  }

  const misaligned =
    selectedUseCase && selectedPersona.id !== selectedUseCase.demoPersonaId
      ? account.personas.find((p) => p.id === selectedUseCase.demoPersonaId)
      : null;

  const onPrimaryPath =
    selectedUseCase &&
    selectedPersona.id === account.primaryMotion.personaId &&
    selectedUseCase.id === account.primaryMotion.useCaseId;

  return (
    <div className="animate-fade-in space-y-6">
      {selectedUseCase ? (
        <div
          className="rounded-xl border px-4 py-3 text-sm leading-relaxed"
          style={{
            borderColor: `${account.color}44`,
            backgroundColor: `${account.color}0d`
          }}
        >
          <div className="font-semibold text-sf-foreground">Proof point alignment · {account.name}</div>
          <p className="mt-1 text-xs text-sf-foreground-muted">{account.proof_point}</p>
          <p className="mt-2 text-xs text-sf-foreground">
            <span className="font-semibold">Wedge:</span> {selectedUseCase.title}
          </p>
          {misaligned ? (
            <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950">
              This wedge is proven with the <span className="font-semibold">{misaligned.title}</span> demo (
              {selectedUseCase.first_workload.slice(0, 80)}
              …). Switch stakeholder or re-lock the wedge to match.
            </p>
          ) : (
            <p className="mt-2 text-xs font-medium text-emerald-800">
              Demo matches the proving stakeholder for this wedge.
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-sf-border bg-white p-4 text-sm text-sf-foreground-muted shadow-panel">
          Lead with a <span className="font-semibold text-sf-foreground">wedge</span> for {account.name} to tie this demo to a workload and
          the proof point.
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold text-sf-foreground">Demo recipe</div>
          <div className="text-xs text-sf-foreground-muted">
            Deal acceleration — proof the buyer can feel, not a feature tour.
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LoomLeadBadge lead={selectedPersona.loomLead} />
        </div>
      </div>

      <div
        className="rounded-xl border bg-white p-5 shadow-panel"
        style={{ borderColor: `${account.color}55`, borderLeftWidth: 4 }}
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
          <Target className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          Business framing
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold text-sf-foreground">What problem this demo solves</div>
            <p className="mt-2 text-sm leading-relaxed text-sf-foreground">{selectedPersona.demoRecipe.businessProblem}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-sf-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-sf-foreground-muted" strokeWidth={2} aria-hidden />
              Why it matters economically
            </div>
            <p className="mt-2 text-sm leading-relaxed text-sf-foreground">{selectedPersona.demoRecipe.economicWhy}</p>
          </div>
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
            {onPrimaryPath ? (
              <p className="mt-1 text-sm text-sf-foreground-muted">
                Primary focus:{" "}
                <span className="font-medium text-sf-foreground">{account.primaryMotion.demoLabel}</span>
              </p>
            ) : null}
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
        <div className="rounded-xl border border-sf-border bg-sf-surface-muted/40 p-4 shadow-panel">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
            <MessageSquareQuote className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Expected reaction
          </div>
          <p className="mt-3 text-sm leading-relaxed text-sf-foreground">{selectedPersona.demoRecipe.expectedReaction}</p>
        </div>
        <div className="rounded-xl border border-sf-border bg-sf-surface-muted/40 p-4 shadow-panel">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
            <Flag className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Next step trigger
          </div>
          <p className="mt-3 text-sm leading-relaxed text-sf-foreground">{selectedPersona.demoRecipe.nextStepTrigger}</p>
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
              Paste, tighten, send. Keep it short.
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

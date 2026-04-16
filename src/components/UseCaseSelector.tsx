"use client";

import React, { memo } from "react";
import {
  Brain,
  Building2,
  CircleDollarSign,
  ClipboardList,
  Handshake,
  Microscope
} from "lucide-react";
import type { AccountConfig, AccountUseCase, Persona } from "@/types";

const USE_CASE_ICONS = [Microscope, CircleDollarSign, Building2, Handshake, ClipboardList, Brain] as const;

export const UseCaseSelector = memo(function UseCaseSelector({
  account,
  selectedPersona,
  selectedUseCaseId,
  onSelectUseCase
}: {
  account: AccountConfig;
  selectedPersona: Persona | null;
  selectedUseCaseId: string | null;
  onSelectUseCase: (useCase: AccountUseCase) => void;
}) {
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <div className="text-sm font-semibold text-sf-foreground">Account use cases</div>
        <div className="text-xs text-sf-foreground-muted">
          Each wedge is specific to {account.name}. Selecting one sets the matching demo persona and drives outreach.
        </div>
      </div>

      {selectedPersona ? (
        <div
          className="mb-4 rounded-xl border p-3"
          style={{ borderColor: `${account.color}44`, backgroundColor: `${account.color}0d` }}
        >
          <div className="text-xs text-sf-foreground-muted">
            Current persona:{" "}
            <span className="font-semibold" style={{ color: account.color }}>
              {selectedPersona.title}
            </span>{" "}
            <span className="text-slate-400">·</span> Anchor demo:{" "}
            <span className="font-semibold text-sf-foreground">{selectedPersona.anchorDemo}</span>
          </div>
        </div>
      ) : (
        <div className="mb-4 rounded-xl border border-sf-border bg-white p-3 text-sm text-sf-foreground-muted shadow-panel">
          Pick a use case to auto-select the persona whose demo proves that wedge — or choose a persona first.
        </div>
      )}

      <div className="grid gap-3">
        {account.useCases.map((uc, i) => {
          const selected = selectedUseCaseId === uc.id;
          const Icon = USE_CASE_ICONS[i % USE_CASE_ICONS.length];
          const demoPersona = account.personas.find((p) => p.id === uc.demoPersonaId);
          return (
            <button
              key={uc.id}
              type="button"
              onClick={() => onSelectUseCase(uc)}
              className={[
                "group flex items-start gap-3 rounded-xl border px-4 py-3 text-left shadow-panel transition",
                selected ? "bg-white" : "bg-white hover:border-slate-300"
              ].join(" ")}
              style={
                selected
                  ? {
                      borderColor: `${account.color}66`,
                      boxShadow: `0 0 0 1px ${account.color}33`
                    }
                  : { borderColor: "rgb(226 232 240)" }
              }
            >
              <div
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-sf-border bg-sf-surface-muted text-sf-foreground-muted"
                aria-hidden="true"
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-sf-foreground">{uc.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-sf-foreground-muted">{uc.summary}</div>
                <div className="mt-2 rounded-md border border-sf-border/80 bg-sf-surface-muted/80 px-2.5 py-1.5 text-[11px] leading-snug text-sf-foreground">
                  <span className="font-semibold text-sf-foreground">First workload:</span> {uc.first_workload}
                </div>
                {demoPersona ? (
                  <div className="mt-1.5 text-[11px] text-sf-foreground-muted">
                    Demo: <span className="font-medium text-sf-foreground">{demoPersona.title}</span> ·{" "}
                    {demoPersona.anchorDemo}
                  </div>
                ) : null}
              </div>
              <div className="mt-1 text-xs font-medium text-sf-primary opacity-0 transition group-hover:opacity-100">
                Select
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

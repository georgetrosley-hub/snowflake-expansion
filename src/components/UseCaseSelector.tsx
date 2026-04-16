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
import type { Persona, VerticalConfig } from "@/types";

const USE_CASE_ICONS = [Microscope, CircleDollarSign, Building2, Handshake, ClipboardList, Brain] as const;

export const UseCaseSelector = memo(function UseCaseSelector({
  vd,
  selectedPersona,
  selectedUseCase,
  onSelectUseCase
}: {
  vd: VerticalConfig;
  selectedPersona: Persona | null;
  selectedUseCase: string | null;
  onSelectUseCase: (useCase: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <div className="text-sm font-semibold text-sf-foreground">Choose a use case</div>
        <div className="text-xs text-sf-foreground-muted">This selection drives the outreach email draft.</div>
      </div>

      {selectedPersona ? (
        <div
          className="mb-4 rounded-xl border p-3"
          style={{ borderColor: `${vd.color}44`, backgroundColor: `${vd.color}0d` }}
        >
          <div className="text-xs text-sf-foreground-muted">
            Persona:{" "}
            <span className="font-semibold" style={{ color: vd.color }}>
              {selectedPersona.title}
            </span>{" "}
            <span className="text-slate-400">·</span> Recommended anchor demo:{" "}
            <span className="font-semibold text-sf-foreground">{selectedPersona.anchorDemo}</span>
          </div>
        </div>
      ) : (
        <div className="mb-4 rounded-xl border border-sf-border bg-white p-3 text-sm text-sf-foreground-muted shadow-panel">
          Tip: pick a persona first to get an anchor demo recommendation.
        </div>
      )}

      <div className="grid gap-3">
        {vd.useCases.map((uc, i) => {
          const selected = selectedUseCase === uc;
          const Icon = USE_CASE_ICONS[i % USE_CASE_ICONS.length];
          return (
            <button
              key={uc}
              type="button"
              onClick={() => onSelectUseCase(uc)}
              className={[
                "group flex items-start gap-3 rounded-xl border px-4 py-3 text-left shadow-panel transition",
                selected ? "bg-white" : "bg-white hover:border-slate-300"
              ].join(" ")}
              style={
                selected
                  ? {
                      borderColor: `${vd.color}66`,
                      boxShadow: `0 0 0 1px ${vd.color}33`
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
                <div className="text-sm font-semibold text-sf-foreground">{uc}</div>
                <div className="mt-1 text-xs text-sf-foreground-muted">
                  Next: generate outreach, then copy or export.
                </div>
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

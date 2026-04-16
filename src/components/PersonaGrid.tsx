"use client";

import React, { memo, useMemo } from "react";
import { Video, Zap } from "lucide-react";
import type { Persona, VerticalConfig } from "@/types";

function includesLoose(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export const PersonaGrid = memo(function PersonaGrid({
  vd,
  personas,
  selectedPersonaId,
  search,
  onSearchChange,
  onPersonaSelect
}: {
  vd: VerticalConfig;
  personas: Persona[];
  selectedPersonaId: string | null;
  search: string;
  onSearchChange: (next: string) => void;
  onPersonaSelect: (persona: Persona) => void;
}) {
  const filtered = useMemo(() => {
    const q = search.trim();
    if (!q) return personas;
    return personas.filter((p) => {
      const surfaces = p.unconsumedSurface.join(" ");
      return (
        includesLoose(p.title, q) ||
        includesLoose(p.dept, q) ||
        includesLoose(p.trigger, q) ||
        includesLoose(p.anchorDemo, q) ||
        includesLoose(surfaces, q)
      );
    });
  }, [personas, search]);

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-sf-foreground">Pick a persona</div>
          <div className="text-xs text-sf-foreground-muted">
            This selection drives the demo recipe and Loom script.
          </div>
        </div>

        <div className="w-full md:w-96">
          <label className="sr-only" htmlFor="persona-search">
            Search personas
          </label>
          <input
            id="persona-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search title, dept, trigger, capability…"
            className="w-full rounded-lg border border-sf-border bg-white px-4 py-2 text-sm text-sf-foreground placeholder:text-slate-400 outline-none ring-0 transition focus:border-sf-primary focus:ring-2 focus:ring-sf-primary/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-sf-border bg-white p-8 text-center shadow-panel">
          <div className="text-sm font-semibold text-sf-foreground">No matches</div>
          <div className="mt-1 text-sm text-sf-foreground-muted">
            Try searching for a department (R&amp;D), a capability (Cortex), or a pain (compliance).
          </div>
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="mt-4 rounded-lg border border-sf-border bg-white px-4 py-2 text-sm font-medium text-sf-foreground shadow-sm transition hover:bg-sf-surface-muted"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((p) => {
            const selected = selectedPersonaId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onPersonaSelect(p)}
                className={[
                  "group rounded-xl border border-sf-border bg-white p-4 text-left shadow-panel transition",
                  selected ? "" : "hover:border-slate-300"
                ].join(" ")}
                style={
                  selected
                    ? {
                        borderColor: `${vd.color}66`,
                        boxShadow: `0 0 0 1px ${vd.color}33`
                      }
                    : undefined
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold text-sf-foreground">{p.title}</div>
                    <div className="mt-1 text-sm text-sf-foreground-muted">{p.dept}</div>
                  </div>
                  <div
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${vd.color}18`, color: vd.color }}
                  >
                    {p.level}
                  </div>
                </div>

                <div className="mt-3 flex gap-2 text-sm leading-relaxed text-sf-foreground">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
                  <span>{p.trigger}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.unconsumedSurface.map((surf) => (
                    <span
                      key={surf}
                      className="rounded-md border border-sf-border bg-sf-surface-muted px-2 py-1 text-xs text-sf-foreground-muted transition group-hover:text-sf-foreground"
                    >
                      {surf}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-xs text-sf-foreground-muted">
                  <div className="flex min-w-0 items-center gap-1.5 truncate">
                    <Video className="h-3.5 w-3.5 shrink-0 text-sf-foreground-muted" aria-hidden />
                    <span>Loom lead:</span>
                    <span className="font-semibold text-sf-foreground">{p.loomLead}</span>
                  </div>
                  <div className="rounded-md border border-sf-border bg-sf-surface-muted px-2 py-1 text-sf-foreground opacity-0 transition group-hover:opacity-100">
                    Next: Demo
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

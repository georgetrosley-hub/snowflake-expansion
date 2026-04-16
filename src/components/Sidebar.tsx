"use client";

import type { MotionKey, Persona, VerticalConfig, VerticalKey } from "@/types";
import { VerticalGlyph } from "@/components/icons/VerticalGlyph";

const MOTIONS: MotionKey[] = [
  "Mix of all three",
  "New persona outreach",
  "Exec escalation",
  "Use case mapping"
];

function stepState(hasPersona: boolean, hasUseCase: boolean) {
  if (!hasPersona) return 1;
  if (!hasUseCase) return 2;
  return 3;
}

export function Sidebar({
  verticals,
  selectedVertical,
  selectedVerticalData,
  onVerticalSelect,
  motion,
  onMotionSelect,
  selectedPersona,
  selectedUseCase
}: {
  verticals: Record<VerticalKey, VerticalConfig>;
  selectedVertical: VerticalKey | null;
  selectedVerticalData: VerticalConfig | null;
  onVerticalSelect: (name: VerticalKey) => void;
  motion: MotionKey;
  onMotionSelect: (motion: MotionKey) => void;
  selectedPersona: Persona | null;
  selectedUseCase: string | null;
}) {
  const vd = selectedVerticalData;
  const currentStep = stepState(Boolean(selectedPersona), Boolean(selectedUseCase));

  return (
    <aside className="flex h-full flex-col border-r border-sf-border bg-sf-surface-muted p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
        Vertical
      </div>

      <div className="mt-3 flex flex-col gap-1">
        {(Object.entries(verticals) as [VerticalKey, VerticalConfig][]).map(([name, data]) => {
          const selected = selectedVertical === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onVerticalSelect(name)}
              className={[
                "group relative flex w-full items-center gap-2 rounded-lg py-2 pl-3 pr-2 text-left text-sm transition",
                selected
                  ? "bg-white text-sf-foreground shadow-panel ring-1 ring-sf-border"
                  : "text-sf-foreground-muted hover:bg-white/80 hover:text-sf-foreground"
              ].join(" ")}
            >
              <span
                className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full transition-opacity"
                style={{
                  backgroundColor: data.color,
                  opacity: selected ? 1 : 0
                }}
                aria-hidden="true"
              />
              <VerticalGlyph iconKey={data.iconKey} className="shrink-0 text-sf-foreground-muted" size={18} />
              <span className="flex-1 pl-1">{name}</span>
              <span
                className={[
                  "h-2 w-2 shrink-0 rounded-full transition",
                  selected ? "" : "opacity-0 group-hover:opacity-50"
                ].join(" ")}
                style={{ backgroundColor: data.color }}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-sf-border bg-white p-3 shadow-panel">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-sf-foreground">Progress</div>
          <div className="text-[11px] text-sf-foreground-muted">Step {currentStep} of 3</div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
          {[
            { label: "Persona", done: Boolean(selectedPersona) },
            { label: "Use case", done: Boolean(selectedUseCase) },
            { label: "Outreach", done: Boolean(selectedPersona && selectedUseCase) }
          ].map((s, idx) => (
            <div
              key={s.label}
              className={[
                "rounded-lg border px-2 py-2 text-center font-medium",
                s.done
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : idx + 1 === currentStep
                    ? "border-sky-200 bg-sky-50 text-sky-900"
                    : "border-sf-border bg-sf-surface-muted text-sf-foreground-muted"
              ].join(" ")}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {selectedVertical && vd ? (
        <>
          <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted">
            Motion
          </div>

          <div className="mt-3 flex flex-col gap-1">
            {MOTIONS.map((m) => {
              const selected = motion === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => onMotionSelect(m)}
                  className={[
                    "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                    selected
                      ? "bg-white font-medium text-sf-foreground shadow-panel ring-1 ring-sf-border"
                      : "text-sf-foreground-muted hover:bg-white/80 hover:text-sf-foreground"
                  ].join(" ")}
                >
                  {m}
                </button>
              );
            })}
          </div>

          {selectedPersona ? (
            <div
              className="mt-6 rounded-xl border p-3"
              style={{
                borderColor: `${vd.color}44`,
                backgroundColor: `${vd.color}0d`
              }}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: vd.color }}>
                Selected persona
              </div>
              <div className="mt-1 text-sm font-semibold text-sf-foreground">{selectedPersona.title}</div>
              <div className="mt-0.5 text-xs text-sf-foreground-muted">
                {selectedPersona.dept} · {selectedPersona.level}
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-sf-border bg-white p-3 text-sm text-sf-foreground-muted shadow-panel">
              Pick a persona to unlock the demo recipe and outreach flow.
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-xl border border-sf-border bg-white p-3 text-sm text-sf-foreground-muted shadow-panel">
          Choose a vertical to begin.
        </div>
      )}

      <div className="mt-auto pt-6 text-xs text-sf-foreground-muted">
        Built for fast persona → demo → outreach iteration.
      </div>
    </aside>
  );
}

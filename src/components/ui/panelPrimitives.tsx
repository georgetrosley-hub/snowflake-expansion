"use client";

import type { LucideIcon } from "lucide-react";

const labelRow =
  "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sf-foreground-muted";

/** Labeled value card — unified territory field + deal intel block styling. */
export function PanelField({
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
      <div className={labelRow}>
        <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        {label}
      </div>
      <p className={`mt-2 text-sm leading-relaxed text-sf-foreground ${accent ?? ""}`}>{value}</p>
    </div>
  );
}

export function PanelListSection({
  title,
  titleIcon: TitleIcon,
  subtitle,
  ordered,
  items
}: {
  title: string;
  titleIcon: LucideIcon;
  subtitle?: string;
  ordered: boolean;
  items: string[];
}) {
  const ListTag = ordered ? "ol" : "ul";
  const listClass = ordered ? "list-decimal" : "list-disc";
  return (
    <div className="rounded-xl border border-sf-border bg-white p-5 shadow-panel">
      <div className="flex items-center gap-2 text-sm font-semibold text-sf-foreground">
        <TitleIcon className="h-4 w-4 text-sf-foreground-muted" aria-hidden />
        {title}
        {subtitle ? (
          <span className="font-normal text-sf-foreground-muted">{subtitle}</span>
        ) : null}
      </div>
      <ListTag className={`mt-3 ${listClass} space-y-2 pl-5 text-sm leading-relaxed text-sf-foreground`}>
        {items.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ListTag>
    </div>
  );
}

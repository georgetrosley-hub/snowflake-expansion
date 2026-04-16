"use client";

import type { LucideIcon } from "lucide-react";
import { Factory, FlaskConical, HeartPulse, Landmark } from "lucide-react";
import type { TerritoryIconKey } from "@/types";

const GLYPHS: Record<TerritoryIconKey, LucideIcon> = {
  pharma: FlaskConical,
  financial: Landmark,
  healthcare: HeartPulse,
  manufacturing: Factory
};

export function TerritoryGlyph({
  iconKey,
  className,
  size = 18,
  strokeWidth = 2
}: {
  iconKey: TerritoryIconKey;
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  const Icon = GLYPHS[iconKey];
  return <Icon className={className} size={size} strokeWidth={strokeWidth} aria-hidden />;
}

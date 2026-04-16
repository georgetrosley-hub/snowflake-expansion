"use client";

import { Building2 } from "lucide-react";

/** Neutral account mark — navigation is account-scoped, not industry/vertical. */
export function AccountGlyph({
  className,
  size = 18,
  strokeWidth = 2
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  return <Building2 className={className} size={size} strokeWidth={strokeWidth} aria-hidden />;
}

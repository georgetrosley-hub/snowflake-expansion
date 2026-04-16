"use client";

import { SnowflakeSymbol } from "@/components/SnowflakeSymbol";

/** Compact Snowflake symbol for account rows and in-app accents (decorative). */
export function AccountGlyph({
  className,
  size = 18
}: {
  className?: string;
  size?: number;
}) {
  return <SnowflakeSymbol className={className} size={size} alt="" />;
}

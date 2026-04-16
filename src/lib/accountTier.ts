import type { AccountConfig } from "@/types";

export const TIER_HEADINGS: Record<AccountConfig["tier"], string> = {
  1: "Tier 1 · Primary focus",
  2: "Tier 2 · Active expansion",
  "2B": "Tier 2B · Expansion (sequence)",
  3: "Tier 3 · Monitor / opportunistic"
};

export const TIER_ORDER: AccountConfig["tier"][] = [1, 2, "2B", 3];

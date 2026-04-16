import { SnowflakeSymbol } from "@/components/SnowflakeSymbol";

/**
 * Primary app mark — Snowflake symbol (territory / data plane context).
 */
export function ProductMark({
  className = "",
  size = 40,
  priority = false
}: {
  className?: string;
  /** Logical pixel size (matches Tailwind h/w when used with the same value). */
  size?: number;
  /** Set true for the header / above-the-fold mark. */
  priority?: boolean;
}) {
  return (
    <SnowflakeSymbol className={className} size={size} priority={priority} alt="Snowflake" />
  );
}

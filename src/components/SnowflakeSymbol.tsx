import Image from "next/image";

const SRC = "/snowflake-symbol.png";

/** Official Snowflake symbol (local asset). Use decorative `alt` when repeated in lists. */
export function SnowflakeSymbol({
  className = "",
  size = 40,
  priority = false,
  alt = "Snowflake"
}: {
  className?: string;
  size?: number;
  priority?: boolean;
  /** Pass empty string for decorative repeats (e.g. account rows). */
  alt?: string;
}) {
  return (
    <Image
      src={SRC}
      alt={alt}
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      priority={priority}
    />
  );
}

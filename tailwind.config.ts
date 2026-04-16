import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sf: {
          primary: "#29B5E8",
          "primary-deep": "#0EA5E9",
          foreground: "#0f172a",
          "foreground-muted": "#64748b",
          surface: "#ffffff",
          "surface-muted": "#f8fafc",
          border: "#e2e8f0",
          ring: "#29B5E8"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        panel: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)"
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in": "fade-in 180ms ease-out"
      }
    }
  },
  plugins: []
};

export default config;


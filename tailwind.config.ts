import type { Config } from "tailwindcss";

const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        kane: {
          blue: rgb("--kane-blue"),
          "blue-deep": rgb("--kane-blue-deep"),
          "blue-ink": rgb("--kane-blue-ink"),
          amber: rgb("--kane-amber"),
          "amber-soft": rgb("--kane-amber-soft"),
        },
        paper: rgb("--paper"),
        "paper-deep": rgb("--paper-deep"),
        ink: rgb("--ink"),
        "ink-soft": rgb("--ink-soft"),
        rule: rgb("--rule"),
        data: {
          1: rgb("--data-1"),
          2: rgb("--data-2"),
          3: rgb("--data-3"),
          4: rgb("--data-4"),
          5: rgb("--data-5"),
          6: rgb("--data-6"),
        },
        positive: rgb("--positive"),
        caution: rgb("--caution"),
        critical: rgb("--critical"),
        background: rgb("--background"),
        foreground: rgb("--foreground"),
        card: { DEFAULT: rgb("--card"), foreground: rgb("--card-foreground") },
        popover: { DEFAULT: rgb("--popover"), foreground: rgb("--popover-foreground") },
        primary: { DEFAULT: rgb("--primary"), foreground: rgb("--primary-foreground") },
        secondary: { DEFAULT: rgb("--secondary"), foreground: rgb("--secondary-foreground") },
        muted: { DEFAULT: rgb("--muted"), foreground: rgb("--muted-foreground") },
        accent: { DEFAULT: rgb("--accent"), foreground: rgb("--accent-foreground") },
        destructive: { DEFAULT: rgb("--destructive"), foreground: rgb("--destructive-foreground") },
        border: rgb("--border"),
        input: rgb("--input"),
        ring: rgb("--ring"),
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 6vw, 5.25rem)", { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "400" }],
        "display-2": ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.03", letterSpacing: "-0.02em", fontWeight: "400" }],
        "stat-xl": ["clamp(2.75rem, 5vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.025em", fontWeight: "500" }],
        "eyebrow": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.18em", fontWeight: "600" }],
      },
      boxShadow: {
        editorial: "0 1px 0 rgb(var(--rule)), 0 0 0 1px rgb(var(--rule))",
        "editorial-lg": "0 2px 8px rgba(8, 110, 159, 0.06), 0 0 0 1px rgb(var(--rule))",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

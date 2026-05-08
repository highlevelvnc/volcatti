import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "3rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        graphite: {
          DEFAULT: "#111111",
          900: "#0c0c0c",
          800: "#1c1c1a",
          700: "#2a2a26",
        },
        offwhite: {
          DEFAULT: "#F4F1EA",
          100: "#FAF8F2",
          200: "#ECE7DC",
          300: "#DDD7CB",
        },
        concrete: {
          DEFAULT: "#C9C3B8",
          dark: "#A29B8E",
        },
        bronze: {
          DEFAULT: "#B88A2A",
          light: "#D4A047",
          dark: "#8E6A1F",
        },
        petroleum: {
          DEFAULT: "#173238",
          dark: "#0E2227",
          light: "#1F4148",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.6rem, 7vw, 6.4rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.4rem, 5.4vw, 5.2rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.6rem, 2.4vw, 2.2rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      spacing: {
        "section-y": "clamp(80px, 11vw, 160px)",
        "header-h": "84px",
      },
      transitionTimingFunction: {
        elegant: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-elegant": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      maxWidth: {
        container: "1320px",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        success: "hsl(var(--success))"
      },
      boxShadow: {
        soft: "0 20px 45px -24px rgba(15, 23, 42, 0.35)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(148, 163, 184, 0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.10) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;

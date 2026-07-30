import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        line: "var(--line)",
        highlight: "var(--highlight)",
        charcoal: "var(--charcoal)",
        stone: "var(--stone)",
        taupe: "var(--taupe)",
        brand: {
          red: "var(--terracotta)",
          green: "var(--sage)",
          teal: "var(--teal)",
          orange: "var(--burnt-orange)",
        },
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      fontFamily: {
        sans: "var(--font-sans)",
        display: "var(--font-display)",
        heading: "var(--font-heading)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        "4xl": "var(--radius-4xl)",
        "radius-sm": "var(--radius-sm)",
        "radius-md": "var(--radius-md)",
        "radius-lg": "var(--radius-lg)",
        "radius-xl": "var(--radius-xl)",
        "radius-2xl": "var(--radius-2xl)",
        "radius-3xl": "var(--radius-3xl)",
        "radius-4xl": "var(--radius-4xl)",
      },
      boxShadow: {
        card: "0 14px 45px rgba(31, 31, 31, 0.035)",
        "card-hover": "0 22px 55px rgba(31, 31, 31, 0.075)",
        dropdown: "0 18px 45px rgba(31, 31, 31, 0.14)",
      },
      aspectRatio: {
        project: "4 / 3",
      },
      maxWidth: {
        site: "1440px",
        gallery: "1600px",
      },
      height: {
        header: "88px",
      },
      zIndex: {
        gallery: "100",
      },
    },
  },
} satisfies Config;

export default config;

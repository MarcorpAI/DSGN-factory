import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "warm-paper": "#050506",
        "warm-black": "#f4f0e8",
        terracotta: "#35a6ff",
        "deep-teal": "#b884ff",
        mustard: "#ccff3d",
        "warm-muted": "#908f9a",
        "warm-divider": "rgba(255,255,255,0.12)",
        "warm-white": "#0b0c0f",
        void: "#050506",
        graphite: "#0b0c0f",
        ink: "#12141a",
        milk: "#f4f0e8",
        electric: "#35a6ff",
        violet: "#b884ff",
        acid: "#ccff3d",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        grotesque: ["var(--font-grotesque)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

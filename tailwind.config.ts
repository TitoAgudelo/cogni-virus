import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "zinc-900": "#1F0D24",
        "fuchsia-950": "#3E1F47",
        "slate-800": "#272640",
        "indigo-950": "#312244",
        "indigo-alt": "#4D194D",
        "green-400": "#52A86E",
        "green-200": "#E8F6ED",
        "slate-600": "#5B4775",
        "rose-500": "#E45858",
        "emerald-50": "#E8F6ED",
        "rose-200": "#F8D5D5",
        "neutral-50": "#FAFAFA",
        "gray-900": "#222124",
        "gray-500": "#5F5F61",
        "gray-border": "#E6E6E6",
        "gray-header": "#F6F6F6",
        "gray-header-item": "#A1A0A3",
        "gray-icon": "#F1F1F1",
      },
    },
  },
  plugins: [],
};
export default config;

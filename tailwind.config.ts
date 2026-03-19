import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [tailwindAnimate],
} satisfies Config;

export default config;

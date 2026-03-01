import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#a63a37",
          dark: "#7c2421",
          light: "#e4bbb8"
        }
      }
    }
  },
  plugins: []
};

export default config;

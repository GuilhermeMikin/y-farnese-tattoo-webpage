import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#a31111",
          dark: "#700d0d",
          light: "#c75050"
        }
      }
    }
  },
  plugins: []
};

export default config;

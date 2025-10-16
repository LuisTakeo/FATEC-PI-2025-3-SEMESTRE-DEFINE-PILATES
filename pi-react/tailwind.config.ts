import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/pages/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        italiana: ["Italiana", "sans-serif"], 
      },
    },
  },
  plugins: [],
};

export default config;

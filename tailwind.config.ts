import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-rudaw)', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function({ addBase }) {
      addBase({
        'h1, h2, h3, h4, h5, h6, .font-bold, strong, b': {
          fontWeight: '400 !important',
          WebkitTextStroke: '0.6px currentColor !important',
        }
      })
    })
  ],
};
export default config;

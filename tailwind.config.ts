import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        Gainsboro: "#DEDEDE",
        grayblack: "#162026",
        grayBottom: "#EAECF0",
        grayHeader: "#F2F4F7",
        indigo: "#283B46",
        pink: "#FF003D",
        input: "#FEFEFE",
        background: "#F4F5FF",
        primary: "#574DFF",
        card: "#F0F3F8",
        dark3: "#121212",
        dark2: "#10181C",
        milky: "#F7F7F7",
        dark: "#2C2929",
        offwhite: "#FEFEFE",
        grayBlack: "#121212",
        grayBlack2: "#2C2929",
        grayHelp: "#565D62",
        gray: "#F7F7F7",
        grayoutline: "#E7EAF1",
        grayInactive: "#636C71",
        comment: "#42474B",
        dividerColor: "#EDEDED",
      },
      fontFamily: {
        roman: ["var(--font-roman)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

export default config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

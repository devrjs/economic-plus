import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-roboto)",
        alt: "var(--font-bai-jamjuree)",
      },

      colors: {
        transparent: "transparent",

        black: "#000000",
        white: "#ffffff",

        gray: {
          50: "#eaeaea",
          100: "#E9EAEC",
          200: "#C7CAD1",
          300: "#9095A2",
          400: "#757b8c",
          500: "#444b5f",
          600: "#3c4254",
          700: "#282c38",
          800: "#1d1f25",
          900: "#121214",
        },

        // blue: {
        //   500: "#3a86ff",
        //   600: "#246EE5",
        // },

        cyan: {
          400: "#81d8f7",
          500: "#66CFF5",
        },

        red: {
          500: "#D73754",
        },

        purple: {
          400: "#8F85FF",
          500: "#6D61FF",
        },

        orange: {
          500: "#F46D22",
        },

        yellow: {
          500: "#FFC01E",
          600: "#DBA41A",
        },

        green: {
          500: "#1FCB4F",
        },
      },

      fontSize: {
        "5xl": "2.5rem",
      },

      blur: {
        full: "194px",
      },
    },
  },
  plugins: [],
}
export default config

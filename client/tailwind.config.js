/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 3px 10px rgba(0, 0, 0, 0.04)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        linkedin: {
          DEFAULT: "#0A66C2",
          light: "#378FE9",
          dark: "#004182",
        },
      },
    },
  },
  plugins: [forms, typography],
};

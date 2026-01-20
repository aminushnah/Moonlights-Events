/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#111111",
        secondary: "#6B7280",
        "background-light": "#F5F5F5",
        "background-dark": "#0F0F0F",
        "card-light": "#FFFFFF",
        "card-dark": "#1A1A1A",
        "border-light": "#E5E7EB",
        "border-dark": "#2A2A2A",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
      },
    },
  },
  plugins: [],
}

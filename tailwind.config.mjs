/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,ts}"],
  theme: {
    extend: {
      colors: {
        "background-light": "#FAF8F5",
        "background-dark": "#111121",
        "accent-green": "#a3e635",
        "card-light": "#F0EDE8",
      },
      fontFamily: {
        heading: ["AlteHaasGroteskBold", "system-ui", "sans-serif"],
        subheading: ["AlteHaasGroteskRegular", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0 2px 12px 0 rgba(0,0,0,0.08)",
        modal: "0 8px 32px 0 rgba(0,0,0,0.24)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        login: "29.16444rem",
      },
      maxHeight: {
        login: "39.6439rem",
      },
      backgroundColor: {
        opposite: "var(--bg-opposite)",
        main: "var(--bg-main)",
        blue: "var(--bg-blue)",
        divider: "var(--bg-divider)",
        main: "var(--bg-main)",
        hover: "var(--bg-hover)",
      },
      colors: {
        text: "var(--color-text)",
        "l-gray": "var(--color-l-gray)",
        blue: "var(--color-blue)",
        logo: "var(--color-logo)",
        heading: "var(--color-heading)",
        gray: "var(--color-gray)",
        label: "var(--color-label)",
        alert: "var(--color-alert)",
        dark: "var(--color-dark)",
      },
      borderColor: {
        gray: "var(--border-color-gray)",
        divider: "var(--border-color-divider)",
        "light-gray": "var(--border-color-light-gray)",
      },
      boxShadow: {
        primary: "0px 2px 4px 0px rgba(0, 0, 0, 0.05);",
      },
    },
  },
  plugins: [],
};

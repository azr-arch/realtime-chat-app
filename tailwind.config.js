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
        light: "#fff",
        blue: "#2F80ED",
        divider: "#E0E0E0",
        main: "#FAFAFB",
        hover: "#F2F2F2",
      },
      colors: {
        text: "#333",
        "l-gray": "#828282",
        blue: "#2D9CDB",
        logo: "#282051",
        heading: "#000000",
        gray: "#BDBDBD",
        label: "#4F4F4F",
        alert: "#EB5757",
      },
      borderColor: {
        gray: "#BDBDBD",
        divider: "#E0E0E0",
        "light-gray": "#828282",
      },
      boxShadow: {
        primary: "0px 2px 4px 0px rgba(0, 0, 0, 0.05);",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#122240",
        steel: "#3C5878",
        paper: "#F5F6F2",
        paperdim: "#EAEBE5",
        line: "#DEDED4",
        accent: "#2E63B8",
        accentdark: "#1E437F",
        moss: "#4B7052",
        brick: "#A23E33",
      },
      fontFamily: {
        display: ['"Libre Franklin"', "sans-serif"],
        body: ['"Source Sans 3"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

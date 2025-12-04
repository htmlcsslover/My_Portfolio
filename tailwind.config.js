/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index/*.html"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
      colors: {
        orange: {
          500: "#FB8500",
        },
        blue: {
          600: "#2563eb",
        },
      },
      screens: {
        xs: { max: "639px" }, // extra small screens
      },

    },
  },
  plugins: [],
};

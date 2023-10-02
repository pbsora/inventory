/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./views/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        satisfy: ["Satisfy", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {

    extend: {
      colors: {
        red: {
          50: '#cba6a6',
          100: '#be9090',
          200: '#b17a7a',
          300: '#a46464',
          400: '#974d4d',
          500: '#8a3737',
          600: '#7d2121',
          700: '#711e1e',
          800: '#641a1a',
          900: '#581717',
        }
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

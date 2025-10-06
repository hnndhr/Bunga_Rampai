/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        '140': '1.4',
      },
      letterSpacing: {
        '10': '0.1em',
      },
      fontFamily: {
        abhaya : ['"Abhaya Libre"', 'serif'],
      }
    },
  },
  plugins: [],
};

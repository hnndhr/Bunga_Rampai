/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        abhaya: ['"Abhaya Libre"', 'serif'],
      }
    },
  },
  plugins: [],
};
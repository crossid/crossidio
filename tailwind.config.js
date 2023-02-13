const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        '8xl': '100rem',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        logo: ['Comfortaa'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        '15px': '0.9375rem',
        '23px': '1.4375rem',
        full: '100%',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

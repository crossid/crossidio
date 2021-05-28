const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      gray: colors.gray,
      blue: colors.blue,
      indigo: colors.indigo,
      fuchsia: colors.fuchsia,
      purple: colors.purple,
      'light-blue': colors.lightBlue,
      pink: colors.pink,
      rose: colors.rose,
      cyan: colors.cyan,
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        logo: ['Comfortaa'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}

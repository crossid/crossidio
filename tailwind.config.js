const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#000',
      white: '#fff',

      amber: colors.amber,
      blue: colors.blue,
      cyan: colors.cyan,
      emerald: colors.emerald,
      fuchsia: colors.fuchsia,
      gray: colors.coolGray,
      green: colors.green,
      indigo: colors.indigo,
      'light-blue': colors.lightBlue,
      lime: colors.lime,
      orange: colors.orange,
      pink: colors.pink,
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      teal: colors.teal,
      violet: colors.violet,
      yellow: colors.yellow,

      code: {
        punctuation: '#A1E8FF',
        tag: '#D58FFF',
        'attr-name': '#4BD0FB',
        'attr-value': '#A2F679',
        string: '#A2F679',
        highlight: 'rgba(134, 239, 172, 0.25)',
      },
    },
    extend: {
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
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}

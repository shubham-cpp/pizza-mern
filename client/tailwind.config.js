/* eslint-disable */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pushter: ['Pushster', 'cursive'],
        'source-code': ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'pizza-bg': "url('./img/pizza-bg.jpg')",
      },
    },
  },
  plugins: [],
};

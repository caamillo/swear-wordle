/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.js', './public/index.html', './src/**/*.js'],
  theme: {
    screens: {
      sm: '480px',
      md: '800px',
      lg: '976px',
      xl: '1440px',
      'tiny': { 'raw': '(max-height: 850px)' }
    },
    fontFamily: {
      'radiocanada': ['Radio Canada', 'sans-serif']
    }
  },
  plugins: [],
}

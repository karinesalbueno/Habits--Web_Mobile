/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // estilização em todos os arquivos terminados em tsx na pasta src
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#09090A'
      }
    },
  },
  plugins: [],
}

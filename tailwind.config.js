/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: 'Inter_400Regular',
        semibold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
        extrabold: 'Inter_800ExtraBold'
      },
      scale: {
        '199': '1.99',
      },
      colors:{
        violet:{
          100: "#5F08E9",
          200: "#6D28D9"
        }
      }
    },
  },
  plugins: [],
};

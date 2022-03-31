module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'my-Blue': '#0028FF'
      },
      fontFamily: {
        'Monserrat': ['Montserrat', 'sans-serif'],
        'Poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
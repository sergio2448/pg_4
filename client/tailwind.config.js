module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'city': "url('./src//styles/images/city5.jpg')",
      },
      colors:{
        'my-Blue': '#0028FF',
        'darkProject': '#132C33',
        'lightProject': '#51C4D380',
        'whiteProject': '#D8E3E7'
      },
      fontFamily: {
        'Monserrat': ['Montserrat', 'sans-serif'],
        'Poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
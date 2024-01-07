/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,jsx,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5810',
        pressed: '#E44400',
        menuSection: '#F5F5F5',
        textGray: '#7C7C80',
        bgGrayLight: '#E5E5E5',
        grayLight: '#848484',
        graycaption: '#757575',
        grayoption: '#545456',
        Gray00: '#0F0F0F',
        LineGray: '#CECECE',
        correct: '#0E72DE'
      }
    }
  },
  plugins: []
}

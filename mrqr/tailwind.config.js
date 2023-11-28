/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html",
    "./src/**/*.jsx",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF5810",
        pressed: "#E44400",
        menuSection: "#F5F5F5",
        textGray: "#7C7C80",
        grayLight: "#848484",
        Gray00: "#0F0F0F",
        LineGray: "#CECECE",
        correct: "#0E72DE",
      },
    },
  },
  plugins: [],
};

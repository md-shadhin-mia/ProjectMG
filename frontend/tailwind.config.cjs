/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'primary-light': '#f5f5f5',
        'primary-dark': '#333333',
      },
      textColor: {
        'primary-light': '#333333',
        'primary-dark': '#f5f5f5',
      },
    },
  },
  plugins: [],
}
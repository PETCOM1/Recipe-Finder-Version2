// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  dark: 'class', // <-- enable dark mode using a 'dark' class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // your project files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

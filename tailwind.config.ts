/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'scout-purple': '#667eea',
        'scout-blue': '#764ba2',
      },
    },
  },
  plugins: [],
}

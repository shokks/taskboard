/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'task-pending': '#f3f4f6',
        'task-progress': '#dbeafe',
        'task-completed': '#d1fae5',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'vazirmatn': ['Vazirmatn', 'sans-serif'],
      },
      colors: {
        primary: '#6366F1',
        secondary: '#4F46E5',
        surface: '#0F172A',
        section: '#1E293B',
      },
    },
  },
  plugins: [],
}

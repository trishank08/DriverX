/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14171A',
        paper: '#F6F7F4',
        lime: '#C8F04B',
        mist: '#E9ECE8',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(20, 23, 26, 0.08)',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

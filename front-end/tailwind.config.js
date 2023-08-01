/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        inconsolata: ['Inconsolata', 'monospace'],
        tektur: ['Tektur', 'sans-serif'],
      },
      fontSize: {
        '12xl': '12rem',
      },
    },
  },
  plugins: [],
};

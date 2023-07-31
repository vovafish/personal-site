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
    },
  },
  plugins: [],
};

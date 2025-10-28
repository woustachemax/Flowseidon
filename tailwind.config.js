/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', 
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/custom-components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
};

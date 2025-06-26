// tailwind.config.js
/** @type {import('tailwindcss').Config}*/
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // IMPORTANT
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // These paths tell Tailwind where to look for your utility classes.
    // Ensure they cover all your component and page files.
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Crucial for your 'src' directory
  ],
  theme: {
    extend: {}, // Extend Tailwind's default theme here
  },
  plugins: [], // Add any Tailwind plugins here
};

export default config;

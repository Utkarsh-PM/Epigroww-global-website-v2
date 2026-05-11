/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#141730',
        'bg-alt': '#1E1F3A',
        'bg-deep': '#1C1735',
        'bg-nav': '#14172F',
        ink: '#F0F0F0',
        accent: '#E3E65D',
        'accent-2': '#CFDE54',
        navy: '#141730',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Inter', 'sans-serif'],
        heading: ['var(--font-heading)', 'Inter', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        footer: ['var(--font-footer)', 'Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

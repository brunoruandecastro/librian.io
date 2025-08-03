/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        card: 'var(--card-background)',
        text: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
      },
    },
  },
  plugins: [],
}
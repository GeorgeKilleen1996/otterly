/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--theme-primary)',
          light: 'var(--theme-primary-light)'
        },
        secondary: 'var(--theme-secondary)',
        tertiary: {
          DEFAULT: 'var(--theme-text)',
          light: 'var(--theme-text-secondary)'
        },
        accent: 'var(--theme-accent)',
        background: {
          DEFAULT: 'var(--theme-background)',
          secondary: 'var(--theme-background-secondary)'
        },
        border: 'var(--theme-border)'
      }
    }
  },
  plugins: []
}

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
          default: 'var(--theme-primary)',
          light: 'var(--theme-primary-light)'
        },
        secondary: 'var(--theme-secondary)',
        accent: 'var(--theme-accent)',
        background: {
          default: 'var(--theme-background)',
          secondary: 'var(--theme-background-secondary)'
        },
        border: 'var(--theme-border)',
        text: {
          default: 'var(--theme-text)',
          secondary: 'var(--theme-text-secondary)'
        }
      }
    }
  },
  plugins: []
}

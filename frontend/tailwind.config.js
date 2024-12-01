/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--theme-primary)',
          light: 'var(--theme-primary-light)',
          10: 'var(--theme-primary-10)',
        },
        secondary: {
          DEFAULT: 'var(--theme-secondary)',
          light: 'var(--theme-secondary-light)',
          dark: 'var(--theme-secondary-dark)',
          medium: 'var(--theme-secondary-medium)',
        },
        text: {
          DEFAULT: 'var(--theme-text)',
          light: 'var(--theme-text-light)',
        },
        tertiary: {
          DEFAULT: 'var(--theme-tertiary)',
        },
      }
    },
  },
  plugins: [],
}


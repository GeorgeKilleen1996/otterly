module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--theme-primary)",
          light: "var(--theme-primary-light)",
        },
        secondary: "var(--theme-secondary)",
        tertiary: {
          DEFAULT: "var(--theme-text)",
          light: "var(--theme-text-secondary)",
        },
        accent: "var(--theme-accent)",
        background: {
          DEFAULT: "var(--theme-background)",
          secondary: "var(--theme-background-secondary)",
        },
        border: "var(--theme-border)",
      },
    },
  },
  plugins: [],
};

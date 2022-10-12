/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '380px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        tiny: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      colors: {
        accent: 'var(--accent-color)',
        'accent-alt': 'var(--accent-alt-color)',
        background: 'var(--background-color)',
        sidebar: 'var(--sidebar-color)',
        caret: 'var(--caret-color)',
        text: 'var(--text-color)',
        letter: 'var(--letter-color)',
        'letter-correct': 'var(--letter-correct-color)',
        'letter-wrong': 'var(--letter-wrong-color)',
      },
      keyframes: {
        blink: {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.35,
          },
        },
      },
      animation: {
        blink: 'blink 1.4s linear infinite',
      },
      gridTemplateColumns: {
        main: 'auto 1fr',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
    },
  ],
};

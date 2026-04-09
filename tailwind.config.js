/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void:     '#0F0F0F',
        chalk:    '#FFFFFF',
        silver:   '#E5E5E5',
        mist:     '#A0A0A0',
        obsidian: '#1A1A1A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['9rem',   { lineHeight: '0.9',  letterSpacing: '-0.04em' }],
        '9xl':  ['7rem',   { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        '8xl':  ['5.5rem', { lineHeight: '0.94', letterSpacing: '-0.025em' }],
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // ── Logo-derived palette ─────────────────────────────────
      colors: {
        ink: {
          DEFAULT: '#060614',
          50:  '#f0f0ff',
          100: '#e0e0ff',
          200: '#c0c0f0',
          300: '#9090d0',
          400: '#6060a8',
          500: '#3a3a80',
          600: '#20205a',
          700: '#101040',
          800: '#080828',
          900: '#060614',
          950: '#020210',
        },
        violet: {
          DEFAULT: '#A855F7',
          light:   '#C084FC',
          deep:    '#7C3AED',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          light:   '#22D3EE',
          deep:    '#0891B2',
        },
        magenta: {
          DEFAULT: '#C026D3',
          light:   '#E040FB',
        },
      },

      // ── Editorial typography ─────────────────────────────────
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },

      // ── Custom animations ────────────────────────────────────
      animation: {
        'fade-up':     'fadeUp 0.7s ease-out forwards',
        'fade-in':     'fadeIn 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'gradient':    'gradientShift 6s ease infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':       'float 6s ease-in-out infinite',
        'counter':     'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeUp:        { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:        { from: { opacity: 0 }, to: { opacity: 1 } },
        slideRight:    { from: { opacity: 0, transform: 'translateX(-20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        gradientShift: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        float:         { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
      },

      // ── Background sizes for animated gradients ──────────────
      backgroundSize: {
        '200': '200% 200%',
        '300': '300% 300%',
      },
    },
  },
  plugins: [],
};

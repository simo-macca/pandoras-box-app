/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#0c0f17',
          surface: '#161c28',
          card: '#1e2638',
          border: '#2e3a52',
          accent: '#f59e0b',
        },
        pawn: {
          red: '#ef4444',
          blue: '#3b82f6',
          green: '#10b981',
          yellow: '#facc15',
          white: '#f8fafc',
          black: '#18181b',
        },
      },
      keyframes: {
        'dice-spin': {
          '0%': { transform: 'rotate(0deg) scale(0.9)' },
          '25%': { transform: 'rotate(90deg) scale(1.15) translateY(-6px)' },
          '50%': { transform: 'rotate(180deg) scale(0.95)' },
          '75%': { transform: 'rotate(270deg) scale(1.12) translateY(4px)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
      },
      animation: {
        'dice-spin': 'dice-spin 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

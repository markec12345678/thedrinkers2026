/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './screens/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'rock-black': '#0a0a0a',
        'rock-dark': '#1a1a1a',
        'rock-gray': '#2a2a2a',
        'crimson': '#dc143c',
        'crimson-light': '#ff3333',
        'crimson-dark': '#b91030',
        'silver': '#c0c0c0',
        'text-gray': '#cccccc',
        rock: {
          bg: '#0a0a0a',
          surface: '#141414',
          border: '#2a2a2a',
          primary: '#dc143c',
          secondary: '#ff6b35',
          text: '#ffffff',
          muted: '#a0a0a0',
          silver: '#c0c0c0',
        },
      },
      fontFamily: {
        rock: ['System', 'Arial', 'sans-serif'],
        display: ['System', 'system-ui'],
        body: ['System', 'system-ui'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
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
        rock: ['var(--font-rock)', 'Arial', 'sans-serif'],
        display: ['var(--font-rock-display)', 'system-ui'],
        body: ['var(--font-montserrat)', 'system-ui'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          from: {
            textShadow: '0 0 10px #dc143c, 0 0 20px #dc143c, 0 0 30px #dc143c',
          },
          to: {
            textShadow: '0 0 20px #ff3333, 0 0 30px #ff3333, 0 0 40px #ff3333',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-sora)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5bbfc',
          400: '#8196f8',
          500: '#6272f1',
          600: '#4f54e5',
          700: '#4241ca',
          800: '#3737a2',
          900: '#323281',
          950: '#1e1c4b',
        },
        surface: {
          DEFAULT: '#0f0f1a',
          card:    '#161628',
          border:  '#1e1e35',
          muted:   '#252540',
        },
        accent: {
          cyan:   '#06d6a0',
          amber:  '#f59e0b',
          rose:   '#fb7185',
          violet: '#8b5cf6',
        },
      },
      backgroundImage: {
        'hero-gradient':    'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(98,114,241,0.3), transparent)',
        'card-gradient':    'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
        'shimmer':          'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
      },
      animation: {
        'fade-in':     'fadeIn 0.5s ease-out',
        'slide-up':    'slideUp 0.4s ease-out',
        'slide-in':    'slideIn 0.3s ease-out',
        'pulse-slow':  'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':     'shimmer 2s infinite',
        'float':       'float 6s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { '0%': { opacity: '0', transform: 'translateX(-16px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float:   { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      boxShadow: {
        'glow':       '0 0 20px rgba(98,114,241,0.35)',
        'glow-sm':    '0 0 10px rgba(98,114,241,0.2)',
        'glow-cyan':  '0 0 20px rgba(6,214,160,0.35)',
        'card':       '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-hover': '0 10px 40px rgba(0,0,0,0.4)',
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          surfaceLight: '#334155',
          border: '#475569',
          text: '#F1F5F9',
          textSecondary: '#CBD5E1',
        },
        // Brand Colors
        primary: {
          50: '#E0F7FF',
          100: '#B3ECFF',
          200: '#80E1FF',
          300: '#4DD6FF',
          400: '#26CBFF',
          500: '#0EA5E9',
          600: '#0096D6',
          700: '#007EC3',
          800: '#0066B2',
          900: '#004E8A',
          DEFAULT: '#0EA5E9',
        },
        secondary: {
          50: '#FAF5FF',
          100: '#F5EBFF',
          200: '#EDDBFF',
          300: '#E0CBFF',
          400: '#D0B5FF',
          500: '#A78BFA',
          600: '#9370E6',
          700: '#8458D8',
          800: '#7540CB',
          900: '#6A2BB1',
          DEFAULT: '#A78BFA',
        },
        accent: {
          50: '#FFF0F7',
          100: '#FFE1EE',
          200: '#FFC2DE',
          300: '#FFA3CE',
          400: '#FF84BE',
          500: '#EC4899',
          600: '#D9368C',
          700: '#C6287F',
          800: '#B31A72',
          900: '#9F0C65',
          DEFAULT: '#EC4899',
        },
        success: '#22C55E',
        error: '#EF4444',
        warning: '#FB923C',
        info: '#06B6D4',
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #0EA5E9 0%, #A78BFA 50%, #EC4899 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(14, 165, 233, 0.5)',
        'glow-purple': '0 0 20px rgba(167, 139, 250, 0.5)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-sm': '0 0 10px rgba(14, 165, 233, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin-smooth': 'spin 1s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(14, 165, 233, 0.7)',
          },
          '50%': {
            boxShadow: '0 0 0 10px rgba(14, 165, 233, 0)',
          },
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
      },
      transitionDuration: {
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '500': '500ms',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

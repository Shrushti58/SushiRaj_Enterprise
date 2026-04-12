/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F4F8',
          100: '#C5E4F0',
          200: '#9ED0E4',
          300: '#77BCD8',
          400: '#58A8CC',
          500: '#0F2B4D',
          600: '#0D2442',
          700: '#0A1D36',
          800: '#08162A',
          900: '#060F1E',
          DEFAULT: '#0F2B4D',
        },
        secondary: {
          50: '#E6F9F6',
          100: '#BFF0E7',
          200: '#94E5D8',
          300: '#69DAC9',
          400: '#48D1B4',
          500: '#1ABC9C',
          600: '#16977D',
          700: '#11745F',
          800: '#0C5444',
          900: '#07382D',
          DEFAULT: '#1ABC9C',
        },
        accent: {
          500: '#F39C12',
          DEFAULT: '#F39C12',
        },
        light: {
          bg: '#FFFFFF',
          surface: '#F8F9FA',
          card: '#FFFFFF',
          border: '#E5E7EB',
          'border-light': '#F3F4F6',
        },
        dark: {
          bg: '#0C1422',
          surface: '#0A0F1A',
          card: '#162132',
          border: '#253247',
          'border-light': '#1E2A3E',
        },
        text: {
          light: {
            primary: '#1A2A3A',
            secondary: '#5D7182',
            muted: '#8A9BB0',
            inverse: '#FFFFFF',
          },
          dark: {
            primary: '#EAEDF2',
            secondary: '#8A9BB0',
            muted: '#5D7182',
            inverse: '#0C1422',
          },
        },
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB',
      },
      
      fontFamily: {
        poppins: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      
      boxShadow: {
        'sm': '0 2px 8px rgba(15, 43, 77, 0.04)',
        'md': '0 8px 24px rgba(15, 43, 77, 0.08)',
        'lg': '0 16px 40px rgba(15, 43, 77, 0.12)',
        'glow': '0 0 20px rgba(26, 188, 156, 0.3)',
        'dark-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'dark-md': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'dark-glow': '0 0 20px rgba(28, 230, 201, 0.2)',
      },
      
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 2s ease-in-out infinite',
      },
      
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ripple: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
      },
      
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0F2B4D 0%, #1A3D66 50%, #16977D 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #0A1526 0%, #14233C 50%, #0FBFA4 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.98))',
        'glass-gradient-dark': 'linear-gradient(135deg, rgba(22,33,50,0.95), rgba(22,33,50,0.98))',
      },
      
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
/** @type {import('tailwindcss').Config} */
import { siteConfig } from './src/config'; // Adjust path if your config is elsewhere

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Linking your siteConfig theme colors
      colors: {
        'brand': {
          'bg': siteConfig.theme.background,
          'accent': siteConfig.theme.accent,
          'card': siteConfig.theme.cardBg,
          'primary': siteConfig.theme.primary,
        },
        'luxury': {
          50: '#faf9f7', 100: '#f0ede8', 200: '#e2dbd1', 300: '#cdc1b2',
          400: '#b6a48e', 500: '#9e8870', 600: '#8b7359', 700: '#745e48',
          800: '#5f4d3b', 900: '#4f3f31',
        },
      },
      
      // 2. Automated Font Scaling from siteConfig
      fontFamily: {
        'sans': [siteConfig.theme.fontSans.replace(/'/g, ""), 'system-ui', 'sans-serif'],
        'serif': [siteConfig.theme.fontSerif.replace(/'/g, ""), 'serif'],
      },

      // 3. Keep your existing smooth animations
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
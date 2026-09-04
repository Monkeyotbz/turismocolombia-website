/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Azul Colombia — color de énfasis (tomado del logo: #0040D0)
        azul: {
          DEFAULT: '#0A3FD1',
          hover: '#082FA6',
          deep: '#0C2260',
          tint: '#E9EEFC',
        },
        // Amarillo/rojo del logo, en versión "domada" para UI
        oro: {
          DEFAULT: '#E0A32E',
          bright: '#F2C400', // amarillo del logo
          soft: '#F6ECD3',
        },
        carmin: {
          DEFAULT: '#B23A2E',
          bright: '#E11B1B', // rojo del logo
        },
        cream: '#FBF9F4',
        ink: '#1C1A17',
        muted: '#6E675B',
        line: '#E7E0D4',
        // Señales positivas: "cancelación gratis", "mejor precio", disponibilidad
        success: {
          DEFAULT: '#0B8A3E',
          tint: '#E4F3E9',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Alias temporal: títulos que aún usan `font-serif` renderizan en Manrope.
        // Migrar esas clases a `font-sans` y borrar esta línea.
        serif: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        overline: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.16em', fontWeight: '700' }],
        caption: ['0.8125rem', { lineHeight: '1.15rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.4rem' }],
        body: ['0.9375rem', { lineHeight: '1.6rem' }],
        h3: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em', fontWeight: '700' }],
        h2: ['1.875rem', { lineHeight: '2.2rem', letterSpacing: '-0.015em', fontWeight: '700' }],
        h1: ['2.5rem', { lineHeight: '2.7rem', letterSpacing: '-0.02em', fontWeight: '800' }],
        display: ['3.5rem', { lineHeight: '3.6rem', letterSpacing: '-0.025em', fontWeight: '800' }],
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,24,17,.04), 0 10px 26px -14px rgba(20,24,17,.20)',
        hover: '0 2px 6px rgba(20,24,17,.06), 0 20px 44px -18px rgba(20,24,17,.30)',
        nav: '0 1px 0 rgba(20,24,17,.06)',
        pop: '0 26px 64px -22px rgba(20,24,17,.36)',
      },
      maxWidth: {
        site: '1280px',
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

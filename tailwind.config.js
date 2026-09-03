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
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '18px',
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

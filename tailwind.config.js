/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          terracotta: '#E05A47',
          terracottaDark: '#C84632',
          nilgiri: '#1E3F20',
          nilgiriLight: '#2D5A27',
          gold: '#D4AF37',
          goldHover: '#B8952B',
          ocean: '#0F1E2E',
          oceanLight: '#1E354D',
          parchment: '#FAF7F2',
          cardBg: '#FFFFFF',
          sand: '#F3EDE2',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 30, 46, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(15, 30, 46, 0.15)',
        'editorial': '0 20px 40px -15px rgba(224, 90, 71, 0.15)',
      }
    },
  },
  plugins: [],
}

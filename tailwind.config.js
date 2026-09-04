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
          // Lush Nilgiri Emerald Green Theme
          terracotta: '#1E4D2B',       // Primary Nilgiri Emerald Green
          terracottaDark: '#0F381D',   // Deep Forest Green
          nilgiri: '#1E4D2B',
          nilgiriLight: '#2E7D32',
          gold: '#D4AF37',             // Royal Temple Gold Accent
          goldHover: '#B8952B',
          ocean: '#0A2312',            // Deep Forest Night
          oceanLight: '#13381E',
          parchment: '#F0F7F1',        // Soft Mint Parchment
          cardBg: '#FFFFFF',
          sand: '#E2EFE3',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 40, 20, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(15, 40, 20, 0.16)',
        'editorial': '0 20px 40px -15px rgba(30, 77, 43, 0.18)',
      }
    },
  },
  plugins: [],
}

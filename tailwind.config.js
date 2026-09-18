/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        krishi: {
          dark: '#06130D',
          darker: '#040E0A',
          card: '#0A2016',
          cardHover: '#0E2A1E',
          cardBorder: '#163E2D',
          emerald: '#10B981',
          lime: '#22C55E',
          accent: '#06B6D4',
          gold: '#F59E0B',
          muted: '#94A3B8',
          textMuted: '#6EE7B7'
        }
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 75%)',
        'forest-gradient': 'linear-gradient(180deg, #071911 0%, #040E0A 100%)',
      }
    },
  },
  plugins: [],
}

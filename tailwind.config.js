module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gray-750': '#2d3748',
        'gray-850': '#1a202c',
      },
      animation: {
        'fade': 'fade 0.3s ease-in-out',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.08)',
        'card-dark': '0 2px 10px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};

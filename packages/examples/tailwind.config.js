/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../sora-two-api/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070A14',
          900: '#0B1020',
          800: '#111A33',
        },
        mint: {
          500: '#29F6C9',
          600: '#12D9AF',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(41,246,201,.25), 0 12px 45px rgba(7,10,20,.55)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-40%)' },
          '100%': { transform: 'translateX(140%)' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        shimmer: 'shimmer 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

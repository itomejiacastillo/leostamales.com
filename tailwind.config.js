/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg) translateX(-1px)' },
          '50%': { transform: 'rotate(2deg) translateX(1px)' },
        },
      },
      animation: {
        sway: 'sway 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}


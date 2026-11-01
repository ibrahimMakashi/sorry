/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          paper: '#F4EBDD',
          ivory: '#FBF7EF',
          blush: '#F0D9D8',
          dusty: '#C58B94',
          rose: '#A95366',
          wine: '#733E4B',
          espresso: '#42322F',
          ink: '#493D38',
          champagne: '#D6BE97',
          parchment: '#EDE0CC',
          tape: 'rgba(235, 222, 198, 0.75)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Lora"', '"DM Sans"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'paper': '0 4px 20px -2px rgba(66, 50, 47, 0.12), 0 2px 6px -1px rgba(66, 50, 47, 0.08)',
        'paper-lg': '0 12px 35px -4px rgba(66, 50, 47, 0.18), 0 4px 12px -2px rgba(66, 50, 47, 0.10)',
        'paper-lift': '0 20px 45px -8px rgba(66, 50, 47, 0.22), 0 8px 18px -4px rgba(66, 50, 47, 0.12)',
        'polaroid': '0 10px 25px rgba(66, 50, 47, 0.15), 0 2px 6px rgba(66, 50, 47, 0.08)',
        'wax': '0 4px 12px rgba(115, 62, 75, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle, transparent 60%, rgba(66, 50, 47, 0.15) 100%)',
      }
    },
  },
  plugins: [],
}

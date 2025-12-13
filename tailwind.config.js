/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'futuristic-black': '#0a0a0a',
        'futuristic-dark': '#1a1a1a',
        'metallic-silver': '#c0c0c0',
        'glow-white': '#ffffff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(192, 192, 192, 0.3)',
        'glow-strong': '0 0 30px rgba(192, 192, 192, 0.5)',
      },
    },
  },
  plugins: [],
}

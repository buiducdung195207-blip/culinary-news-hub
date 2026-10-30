/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        saffron: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        linen: {
          50: '#FDFCF9',
          100: '#FAF8F5',
          200: '#F3EFEA',
          300: '#E8E2D9',
          400: '#D6CEC5',
          500: '#B0A597',
          800: '#3D342A',
          900: '#26211C',
        },
        espresso: {
          800: '#231D18',
          850: '#1C1713',
          900: '#14110E',
          950: '#0C0A08',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
};

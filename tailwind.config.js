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
        sage: {
          50: '#F5F7F2',
          100: '#E9EFE3',
          200: '#D5DFC9',
          300: '#BCCBAA',
          400: '#9FB388',
          500: '#7F9864',
          600: '#657C4E',
          700: '#4F613C',
          800: '#3D4C2F',
          900: '#2A3420',
        },
        coral: {
          50: '#FDF4F2',
          100: '#FAE6E2',
          200: '#F5CCC4',
          300: '#EDABA0',
          400: '#E28071',
          500: '#D75B46',
          600: '#BE4431',
          700: '#9C3322',
        },
        cream: {
          50: '#FCFBF7',
          100: '#FAF8F2',
          200: '#F3EFE4',
          300: '#E8E1CE',
          400: '#D7CEB5',
        },
        forest: {
          800: '#262F26',
          850: '#1F271F',
          900: '#191E19',
          950: '#121612',
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
};

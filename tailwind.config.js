/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF7',
          100: '#FAF7ED',
          200: '#F3EEDC',
          300: '#E8DFC1',
        },
        rosewood: {
          50: '#FFF5F5',
          100: '#FFE3E3',
          500: '#E0627C',
          600: '#C84360',
          700: '#A42B45',
        },
        terracotta: {
          500: '#DE6B48',
          600: '#C25130',
        },
        sage: {
          100: '#E5EDE7',
          500: '#6E9075',
          600: '#54735B',
        },
        januar: {
          light: '#EBF4FF',
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
          badge: '#DBEAFE',
          text: '#1E40AF',
        },
        adel: {
          light: '#FDF2F8',
          DEFAULT: '#EC4899',
          dark: '#BE185D',
          badge: '#FCE7F3',
          text: '#9D174D',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(44, 30, 20, 0.06), 0 2px 6px -1px rgba(44, 30, 20, 0.04)',
        'float': '0 12px 32px -4px rgba(44, 30, 20, 0.12), 0 4px 12px -2px rgba(44, 30, 20, 0.06)',
      }
    },
  },
  plugins: [],
}

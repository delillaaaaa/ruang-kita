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
          50: '#FDF6F7',
          100: '#FAECEF',
          200: '#F5D9DF',
          300: '#EBB3BE',
          400: '#DC8193',
          500: '#C55169',
          600: '#A6334A',
          700: '#8A1F33', // Dakingo deep rich wine red
          800: '#731627', // Dakingo primary button / hero gradient
          900: '#580F1D', // Dakingo hero dark gradient
          950: '#380711',
        },
        cream: {
          50: '#FBF5EE', // Dakingo warm off-white / beige background
          100: '#F5EAE0',
          200: '#EBD8C8',
          300: '#DEC1AB',
          400: '#CCA388',
        },
        rosewood: {
          50: '#FDF6F7',
          100: '#FAECEF',
          500: '#C55169',
          600: '#A6334A',
          700: '#8A1F33',
        },
        terracotta: {
          500: '#C55169',
          600: '#A6334A',
        },
        sage: {
          100: '#E8EFE9',
          500: '#5A8263',
          600: '#43684B',
        },
        januar: {
          light: '#EEF4FF',
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
        'soft': '0 4px 20px -2px rgba(90, 20, 30, 0.05), 0 2px 6px -1px rgba(90, 20, 30, 0.03)',
        'float': '0 12px 32px -4px rgba(90, 20, 30, 0.12), 0 4px 12px -2px rgba(90, 20, 30, 0.05)',
        'dakingo': '0 10px 30px -5px rgba(115, 22, 39, 0.15)',
      },
      keyframes: {
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-right': 'slideInFromLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}

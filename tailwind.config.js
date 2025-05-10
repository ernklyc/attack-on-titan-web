/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aot-red': '#dc2626',
        'aot-dark': '#0f172a',
        'aot-darker': '#020617',
        'aot-gray': '#1e293b',
        'aot-light': '#f8fafc',
        'aot-accent': '#dc2626',
        'aot-accent-dark': '#b91c1c',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s infinite ease-in-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      listStyleType: {
        'circle': 'circle',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      dropShadow: {
        'glow': '0 0 8px rgba(255, 70, 85, 0.7)',
        'glow-lg': '0 0 10px rgba(255, 70, 85, 0.8)',
        'glow-white': '0 0 8px rgba(255, 255, 255, 0.8)',
        'glow-blue': '0 0 8px rgba(59, 130, 246, 0.8)',
      },
    },
  },
  plugins: [],
}

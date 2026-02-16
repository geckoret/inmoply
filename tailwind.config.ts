import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        magenta: {
          50: '#fef1f9',
          100: '#fde5f4',
          200: '#fccbea',
          300: '#f9a0da',
          400: '#f568c3',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a01ab8',
          800: '#851a96',
          900: '#6f177a',
        },
        purple: {
          50: '#f8f5fc',
          100: '#f1e5f9',
          200: '#e5cef5',
          300: '#d4aeed',
          400: '#b884e0',
          500: '#9333ea',
          600: '#7e22ce',
          700: '#6b21a8',
          800: '#581c87',
          900: '#48166d',
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(217, 70, 239, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(217, 70, 239, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

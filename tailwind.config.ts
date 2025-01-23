import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        heading: ['Public Sans', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        orange: 'var(--color-orange)',
        required: 'var(--color-required)',
        body: 'var(--body-color)',
        'body-secondary': 'var(--body-secondary-color)',
        heading: 'var(--heading-color)',
      },
      boxShadow: {
        dashboard: '0 .1875rem .75rem 0 rgba(47, 43, 61, .14)',
      },
      animation: {
        'slow-ping': 'ping 1.5s linear infinite',
      },
      height: {
        'main-content': 'calc(100vh - 100px)',
      },
      keyframes: {
        cloud: {
          '0%': { left: '0', transform: 'translateX(-100%)' },
          '100%': { left: '100%', transform: 'translateX(100%)' },
        },
        hand: {
          '25%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(-0deg)' },
          '75%': { transform: 'rotate(-5deg)' },
        },
      },
    },
  },
  plugins: [
    // Plugin for scrollbar styles
    function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1', // Track color
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888', // Thumb color
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555', // Thumb hover color
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;

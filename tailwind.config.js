
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '600': '600px', 
      },
    },
  },
  fontFamily: {
    'sans': [
      'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'
    ],
    'serif': ['Merriweather','Georgia','Cambria','Times New Roman','Times','serif'],
    'mono': [' ui-monospace', ' SFMono-Regular', 'Menlo','Monaco', '"Liberation Mono"', '"Courier New"','monospace'],
    // 'mono': ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"','monospace'],
    'poppins': ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
  },
  plugins: [require('tailwind-scrollbar')],
};


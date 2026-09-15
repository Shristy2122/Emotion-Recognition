/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#060B18',
        'secondary-bg': '#0A1120',
        'primary-blue': '#4F8CFF',
        'bright-blue': '#6EA8FF',
        cyan: '#49D6FF',
        'primary-text': '#F4F7FF',
        'secondary-text': '#8C9AB5',
        emotion: {
          happy: '#FCD34D',
          sad: '#60A5FA',
          angry: '#F87171',
          fear: '#C084FC',
          surprise: '#FB923C',
          disgust: '#4ADE80',
          neutral: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(79, 140, 255, 0.18)',
        'glow-md': '0 0 25px rgba(79, 140, 255, 0.28)',
        'glow-cyan': '0 0 25px rgba(73, 214, 255, 0.25)',
      },
    },
  },
  plugins: [],
};

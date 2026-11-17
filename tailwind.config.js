/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        obs: {
          950: '#06090e',
          900: '#0b101a',
          850: '#111726',
          800: '#182032',
          750: '#1e293f',
          700: '#273552',
          600: '#3c4e75',
        },
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        smog: {
          good: '#10b981',
          moderate: '#f59e0b',
          unhealthy: '#f97316',
          severe: '#ef4444',
          hazardous: '#881337',
        }
      }
    },
  },
  plugins: [],
}

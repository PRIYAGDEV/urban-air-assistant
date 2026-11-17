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
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        primary: '#1E40AF',
        secondary: '#3B82F6',
        accent: '#D97706',
        background: '#F8FAFC',
        card: '#FFFFFF',
        foreground: '#1E3A8A',
        muted: '#E9EEF6',
        'muted-foreground': '#475569',
        border: '#DBEAFE',
        destructive: '#DC2626',
        aqi: {
          good: '#16A34A',
          moderate: '#CA8A04',
          poor: '#EA580C',
          severe: '#DC2626',
          hazardous: '#7C3AED',
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: '#080808',
        elevated: '#080808',
        ink: {
          DEFAULT: '#F2F2F2',
          muted: '#858582',
        },
        line: '#232323',
        accent: '#FFFFFF',
        link: '#B5B5AF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1280px',
      },
      transitionTimingFunction: {
        token: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        token: '220ms',
      },
    },
  },
  plugins: [],
}

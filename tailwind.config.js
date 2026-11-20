export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pin: {
          red: '#E60023',
          redHover: '#B6001B',
          bg: '#FAFAFA',
          card: '#FFFFFF',
          dark: '#111111',
          muted: '#767676',
          lightGrey: '#E9E9E9',
          badge: '#F0F0F0',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'pin': '0 1px 20px 0 rgba(0,0,0,0.08)',
        'pin-hover': '0 8px 30px rgba(0,0,0,0.12)',
        'floating': '0 12px 36px rgba(0,0,0,0.16)'
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px'
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
  ],
  theme: {
    extend: {
      colors: {
        kambista: {
          // Brand identity and interface colors
          navy: '#060F26',
          charcoal: '#192232',
          deepBlue: '#07173E',
          mint: '#00E3C2',
          mintDisabled: '#5BE2C4',
          mintLight: '#B2E7DF',
          blueInfo: '#082774',
          blueLight: '#D2E9FF',
          warningGold: '#EFC546',
          errorRed: '#EB5757',
          rewardBg: '#F9F0E9',
          rewardText: '#7B3F0A',
          dark: '#0a192f',
          lightBg: '#f4f7f9',
          border: '#e2e8f0',
          appBg: '#F6F6F9',
        },
        neutral: {
          // Grayscale UI palette
          white: '#FFFFFF',
          black: '#000000',
          darkText: '#686868',
          grayPlaceholder: '#A7A7A7',
          grayBorder: '#E0E0E0',
          mutedText: '#666666',
          grayLight: '#CCCCCC',
          grayBg: '#EEEDED',
          grayChangeMoney: '#66666680',
        }
      },
      
      // Linear gradients
      backgroundImage: {
        'gradient-kambista': 'linear-gradient(90deg, #B28FD9 20%, #F0979E 52%, #FCC48C 100%)',
        'gradient-auth': 'linear-gradient(90deg, #182233 26%, #1D2744 43%, #293571 76%, #344197 100%)',
      },

      // Typography system
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold:'800',
        superbold:'900',
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['28px', '34px'],
        '4xl': ['30px', '36px'],
      },

      // UI Border radius tokens
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },

      // Layout constraints and responsive design settings
      maxWidth: {
        'desktop-container': '1300px',
      },
      spacing: {
        'mobile-padding': '24px',
      },
    },
  },
  plugins: [],
}
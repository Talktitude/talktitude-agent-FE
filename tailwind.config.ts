import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        mainColor: '#5573E2',
        textBlack: '#3B3B3B',
        textGray: '#5D5D5D',
        textLightGray: '#9A9A9A',
        textRed: '#F06969',
        lineGray: '#D9D9D9',
        white: '#FFFFFF',
        bgLightBlue: '#EEF2F9',
        bgLightGray: '#E1E1E1CC',
      },
      fontSize: {
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.375rem', // 22px
      },
      boxShadow: {
        inputShadow: 'inset 0px 0px 10px 0px rgba(85, 116, 226, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;

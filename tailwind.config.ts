import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        mainColor: '#5573E2',
        textBlack: '#3B3B3B',
        textLightGrey: '#9A9A9A',
        lineGrey: '#D9D9D9',
        white: '#FFFFFF',
        bgLightBlue: '#EEF2F9',
        bgLightGrey: '#E1E1E1CC',
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

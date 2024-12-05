import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem'
      }
    },
    screens: {
      xs: '480px',
   },
   fontSize: {
      xs: '13px',
   },
   fontFamily: {
    secondary: ['Manrope', 'sans-serif'],
    cairo: ['Cairo', 'sans-serif'], // Add Cairo font here
    arabic:['PrPro', 'sans-serif']
 },
 colors:{
  header:{
    gold: 'hsl(var(--gold))'
  }
 },
   fontWeight: {
    '200': '200',
    '300': '300',
    '400': '400',
    '500': '500',
    '600': '600',
    '700': '700',
    '800': '800',
 },
 spacing: {
    '0.25r': '0.25rem', // 4px
    '0.5r': '0.5rem', // 8px
    '0.75r': '0.75rem', // 12px
    '1r': '1rem', // 16px
    '1.25r': '1.25rem', // 20px
    '1.5r': '1.5rem', // 24px
    '2r': '2rem', // 32px
    '2.25r': '2.25rem', // 36px
    '2.5r': '2.5rem', // 40px
    '3r': '3rem', // 48px
    '3.5r': '3.5rem', // 56px
    '4r': '4rem', // 64px
    '4.5r': '4.5rem', // 72px
    '5r': '5rem', // 80px
    '6r': '6rem', // 96px
    '7r': '7rem', // 112px
    '8r': '8rem', // 128px
    '9r': '9rem', // 144px
    '10r': '10rem', // 160px
 },
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/container-queries')],
}
export default config

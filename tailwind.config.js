/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#813481",
        dark: "#223342",
      },
      fontFamily: {
        unbounded: ["Unbounded", "sans-serif"],
        akrobat: ["Akrobat", "sans-serif"],
      },
      fontSize: {
        'fluid-h2':           ['clamp(24px,calc(24px + 8*(100vw - 375px)/1065),32px)',   {lineHeight:'1.19'}],
        'fluid-body':         ['clamp(16px,calc(16px + 2*(100vw - 375px)/1065),18px)',   {lineHeight:'1.375'}],
        'fluid-price':        ['clamp(22px,calc(22px + 4*(100vw - 375px)/1065),26px)',   {lineHeight:'1.23'}],
        'fluid-footer-phone': ['clamp(24px,calc(24px + 16*(100vw - 375px)/1065),40px)',  {lineHeight:'1.2'}],
        'fluid-footer-email': ['clamp(18px,calc(18px + 6*(100vw - 375px)/1065),24px)',   {lineHeight:'1.33'}],
        'fluid-logo':         ['clamp(32px,calc(32px + 8*(100vw - 375px)/1065),40px)',   {lineHeight:'1'}],
      },
      spacing: {
        'fluid-section':    'clamp(80px,calc(80px + 80*(100vw - 375px)/1065),160px)',
        'fluid-section-sm': 'clamp(40px,calc(40px + 40*(100vw - 375px)/1065),80px)',
        'fluid-gap':        'clamp(32px,calc(32px + 24*(100vw - 375px)/1065),56px)',
        'fluid-gap-card':   'clamp(24px,calc(24px + 16*(100vw - 375px)/1065),40px)',
        'fluid-p':          'clamp(16px,calc(16px + 8*(100vw - 375px)/1065),24px)',
        'fluid-img-card':   'clamp(200px,calc(200px + 80*(100vw - 375px)/1065),280px)',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './feature/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'login-border': '#E2E8F0',
        'border-agent': '#E2E8F0',
        border: '#E2E8F0',
        'calender-text': '#0F172A',
        'calender-inner-text': '#64748B',
        'primary-50': '#EEF2FF',
        'blue-login': '#4F46E5',
        'week-view': '#F8FAFC',
        'week-view-left': '#F8FAFC',
        'black-800': '#0F172A',
      },
      boxShadow: {
        calendar: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)',
        popup:
          '0 25px 50px -12px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.08)',
        nav: '0 1px 3px rgba(0,0,0,0.08), 0 1px 8px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};

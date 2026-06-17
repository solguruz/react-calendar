const base = require('./tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    './feature/**/*.{js,ts,jsx,tsx}',
    './assets/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
};

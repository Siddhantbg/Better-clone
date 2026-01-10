export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': { max: '514px' }, // Targets anything BELOW 515px
      },
    },
  },
  plugins: [],
};

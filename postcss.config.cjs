// Renamed from ./postcss.config.js to ./postcss.config.cjs to note that this is
// a common js module...
// source: https://stackoverflow.com/a/75256211
module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

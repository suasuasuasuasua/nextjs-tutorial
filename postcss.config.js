// Renamed from ./postcss.config.js to ./postcss.config.cjs to note that this is
// a common js module...
// source: https://stackoverflow.com/a/75256211
export const plugins = {
  tailwindcss: {},
  autoprefixer: {},
};
export const ignorePatterns = ["*.config.js"];

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

// eslint
// pnpm create @eslint/config@latest
//
// typescript-eslint
// pnpm add --save-dev eslint @eslint/js @types/eslint__js typescript typescript-eslint

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    settings: {
      // Specify the react version or else eslint explodes
      // just say detect it for us...
      react: {
        version: "detect",
      },
    },
  },
  {
    // TODO: unused vars doesn't work for some reason!!!
    // just using // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rules: {
      "no-duplicate-imports": ["error", { includeExports: true }],
    },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];

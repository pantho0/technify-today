import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "prefer-const": "error",
      "no-unused-expressions": "error",
      "no-console": "warn",
    },
  },
  {
    ignores: ["**/.env/", "**/dist/", "**/node_modules/"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

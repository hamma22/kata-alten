import globals from "globals";
import pluginReact from "eslint-plugin-react";
import eslintRecommended from "@eslint/js"; // needed for eslint:recommended
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...eslintRecommended.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "no-undef": "error", // <--- this will warn when `Grid` isn't imported
      "react/react-in-jsx-scope": "off", // needed only for React 16
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);

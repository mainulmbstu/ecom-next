import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import isDev from "isdev";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = isDev
  ? [
      ...compat.config({
        extends: ["next", "prettier"],
        // extends: ["next/core-web-vitals", "prettier"],
        rules: {
          ...js.configs.recommended.rules,
          // "react/no-unescaped-entities": "off",
          // "@typescript-eslint/no-unused-vars": "off",
          // "@next/next/no-page-custom-font": "off",
        },
      }),
    ]
  : [
      ...compat.config({
        extends: ["next", "prettier"],
      }),
    ];

export default eslintConfig;

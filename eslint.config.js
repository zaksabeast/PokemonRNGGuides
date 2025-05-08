import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "src/graphql/__generated__", "rng_tools"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "no-relative-import-paths": noRelativeImportPaths,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "id-length": [
        "error",
        {
          min: 2,
          exceptions: [
            "i", // index
            "j", // index
            "z", // zod
            "_", // placeholder
            "t", // translation
          ],
        },
      ],
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { allowSameFolder: true, rootDir: "src", prefix: "~", allowedDepth: 1 },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      curly: ["error", "all"],
      "no-else-return": ["error", { allowElseIf: false }],
      "no-duplicate-imports": "error",
      "no-console": "error",
      "prefer-arrow-callback": ["error"],
      "func-style": ["error", "expression"],
      "no-restricted-syntax": [
        "error",
        {
          selector: "VariableDeclarator > FunctionExpression",
          message: "Use arrow functions instead of function expressions.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "rng_tools",
              message: 'Use `import { rngTools } from "~/rngTools";`',
            },
            {
              name: "wouter",
              importNames: ["useLocation"],
              message:
                'Use `import { useActiveRoute } from "~/hooks/useActiveRoute";`',
            },
            {
              name: "antd",
              importNames: ["theme"],
              message: 'Use `import { useTheme } from "@emotion/react";`',
            },
            {
              name: "antd",
              importNames: ["Button"],
              message: 'Use `import { Button } from "~/components";`',
            },
            {
              name: "formik",
              importNames: ["Form"],
              message: 'Use `import { Form } from "~/components";`',
            },
            {
              name: "antd",
              importNames: ["Alert"],
              message: 'Use `import { Alert } from "~/components";`',
            },
            {
              name: "@amplitude/analytics-browser",
              message: "Import from `~/analytics`",
            },
          ],
        },
      ],
    },
  },
);

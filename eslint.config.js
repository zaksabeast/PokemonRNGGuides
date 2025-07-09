import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import tseslint from "typescript-eslint";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getLanguageOptions = (tsConfig) => ({
  ecmaVersion: 2020,
  globals: globals.browser,
  parser: tseslint.parser,
  parserOptions: {
    project: tsConfig,
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
});

const baseConfig = {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  plugins: {
    react,
    tseslint,
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
    "react/jsx-key": "error",
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
            name: "wouter",
            importNames: ["Link"],
            message: 'Use `import { Link } from "~/components";`',
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
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "ignore" },
    ],
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: true,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],
  },
};

export default tseslint.config(
  { ignores: ["dist", "src/graphql/__generated__", "rng_tools"] },
  {
    ...baseConfig,
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: getLanguageOptions("./tsconfig.app.json"),
  },
  {
    ...baseConfig,
    files: ["vite.config.ts"],
    languageOptions: getLanguageOptions("./tsconfig.node.json"),
  },
);

import { createRequire } from "node:module";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

const nextRequire = createRequire(import.meta.resolve("eslint-config-next"));
const nextPlugin = nextRequire("@next/eslint-plugin-next");
const reactHooks = nextRequire("eslint-plugin-react-hooks");
const jsxA11y = nextRequire("eslint-plugin-jsx-a11y");

export default defineConfig([
  globalIgnores([".next/**", ".next-dev/**", ".open-next/**", ".wrangler/**", "out/**", "build/**", "next-env.d.ts", "data/projects/**/*.mdx", "recovery key/**"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { plugins: { "@next/next": nextPlugin, "react-hooks": reactHooks, "jsx-a11y": jsxA11y } },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "no-undef": "off"
    }
  }
]);

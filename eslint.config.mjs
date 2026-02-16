import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".vercel/**",
      "node_modules/**",
      "dist/**",
    ],
  },
  ...nextVitals,
  ...nextTs,
]);

export default eslintConfig;

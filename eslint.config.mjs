import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  { settings: { next: { rootDir: "apps/docs/" } } },
  globalIgnores(["**/.next/**", "**/public/r/**", "**/next-env.d.ts", ".consumer/**", "test-results/**", "playwright-report/**"]),
])

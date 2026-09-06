import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: { trace: "retain-on-failure" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: [
    { command: "pnpm --filter @eva-cn/docs exec next start -p 3012", url: "http://localhost:3012", reuseExistingServer: !process.env.CI, timeout: 60000 },
    { command: "pnpm --dir .consumer exec next start -p 3014", url: "http://localhost:3014", reuseExistingServer: !process.env.CI, timeout: 60000 },
  ],
})

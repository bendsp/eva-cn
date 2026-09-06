import { test, expect } from "@playwright/test"

const url = "http://localhost:3014"
test.beforeEach(async ({ page }) => { await page.goto(url); await page.evaluate(() => document.fonts.ready) })

test("non-fit scaling, normal attributes, style and forwarded ref", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Consumer heading" })).toHaveCSS("font-size", "24px")
  await page.getByRole("button", { name: "Read ref" }).click()
  await expect(page.locator("output")).toHaveText("H1")
  await page.getByRole("button", { name: "Unmount ref", exact: true }).click()
  await expect(page.locator("output")).toHaveText("cleaned")
  await expect(page.locator("#scaled")).toHaveCSS("transform", "matrix(0.5, 0, 0, 1, 0, 0)")
  await expect(page.locator("#expanded")).toHaveCSS("transform", "matrix(1.2, 0, 0, 1, 0, 0)")
})

test("badge fits atomically, follows text, clears and recovers from hidden layout", async ({ page }) => {
  const badge = page.getByTestId("badge")
  const width = () => badge.evaluate(el => el.getBoundingClientRect().width)
  await expect.poll(width).toBeLessThanOrEqual(164)
  await page.getByRole("button", { name: "Resize", exact: true }).click()
  await expect.poll(width).toBeGreaterThan(180)
  const original = await width()
  await page.getByRole("textbox", { name: "Secondary", exact: true }).fill("CONTAMINATION DETECTED")
  await expect.poll(width).toBeGreaterThan(original + 20)
  await page.getByRole("textbox", { name: "Secondary", exact: true }).fill("")
  await page.getByRole("textbox", { name: "Text", exact: true }).fill("")
  await expect.poll(width).toBeLessThan(50)
  await expect.poll(() => page.locator("#fitted").evaluate(el => el.getBoundingClientRect().width)).toBe(0)
  await page.getByRole("button", { name: "Toggle hidden" }).click()
  await page.getByRole("textbox", { name: "Text", exact: true }).fill("EVANGELION")
  await page.getByRole("button", { name: "Toggle hidden" }).click()
  await expect.poll(width).toBeGreaterThan(100)
  await expect(badge).toBeVisible()
})

test("fitted text remains within its parent on resize", async ({ page }) => {
  await page.getByRole("textbox", { name: "Text", exact: true }).fill("ABSOLUTE TERROR FIELD DETECTED")
  await expect.poll(() => page.locator("#fitted").evaluate(el => el.getBoundingClientRect().width)).toBeLessThanOrEqual(164)
  await page.getByRole("button", { name: "Change element", exact: true }).click()
  await page.getByRole("button", { name: "Resize", exact: true }).click()
  await expect.poll(() => page.locator("#fitted").evaluate(el => el.getBoundingClientRect().width)).toBeGreaterThan(200)
})

test("server-rendered badges and navigation remain visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(url)
  await expect(page.getByTestId("badge")).toContainText("WARNING")
  await expect(page.getByTestId("badge").getByText("WARNING", { exact: true })).toBeVisible()
  await expect(page.getByTestId("japanese").getByText("第3新東京市", { exact: true })).toBeVisible()
  await page.goto("http://localhost:3012")
  await expect(page.getByRole("link", { name: /GITHUB/ })).toBeVisible()
  await context.close()
})

test("geometry bounds, accessible readout and reduced motion", async ({ page }) => {
  await expect(page.getByRole("img", { name: "09:13.27" })).toBeVisible()
  const data = JSON.parse(await page.getByTestId("geometry").innerText())
  expect(data.segment.segmentThickness).toBeLessThanOrEqual(32 * 0.3)
  expect(data.segment.segmentGap).toBeLessThanOrEqual(data.segment.maxSegmentGap)
  expect(data.stripe.period).toBeGreaterThan(0)
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect.poll(() => page.getByTestId("stripe").evaluate(el => getComputedStyle(el, "::before").animationName)).toBe("none")
})

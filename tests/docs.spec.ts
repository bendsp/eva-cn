import { test, expect } from "@playwright/test"

const origin = "http://localhost:3012"
for (const item of ["eva-text", "eva-badge", "eva-segment-display", "eva-stripe"]) {
  test(`${item} has production controls, copyable JSX and no mobile overflow`, async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", error => errors.push(error.message))
    await page.goto(`${origin}/components/${item}`)
    await expect(page.getByRole("complementary", { name: "Component controls" })).toBeVisible()
    await expect(page.locator(".dialkit-root")).toBeVisible()
    await expect(page.getByRole("button", { name: "Copy JSX", exact: true })).toBeVisible()
    await expect(page.locator(".playground pre")).toContainText("@/components/ui/")
    await page.getByRole("button", { name: "Light", exact: true }).click()
    await expect(page.getByTestId("preview")).toHaveClass(/eva-theme-light/)
    await page.getByRole("button", { name: "Dark", exact: true }).click()
    await expect(page.getByTestId("preview")).toHaveClass(/eva-theme-dark/)
    await page.setViewportSize({ width: 390, height: 844 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1)
    expect(errors).toEqual([])
  })
}

test("theme preview matches the independently installed theme in both modes", async ({ page, context }) => {
  const consumer = await context.newPage()
  await consumer.goto("http://localhost:3014")
  await page.goto(`${origin}/components/eva-theme`)
  const preview = page.getByTestId("theme-preview")
  const colors = (element: Element) => {
    const css = getComputedStyle(element)
    return [css.backgroundColor, css.color, ...["primary", "secondary", "accent", "ring", "eva-amber"].map(token => css.getPropertyValue(`--${token}`).trim())]
  }
  expect(await preview.evaluate(colors)).toEqual(await consumer.locator("main").evaluate(colors))
  await page.getByRole("button", { name: "Light", exact: true }).click()
  await consumer.getByRole("button", { name: "Theme", exact: true }).click()
  await expect.poll(() => preview.evaluate(colors)).toEqual(await consumer.locator("main").evaluate(colors))
  await consumer.close()
})

test("DialKit text edits and reset update the preview and JSX", async ({ page }) => {
  await page.goto(`${origin}/components/eva-badge`)
  const text = page.getByRole("textbox", { name: "Text", exact: true })
  await text.fill('PATTERN "BLUE"')
  await expect(page.getByTestId("preview")).toContainText('PATTERN "BLUE"')
  await expect(page.locator(".playground pre")).toContainText('PATTERN \\"BLUE\\"')
  await page.getByRole("button", { name: "Reset", exact: true }).click()
  await expect(text).toHaveValue("WARNING")
  await expect(page.getByTestId("preview")).toContainText("WARNING")
  await page.getByRole("button", { name: "Copy JSX", exact: true }).click()
  await expect(page.getByRole("status").first()).toHaveText(/Copied|Select and copy/)
})

test("client navigation replaces the DialKit panel", async ({ page }) => {
  await page.goto(origin)
  await page.getByRole("link", { name: /ITEM-03 BADGE/ }).click()
  await expect(page.getByRole("textbox", { name: "Text", exact: true })).toHaveValue("WARNING")
  await page.getByRole("link", { name: "← All components" }).click()
  await page.getByRole("link", { name: /ITEM-04 SEGMENT DISPLAY/ }).click()
  await expect(page.getByRole("textbox", { name: "Value", exact: true })).toHaveValue("09:13.27")
  await expect(page.getByRole("textbox", { name: "Text", exact: true })).toHaveCount(0)
})

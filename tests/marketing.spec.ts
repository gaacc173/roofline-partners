import { expect, test } from "playwright/test";

test("package selection carries the requested package into qualification", async ({ page }) => {
  await page.goto("/packages");
  await page
    .getByRole("link", { name: /request growth/i })
    .first()
    .click();

  await expect(page).toHaveURL(/\/get-started\?package=growth-20/);
  await expect(page.getByRole("heading", { name: /growth/i }).first()).toBeVisible();
  await expect(page.locator('input[name="selectedPackage"]')).toHaveValue("growth-20");
  await expect(page.getByRole("button", { name: /submit|request/i })).toBeVisible();
});

test("public SEO routes and health endpoint are available", async ({ page, request }) => {
  const health = await request.get("/api/health");
  expect(health.ok()).toBeTruthy();
  expect(await health.json()).toEqual({ status: "ok" });

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toMatch(/sitemap\.xml/);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toMatch(/\/contact/);

  await page.goto("/");
  await expect(page.getByRole("heading", { name: /more qualified conversations/i })).toBeVisible();
});

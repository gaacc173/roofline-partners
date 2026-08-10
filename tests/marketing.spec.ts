import { expect, test } from "playwright/test";

test("homepage is the single scheduling conversion surface", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /start with zero risk/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /tell us about your zip code/i })).toBeVisible();
  // The datetime-local input is replaced by accessible month/day/hour/minute/AM-PM selectors
  await expect(page.locator('input[type="datetime-local"]')).toHaveCount(0);
  await expect(page.getByRole("combobox", { name: /month/i })).toBeVisible();
  await expect(page.getByRole("spinbutton", { name: /day/i })).toBeVisible();
  await expect(page.getByRole("spinbutton", { name: /hour/i })).toBeVisible();
  await expect(page.getByRole("spinbutton", { name: /minute/i })).toBeVisible();
  await expect(page.getByRole("radio", { name: "AM" })).toBeVisible();
  await expect(page.getByRole("radio", { name: "PM" })).toBeVisible();
  await expect(page.locator('input[name="requestedContactTimezone"]')).toHaveCount(1);
  await expect(page.getByText(/no shared leads, no retainers/i)).toBeVisible();
  await expect(
    page.getByText(/storm repair, roof replacement, hail damage, and insurance jobs/i).first(),
  ).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Starter");
  await expect(page.locator("body")).not.toContainText("Growth");
  await expect(page.locator("body")).not.toContainText("Scale");
});

test("date and time controls remain usable on a small viewport", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("form", { name: "Schedule a call form" });

  await expect(form.getByRole("combobox", { name: /month/i })).toBeVisible();
  await expect(form.getByRole("spinbutton", { name: /day/i })).toBeVisible();
  await expect(form.getByRole("radio", { name: "AM" })).toBeVisible();
  await expect(form.getByRole("radio", { name: "PM" })).toBeVisible();
  await expect(form.getByRole("radio", { name: "AM" })).toHaveCSS("min-height", "44px");
});

test("legacy package and contact destinations permanently redirect", async ({ request }) => {
  const packages = await request.get("/packages", { maxRedirects: 0 });
  expect(packages.status()).toBe(308);
  expect(packages.headers().location).toBe("/");

  const getStarted = await request.get("/get-started", { maxRedirects: 0 });
  expect(getStarted.status()).toBe(308);
  expect(getStarted.headers().location).toContain("/#schedule-a-call");

  const contact = await request.get("/contact", { maxRedirects: 0 });
  expect(contact.status()).toBe(308);
  expect(contact.headers().location).toContain("/#schedule-a-call");
});

test("public SEO routes and health endpoint are available", async ({ request }) => {
  const health = await request.get("/api/health");
  expect(health.ok()).toBeTruthy();
  expect(await health.json()).toEqual({ status: "ok" });

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toMatch(/sitemap\.xml/);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toMatch(/\/faq/);
  expect(sitemapBody).not.toMatch(/\/packages|\/get-started|\/contact/);
});

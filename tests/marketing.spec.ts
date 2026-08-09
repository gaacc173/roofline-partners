import { expect, test } from "playwright/test";

test("homepage is the single scheduling conversion surface", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /start with zero risk/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /tell us about your zip code/i })).toBeVisible();
  await expect(page.locator('input[name="requestedContactAt"]')).toHaveAttribute(
    "type",
    "datetime-local",
  );
  await expect(page.locator('input[name="requestedContactTimezone"]')).toHaveCount(1);
  await expect(page.getByText(/no shared leads, no retainers/i)).toBeVisible();
  await expect(
    page.getByText(/storm repair, roof replacement, hail damage, and insurance jobs/i).first(),
  ).toBeVisible();
  await expect(page.locator("body")).not.toContainText("Starter");
  await expect(page.locator("body")).not.toContainText("Growth");
  await expect(page.locator("body")).not.toContainText("Scale");
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

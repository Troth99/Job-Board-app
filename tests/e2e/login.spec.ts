import { test, expect } from "playwright/test";

test('login flow', async ({ page }) => {
  await page.goto('https://job-board-three-omega.vercel.app/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('https://job-board-three-omega.vercel.app/');
});
import { test, expect } from "playwright/test";

test.describe("RegisterComponent", () => {
    test("renders all core form fields", async ({ page }) => {
        await page.goto("https://job-board-three-omega.vercel.app/register");

        // Wait for the password input to be visible before running checks
        await page.waitForSelector('input[placeholder="Password"]', { state: 'visible' });

        await expect(page.getByRole("heading", { name: "Create Account" })).toBeVisible();
        await expect(page.getByPlaceholder("First name")).toBeVisible();
        await expect(page.getByPlaceholder("Last name")).toBeVisible();
        await expect(page.getByPlaceholder("Email address")).toBeVisible();
        await expect(page.getByPlaceholder("Phone Number")).toBeVisible();
        await expect(page.getByPlaceholder("City / Location")).toBeVisible();
        await expect(page.locator('#pwd')).toBeVisible();
        await expect(page.getByPlaceholder("Confirm Password")).toBeVisible();

        await expect(page.getByRole("button", { name: "Register" })).toBeVisible();
    });

    test("terms checkbox is required", async ({ page }) => {
        await page.goto("https://job-board-three-omega.vercel.app/register");

        const checkbox = page.locator("#terms");
        await expect(checkbox).toHaveAttribute("required", "");
    });

    test("login link points to /login", async ({ page }) => {
        await page.goto("https://job-board-three-omega.vercel.app/register");

        const loginLink = page.getByRole("link", { name: "login" });
        await expect(loginLink).toHaveAttribute("href", "/login");
    });
});
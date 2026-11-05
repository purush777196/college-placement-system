import { test, expect } from '@playwright/test';

test.describe('CampusConnect Smoke Tests', () => {
  test('should load public landing page and check brand heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/CampusConnect/);
    await expect(page.locator('text=CampusConnect')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.locator('h1, h2')).toContainText(/Sign In|Welcome Back/i);
  });
});


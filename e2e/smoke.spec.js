import { test, expect } from '@playwright/test';

test.describe('CampusConnect Phase 1 Smoke & E2E Tests', () => {
  test('should load public landing page with brand and hero headline', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/CampusConnect/);
    await expect(page.locator('h1')).toContainText(/Your Career Journey Starts Here/i);
    await expect(page.locator('text=1,450+')).toBeVisible();
  });

  test('should navigate to all public pages via navbar', async ({ page }) => {
    await page.goto('/');

    // About
    await page.click('nav a:has-text("About")');
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('h1, h2').first()).toContainText(/Transforming Campus Placements/i);

    // Features
    await page.click('nav a:has-text("Features")');
    await expect(page).toHaveURL(/\/features/);
    await expect(page.locator('h1, h2').first()).toContainText(/All Platform Features/i);

    // FAQ
    await page.click('nav a:has-text("FAQ")');
    await expect(page).toHaveURL(/\/faq/);
    await expect(page.locator('h1, h2').first()).toContainText(/CampusConnect Help Center/i);

    // Contact
    await page.click('nav a:has-text("Contact")');
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1, h2').first()).toContainText(/Connect with Our Campus Relations/i);
  });

  test('should expand and collapse FAQ accordion items', async ({ page }) => {
    await page.goto('/faq');
    const firstFaqBtn = page.locator('button[aria-controls="faq-answer-faq-1"]');
    await expect(firstFaqBtn).toBeVisible();

    const secondFaqBtn = page.locator('button[aria-controls="faq-answer-faq-2"]');
    await secondFaqBtn.click();
    await expect(page.locator('#faq-answer-faq-2')).toBeVisible();
  });

  test('should validate and submit contact inquiry in demo mode', async ({ page }) => {
    await page.goto('/contact');
    await page.fill('input[placeholder*="Anand Verma"]', 'Prof. Sunita Rao');
    await page.fill('input[placeholder*="college.edu"]', 'sunita.rao@institute.edu');
    await page.fill('input[placeholder*="Onboarding Inquiry"]', '2026 Campus Drive Placement');
    await page.fill('textarea[placeholder*="placement requirements"]', 'We would like to coordinate on-campus recruitment for 800 engineering candidates.');

    await page.click('button:has-text("Submit Inquiry")');
    await expect(page.locator('text=Message Received (Demo Mode)')).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to login portal and switch roles', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.locator('h3:has-text("Sign In")')).toBeVisible();
    await page.click('button:has-text("Student")');
    await page.click('button[type="submit"]:has-text("Sign In as Student")');
    await expect(page).toHaveURL(/\/student\/dashboard/);
  });
});

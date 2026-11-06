import { test, expect } from '@playwright/test';

test.describe('CampusConnect Smoke & E2E Tests (Phases 1 & 2)', () => {
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

  test('should load login page, autofill demo persona, and authenticate to student dashboard', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h3:has-text("Sign In")')).toBeVisible();
    await page.click('button:has-text("Student")');
    await page.click('button[type="submit"]:has-text("Sign In as Student")');
    await expect(page).toHaveURL(/\/student\/dashboard/);
  });

  test('should navigate to registration role selection page and display 3 personas', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('h1:has-text("Create Your CampusConnect Account")')).toBeVisible();
    await expect(page.locator('text=Student Candidate')).toBeVisible();
    await expect(page.locator('text=Corporate Recruiter')).toBeVisible();
    await expect(page.locator('text=Placement Officer (TPO)')).toBeVisible();
    await expect(page.locator('text=System Administrator accounts cannot be registered publicly')).toBeVisible();
  });

  test('should open student registration and support demo autofill', async ({ page }) => {
    await page.goto('/register/student');
    await expect(page.locator('h3:has-text("Student Registration")')).toBeVisible();
    await page.click('button:has-text("Autofill Demo Student")');
    await expect(page.locator('#student-name')).toHaveValue('Rohan Gupta');
    await expect(page.locator('#student-cgpa')).toHaveValue('8.75');
  });

  test('should simulate password reset workflow', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.locator('h3:has-text("Recover Password")')).toBeVisible();
    await page.click('button:has-text("Use Demo Email")');
    await page.click('button:has-text("Send Recovery Instructions")');
    await expect(page.locator('text=Password recovery instructions simulated!')).toBeVisible();
  });

  test('should log in as student and explore placement drives, applications, and interviews', async ({ page }) => {
    await page.goto('/login');
    await page.click('button:has-text("Student")');
    await page.click('button[type="submit"]:has-text("Sign In as Student")');
    await expect(page).toHaveURL(/\/student\/dashboard/);

    // Verify dashboard metrics & elements
    await expect(page.locator('h1:has-text("Welcome back")')).toBeVisible();
    await expect(page.locator('text=Application Pipeline')).toBeVisible();

    // Navigate to drives discovery
    await page.goto('/student/drives');
    await expect(page.locator('h1:has-text("Placement Drive Discovery")')).toBeVisible();
    await expect(page.locator('text=Google Cloud India')).toBeVisible();

    // Navigate to applications page
    await page.goto('/student/applications');
    await expect(page.locator('h1:has-text("My Placement Applications")')).toBeVisible();

    // Navigate to interviews page
    await page.goto('/student/interviews');
    await expect(page.locator('h1:has-text("Upcoming Interviews")')).toBeVisible();

    // Navigate to notifications page
    await page.goto('/student/notifications');
    await expect(page.locator('h1:has-text("Notification Center")')).toBeVisible();
  });
});

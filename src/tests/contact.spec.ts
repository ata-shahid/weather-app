import { test, expect } from '@playwright/test';

test.describe('contact', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test(' Click ContactUS in Homepage and submit a FeedBack', async ({ page }) => {

    await page.click('text=Contact Us');
    await page.fill('input[name="name"]', 'Max Mustermann');  
    await page.fill('input[name="email"]', 'Max.Mustermann@Mail.com');
    await page.fill('input[name="phone"]', '01987654321');
    
    await page.fill('textarea[name="feedback"]', 'To be or Not to Be');  
    await page.click('button[type="submit"]');

    await page.waitForSelector('text=Submitted Information');

    await expect(page.locator('text=Name: Max Mustermann')).toBeVisible();
    await expect(page.locator('text=Email: Max.Mustermann@Mail.com')).toBeVisible();
    await expect(page.locator('text=Phone: 01987654321')).toBeVisible();
    await expect(page.locator('text=Feedback: To be or Not to Be')).toBeVisible();

  });

});

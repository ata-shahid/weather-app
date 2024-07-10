import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have a Nav', async ({ page }) => {
    const Nav = page.locator('Nav');
    await expect(Nav).toBeVisible();
  });

  
  test('should have a search bar with all components', async ({ page }) => {

    await page.waitForSelector('.mt-4.flex');
    const searchBar = await page.locator('.mt-4.flex');

    const searchField = searchBar.locator('[data-testid="search"]');
    await expect(searchField).toBeVisible();

    const locationIcon = searchBar.locator('[data-testid="location"]');
    await expect(locationIcon).toBeVisible();

    const mapIcon = searchBar.locator('[data-testid="maps"]');
    await expect(mapIcon).toBeVisible();

    const calendarButton = searchBar.locator('[data-testid="calendar-icon"]');
    await expect(calendarButton).toBeVisible();
  });


  test('should have a footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

});

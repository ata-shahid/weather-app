import { test, expect } from '@playwright/test';

test.describe('maps', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Search for "la" and pick "Los Angeles,US" and click on the map icon', async ({ page }) => {

    await page.waitForSelector('.mt-4.flex');
    const searchBar = await page.locator('.mt-4.flex');

    const searchField = searchBar.locator('[data-testid="search"]');
    await expect(searchField).toBeVisible();

    const mapIcon = searchBar.locator('[data-testid="maps"]');
    await expect(mapIcon).toBeVisible();

    searchField.click();
    searchField.fill('la');
    await page.getByRole('button', { name: 'Los Angeles, US' }).click();

    await expect(page).toHaveURL('http://localhost:3000/forecast?lat=34.0536909&lon=-118.242766&city=Los+Angeles%2C+US')

    mapIcon.click();

    await expect(page).toHaveURL('http://localhost:3000/map?lat=34.0536909&lon=-118.242766&city=Los+Angeles%2C+US')

  });

});

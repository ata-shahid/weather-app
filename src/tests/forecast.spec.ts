import { test, expect } from '@playwright/test';
import forecastData from './forecastdata.json';

test.describe('forecast', () => {

  test('test Forecast', async ({ page }) => {

    await page.route('**/data/2.5/forecast?*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(forecastData)
      });
    });

    await page.goto('http://localhost:3000/forecast?lat=34.0536909&lon=-118.242766&city=Los+Angeles%2C+US');  // Adjust with appropriate query parameters
    await expect(page).toHaveURL('http://localhost:3000/forecast?lat=34.0536909&lon=-118.242766&city=Los+Angeles%2C+US');  // Asserting the correct URL

    await expect(page.locator('text=Los Angeles, US')).toBeVisible();
    await expect(page.getByText('Friday')).toBeVisible();
    await expect(page.getByText(',12.07.2024')).toBeVisible();
    await expect(page.getByText('18°C').first()).toBeVisible();
    await expect(page.getByText('Feels Like: 18°C')).toBeVisible();

  });

});

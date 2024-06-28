import { getDaysDifference } from "./dateUtils";
import { expect, test } from 'vitest';

test('getDaysDifference calculates difference in days correctly', () => {
    // Test case 1: Same date, should return 0 days
    const startDate1 = new Date('2024-06-28');
    const endDate1 = new Date('2024-06-28');
    expect(getDaysDifference(startDate1, endDate1)).toBe(0);

    // Test case 2: Difference of 1 day
    const startDate2 = new Date('2024-06-27');
    const endDate2 = new Date('2024-06-28');
    expect(getDaysDifference(startDate2, endDate2)).toBe(1);

    // Test case 3: Difference of multiple days
    const startDate3 = new Date('2024-06-25');
    const endDate3 = new Date('2024-06-28');
    expect(getDaysDifference(startDate3, endDate3)).toBe(3);
});
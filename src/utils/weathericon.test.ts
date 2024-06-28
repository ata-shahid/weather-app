import { weatherIcon } from "./weathericon";
import { expect, test } from 'vitest';

test('weatherIcon changes name based on dayTime correctly', () => {
    // Test daytime scenario (assuming 'dayTime' is set to daytime)
    const daytimeResult = weatherIcon('weather-', '2024-06-28T12:00:00');
    expect(daytimeResult).toBe('weatherd');

    // Test nighttime scenario (assuming 'dayTime' is set to nighttime)
    const nighttimeResult = weatherIcon('weather-', '2024-06-28T02:00:00');
    expect(nighttimeResult).toBe('weathern');
});
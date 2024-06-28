import { celsiusConverter } from "./celsiusConverter";
import { expect, test } from 'vitest';

test('celsiusConverter converts Kelvin to Celsius correctly', () => {
    // Test case 1: 0 Kelvin should be -273°C
    expect(celsiusConverter(0)).toBe(-273);

    // Test case 2: 273.15 Kelvin should be 0°C
    expect(celsiusConverter(273.15)).toBe(0);

    // Test case 3: 300 Kelvin should be 26.85°C (rounded to 27°C)
    expect(celsiusConverter(300)).toBe(27);
});
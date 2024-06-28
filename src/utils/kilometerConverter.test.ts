import { kilometerConverter } from "./kilometerConverter";
import { expect, test } from 'vitest';

test('converts meters int to meters per second float', () => {
    expect(kilometerConverter(2850)).toBe('3 km');
});
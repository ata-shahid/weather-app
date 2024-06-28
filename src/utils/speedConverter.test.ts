
import { speedConverter } from "./speedConverter";
import { expect, test } from 'vitest';

test('converts meters int to meters per second float', () => {
    expect(speedConverter(10)).toBe('10.0 m/s');
});
import { cn } from "./cn";
import { expect, test } from 'vitest';

test('cn generates combined CSS class names correctly', () => {
    // Test case 1: Single string input
    expect(cn('btn')).toBe('btn');

    // Test case 2: Multiple string inputs
    expect(cn('btn', 'active', 'large')).toBe('btn active large');

    // Test case 3: Number input
    expect(cn(1)).toBe('1');

    // Test case 4: Object input with true/false values
    expect(cn({ btn: true, active: false, large: true })).toBe('btn large');

    // Test case 5: Mixed inputs including null and undefined
    expect(cn('btn', null, undefined, { active: true }, 0)).toBe('btn active 0');
});
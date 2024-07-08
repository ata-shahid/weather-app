import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Weatherimage from '@/components/Weatherimage';

describe('Weatherimage Component', () => {
  it('renders correctly with given icon', () => {
    const { container } = render(<Weatherimage icon="10d" />);
    const divElement = container.firstChild;

    expect(divElement).toHaveClass('relative h-20 w-20');

    const imgElement = container.querySelector('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveClass('absolute h-full w-full');
    expect(imgElement?.getAttribute('src')).toContain('/_next/image?url=https%3A%2F%2Fopenweathermap.org%2Fimg%2Fwn%2F10d%402x.png&w=256&q=75');
  });

});

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Widgetdata from '@/components/Widgetdata';
import { describe, it, expect } from 'vitest';
import { WidgetProps } from '@/types/types';

describe('Widgetdata Component', () => {
  const props: WidgetProps = {
    discritpion: 'Test Description',
    icon: '🌞',
    value: '25°C'
  };

  it('renders correctly with given props', () => {
    const { getByText } = render(<Widgetdata {...props} />);

    expect(getByText('Test Description')).toBeInTheDocument();
    expect(getByText('🌞')).toBeInTheDocument();
    expect(getByText('25°C')).toBeInTheDocument();
  });

});

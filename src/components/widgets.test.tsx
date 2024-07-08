import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Widgets from '@/components/Widgets';
import { describe, it, expect } from 'vitest';
import { WidgetIconsProps } from '@/types/types';

describe('Widgets Component', () => {
  const props: WidgetIconsProps = {
    visibility: '10 km',
    humidity: '60%',
    windSpeed: '15 km/h',
    airPressure: '1013 hPa',
    sunrise: '6:00 AM',
    sunset: '6:00 PM',
    windGust: '20 km/h',
    seaLevel: '1020 hPa'
  };

  it('renders correctly with given props', () => {
    const { getByText } = render(<Widgets {...props} />);

    expect(getByText('Sunrise')).toBeInTheDocument();
    expect(getByText('6:00 AM')).toBeInTheDocument();

    expect(getByText('Sunset')).toBeInTheDocument();
    expect(getByText('6:00 PM')).toBeInTheDocument();

    expect(getByText('Air Pressure')).toBeInTheDocument();
    expect(getByText('1013 hPa')).toBeInTheDocument();

    expect(getByText('Pressure on Sea Level')).toBeInTheDocument();
    expect(getByText('1020 hPa')).toBeInTheDocument();

    expect(getByText('Visibility')).toBeInTheDocument();
    expect(getByText('10 km')).toBeInTheDocument();

    expect(getByText('Humidity')).toBeInTheDocument();
    expect(getByText('60%')).toBeInTheDocument();

    expect(getByText('Wind Speed')).toBeInTheDocument();
    expect(getByText('15 km/h')).toBeInTheDocument();

    expect(getByText('Wind Gusts')).toBeInTheDocument();
    expect(getByText('20 km/h')).toBeInTheDocument();
  });

  
  it('renders correct icons for each widget', () => {
    const { container } = render(<Widgets {...props} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

});

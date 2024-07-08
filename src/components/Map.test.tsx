import React from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Map from '@/components/Map';

describe('Map component', () => {

  it('renders correctly with given latitude and longitude', () => {
    process.env.NEXT_PUBLIC_WEATHER_API_KEY = 'test-api-key';
    render(<Map lat={12.34} lon={56.78} />);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });


  it('shows error message when API key is not set', () => {
    process.env.NEXT_PUBLIC_WEATHER_API_KEY = '';
    render(<Map lat={12.34} lon={56.78} />);
    expect(screen.getByText(/error: api key is not set/i)).toBeInTheDocument();
  });
  
});

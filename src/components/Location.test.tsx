import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocationButton from '@/components/Location';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter } from 'next/router';
import { afterEach } from 'node:test';


vi.mock('next/router', () => ({
  useRouter: vi.fn(),

}));

describe('LocationButton', () => {
  const mockPush = vi.fn();
  const mockGeolocation = {getCurrentPosition: vi.fn(),};
  const mockNavigatorGeolocation = () => {
    const originalGeolocation = navigator.geolocation;
    Object.defineProperty(navigator, 'geolocation', {
      value: mockGeolocation,
      configurable: true,
      writable: true,
    });
    return () => {
      Object.defineProperty(navigator, 'geolocation', {
        value: originalGeolocation,
        configurable: true,
        writable: true,
      });
    };
  };

  beforeEach(() => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
      query: {},
    });
  });

  afterEach(() => { vi.clearAllMocks(); }); 

  it('renders the location button', () => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({push: mockPush});
    render(<LocationButton />);
    const button = screen.getByTestId('location');
    expect(button).toBeInTheDocument();
  });


  it('handles geolocation and API call successfully', async () => {
    const restoreGeolocation = mockNavigatorGeolocation();
    mockGeolocation.getCurrentPosition.mockImplementation((success: (position: GeolocationPosition) => void) =>
      success({ coords: { latitude: 51.1, longitude: 45.3 } } as GeolocationPosition)
    );
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify([{ name: 'Test City' }]), {
          headers: { 'Content-Type': 'application/json' },
        })));
    render(<LocationButton />);
    const button = screen.getByTestId('location');
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith({
        pathname: '/forecast',
        query: { lat: 51.1, lon: 45.3, city: 'Test City' },
      });
    });
    restoreGeolocation();
  });


  it('handles geolocation error', async () => {
    const restoreGeolocation = mockNavigatorGeolocation();
    mockGeolocation.getCurrentPosition.mockImplementation((_: any, error: (positionError: GeolocationPositionError) => void) =>
      error({ message: 'User denied Geolocation' } as GeolocationPositionError)
    );
    render(<LocationButton />);
    const button = screen.getByTestId('location');
    fireEvent.click(button);
    await waitFor(() => {
      const errorMessage = screen.getByText('Unable to retrieve location');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  
  it('handles API call error', async () => {
    const restoreGeolocation = mockNavigatorGeolocation();
    mockGeolocation.getCurrentPosition.mockImplementation((success: (position: GeolocationPosition) => void) =>
      success({ coords: { latitude: 51.1, longitude: 45.3 } } as GeolocationPosition)
    );
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('API Error')));
    render(<LocationButton />);
    const button = screen.getByTestId('location');
    fireEvent.click(button);
    await waitFor(() => {
      const errorMessage = screen.getByText('Unable to retrieve city name');
      expect(errorMessage).toBeInTheDocument();
    });
  });

});

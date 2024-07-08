import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import Searchbar from '@/components/SearchBar';
import { useRouter } from 'next/router';

// Mock the next/router module
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const formatDateToDDMM = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
    }).format(date).substring(0, 5);
  };

describe('Searchbar', () => {
  const mockPush = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the search bar elements', () => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        query: { lat: '12.34', lon: '56.78', city: 'TestCity', index: '1' },
        push: mockPush,
      });
    render(<Searchbar />);
    const searchField = screen.getByTestId('search');
    const locationButton = screen.getByTestId('location');
    const globeIcon = screen.getByTestId('maps');
    const calendarIcon = screen.getByTestId('calendar-icon');

    expect(searchField).toBeInTheDocument();
    expect(locationButton).toBeInTheDocument();
    expect(globeIcon).toBeInTheDocument();
    expect(calendarIcon).toBeInTheDocument();
  });

  it('navigates to the map when the globe icon is clicked (with valid lat/lon)', () => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        query: { lat: '12.34', lon: '56.78', city: 'TestCity', index: '1' },
        push: mockPush,
      });
    render(<Searchbar />);
    const globeIcon = screen.getByTestId('maps');

    fireEvent.click(globeIcon);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/map',
      query: {lat: '12.34',lon: '56.78',city: 'TestCity',
      },
    });
  });

  it('does not navigate to the map when the globe icon is clicked (without lat/lon)', () => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        query: {lat: '', lon: '', city: 'TestCity', index: '1'},
        push: mockPush,
      });

    render(<Searchbar />);
    const globeIcon = screen.getByTestId('maps');

    fireEvent.click(globeIcon);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('updates the selected date when the router query index changes', async () => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        query: { lat: '12.34', lon: '56.78', city: 'TestCity', index: '1' },
        push: mockPush,
      });
    const { rerender } = render(<Searchbar />);
    const calendarIcon = screen.getByTestId('calendar-icon');
    
    fireEvent.click(calendarIcon);

    await waitFor(() => {
      const datePicker = screen.getByTestId('date-picker');
      expect(datePicker).toBeInTheDocument();
    });

    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      query: { index: '3' },
      push: mockPush,
    });

    rerender(<Searchbar />);

    const selectedDate = new Date(new Date().setDate(new Date().getDate() + 3));
    const formattedDate = formatDateToDDMM(selectedDate);
    
    expect(screen.getByDisplayValue(formattedDate)).toBeInTheDocument();

  });
});

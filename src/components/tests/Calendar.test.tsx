import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CalendarButton from '@/components/Calendar';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useRouter } from 'next/router';
import { addDays } from 'date-fns/addDays';
import { getDaysDifference } from '@/utils/dateUtils';

// Mock the next/router module
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('CalendarButton', () => {
  const setSelectedDate = vi.fn();
  const mockPush = vi.fn();

  it('renders the calendar icon', () => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      query: { lat: '50.0694268', lon: '8.1937409' },
      push: mockPush,
    });
    render(<CalendarButton selectedDate={new Date()} setSelectedDate={setSelectedDate} />);
    const calendarIcon = screen.getByTestId('calendar-icon');
    expect(calendarIcon).toBeInTheDocument();
  });

  it('does not open date picker if lat or lon is missing', () => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      query: { lat: null, lon: null },
      push: mockPush,
    });

    render(<CalendarButton selectedDate={new Date()} setSelectedDate={setSelectedDate} />);
    const calendarIcon = screen.getByTestId('calendar-icon');
    fireEvent.click(calendarIcon);
    const datePicker = screen.queryByRole('dialog');
    expect(datePicker).not.toBeInTheDocument();
  });

  it('opens date picker on calendar icon click', async () => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      query: { lat: '50.0694268', lon: '8.1937409' },
      push: mockPush,
    });

    render(<CalendarButton selectedDate={new Date()} setSelectedDate={setSelectedDate} />);
    const calendarIcon = screen.getByTestId('calendar-icon');
    fireEvent.click(calendarIcon);
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  it('updates date and navigates on date change', async () => {
    // Mock useRouter hook to return expected values
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      query: { lat: '50.0694268', lon: '8.1937409' },
      push: mockPush,
    });

    render(<CalendarButton selectedDate={new Date()} setSelectedDate={setSelectedDate} />);

    // Click the calendar icon to open date picker
    const calendarIcon = screen.getByTestId('calendar-icon');
    fireEvent.click(calendarIcon);

    // Find the date picker input and simulate change
    const datePickerInput = screen.getByRole('textbox');
    fireEvent.change(datePickerInput, { target: { value: '07/05/2024' } });

    // Wait for state updates or side effects to complete
    expect(setSelectedDate).toHaveBeenCalledWith(expect.objectContaining(new Date('2024-07-05')));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith({
        pathname: '/forecast',
        query: { lat: '50.0694268', lon: '8.1937409' , index: -getDaysDifference(new Date('2024-07-05'), new Date())},
      }, undefined, { shallow: false });
    });
  });
});
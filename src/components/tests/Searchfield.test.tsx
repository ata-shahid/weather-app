import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Searchfield from '@/components/SearchField';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter } from 'next/router';


vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-icons/io5', () => ({
  IoSearch: () => <svg data-testid="search-icon" />,
}));

describe('Searchfield component', () => {
    const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        push: mockPush,
        query: {},
      });
    process.env.NEXT_PUBLIC_WEATHER_API_KEY = 'test-api-key';
  });

  it('renders input and search icon', () => {
    render(<Searchfield />);
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });


  it('handles input change and shows suggestions', async () => {
    global.fetch = vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify([
      { name: 'Berlin', country: 'DE', lat: 52.52, lon: 13.405 },
      { name: 'Bern', country: 'CH', lat: 46.948, lon: 7.447 }]), {
        headers: { 'Content-Type': 'application/json' },
      })));

    render(<Searchfield />);
    fireEvent.change(screen.getByTestId('search'), { target: { value: 'ber' } });

    await waitFor(() => {
      expect(screen.getByText('Berlin, DE')).toBeInTheDocument();
      expect(screen.getByText('Bern, CH')).toBeInTheDocument();
    });
  });


  it('shows error message on empty input submission', async () => {
    render(<Searchfield />);
    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Please enter a location')).toBeInTheDocument();
    });
  });


  it('handles form submission and navigation', async () => {
    global.fetch = vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify([{ name: 'Berlin', lat: 52.52, lon: 13.405 }]), {
            headers: { 'Content-Type': 'application/json' },
          })));
    
    render(<Searchfield />);
    fireEvent.change(screen.getByTestId('search'), { target: { value: 'Berlin' } });
    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith({
        pathname: '/forecast',
        query: { city: 'Berlin', lat: 52.52, lon: 13.405 },
      });
    });
  });


  it('shows error message on invalid location', async () => {
    global.fetch = vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify([]), {
            headers: { 'Content-Type': 'application/json' },
          })));

    render(<Searchfield />);
    fireEvent.change(screen.getByTestId('search'), { target: { value: 'InvalidCity' } });
    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Not found. Please enter a valid location.')).toBeInTheDocument();
    });
  });


  it('handles suggestion selection', async () => {
    global.fetch = vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify([
      { name: 'Berlin', country: 'DE', lat: 52.52, lon: 13.405 }]), {
        headers: { 'Content-Type': 'application/json' },
      })));

    render(<Searchfield />);
    fireEvent.change(screen.getByTestId('search'), { target: { value: 'ber' } });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Berlin, DE'));
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith({
        pathname: '/forecast',
        query: { city: 'Berlin', lat: 52.52, lon: 13.405 },
      });
    });
  });
  
});

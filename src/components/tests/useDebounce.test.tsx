import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Searchfield from '@/components/SearchField';

vi.mock('next/router', () => ({
    useRouter: vi.fn(),
}));

vi.mock('react-icons/io5', () => ({
    IoSearch: () => <svg data-testid="search-icon" />,
  }));

describe('useDebounce Hook', () => {

    beforeEach(() => {
        vi.useFakeTimers();
        global.fetch = vi.fn(() =>
            Promise.resolve(
              new Response(JSON.stringify([{ name: 'Berlin', country: 'DE', lat: 52.52, lon: 13.405 }]), {
                headers: { 'Content-Type': 'application/json' },
              })));
        
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });
    
    it('should debounce input value and fetch suggestions', async () => {

        render(<Searchfield />);
        expect(screen.getByTestId('search')).toBeInTheDocument();
        expect(screen.getByTestId('search-icon')).toBeInTheDocument();
        act(() => {
            fireEvent.change(screen.getByTestId('search'), { target: { value: 'berlin' } });
            vi.advanceTimersByTime(500); // Debounce time
        });
        expect(global.fetch).toHaveBeenCalledTimes(1)
    });


    it('should not debounce input value and not fetch suggestions', async () => {
        
        render(<Searchfield />);
        expect(screen.getByTestId('search')).toBeInTheDocument();
        expect(screen.getByTestId('search-icon')).toBeInTheDocument();
        act(() => {
            fireEvent.change(screen.getByTestId('search'), { target: { value: 'berlin' } });
            vi.advanceTimersByTime(400); // less than Debounce time
        });
        expect(global.fetch).not.toHaveBeenCalled()
    });

});

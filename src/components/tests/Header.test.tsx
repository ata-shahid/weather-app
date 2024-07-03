import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
    it('renders the header with the correct elements', () => {
        render(<Header />);

        // Check for the link
        const linkElement = screen.getByRole('link', { name: /HSRM-Wetter-App/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveClass('text-3xl font-bold text-white');
        expect(linkElement).toHaveAttribute('href', '/');

        // Check for the overall Header container
        const navContainer = screen.getByRole('navigation');
        expect(navContainer).toHaveClass('sticky top-0 z-50 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white');
    });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { describe, it, expect } from 'vitest';

describe('Footer', () => {
    it('renders the footer with the correct text', () => {
        render(<Footer />);
        const footerElement = screen.getByText('Powered by OpenWeatherApi');
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveClass('text-1xl font-bold');
        const footerContainer = screen.getByRole('contentinfo');
        expect(footerContainer).toHaveClass('bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 py-4 text-center text-white');
    });
});
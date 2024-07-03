import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { describe, it, expect } from 'vitest';


describe('Footer', () => {
    it('renders the footer with the correct text', () => {
        render(<Footer />);
        const footerElement = screen.getByText('Powered by OpenWeatherApi');
        expect(footerElement).toBeInTheDocument();
    });
});

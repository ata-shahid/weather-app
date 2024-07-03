import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';
import { describe, it, expect } from 'vitest';


describe('Header', () => {
    it('renders the header with the correct elements', () => {
        render(<Header />);
        const linkElement = screen.getByRole('link', { name: /HSRM-Wetter-App/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/');
    });
});

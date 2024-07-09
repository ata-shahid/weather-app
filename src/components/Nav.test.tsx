import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from '@/components/Nav';
import { describe, it, expect } from 'vitest';


describe('Nav', () => {
    it('renders the Nav with the correct elements', () => {
        render(<Nav />);
        const linkElement = screen.getByRole('link', { name: /HSRM-Wetter-App/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/');
    });
});

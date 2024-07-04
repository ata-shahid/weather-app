import React from 'react';
import { render } from '@testing-library/react';
import Container from '@/components/Container';
import { describe, it, expect } from 'vitest';

describe('Container Component', () => {

    it('renders without crashing', () => {
        render(<Container />);
    });


    it('renders with children', () => {
        const { container } = render(<Container>Test</Container>);
        expect(container.firstChild).toHaveTextContent('Test');
    });

    
    it('renders with additional className from props', () => {
        const { container } = render(<Container className="additional-class" />);
        const divElement = container.firstChild;
        expect(divElement).toHaveClass('additional-class');
    });
});

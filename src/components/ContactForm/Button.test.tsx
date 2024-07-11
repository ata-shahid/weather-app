import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';


describe('Button', () => {
    it('renders correctly with provided text', () => {
        render(<Button>Submit</Button>);
        expect(screen.getByText('Submit')).toBeInTheDocument();
      });
    
      it('handles click event', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Submit</Button>);
        fireEvent.click(screen.getByText('Submit'));
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    
      it('applies provided className', () => {
        const className = 'custom-class';
        render(<Button className={className}>Submit</Button>);
        const button = screen.getByText('Submit');
        expect(button).toHaveClass(className);
      });
    
      it('renders with type "button" by default', () => {
        render(<Button>Submit</Button>);
        const button = screen.getByText('Submit');
        expect(button).toHaveAttribute('type', 'button');
      });
    
      it('renders with type "submit" when specified', () => {
        render(<Button type="submit">Submit</Button>);
        const button = screen.getByText('Submit');
        expect(button).toHaveAttribute('type', 'submit');
      });
    
      it('renders with type "reset" when specified', () => {
        render(<Button type="reset">Reset</Button>);
        const button = screen.getByText('Reset');
        expect(button).toHaveAttribute('type', 'reset');
      });
    
      it('renders with type "button" when specified', () => {
        render(<Button type="button">Back</Button>);
        const button = screen.getByText('Back');
        expect(button).toHaveAttribute('type', 'button');
      });
});
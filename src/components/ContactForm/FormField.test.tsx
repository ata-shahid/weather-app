import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormField from './FormField';

describe('FormField', () => {
  it('renders input field correctly', () => {
    render(
      <FormField
        label="Name"
        type="text"
        name="name"
        value=""
        onChange={() => {}}
        error=""
        required
      />
    );
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('renders textarea field correctly', () => {
    render(
      <FormField
        label="Feedback"
        type="textarea"
        name="feedback"
        value=""
        onChange={() => {}}
        error=""
        required
      />
    );
    expect(screen.getByLabelText(/feedback/i)).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <FormField
        label="Name"
        type="text"
        name="name"
        value=""
        onChange={() => {}}
        error="This field is required"
      />
    );
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });

  it('calls onChange handler for input', () => {
    const handleChange = vi.fn();
    render(
      <FormField
        label="Phone"
        type="text"
        name="phone"
        value=""
        onChange={handleChange}
        error=""
        required
      />
    );
    const input = screen.getByLabelText(/phone/i);
    fireEvent.change(input, { target: { value: '123456789' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange handler for textarea', () => {
    const handleChange = vi.fn();
    render(
      <FormField
        label="Feedback"
        type="textarea"
        name="feedback"
        value=""
        onChange={handleChange}
        error=""
        required
      />
    );
    const textarea = screen.getByLabelText(/feedback/i);
    fireEvent.change(textarea, { target: { value: 'Some feedback' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

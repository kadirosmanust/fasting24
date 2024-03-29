import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import Input from './Input';

describe('Input', () => {
  test('renders input element with correct placeholder', () => {
    const placeholder = 'Enter your name';
    render(<Input placeholder={placeholder} value="" />);
    const inputElement = screen.getByText(placeholder);
    expect(inputElement).toBeDefined();
  });

  test('updates input value correctly', () => {
    const placeholder = 'Enter your name';
    const value = 'John Doe';
    render(<Input placeholder={placeholder} value={value} />);

    expect(screen.getByText(placeholder)).toBeDefined();

    const inputElement = screen.getByRole('textbox');

    userEvent.type(inputElement, value);

    expect(inputElement).toHaveProperty('value', value);
  });
});

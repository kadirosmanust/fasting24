import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Fasting } from '@/types/fasting';

import Ring from './Ring';

test('renders Ring component', () => {
  render(<Ring onDurationCompleted={() => {}} fastingData={null} />);
  const ringElement = screen.getByTestId('ring');
  expect(ringElement).toBeDefined();
});

test('displays fasting duration', () => {
  const fastingData: Partial<Fasting> = {
    startDate: new Date('2022-01-01T08:00:00Z'),
    endDate: new Date('2022-01-01T16:30:00Z'),
  };
  render(<Ring onDurationCompleted={() => {}} fastingData={fastingData} />);

  expect(screen.getByText('08:30:00')).toBeDefined();
});

test('displays "No fasting data" when fastingData is null', () => {
  const fastingData: Partial<Fasting> = {
    startDate: new Date('2022-01-01T08:00:00Z'),
    endDate: new Date('2022-01-01T16:30:00Z'),
    isActive: false,
    isCompleted: true,
  };

  render(<Ring onDurationCompleted={() => {}} fastingData={fastingData} />);

  expect(screen.getByText('totalTime')).toBeDefined();
});

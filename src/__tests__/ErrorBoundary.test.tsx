import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import ErrorBoundary from '@/components/HOCs/ErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test error');

  return <div>Test</div>;
};

test('renders ErrorBoundary component', () => {
  render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>,
  );

  const errorBoundaryElement = screen.getByTestId('err-boundry');
  expect(errorBoundaryElement).toBeDefined();
});

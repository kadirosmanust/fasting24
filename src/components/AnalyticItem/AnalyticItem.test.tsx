import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import AnalyticItem from '.';

describe('AnalyticsItem', () => {
  test('should be render correctly', () => {
    render(<AnalyticItem title="Testing" description="100" />);

    expect(screen.getByText(/Testing/i)).toBeDefined();
  });
});

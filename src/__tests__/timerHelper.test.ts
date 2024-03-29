import { expect, test } from 'vitest';
import { calculateDurationInSeconds } from '../libs/timerHelper';

test('calculateDurationInSeconds should return the correct duration in seconds', () => {
  const startDate = new Date('2022-01-01');
  const endDate = new Date('2022-01-02');
  const result1 = calculateDurationInSeconds(startDate, endDate);

  expect(result1).toBe(86400);
});

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './sum';

const sumCases = [
  [3, 6],
  [5, 15],
];

describe('Sum to N', () => {
  it('A should provide the correct results from preset cases', async () => {
    for (const [n, expectedSum] of sumCases) {
      assert(sum_to_n_a(n) === expectedSum);
    }
  });
  it('B should provide the correct results from preset cases', async () => {
    for (const [n, expectedSum] of sumCases) {
      assert(sum_to_n_b(n) === expectedSum);
    }
  });
  it('C should provide the correct results from preset cases', async () => {
    for (const [n, expectedSum] of sumCases) {
      assert(sum_to_n_c(n) === expectedSum);
    }
  });
});

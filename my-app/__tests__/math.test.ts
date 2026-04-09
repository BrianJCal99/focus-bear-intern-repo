import { add } from '../utils/math';

describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('adds a positive and a negative number', () => {
    expect(add(5, -3)).toBe(2);
  });

  it('adds two zeros', () => {
    expect(add(0, 0)).toBe(0);
  });
});

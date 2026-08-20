/**
 * calculator.test.js
 *
 * Unit tests for the four basic math operations implemented in
 * ../calculator.js: addition, subtraction, multiplication, and division.
 *
 * Base examples (from images/calc-basic-operations.png):
 *   2 + 3  = 5
 *   10 - 4 = 6
 *   45 * 2 = 90
 *   20 / 5 = 4
 */

const { add, subtract, multiply, divide, modulo, power, sqrt, calculate } = require('../calculator');

describe('add', () => {
  test('adds two positive numbers (example: 2 + 3 = 5)', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds a positive and a negative number', () => {
    expect(add(5, -3)).toBe(2);
  });

  test('adds two negative numbers', () => {
    expect(add(-4, -6)).toBe(-10);
  });

  test('adds decimal numbers', () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });

  test('adds zero as an identity value', () => {
    expect(add(7, 0)).toBe(7);
  });
});

describe('subtract', () => {
  test('subtracts two positive numbers (example: 10 - 4 = 6)', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtracting a larger number from a smaller one yields a negative result', () => {
    expect(subtract(4, 10)).toBe(-6);
  });

  test('subtracts a negative number (double negative becomes addition)', () => {
    expect(subtract(5, -3)).toBe(8);
  });

  test('subtracts decimal numbers', () => {
    expect(subtract(5.5, 2.25)).toBeCloseTo(3.25);
  });

  test('subtracting zero returns the same number', () => {
    expect(subtract(9, 0)).toBe(9);
  });
});

describe('multiply', () => {
  test('multiplies two positive numbers (example: 45 * 2 = 90)', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplies a positive and a negative number', () => {
    expect(multiply(4, -3)).toBe(-12);
  });

  test('multiplies two negative numbers', () => {
    expect(multiply(-4, -3)).toBe(12);
  });

  test('multiplying by zero returns zero', () => {
    expect(multiply(123, 0)).toBe(0);
  });

  test('multiplies decimal numbers', () => {
    expect(multiply(2.5, 4)).toBeCloseTo(10);
  });
});

describe('divide', () => {
  test('divides two positive numbers (example: 20 / 5 = 4)', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divides a negative number by a positive number', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  test('divides two negative numbers', () => {
    expect(divide(-10, -2)).toBe(5);
  });

  test('divides numbers that do not evenly divide', () => {
    expect(divide(7, 2)).toBeCloseTo(3.5);
  });

  test('dividing zero by a non-zero number returns zero', () => {
    expect(divide(0, 5)).toBe(0);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero is not allowed.');
  });

  test('throws an error when dividing zero by zero', () => {
    expect(() => divide(0, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('modulo', () => {
  test('returns the remainder of two positive numbers (example: 10 % 3 = 1)', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('returns 0 when evenly divisible', () => {
    expect(modulo(9, 3)).toBe(0);
  });

  test('handles negative dividends', () => {
    expect(modulo(-10, 3)).toBe(-1);
  });

  test('handles decimal numbers', () => {
    expect(modulo(5.5, 2)).toBeCloseTo(1.5);
  });

  test('throws an error when modulo by zero', () => {
    expect(() => modulo(5, 0)).toThrow('Modulo by zero is not allowed.');
  });
});

describe('power', () => {
  test('raises a number to a positive exponent (example: 2 ^ 3 = 8)', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('raises a number to the power of zero', () => {
    expect(power(5, 0)).toBe(1);
  });

  test('raises a number to a negative exponent', () => {
    expect(power(2, -2)).toBeCloseTo(0.25);
  });

  test('raises a negative number to an even exponent', () => {
    expect(power(-2, 2)).toBe(4);
  });

  test('raises a number to a decimal exponent', () => {
    expect(power(9, 0.5)).toBeCloseTo(3);
  });
});

describe('sqrt', () => {
  test('returns the square root of a perfect square (example: sqrt(9) = 3)', () => {
    expect(sqrt(9)).toBe(3);
  });

  test('returns the square root of a non-perfect square', () => {
    expect(sqrt(2)).toBeCloseTo(1.4142, 4);
  });

  test('returns 0 for the square root of 0', () => {
    expect(sqrt(0)).toBe(0);
  });

  test('throws an error for negative numbers', () => {
    expect(() => sqrt(-4)).toThrow('Cannot calculate the square root of a negative number.');
  });
});

describe('calculate', () => {
  test.each([
    ['+', 2, 3, 5],
    ['add', 2, 3, 5],
    ['-', 10, 4, 6],
    ['subtract', 10, 4, 6],
    ['*', 45, 2, 90],
    ['multiply', 45, 2, 90],
    ['/', 20, 5, 4],
    ['divide', 20, 5, 4],
    ['%', 10, 3, 1],
    ['modulo', 10, 3, 1],
    ['^', 2, 3, 8],
    ['power', 2, 3, 8],
  ])('calculate(%s) resolves operator "%s" correctly', (operator, a, b, expected) => {
    expect(calculate(a, operator, b)).toBe(expected);
  });

  test('calculate resolves "sqrt" operator correctly', () => {
    expect(calculate(9, 'sqrt')).toBe(3);
  });

  test('throws an error for an unsupported operator', () => {
    expect(() => calculate(1, '&', 2)).toThrow(/Unsupported operator/);
  });

  test('propagates division-by-zero error through calculate', () => {
    expect(() => calculate(5, '/', 0)).toThrow('Division by zero is not allowed.');
  });
});

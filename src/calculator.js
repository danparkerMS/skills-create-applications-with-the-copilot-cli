#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic math operations:
 *   - Addition       (+ or "add")
 *   - Subtraction     (- or "subtract")
 *   - Multiplication  (* or "multiply")
 *   - Division        (/ or "divide")
 *
 * Usage:
 *   node calculator.js <num1> <operator> <num2>
 *
 * Examples:
 *   node calculator.js 5 + 3
 *   node calculator.js 10 divide 2
 */

// Adds two numbers together.
function add(a, b) {
  return a + b;
}

// Subtracts the second number from the first.
function subtract(a, b) {
  return a - b;
}

// Multiplies two numbers together.
function multiply(a, b) {
  return a * b;
}

// Divides the first number by the second. Throws an error on division by zero.
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

// Maps supported operator symbols and words to their corresponding function.
const OPERATIONS = {
  '+': add,
  add: add,
  '-': subtract,
  subtract: subtract,
  '*': multiply,
  multiply: multiply,
  '/': divide,
  divide: divide,
};

// Performs the requested operation on two numbers.
function calculate(num1, operator, num2) {
  const operation = OPERATIONS[operator];
  if (!operation) {
    throw new Error(
      `Unsupported operator "${operator}". Supported operators: + - * / (add, subtract, multiply, divide).`
    );
  }
  return operation(num1, num2);
}

// Parses command-line arguments, runs the calculation, and prints the result.
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error('Usage: node calculator.js <num1> <operator> <num2>');
    console.error('Operators: + - * / (add, subtract, multiply, divide)');
    process.exitCode = 1;
    return;
  }

  const [rawNum1, operator, rawNum2] = args;
  const num1 = Number(rawNum1);
  const num2 = Number(rawNum2);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    console.error('Both operands must be valid numbers.');
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(num1, operator, num2);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, calculate };

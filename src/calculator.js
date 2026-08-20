#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting:
 *   - Addition       (+ or "add")
 *   - Subtraction     (- or "subtract")
 *   - Multiplication  (* or "multiply")
 *   - Division        (/ or "divide")
 *   - Modulo          (% or "modulo")
 *   - Exponentiation  (^ or "power")
 *   - Square Root     ("sqrt", "square", or "squareroot")
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

// Returns the remainder from dividing the first number by the second. Throws on modulo by zero.
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

// Raises the first number to the power of the second.
function power(a, b) {
  return a ** b;
}

// Returns the square root of the provided number. Throws for negative inputs.
function squareRoot(a) {
  if (a < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(a);
}

// Maps supported operator symbols and words to their corresponding function and arity.
const OPERATIONS = {
  '+': { fn: add, arity: 2 },
  add: { fn: add, arity: 2 },
  '-': { fn: subtract, arity: 2 },
  subtract: { fn: subtract, arity: 2 },
  '*': { fn: multiply, arity: 2 },
  multiply: { fn: multiply, arity: 2 },
  '/': { fn: divide, arity: 2 },
  divide: { fn: divide, arity: 2 },
  '%': { fn: modulo, arity: 2 },
  modulo: { fn: modulo, arity: 2 },
  '^': { fn: power, arity: 2 },
  power: { fn: power, arity: 2 },
  sqrt: { fn: squareRoot, arity: 1 },
  square: { fn: squareRoot, arity: 1 },
  squareroot: { fn: squareRoot, arity: 1 },
};

// Performs the requested operation on two numbers.
function calculate(num1, operator, num2) {
  const operation = OPERATIONS[operator];
  if (!operation) {
    throw new Error(
      `Unsupported operator "${operator}". Supported operators: + - * / % ^ (add, subtract, multiply, divide, modulo, power, sqrt).`
    );
  }

  if (operation.arity === 1) {
    if (num2 !== undefined) {
      throw new Error(`Operator "${operator}" takes one operand.`);
    }
    return operation.fn(num1);
  }

  if (num2 === undefined) {
    throw new Error(`Operator "${operator}" requires two operands.`);
  }

  return operation.fn(num1, num2);
}

// Parses command-line arguments, runs the calculation, and prints the result.
function main() {
  const args = process.argv.slice(2);
  let num1;
  let operator;
  let num2;

  if (args.length === 2) {
    [operator] = args;
    num1 = Number(args[1]);
  } else if (args.length === 3) {
    const [rawNum1, parsedOperator, rawNum2] = args;
    operator = parsedOperator;
    num1 = Number(rawNum1);
    num2 = Number(rawNum2);
  } else {
    console.error('Usage: node calculator.js <num1> <operator> <num2> OR node calculator.js <operator> <num>');
    console.error('Operators: + - * / % ^ (add, subtract, multiply, divide, modulo, power, sqrt)');
    process.exitCode = 1;
    return;
  }

  if (Number.isNaN(num1) || (num2 !== undefined && Number.isNaN(num2))) {
    console.error('All operands must be valid numbers.');
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

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };

"use strict"; 

function operate(operator, firstOperand, secondOperand) {
  let result;
  switch (operator) {
    case "+":
      result = add(firstOperand, secondOperand);
      break;
  
    case "-":
      result = subtract(firstOperand, secondOperand);
      break;

    case "*":
      result = multiply(firstOperand, secondOperand);
      break;

    case "/":
      result = divide(firstOperand, secondOperand);
      break;
  }
  return result; 
}

// Basic Operations Functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

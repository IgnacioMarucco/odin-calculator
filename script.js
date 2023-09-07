"use strict"; 
// DOM
const mainDisplay = document.querySelector(".main-display");
const secondaryDisplay = document.querySelector(".secondary-display");

const numbersBtns = document.querySelectorAll("[data-operand]");
numbersBtns.forEach(numberBtn => numberBtn.addEventListener("click", (e) => {
  addNewOperand(e.target.attributes["data-operand"].value)
}));

const operatorsBtns = document.querySelectorAll("[data-operator]");
operatorsBtns.forEach(operatorBtn => operatorBtn.addEventListener("click", (e) => {
  addNewOperator(e.target.attributes["data-operator"].value);
}));

const clearBtn = document.querySelector("[data-clear]");
clearBtn.addEventListener('click', clearCalculator);

// Object to store variables
let operation = {
  firstOperand: '',
  secondOperand: '',
  operator: null,
  result: null,
}

// Main Function
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
    
    default:
      return null;
  }
  operation["result"] = result;
  changeDisplay();
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
  return (a % b === 0) ? a / b : (a / b).toFixed(2);
}

// Function to save new operand
function addNewOperand(value) {
  let newOperand = value;

  if (operation["operator"] === null) {
    operation["firstOperand"] += newOperand;
  } else {
    operation["secondOperand"] += newOperand;
  }
  console.log(operation);
  changeDisplay();
}

// Function to save new operator
function addNewOperator(value) {
  let newOperator =  value;

  if (newOperator === "=") {
    operate(operation.operator, +operation.firstOperand, +operation.secondOperand);
    return;
  } else if (operation["operator"] !== null) { // If its not the first operator, do the math and move operands to keep chaining operands.
    operate(operation.operator, +operation.firstOperand, +operation.secondOperand);

    operation["firstOperand"] = operation["result"];
    operation["secondOperand"] = '';
    operation.result = null;
  }
  operation["operator"] = newOperator;
  changeDisplay()
}

// Function clear calculator
function clearCalculator() {
  operation = {
    firstOperand: '0',
    secondOperand: '',
    operator: null,
    result: null,
  }
  changeDisplay()
}

function changeDisplay() {
  if (operation.result === null && !operation.secondOperand) {
    mainDisplay.textContent = operation.firstOperand;
    return;
  } else if (operation.result === null && operation.operator) {
    mainDisplay.textContent = operation.secondOperand;
    secondaryDisplay.textContent = `${operation.firstOperand} ${operation.operator}`;
    return;
  }
  secondaryDisplay.textContent = `${operation.firstOperand} ${operation.operator} ${operation.secondOperand} =`;
  mainDisplay.textContent = operation.result;
}

// Keyboard
window.addEventListener('keydown', function (e) {
  let key = e.key;
  if (e.key === "Enter") {
    key = "=";
  }
  console.log(key)
  if (key >= 0 && key <= 9) {
    addNewOperand(key)
  } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '=') {
    addNewOperator(key);
  }
});
"use strict"; 
// DOM
const mainDisplay = document.querySelector(".main-display");
const secondaryDisplay = document.querySelector(".secondary-display");

const numbersBtns = document.querySelectorAll("[data-operand]");
numbersBtns.forEach(numberBtn => numberBtn.addEventListener("click", (e) => {
  addNewOperand(e.target.attributes["data-operand"].value);
  changeDisplay();
}));

const operatorsBtns = document.querySelectorAll("[data-operator]");
operatorsBtns.forEach(operatorBtn => operatorBtn.addEventListener("click", (e) => {
  addNewOperator(e.target.attributes["data-operator"].value);
  changeDisplay();
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
  operation.result = result % 1 === 0 ? result : result.toFixed(2);  
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
  if (b === 0) {
    alert("LMAO DON'T!");
    clearCalculator();
    return;
  }
  return a / b;
}

// Function to save new operand
function addNewOperand(value) {
  let newOperand = value;
  let operandToModify = whichOperand();
  // Check so user can't add more than one decimal separator
  if (newOperand === "." && hasDecimalSeparator(operandToModify)){ 
    return;
  }

  if (operation.operator === null) {
    operation.firstOperand += newOperand;
  } else {
    operation.secondOperand += newOperand;
    operation.result = null;
  }
  changeDisplay();
}

// Function to save new operator
function addNewOperator(value) {
  let newOperator =  value;

  if (newOperator !== "=" && operation.operator === null) {
    operation.operator = newOperator;
  } else if (newOperator !== "=" && operation.operator !== null) {
    operate(operation.operator, +operation.firstOperand, +operation.secondOperand);
    // Switch operand with result to chain operations. Then add new operator for the next operation.
    operation.firstOperand = operation.result;
    operation.secondOperand = '';
    operation.operator = newOperator;
  } else {
    // New operator is equal, just solve.
    operate(operation.operator, +operation.firstOperand, +operation.secondOperand);
  }
}

// Function clear calculator
function clearCalculator() {
  operation = {
    firstOperand: '',
    secondOperand: '',
    operator: null,
    result: null,
  }
  changeDisplay();
  mainDisplay.textContent = '0';
}

function changeDisplay() {
  if (operation.operator === null) { //First Operand
    mainDisplay.textContent = operation.firstOperand;
    secondaryDisplay.textContent = '';
  } else if (operation.operator !== null && operation.result === null) { //Second Operand, no result yet
    mainDisplay.textContent = operation.secondOperand;
    secondaryDisplay.textContent = operation.firstOperand + operation.operator
  } else if (operation.result !== null) {  //Result obtained
    mainDisplay.textContent = operation.result;
    secondaryDisplay.textContent = operation.firstOperand + operation.operator + operation.secondOperand;
  }
}

// Function to check if a number has a decimal separator
function hasDecimalSeparator(number) {
  return (number.split('').some((element) => element === "."));
}

// Function to choose which operand to modify
function whichOperand() {
  if (operation.operator === null) {
    return operation.firstOperand;
  } else {
    return operation.secondOperand;
  }
}

// Keyboard
window.addEventListener('keydown', function (e) {
  let key = e.key;
  if (e.key === "Enter") {
    key = "=";
  }
  if (key >= 0 && key <= 9 || key === ".") {
    addNewOperand(key)
  } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '=') {
    addNewOperator(key);
  }
});

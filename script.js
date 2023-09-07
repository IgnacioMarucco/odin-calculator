"use strict"; 
// 
let operation = {
  firstOperand: '',
  secondOperand: '',
  operator: null,
  result: null,
}
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
  operation["result"] = result.toFixed(2);
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

// DOM
const display = document.querySelector(".display");
const numbersBtns = document.querySelectorAll("[data-operand]");
numbersBtns.forEach(numberBtn => numberBtn.addEventListener("click", newOperand));
const operatorsBtns = document.querySelectorAll("[data-operator]");
operatorsBtns.forEach(operatorBtn => operatorBtn.addEventListener("click", addNewOperator));
const equalBtn = document.querySelector("[data-equal]");
equalBtn.addEventListener("click", () => {
  operate(operation.operator, +operation.firstOperand, +operation.secondOperand);
  changeDisplay(operation["result"]);
});

// Function to save new Number
function newOperand(e) {
  console.log(e.target.textContent);

  
  if (operation["operator"] === null) {
    operation["firstOperand"] += e.target.textContent;
    changeDisplay(operation["firstOperand"])
  } else {
    operation["secondOperand"] += e.target.textContent;
    changeDisplay(operation["secondOperand"])
  }
}

// Function to save new operator
function addNewOperator(e) {
  let newOperator =  e.target.attributes["data-operator"].value;
  if (operation["operator"] !== null) {
    operate(operation.operator, +operation.firstOperand, +operation.secondOperand);
    changeDisplay(operation["result"]);

    operation["firstOperand"] = operation["result"];
    operation["secondOperand"] = '';
  }
  operation["operator"] = newOperator;
}

// Function to change display
function changeDisplay(element) {
  display.textContent = element;
}

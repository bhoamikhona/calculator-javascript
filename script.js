"use strict";

const body = document.body;
const keypad = document.querySelector(".keypad");
const displayElement = document.querySelector(".display");
const themeSlider = document.querySelector(".slider");
let currentOperand;
let previousOperand;
let operation;

// updates the calculator display
const updateDisplay = function () {
  displayElement.innerText = currentOperand || "0";
};

// resets the calculator
const resetCalculator = function () {
  currentOperand = "";
  previousOperand = "";
  operation = null;
  updateDisplay();
};

// deletes the last digit from the current operand
const deleteNumber = function () {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
};

// appends a number or decimal to current operand
const appendNumber = function (number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
  updateDisplay();
};

// choose an operation
const chooseOperation = function (op) {
  if (currentOperand === "") return;

  if (previousOperand !== "") {
    compute();
  }

  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
};

// compute the result based on chosen operation
const compute = function () {
  let result;

  const prev = Number.parseFloat(previousOperand);
  const current = Number.parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  currentOperand = result;
  operation = null;
  updateDisplay();
};

// initializing calculator on first load
resetCalculator();

const eventHandler = function (btnClicked) {
  switch (btnClicked) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      appendNumber(btnClicked);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      chooseOperation(btnClicked);
      break;
    case "=":
    case "Enter":
      compute();
      break;
    case "d":
    case "Backspace":
      deleteNumber();
      break;
    case "r":
    case "Escape":
      resetCalculator();

      break;
    default:
      break;
  }
};

keypad.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn")) return;
  eventHandler(e.target.value);
});

document.addEventListener("keydown", function (e) {
  eventHandler(e.key);
});

themeSlider.addEventListener("input", function (e) {
  body.setAttribute("data-theme", e.target.value);
});

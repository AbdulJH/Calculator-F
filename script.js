const currentOperandElement = document.querySelector(".current-operand");
const previousOperandElement = document.querySelector(".previous-operand");

let operator = "";
let previousNumber = "";

function appendNumber(number) {
  if (currentOperandElement.innerText === "0" && number === "0") {
    return;
  }

  if (currentOperandElement.innerText === "0" && number !== ".") {
    currentOperandElement.innerText = number;
    return;
  }

  currentOperandElement.innerText += number;
}

function clearPreviousNumber() {
  const currentText = currentOperandElement.innerText;
  if (currentText.length === 1 || currentText === "0") {
    currentOperandElement.innerText = "0";
  } else {
    currentOperandElement.innerText = currentText.slice(0, -1);
  }
}

function clearAll() {
  currentOperandElement.innerText = "0";
  previousOperandElement.innerText = "";
  operator = "";
  previousNumber = "";
}

function setOperator(op) {
  operator = op;
  previousNumber = currentOperandElement.innerText;
  previousOperandElement.innerText = previousNumber + " " + operator;
  currentOperandElement.innerText = "0";
}

function calculate() {
  if (operator && previousNumber) {
    let currentNumber = parseFloat(currentOperandElement.innerText);
    let prevNumber = parseFloat(previousNumber);
    let result;

    switch (operator) {
      case "+":
        result = prevNumber + currentNumber;
        break;
      case "-":
        result = prevNumber - currentNumber;
        break;
      case "X":
        result = prevNumber * currentNumber;
        break;
      case "÷":
        result = prevNumber / currentNumber;
        break;
      default:
        return;
    }

    currentOperandElement.innerText = result;
    previousOperandElement.innerText = "";
    operator = "";
    previousNumber = "";
  }
}

function setUpEventListeners() {
  const numButtons = document.querySelectorAll(".number-btn");
  numButtons.forEach((button) => {
    button.addEventListener("click", () => {
      appendNumber(button.innerText);
    });
  });

  const clearLast = document.querySelector(".clear-ce");
  clearLast.addEventListener("click", clearPreviousNumber);

  const clearC = document.querySelector(".clear-c");
  clearC.addEventListener("click", clearAll);

  const operandButtons = document.querySelectorAll(".operand");
  operandButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.innerText;
      setOperator(buttonText);
    });
  });

  const equalBtn = document.querySelector(".equal-button");
  equalBtn.addEventListener("click", calculate);
}

document.addEventListener("DOMContentLoaded", () => {
  setUpEventListeners();
});

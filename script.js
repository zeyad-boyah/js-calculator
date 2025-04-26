// Basic math functions
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
    showError("Cannot divide by zero!");
    return null;
  }
  return a / b;
}

// take the operator from +,-,/,* and use the appropriate function
function operate(op, a, b) {
    // convert the variables from sting to a float
  const x = parseFloat(a);
  const y = parseFloat(b);
  switch (op) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
}

// State
// initial display value
let displayValue = "0";

let firstValue = null;
let operator = null;
// flag for confirming that second number is provided or not by checking if the operator is provided or not
let waitingForSecond = false;
let resultDisplayed = false;

const display = document.getElementById("display");

// make a function for displaying the number the user enters and the answer
function updateDisplay() {
  display.textContent = displayValue;
}

// make a function that takes the input and check if it was the first input and update the display using updateDisplay() to reflect that input 
function inputDigit(d) {
  if (waitingForSecond) {
    displayValue = d;
    waitingForSecond = false;
  } else if (resultDisplayed) {
    displayValue = d;
    resultDisplayed = false;
  } else {
    displayValue = displayValue === "0" ? d : displayValue + d;
  }
  updateDisplay();
}

// decimal support
function inputDecimal() {
  if (waitingForSecond) return;
  if (!displayValue.includes(".")) {
    displayValue += ".";
    updateDisplay();
  }
}

function handleOperator(op) {
  if (operator && waitingForSecond) {
    operator = op; // replace operator
    return;
  }
//   if first value is not provided then assume that the user wants to add a number to his current result 
  if (firstValue == null) {
    firstValue = displayValue;
  } 
//   if first value was provided then operate on the stored first value and the displayed value (second value)
// so now we can chain operations without hitting '=' like so 12 → + → 7 → - 
  else {
    const result = operate(operator, firstValue, displayValue);
    if (result !== null) {
      displayValue = parseFloat(parseFloat(result).toFixed(10)).toString();
      updateDisplay();
      firstValue = displayValue;
    }
  }
//   update flags
  waitingForSecond = true;
  operator = op;
  resultDisplayed = false;
}

// clean everything
function resetCalculator() {
  displayValue = "0";
  firstValue = null;
  operator = null;
  waitingForSecond = false;
  resultDisplayed = false;
  updateDisplay();
}

// delete an already provided number
function backspace() {
    // check if the displayed number is a result or not
  if (resultDisplayed) return;
  displayValue = displayValue.slice(0, -1) || "0";
  updateDisplay();
}

function showError(msg) {
  displayValue = msg;
  updateDisplay();
  resetCalculator();
}

// event listener for all numbers with custom data type attribute of "digit"
document.querySelectorAll("[data-digit]").forEach((button) => {
  button.addEventListener("click", () => inputDigit(button.dataset.digit));
});

// event listener for "."
document.querySelector(".decimal").addEventListener("click", inputDecimal);

// event listener for all operator class buttons
document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => handleOperator(button.dataset.op));
});

// event listener for "=" to get the result
document.querySelector(".equal").addEventListener("click", () => {
    // if the user didn't provide an operator or another number do nothing
  if (!operator || waitingForSecond) return;
    // calculate the result using operate()
  const result = operate(operator, firstValue, displayValue);

  if (result !== null) {
    displayValue = parseFloat(parseFloat(result).toFixed(10)).toString();
    updateDisplay();
    // reset flags
    firstValue = null;
    operator = null;
    resultDisplayed = true;
  }
});

document.querySelector(".clear").addEventListener("click", resetCalculator);
document.querySelector(".backspace").addEventListener("click", backspace);

// Keyboard support
window.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
      inputDigit(e.key);
    } else if (e.key === ".") {
      inputDecimal();
    } else if (["+", "-", "*", "/"].includes(e.key)) {
      handleOperator(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
    //   trigger the click event for "=" since it has all the needed logic
      document.querySelector(".equal").click();
    } else if (e.key === "Backspace") {
      backspace();
    } else if (e.key === "Escape") {
      resetCalculator();
    }
  });

updateDisplay();

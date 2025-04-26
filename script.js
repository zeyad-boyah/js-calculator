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



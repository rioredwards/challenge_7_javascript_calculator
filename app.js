const displayEl = document.getElementById("display");
const numberBtns = document.querySelectorAll(".number");
const clearBtn = document.getElementById("clear");
const addBtn = document.getElementById("add");
const subtractBtn = document.getElementById("subtract");
const multiplyBtn = document.getElementById("multiply");
const divideBtn = document.getElementById("divide");
const equalsBtn = document.getElementById("equals");
const changeSignBtn = document.getElementById("change-sign");
const percentageBtn = document.getElementById("percentage");
const decimalBtn = document.getElementById("decimal");

let displayValue = 0;
let targetOperand = null;
let storedOperand = null; // Update when an operator is clicked (And then another number is clicked)
let operator = null; // Update when an operator is clicked

numberBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const number = e.target.innerText;
    if (number === ".") {
      // TODO: Handle decimal
    }

    if (targetOperand !== null) {
      targetOperand = parseFloat(targetOperand.toString() + number);
    } else {
      targetOperand = parseInt(number);
    }

    updateDisplay();
  });
});

addBtn.addEventListener("click", (e) => {
  operator = "+";
  storedOperand = targetOperand;
  targetOperand = null;
  updateDisplay();
});

subtractBtn.addEventListener("click", (e) => {
  operator = "-";
  storedOperand = targetOperand;
  targetOperand = null;
  updateDisplay();
});

multiplyBtn.addEventListener("click", (e) => {
  operator = "x";
  storedOperand = targetOperand;
  targetOperand = null;
  updateDisplay();
});

divideBtn.addEventListener("click", (e) => {
  operator = "/";
  storedOperand = targetOperand;
  targetOperand = null;
  updateDisplay();
});

changeSignBtn.addEventListener("click", (e) => {
  if (targetOperand !== null) {
    targetOperand = targetOperand * -1;
    updateDisplay();
  }
});

percentageBtn.addEventListener("click", (e) => {
  if (targetOperand !== null) {
    targetOperand = targetOperand / 100;
    updateDisplay();
  }
});

equalsBtn.addEventListener("click", (e) => {
  switch (operator) {
    case "+":
      targetOperand = storedOperand + targetOperand;
      break;
    case "-":
      targetOperand = storedOperand - targetOperand;
      break;
    case "x":
      targetOperand = storedOperand * targetOperand;
      break;
    case "/":
      targetOperand = storedOperand / targetOperand;
      break;
    default:
      // If no operator, do nothing
      break;
  }
  operator = null;
  storedOperand = null;
  updateDisplay();
});

clearBtn.addEventListener("click", clearAll);

function clearAll() {
  displayValue = 0;
  targetOperand = null;
  storedOperand = null;
  operator = null;
  updateDisplay();
}

function updateDisplay() {
  if (operator) {
    displayValue = targetOperand !== null ? targetOperand : storedOperand;
  } else {
    displayValue = targetOperand;
  }
  let prettyDisplayVal = prettifyDisplayValue();

  updateActiveClass();
  displayEl.innerText = prettyDisplayVal;
  log();
}

function prettifyDisplayValue() {
  // If value is null, return 0
  if (!displayValue) return "0";

  // If value is very large or very small, return exponential notation
  if (displayValue > 999_999_999 || displayValue < -999_999_999) {
    const fixedDisplayValue = displayValue.toExponential(2);
    return fixedDisplayValue;
  }

  // If value contains decimal, get precision of 12, then remove trailing zeros
  if (displayValue % 1 !== 0) {
    const fixedDisplayValue = displayValue.toPrecision(12);
    const fixedDisplayValueStrArr = fixedDisplayValue.split("");
    const fixedDisplayValueStrArrLength = fixedDisplayValueStrArr.length;
    for (let i = fixedDisplayValueStrArrLength - 1; i >= 0; i--) {
      if (fixedDisplayValueStrArr[i] === "0") {
        fixedDisplayValueStrArr.pop();
      } else if (fixedDisplayValueStrArr[i] === ".") {
        fixedDisplayValueStrArr.pop();
        break;
      } else {
        break;
      }
    }
    const fixedDisplayValueStr = fixedDisplayValueStrArr.join("");
    return fixedDisplayValueStr;
  }

  return displayValue;
}

function updateActiveClass() {
  removeAllActiveClasses();
  if (operator !== null) addActiveClass();
}

function addActiveClass() {
  switch (operator) {
    case "+":
      addBtn.classList.add("active");
      break;
    case "-":
      subtractBtn.classList.add("active");
      break;
    case "x":
      multiplyBtn.classList.add("active");
      break;
    case "/":
      divideBtn.classList.add("active");
      break;
    default:
      throw new Error("Invalid operator");
  }
}

function removeAllActiveClasses() {
  addBtn.classList.remove("active");
  subtractBtn.classList.remove("active");
  multiplyBtn.classList.remove("active");
  divideBtn.classList.remove("active");
}

updateDisplay();

function log() {
  console.clear();
  console.log("displayValue: ", displayValue);
  console.log("targetOperand: ", targetOperand);
  console.log("storedOperand: ", storedOperand);
  console.log("operator: ", operator);
}

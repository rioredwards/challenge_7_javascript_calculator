const displayEl = document.getElementById("display");
const numberBtns = document.querySelectorAll(".number");
const clearBtn = document.getElementById("clear");
const addBtn = document.getElementById("add");
const equalsBtn = document.getElementById("equals");

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
      targetOperand = targetOperand * 10 + parseInt(number);
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

clearBtn.addEventListener("click", clearAll);

function clearAll() {
  displayValue = 0;
  targetOperand = null;
  storedOperand = null;
  operator = null;
  updateDisplay();
}

function updateDisplay() {
  displayValue = targetOperand;
  displayEl.innerText = displayValue || 0;
  log();
}

updateDisplay();

function log() {
  console.clear();
  console.log("displayValue: ", displayValue);
  console.log("targetOperand: ", targetOperand);
  console.log("storedOperand: ", storedOperand);
  console.log("operator: ", operator);
}

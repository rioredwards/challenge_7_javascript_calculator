const displayEl = document.getElementById("display");
const numberBtns = document.querySelectorAll(".number");
const clearBtn = document.getElementById("clear");

let displayValue = 0;
let firstOperand = null;
let secondOperand = null; // Update when an operator is clicked (And then another number is clicked)
let operator = null; // Update when an operator is clicked

numberBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const number = e.target.innerText;
    firstOperand = parseInt(number);
    updateDisplay();
  });
});

clearBtn.addEventListener("click", clearAll);

function clearAll() {
  displayValue = 0;
  firstOperand = null;
  secondOperand = null;
  operator = null;
  updateDisplay();
}

function updateDisplay() {
  displayValue = operator ? secondOperand : firstOperand;
  displayEl.innerText = displayValue || 0;
}

updateDisplay();

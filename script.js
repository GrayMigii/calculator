let state;
let num_1;
let num_2;
let displayContent = '';

const display = document.querySelector('.display');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (func, a, b) => func(a, b);

const refreshDisplay = () => {
    displayContent = '';
    display.textContent = displayContent;
};

const populateDisplay = () => {
    const digits = document.querySelectorAll('.digit');
    display.textContent = displayContent;
    digits.forEach( digit => {
        digit.addEventListener('click', (e) => {
            let textContent = e.target.textContent;
            displayContent += textContent;
            display.textContent = displayContent;
        });
    });
    
};

const calculate = (state, a, b) => {
    switch (state) {
        case 'addition':
            return operate(add, a, b);
            break;
        case 'subtraction':
            return operate(subtract, a, b);
            break;
        case 'multiplication':
            return operate(multiply, a, b);
            break;
        case 'division':
            return operate(divide, a, b);
    }
}

const operators = document.querySelectorAll('.operator');
operators.forEach( operator => {
    operator.addEventListener('click', e => {
        num_1 = +display.textContent;
        refreshDisplay();
        state = e.target.classList.item(0);
    });
});

populateDisplay();

const equals = document.querySelector('.equals');
equals.addEventListener('click', () => {
    num_2 = +display.textContent;
    console.log(num_1, num_2)
    let result = calculate(state, num_1, num_2);
    refreshDisplay();
    displayContent = result;
    display.textContent = displayContent;
    state = undefined;
});
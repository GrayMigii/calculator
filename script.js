let state;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (func, a, b) => func(a, b);

const populateDisplay = () => {
    const digits = document.querySelectorAll('.digit');
    const display = document.querySelector('.display');
    let displayContent = '';
    digits.forEach( btn => {
        btn.addEventListener('click', (e) => {
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

populateDisplay();
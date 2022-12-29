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

populateDisplay();
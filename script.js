let state;
let num_1;
let num_2;
let displayContent = '';
let numbers = [];
let condition = false;

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
            if(condition) refreshDisplay();
            condition = false;
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
};

populateDisplay();

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    refreshDisplay()
    num_1 = undefined;
    num_2 = undefined;
    state = undefined;
    condition = false;
    numbers = [];
});

const operators = document.querySelectorAll('.operator');
operators.forEach( operator => {
    operator.addEventListener('click', e => {
        if(typeof display.textContent === 'string' && display.textContent !== ''){
            num_1 = +display.textContent;
        }else{
            num_1 = display.textContent;
        }
        
        if (display.textContent === '') {
            display.textContent = 'ERROR';
        } else {
            numbers.push(num_1);
            console.log('numbers',numbers);

            if(numbers.length === 1) {
                state = e.target.classList.item(0);
                refreshDisplay();
            }else{
                refreshDisplay();
                console.log('state',state);
                num_2 = numbers.pop();
                num_1 = numbers.pop();
                let result = calculate(state, num_1, num_2);
                if(!Number.isInteger(result)){
                    result = result.toFixed(2);
                }
                displayContent = result;
                display.textContent = displayContent;
                numbers.push(result);
                console.log('numbers after push',numbers);
                condition = true;
                num_1 = result;
                state = e.target.classList.item(0);
            }
        }
    });
});

const equals = document.querySelector('.equals');
equals.addEventListener('click', () => {
    if(typeof display.textContent === 'string' && display.textContent !== ''){
        num_2 = +display.textContent;
    }else{
        num_2 = display.textContent;
    }

    if(!(num_1 && num_2) && (num_1 !== 0 && num_2 !== 0)){
        display.textContent = 'ERROR';
    }else{
        if(num_2 === 0 && state === 'division'){
            display.textContent = 'ERROR';
        }else{
            refreshDisplay();
            console.log(num_1,num_2);
            let result = calculate(state, num_1, num_2);
            if(!Number.isInteger(result)){
                result = result.toFixed(2);
            }
            displayContent = result;
            display.textContent = displayContent;
            state = undefined;
        }
    }
});

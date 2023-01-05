let state;
let num_1;
let num_2;
let display_content = '';
let numbers = [];
let condition = false;
let equals = false;

const display = document.querySelector('.display');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (func, a, b) => func(a, b);

const refreshDisplay = () => {
    display_content = '';
    display.textContent = display_content;
};

const populateDisplay = () => {
    const digits = document.querySelectorAll('.digit');
    display.textContent = display_content;
    digits.forEach( digit => {
        digit.addEventListener('click', (e) => {
            if(condition) refreshDisplay();
            condition = false;
            if (!(e.target.classList.item(0) === 'decimal' && display.textContent.includes('.'))) {
                let textContent = e.target.textContent;
                display_content += textContent;
                display.textContent = display_content;
            }
            if (equals) {
                num_1 = +display.textContent;
                numbers.pop();
            }
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
    equals = false;
    numbers = [];
});

const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', () => {
    console.log(equals);
    if (display.textContent !== 'ERROR') {
        if (equals === false){
            display_content = display.textContent.slice(0, -1);
            display.textContent = display_content;
        }else{
            num_1 = num_1.toString().slice(0, -1);
            if (num_1 !== ''){
                num_1 = +num_1;
            }
            display_content = display_content.toString().slice(0, -1);
            if (display_content !== ''){
                display_content = +display_content;
            }
            display.textContent = display_content;
        }
        console.log('num_1', num_1, 'display_content',display_content);
    }else{
        display.textContent = '';
    }
});

const operators = document.querySelectorAll('.operator');
operators.forEach( operator => {
    operator.addEventListener('click', e => {
        
        if (equals === false) {
            if(typeof display.textContent === 'string' && display.textContent !== ''){
                num_1 = +display.textContent;
            }else{
                num_1 = display.textContent;
            }
        }

        if (display.textContent === '') {
            display.textContent = 'ERROR';
        } else {
            console.log('num1', num_1);

            numbers.push(num_1);

            console.log('numbers',numbers);

            if (equals === true){
                state = e.target.classList.item(0);
                equals = false;
            }

            if (numbers.length === 1) {
                state = e.target.classList.item(0); 
                refreshDisplay();
            } else {
                refreshDisplay();

                console.log('state',state);

                num_2 = numbers.pop();
                num_1 = numbers.pop();
                let result = calculate(state, num_1, num_2);
                if(!Number.isInteger(result)){
                    result = Math.round(result * 100) / 100;
                }
                display_content = result;
                display.textContent = display_content;
                numbers.push(result);

                console.log('numbers after push',numbers);
                condition = true;
                num_1 = result;
                state = e.target.classList.item(0);
            }
        }
    });
});

const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', () => {
    equals = true;
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
                result = Math.round(result * 100) / 100;
            }
            display_content = result;
            display.textContent = display_content;
            numbers.pop();
            console.log(numbers);
            state = undefined;
            num_1 = result;
        }
    }
});

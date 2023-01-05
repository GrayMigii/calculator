let state;
let num_1;
let num_2;
let displayContent = '';
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
            if (!(e.target.classList.item(0) === 'decimal' && display.textContent.includes('.'))) {
                let textContent = e.target.textContent;
                displayContent += textContent;
                display.textContent = displayContent;
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
            displayContent = display.textContent.slice(0, -1);
            display.textContent = displayContent;
        }else{
            num_1 = num_1.toString().slice(0, -1);
            if (num_1 !== ''){
                num_1 = +num_1;
            }
            displayContent = displayContent.toString().slice(0, -1);
            if (displayContent !== ''){
                displayContent = +displayContent;
            }
            display.textContent = displayContent;
        }
        console.log('num_1', num_1, 'display_content',displayContent);
    }else{
        display.textContent = '';
    }
});

const operators = document.querySelectorAll('.operator');
operators.forEach( operator => {
    operator.addEventListener('click', e => {

        // the display shouldn't equal what is on the display if numbers has an item
        
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
                state = e.target.classList.item(0); // this needs to occur before the if in order for the else block to work after an equals operation
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
                displayContent = result;
                display.textContent = displayContent;
                numbers.push(result); // could potentially cause a problem

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
            displayContent = result;
            display.textContent = displayContent;
            numbers.pop();
            //numbers.push(result);
            console.log(numbers);
            state = undefined;
            num_1 = result;
        }
    }
});

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
    numbers = [];
});

const operators = document.querySelectorAll('.operator');
operators.forEach( operator => {
    operator.addEventListener('click', e => {
        /*
        if(numbers.length === 1){
            num_1 = 
        }else{
            num_1 = 
        }*/
        //num_1 = +display.textContent;


        numbers.push(num_1);
        console.log('numbers',numbers);
        state = e.target.classList.item(0);

        if(numbers.length === 1) {
            refreshDisplay();
        }else{
            refreshDisplay();
            console.log('state',state)
            num_2 = numbers.pop();
            num_1 = numbers.pop();
            console.log('numbers after popped',numbers);
            let result = calculate(state, num_1, num_2);
            displayContent = result;
            display.textContent = displayContent;
            numbers.push(result);
            console.log('numbers after push',numbers);
            condition = true;
        }
    });
});

const equals = document.querySelector('.equals');
equals.addEventListener('click', () => {
    num_2 = +display.textContent;
    refreshDisplay();
    console.log(num_1,num_2);
    let result = calculate(state, num_1, num_2);
    displayContent = result;
    display.textContent = displayContent;
    state = undefined;
});

// and two numbers have alredy been chosen the 

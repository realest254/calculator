// Calculator operations functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

// Perform operation based on operator
function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

// Selecting buttons and display
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.screen');

// Variables for calculator state
let operator = '';
let num = '';
let num1 = '';
let num2 = '';
let query = '';

// Handle button clicks
buttons.forEach((button) => {
    const numberAttribute = button.getAttribute('data-number');
    const operatorAttribute = button.getAttribute('data-operator');

    if (numberAttribute !== null) {
        // Handle number button clicks
        button.addEventListener('click', () => {
            let number = button.textContent;
            num = num.concat(number);
            query = query.concat(number);
            display.textContent = num;
        });
    }

    if (operatorAttribute !== null) {
        let content = button.textContent;
        button.addEventListener('click', () => {
            if (content === 'clear') {
                // Clear the calculator
                num = '';
                operator = '';
                query = '';
                display.textContent = '0';
            } else if (content === 'Delete') {
                // Handle deletion of characters
                let queryLen = query.length;
                if (queryLen === 1) {
                    // Reset when only one character is left
                    display.textContent = '0';
                    query = '';
                    num = '';
                } else if (queryLen > 1) {
                    let newQuery = query.slice(0, queryLen - 1);
                    let lastIndex = query[queryLen - 1];
                    let index1 = query.split(operator)[0];
                    let index2 = query.split(operator)[1];

                    if (operator !== '' && !isNaN(parseInt(lastIndex)) && index2.length > 1) {
                        // Handle deletion in the second part of the query
                        let newNum = index2.slice(0, index2.length - 1);
                        query = newQuery;
                        display.textContent = newNum;
                        num = newNum;
                    } else if (operator !== '' && !isNaN(parseInt(lastIndex)) && index2.length === 1) {
                        // Handle deletion of the last character in the second part
                        query = newQuery;
                        display.textContent = index1;
                        num = '';
                    } else if (operator !== '' && isNaN(parseInt(lastIndex))) {
                        // Remove operator if the last character is not a number
                        operator = '';
                        query = newQuery;
                        display.textContent = query;
                        num = query;
                    } else if (operator === '') {
                        // Handle deletion when no operator is present
                        query = newQuery;
                        display.textContent = query;
                        num = query;
                    }
                }
            } else if (content === '+' || content === '-' || content == '*' || content == '/') {
                // Handle operator button clicks
                if (operator === '') {
                    operator = operator.concat(content);
                    query += operator;
                    num = '';
                } else if (operator.length === 1) {
                    // Calculate result if an operator is already present
                    num1 = query.split(operator)[0];
                    num2 = query.split(operator)[1];
                    const result = operate(parseFloat(num1), parseFloat(num2), operator);
                    if (result === Infinity) {
                        // Handle division by zero error
                        display.textContent = 'ERROR';
                        num = '';
                        query = '';
                        operator = '';
                    } else {
                        display.textContent = result;
                        query = result.toString();
                        query = query.concat(content);
                        operator = content;
                        num = '';
                    }
                }
            } else if (content === '=') {
                // Handle equals button click
                if (query !== '') {
                    num1 = query.split(operator)[0];
                    num2 = query.split(operator)[1];
                    const result = operate(parseFloat(num1), parseFloat(num2), operator);
                    if (result === Infinity) {
                        // Handle division by zero error
                        display.textContent = 'ERROR';
                        num = '';
                        query = '';
                        operator = '';
                    } else {
                        display.textContent = result;
                        // Reset values after calculation
                        query = result.toString();
                        operator = '';
                        num = '';
                    }
                } else if (query === '') {
                    // Handle equals when no query is present
                    display.textContent = 'ERROR';
                }
            }
        });
    }
});

function add(num1,num2){
    return num1 + num2;
}

function subtract(num1,num2){
    return num1 - num2;
}

function multiply(num1,num2){
    return num1 * num2;
}

function divide(num1,num2){
    return num1 / num2;
}

//let num1 = +prompt("Enter a number:");
//let operator = prompt("Enter an operator(+ - * /):");
//let num2 = +prompt("Enter a number:");

let result = 0;
operate(num1,num2,operator);

function operate(num1,num2,operator){
    switch(operator){
        case '+':
            result = add(num1,num2);
            break;
        case '-':
            result = subtract(num1,num2);
            break;
        case '*':
            result = multiply(num1,num2);
            break;
        case '/':
            result = divide(num1,num2);
            break
    };
};

console.log(result);
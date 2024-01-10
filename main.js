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

let result = 0;


function operate(num1,num2,operator){
    switch(operator){
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return subtract(num1,num2);
            break;
        case '*':
            return multiply(num1,num2);
            break;
        case '/':
            return divide(num1,num2);
            break
    };
};


const buttons = document.querySelectorAll('button');
const display = document.querySelector('.screen');

let operator = '';
let num = '';
let num1 = '';
let num2 = '';
let query ='';
let queryLength =[query.split(operator)];
display.textcontent = '';
buttons.forEach((button)=>{
    const numberAttribute = button.getAttribute('data-number');
    const operatorAttribute = button.getAttribute('data-operator');
    if (numberAttribute !== null) {
        button.addEventListener('click', () => {
            let number = button.textContent;
            num = num.concat(number);
            query = query.concat(number);
            display.textContent = num;
        });
    }
    console.log(query);
        
    if (operatorAttribute !== null){
        let content = button.textContent;
        button.addEventListener('click',()=>{
            if (content ==='clear'){
                num = '';
                operator = '';
                query = '';
                display.textContent = '0';
                console.log(query);
            }else if (content === 'Delete') {
                let length = query.length;
            
                if (length > 0) {
                    let lastIndex = query[length - 1];
            
                    if (lastIndex === operator) {
                        // If the last character is an operator, remove the operator
                        operator = '';
                    }
            
                    let newQuery = query.slice(0, length - 1);
            
                    if (newQuery.length === 0) {
                        // If the new query is empty, reset display and num
                        display.textContent = '0';
                        num = '';
                    } else {
                        // Check if the last character in the new query is a number
                        if (!isNaN(parseInt(newQuery[newQuery.length - 1]))) {
                            display.textContent = newQuery;
                            num = newQuery;
                        } else if (newQuery[newQuery.length - 1] === operator) {
                            // If the last character is an operator, remove it and update display
                            let newDisplay = newQuery.slice(0, newQuery.length - 1);
                            display.textContent = newDisplay;
                            operator = '';
                        }
                    }
            
                    query = newQuery;
                }
            
                console.log(num);
                console.log(query);
                console.log(operator);
            }else if(content =='+'|| content =='-'||content == '*'|| content == '/'){
                
                if (operator === ''){
                    operator = operator.concat(content);
                    query += operator;
                    num = '';
                }else if (operator.length == 1){
                    num1 = query.split(operator)[0];
                    num2 = query.split(operator)[1];
                    console.log(`num1:${num1}`);
                    console.log(`num2:${num2}`);
                    const result = operate(parseFloat(num1), parseFloat(num2), operator);
                    if(result === Infinity){
                        display.textContent = 'ERROR';
                        num = '';
                        query = '';
                        operator= '';
                    }else{display.textContent = result;
                    query = result.toString();
                    query = query.concat(content);
                    operator = content;
                    
                    num = '';
                    }
                }
                
                console.log(`query : ${query}`);
                console.log(operator);
                            
            }else if(content =='='){
                if (query !== '') {
                    num1 = query.split(operator)[0];
                    num2 = query.split(operator)[1];
                    console.log(num1);
                    console.log(num2);
                    console.log(operator);
                    const result = operate(parseFloat(num1), parseFloat(num2), operator);
                    if(result===Infinity){
                        display.textContent = 'ERROR';
                        num ='';
                        query = '';
                        operator = '';
                    }else{display.textContent = result;
                    // Reset values after calculation
                    query = result.toString();
                    operator = '';
                    num = '';
                    }
                    console.log(query);
                }else if (query === ''){
                    display.textContent = 'ERROR';
                    console.log(query);
                }
            }
        })
        
    }
        
})


let display = document.getElementById("display");
let currentInput = "0";

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.dataset.action;
        
        switch(action) {
            case 'clear':
                currentInput = "0";
                updateDisplay();
                break;
            case 'delete':
                deleteLast();
                break;
            case 'calculate':
                calculate();
                break;
            case 'decimal':
                addDecimal();
                break;
            case 'pi':
                add('Math.PI');
                break;
            case 'percent':
                add('/100');
                break;
            case 'power':
                add('**2');
                break;
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
            case 'ln':
            case 'sqrt':
                add(`${action.toUpperCase()}(`);
                break;
            case 'add':
                add('+');
                break;
            case 'subtract':
                add('-');
                break;
            case 'multiply':
                add('*');
                break;
            case 'divide':
                add('/');
                break;
            case 'open':
                add('(');
                break;
            case 'close':
                add(')');
                break;
            default:
                addNumber(action);
        }
    });
});

function addNumber(num) {
    if (currentInput === "0" || currentInput === "Error") {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function add(symbol) {
    if (currentInput === "0" && symbol !== '.') {
        currentInput = symbol;
    } else {
        currentInput += symbol;
    }
    updateDisplay();
}

function addDecimal() {
    if (currentInput === "0") {
        currentInput = "0.";
    } else if (!currentInput.includes('.')) {
        currentInput += ".";
    }
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") {
        currentInput = "0";
    }
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentInput;
}

function convertExpression(exp) {
    let expression = exp
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/pi/g, "Math.PI")
        .replace(/^2/g, "**2")
        .replace(/÷/g, "/")
        .replace(/×/g, "*");
    
    return expression;
}

function calculate() {
    try {
        if (currentInput === "0" || currentInput === "") {
            return;
        }
        
        let expression = convertExpression(currentInput);
        let result = eval(expression);
        
        // Round to reasonable decimal places
        if (Number.isInteger(result)) {
            currentInput = result.toString();
        } else {
            currentInput = result.toFixed(8).replace(/.?0+$/, '');
        }
        
        updateDisplay();
    } catch (error) {
        currentInput = "Error";
        updateDisplay();
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.') {
        addNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        add(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        currentInput = "0";
        updateDisplay();
    }
});
let runningTotal = 0;
        let buffer = '0';
        let previousOperator = null;

        const screen = document.querySelector('.screen');

        function buttonClick(value) {
            if (isNaN(value)) {
                handleSymbol(value);
            } else {
                handleNumber(value);
            }
            screen.innerText = buffer;
        }

        function handleSymbol(symbol) {
            switch (symbol) {
                case 'C':
                    buffer = '0';
                    runningTotal = 0;
                    previousOperator = null;
                    break;
                case '←':
                    if (buffer.length === 1) {
                        buffer = "0";
                    } else {
                        buffer = buffer.substring(0, buffer.length - 1);
                    }
                    break;
                case '=':
                    if (previousOperator === null) {
                        return;
                    }
                    flushOperation(parseFloat(buffer));
                    previousOperator = null;
                    buffer = runningTotal.toString();
                    runningTotal = 0;
                    break;
                case '÷':
                case '×':
                case '-':
                case '+':
                    handleMath(symbol);
                    break;
            }
        }

        function handleMath(symbol) {
            if (buffer === "0") {
                return;
            }

            const floatBuffer = parseFloat(buffer);

            if (runningTotal === 0) {
                runningTotal = floatBuffer;
            } else {
                flushOperation(floatBuffer);
            }
            previousOperator = symbol;
            buffer = "0";
        }

        function flushOperation(floatBuffer) {
            if (previousOperator === "+") {
                runningTotal += floatBuffer;
            } else if (previousOperator === "-") {
                runningTotal -= floatBuffer;
            } else if (previousOperator === "×") {
                runningTotal *= floatBuffer;
            } else if (previousOperator === "÷") {
                runningTotal /= floatBuffer;
            }
        }

        function handleNumber(numberString) {
            if (buffer === '0') {
                buffer = numberString;
            } else {
                buffer += numberString;
            }
        }

        function init() {
            document.querySelectorAll('.cal-btn').forEach(button => {
                button.addEventListener('click', function(event) {
                    buttonClick(event.target.innerText.trim());
                });
            });
        }

        init();
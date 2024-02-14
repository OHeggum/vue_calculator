<script setup>
import CalculatorDisplay from "@/components/CalculatorDisplay.vue";
import CalculatorLog from "@/components/CalculatorLog.vue";
import CalculatorNumpad from "../components/CalculatorNumpad.vue";
</script>

<template>
    <div class="app-wrapper">
        <div class="calculator-wrapper">
            <CalculatorDisplay id="display" :display_value="display_value" />
            <CalculatorNumpad @numpadClick="handleNumpadBtnClicked" />
        </div>
        <CalculatorLog :log="results" @clearLogLick="handleClearLogBtnClicked" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            previous: 0,
            current: 0,
            operator: null,
            operatorFunction: null,
            operator_active: false,
            display_value: "0",
            sumPressed: false,
            hasComma: false,
            result: 0,
            results: [],
        };
    },
    methods: {
        setPrevious(value) {
            this.previous = this.operatorFunction(
                parseFloat(this.current),
                parseFloat(this.previous),
            );
            this.current = "";
            this.operator_active = true;
            this.displayValue += `${value}`;
            this.hasComma = false;
        },

        checkOperatorActive() {
            if (this.operator_active) {
                alert("Operator already active (" + this.operator + ")");
            }
        },

        handleNumberClicked(value) {
            if (this.displayValue === "0") {
                this.displayValue = `${value}`;
                this.current = value;
            } else {
                this.displayValue += `${value}`;
                this.current += `${value}`;
            }
            this.operator_active = false;
        },

        handleOperatorClicked(value) {
            switch(value) {
                case "+": {
                    this.operator = `${value}`;
                    this.operatorFunction = (a, b) => a+b;
                    this.setPrevious(value);
                    break;
                }
                case "-": {
                    this.operator = `${value}`;
                    this.operatorFunction = (a, b) => a-b;
                    this.setPrevious(value);
                    break;
                }
                case "x": {
                    this.operator = `${value}`;
                    if (this.previous === 0) {
                        this.previous = 1;
                    }
                    this.operatorFunction = (a, b) => a * b;
                    this.setPrevious(value);
                    break;
                }
                case "/": {
                    this.operator = `${value}`;
                    if (this.previous === 0) {
                        this.previous = 1;
                    }
                    this.operatorFunction = (a, b) => a / b;
                    this.setPrevious(value);
                    break;
                }
                case ".": {
                    if (this.hasComma) {
                        break;
                    }
                    this.current = `${this.current}${"."}`;
                    this.displayValue = `${this.displayValue}${"."}`;
                    this.hasComma = true;
                    break;
                }
                case "=": {
                    this.sum();
                    break;
                }
                case "AC": {
                    this.aclear();
                    break;
                }
                case "ANS": {
                    this.ans();
                    break;
                }
                case "DEL": {
                    this.del();
                    break;
                }
            }
        },

        handleNumpadBtnClicked(value) {
            if (this.sumPressed) {
                this.aclear();
                this.sumPressed = false;
            }
            if (typeof value === "number") {
                this.handleNumberClicked(value);
            } else if (typeof value === "string") {
                if (this.operator_active) {
                    return;
                }
                this.handleOperatorClicked(value);
            } else {
                alert("There was an error parsing the value of the button");
                console.log(value);
            }
        },

        handleClearLogBtnClicked() {
            this.results = [];
        },

        aclear() {
            this.previous = 0;
            this.current = 0;
            this.operator = null;
            this.operatorFunction = null;
            this.operator_active = false;
            this.hasComma = false;
            this.displayValue = "0";
        },

        ans() {
            this.current = this.result;
            this.displayValue = `${this.current}`;
        },

        del() {
            if (`${this.displayValue}`.length > 1) {
                this.current = `${this.current}`.substring(0, this.current.length -1);
                this.displayValue = `${this.displayValue}`.substring(
                    0,
                    this.displayValue.length - 1
                );
            } else if (`${this.displayValue}`.length === 1) {
                this.current = 0;
                this.displayValue= "0";
            }
        },

        sum() {
            if (
                (this.previous === 0 || this.current === 0 || this.current === "0") &&
                this.operator === "/"
            ) {
                alert("divison by zero is lunacy.");
                this.aclear();
                return;
            }
            this.result = this.operatorFunction(
                parseFloat(this.previous),
                parseFloat(this.current)
            );
            this.displayValue = `${this.result}`;
            this.sumPressed = true;
            this.result.push(
                `${this.previous} ${this.operator} ${this.current}${" = "}${this.result}`
            );
        },
    },
};
</script>

<style scoped>

@media (width >= 820px) {
    .app-wrapper {
        display: flex;
        flex-flow: row nowrap;
        gap: 10px;
    }
}

@media (width < 820 px) {
    .app-wrapper {
        display: flex;
        flex-flow: column;
        gap: 10px;
    }
}

.calculator-wrapper {
    border-radius: 10px;
    display: flex;
    flex-flow: column;
    width: 400px;
}
</style>
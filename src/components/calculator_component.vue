<template>
    <div class="calculator">
        <div class="display">{{ current || '0' }}</div>
        <div @click="clear" class="button">C</div>
        <div @click="sign" class="button">+/-</div>
        <div @click="percent" class="button">%</div>
        <div @click="divide" class="button operator">/</div>
        <div @click="append('7')" class="button">7</div>
        <div @click="append('8')" class="button">8</div>
        <div @click="append('9')" class="button">9</div>
        <div @click="multiply" class="button operator">*</div>
        <div @click="append('4')" class="button">4</div>
        <div @click="append('5')" class="button">5</div>
        <div @click="append('6')" class="button">6</div>
        <div @click="subtract" class="button operator">-</div>
        <div @click="append(1)" class="button">1</div>
        <div @click="append(2)" class="button">2</div>
        <div @click="append(3)" class="button">3</div>
        <div @click="add" class="button operator">+</div>
        <div @click="append('0')" class="button zero">0</div>
        <div @click="dot" class="button">.</div>
        <div @click="equal" class="button operator">=</div>
        <div class="history">
            <h2>History</h2>
            <ul>
                <li v-for="(calculation, index) in calculation_history.slice().reverse()" :key="index">
                    {{ calculation }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                previous: null,
                current: '',
                operator: null,
                operator_clicked: false,
                calculation_history: [],
            }
        },
        methods: {
            clear() {
                this.current = '';
            },
            sign() {
                this.current = this.current.charAt(0) === '-' ?
                this.current.slice(1) : `-${this.current}`;
            },
            percent() {
                this.current = `${parseFloat(this.current) / 100}`;
            },
            append(number) {
                if(this.operator_clicked) {
                    this.current = '';
                this.operator_clicked = false;
                }
                this.current = `${this.current}${number}`;
            },
            dot() {
                if (this.current.indexOf('.') === -1) {
                    this.append('.');
                }
            },
            set_previous() {
                this.previous = this.current;
                this.operator_clicked = true;
            },
            divide() {
                this.operator = (a, b) => a / b;
                this.set_previous();
            },
            multiply() {
                this.operator = (a, b) => a*b;
                this.set_previous();
            },
            add() {
                this.operator = (a, b) => a+b;
                this.set_previous();
            },
            subtract() {
                this.operator = (a, b) => a - b;
                this.set_previous();
            },
            equal() {
                if (this.operator !== null) {
                    const result = this.operator(
                        parseFloat(this.previous),
                        parseFloat(this.current)
                    );
                    const op_symbol = this.op_symbol_finder();
                    const calc_string = `${this.previous} ${op_symbol} ${this.current} = ${result}`;

                    this.current = `${result}`;
                    this.previous = null;

                    this.add_to_history(calc_string);
                }
            },
            op_symbol_finder() {
                const divideStr = (a, b) => a/b;
                const multiplyStr = (a, b) => a*b;
                const addStr = (a, b) => a+b;
                const subtractStr = (a, b) => a-b;
                console.log(this.operator.toString())

                if (this.operator.toString() === divideStr.toString()) return '/';
                if (this.operator.toString() === multiplyStr.toString()) return '*';
                if (this.operator.toString() === addStr.toString()) return '+';
                if (this.operator.toString() === subtractStr.toString()) return '-';

                return '';
            },
            add_to_history(calculation) {
                this.calculation_history.push(calculation);
                
                if(this.calculation_history.length > 5) {
                    this.calculation_history.shift();
                }
            }
        }
    }

</script>

<style scoped>
.calculator {
  margin: 0 auto;
  width: 400px;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
}

.display {
  grid-column: 1 / 5;
  background-color: #836262;
  color: white;
}

.zero {
  grid-column: 1 / 3;
}

.button {
  background-color: #F2F2F2;
  border: 1px solid #999;
}

.operator {
  background-color: rgb(40, 105, 27);
  color: white;
}

.history {
    margin-top: 20px;
}

.history h2 {
    
    font-size: 18px;
    margin-bottom: 5px;
}

.history ul {
    list-style-type: none;
    padding: 0;
}

.history li {
    
    width: px;
    background-color: darkblue;
    font-size: 14px;
    margin-bottom: 5px;
}
</style>
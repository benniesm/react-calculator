import React, { Component } from 'react';
import './Calc.css';

class Calc extends Component {
  constructor() {
    super();
    this.state = {
      digits: '',
      result: ''
    };
  }

  /*
  * This is the function that evaluates and returns the mathematical value of
  * the expression that is currently displayed on the screen.
  * 'E2' is a syntax console.error(.);
  */
  evaluateExp = (expr) => {
    try {
      return eval(expr);
    }
    catch(e) {
      return 'E2';
    }
  }

  /*
  * This function is called on every key input on the calculator
  */
  inputExp = (key) => {
    let exp = this.state.digits;

    // Add leading zero when the first key input is a decimal point '.'
    if (exp === '' && key === '.') {
      exp = '0';
    }

    // Add leading zero if the first key input is a multiplication or division
    if((exp === '0' || exp === '') && (key === '/' || key === '*')) {
      exp = '0';
    }

    let operand = exp.split(/[*+/-]/);
    let lastOperand = operand[operand.length - 1];

    // Prevent each operand value from having two decimals
    if (key === '.' && lastOperand.includes('.')) {
      return;
    }

    let digit = exp.concat(key);
    let last = exp[exp.length - 1];
    let result = this.state.result;

    // Prevent two operators from following each other, except a minus
    if ((key === '/' || key === '*' || key === '+')
    && (last === '/' || last === '*' || last === '-' || last === '+')) {
      return;
    }

    // Update the value of results once a new operator is added to expression
    if (key !== '/' && key !== '*' && key !== '-' && key !== '+') {
      result = this.evaluateExp(digit);
    }
    this.setState({ digits: digit, result: result });
  }

  /*
  * This function resets the values on the calculator
  */
  clearAll = () => {
    this.setState({ digits: '', result: '' });
  }

  /*
  * The backspace function
  */
  backspaceDigits = () => {
    let digits = this.state.digits;
    let result = this.state.result;
    let newDigits = digits.substring(0, digits.length -1);
    let end = newDigits[newDigits.length -1];
    if (end !== '/' && end !== '*' && end !== '-' && end !== '+') {
      result = this.evaluateExp(newDigits);
    }
    this.setState({ digits: newDigits, result: result });
  }

  /*
  * This function computes other mathematical operations
  */
  numOps = (op) => {
    let currDigits = this.state.digits;
    if (currDigits === '') {
      return;
    }

    let num = parseFloat(this.evaluateExp(currDigits));
    let updateDigits = null;
    switch (op) {
      case 'plusminus':
        num *= -1;
        updateDigits = num.toString();
        break;
      case 'sqrt':
        num = Math.sqrt(num);
        updateDigits = num.toString();
        break;
      case 'cbrt':
        num = Math.cbrt(num);
        updateDigits = num.toString();
        break;
      case 'sqr':
        num  *= num;
        updateDigits = num.toString();
        break;
      case 'inv':
        num = parseFloat(currDigits);
        num = 1 / num;
        updateDigits = '1/' + currDigits;
        break;
      case 'percent':
        let last = currDigits[currDigits.length -1];
        if (currDigits === '' ||
          last === '/' || last === '*' || last === '+' || last === '-') {
          return;
        }

        num = parseFloat(currDigits);
        num = num / 100;
        updateDigits = currDigits.concat('/100');
        break;
      default:
        return;
    }

    this.setState({ digits: updateDigits, result: num });
  }

  /*
  * Function that gets called when the equals sign is pressed.
  */
  calculate = () => {
    let exp = this.state.digits;
    let result = '';
    if (exp !== '') {
      result = this.evaluateExp(exp);
    }
    this.setState({ digits: result.toString(), result: result });
  }

  render() {
    const { state } = this;
    const digitsDisplay = state.digits;
    let resultDisplay = state.result;

    if (resultDisplay > 9999999999999999) {
      resultDisplay = 'E'
    }

    if (resultDisplay < 9999999999999999
      && resultDisplay.toString().length > 16) {
        let wholeResult = resultDisplay.toString().split('.');
        if (wholeResult[0].length <= 15) {
          resultDisplay = resultDisplay.toFixed(15 - wholeResult[0].length);
        }
    }

    return (
      <div className="calc">
        <div className="calcArea">
          <div className="header">
            Arithmetic Calculator
          </div>
          <div className="display">
            <div className="digits">
              { digitsDisplay }
            </div>
            <div className="result">
              { resultDisplay }
            </div>
          </div>
          <div className="keypad">
            <div className="keyrows">
              <button className="keycols" onClick={this.clearAll}>c</button>
              <button className="keycols" onClick={this.backspaceDigits}>
                &larr;
              </button>
              <button
                className="keycols"
                onClick={() => this.numOps('percent')}>
                  %
              </button>
              <button className="keycols" onClick={() => this.numOps('sqr')}>
                x
                <sup style={{ fontSize: '1.0vw' }}>2</sup>
              </button>
            </div>
            <div className="keyrows">
              <button className="keycols" onClick={() => this.numOps('sqrt')}>
                &radic;
              </button>
              <button className="keycols" onClick={() => this.numOps('cbrt')}>
                &#x221B;
              </button>
              <button
                className="keycols"
                style={{ fontSize: '1.5vw' }}
                onClick={() => this.numOps('inv')}>
                  <sup>1</sup>
                  /
                  <sub>x</sub>
              </button>
              <button className="keycols" onClick={() => this.inputExp("/")}>
                /
              </button>
            </div>
            <div className="keyrows">
              <button className="keycols" onClick={() => this.inputExp("7")}>
                7
              </button>
              <button className="keycols" onClick={() => this.inputExp("8")}>
                8
              </button>
              <button className="keycols" onClick={() => this.inputExp("9")}>
                9
              </button>
              <button className="keycols" onClick={() => this.inputExp("*")}>
                x
              </button>
            </div>
            <div className="keyrows">
              <button className="keycols" onClick={() => this.inputExp("4")}>
                4
              </button>
              <button className="keycols" onClick={() => this.inputExp("5")}>
                5
              </button>
              <button className="keycols" onClick={() => this.inputExp("6")}>
                6
              </button>
              <button className="keycols" onClick={() => this.inputExp("-")}>
                -
              </button>
            </div>
            <div className="keyrows">
              <button className="keycols" onClick={() => this.inputExp("1")}>
                1
              </button>
              <button className="keycols" onClick={() => this.inputExp("2")}>
                2
              </button>
              <button className="keycols" onClick={() => this.inputExp("3")}>
                3
              </button>
              <button className="keycols" onClick={() => this.inputExp("+")}>
                +
              </button>
            </div>
            <div className="keyrows">
              <button
                className="keycols"
                onClick={() => this.numOps('plusminus')}>
                  &plusmn;
                </button>
              <button className="keycols" onClick={() => this.inputExp("0")}>
                0
              </button>
              <button className="keycols" onClick={() => this.inputExp(".")}>
                .
              </button>
              <button className="keycols" onClick={() => this.calculate()}>
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calc;

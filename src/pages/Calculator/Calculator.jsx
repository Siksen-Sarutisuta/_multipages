import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [isClearedOnce, setIsClearedOnce] = useState(false);
  const [lastOperation, setLastOperation] = useState('');
  const [lastResult, setLastResult] = useState(0);
  const [isFirstOperation, setIsFirstOperation] = useState(true);

  const operators = ['+', '-', '*', '/'];

  const appendToDisplay = (value) => {
    const lastChar = display.slice(-1);

    // Check if the input is an operator
    if (operators.includes(value)) {
      if (!isFirstOperation) {
        calculate(); // Calculate the current expression before appending the new operator
      }

      if (operators.includes(lastChar)) {
        return; // Prevent multiple operators in a row
      }

      setLastOperation(value);
      setIsFirstOperation(false);
    }

    // Extract the last number to check its length
    let lastNumber = display.split(/([+\-*/])/).pop().replace(/\s+/g, '');

    if (!operators.includes(value) && lastNumber.length >= 9) {
      return; // Ignore further input if the last number is already 9 digits
    }

    const newDisplay = display + value;
    setDisplay(formatDisplay(newDisplay));
    setIsClearedOnce(false);
  };

  const formatDisplay = (value) => {
    let parts = value.split(/([+\-*/])/);

    parts = parts.map(part => {
      if (!operators.includes(part)) {
        return part.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      }
      return part;
    });

    return parts.join('');
  };

  const handleClear = () => {
    if (display === '') return;

    if (isClearedOnce) {
      allClearDisplay();
    } else {
      let lastOperatorIndex = Math.max(
        display.lastIndexOf('+'),
        display.lastIndexOf('-'),
        display.lastIndexOf('*'),
        display.lastIndexOf('/')
      );

      if (lastOperatorIndex === -1) {
        allClearDisplay();
      } else {
        setDisplay(display.slice(0, lastOperatorIndex + 1));
      }

      setIsClearedOnce(true);
    }
  };

  const allClearDisplay = () => {
    setDisplay('');
    setLastOperation('');
    setLastResult(0);
    setIsFirstOperation(true);
    setIsClearedOnce(false);
  };

  const calculate = () => {
    if (display) {
      try {
        const result = Function('"use strict";return (' + display.replace(/\s+/g, '') + ')')();
        setDisplay(formatDisplay(result.toString()));
        setLastResult(result);
        setIsFirstOperation(false);
      } catch (error) {
        setDisplay('Error');
      }
    }
    setIsClearedOnce(false);
  };

  const checkKeyboard = (event) => {
    if (event.key === 'Enter') {
      calculate();
    } else if (event.key === 'Backspace') {
      handleClear();
    } else if (event.key === 'Escape') {
      allClearDisplay();
    } else if (!isNaN(event.key) || operators.includes(event.key)) {
      appendToDisplay(event.key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', checkKeyboard);
    return () => {
      document.removeEventListener('keydown', checkKeyboard);
    };
  }, [display]);

  return (
    <div className="calculator">
      <input type="text" id="display" value={display} disabled />
      <div className="buttons">
        <button className="clear" onClick={handleClear}>CE</button>
        <button onClick={() => appendToDisplay('/')}>/</button>
        <button onClick={() => appendToDisplay('*')}>*</button>
        <button onClick={() => appendToDisplay('+')}>+</button>
        <button onClick={() => appendToDisplay('7')}>7</button>
        <button onClick={() => appendToDisplay('8')}>8</button>
        <button onClick={() => appendToDisplay('9')}>9</button>
        <button onClick={() => appendToDisplay('-')}>-</button>
        <button onClick={() => appendToDisplay('4')}>4</button>
        <button onClick={() => appendToDisplay('5')}>5</button>
        <button onClick={() => appendToDisplay('6')}>6</button>
        <button onClick={() => appendToDisplay('.')}>.</button>
        <button onClick={() => appendToDisplay('1')}>1</button>
        <button onClick={() => appendToDisplay('2')}>2</button>
        <button onClick={() => appendToDisplay('3')}>3</button>
        <button onClick={() => appendToDisplay('0')}>0</button>
        <button className="equal" onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;

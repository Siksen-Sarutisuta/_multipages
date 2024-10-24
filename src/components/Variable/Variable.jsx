import React from 'react';
import "./Variable.css";

function Variable({type, name, value, setValue }) {
    return (
        <div className="counter-wrapper">
            <h3 className="counter-title">{name}</h3>
            <button
                className="counter-button counter-dec"
                onClick={() => setValue(value - 1)} // Decrease the value
            >
                -
            </button>
            <span className="counter-value">{type && type === 'int' ? value : value.toFixed(2)}</span>
            <button
                className="counter-button counter-inc"
                onClick={() => setValue(value + 1)} // Increase the value
            >
                +
            </button>
        </div>
    );
}

export default Variable;

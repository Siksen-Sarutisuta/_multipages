import { useState } from 'react';
import './Counter.css';

function Counter(props) {
    const [value, setValue] = useState(0);

    function inc() {
        setValue(value + 1);
    }

    function dec() {
        setValue(value - 1);
    }


    return (
        <div className= 'counter-wrapper'>
            <h3 className = 'counter-title'>{props.name}</h3>
            <button className='counter-button counter-dec' onClick={dec}>-</button>
            <span className='counter-value'>{value}</span>
            <button className='counter-button counter-inc' onClick={inc}>+</button>
        </div>
    );
}

export default Counter;

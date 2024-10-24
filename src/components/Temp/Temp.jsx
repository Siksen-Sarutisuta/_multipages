import React, { useState } from 'react';
import Variable from '../Variable/Variable';
import './temp.css';

function Temp() {
    const [Celsius, setCelsius] = useState(25);
    const [Fahrenheit, setFahrenheit] = useState(77);
    const [Kelvin, setKelvin] = useState(298.15);

    // Function Fahrenheit and Kelvin
    const handleCelsiusChange = (newCelsius) => {
        const newFahrenheit = (newCelsius * 9/5) + 32;
        const newKelvin = newCelsius + 273.15;
        setCelsius(newCelsius);
        setFahrenheit(newFahrenheit);
        setKelvin(newKelvin);
    };

    // Function Celsius and Kelvin
    const handleFahrenheitChange = (newFahrenheit) => {
        const newCelsius = (newFahrenheit - 32) * 5/9;
        const newKelvin = newCelsius + 273.15;
        setFahrenheit(newFahrenheit);
        setCelsius(newCelsius);
        setKelvin(newKelvin);
    };

    // Function Celsius and Fahrenheit
    const handleKelvinChange = (newKelvin) => {
        const newCelsius = newKelvin - 273.15;
        const newFahrenheit = (newCelsius * 9/5) + 32;
        setKelvin(newKelvin);
        setCelsius(newCelsius);
        setFahrenheit(newFahrenheit);
    };

    return ( 
        <div className='Temp-container'>
            <h3 className='Temp-title'>Temperature</h3>
            <h3 className='Temp-display'>
                <span className='badge bg-primary'>{Celsius.toFixed(2)}°C</span>
                <span className='badge bg-primary'>{Fahrenheit.toFixed(2)}°F</span> 
                <span className='badge bg-primary'>{Kelvin.toFixed(2)}K</span>
            </h3>
            <div className='Temp-variables'>
                <Variable type='float' name={'Celsius'} value={Celsius} setValue={handleCelsiusChange} />
                <Variable type='float' name={'Fahrenheit'} value={Fahrenheit} setValue={handleFahrenheitChange} />
                <Variable type='float' name={'Kelvin'} value={Kelvin} setValue={handleKelvinChange} />
            </div>
        </div>
    );
}

export default Temp;

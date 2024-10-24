import React, { useState, useEffect } from "react";
import "./Animation.css";

// Import the images
import woodImage from "../../IMG/wood-1866654_1280.jpg";
import basketballImage from "../../IMG/png-transparent-basketball-illustration-basketball-sports-equipment-sports-league-woodville-tompkins-institute-basketball-sport-orange-team-thumbnail.png";
import footballImage from "../../IMG/41932.jpg";
import volleyballImage from "../../IMG/png-clipart-volleyball-jpeg-volleyball-team-volleyball-thumbnail.png";
import humanImage from "../../IMG/438051564_1218873432408257_6568321225370464418_n.jpg";
import cartoonImage from "../../IMG/CCat.png";
import logoImage from "../../IMG/Group.png";

const fieldWidth = 750;
const fieldHeight = 400;
const diameter = 100;
const maxLeft = fieldWidth - diameter - 2;
const maxTop = fieldHeight - diameter - 2;
const vx = 5;
const vy = 5;

function Animation() {
  const [running, setRunning] = useState(false);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [x, setX] = useState(fieldWidth / 2 - diameter / 2);
  const [y, setY] = useState(fieldHeight / 2 - diameter / 2);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [spinSpeed, setSpinSpeed] = useState(0.1);
  const [spinDirection, setSpinDirection] = useState(1);
  const [ballBackground, setBallBackground] = useState("none");
  const [selectedButton, setSelectedButton] = useState("none");

  const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

  const changeSpinSpeedAndDirection = () => {
    setSpinSpeed(getRandomFloat(15.0, 1.0));
    setSpinDirection(Math.random() > 0.5 ? 1 : -1);
  };

  const toggleRunning = () => {
    setRunning(!running);
  };

  const calculate = () => {
    let newX = x;
    let newY = y;
    let directionX = goRight;
    let directionY = goDown;

    if (goRight) {
      newX += vx;
      if (newX >= maxLeft) {
        directionX = false;
        changeSpinSpeedAndDirection();
      }
    } else {
      newX -= vx;
      if (newX <= 0) {
        directionX = true;
        changeSpinSpeedAndDirection();
      }
    }

    if (goDown) {
      newY += vy;
      if (newY >= maxTop) {
        directionY = false;
        changeSpinSpeedAndDirection();
      }
    } else {
      newY -= vy;
      if (newY <= 0) {
        directionY = true;
        changeSpinSpeedAndDirection();
      }
    }

    setX(newX);
    setY(newY);
    setGoRight(directionX);
    setGoDown(directionY);
    setCurrentAngle((prevAngle) => prevAngle + spinSpeed * spinDirection);
  };

  useEffect(() => {
    if (running) {
      const interval = setInterval(calculate, 25);
      return () => clearInterval(interval);
    }
  }, [running, x, y]);

  return (
    <div id="container">
      <div id="field" style={{ backgroundImage: `url(${woodImage})` }}>
        <div
          id="ball"
          style={{
            left: x + "px",
            top: y + "px",
            transform: `rotate(${currentAngle}deg)`,
            backgroundImage: ballBackground,
            backgroundSize:
              selectedButton === "football" || selectedButton === "basketball"
                ? "150%"
                : "100%", // Apply 150% for football and basketball, 100% for others
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <div id="control">
        <button
          id="run"
          className={`btn ${running ? "btn-danger" : "btn-success"}`}
          onClick={toggleRunning}
        >
          <span className={`bi bi-${running ? "pause" : "play"}`}>
            &nbsp;{running ? "PAUSE" : "RUN"}
          </span>
        </button>
        <button
          id="none"
          className={`btn ${
            selectedButton === "none" ? "btn-primary" : "btn-light"
          }`}
          onClick={() => {
            setBallBackground("none");
            setSelectedButton("none");
          }}
        >
          None
        </button>
        <button
          id="basketball"
          className={`btn ${
            selectedButton === "basketball" ? "btn-primary" : "btn-light"
          }`}
          onClick={() => {
            setBallBackground(`url(${basketballImage})`);
            setSelectedButton("basketball");
          }}
        >
          Basketball
        </button>
        <button
          id="football"
          className={`btn ${
            selectedButton === "football" ? "btn-primary" : "btn-light"
          }`}
          onClick={() => {
            setBallBackground(`url(${footballImage})`);
            setSelectedButton("football");
          }}
        >
          Football
        </button>
        <button
          id="volleyball"
          className={`btn ${
            selectedButton === "volleyball" ? "btn-primary" : "btn-light"
          }`}
          onClick={() => {
            setBallBackground(`url(${volleyballImage})`);
            setSelectedButton("volleyball");
          }}
        >
          Volleyball
        </button>
        <button
          id="human"
          className={`btn ${
            selectedButton === "human" ? "btn-primary" : "btn-light"
          }`}
          onClick={() => {
            setBallBackground(`url(${humanImage})`);
            setSelectedButton("human");
          }}
        >
          Human
        </button>
        <button
          id="cartoon"
          className={`btn ${
            selectedButton === "cartoon" ? "btn-primary" : "btn-light"
          }`}
          onClick={() => {
            setBallBackground(`url(${cartoonImage})`);
            setSelectedButton("cartoon");
            set;
          }}
        >
          Cartoon
        </button>
        <button
          id="logo"
          className={`btn ${
            selectedButton === "logo" ? "btn-primary" : "btn-light"
          }`}
          onClick={() => {
            setBallBackground(`url(${logoImage})`);
            setSelectedButton("logo");
          }}
        >
          Logo
        </button>
      </div>
    </div>
  );
}

export default Animation;

import { useState, useEffect } from "react";

function Timer() {
  const TOTAL_SECONDS = 3 * 24 * 60 * 60;
  
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Convert seconds to dynamic time format based on the current value
  function formatTime(seconds) {
    const MINUTE_SECONDS = 60;
    const HOUR_SECONDS = 60 * MINUTE_SECONDS;
    const DAY_SECONDS = 24 * HOUR_SECONDS;

    const days = Math.floor(seconds / DAY_SECONDS);
    const hours = Math.floor((seconds % DAY_SECONDS) / HOUR_SECONDS);
    const minutes = Math.floor((seconds % HOUR_SECONDS) / MINUTE_SECONDS);
    const secs = seconds % MINUTE_SECONDS;

    // Determine what to display based on the value of seconds
    if (seconds < MINUTE_SECONDS) {
      return `${secs}s`;
    } else if (seconds < HOUR_SECONDS) {
      return `${minutes}m ${secs}s`;
    } else if (seconds < DAY_SECONDS) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else {
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    }
  }

  function toggleRunning() {
    setRunning(!running);
  }

  function resetTimer() {
    setSeconds(0); // Reset to 0 seconds
    setRunning(false);
  }

  // Timer logic with setInterval
  useEffect(() => {
    let interval = null;
    if (running && seconds < TOTAL_SECONDS) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1); // Increment seconds
      }, 1000);
    } else if (!running || seconds >= TOTAL_SECONDS) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, seconds]);

  return (
    <div className="timer-container">
      <h3 className="timer-title">Timer</h3>
      <p>
        <input className="timer-display" value={formatTime(seconds)} readOnly />
      </p>
      <div className="timer-buttons">
        <button className="btn btn-danger" onClick={resetTimer}>
          Reset
        </button>
        <button
          className={`btn ${running ? "btn-warning" : "btn-success"}`}
          onClick={toggleRunning}
        >
          {running ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}

export default Timer;

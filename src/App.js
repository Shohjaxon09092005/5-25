import React, { useState } from "react";
import './App.css'
const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
    setIsRunning(false);
    clearInterval(intervalId);
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            const beep = document.getElementById("beep");
            beep.play();
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              return breakLength * 60;
            } else {
              setTimerLabel("Session");
              return sessionLength * 60;
            }
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const handleIncrement = (type) => {
    if (type === "break" && breakLength < 60) {
      setBreakLength((prev) => prev + 1);
    } else if (type === "session" && sessionLength < 60) {
      setSessionLength((prev) => prev + 1);
      if (timerLabel === "Session") {
        setTimeLeft((prev) => prev + 60);
      }
    }
  };

  const handleDecrement = (type) => {
    if (type === "break" && breakLength > 1) {
      setBreakLength((prev) => prev - 1);
    } else if (type === "session" && sessionLength > 1) {
      setSessionLength((prev) => prev - 1);
      if (timerLabel === "Session") {
        setTimeLeft((prev) => prev - 60);
      }
    }
  };

  return (
    <div className="app">
      <h1>25 + 5 Clock</h1>
      <div className="length-controls">
        <div>
          <h2 id="break-label">Break Length</h2>
          <button id="break-decrement" onClick={() => handleDecrement("break")}>
            -
          </button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => handleIncrement("break")}>
            +
          </button>
        </div>
        <div>
          <h2 id="session-label">Session Length</h2>
          <button id="session-decrement" onClick={() => handleDecrement("session")}>
            -
          </button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => handleIncrement("session")}>
            +
          </button>
        </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">{timerLabel}</h2>
        <span id="time-left">{formatTime(timeLeft)}</span>
      </div>
      <div className="controls">
        <button id="start_stop" onClick={handleStartStop}>
          Start/Stop
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <audio id="beep" src="https://pixabay.com/sound-effects/search/clock%20clock/"></audio>
    </div>
  );
};

export default App;

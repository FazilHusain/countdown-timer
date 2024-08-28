import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "mins") {
      setMins(value);
    } else if (id === "secs") {
      setSecs(value);
    }
  };

  const handleStart = () => {
    if( secs <=0  || mins < 0 || hours < 0){
      alert("Invalid Input")
    }else{
      setIsStart(true);
    }
  };
  const handlePause = () => {
    setIsPause(true);
    clearInterval(timerId);
  };
  const handleReset = () => {
    setIsStart(false);
    setHours(0);
    setMins(0);
    setSecs(0);
    clearInterval(timerId)
  };
  const handleResume = () => {
    setIsPause(false);
    runTimer(hours, mins, secs)
  };
  

  const runTimer = () => {
   if(secs > 0){
    setSecs((s) => s-1)
   }
   else if (secs===0 && mins > 0){
    setMins((m) => m-1);
    setSecs(59);
   }
   else if ( mins === 0 && hours > 0){
    setHours((h) => h-1);
    setMins(59);
    setSecs(59);
   } 
  }

  useEffect(() => {
   let tid;
   if(isStart){
    tid = setInterval(() => {
      runTimer(hours, mins, secs, tid);
    },1000)
    setTimerId(tid)
   }
   
   return() => {
    clearInterval(tid);
   }
  
  },[isStart, hours, mins, secs])

  return (
    <div className="App">
       <h1>Countdown Timer</h1>
      {!isStart && (
        <div className="input-container">
          <div className="input-box">
            <input onChange={handleChange} id="hours" placeholder="HH" />
            <input onChange={handleChange} id="mins" placeholder="MM" />
            <input onChange={handleChange} id="secs" placeholder="SS" />
          </div>
          <button className="timer-button" onClick={handleStart}>
            Start
          </button>
        </div>
      )}
      {isStart && (
        <div className="input-container">
          <div className="timer-box">
            <div>{hours < 10 ? `0${hours}` : `${hours}`}</div>
            <span>:</span>
            <div>{mins <10 ? `0${mins}` : `${mins}`}</div>
            <span>:</span>
            <div>{secs <10 ? `0${secs}` : `${secs}`}</div>
          </div>
          {!isPause && (
            <button className="timer-pause" onClick={handlePause}>
              Pause
            </button>
          )}
          {isPause && (
            <button className="timer-resume" onClick={handleResume}>
              Resume
            </button>
          )}
          <button className="timer-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

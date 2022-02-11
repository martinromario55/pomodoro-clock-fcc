import { Button } from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Break from './components/Break'
import Session from './components/Session'
import React, { useState } from 'react'
import TimeLeft from './components/TimeLeft'
import { useEffect, useRef } from 'react'

function App() {
  const audioElement = useRef(null)
  const [sessionLength, setSessionLength] = useState(60 * 25)
  const [breakLength, setBreakLength] = useState(300)
  const [intervalId, setIntervalId] = useState(null)
  const [currentSessionType, setCurrentSessionType] = useState('Session')
  const [timeLeft, setTimeLeft] = useState(sessionLength)

  useEffect(() => {
    setTimeLeft(sessionLength)
  }, [sessionLength])

  useEffect(() => {
    if (timeLeft === 0) {
      audioElement.current.play()
      if (currentSessionType === 'Session') {
        setCurrentSessionType('Break')
        setTimeLeft(breakLength)
      } else if (currentSessionType === 'Break') {
        setCurrentSessionType('Session')
        setTimeLeft(sessionLength)
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeLeft])

  const isStarted = intervalId !== null

  const handleStartStopClick = () => {
    if (isStarted) {
      clearInterval(intervalId)
      setIntervalId(null)
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
      }, 100)
      setIntervalId(newIntervalId)
    }
  }

  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength)
    }
  }

  const incrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength + 60
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength)
    }
  }

  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60

    if (newSessionLength > 0) {
      setSessionLength(newSessionLength)
    }
  }

  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60
    if (newSessionLength <= 60 * 60) {
      setSessionLength(newSessionLength)
    }
  }

  const handleResetButtonClick = () => {
    clearInterval(intervalId)

    setIntervalId(null)

    setCurrentSessionType('Session')

    setSessionLength(60 * 25)

    setBreakLength(60 * 5)

    setTimeLeft(60 * 25)

    audioElement.current.load()
  }

  return (
    <div className="row text-center justify-content-center align-items-md-center">
      <Break
        breakLength={breakLength}
        decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
        incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
      />
      <TimeLeft
        breakLength={breakLength}
        timerLabel={currentSessionType}
        handleStartStopClick={handleStartStopClick}
        startStopButtonLabel={isStarted ? 'Stop' : 'Start'}
        timeLeft={timeLeft}
        sessionLength={sessionLength}
      />
      <Session
        sessionLength={sessionLength}
        decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
        incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
      />
      <span className="col-12">
        <button
          className="btn btn-warning m-4"
          id="reset"
          onClick={handleResetButtonClick}
        >
          Reset
        </button>
      </span>
      <audio id="beep" ref={audioElement}>
        <source
          src="https://onlineclock.net/audio/options/default.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  )
}

export default App

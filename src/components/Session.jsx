import React from 'react'
import moment from 'moment'

const Session = ({
  sessionLength,
  decrementSessionLengthByOneMinute,
  incrementSessionLengthByOneMinute,
}) => {
  const sessionLengthInMinutes = moment.duration(sessionLength, 's').asMinutes()

  return (
    <div className="row text-center">
      <p className="h3 mt-3" id="session-label">
        Session
      </p>
      <p className="display-4 mark" id="session-length">
        {sessionLengthInMinutes}
      </p>

      <button
        className="btn btn-danger"
        id="session-decrement"
        onClick={decrementSessionLengthByOneMinute}
      >
        -
      </button>
      <button
        className="btn btn-success mt-2"
        id="session-increment"
        onClick={incrementSessionLengthByOneMinute}
      >
        +
      </button>
    </div>
  )
}

export default Session

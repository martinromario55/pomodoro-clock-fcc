import React from 'react'
import moment from 'moment'

const Break = ({
  breakLength,
  decrementBreakLengthByOneMinute,
  incrementBreakLengthByOneMinute,
}) => {
  const breakLengthInMinutes = moment.duration(breakLength, 's').asMinutes()

  return (
    <div className="row text-center mt-2">
      <h1 className="text-info bg-secondary p-1">25 + 5 Clock</h1>
      <p className="h3" id="break-label">
        Break
      </p>
      <p className="display-4 mark" id="break-length">
        {breakLengthInMinutes}
      </p>

      <button
        className="btn btn-danger"
        id="break-decrement"
        onClick={decrementBreakLengthByOneMinute}
      >
        -
      </button>
      <button
        className="btn btn-success mt-2"
        id="break-increment"
        onClick={incrementBreakLengthByOneMinute}
      >
        +
      </button>
    </div>
  )
}

export default Break

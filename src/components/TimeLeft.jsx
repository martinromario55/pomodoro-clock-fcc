import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

const TimeLeft = ({
  handleStartStopClick,
  timerLabel,
  startStopButtonLabel,
  timeLeft,
}) => {
  const formattedTimeLeft = moment
    .duration(timeLeft, 's')
    .format('mm:ss', { trim: false })

  return (
    <div className="row text-center">
      <p className="h3 mt-3" id="timer-label">
        {timerLabel}
      </p>
      <p className="display-4 mark" id="time-left">
        {formattedTimeLeft}
      </p>
      <button
        className="btn btn-primary"
        id="start_stop"
        onClick={handleStartStopClick}
      >
        {startStopButtonLabel}
      </button>
    </div>
  )
}

export default TimeLeft

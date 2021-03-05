const Timer = require("./classes/Timer")

// the function it's the main function, that will use a Real Timer
function throttle(fun, throttleTimer) {
  const timer = new Timer()
  return throttleWithTimer(fun, throttleTimer, timer)
}

function throttleWithTimer(fun, throttleTime, timer) {
  let firstInvocation = true
  return () => {
    if (throttleTime <= 0) {
      fun()
      return
    }
    if (firstInvocation) {
      firstInvocation = false
      fun()
      timer.start(throttleTime)
      return
    }
    if (timer.isExpired()) {
      fun()
      timer.start(throttleTime)
    }
  }
}

module.exports = { throttle, throttleWithTimer }
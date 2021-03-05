function throttle(fun, throttleTime) {
  let firstInvocation = true
  return () => {
    if (throttleTime <= 0) {
      fun()
      return
    }
    if (firstInvocation) {
      firstInvocation = false
      fun()
    }
  }
}

module.exports = { throttle }
class MockTimer {
  constructor() {
    this.ticks = 0
    this.timeout = 0
  }

  tick(numberOfTicks) {
    this.ticks += numberOfTicks ? numberOfTicks : 1
  }

  isExpired() {
    return this.ticks >= this.timeout
  }

  start(timeout) {
    this.timeout = timeout
    this.ticks = 0
  }
}

module.exports = MockTimer
class Timer {
  constructor() {
    this.expired = true
    this.running = false
  }

  isExpired() {
    return this.expired
  }

  start(timeout) {
    if (this.running) {
      return new Error('timer is already running')
    }
    this.expired = false
    this.running = true
    setTimeout(() => {
      this.expired = true
      this.running = false
    }, timeout);
  }
}

module.exports = Timer
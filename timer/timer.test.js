const { describe, it } = require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const { throttle, throttleWithTimer } = require('./timer')
const MockTimer = require('./classes/MockTimer')
const Timer = require('./classes/Timer')

describe('throttle suite', () => {

  const runFun = (throttlePeriod) => {
    it('Runs the function \'every\' time we call it', () => {
      let count = 0
      const calls = 10
      const fun = () => count++
      const funT = throttle(fun, throttlePeriod)

      for (let index = 0; index < calls; index++) {
        funT()
      }
      expect(count).to.be.equal(calls)
    })
  }

  describe('Given the throttle time is 0', () => runFun(0))

  describe('Given the throttle period is negative', () => runFun(-10))

  describe('Given the throttle period is positive', () => {
    const THROTTLE_PERIOD = 60000

    describe('When the throttle period has not passed', () => {
      it('Then `fun` is not called', () => {
        let count = 0
        const timer = new MockTimer()
        const fun = () => count++
        const funT = throttle(fun, THROTTLE_PERIOD, timer)

        funT()
        expect(count).to.be.equal(1)
        funT()
        expect(count).to.be.equal(1)
      })
    })

    describe('When the throttle period has passed', () => {
      it('Then `fun` is called', () => {
        let count = 0
        const timer = new MockTimer()
        const fun = () => count++
        // const funT = throttleWithTimer(fun, THROTTLE_PERIOD, timer)
        const funT = throttle(fun, THROTTLE_PERIOD)
        const clock = sinon.useFakeTimers(funT.timer)

        funT()
        expect(count).to.be.equal(1)

        // timer.tick(THROTTLE_PERIOD) # use timer when testing throttleWithTimer
        clock.tick(THROTTLE_PERIOD)
        funT()
        expect(count).to.be.equal(2)

        // timer.tick(THROTTLE_PERIOD - 1000)
        clock.tick(THROTTLE_PERIOD - 1000)
        funT()
        expect(count).to.be.equal(2)

        // timer.tick(1000)
        clock.tick(1000)
        funT()
        expect(count).to.be.equal(3)

        for (let i = 0; i < 59; i++) {
          // timer.tick(1000)
          clock.tick(1000)
          funT()
          expect(count).to.be.equal(3)
        }

        // timer.tick(1000)
        clock.tick(1000)
        funT()
        expect(count).to.be.equal(4)
      })
    })
  })
})
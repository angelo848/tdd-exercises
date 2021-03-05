const { describe, it } = require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const { throttle } = require('./timer')

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
    describe('When the throttle period has not passed', () => {
      it('Then `fun` is not called', () => {
        let count = 0
        const fun = () => count++
        const funT = throttle(fun, 60000)

        funT()
        expect(count).to.be.equal(1)
        funT()
        expect(count).to.be.equal(1)
      })
    })
  })
})
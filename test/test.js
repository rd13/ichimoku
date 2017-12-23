const Ichimoku = require('../lib/index.js')
const candles = require('./data.js')
const assert = require('chai').assert;
const expect = require('chai').expect;

describe('Ichimoku', () => {
	const ichimoku = new Ichimoku({conversionPeriod: 9, basePeriod: 26, spanPeriod: 52, values: []})

	var ichimokuValue = {}
	var ichimokuValues = []

	beforeEach(() => {
		for( let candle of candles ) {
			ichimokuValues.push(
				ichimoku.nextValue({
					high  : candle.mid.h,
					low   : candle.mid.l,
					close : candle.mid.c
				})
			)
		}

		ichimokuValue = ichimokuValues.slice(-1).pop()
		ichimokuValues = ichimokuValues.slice(-10)

  })

	it('should return a conversion line', () => {
		expect(ichimokuValue).to.contain.key('conversion')
	})

	it('should return a base line', () => {
		expect(ichimokuValue).to.contain.key('base')
	})

	it('should return a Span A line', () => {
		expect(ichimokuValue).to.contain.key('spanA')
	})

	it('should return a Span B line', () => {
		expect(ichimokuValue).to.contain.key('spanB')
	})

	it('should calculate the correct line values', () => {
		expect(ichimokuValues).to.deep.equal([
				{
						conversion: 1.3393,
						base: 1.33666,
						spanA: 1.3376,
						spanB: 1.33744
				},
				{
						conversion: 1.33921,
						base: 1.33666,
						spanA: 1.33748,
						spanB: 1.33744
				},
				{
						conversion: 1.33899,
						base: 1.33666,
						spanA: 1.33752,
						spanB: 1.33744
				},
				{
						conversion: 1.33899,
						base: 1.33666,
						spanA: 1.33759,
						spanB: 1.33736
				},
				{
						conversion: 1.339,
						base: 1.33668,
						spanA: 1.33783,
						spanB: 1.33736
				},
				{
						conversion: 1.33956,
						base: 1.33723,
						spanA: 1.33791,
						spanB: 1.33736
				},
				{
						conversion: 1.33956,
						base: 1.33723,
						spanA: 1.33791,
						spanB: 1.33736
				},
				{
						conversion: 1.33956,
						base: 1.33723,
						spanA: 1.33771,
						spanB: 1.33736
				},
				{
						conversion: 1.33982,
						base: 1.3375,
						spanA: 1.33771,
						spanB: 1.33716
				},
				{
						conversion: 1.33982,
						base: 1.3375,
						spanA: 1.33811,
						spanB: 1.33709
				}
			])
	})
})

class Ichimoku {
	constructor(input) {
		let _this = this

		this.defaults = {
			conversionPeriod : 9,
			basePeriod       : 26,
			spanPeriod       : 52,
			displacement     : 26
		}

		// Overwrite param defaults
		this.params = Object.assign({}, this.defaults, input)

		this.generator = (function* () {
			let result
			let tick

			let period = Math.max(_this.params.conversionPeriod, _this.params.basePeriod, _this.params.spanPeriod, _this.params.displacement)
			let periodCounter = 0
			let spanCounter = 0
			let highs = []
			let lows = []
			let spanAs = []
			let spanBs = []

			let conversionPeriodLow, conversionPeriodHigh
			let basePeriodLow, basePeriodHigh
			let spanbPeriodLow, spanbPeriodHigh

			tick = yield
			
			while (true) {
				// Keep a list of lows/highs for the max period
				highs.push(tick.high)
				lows.push(tick.low)

				if(periodCounter < period) {
					periodCounter++
				} else {
					highs.shift()
					lows.shift()

					// Tenkan-sen (ConversionLine): (9-period high + 9-period low)/2))
					conversionPeriodLow = lows.slice(-_this.params.conversionPeriod).reduce( (a,b) => Math.min(a,b) )
					conversionPeriodHigh = highs.slice(-_this.params.conversionPeriod).reduce( (a,b) => Math.max(a,b) )
					let conversionLine = (conversionPeriodHigh + conversionPeriodLow) /2

					// Kijun-sen (Base Line): (26-period high + 26-period low)/2))
					basePeriodLow = lows.slice(-_this.params.basePeriod).reduce( (a,b) => Math.min(a,b) )
					basePeriodHigh = highs.slice(-_this.params.basePeriod).reduce( (a,b) => Math.max(a,b) )
					let baseLine = (basePeriodHigh + basePeriodLow) /2

					// Senkou Span A (Leading Span A): (Conversion Line + Base Line)/2))
					let spanA = 0
					spanAs.push((conversionLine + baseLine) /2)

					// Senkou Span B (Leading Span B): (52-period high + 52-period low)/2))
					let spanB = 0
					spanbPeriodLow = lows.slice(-_this.params.spanPeriod).reduce( (a,b) => Math.min(a,b) )
					spanbPeriodHigh = highs.slice(-_this.params.spanPeriod).reduce( (a,b) => Math.max(a,b) )
					spanBs.push((spanbPeriodHigh + spanbPeriodLow) /2)

					// Senkou Span A / Senkou Span B offset by 26 periods
					if(spanCounter < _this.params.displacement) {
						spanCounter++
					} else {
						spanA = spanAs.shift()
						spanB = spanBs.shift()
					}

					result = {
						conversion : parseFloat(conversionLine.toFixed(5)),
						base       : parseFloat(baseLine.toFixed(5)),
						spanA      : parseFloat(spanA.toFixed(5)),
						spanB      : parseFloat(spanB.toFixed(5))
					}

				}

				tick = yield result
			}
		})()
		
	}
	nextValue(price) {
		return this.generator.next(price).value;
	}

}

module.exports = Ichimoku

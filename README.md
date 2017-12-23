# Ishimoku Kinko Hyo Technical Indicator

A Javascript implementation of the technical indicator Ishimoku Kinko Hyo.

It calculates:

1. Tenkan-sen (ConversionLine): (9-period high + 9-period low)/2))
2. Kijun-sen (Base Line): (26-period high + 26-period low)/2))
3. Senkou Span A (Leading Span A): (Conversion Line + Base Line)/2))
4. Senkou Span B (Leading Span B): (52-period high + 52-period low)/2))

###### Usage
```javascript
const ichimoku = new Ichimoku({
	conversionPeriod : 9,
	basePeriod       : 26,
	spanPeriod       : 52,
	displacement     : 26,
	values           : []
})

for( let candle of candles ) {
	let ichimokuValues = ichimoku.nextValue({
		high: candle.high,
		low: candle.low,
		close: candle.close
	})
}
```

###### Output
```json
{ 
	conversion : 1.33956,
  base       : 1.337235,
  spanA      : 1.33791,
  spanB      : 1.3373599999999999
}
```

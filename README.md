[![Travis CI](https://img.shields.io/travis/rd13/ichimoku.svg?style=flat-square)](https://travis-ci.org/rd13/ichimoku)

# Ichimoku Kinko Hyo Technical Indicator

A Javascript implementation of the technical indicator [Ichimoku Kinko Hyo](https://en.wikipedia.org/wiki/Ichimoku_Kink%C5%8D_Hy%C5%8D).

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
	let ichimokuValue = ichimoku.nextValue({
		high  : candle.high,
		low   : candle.low,
		close : candle.close
	})
}
```

###### Output
```json
{ 
	"conversion" : 1.33956,
	"base"       : 1.33723,
	"spanA"      : 1.33791,
	"spanB"      : 1.33735
}
```

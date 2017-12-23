"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ichimoku = function () {
	function Ichimoku(input) {
		(0, _classCallCheck3.default)(this, Ichimoku);

		var _this = this;

		this.defaults = {
			conversionPeriod: 9,
			basePeriod: 26,
			spanPeriod: 52,
			displacement: 26

			// Overwrite param defaults
		};this.params = (0, _assign2.default)({}, this.defaults, input);

		this.generator = /*#__PURE__*/_regenerator2.default.mark(function _callee() {
			var result, tick, period, periodCounter, spanCounter, highs, lows, spanAs, spanBs, conversionPeriodLow, conversionPeriodHigh, basePeriodLow, basePeriodHigh, spanbPeriodLow, spanbPeriodHigh, conversionLine, baseLine, spanA, spanB;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							result = void 0;
							tick = void 0;
							period = Math.max(_this.params.conversionPeriod, _this.params.basePeriod, _this.params.spanPeriod, _this.params.displacement);
							periodCounter = 0;
							spanCounter = 0;
							highs = [];
							lows = [];
							spanAs = [];
							spanBs = [];
							conversionPeriodLow = void 0, conversionPeriodHigh = void 0;
							basePeriodLow = void 0, basePeriodHigh = void 0;
							spanbPeriodLow = void 0, spanbPeriodHigh = void 0;
							_context.next = 14;
							return;

						case 14:
							tick = _context.sent;

						case 15:
							if (!true) {
								_context.next = 24;
								break;
							}

							// Keep a list of lows/highs for the max period
							highs.push(tick.high);
							lows.push(tick.low);

							if (periodCounter < period) {
								periodCounter++;
							} else {
								highs.shift();
								lows.shift();

								// Tenkan-sen (ConversionLine): (9-period high + 9-period low)/2))
								conversionPeriodLow = lows.slice(-_this.params.conversionPeriod).reduce(function (a, b) {
									return Math.min(a, b);
								});
								conversionPeriodHigh = highs.slice(-_this.params.conversionPeriod).reduce(function (a, b) {
									return Math.max(a, b);
								});
								conversionLine = (conversionPeriodHigh + conversionPeriodLow) / 2;

								// Kijun-sen (Base Line): (26-period high + 26-period low)/2))

								basePeriodLow = lows.slice(-_this.params.basePeriod).reduce(function (a, b) {
									return Math.min(a, b);
								});
								basePeriodHigh = highs.slice(-_this.params.basePeriod).reduce(function (a, b) {
									return Math.max(a, b);
								});
								baseLine = (basePeriodHigh + basePeriodLow) / 2;

								// Senkou Span A (Leading Span A): (Conversion Line + Base Line)/2))

								spanA = 0;

								spanAs.push((conversionLine + baseLine) / 2);

								// Senkou Span B (Leading Span B): (52-period high + 52-period low)/2))
								spanB = 0;

								spanbPeriodLow = lows.slice(-_this.params.spanPeriod).reduce(function (a, b) {
									return Math.min(a, b);
								});
								spanbPeriodHigh = highs.slice(-_this.params.spanPeriod).reduce(function (a, b) {
									return Math.max(a, b);
								});
								spanBs.push((spanbPeriodHigh + spanbPeriodLow) / 2);

								// Senkou Span A / Senkou Span B offset by 26 periods
								if (spanCounter < _this.params.displacement) {
									spanCounter++;
								} else {
									spanA = spanAs.shift();
									spanB = spanBs.shift();
								}

								result = {
									conversion: parseFloat(conversionLine.toFixed(5)),
									base: parseFloat(baseLine.toFixed(5)),
									spanA: parseFloat(spanA.toFixed(5)),
									spanB: parseFloat(spanB.toFixed(5))
								};
							}

							_context.next = 21;
							return result;

						case 21:
							tick = _context.sent;
							_context.next = 15;
							break;

						case 24:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		})();
	}

	(0, _createClass3.default)(Ichimoku, [{
		key: "nextValue",
		value: function nextValue(price) {
			return this.generator.next(price).value;
		}
	}]);
	return Ichimoku;
}();

module.exports = Ichimoku;
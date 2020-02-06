"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var randomBytes = require('./random-bytes');

var randomDigits = require('./random-digits');

module.exports = getShortToken;

function getShortToken(_x, _x2) {
  return _getShortToken.apply(this, arguments);
}

function _getShortToken() {
  _getShortToken = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(len, ifDigits) {
    var str1, str;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!ifDigits) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", randomDigits(len));

          case 2:
            _context.next = 4;
            return randomBytes(Math.floor(len / 2) + 1);

          case 4:
            str1 = _context.sent;
            str = str1.substr(0, len);

            if (str.match(/^[0-9]+$/)) {
              // tests will fail on all digits
              str = "q".concat(str.substr(1)); // shhhh, secret.
            }

            return _context.abrupt("return", str);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getShortToken.apply(this, arguments);
}
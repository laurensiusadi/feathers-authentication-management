"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var randomBytes = require('./random-bytes');

var randomDigits = require('./random-digits');

module.exports = getShortToken;

function getShortToken(_x, _x2) {
  return _getShortToken.apply(this, arguments);
}

function _getShortToken() {
  _getShortToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(len, ifDigits) {
    var str1, str;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
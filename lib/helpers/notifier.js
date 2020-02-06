"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var makeDebug = require('debug');

var sanitizeUserForNotifier = require('./sanitize-user-for-notifier');

var debug = makeDebug('authLocalMgnt:notifier');
module.exports = notifier;

function notifier(_x, _x2, _x3, _x4) {
  return _notifier.apply(this, arguments);
}

function _notifier() {
  _notifier = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(optionsNotifier, type, user, notifierOptions) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug('notifier', type);
            _context.next = 3;
            return optionsNotifier(type, sanitizeUserForNotifier(user), notifierOptions || {});

          case 3:
            return _context.abrupt("return", user);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _notifier.apply(this, arguments);
}
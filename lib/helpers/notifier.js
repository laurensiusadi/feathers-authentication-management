"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var makeDebug = require('debug');

var sanitizeUserForNotifier = require('./sanitize-user-for-notifier');

var debug = makeDebug('authLocalMgnt:notifier');
module.exports = notifier;

function notifier(_x, _x2, _x3, _x4) {
  return _notifier.apply(this, arguments);
}

function _notifier() {
  _notifier = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(optionsNotifier, type, user, notifierOptions) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
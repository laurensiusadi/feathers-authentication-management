"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var auth = require('@feathersjs/authentication-local').hooks;

module.exports = hashPassword;

function hashPassword(_x, _x2) {
  return _hashPassword.apply(this, arguments);
}

function _hashPassword() {
  _hashPassword = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(app, password) {
    var context, newContext;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            context = {
              type: 'before',
              data: {
                password: password
              },
              params: {
                provider: null
              },
              app: app
            };
            _context.next = 3;
            return auth.hashPassword()(context);

          case 3:
            newContext = _context.sent;
            return _context.abrupt("return", newContext.data.password);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _hashPassword.apply(this, arguments);
}
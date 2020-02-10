"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var auth = require('@feathersjs/authentication-local').hooks;

module.exports = hashPassword;

function hashPassword(_x, _x2) {
  return _hashPassword.apply(this, arguments);
}

function _hashPassword() {
  _hashPassword = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(app, password) {
    var context, newContext;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
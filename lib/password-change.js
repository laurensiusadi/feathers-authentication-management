"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var errors = require('@feathersjs/errors');

var makeDebug = require('debug');

var comparePasswords = require('./helpers/compare-passwords');

var ensureObjPropsValid = require('./helpers/ensure-obj-props-valid');

var ensureValuesAreStrings = require('./helpers/ensure-values-are-strings');

var getUserData = require('./helpers/get-user-data');

var hashPassword = require('./helpers/hash-password');

var notifier = require('./helpers/notifier');

var debug = makeDebug('authLocalMgnt:passwordChange');
module.exports = passwordChange;

function passwordChange(_x, _x2, _x3, _x4) {
  return _passwordChange.apply(this, arguments);
}

function _passwordChange() {
  _passwordChange = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(options, identifyUser, oldPassword, password) {
    var usersService, usersServiceIdName, users, user1, user2, user3;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug('passwordChange', oldPassword, password);
            usersService = options.app.service(options.service);
            usersServiceIdName = usersService.id;
            ensureValuesAreStrings(oldPassword, password);
            ensureObjPropsValid(identifyUser, options.identifyUserProps);
            _context.next = 7;
            return usersService.find({
              query: identifyUser
            });

          case 7:
            users = _context.sent;
            user1 = getUserData(users);
            _context.prev = 9;
            _context.next = 12;
            return comparePasswords(oldPassword, user1.password, function () {});

          case 12:
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](9);
            throw new errors.BadRequest('Current password is incorrect.', {
              errors: {
                oldPassword: 'Current password is incorrect.'
              }
            });

          case 17:
            _context.t1 = usersService;
            _context.t2 = user1[usersServiceIdName];
            _context.next = 21;
            return hashPassword(options.app, password);

          case 21:
            _context.t3 = _context.sent;
            _context.t4 = {
              password: _context.t3
            };
            _context.next = 25;
            return _context.t1.patch.call(_context.t1, _context.t2, _context.t4);

          case 25:
            user2 = _context.sent;
            _context.next = 28;
            return notifier(options.notifier, 'passwordChange', user2);

          case 28:
            user3 = _context.sent;
            return _context.abrupt("return", options.sanitizeUserForClient(user3));

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 14]]);
  }));
  return _passwordChange.apply(this, arguments);
}
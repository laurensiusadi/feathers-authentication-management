"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var errors = require('@feathersjs/errors');

var makeDebug = require('debug');

var comparePasswords = require('./helpers/compare-passwords');

var deconstructId = require('./helpers/deconstruct-id');

var ensureObjPropsValid = require('./helpers/ensure-obj-props-valid');

var ensureValuesAreStrings = require('./helpers/ensure-values-are-strings');

var getUserData = require('./helpers/get-user-data');

var hashPassword = require('./helpers/hash-password');

var notifier = require('./helpers/notifier');

var debug = makeDebug('authLocalMgnt:resetPassword');
module.exports = {
  resetPwdWithLongToken: resetPwdWithLongToken,
  resetPwdWithShortToken: resetPwdWithShortToken
};

function resetPwdWithLongToken(_x, _x2, _x3) {
  return _resetPwdWithLongToken.apply(this, arguments);
}

function _resetPwdWithLongToken() {
  _resetPwdWithLongToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options, resetToken, password) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ensureValuesAreStrings(resetToken, password);
            return _context.abrupt("return", resetPassword(options, {
              resetToken: resetToken
            }, {
              resetToken: resetToken
            }, password));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _resetPwdWithLongToken.apply(this, arguments);
}

function resetPwdWithShortToken(_x4, _x5, _x6, _x7) {
  return _resetPwdWithShortToken.apply(this, arguments);
}

function _resetPwdWithShortToken() {
  _resetPwdWithShortToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(options, resetShortToken, identifyUser, password) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ensureValuesAreStrings(resetShortToken, password);
            ensureObjPropsValid(identifyUser, options.identifyUserProps);
            return _context2.abrupt("return", resetPassword(options, identifyUser, {
              resetShortToken: resetShortToken
            }, password));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _resetPwdWithShortToken.apply(this, arguments);
}

function resetPassword(_x8, _x9, _x10, _x11) {
  return _resetPassword.apply(this, arguments);
}

function _resetPassword() {
  _resetPassword = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(options, query, tokens, password) {
    var usersService, usersServiceIdName, promises, users, id, checkProps, user1, user2, user3;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            debug('resetPassword', query, tokens, password);
            usersService = options.app.service(options.service);
            usersServiceIdName = usersService.id;
            promises = [];

            if (!tokens.resetToken) {
              _context3.next = 11;
              break;
            }

            id = deconstructId(tokens.resetToken);
            _context3.next = 8;
            return usersService.get(id);

          case 8:
            users = _context3.sent;
            _context3.next = 18;
            break;

          case 11:
            if (!tokens.resetShortToken) {
              _context3.next = 17;
              break;
            }

            _context3.next = 14;
            return usersService.find({
              query: query
            });

          case 14:
            users = _context3.sent;
            _context3.next = 18;
            break;

          case 17:
            throw new errors.BadRequest('resetToken and resetShortToken are missing. (authLocalMgnt)', {
              errors: {
                $className: 'missingToken'
              }
            });

          case 18:
            checkProps = options.skipIsVerifiedCheck ? ['resetNotExpired'] : ['resetNotExpired', 'isVerified'];
            user1 = getUserData(users, checkProps);
            Object.keys(tokens).forEach(function (key) {
              promises.push(comparePasswords(tokens[key], user1[key], function () {
                return new errors.BadRequest('Reset Token is incorrect. (authLocalMgnt)', {
                  errors: {
                    $className: 'incorrectToken'
                  }
                });
              }));
            });
            _context3.prev = 21;
            _context3.next = 24;
            return Promise.all(promises);

          case 24:
            _context3.next = 31;
            break;

          case 26:
            _context3.prev = 26;
            _context3.t0 = _context3["catch"](21);
            _context3.next = 30;
            return usersService.patch(user1[usersServiceIdName], {
              resetToken: null,
              resetShortToken: null,
              resetExpires: null
            });

          case 30:
            return _context3.abrupt("return", errors.BadRequest('Invalid token. Get for a new one. (authLocalMgnt)', {
              errors: {
                $className: 'invalidToken'
              }
            }));

          case 31:
            _context3.t1 = usersService;
            _context3.t2 = user1[usersServiceIdName];
            _context3.next = 35;
            return hashPassword(options.app, password);

          case 35:
            _context3.t3 = _context3.sent;
            _context3.t4 = {
              password: _context3.t3,
              resetToken: null,
              resetShortToken: null,
              resetExpires: null
            };
            _context3.next = 39;
            return _context3.t1.patch.call(_context3.t1, _context3.t2, _context3.t4);

          case 39:
            user2 = _context3.sent;
            _context3.next = 42;
            return notifier(options.notifier, 'resetPwd', user2);

          case 42:
            user3 = _context3.sent;
            return _context3.abrupt("return", options.sanitizeUserForClient(user3));

          case 44:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[21, 26]]);
  }));
  return _resetPassword.apply(this, arguments);
}
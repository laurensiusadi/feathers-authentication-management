"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var errors = require('@feathersjs/errors');

var makeDebug = require('debug');

var ensureObjPropsValid = require('./helpers/ensure-obj-props-valid');

var ensureValuesAreStrings = require('./helpers/ensure-values-are-strings');

var getUserData = require('./helpers/get-user-data');

var notifier = require('./helpers/notifier');

var debug = makeDebug('authLocalMgnt:verifySignup');
module.exports = {
  verifySignupWithLongToken: verifySignupWithLongToken,
  verifySignupWithShortToken: verifySignupWithShortToken
};

function verifySignupWithLongToken(_x, _x2) {
  return _verifySignupWithLongToken.apply(this, arguments);
}

function _verifySignupWithLongToken() {
  _verifySignupWithLongToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options, verifyToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ensureValuesAreStrings(verifyToken);
            return _context.abrupt("return", verifySignup(options, {
              verifyToken: verifyToken
            }, {
              verifyToken: verifyToken
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _verifySignupWithLongToken.apply(this, arguments);
}

function verifySignupWithShortToken(_x3, _x4, _x5) {
  return _verifySignupWithShortToken.apply(this, arguments);
}

function _verifySignupWithShortToken() {
  _verifySignupWithShortToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(options, verifyShortToken, identifyUser) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ensureValuesAreStrings(verifyShortToken);
            ensureObjPropsValid(identifyUser, options.identifyUserProps);
            return _context2.abrupt("return", verifySignup(options, identifyUser, {
              verifyShortToken: verifyShortToken
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _verifySignupWithShortToken.apply(this, arguments);
}

function verifySignup(_x6, _x7, _x8) {
  return _verifySignup.apply(this, arguments);
}

function _verifySignup() {
  _verifySignup = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(options, query, tokens) {
    var usersService, usersServiceIdName, users, user1, user2, user3, eraseVerifyProps, _eraseVerifyProps;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _eraseVerifyProps = function _ref2() {
              _eraseVerifyProps = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(user, isVerified, verifyChanges) {
                var patchToUser;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        patchToUser = Object.assign({}, verifyChanges || {}, {
                          isVerified: isVerified,
                          verifyToken: null,
                          verifyShortToken: null,
                          verifyExpires: null,
                          verifyChanges: {}
                        });
                        return _context3.abrupt("return", usersService.patch(user[usersServiceIdName], patchToUser, {}));

                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return _eraseVerifyProps.apply(this, arguments);
            };

            eraseVerifyProps = function _ref(_x9, _x10, _x11) {
              return _eraseVerifyProps.apply(this, arguments);
            };

            debug('verifySignup', query, tokens);
            usersService = options.app.service(options.service);
            usersServiceIdName = usersService.id;
            _context4.next = 7;
            return usersService.find({
              query: query
            });

          case 7:
            users = _context4.sent;
            user1 = getUserData(users, ['isNotVerifiedOrHasVerifyChanges', 'verifyNotExpired']);

            if (Object.keys(tokens).every(function (key) {
              return tokens[key] === user1[key];
            })) {
              _context4.next = 13;
              break;
            }

            _context4.next = 12;
            return eraseVerifyProps(user1, user1.isVerified);

          case 12:
            throw new errors.BadRequest('Invalid token. Get for a new one. (authLocalMgnt)', {
              errors: {
                $className: 'badParam'
              }
            });

          case 13:
            _context4.next = 15;
            return eraseVerifyProps(user1, user1.verifyExpires > Date.now(), user1.verifyChanges || {});

          case 15:
            user2 = _context4.sent;
            _context4.next = 18;
            return notifier(options.notifier, 'verifySignup', user2);

          case 18:
            user3 = _context4.sent;
            return _context4.abrupt("return", options.sanitizeUserForClient(user3));

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _verifySignup.apply(this, arguments);
}
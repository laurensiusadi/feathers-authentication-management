"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var makeDebug = require('debug');

var concatIDAndHash = require('./helpers/concat-id-and-hash');

var ensureObjPropsValid = require('./helpers/ensure-obj-props-valid');

var getLongToken = require('./helpers/get-long-token');

var getShortToken = require('./helpers/get-short-token');

var getUserData = require('./helpers/get-user-data');

var hashPassword = require('./helpers/hash-password');

var notifier = require('./helpers/notifier');

var debug = makeDebug('authLocalMgnt:sendResetPwd');
module.exports = sendResetPwd;

function sendResetPwd(_x, _x2, _x3) {
  return _sendResetPwd.apply(this, arguments);
}

function _sendResetPwd() {
  _sendResetPwd = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options, identifyUser, notifierOptions) {
    var usersService, usersServiceIdName, users, user1, user2, user3;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug('sendResetPwd');
            usersService = options.app.service(options.service);
            usersServiceIdName = usersService.id;
            ensureObjPropsValid(identifyUser, options.identifyUserProps);
            _context.next = 6;
            return usersService.find({
              query: identifyUser
            });

          case 6:
            users = _context.sent;
            user1 = getUserData(users, options.skipIsVerifiedCheck ? [] : ['isVerified']);
            _context.t0 = Object;
            _context.t1 = user1;
            _context.t2 = Date.now() + options.resetDelay;
            _context.t3 = concatIDAndHash;
            _context.t4 = user1[usersServiceIdName];
            _context.next = 15;
            return getLongToken(options.longTokenLen);

          case 15:
            _context.t5 = _context.sent;
            _context.t6 = (0, _context.t3)(_context.t4, _context.t5);
            _context.next = 19;
            return getShortToken(options.shortTokenLen, options.shortTokenDigits);

          case 19:
            _context.t7 = _context.sent;
            _context.t8 = {
              resetExpires: _context.t2,
              resetToken: _context.t6,
              resetShortToken: _context.t7
            };
            user2 = _context.t0.assign.call(_context.t0, _context.t1, _context.t8);
            notifier(options.notifier, 'sendResetPwd', user2, notifierOptions);
            _context.t9 = usersService;
            _context.t10 = user2[usersServiceIdName];
            _context.t11 = user2.resetExpires;
            _context.next = 28;
            return hashPassword(options.app, user2.resetToken);

          case 28:
            _context.t12 = _context.sent;
            _context.next = 31;
            return hashPassword(options.app, user2.resetShortToken);

          case 31:
            _context.t13 = _context.sent;
            _context.t14 = {
              resetExpires: _context.t11,
              resetToken: _context.t12,
              resetShortToken: _context.t13
            };
            _context.next = 35;
            return _context.t9.patch.call(_context.t9, _context.t10, _context.t14);

          case 35:
            user3 = _context.sent;
            return _context.abrupt("return", options.sanitizeUserForClient(user3));

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sendResetPwd.apply(this, arguments);
}
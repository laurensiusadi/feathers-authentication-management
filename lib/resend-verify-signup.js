"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var makeDebug = require('debug');

var ensureObjPropsValid = require('./helpers/ensure-obj-props-valid');

var getLongToken = require('./helpers/get-long-token');

var getShortToken = require('./helpers/get-short-token');

var getUserData = require('./helpers/get-user-data');

var notifier = require('./helpers/notifier');

var debug = makeDebug('authLocalMgnt:resendVerifySignup'); // {email}, {cellphone}, {verifyToken}, {verifyShortToken},
// {email, cellphone, verifyToken, verifyShortToken}

module.exports =
/*#__PURE__*/
function () {
  var _resendVerifySignup = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options, identifyUser, notifierOptions) {
    var usersService, usersServiceIdName, users, user1, user2, user3;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug('identifyUser=', identifyUser);
            usersService = options.app.service(options.service);
            usersServiceIdName = usersService.id;
            ensureObjPropsValid(identifyUser, options.identifyUserProps.concat('verifyToken', 'verifyShortToken'));
            _context.next = 6;
            return usersService.find({
              query: identifyUser
            });

          case 6:
            users = _context.sent;
            user1 = getUserData(users, ['isNotVerified']);
            _context.t0 = usersService;
            _context.t1 = user1[usersServiceIdName];
            _context.t2 = Date.now() + options.delay;
            _context.next = 13;
            return getLongToken(options.longTokenLen);

          case 13:
            _context.t3 = _context.sent;
            _context.next = 16;
            return getShortToken(options.shortTokenLen, options.shortTokenDigits);

          case 16:
            _context.t4 = _context.sent;
            _context.t5 = {
              isVerified: false,
              verifyExpires: _context.t2,
              verifyToken: _context.t3,
              verifyShortToken: _context.t4
            };
            _context.next = 20;
            return _context.t0.patch.call(_context.t0, _context.t1, _context.t5);

          case 20:
            user2 = _context.sent;
            _context.next = 23;
            return notifier(options.notifier, 'resendVerifySignup', user2, notifierOptions);

          case 23:
            user3 = _context.sent;
            return _context.abrupt("return", options.sanitizeUserForClient(user3));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function resendVerifySignup(_x, _x2, _x3) {
    return _resendVerifySignup.apply(this, arguments);
  }

  return resendVerifySignup;
}();
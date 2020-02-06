"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
  var _resendVerifySignup = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(options, identifyUser, notifierOptions) {
    var usersService, usersServiceIdName, users, user1, user2, user3;
    return _regenerator["default"].wrap(function _callee$(_context) {
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
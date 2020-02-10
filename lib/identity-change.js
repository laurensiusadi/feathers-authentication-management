"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var errors = require('@feathersjs/errors');

var makeDebug = require('debug');

var comparePasswords = require('./helpers/compare-passwords');

var ensureObjPropsValid = require('./helpers/ensure-obj-props-valid');

var getLongToken = require('./helpers/get-long-token');

var getShortToken = require('./helpers/get-short-token');

var getUserData = require('./helpers/get-user-data');

var notifier = require('./helpers/notifier');

var debug = makeDebug('authLocalMgnt:identityChange');
module.exports = identityChange;

function identityChange(_x, _x2, _x3, _x4) {
  return _identityChange.apply(this, arguments);
}

function _identityChange() {
  _identityChange = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options, identifyUser, password, changesIdentifyUser) {
    var usersService, usersServiceIdName, users, user1, user2, user3;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // note this call does not update the authenticated user info in hooks.params.user.
            debug('identityChange', password, changesIdentifyUser);
            usersService = options.app.service(options.service);
            usersServiceIdName = usersService.id;
            ensureObjPropsValid(identifyUser, options.identifyUserProps);
            ensureObjPropsValid(changesIdentifyUser, options.identifyUserProps);
            _context.next = 7;
            return usersService.find({
              query: identifyUser
            });

          case 7:
            users = _context.sent;
            user1 = getUserData(users);
            _context.prev = 9;
            _context.next = 12;
            return comparePasswords(password, user1.password, function () {});

          case 12:
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](9);
            throw new errors.BadRequest('Password is incorrect.', {
              errors: {
                password: 'Password is incorrect.',
                $className: 'badParams'
              }
            });

          case 17:
            _context.t1 = usersService;
            _context.t2 = user1[usersServiceIdName];
            _context.t3 = Date.now() + options.delay;
            _context.next = 22;
            return getLongToken(options.longTokenLen);

          case 22:
            _context.t4 = _context.sent;
            _context.next = 25;
            return getShortToken(options.shortTokenLen, options.shortTokenDigits);

          case 25:
            _context.t5 = _context.sent;
            _context.t6 = changesIdentifyUser;
            _context.t7 = {
              verifyExpires: _context.t3,
              verifyToken: _context.t4,
              verifyShortToken: _context.t5,
              verifyChanges: _context.t6
            };
            _context.next = 30;
            return _context.t1.patch.call(_context.t1, _context.t2, _context.t7);

          case 30:
            user2 = _context.sent;
            _context.next = 33;
            return notifier(options.notifier, 'identityChange', user2, null);

          case 33:
            user3 = _context.sent;
            return _context.abrupt("return", options.sanitizeUserForClient(user3));

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 14]]);
  }));
  return _identityChange.apply(this, arguments);
}
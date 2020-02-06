"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var errors = require('@feathersjs/errors');

var makeDebug = require('debug');

var debug = makeDebug('authLocalMgnt:service');

var checkUnique = require('./check-unique');

var identityChange = require('./identity-change');

var passwordChange = require('./password-change');

var resendVerifySignup = require('./resend-verify-signup');

var sanitizeUserForClient = require('./helpers/sanitize-user-for-client');

var sendResetPwd = require('./send-reset-pwd');

var _require = require('./reset-password'),
    resetPwdWithLongToken = _require.resetPwdWithLongToken,
    resetPwdWithShortToken = _require.resetPwdWithShortToken;

var _require2 = require('./verify-signup'),
    verifySignupWithLongToken = _require2.verifySignupWithLongToken,
    verifySignupWithShortToken = _require2.verifySignupWithShortToken;

var optionsDefault = {
  app: null,
  // value set during configuration
  service: '/users',
  // need exactly this for test suite
  path: 'authManagement',
  notifier: function () {
    var _notifier = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function notifier() {
      return _notifier.apply(this, arguments);
    }

    return notifier;
  }(),
  longTokenLen: 15,
  // token's length will be twice this
  shortTokenLen: 6,
  shortTokenDigits: true,
  resetDelay: 1000 * 60 * 60 * 2,
  // 2 hours
  delay: 1000 * 60 * 60 * 24 * 5,
  // 5 days
  identifyUserProps: ['email'],
  sanitizeUserForClient: sanitizeUserForClient
};
module.exports = authenticationLocalManagement;

function authenticationLocalManagement() {
  var options1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  debug('service being configured.');
  return function () {
    var options = Object.assign({}, optionsDefault, options1, {
      app: this
    });
    options.app.use(options.path, authLocalMgntMethods(options));
  };
}

function authLocalMgntMethods(options) {
  return {
    create: function create(data) {
      return (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                debug("create called. action=".concat(data.action));
                _context2.t0 = data.action;
                _context2.next = _context2.t0 === 'checkUnique' ? 4 : _context2.t0 === 'resendVerifySignup' ? 13 : _context2.t0 === 'verifySignupLong' ? 22 : _context2.t0 === 'verifySignupShort' ? 31 : _context2.t0 === 'sendResetPwd' ? 40 : _context2.t0 === 'resetPwdLong' ? 49 : _context2.t0 === 'resetPwdShort' ? 58 : _context2.t0 === 'passwordChange' ? 67 : _context2.t0 === 'identityChange' ? 76 : _context2.t0 === 'options' ? 85 : 86;
                break;

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return checkUnique(options, data.value, data.ownId || null, data.meta || {});

              case 7:
                return _context2.abrupt("return", _context2.sent);

              case 10:
                _context2.prev = 10;
                _context2.t1 = _context2["catch"](4);
                return _context2.abrupt("return", Promise.reject(_context2.t1));

              case 13:
                _context2.prev = 13;
                _context2.next = 16;
                return resendVerifySignup(options, data.value, data.notifierOptions);

              case 16:
                return _context2.abrupt("return", _context2.sent);

              case 19:
                _context2.prev = 19;
                _context2.t2 = _context2["catch"](13);
                return _context2.abrupt("return", Promise.reject(_context2.t2));

              case 22:
                _context2.prev = 22;
                _context2.next = 25;
                return verifySignupWithLongToken(options, data.value);

              case 25:
                return _context2.abrupt("return", _context2.sent);

              case 28:
                _context2.prev = 28;
                _context2.t3 = _context2["catch"](22);
                return _context2.abrupt("return", Promise.reject(_context2.t3));

              case 31:
                _context2.prev = 31;
                _context2.next = 34;
                return verifySignupWithShortToken(options, data.value.token, data.value.user);

              case 34:
                return _context2.abrupt("return", _context2.sent);

              case 37:
                _context2.prev = 37;
                _context2.t4 = _context2["catch"](31);
                return _context2.abrupt("return", Promise.reject(_context2.t4));

              case 40:
                _context2.prev = 40;
                _context2.next = 43;
                return sendResetPwd(options, data.value, data.notifierOptions);

              case 43:
                return _context2.abrupt("return", _context2.sent);

              case 46:
                _context2.prev = 46;
                _context2.t5 = _context2["catch"](40);
                return _context2.abrupt("return", Promise.reject(_context2.t5));

              case 49:
                _context2.prev = 49;
                _context2.next = 52;
                return resetPwdWithLongToken(options, data.value.token, data.value.password);

              case 52:
                return _context2.abrupt("return", _context2.sent);

              case 55:
                _context2.prev = 55;
                _context2.t6 = _context2["catch"](49);
                return _context2.abrupt("return", Promise.reject(_context2.t6));

              case 58:
                _context2.prev = 58;
                _context2.next = 61;
                return resetPwdWithShortToken(options, data.value.token, data.value.user, data.value.password);

              case 61:
                return _context2.abrupt("return", _context2.sent);

              case 64:
                _context2.prev = 64;
                _context2.t7 = _context2["catch"](58);
                return _context2.abrupt("return", Promise.reject(_context2.t7));

              case 67:
                _context2.prev = 67;
                _context2.next = 70;
                return passwordChange(options, data.value.user, data.value.oldPassword, data.value.password);

              case 70:
                return _context2.abrupt("return", _context2.sent);

              case 73:
                _context2.prev = 73;
                _context2.t8 = _context2["catch"](67);
                return _context2.abrupt("return", Promise.reject(_context2.t8));

              case 76:
                _context2.prev = 76;
                _context2.next = 79;
                return identityChange(options, data.value.user, data.value.password, data.value.changes);

              case 79:
                return _context2.abrupt("return", _context2.sent);

              case 82:
                _context2.prev = 82;
                _context2.t9 = _context2["catch"](76);
                return _context2.abrupt("return", Promise.reject(_context2.t9));

              case 85:
                return _context2.abrupt("return", options);

              case 86:
                throw new errors.BadRequest("Action '".concat(data.action, "' is invalid."), {
                  errors: {
                    $className: 'badParams'
                  }
                });

              case 87:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 10], [13, 19], [22, 28], [31, 37], [40, 46], [49, 55], [58, 64], [67, 73], [76, 82]]);
      }))();
    }
  };
}
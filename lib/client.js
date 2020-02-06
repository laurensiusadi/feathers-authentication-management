"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Wrapper for client interface to feathers-authenticate-management
var errors = require('@feathersjs/errors');

function AuthManagement(app) {
  // eslint-disable-line no-unused-vars
  if (!(this instanceof AuthManagement)) {
    return new AuthManagement(app);
  }

  var authManagement = app.service('authManagement');

  this.checkUnique =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(identifyUser, ownId, ifErrMsg) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", authManagement.create({
                action: 'checkUnique',
                value: identifyUser,
                ownId: ownId,
                meta: {
                  noErrMsg: ifErrMsg
                }
              }, {}));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  this.resendVerifySignup =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(identifyUser, notifierOptions) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", authManagement.create({
                action: 'resendVerifySignup',
                value: identifyUser,
                notifierOptions: notifierOptions
              }, {}));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.verifySignupLong =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(verifyToken) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", authManagement.create({
                action: 'verifySignupLong',
                value: verifyToken
              }, {}));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.verifySignupShort =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(verifyShortToken, identifyUser) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", authManagement.create({
                action: 'verifySignupShort',
                value: {
                  user: identifyUser,
                  token: verifyShortToken
                }
              }, {}));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.sendResetPwd =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(identifyUser, notifierOptions) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", authManagement.create({
                action: 'sendResetPwd',
                value: identifyUser,
                notifierOptions: notifierOptions
              }, {}));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.resetPwdLong =
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(resetToken, password) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", authManagement.create({
                action: 'resetPwdLong',
                value: {
                  token: resetToken,
                  password: password
                }
              }, {}));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.resetPwdShort =
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(resetShortToken, identifyUser, password) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", authManagement.create({
                action: 'resetPwdShort',
                value: {
                  user: identifyUser,
                  token: resetShortToken,
                  password: password
                }
              }, {}));

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x13, _x14, _x15) {
      return _ref7.apply(this, arguments);
    };
  }();

  this.passwordChange =
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(oldPassword, password, identifyUser) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", authManagement.create({
                action: 'passwordChange',
                value: {
                  user: identifyUser,
                  oldPassword: oldPassword,
                  password: password
                }
              }, {}));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x16, _x17, _x18) {
      return _ref8.apply(this, arguments);
    };
  }();

  this.identityChange =
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(password, changesIdentifyUser, identifyUser) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", authManagement.create({
                action: 'identityChange',
                value: {
                  user: identifyUser,
                  password: password,
                  changes: changesIdentifyUser
                }
              }, {}));

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x19, _x20, _x21) {
      return _ref9.apply(this, arguments);
    };
  }();

  this.authenticate =
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(email, password) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", app.authenticate({
                strategy: 'local',
                email: email,
                password: password
              }).then(function (result) {
                var user = result.user;

                if (!user) {
                  app.logout();
                  return new errors.NotAuthenticated('Invalid login');
                }

                if (!user.isVerified) {
                  app.logout();
                  return new errors.NotAuthenticated('User\'s email is not verified');
                }

                return user;
              })["catch"](function (err) {
                return err;
              }));

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x22, _x23) {
      return _ref10.apply(this, arguments);
    };
  }();
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = AuthManagement;
}
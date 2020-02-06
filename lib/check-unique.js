"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var errors = require('@feathersjs/errors');

var isNullsy = require('./helpers/is-nullsy');

var makeDebug = require('debug');

var debug = makeDebug('authLocalMgnt:checkUnique');
module.exports = checkUnique; // This module is usually called from the UI to check username, email, etc. are unique.

function checkUnique(_x, _x2, _x3, _x4) {
  return _checkUnique.apply(this, arguments);
}

function _checkUnique() {
  _checkUnique = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(options, identifyUser, ownId, meta) {
    var usersService, usersServiceIdName, allProps, keys, i, ilen, prop, users, items, isNotUnique, errProps, errs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug('checkUnique', identifyUser, ownId, meta);
            usersService = options.app.service(options.service);
            usersServiceIdName = usersService.id;
            allProps = [];
            keys = Object.keys(identifyUser).filter(function (key) {
              return !isNullsy(identifyUser[key]);
            });
            _context.prev = 5;
            i = 0, ilen = keys.length;

          case 7:
            if (!(i < ilen)) {
              _context.next = 18;
              break;
            }

            prop = keys[i];
            _context.next = 11;
            return usersService.find({
              query: (0, _defineProperty2["default"])({}, prop, identifyUser[prop].trim())
            });

          case 11:
            users = _context.sent;
            items = Array.isArray(users) ? users : users.data;
            isNotUnique = items.length > 1 || items.length === 1 && items[0][usersServiceIdName] !== ownId;
            allProps.push(isNotUnique ? prop : null);

          case 15:
            i++;
            _context.next = 7;
            break;

          case 18:
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](5);
            throw new errors.BadRequest(meta.noErrMsg ? null : 'checkUnique unexpected error.', {
              errors: {
                msg: _context.t0.message,
                $className: 'unexpected'
              }
            });

          case 23:
            errProps = allProps.filter(function (prop) {
              return prop;
            });

            if (!errProps.length) {
              _context.next = 28;
              break;
            }

            errs = {};
            errProps.forEach(function (prop) {
              errs[prop] = 'Already taken.';
            });
            throw new errors.BadRequest(meta.noErrMsg ? null : 'Values already taken.', {
              errors: errs
            });

          case 28:
            return _context.abrupt("return", null);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 20]]);
  }));
  return _checkUnique.apply(this, arguments);
}
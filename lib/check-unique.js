"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var errors = require('@feathersjs/errors');

var isNullsy = require('./helpers/is-nullsy');

var makeDebug = require('debug');

var debug = makeDebug('authLocalMgnt:checkUnique');
module.exports = checkUnique; // This module is usually called from the UI to check username, email, etc. are unique.

function checkUnique(_x, _x2, _x3, _x4) {
  return _checkUnique.apply(this, arguments);
}

function _checkUnique() {
  _checkUnique = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options, identifyUser, ownId, meta) {
    var usersService, usersServiceIdName, allProps, keys, i, ilen, prop, users, items, isNotUnique, errProps, errs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
              query: _defineProperty({}, prop, identifyUser[prop].trim())
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
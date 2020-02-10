"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var errors = require('@feathersjs/errors');

var _require = require('feathers-hooks-common'),
    checkContext = _require.checkContext;

var _require2 = require('../helpers'),
    getLongToken = _require2.getLongToken,
    getShortToken = _require2.getShortToken,
    ensureFieldHasChanged = _require2.ensureFieldHasChanged;

module.exports = addVerification;

function addVerification(path) {
  return function (hook) {
    checkContext(hook, 'before', ['create', 'patch', 'update']);
    return Promise.resolve().then(function () {
      return hook.app.service(path || 'authManagement').create({
        action: 'options'
      });
    }).then(function (options) {
      return Promise.all([options, getLongToken(options.longTokenLen), getShortToken(options.shortTokenLen, options.shortTokenDigits)]);
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          options = _ref2[0],
          longToken = _ref2[1],
          shortToken = _ref2[2];

      // We do NOT add verification fields if the 3 following conditions are fulfilled:
      // - hook is PATCH or PUT
      // - user is authenticated
      // - user's identifyUserProps fields did not change
      if ((hook.method === 'patch' || hook.method === 'update') && !!hook.params.user && !options.identifyUserProps.some(ensureFieldHasChanged(hook.data, hook.params.user))) {
        return hook;
      }

      hook.data.isVerified = false;
      hook.data.verifyExpires = Date.now() + options.delay;
      hook.data.verifyToken = longToken;
      hook.data.verifyShortToken = shortToken;
      hook.data.verifyChanges = {};
      return hook;
    })["catch"](function (err) {
      throw new errors.GeneralError(err);
    });
  };
}
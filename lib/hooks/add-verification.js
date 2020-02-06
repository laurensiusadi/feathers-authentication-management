"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 3),
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
"use strict";

var errors = require('@feathersjs/errors');

var _require = require('feathers-hooks-common'),
    checkContext = _require.checkContext;

module.exports = isVerified;

function isVerified() {
  return function (hook) {
    checkContext(hook, 'before');

    if (!hook.params.user || !hook.params.user.isVerified) {
      throw new errors.BadRequest('User\'s email is not yet verified.');
    }
  };
}
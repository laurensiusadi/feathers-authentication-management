"use strict";

var errors = require('@feathersjs/errors');

module.exports = ensureObjPropsValid;

function ensureObjPropsValid(obj, props, allowNone) {
  var keys = Object.keys(obj);
  var valid = keys.every(function (key) {
    return props.includes(key) && typeof obj[key] === 'string';
  });

  if (!valid || keys.length === 0 && !allowNone) {
    throw new errors.BadRequest('User info is not valid. (authLocalMgnt)', {
      errors: {
        $className: 'badParams'
      }
    });
  }
}
"use strict";

var errors = require('@feathersjs/errors');

module.exports = ensureValuesAreStrings;

function ensureValuesAreStrings() {
  for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  if (!rest.every(function (str) {
    return typeof str === 'string';
  })) {
    throw new errors.BadRequest('Expected string value. (authLocalMgnt)', {
      errors: {
        $className: 'badParams'
      }
    });
  }
}
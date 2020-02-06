"use strict";

var cloneObject = require('./clone-object');

var comparePasswords = require('./compare-passwords');

var concatIDAndHash = require('./concat-id-and-hash');

var deconstructId = require('./deconstruct-id');

var ensureFieldHasChanged = require('./ensure-field-has-changed');

var ensureObjPropsValid = require('./ensure-obj-props-valid');

var ensureValuesAreStrings = require('./ensure-values-are-strings');

var getLongToken = require('./get-long-token');

var getShortToken = require('./get-short-token');

var getUserData = require('./get-user-data');

var hashPassword = require('./hash-password');

var isNullsy = require('./is-nullsy');

var notifier = require('./notifier');

var _randomBytes = require('./random-bytes');

var _randomDigits = require('./random-digits');

var sanitizeUserForClient = require('./sanitize-user-for-client');

var sanitizeUserForNotifier = require('./sanitize-user-for-notifier');

module.exports = {
  cloneObject: cloneObject,
  comparePasswords: comparePasswords,
  concatIDAndHash: concatIDAndHash,
  deconstructId: deconstructId,
  ensureFieldHasChanged: ensureFieldHasChanged,
  ensureObjPropsValid: ensureObjPropsValid,
  ensureValuesAreStrings: ensureValuesAreStrings,
  getLongToken: getLongToken,
  getShortToken: getShortToken,
  getUserData: getUserData,
  hashPassword: hashPassword,
  isNullsy: isNullsy,
  notifier: notifier,
  randomBytes: function randomBytes() {
    return _randomBytes.apply(void 0, arguments);
  },
  // for testing, make safe from hacking
  randomDigits: function randomDigits() {
    return _randomDigits.apply(void 0, arguments);
  },
  // for testing, make safe from hacking
  sanitizeUserForClient: sanitizeUserForClient,
  sanitizeUserForNotifier: sanitizeUserForNotifier
};
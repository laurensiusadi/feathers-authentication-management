"use strict";

var addVerification = require('./add-verification');

var isVerified = require('./is-verified');

var removeVerification = require('./remove-verification');

module.exports = {
  addVerification: addVerification,
  isVerified: isVerified,
  removeVerification: removeVerification
};
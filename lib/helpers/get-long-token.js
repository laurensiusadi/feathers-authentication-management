"use strict";

var randomBytes = require('./random-bytes');

module.exports = function (len) {
  return randomBytes(len);
};
"use strict";

var crypto = require('crypto');

module.exports = randomDigits;

function randomDigits(len) {
  var str = '';

  while (str.length < len) {
    str += parseInt('0x' + crypto.randomBytes(4).toString('hex')).toString();
  }

  return str.substr(0, len);
}
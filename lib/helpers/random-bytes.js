"use strict";

var crypto = require('crypto');

module.exports = randomBytes;

function randomBytes(len) {
  return new Promise(function (resolve, reject) {
    crypto.randomBytes(len, function (err, buf) {
      return err ? reject(err) : resolve(buf.toString('hex'));
    });
  });
}
"use strict";

var bcrypt = require('bcryptjs');

module.exports = comparePasswords;

function comparePasswords(oldPassword, password, getError) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(oldPassword, password, function (err, data1) {
      return err || !data1 ? reject(getError() || err) : resolve();
    });
  });
}
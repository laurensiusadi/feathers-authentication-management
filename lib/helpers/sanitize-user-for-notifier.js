"use strict";

var cloneObject = require('./clone-object');

module.exports = sanitizeUserForNotifier;

function sanitizeUserForNotifier(user1) {
  var user = cloneObject(user1);
  delete user.password;
  return user;
}
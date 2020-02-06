"use strict";

module.exports = concatIDAndHash;

function concatIDAndHash(id, token) {
  return "".concat(id, "___").concat(token);
}
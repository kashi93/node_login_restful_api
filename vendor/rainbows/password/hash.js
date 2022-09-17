const bcrypt = require("bcrypt");

class Hash {
  make(plainText) {
    return new Promise((res, rej) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(plainText, salt, function (err, hash) {
          res(hash);
        });
      });
    });
  }
  verify(plainText, hashText) {
    return new Promise((res, rej) => {
      bcrypt.compare(plainText, hashText, function (err, result) {
        res(result);
      });
    });
  }
}

module.exports.Hash = new Hash();

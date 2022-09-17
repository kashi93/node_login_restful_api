const { Model } = require("../../vendor/database/model");

class UserModel extends Model {
  table = "users";
}

module.exports.UserModel = new UserModel();
